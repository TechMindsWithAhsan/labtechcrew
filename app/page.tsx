import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Section, SectionHeading, Eyebrow } from '@/components/ui/layout'
import { Hero } from '@/components/sections/hero'
import characterHome from '@/public/characters/home.webp'
import { Card } from '@/components/ui/card'
import { ButtonLink } from '@/components/ui/button'
import { ProductShot } from '@/components/ui/product-shot'
import {
  ProofStrip,
  Differentiators,
  ServiceTiers,
  ProcessSteps,
  PriceBands,
  CaseStudyCard,
  CtaBand,
} from '@/components/sections/blocks'
import { FaqSection } from '@/components/sections/faq'
import { Testimonials } from '@/components/sections/testimonials'
import { pageMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'
import { CASE_STUDIES, getCaseStudy, featuredCaseStudies } from '@/lib/content'

/**
 * Home — section order per blueprint §4.1.
 *
 * `title.absolute` because a page-level `template` has no effect and the root
 * template would otherwise render "LabTechCrew | LabTechCrew".
 *
 * POSITIONING NOTE: the homepage says ONE thing — AI systems and the products
 * around them, proven on our own product. The full nine-service list lives on
 * /services/ and in the footer. Every service on a homepage reads as generalist
 * to a US buyer, and generalist reads as cheap, which is the exact fear they
 * already have about an offshore team.
 */
export const metadata: Metadata = {
  ...pageMetadata({
    title: `${SITE.name}: AI, Web & App Development for US Business`,
    description: SITE.description,
    path: '/',
  }),
  /**
   * ⚠️ FROZEN. This is the EXACT title tag Google currently has indexed for
   * the homepage. Do not change it on launch day.
   *
   * The homepage ranks for your brand term, it feeds the sitelinks block, and
   * it is the one result a US buyer sees when they search "labtechcrew" after
   * seeing an ad. Changing the URL structure AND the title in the same week
   * gives you two variables when something moves, and no way to tell which one
   * did it.
   *
   * WHEN TO CHANGE IT: once Search Console shows clicks and impressions back
   * at pre-migration levels — realistically week 6 to 8. Change it alone, on a
   * quiet day, and watch it for a fortnight. A good replacement, when you are
   * ready:
   *   'AI Agents, Custom Software & Apps for US Business | LabTechCrew'
   */
  title: {
    absolute: 'Custom AI Agents & Knowledge Assistants | LabTechCrew',
  },
}

const FAQS = [
  {
    q: 'Who am I actually contracting with?',
    a: `${SITE.legalName}, ${SITE.jurisdiction}, under a master services agreement governed by Texas law. One entity, in your jurisdiction, to hold accountable, not a marketplace listing and not a broker who subcontracts you onward. We work with clients across the ${SITE.markets.join(' and ')}, we are open ${SITE.hours.display}, and there is a US phone number in the footer that a person answers.`,
  },
  {
    q: 'Who owns the code, and when?',
    a: 'You do, in full, on final payment for the engagement. Until then you hold a license to use everything we have delivered so you can review and evaluate it, and we retain title. What makes that safe is the phase structure: we take an advance to begin, then invoice one phase at a time (discovery, design, frontend, backend, QA and launch), and each phase is scoped, quoted and approved in writing before it starts, then demonstrated and signed off by you before it is invoiced. You are never asked to pay for work you have not seen, and you can stop at any phase boundary.',
  },
  {
    q: 'Will you sign an NDA?',
    a: 'Yes, a mutual one, before the first call if you want it. Zero obligation and no minimum project size.',
  },
  {
    q: 'How do we pay you?',
    a: 'However your finance team already pays vendors: ACH bank transfer, domestic or international wire, credit or debit card (Visa, Mastercard, American Express and Discover, processed through Stripe), Square, PayPal, Wise, or a company check. Invoiced in USD with a W-9 on file, so there is nothing to escalate. Above $10,000 we invoice by ACH or wire, because card processing fees on a five-figure invoice come out of the project budget rather than ours.',
  },
  {
    q: 'Do you take small projects?',
    a: 'Yes, and we do not treat them as a favor. Our Starter Packs are fixed-price and start at $299 for a logo and brand kit, $499 for a one-page site. They are complete pieces of work, not trial versions. Most long relationships start small.',
  },
  {
    q: 'What happens on the first call?',
    a: 'Twenty minutes. We ask what changes for your business if this works, not which technology you want. You get a written scope with a fixed price and dates within three to five days. It is free, and about a third of the time we tell you the answer is smaller and cheaper than you asked for.',
  },
]

const PROVES = [
  ['Retrieval architecture', 'Answers assembled from your documents, with the source attached, not from model memory.'],
  ['Refusal design', 'A written boundary of what the system will not answer, and where it hands to a human.'],
  ['Full-stack delivery', 'Architecture, evaluation, web client, mobile client and brand, by one team.'],
  ['Built for children, audited for it', 'PIPEDA, GDPR and COPPA expectations designed in, not retrofitted.'],
]

export default async function HomePage() {
  const flagship = getCaseStudy(SITE.flagship.slug)
  const featured = featuredCaseStudies(4).filter((c) => c.slug !== SITE.flagship.slug).slice(0, 3)

  return (
    <>
      <Hero
        eyebrow="AI systems · Custom software · Web & mobile"
        title="We built the AI first. Then we started selling it."
        accent="built the AI first"
        lead="LabTechCrew builds AI assistants that answer from your own verified data, plus the web, mobile and software products around them. We proved the architecture on our own platform before offering it to anyone else. You can go and use it right now."
        microTrust={[
          'Texas LLC · Texas law',
          SITE.hours.display,
          'Full code & IP transfer on final payment',
        ]}
        character={{
          src: characterHome,
          alt: 'Humanoid robot character standing, white and violet with glowing eyes',
        }}
      />

      {/*
        OWN WORK ONLY — no third-party logos without written permission.

        Pass the case studies themselves, never a list of names. The array that
        used to live here was hand-typed and still said "uLoad" long after the
        client was renamed to Utrade Logistics in lib/data/work.ts. It had also
        quietly dropped 2 of the 8 studies with no record of why. Names and
        categories are derived in ProofStrip now.
      */}
      <ProofStrip studies={CASE_STUDIES} />

      {/* --- The flagship, stated early. It is the whole argument. -------- */}
      {flagship ? (
        /* loose: this is the page's central claim and the only full-bleed
           statement on it. Its original override was py-20 md:py-28, which is
           exactly what loose now is. */
        <Section glow="right" space="loose">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
              <div className="flex flex-col gap-5">
                <Eyebrow>Our own product</Eyebrow>
                <h2 className="text-display-2">
                  Anyone can wire a chat box to a model.{' '}
                  <span className="em-accent">We built the part that says no.</span>
                </h2>
                <p className="text-body-lg text-(--color-text-muted)">
                  A teaching institution running one-to-one classes since 2008 asked whether AI
                  could reach the students they could never staff for, without saying something
                  wrong to a child, about a subject where being wrong is not a support ticket.
                </p>
                <p className="text-body-lg text-(--color-text-muted)">
                  Eight months later, {SITE.flagship.name} is live. Every answer is built from an
                  indexed source corpus with the source attached. It refuses to issue legal,
                  medical, financial or religious rulings, in writing, in its own terms. And when
                  a student is ready, it hands them to a human teacher.
                </p>
                <p className="text-body-lg text-white">
                  The refusal boundary took longer to build than the answering did. It is also the
                  only reason it can be put in front of a customer.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <ButtonLink href={`/portfolio/${flagship.slug}/`}>Read how we built it</ButtonLink>
                  <ButtonLink
                    href={SITE.flagship.url}
                    variant="secondary"
                    target="_blank"
                    rel="noopener"
                  >
                    Try it live →
                  </ButtonLink>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                {/* The only image above the fold, and it is evidence rather than
                    decoration: the live URL sits directly beneath it, so a
                    skeptical visitor can verify the claim in ten seconds.
                    Renders nothing until a real screenshot exists. */}
                <ProductShot
                  src={flagship.shots?.[0]?.src}
                  alt={flagship.shots?.[0]?.alt}
                  width={flagship.shots?.[0]?.width ?? 1200}
                  height={flagship.shots?.[0]?.height ?? 800}
                  caption={flagship.shots?.[0]?.caption}
                  priority
                />

                <div className="panel flex flex-col gap-5 rounded-(--radius-xl) p-8">
                <Eyebrow>What that build proves</Eyebrow>
                <ul className="flex flex-col gap-4">
                  {PROVES.map(([title, body]) => (
                    <li key={title} className="border-l-2 border-coral-500/50 pl-4">
                      <p className="font-semibold text-white">{title}</p>
                      <p className="text-small text-(--color-text-muted)">{body}</p>
                    </li>
                  ))}
                </ul>
                <p className="border-t border-white/10 pt-4 text-small text-(--color-text-subtle)">
                  We publish no accuracy percentage here, because we have not yet published the
                  methodology behind one. When we do, the number and the method will arrive
                  together.
                </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      <ServiceTiers />

      {/* --- Other work --------------------------------------------------- */}
      <Section tone="veil">
        <Container>
          <SectionHeading
            eyebrow="Client work"
            title="Products we built and still stand behind"
            accent="still stand behind"
            lead="Every claim on these pages is one we can evidence. We removed the ones we could not, including some flattering ones."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featured.map((c) => (
              <CaseStudyCard key={c.slug} study={c} />
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href="/work/" variant="secondary">
              See all our work
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Testimonials />

      <Differentiators />

      {/* --- Small projects welcome. This is the near-term cash flow. ----- */}
      <Section>
        <Container>
          <div className="panel grid gap-8 rounded-(--radius-xl) p-8 md:grid-cols-[1.2fr_1fr] md:items-center md:p-12">
            <div className="flex flex-col gap-4">
              <Eyebrow>Start small if you want</Eyebrow>
              <h2 className="text-h3">
                A logo and brand kit from $299. A one-page site in a week. Fixed price, fixed scope.
              </h2>
              <p className="text-(--color-text-muted)">
                We do not treat small work as a favor, and we do not price it as a loss-leader
                either. Most good client relationships start with one contained job, done properly
                and on time. If that goes well, the bigger project is a conversation rather than a
                pitch.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <ButtonLink href="/services/graphics-design/" variant="secondary">
                Logo &amp; brand identity
              </ButtonLink>
              <ButtonLink href="/services/website-development/" variant="secondary">
                Landing pages &amp; websites
              </ButtonLink>
              <ButtonLink href="/services/ai-automation/" variant="secondary">
                A single automation
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <ProcessSteps />
      <PriceBands />

      {/*
        TESTIMONIALS GO HERE — deliberately empty.
        Blueprint §10.1: every testimonial must be real and attributable
        (name, role, company, ideally a LinkedIn URL). The legacy site carried
        eight quotes with no company affiliations. The FTC took final action
        against Sitejabber in January 2025 over exactly this class of
        misrepresentation. Two verifiable quotes beat eight unverifiable ones.
      */}

      <FaqSection items={FAQS} title="The questions we actually get asked" accent="actually get asked" />

      {/* --- Markets ------------------------------------------------------- */}
      <Section>
        <Container>
          <div className="flex flex-col gap-6">
            <SectionHeading eyebrow="Where we work" title="US and Canada" accent="and Canada" />
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="gap-3">
                <h3 className="text-h3">Remotely, across both countries</h3>
                <p className="text-(--color-text-muted)">
                  We contract through a Texas entity and work with clients across the US and
                  Canada. We do not claim offices we do not have. You can check, and you should.
                </p>
              </Card>
              <Card className="gap-3">
                <h3 className="text-h3">Texas AI automation</h3>
                <p className="text-(--color-text-muted)">
                  Local detail for{' '}
                  <Link href="/locations/dallas/" className="text-(--color-accent) hover:underline">
                    Dallas
                  </Link>,{' '}
                  <Link href="/locations/houston/" className="text-(--color-accent) hover:underline">
                    Houston
                  </Link>,{' '}
                  <Link href="/locations/austin/" className="text-(--color-accent) hover:underline">
                    Austin
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/locations/san-antonio/"
                    className="text-(--color-accent) hover:underline"
                  >
                    San Antonio
                  </Link>.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  )
}
