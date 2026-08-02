'use client'

import { useState } from 'react'
import Link from 'next/link'
import { STARTER_PACKS } from '@/lib/site'

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
 */

const BANDS = [
  {
    id: 'under-500',
    label: 'Under $500',
    headline: 'Yes — and you are not a second-class client here.',
    body: 'A complete brand identity, or a one-page site that is genuinely finished. Fixed price, real delivery date, full ownership. This is where most of our long-running clients started.',
    packs: ['Logo & Brand Kit', 'One-Page Website'],
  },
  {
    id: '500-1500',
    label: '$500 – $1,500',
    headline: 'A proper business website, or your first online store.',
    body: 'Enough for a six-page site written for search and for buyers, or a storefront with payments, shipping and order tracking configured and handed over.',
    packs: ['Business Website', 'Online Store Starter'],
  },
  {
    id: '1500-3000',
    label: '$1,500 – $3,000',
    headline: 'Software that does real work, not just a brochure.',
    body: 'An AI assistant grounded on your own documents that cites its sources, or a mobile app MVP shipped to both stores with your source code in your repository.',
    packs: ['AI Assistant Starter', 'Mobile App MVP'],
  },
  {
    id: '3000-10000',
    label: '$3,000 – $10,000',
    headline: 'Custom territory — built to your requirements.',
    body: 'Open scope, quoted per phase, approved before anything starts. A marketing site with a custom CMS, a multi-step automation across your existing tools, or a focused product build.',
    packs: [],
  },
  {
    id: 'over-10000',
    label: 'Over $10,000',
    headline: 'A full platform, phased so you are never over-committed.',
    body: 'Custom software, SaaS with billing and multi-tenancy, or an AI system across several data sources. Fixed price per phase, with a clean exit at every boundary.',
    packs: [],
  },
] as const

export function BudgetMatcher() {
  const [selected, setSelected] = useState<string | null>(null)
  const band = BANDS.find((b) => b.id === selected)
  const matched = band ? STARTER_PACKS.filter((p) => band.packs.includes(p.name as never)) : []

  return (
    <div className="panel rounded-(--radius-xl) p-8">
      <h3 className="text-h3">What can I actually get for my budget?</h3>
      <p className="mt-2 text-(--color-text-muted)">
        Pick a range. No email, no form — the answer is right here.
      </p>

      <div
        role="group"
        aria-label="Select your budget range"
        className="mt-6 flex flex-wrap gap-3"
      >
        {BANDS.map((b) => {
          const on = selected === b.id
          return (
            <button
              key={b.id}
              type="button"
              aria-pressed={on}
              onClick={() => setSelected(on ? null : b.id)}
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

      {band ? (
        /* aria-live so the answer is announced rather than silently appearing */
        <div aria-live="polite" className="mt-8 border-t border-white/10 pt-6">
          <p className="font-(family-name:--font-display) text-[1.375rem] font-bold text-white">
            {band.headline}
          </p>
          <p className="mt-2 text-(--color-text-muted)">{band.body}</p>

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
