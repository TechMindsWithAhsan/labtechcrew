import { SITE } from './site'

/**
 * Lead notification fan-out.
 *
 * ⚠️ WHY THIS FILE RETURNS BOOLEANS (do not regress):
 * The previous version returned void and swallowed every failure. Combined
 * with a route that always answered `{ ok: true }`, a misconfigured env var
 * meant the visitor saw a thank-you screen while the lead went NOWHERE — no
 * email, no database, no log. That is the most expensive class of bug a
 * lead-gen site can have, and it is silent by construction: it looks perfect
 * in testing right up until you are paying for the clicks.
 *
 * Every channel now reports whether it actually delivered, and the route
 * refuses to claim success unless at least one did.
 */

type NotifyPayload = {
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  budgetBand?: string
  timeline?: string
  message?: string
  source: string
  landingPage?: string
}

export type NotifyResult = {
  /** True if AT LEAST ONE channel confirmed delivery. */
  delivered: boolean
  email: 'sent' | 'failed' | 'not-configured'
  webhook: 'sent' | 'failed' | 'not-configured'
}

export async function notifyTeam(lead: NotifyPayload): Promise<NotifyResult> {
  const [webhook, email] = await Promise.all([sendWebhook(lead), sendEmail(lead)])
  return { delivered: webhook === 'sent' || email === 'sent', email, webhook }
}

type ChannelResult = 'sent' | 'failed' | 'not-configured'

async function sendWebhook(lead: NotifyPayload): Promise<ChannelResult> {
  const url = process.env.LEAD_WEBHOOK_URL
  if (!url) return 'not-configured'

  const lines = [
    `🚨 NEW LEAD — ${lead.source.toUpperCase()}`,
    `${lead.name} <${lead.email}>${lead.phone ? ` · ${lead.phone}` : ''}`,
    lead.company ? `Company: ${lead.company}` : null,
    lead.service ? `Service: ${lead.service}` : null,
    lead.budgetBand ? `Budget: ${lead.budgetBand}` : null,
    lead.timeline ? `Timeline: ${lead.timeline}` : null,
    lead.landingPage ? `Landed on: ${lead.landingPage}` : null,
    lead.message ? `\n${lead.message}` : null,
    `\n⏱ Reply within 5 minutes.`,
  ].filter(Boolean)

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: lines.join('\n') }),
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) {
      console.error('[lead:webhook] non-OK response', res.status, await safeText(res))
      return 'failed'
    }
    return 'sent'
  } catch (err) {
    console.error('[lead:webhook] threw', err)
    return 'failed'
  }
}

async function sendEmail(lead: NotifyPayload): Promise<ChannelResult> {
  const key = process.env.RESEND_API_KEY
  const to = process.env.LEAD_NOTIFY_EMAIL ?? SITE.contact.email

  if (!key) {
    console.warn('[lead:email] RESEND_API_KEY not set — no email sent')
    return 'not-configured'
  }

  /**
   * ⚠️ The `from` address is env-driven ON PURPOSE.
   *
   * Resend's sandbox sender `onboarding@resend.dev` works with ZERO DNS setup,
   * but it can only deliver to the address that owns the Resend account. That
   * is exactly what you want on day one. Hardcoding `noreply@labtechcrew.com`
   * — as this file used to — returns a 403 until the domain is verified, so
   * the form silently fails on the very first real submission.
   *
   * Once labtechcrew.com is verified in Resend, set LEAD_FROM_EMAIL to
   * "LabTechCrew <leads@labtechcrew.com>" and you can mail anyone.
   */
  const from = process.env.LEAD_FROM_EMAIL ?? `${SITE.name} <onboarding@resend.dev>`

  const row = (label: string, value?: string) =>
    value ? `<tr><td style="padding:6px 14px 6px 0;color:#666;white-space:nowrap">${label}</td><td style="padding:6px 0"><strong>${escapeHtml(value)}</strong></td></tr>` : ''

  const html = `
<div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:560px">
  <p style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#b23f49;margin:0 0 4px">New lead · ${escapeHtml(lead.source)}</p>
  <h2 style="margin:0 0 16px;font-size:22px">${escapeHtml(lead.name)}</h2>
  <table style="border-collapse:collapse;font-size:15px">
    ${row('Email', lead.email)}
    ${row('Phone', lead.phone)}
    ${row('Company', lead.company)}
    ${row('Service', lead.service)}
    ${row('Budget', lead.budgetBand)}
    ${row('Timeline', lead.timeline)}
    ${row('Landed on', lead.landingPage)}
  </table>
  ${lead.message ? `<p style="margin:18px 0 0;padding:14px;background:#f6f4fb;border-radius:8px;white-space:pre-wrap">${escapeHtml(lead.message)}</p>` : ''}
  <p style="margin:20px 0 0;font-size:14px;color:#666">Reply within 5 minutes — just hit reply, it goes straight to them.</p>
</div>`.trim()

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.email,
        subject: `New lead — ${lead.name}${lead.budgetBand ? ` (${lead.budgetBand})` : ''}`,
        html,
      }),
      signal: AbortSignal.timeout(8000),
    })

    if (!res.ok) {
      // Resend explains itself in the body. The old code threw this away, so a
      // 403 for an unverified domain was indistinguishable from success.
      console.error('[lead:email] Resend rejected', res.status, await safeText(res))
      return 'failed'
    }
    return 'sent'
  } catch (err) {
    console.error('[lead:email] threw', err)
    return 'failed'
  }
}

async function safeText(res: Response): Promise<string> {
  try {
    return (await res.text()).slice(0, 500)
  } catch {
    return '<unreadable body>'
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string,
  )
}

/** Cloudflare Turnstile server-side verification. Fails closed when configured. */
export async function verifyTurnstile(token: string | undefined, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true // not configured — allow, but configure it before paid traffic
  if (!token) return false

  const body = new URLSearchParams({ secret, response: token })
  if (ip) body.append('remoteip', ip)

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(8000),
    })
    const data = (await res.json()) as { success?: boolean }
    return data.success === true
  } catch {
    return false
  }
}
