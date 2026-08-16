import { NextResponse } from 'next/server'
import { leadRequestSchema, deriveSource } from '@/lib/schema'
import { connectToDatabase, isDatabaseConfigured } from '@/lib/db'
import { LeadModel } from '@/lib/models/lead'
import { notifyTeam, verifyTurnstile } from '@/lib/notify'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Crude in-memory rate limit. Replace with Upstash/Vercel KV before scale. */
const hits = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 5

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = hits.get(ip)
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  entry.count += 1
  return entry.count > MAX_PER_WINDOW
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'Too many requests' }, { status: 429 })
  }

  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  // Server-side validation. Never trust the browser — bots do not run your JS.
  const parsed = leadRequestSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Validation failed', issues: parsed.error.flatten() },
      { status: 422 },
    )
  }
  const data = parsed.data

  // Honeypot. Return 200 so bots do not learn they were caught.
  if (data.website_url) {
    return NextResponse.json({ ok: true })
  }

  if (!(await verifyTurnstile(data.turnstileToken, ip))) {
    return NextResponse.json({ ok: false, error: 'Verification failed' }, { status: 403 })
  }

  const source = deriveSource(data.utm, data.referrer)

  const record = {
    name: data.name,
    email: data.email,
    phone: 'phone' in data ? data.phone : undefined,
    company: 'company' in data ? data.company : undefined,
    tier: data.tier,
    service: 'service' in data ? data.service : undefined,
    budgetBand: 'budgetBand' in data ? data.budgetBand : undefined,
    timeline: 'timeline' in data ? data.timeline : undefined,
    message: 'message' in data ? data.message : undefined,
    source,
    utm: data.utm,
    landingPage: data.landingPage,
    referrer: data.referrer,
    status: 'new' as const,
    consent: { marketing: Boolean(data.consent), at: new Date() },
    ip,
    userAgent: request.headers.get('user-agent') ?? undefined,
  }

  // Persist first. A notification failure must never lose a lead.
  let persisted = false
  if (isDatabaseConfigured) {
    let connected = false
    try {
      await connectToDatabase()
      connected = true
    } catch (err) {
      // Distinct from the write failure below: a connect failure means Mongo
      // itself is unreachable, so EVERY lead until recovery is email-only.
      console.error('[lead] DB CONNECT failed — Mongo unreachable, lead not persisted', {
        email: record.email,
        err,
      })
    }
    if (connected) {
      try {
        await LeadModel.create(record)
        persisted = true
      } catch (err) {
        // The DB is up but the insert was rejected (schema drift, enum, etc).
        console.error('[lead] DB WRITE failed — insert rejected, lead not persisted', {
          email: record.email,
          err,
        })
      }
    }
  } else {
    console.warn('[lead] MONGODB_URI not set — lead not persisted', record.email)
  }

  const notified = await notifyTeam({
    name: record.name,
    email: record.email,
    phone: record.phone,
    company: record.company,
    service: record.service,
    budgetBand: record.budgetBand,
    timeline: record.timeline,
    message: record.message,
    source,
    landingPage: record.landingPage,
  })

  /**
   * ⚠️ THE FALSE-SUCCESS GUARD (do not regress).
   *
   * If the lead was neither stored nor delivered to a human, it does not
   * exist. Returning `{ ok: true }` here would show the visitor a thank-you
   * screen for an enquiry that vanished — and you would only discover it by
   * wondering why a month of ad spend produced no enquiries.
   *
   * Fail loudly instead: the form shows the phone number and email so the
   * visitor can still reach you, and the full lead is dumped to the logs
   * where it is recoverable from the Vercel dashboard.
   */
  if (!persisted && !notified.delivered) {
    console.error(
      '[lead] UNDELIVERED — no channel accepted this lead. Recover it from this log line:',
      JSON.stringify({ ...record, notifyResult: notified }),
    )
    return NextResponse.json(
      { ok: false, error: 'delivery_failed' },
      { status: 502 },
    )
  }

  if (!notified.delivered) {
    // Stored but nobody was told. Not fatal, but it breaks the 5-minute reply.
    console.error('[lead] stored but NOT notified — check env config', notified)
  }

  return NextResponse.json({ ok: true })
}
