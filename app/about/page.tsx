import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Section, SectionHeading, Eyebrow } from '@/components/ui/layout'
import { Card } from '@/components/ui/card'
import { ButtonLink } from '@/components/ui/button'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { CtaBand } from '@/components/sections/blocks'
import { HeroColumns } from '@/components/sections/hero'
import { FaqSection } from '@/components/sections/faq'
import characterAbout from '@/public/characters/about.webp'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import { SITE } from '@/lib/site'

/**
 * /about/ — rebuilt from the ground up.
 *
 * REMOVED from the legacy page, and none of it comes back without evidence:
 *   · the seven-logo client wall (three of those companies have no case study
 *     anywhere on the site, and none of the logos has written permission)
 *   · "Rated 5 out of 5" with no linked review source
 *   · "Trusted by 200+ Clients" AND "over 1200 satisfied U.S. clients" —
 *     two contradictory figures on the same page
 *   · "#1 Software Innovation Partner" and "Award Winning" with no award named
 *   · three headshots named Team-4.jpg / Team-5.jpg / Team-6.jpg presented as
 *     named staff including a "Founder, CEO" — the signature of a WordPress
 *     theme demo import
 *   · statistics counters rendering as "0 Y", "0 +", "0 %"
 *
 * What replaces it: four real people, one real product, and a specific story.
 * A page that says "four people, here we are, here is what we built" beats a
 * page claiming 1,200 clients that a buyer cannot verify — and it cannot be
 * challenged by the FTC or by a competitor.
 */
export const metadata: Metadata = pageMetadata({
  // KEEP — the legacy title, brand casing corrected only.
  title: 'LabTechCrew : Web Development & Digital Solutions Company USA',
  /* ⚠️ "four-founder" is an UNVERIFIED HARDCODED CLAIM, and this instance is
     the one Google shows in the snippet. Four places say it and they must be
     changed together — see the FOUNDER COUNT note beside `TEAM` in lib/site.ts. */
  description:
    'LabTechCrew is a four-founder software team building AI systems, web and mobile products for businesses in the US and Canada. Contracted through a Texas LLC.',
  path: '/about',
})

const FAQS = [
  {
    q: 'How big is the team?',
    /* ⚠️ "Four founders" is an UNVERIFIED HARDCODED CLAIM. Nothing derives it —
       `TEAM` in lib/site.ts is empty. Four places say it and they must be
       changed together — see the FOUNDER COUNT note beside `TEAM`. */
    a: 'Four founders and a small crew. We are not going to tell you we have two hundred engineers. You would find out in week two anyway, and the size is the point: you talk to the people building the thing.',
  },
  {
    q: 'Who do we contract with?',
    a: `${SITE.legalName}, ${SITE.jurisdiction}: one entity, governed by Texas law, under a master services agreement and a statement of work per phase. We serve clients across the ${SITE.markets.join(' and ')}, we are open ${SITE.hours.display} on a US number, and we invoice in USD with a W-9 on file. Your finance and legal teams have nothing unusual to process.`,
  },
  {
    q: 'Why should we trust a team we have not met?',
    a: 'Look at QuranRI. It is our own product, it is live, and you can use it right now without asking us for a demo. Everything we sell (retrieval architecture, refusal design, web and mobile delivery) is visible in something we shipped and still run.',
  },
  {
    q: 'What do you not do?',
    a: 'Paid media management and game development. We used to offer both. We stopped because we were not the best team a client could hire for either, and a service list you cannot back up is how agencies end up competing on price.',
  },
]

/**
 * Structural risk reversal. Each item must stay TRUE and enforceable — the
 * moment one of these becomes marketing language rather than a term you would
 * honor, the whole section inverts and becomes a liability.
 */
