import type { Metadata } from 'next'
import { Container, Section, SectionHeading } from '@/components/ui/layout'
import { CalendlyEmbed } from '@/components/sections/calendly-embed'
import { LeadForm } from '@/components/forms/lead-form'
import { JsonLd } from '@/components/ui/json-ld'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import { SITE } from '@/lib/site'

/**
 * Contact — three tiers on one page (blueprint §4.8), copied from Halo Lab,
 * the best-structured contact page found in the competitor teardown.
 *
 * Title rewritten from the live site's "Labtechcrew: Contact - Top Software
 * Development Company USA" — "Top" is an unsubstantiated superlative sitting
 * in the Google snippet, and you cannot rank for it anyway.
 */
export const metadata: Metadata = pageMetadata({
  title: 'Contact LabTechCrew: Get a Project Estimate',
  description:
    'Tell us what you are building. A 20-minute call, then a written scope with a fixed price and dates. Contracted through a Texas LLC.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact' }])}
      />

      <Section>
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_22rem]">
            <div className="flex flex-col gap-16">
              {/* Tier 1 — low friction */}
              <div className="flex flex-col gap-6">
                <SectionHeading
                  eyebrow="Start here"
                  title="Let's build something together"
                  lead="Three fields. We reply within one business day."
                />
                <LeadForm tier="quick" />
              </div>

              {/* Tier 2 — qualified */}
              <div className="flex flex-col gap-6 border-t border-white/10 pt-16">
                <SectionHeading
                  eyebrow="Or go deeper"
                  title="Tell us about the project in detail"
                  lead="Give us the budget range and we will come back with a real scope instead of a discovery call."
                />
                <LeadForm tier="brief" />
              </div>

              {/* Tier 3 — high intent */}
              <div id="book" className="flex flex-col gap-6 border-t border-white/10 pt-16">
                <SectionHeading
                  eyebrow="Skip the form"
                  title={
                    SITE.bookingUrl
                      ? 'Book your free 20-minute call'
                      : 'Skip the form and just call us'
                  }
                  lead={
                    SITE.bookingUrl
                      ? `Pick any slot in our working day, ${SITE.hours.display}. No prep needed.`
                      : 'Twenty minutes, no prep, no pitch. Tell us what you are trying to build and we will tell you honestly whether we are the right team for it.'
                  }
                />
                <CalendlyEmbed />
              </div>
            </div>

            <aside className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
              <div className="panel rounded-(--radius-lg) p-6">
                <h2 className="text-h3">Talk to a person</h2>
                <address className="mt-3 not-italic text-(--color-text-muted)">
                  <a href={`tel:${SITE.contact.phone}`} className="font-medium text-(--color-accent) hover:underline">
                    {SITE.contact.phoneDisplay}
                  </a>
                  <br />
                  <a href={`mailto:${SITE.contact.email}`} className="text-(--color-accent) hover:underline">
                    {SITE.contact.email}
                  </a>
                </address>
                <p className="mt-4 text-small text-(--color-text-subtle)">
                  Answered {SITE.hours.display}.
                </p>
              </div>

              <div className="panel rounded-(--radius-lg) p-6">
                <h2 className="text-h3">Where we are</h2>
                <address className="mt-3 not-italic text-small leading-relaxed text-(--color-text-subtle)">
                  <strong className="block text-white">{SITE.legalName}</strong>
                  {SITE.address.street ? (
                    <>
                      {SITE.address.street}
                      <br />
                    </>
                  ) : null}
                  {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}
                </address>
                <p className="mt-4 text-small text-(--color-text-subtle)">
                  {SITE.jurisdiction}, governed by Texas law. Serving clients across the{' '}
                  {SITE.markets.join(' and ')}.
                </p>
              </div>

              <div className="panel rounded-(--radius-lg) p-6">
                <h2 className="text-h3">Before you ask</h2>
                <ul className="mt-3 flex flex-col gap-3 text-small text-(--color-text-muted)">
                  <li>We sign a mutual NDA before the call if you want one. Zero obligation.</li>
                  <li>
                    We invoice per phase, and a phase is only invoiced once you have seen it and
                    signed it off. Full code and IP ownership transfers to you on final payment.
                  </li>
                  <li>Your contract is with {SITE.legalName}, {SITE.jurisdiction}.</li>
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  )
}
