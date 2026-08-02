import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check } from 'lucide-react'
import { Container, Section, Eyebrow, highlight } from '@/components/ui/layout'
import { Card } from '@/components/ui/card'
import { LeadForm } from '@/components/forms/lead-form'
import { Wordmark } from '@/components/ui/logo'
import { pageMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'
import { CAMPAIGNS, getCampaign } from '@/lib/data/campaigns'

/**
 * Paid-traffic landing pages. `noindex`, and disallowed in robots.ts.
 *
 * WHY THESE EXIST AT ALL: never send Meta or Bark traffic to the homepage. A
 * homepage is built to serve every visitor and therefore converts none of them
 * especially well. These pages have one offer, one form, no navigation to
 * escape through, and a static hero — because Meta traffic is overwhelmingly
 * mobile, where conversion runs around 1.53% against 3.9% on desktop, and
 * Google/Deloitte measured a 21.6% improvement in lead-form completion per
 * 0.1s of LCP gained.
 *
 * Header and footer are deliberately stripped down: logo only, no nav links.
 * Every extra link is a way out.
 */

export function generateStaticParams() {
  return CAMPAIGNS.map((c) => ({ campaign: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ campaign: string }>
}): Promise<Metadata> {
  const { campaign } = await params
  const c = getCampaign(campaign)
  if (!c) return {}

  return pageMetadata({
    title: c.title,
    description: c.description,
    path: `/lp/${campaign}`,
    noindex: true, // never index a landing page — it will cannibalise the service page
  })
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ campaign: string }>
}) {
  const { campaign } = await params
  const c = getCampaign(campaign)
  if (!c) notFound()

  return (
    <>
      {/* Stripped header — logo only, no escape routes. */}
      <div className="border-b border-white/10 py-4">
        <Container>
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <Wordmark className="h-8 w-auto" />
            </Link>
            <a
              href={`tel:${SITE.contact.phone}`}
              className="text-small font-medium text-(--color-text-muted) hover:text-white"
            >
              {SITE.contact.phoneDisplay}
            </a>
          </div>
        </Container>
      </div>

      <Section className="py-14 md:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_28rem] lg:items-start">
            {/* --- The offer ------------------------------------------- */}
            <div className="flex flex-col gap-6">
              <Eyebrow>{c.eyebrow}</Eyebrow>
              <h1 className="text-display-1">{highlight(c.headline, c.headlineAccent)}</h1>
              <p className="text-body-lg prose-measure text-(--color-text-muted)">{c.subhead}</p>

              <ul className="mt-2 flex flex-col gap-3">
                {c.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-coral-500/20">
                      <Check className="size-3 text-(--color-accent)" aria-hidden="true" />
                    </span>
                    <span className="text-(--color-text-muted)">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {SITE.differentiators.slice(0, 4).map((d) => (
                  <Card key={d.title} className="gap-1.5 p-5">
                    <h2 className="text-[1rem] font-semibold text-white">{d.title}</h2>
                    <p className="text-small text-(--color-text-subtle)">{d.body}</p>
                  </Card>
                ))}
              </div>

              <div className="panel mt-4 rounded-(--radius-lg) p-6">
                <p className="text-eyebrow uppercase text-(--color-accent)">Proof, not a promise</p>
                <p className="mt-2 text-(--color-text-muted)">{c.proof}</p>
              </div>
            </div>

            {/* --- The form -------------------------------------------- */}
            <aside
              id="form"
              className="panel flex flex-col gap-5 rounded-(--radius-xl) p-6 md:p-8 lg:sticky lg:top-8"
            >
              <div>
                <h2 className="text-h3">{c.formHeading}</h2>
                <p className="mt-2 text-small text-(--color-text-subtle)">{c.formSubhead}</p>
              </div>
              <LeadForm tier={c.formTier} />
            </aside>
          </div>
        </Container>
      </Section>

      {/* Stripped footer — the legal minimum, nothing to click away to. */}
      <div className="border-t border-white/10 py-8">
        <Container>
          <p className="text-small text-(--color-text-subtle)">
            © {new Date().getFullYear()} {SITE.legalName}, {SITE.jurisdiction} ·{' '}
            <Link href="/legal/privacy/" className="hover:text-white">
              Privacy
            </Link>{' '}
            ·{' '}
            <Link href="/legal/terms/" className="hover:text-white">
              Terms
            </Link>
          </p>
        </Container>
      </div>
    </>
  )
}