const COMMITMENTS = [
  {
    title: 'You work with the engineer, not an account manager',
    body: 'One technical lead is named to you on the first call and stays on your project to the end. No handover to a delivery team you have never spoken to, and no one forwarding your emails to someone who actually knows the answer.',
  },
  {
    title: 'Your repository, from the first commit',
    body: 'Code is pushed to your GitHub organization from the first commit, not delivered as a zip at the end. You watch it being built, so nothing about the state of your project is ever a surprise, and if we vanished tomorrow another team could pick it up on Monday.',
  },
  {
    title: 'You are never asked to pay for work you have not seen',
    body: 'We invoice in stages: an advance to begin, then one payment per phase, raised only after that phase is built, demonstrated to you and signed off in writing. Full ownership of the source code and IP transfers to you on final payment for the engagement; until then you hold a license to use everything delivered while you evaluate it, and we retain title. Nothing here is billed on a promise.',
  },
  {
    title: 'Fixed price per phase, and you can stop between them',
    body: 'Each phase is scoped, quoted and approved before any work starts, and there is a clean exit at every boundary. No annual retainer, no notice period, no penalty. Stop and the phase you have just approved becomes the final payment of the engagement — it clears, ownership of everything produced transfers to you, and we hand over. If phase one disappoints you, you leave with working code and no argument.',
  },
  {
    title: 'Business hours on a calendar you can book',
    body: 'We are open 9:00 AM to 6:00 PM, Monday to Friday, and meetings are booked inside them on a calendar you can see rather than negotiated by email. A question asked during those hours gets an answer the same day from the person doing the work. Outside them, anything genuinely urgent has a named person and a direct phone number instead of a shared inbox.',
  },
  {
    title: 'The work is public before you pay for any of it',
    body: 'Our flagship build is live and open to anyone. Use it, try to break it, and watch what it does when a question goes past what it can defend. That behavior is the product. Read the full case study, then decide.',
  },
] as const

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About' }])} />

      <Section>
        <Container>
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'About' }]} />
          <HeroColumns
            character={{
              src: characterAbout,
              alt: 'Figure in a knitted sweater with an aerial-topped TV for a head showing a smiley face, arms open',
            }}
          >
            <div className="flex max-w-3xl flex-col gap-5">
              <Eyebrow>About</Eyebrow>
              {/* ⚠️ "Four founders" is an UNVERIFIED HARDCODED CLAIM, and this
                  instance is the page's h1. Four places say it and they must be
                  changed together — see the FOUNDER COUNT note beside `TEAM` in
                  lib/site.ts. */}
              <h1 className="text-display-1">
                Four founders who built the thing{' '}
                <span className="em-accent">before selling it</span>
              </h1>
              <p className="text-body-lg text-(--color-text-muted)">
                LabTechCrew builds AI systems and the products around them for businesses in the US
                and Canada. We are small, we are specific about what we do, and we proved the
                architecture on our own product before we offered it to anyone else.
              </p>
            </div>
          </HeroColumns>
        </Container>
      </Section>

      {/* --- The story ---------------------------------------------------- */}
      <Section tone="veil">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div className="flex flex-col gap-5">
              <SectionHeading eyebrow="How we got here" title="The eight months that defined us" accent="eight months" />
              <div className="flex flex-col gap-4 text-(--color-text-muted)">
                <p>
                  We started in 2024 doing what most small agencies do: websites, apps, design work,
                  whatever came in. It paid, and it taught us the craft, but it did not tell anyone
                  what we were actually good at.
                </p>
                <p>
                  Then a teaching institution that had been running one-to-one classes since 2008
                  asked a hard question: could AI serve the students they could never staff for,
                  without saying something wrong to a child about a subject that matters?
                </p>
                <p>
                  That build took eight months. Most of it was not model work. It was deciding what
                  the system must refuse to answer, how to make every response traceable back to a
                  source, and where a human teacher has to take over. The result is{' '}
                  <Link href="/portfolio/quranri/" className="text-(--color-accent) hover:underline">
                    QuranRI
                  </Link>, and it is live today.
                </p>
                <p>
                  That is the crew now: we build the architecture on our own products first, then
                  offer it. It is a slower way to grow an agency and a much better way to be able
                  to answer a technical question honestly.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <Card className="gap-3">
                <Eyebrow>What we believe</Eyebrow>
                <h3 className="text-h3">An AI that says "ask a human" is worth more than one that guesses</h3>
                <p className="text-(--color-text-muted)">
                  Anyone can wire a chat box to a model. The engineering that matters is the
                  boundary: what the system refuses to answer, and where it hands off. That is the
                  difference between a demo and something you can put in front of a customer.
                </p>
              </Card>
              <Card className="gap-3">
                <Eyebrow>What we refuse</Eyebrow>
                <h3 className="text-h3">Numbers we cannot document</h3>
                <p className="text-(--color-text-muted)">
                  We removed every performance figure from this site that we could not produce
                  written evidence for, including some flattering ones. If a claim here matters to
                  your decision, ask us on the call and we will show you the export or tell you we
                  do not have it.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* --- Team ---------------------------------------------------------- */}
      {/* ------------------------------------------------------------------
          Replaces the old team/headshot section.

          WHY THERE IS NO TEAM PAGE HERE, deliberately:

          A team page is an ASSERTION. A buyer cannot verify a photograph, and
          two decades of stock-photo "meet the team" grids have taught them not
          to try. Nothing on such a page is checkable, which is precisely why
          it convinces nobody who was hesitating.

          So this section answers the question underneath "who are you?", which
          is really "what happens to my money, my code and my timeline if this
          goes wrong?" Every item below is a COMMITMENT a client can hold us
          to, not a claim they have to believe. Publishing exit terms is rare
          in this market, and it reads as confidence precisely because it costs
          something to offer.

          If you later add real, consenting, photographed team members, add
          them ALONGSIDE this — never instead of it.
          ------------------------------------------------------------------ */}
      <Section glow="right">
        <Container>
          <SectionHeading
            eyebrow="How this works"
            title="Everything here is something you can hold us to"
            accent="hold us to"
            lead="Most agency about-pages ask you to trust a grid of photographs. You cannot verify a photograph. So instead, here is exactly what you get in writing — and exactly how you get out if we disappoint you."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {COMMITMENTS.map((c) => (
              <Card key={c.title}>
                <h3 className="text-h3">{c.title}</h3>
                <p className="mt-2 text-(--color-text-muted)">{c.body}</p>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-small text-(--color-text-subtle)">
            The previous version of this site showed three stock photographs
            with invented names and job titles attached. We took them down
            rather than replace them with better-looking ones. What is above is
            harder to write and worth more to you.
          </p>
        </Container>
      </Section>

      {/* --- Where we are --------------------------------------------------- */}
      <Section tone="veil">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="gap-3">
              <Eyebrow>Contracting entity</Eyebrow>
              <h3 className="text-h3">{SITE.legalName}</h3>
              <address className="not-italic text-(--color-text-muted)">
                {SITE.address.street}
                <br />
                {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}
                <br />
                {SITE.jurisdiction}, governed by Texas law
              </address>
            </Card>
            <Card className="gap-3">
              <Eyebrow>Who we work with</Eyebrow>
              <h3 className="text-h3">Clients across the {SITE.markets.join(' and ')}</h3>
              <p className="text-(--color-text-muted)">
                Open {SITE.hours.display}. Calls, screen shares and decisions happen inside those
                hours; outside them, anything urgent has a named person and a phone number.
                Invoiced in USD, W-9 on file.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="panel flex max-w-3xl flex-col items-start gap-4 rounded-(--radius-xl) p-8">
            <Eyebrow>See for yourself</Eyebrow>
            <h2 className="text-h3">Do not take our word for any of this</h2>
            <p className="text-(--color-text-muted)">
              {SITE.flagship.name} is live and public. Open it, ask it something hard, and watch
              what it does when the question goes outside what it can defend. That behavior is the
              thing we sell.
            </p>
            <ButtonLink href={SITE.flagship.url} target="_blank" rel="noopener">
              Try {SITE.flagship.name} →
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <FaqSection items={FAQS} title="Fair questions" accent="Fair" />
      <CtaBand />
    </>
  )
}
