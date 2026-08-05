import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container, Section, SectionHeading, Eyebrow } from '@/components/ui/layout'
import { Card } from '@/components/ui/card'
import { ButtonLink } from '@/components/ui/button'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { CtaBand, Differentiators } from '@/components/sections/blocks'
import { FaqSection } from '@/components/sections/faq'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import { LOCATIONS, getLocation, getService } from '@/lib/content'
import { SITE } from '@/lib/site'

/**
 * Location pages — blueprint §9.4.
 *
 * FOUR pages, for AI AUTOMATION rather than web design, and the reasoning is
 * worth keeping in the file so nobody "helpfully" expands it later:
 *
 *   · "web design + city" SERPs carry a local 3-pack you cannot enter without
 *     a staffed physical address, and Clutch.co sits on page one organically.
 *     There is nothing there for us.
 *   · The AI-automation geo SERPs show NO map pack, and page one is currently
 *     held by programmatic micro-sites with no local presence — which also
 *     proves the "you need a local office to rank" objection is false here.
 *
 * Each page has genuinely different content. DO NOT template fifty of these:
 * 2026 spam policies eat doorway pages, and four real pages beat fifty thin
 * ones.
 */

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ city: l.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city } = await params
  const loc = getLocation(city)
  if (!loc) return {}

  return pageMetadata({
    title: `AI Automation for ${loc.city} Businesses`,
    description: `We build AI automations and workflow systems for ${loc.city}, ${loc.stateName} businesses — scoped in a 20-minute call, documented so your team owns them. Contracted through a Texas LLC.`,
    path: `/locations/${city}`,
  })
}

export default async function LocationPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params
  const loc = getLocation(city)
  if (!loc) notFound()

  const automation = getService('ai-automation')
  const others = LOCATIONS.filter((l) => l.slug !== city)

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: `AI Automation in ${loc.city}` },
        ])}
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Services', href: '/services/' },
              { name: `${loc.city} AI automation` },
            ]}
          />
          <div className="flex max-w-3xl flex-col gap-5">
            <Eyebrow>
              {loc.city}, {loc.state}
            </Eyebrow>
            <h1 className="text-display-1">
              AI automation for <span className="em-accent">{loc.city}</span> businesses
            </h1>
            <p className="text-body-lg text-(--color-text-muted)">{loc.blurb}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <ButtonLink href="/contact/" size="lg">
                Book a 20-minute audit call
              </ButtonLink>
              <ButtonLink href="/services/ai-automation/" size="lg" variant="secondary">
                What automation involves
              </ButtonLink>
            </div>
            {/*
              Honesty note, and it does real work on a geo page. Every
              competitor ranking here implies a local presence. Saying plainly
              that we have no local office is both true and disarming — and
              filing a Google Business Profile against an address we do not
              staff would get the profile suspended, which costs far more than
              the ranking is worth. Follow it immediately with what the buyer
              actually gets instead; never leave the denial standing alone.
            */}
            <p className="pt-2 text-small text-(--color-text-subtle)">
              We do not claim a {loc.city} office, because we do not have one. What you get
              instead: a contract with {SITE.legalName}, {SITE.jurisdiction}, governed by Texas
              law · one named person on your project, reachable on a US number ·{' '}
              {SITE.hours.display} · prices published on this site before you call.
            </p>
          </div>
        </Container>
      </Section>

      {automation ? (
        <Section tone="veil">
          <Container>
            <SectionHeading
              eyebrow="What we automate"
              title={`Where ${loc.city} operations usually lose hours`}
              accent="lose hours"
            />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {automation.forWho.map((f) => (
                <Card key={f} className="h-full">
                  <p className="text-body-lg text-white">{f}</p>
                </Card>
              ))}
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {automation.included.slice(0, 4).map((i) => (
                <Card key={i.title}>
                  <h3 className="text-h3">{i.title}</h3>
                  <p className="text-(--color-text-muted)">{i.body}</p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Differentiators />

      <Section glow="left">
        <Container>
          <SectionHeading eyebrow="Also serving" title="Other Texas cities" accent="Other" />
          <div className="mt-8 flex flex-wrap gap-3">
            {others.map((o) => (
              <ButtonLink key={o.slug} href={`/locations/${o.slug}/`} variant="secondary" size="sm">
                {o.city}
              </ButtonLink>
            ))}
          </div>
        </Container>
      </Section>

      {automation ? (
        <FaqSection items={automation.faqs} title={`${loc.city}: common questions`} accent="questions" />
      ) : null}

      <CtaBand
        title={`Find the hours you are losing in ${loc.city}`}
        accent={loc.city}
        lead="Half a day mapping what actually happens, what the delay costs in hours per month, and which parts are worth automating. Some of what we find is not — and we say so."
      />
    </>
  )
}
