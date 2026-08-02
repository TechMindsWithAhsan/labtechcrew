import Link from 'next/link'
import { Container, Section, SectionHeading, Eyebrow } from '@/components/ui/layout'
import { Card, Badge } from '@/components/ui/card'
import { ButtonLink } from '@/components/ui/button'
import { SITE, SERVICE_TIERS, PRIMARY_CTA, SECONDARY_CTA } from '@/lib/site'
import type { CaseStudy } from '@/lib/content'

/* ==========================================================================
   ProofStrip
   --------------------------------------------------------------------------
   ⚠️ OWN WORK ONLY. Do NOT put third-party client logos here without written
   permission — displaying a mark implies endorsement, and without consent
   that is trademark infringement plus false association under Lanham Act
   §43(a). The live site currently shows seven, three of which have no case
   study anywhere. Blueprint §10.1.
   ========================================================================== */

export function ProofStrip({ projects }: { projects: string[] }) {
  return (
    <div className="border-y border-white/10 bg-black/25 py-8">
      <Container>
        <p className="text-small text-(--color-text-subtle)">Recent work</p>
        <ul className="mt-3 flex flex-wrap items-center gap-x-8 gap-y-3">
          {projects.map((p) => (
            <li
              key={p}
              className="font-(family-name:--font-display) text-[1.0625rem] font-semibold text-(--color-text-muted)"
            >
              {p}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  )
}

/* ==========================================================================
   Differentiators — the moat. Blueprint §2.6.
   No Pakistani-origin comparable states ANY of these on a homepage.
   ========================================================================== */

export function Differentiators() {
  return (
    <Section tone="veil">
      <Container>
        <SectionHeading
          eyebrow="Why us"
          title="The four things every US buyer asks — answered up front"
          accent="answered up front"
          lead="These are the objections that kill offshore deals. We answer them before you have to ask."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SITE.differentiators.map((d) => (
            <Card key={d.title}>
              <h3 className="text-h3">{d.title}</h3>
              <p className="text-(--color-text-muted)">{d.body}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ==========================================================================
   ServiceTiers — full-service, but with a hierarchy. Blueprint §2.2.
   ========================================================================== */

export function ServiceTiers() {
  return (
    <Section glow="right">
      <Container>
        <SectionHeading
          eyebrow="What we build"
          title="One team across the whole stack"
          accent="One team"
          lead="Ten services, three jobs. Whichever you start with, the same team owns it end to end."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {SERVICE_TIERS.map((tier) => (
            <Card key={tier.id} className="gap-5">
              <div>
                <Eyebrow>{tier.label}</Eyebrow>
                <p className="mt-1 text-(--color-text-muted)">{tier.blurb}</p>
              </div>
              <ul className="flex flex-col gap-3">
                {tier.services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}/`}
                      className="group/item -mx-2 block rounded-(--radius-sm) px-2 py-1.5 hover:bg-white/8"
                    >
                      <span className="block font-medium text-white group-hover/item:text-coral-300">
                        {s.name}
                      </span>
                      <span className="block text-small text-(--color-text-subtle)">
                        {s.outcome}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ==========================================================================
   ProcessSteps — each step states a DURATION and what you receive.
   Vague process diagrams reduce trust; dated deliverables increase it.
   ========================================================================== */

const STEPS = [
  { n: '01', title: 'Scope', duration: '3–5 days', body: 'A 20-minute call, then a written scope with fixed price and dates. Free.' },
  { n: '02', title: 'Design', duration: '1–3 weeks', body: 'Wireframes, then interface design you sign off before anyone writes code.' },
  { n: '03', title: 'Build', duration: '3–12 weeks', body: 'Weekly demos on a live staging URL. You see progress, not status reports.' },
  { n: '04', title: 'Launch & support', duration: 'Ongoing', body: 'Deployment, monitoring, and a named person who answers you.' },
]

export function ProcessSteps() {
  return (
    <Section tone="veil">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Four steps, with dates attached"
          accent="dates attached"
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.n}>
              <Card className="h-full">
                <span className="font-(family-name:--font-display) text-[1.5rem] font-bold text-(--color-accent)">
                  {s.n}
                </span>
                <h3 className="text-h3">{s.title}</h3>
                <Badge>{s.duration}</Badge>
                <p className="text-(--color-text-muted)">{s.body}</p>
              </Card>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <ButtonLink href="/how-we-work/" variant="secondary">
            Contracts, IP and how we communicate
          </ButtonLink>
        </div>
      </Container>
    </Section>
  )
}

/* ==========================================================================
   PriceBands
   --------------------------------------------------------------------------
   Publishing a floor costs roughly 40% of raw form fills and buys roughly 70%
   better lead quality (HockeyStack, 31M visitors, 80 B2B companies). With
   Bark and Meta traffic your bottleneck is quality, not volume — so this
   trade is strongly in your favour. It is also a trust signal: "cheap" is
   exactly what US buyers fear about offshore teams. A floor says you are not.

   FLOOR SET TO $2,500 (July 2026). Reasoning, so nobody lowers it casually:
   the floor has to clear customer acquisition cost. On Meta and Google in
   this category a qualified lead runs roughly $50–150, and a healthy close
   rate on agency enquiries is 10–20% — so every won client costs somewhere
   between $250 and $1,500 to acquire BEFORE anyone writes a line of code.
   A $800 project against a $500 acquisition cost is not a cheap sale, it is
   a loss you have to service for six weeks. $2,500 is roughly the lowest
   number where a paid-traffic client is still worth having.
   ========================================================================== */

const BANDS = [
  { name: 'Starter Packs', range: 'from $299', body: 'Fixed price, fixed scope. Logo and brand kit, one-page site, business site, online store, AI assistant, app MVP.' },
  { name: 'Custom build', range: '$2.5k – $30k', body: 'Bespoke work scoped to you — a marketing site, a mobile app, an AI assistant on your own documents.' },
  { name: 'Ongoing team', range: 'from $4k / month', body: 'A dedicated squad — design, build and support on a rolling basis.' },
]

export function PriceBands() {
  return (
    <Section glow="left">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title={
            SITE.pricingFloorUsd > 0
              ? `We take on projects starting from $${SITE.pricingFloorUsd.toLocaleString('en-US')}`
              : 'We publish our prices'
          }
          accent={SITE.pricingFloorUsd > 0 ? undefined : 'publish'}
          lead="No discovery call required to find out whether we are in your range."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {BANDS.map((b) => (
            <Card key={b.name}>
              <h3 className="text-h3">{b.name}</h3>
              <p className="font-(family-name:--font-display) text-[1.5rem] font-bold text-(--color-accent)">
                {b.range}
              </p>
              <p className="text-(--color-text-muted)">{b.body}</p>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href="/pricing/" variant="secondary">
            See what drives the price
          </ButtonLink>
        </div>
      </Container>
    </Section>
  )
}

/* ==========================================================================
   CaseStudyCard — note the legacy /portfolio/ prefix is preserved.
   ========================================================================== */

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Card href={`/portfolio/${study.slug}/`} className="h-full">
      <p className="text-eyebrow uppercase text-(--color-accent)">{study.client}</p>
      <h3 className="text-h3">{study.title}</h3>
      <p className="text-(--color-text-muted)">{study.summary}</p>
      <ul className="mt-auto flex flex-wrap gap-2 pt-3">
        {study.stack.slice(0, 4).map((s) => (
          <li key={s}>
            <Badge>{s}</Badge>
          </li>
        ))}
      </ul>
    </Card>
  )
}

/* ==========================================================================
   TestimonialCard
   --------------------------------------------------------------------------
   ⚠️ Real, attributable quotes only. Name, role, company — ideally a LinkedIn
   URL. Two verifiable testimonials beat eight unverifiable ones, and the FTC
   took final action against Sitejabber in January 2025 over exactly this
   class of misrepresentation. If you cannot verify it, delete it.
   ========================================================================== */

export function TestimonialCard({
  quote,
  name,
  role,
  company,
  linkedin,
}: {
  quote: string
  name: string
  role: string
  company: string
  linkedin?: string
}) {
  return (
    <figure className="panel flex h-full flex-col gap-4 rounded-(--radius-lg) p-6">
      <blockquote className="text-body-lg text-white">“{quote}”</blockquote>
      <figcaption className="mt-auto text-small text-(--color-text-subtle)">
        <span className="font-semibold text-white">{name}</span> — {role}, {company}
        {linkedin ? (
          <>
            {' · '}
            <a href={linkedin} rel="noopener" className="text-(--color-accent) hover:underline">
              LinkedIn
            </a>
          </>
        ) : null}
      </figcaption>
    </figure>
  )
}

/* ==========================================================================
   TeamCard
   --------------------------------------------------------------------------
   ⚠️ Real people only. The live site shows three headshots named
   Team-4.jpg / Team-5.jpg / Team-6.jpg presented as named staff including a
   "Founder, CEO" — that filename pattern is the signature of a WordPress
   theme demo import. Naming and photographing your real US partner with a
   LinkedIn link is your cheapest and strongest trust asset, and no comparable
   agency does it.
   ========================================================================== */

export function TeamCard({
  name,
  role,
  location,
  bio,
  linkedin,
}: {
  name: string
  role: string
  location: string
  bio?: string
  linkedin?: string
}) {
  return (
    <Card>
      <h3 className="text-h3">{name}</h3>
      <p className="text-(--color-text-muted)">{role}</p>
      <p className="text-small text-(--color-text-subtle)">{location}</p>
      {/* The bio is the part that actually builds trust — a name and a job
          title prove nothing. This data already existed and was never rendered. */}
      {bio ? <p className="mt-3 text-small text-(--color-text-muted)">{bio}</p> : null}
      {linkedin ? (
        <a
          href={linkedin}
          rel="noopener"
          className="mt-3 inline-block text-small font-medium text-(--color-accent) hover:underline"
        >
          LinkedIn →
        </a>
      ) : null}
    </Card>
  )
}

/* ==========================================================================
   CtaBand — the brightest moment on the page.
   Sits on the violet end of the ramp with the coral button as the only
   warm element, mirroring the creatives' end-card layout.
   ========================================================================== */

export function CtaBand({
  title = 'Tell us what you are trying to build',
  accent = 'build',
  lead = 'A 20-minute call, then a written scope with a fixed price and dates. Free, and we sign a mutual NDA first if you want one.',
}: {
  title?: string
  accent?: string
  lead?: string
}) {
  return (
    <Section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(50rem_28rem_at_20%_120%,rgba(91,52,232,0.45),transparent_70%)]"
      />
      <Container className="relative">
        <div className="panel flex flex-col items-start gap-6 rounded-(--radius-xl) p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div className="flex max-w-2xl flex-col gap-3">
            <h2 className="text-display-2">
              {title.includes(accent) ? (
                <>
                  {title.slice(0, title.indexOf(accent))}
                  <span className="em-accent">{accent}</span>
                  {title.slice(title.indexOf(accent) + accent.length)}
                </>
              ) : (
                title
              )}
            </h2>
            <p className="text-body-lg text-(--color-text-muted)">{lead}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <ButtonLink href={PRIMARY_CTA.href} size="lg">
              {PRIMARY_CTA.label}
            </ButtonLink>
            <ButtonLink href={SECONDARY_CTA.href} size="lg" variant="secondary">
              Book a call
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  )
}
