'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BookingPanel } from '@/components/sections/booking-panel'
import { Button } from '@/components/ui/button'
import { Field, Input, Textarea, Select, Checkbox, Honeypot } from '@/components/ui/field'
import { leadTier1Schema, leadTier2Schema, type LeadTier1, type LeadTier2 } from '@/lib/schema'
import { BUDGET_BANDS, TIMELINES, SERVICE_TIERS, SITE } from '@/lib/site'

/**
 * Blueprint §4.8 — Halo Lab's three-tier pattern, the best contact page found.
 *
 * Tier 1 (quick):  3 fields, minimum friction.
 * Tier 2 (brief):  budget REQUIRED — the cheapest tire-kicker filter there is.
 * Tier 3 (call):   a scheduling embed, rendered separately.
 *
 * On field count, honestly: there is NO trustworthy controlled study isolating
 * form length for B2B services. Most of the "5 fields = 17% CVR" tables in
 * circulation are AI-generated with fabricated citations. 3–5 is the
 * defensible range. What IS well evidenced is that offering instant
 * scheduling on the success state takes form-to-meeting from ~30% to ~67%
 * (Chili Piper, ~4M submissions) — a far bigger lever than one extra field.
 * So: do not agonise over fields. Build the success state.
 */

type Props = { tier: 'quick' | 'brief' }

function useAttribution() {
  const [attribution, setAttribution] = useState<Record<string, unknown>>({})
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setAttribution({
      landingPage: window.location.pathname + window.location.search,
      referrer: document.referrer || undefined,
      utm: {
        source: params.get('utm_source') ?? undefined,
        medium: params.get('utm_medium') ?? undefined,
        campaign: params.get('utm_campaign') ?? undefined,
        content: params.get('utm_content') ?? undefined,
        term: params.get('utm_term') ?? undefined,
      },
    })
  }, [])
  return attribution
}

export function LeadForm({ tier }: Props) {
  const attribution = useAttribution()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const schema = tier === 'quick' ? leadTier1Schema : leadTier2Schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadTier1 | LeadTier2>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    defaultValues: { tier: tier === 'quick' ? 'quick' : 'brief' } as never,
  })

  async function onSubmit(values: LeadTier1 | LeadTier2) {
    setStatus('sending')
    try {
      // NOTE THE TRAILING SLASH. `trailingSlash: true` applies to API routes
      // too, so POSTing to '/api/lead' returns a 308 and costs every form
      // submission an extra round trip before the body is even read. Caught by
      // testing the endpoint with curl, not visible in the browser.
      const res = await fetch('/api/lead/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, ...attribution }),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="panel rounded-(--radius-lg) p-6">
        <h3 className="text-h3">Got it. We will reply within one business day.</h3>
        <p className="mt-2 text-(--color-text-muted)">
          If you would rather not wait, book a time directly. Most scoping calls happen the same
          week.
        </p>
        <div className="mt-4">
          <BookingPanel compact />
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative flex flex-col gap-5" noValidate>
      <Honeypot {...register('website_url')} />
      <input type="hidden" {...register('tier')} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name" required error={errors.name?.message}>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            {...register('name')}
          />
        </Field>

        <Field label="Company email" htmlFor="email" required error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Phone"
          htmlFor="phone"
          hint="Optional — but it is how we reply fastest."
          error={errors.phone?.message}
        >
          <Input
            id="phone"
            type="tel"
            inputMode="numeric"
            pattern="\+?[0-9\s\-\(\)]*"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            {...register('phone')}
          />
        </Field>

        {tier === 'brief' ? (
          <Field label="Company" htmlFor="company">
            <Input id="company" autoComplete="organization" {...register('company' as never)} />
          </Field>
        ) : null}
      </div>

      {tier === 'brief' ? (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="What do you need?"
              htmlFor="service"
              required
              error={(errors as Record<string, { message?: string }>).service?.message}
            >
              <Select id="service" defaultValue="" {...register('service' as never)}>
                <option value="" disabled>
                  Select a service
                </option>
                {SERVICE_TIERS.map((tierGroup) => (
                  <optgroup key={tierGroup.id} label={tierGroup.label}>
                    {tierGroup.services.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </Select>
            </Field>

            <Field
              label="Budget"
              htmlFor="budgetBand"
              required
              hint="We publish our ranges so nobody wastes a call."
              error={(errors as Record<string, { message?: string }>).budgetBand?.message}
            >
              <Select id="budgetBand" defaultValue="" {...register('budgetBand' as never)}>
                <option value="" disabled>
                  Select a range
                </option>
                {BUDGET_BANDS.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <Field label="Timeline" htmlFor="timeline">
            <Select id="timeline" defaultValue="" {...register('timeline' as never)}>
              <option value="">No fixed date</option>
              {TIMELINES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </Select>
          </Field>

          <Field
            label="What are you trying to build?"
            htmlFor="message"
            required
            error={(errors as Record<string, { message?: string }>).message?.message}
          >
            <Textarea id="message" {...register('message' as never)} />
          </Field>
        </>
      ) : null}

      <Checkbox
        id="consent"
        label="You can email me about my enquiry and occasionally about relevant work."
        {...register('consent')}
      />

      {/* TODO Phase 4: <Turnstile sitekey={NEXT_PUBLIC_TURNSTILE_SITE_KEY} /> */}

      <div className="flex flex-col gap-3">
        <Button type="submit" size="lg" disabled={status === 'sending'}>
          {status === 'sending'
            ? 'Sending...'
            : tier === 'quick'
              ? 'Discuss my project'
              : 'Send my project brief'}
        </Button>
        <p className="text-small text-(--color-text-subtle)">
          We reply within one business day. We will sign a mutual NDA before the call if you want
          one — zero obligation.
        </p>
        {status === 'error' ? (
          /* A failed submit is the most expensive moment on the site: the
             visitor is already sold and now the form is the only thing in the
             way. Never dead-end them — hand over a live phone number and a
             mailto so the enquiry still lands. */
          <div
            role="alert"
            className="rounded-(--radius-md) border border-(--color-danger)/40 bg-(--color-danger)/10 p-4"
          >
            <p className="text-small font-semibold text-(--color-danger)">
              That did not go through — and we do not want to lose you.
            </p>
            <p className="mt-1 text-small text-(--color-text-muted)">
              Reach us directly and we will pick it up right away:{' '}
              <a
                href={`mailto:${SITE.contact.email}?subject=Project%20enquiry`}
                className="font-semibold text-(--color-accent) underline underline-offset-2"
              >
                {SITE.contact.email}
              </a>{' '}
              or{' '}
              <a
                href={`tel:${SITE.contact.phone}`}
                className="font-semibold text-(--color-accent) underline underline-offset-2"
              >
                {SITE.contact.phoneDisplay}
              </a>.
            </p>
          </div>
        ) : null}
      </div>
    </form>
  )
}
