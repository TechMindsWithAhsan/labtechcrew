import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Section, SectionHeading, Eyebrow } from '@/components/ui/layout'
import { Card, Badge } from '@/components/ui/card'
import { ButtonLink } from '@/components/ui/button'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { ProcessSteps, PriceBands, CtaBand } from '@/components/sections/blocks'
import { FaqSection } from '@/components/sections/faq'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import { SERVICE_TIERS } from '@/lib/site'
import { getService } from '@/lib/content'

/**
 * Services hub.
 *
 * TITLE REWRITTEN from the live site's "LabTechCrew: Best Web Development
 * Company – Digital Services". "Best" is an unsubstantiated superlative that
 * is currently sitting inside the Google snippet, and it is not a term you can
 * rank for. Removing it is both a legal and an SEO-honesty win.
 */
export const metadata: Metadata = pageMetadata({
  title: 'Software, App & AI Development Services',
  description:
    'Web and mobile development, custom software, AI assistants, voice agents, automation, design and brand strategy — delivered by one team, contracted through a Texas LLC.',
  path: '/services',
})

const FAQS = [
  {
    q: 'Do you take on small jobs?',
    a: 'Yes. Our Starter Packs are fixed-price and fixed-scope — $299 for a logo and brand kit, $499 for a one-page site, $899 for a business site. Published on the pricing page with what is and is not included. Most long client relationships start small, and we would rather earn the bigger project than be handed it.',
  },
  {
    q: 'Can one team really cover all of this?',
    a: 'It is four founders and a small crew, not a hundred people pretending to be specialists in everything. The honest version: design, web, mobile, AI and automation are what we build ourselves. Anything outside that we will tell you we do not do, and usually point you at someone who does.',
  },
  {
    q: 'What if I do not know which service I need?',
    a: 'That is the normal case. Book the 20-minute call and describe the problem rather than the solution. About a third of the time the answer is cheaper and smaller than what the enquiry asked for, and we say so.',
  },
  {
    q: 'How do you price?',
    a: 'Fixed price per phase. We scope, price it, you approve before it starts. No hourly billing, so the incentive stays on shipping rather than on hours, and you can stop cleanly after any phase.',
  },
]

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services' }])} />

      <Section className="pb-12 md:pb-16">
        <Container>
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Services' }]} />
          <div className="flex max-w-3xl flex-col gap-5">
            <Eyebrow>What we do</Eyebrow>
            <h1 className="text-display-1">
              Nine services. <span className="em-accent">One team</span> that answers for all of
              them.
            </h1>
            <p className="text-body-lg text-(--color-text-muted)">
              Most agencies list everything and specialise in nothing. Here is the honest map: what
              we build ourselves, what each one costs, and which of our own projects proves it.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <ButtonLink href="/contact/" size="lg">
                Get my project estimate
              </ButtonLink>
              <ButtonLink href="/pricing/" size="lg" variant="secondary">
                See pricing first
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {SERVICE_TIERS.map((tier, tierIndex) => (
        <Section
          key={tier.id}
          tone={tierIndex % 2 === 1 ? 'veil' : 'default'}
          glow={tierIndex === 1 ? 'right' : undefined}
          className="py-16 md:py-20"
        >
          <Container>
            <SectionHeading eyebrow={tier.label} title={tier.blurb} />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {tier.services.map((s) => {
                const full = getService(s.slug)
                return (
                  <Card key={s.slug} href={`/services/${s.slug}/`} className="h-full gap-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-h3">{s.name}</h3>
                      {full ? <Badge tone="accent">{full.priceLabel}</Badge> : null}
                    </div>
                    <p className="text-(--color-text-muted)">{s.outcome}</p>
                    {full ? (
                      <ul className="mt-1 flex flex-col gap-1.5">
                        {full.forWho.slice(0, 2).map((f) => (
                          <li
                            key={f}
                            className="flex gap-2 text-small text-(--color-text-subtle)"
                          >
                            <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-coral-500" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <span className="mt-auto pt-2 text-small font-semibold text-(--color-accent)">
                      What&rsquo;s included →
                    </span>
                  </Card>
                )
              })}
            </div>
          </Container>
        </Section>
      ))}

      <Section className="py-16 md:py-20">
        <Container>
          <div className="panel flex flex-col gap-4 rounded-(--radius-xl) p-8 md:p-10">
            <Eyebrow>Not on this list</Eyebrow>
            <h2 className="text-h3">Things we used to offer, and stopped</h2>
            <p className="prose-measure text-(--color-text-muted)">
              We no longer take on paid-media management or game development. Both were real
              services and we could keep selling them — but we were not the best team a client
              could hire for either, and a full-service list you cannot back up is how agencies end
              up competing on price. If you need those, ask us and we will point you somewhere
              good.
            </p>
            <p className="prose-measure text-(--color-text-muted)">
              We do still build the <Link href="/services/mobile-app-development/" className="text-(--color-accent) hover:underline">mobile apps</Link>{' '}
              and the{' '}
              <Link href="/services/website-development/" className="text-(--color-accent) hover:underline">
                sites and landing pages
              </Link>{' '}
              that paid campaigns point at — that part we are good at.
            </p>
          </div>
        </Container>
      </Section>

      <ProcessSteps />
      <PriceBands />
      <FaqSection items={FAQS} title="Before you enquire" accent="enquire" />
      <CtaBand />
    </>
  )
}
