'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BUDGET_BANDS, STARTER_PACKS } from '@/lib/site'

/**
 * BudgetMatcher — answers "can I afford this?" in one tap.
 *
 * ⚠️ THE PROBLEM IT SOLVES:
 * A visitor arriving on a pricing page with a small budget reads the first
 * five-figure number and leaves. They never scroll to the affordable options,
 * and no amount of good copy further down the page reaches someone who has
 * already closed the tab. That is the single most expensive moment on a
 * pricing page, and it happens in about three seconds.
 *
 * Inverting the question fixes it: instead of the site announcing its prices
 * and the visitor working out whether they qualify, the visitor states their
 * budget and the site shows what that buys. Nobody gets told they are too
 * small. Every budget gets a real answer.
 *
 * Deliberately NOT a form. No email required, no "unlock your quote". Asking
 * for contact details before giving the answer is the thing people expect and
 * resent, and it converts worse than simply being useful first.
 *
 * The buttons are BUDGET_BANDS from lib/site.ts — the same bands the contact
 * form select and the lead schema validate against — so the vocabulary here
 * and on the form the visitor lands on next is identical. Guidance copy per
 * band lives below; values and labels never drift from the source of truth.
 */

type BandValue = (typeof BUDGET_BANDS)[number]['value']

const GUIDANCE: Record<BandValue, { headline: string; body: string; packs: readonly string[] }> = {
  'under-2.5k': {
    headline: 'Yes, and you are not a second-class client here.',
    body: 'Every Starter Pack sits in this band: a brand identity, a business site written for search, an online store with payments configured, an AI assistant grounded on your own documents, or a mobile app shipped to both stores with the source code in your repository. Fixed price, real delivery date, full ownership. This is where most of our long-running clients started.',
    packs: [
      'Logo & Brand Kit',
      'One-Page Website',
      'Business Website',
      'Online Store Starter',
      'AI Assistant Starter',
      'Mobile App MVP',
    ],
  },
  '2.5-5k': {
    headline: 'Custom territory starts here: built to your requirements.',
    body: 'Open scope, quoted per phase, approved before anything starts. A marketing site with a custom CMS, or a focused automation across your existing tools.',
    packs: [],
  },
  '5-15k': {
    headline: 'Custom territory: built to your requirements.',
    body: 'Open scope, quoted per phase, approved before anything starts. A marketing site with a custom CMS, a multi-step automation across your existing tools, or a focused product build.',
    packs: [],
  },
  '15-50k': {
    headline: 'A full platform, phased so you are never over-committed.',
    body: 'Custom software, SaaS with billing and multi-tenancy, or an AI system across several data sources. Fixed price per phase, with a clean exit at every boundary.',
    packs: [],
  },
  '50-150k': {
    headline: 'A full platform, phased so you are never over-committed.',
    body: 'Custom software, SaaS and AI systems across several data sources, delivered as a phased programme. Fixed price per phase, with a clean exit at every boundary.',
    packs: [],
  },
  '150k+': {
    headline: 'A full platform, phased so you are never over-committed.',
    body: 'Custom software, SaaS and AI systems across several data sources, delivered as a phased programme. Fixed price per phase, with a clean exit at every boundary.',
    packs: [],
  },
}

export function BudgetMatcher() {
  const [selected, setSelected] = useState<BandValue | null>(null)
  const band = BUDGET_BANDS.find((b) => b.value === selected)
  const guidance = selected ? GUIDANCE[selected] : null
  const matched = guidance ? STARTER_PACKS.filter((p) => guidance.packs.includes(p.name)) : []

  return (
    <div className="panel rounded-(--radius-xl) p-8">
      <h3 className="text-h3">What can I actually get for my budget?</h3>
      <p className="mt-2 text-(--color-text-muted)">
        Pick a range. No email, no form: the answer is right here.
      </p>

      <div
        role="group"
        aria-label="Select your budget range"
        className="mt-6 flex flex-wrap gap-3"
      >
        {BUDGET_BANDS.map((b) => {
          const on = selected === b.value
          return (
            <button
              key={b.value}
              type="button"
              aria-pressed={on}
              onClick={() => setSelected(on ? null : b.value)}
              className={
                on
                  ? 'rounded-(--radius-md) bg-(--color-accent) px-4 py-2.5 font-semibold text-(--color-accent-contrast)'
                  : 'rounded-(--radius-md) border border-white/20 px-4 py-2.5 font-medium text-(--color-text-muted) transition-colors hover:border-coral-500/50 hover:text-white'
              }
            >
              {b.label}
            </button>
          )
        })}
      </div>

      {band && guidance ? (
        /* aria-live so the answer is announced rather than silently appearing */
        <div aria-live="polite" className="mt-8 border-t border-white/10 pt-6">
          <p className="font-(family-name:--font-display) text-[1.375rem] font-bold text-white">
            {guidance.headline}
          </p>
          <p className="mt-2 text-(--color-text-muted)">{guidance.body}</p>

          {matched.length > 0 ? (
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {matched.map((p) => (
                <li
                  key={p.name}
                  className="rounded-(--radius-md) border border-white/12 p-4"
                >
                  <p className="font-semibold text-white">{p.name}</p>
                  <p className="font-(family-name:--font-display) text-[1.25rem] font-bold text-(--color-accent)">
                    ${p.price.toLocaleString('en-US')}
                  </p>
                  <p className="text-small text-(--color-text-subtle)">{p.timeline}</p>
                </li>
              ))}
            </ul>
          ) : null}

          <Link
            href="/contact/"
            className="mt-6 inline-block rounded-(--radius-md) bg-(--color-accent) px-5 py-3 font-semibold text-(--color-accent-contrast) transition-opacity hover:opacity-90"
          >
            Tell us what you are building →
          </Link>
        </div>
      ) : null}
    </div>
  )
}
