import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Section, SectionHeading, Eyebrow } from '@/components/ui/layout'
import { Card, Badge } from '@/components/ui/card'
import { ButtonLink } from '@/components/ui/button'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { CtaBand } from '@/components/sections/blocks'
import { FaqSection } from '@/components/sections/faq'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import { SERVICES } from '@/lib/content'
import { STARTER_PACKS, SITE, SERVICE_ENTRY_POINT } from '@/lib/site'
import { BudgetMatcher } from '@/components/sections/budget-matcher'

/**
 * /pricing/ — the highest-leverage page on the site.
 *
 * HockeyStack, 31M visitors across 80 B2B companies: transparent pricing
 * REDUCES raw form conversion (2.8% vs 4.6%) but nearly DOUBLES the rate at
 * which submissions become real pipeline (17.5% vs 10.3%). With Bark and Meta
 * traffic the bottleneck is lead quality, not lead volume, so this trade is
 * strongly in our favour.
 *
 * Second reason, specific to an offshore team: "cheap means bad" is a top-five
 * US buyer objection. A published floor is itself a trust signal — it says you
 * are not the bottom of the market.
 */
export const metadata: Metadata = pageMetadata({
  title: 'Pricing — What Projects Actually Cost',
  description:
    'Real ranges for web, mobile, custom software, AI assistants, automation and design. What drives the price up, what brings it down, and who we are not a fit for.',
  path: '/pricing',
})

const DRIVERS_UP = [
  'Integrations with systems that have no documented API',
  'Multiple languages, or content that changes per region',
  'Regulated data — health, financial, or anything involving under-18s',
  'Real-time features: live tracking, streaming, collaborative editing',
  'Migrating existing data that is inconsistent or undocumented',
  'A hard external deadline that compresses the schedule',
]

const DRIVERS_DOWN = [
  'A clear, written decision-maker — one person who can approve',
  'Existing brand and content, so we are not writing your copy',
  'Starting with one painful workflow instead of the whole platform',
  'Accepting sensible defaults where you have no strong preference',
  'A phased build rather than everything shipping at once',
  'Reusing a proven pattern instead of inventing a new one',
]

const NOT_A_FIT = [
  {
    title: 'Custom builds under about $2,500',
    body: 'Bespoke work has open scope, and below this we cannot scope, build and support it properly. This is why the Starter Packs above exist — if one of them fits, the budget is not the problem and we would rather sell you that.',
  },
  {
    title: 'Equity-only or revenue-share builds',
    body: 'We are a services business with a payroll. If you need a technical co-founder, that is a genuinely different relationship and we are not it.',
  },
  {
    title: '"Just make it like Uber, but cheaper"',
    body: 'If the reference is a product with hundreds of engineers and the budget is five figures, the gap is not something either of us can close by working harder.',
  },
  {
    title: 'Work we are not the best team for',
    body: 'Paid media management and game development, for two. We used to sell both. We stopped because we were not the best hire for either.',
  },
]

const FAQS = [
  {
    q: 'Do you discount for early or first-time clients?',
    a: 'We discount in exchange for something, never just to win the work. If you are happy to be a named case study, give us a recorded testimonial and a reference call for future buyers, that is worth real money to us and we will price accordingly. What we will not do is quote below cost to get a foot in the door — a team working for free cuts corners, and you would feel it in month two. A discount with a reason attached holds its value. A discount with no reason just tells you the first number was invented.',
  },
  {
    q: 'Why publish prices when nobody else does?',
    a: 'Because a discovery call that ends in "we are out of range" wastes your afternoon and ours. Publishing ranges reduces the number of enquiries we get and roughly doubles the share that turn into real projects. If we are too expensive for this piece of work, you should find that out on this page, not in week two.',
  },
  {
    q: 'Is the price fixed or does it move?',
    a: 'Fixed per phase. We scope a phase, price it, and you approve before it starts. It only changes if you change the scope, and then you get a new number in writing before any work happens. No invoice will ever surprise you.',
  },
  {
    q: 'What is the payment schedule?',
    a: 'Typically a deposit to begin a phase and the balance on its completion. Longer engagements are billed monthly. US bank account, W-9 on file, invoiced in USD like any domestic vendor.',
  },
  {
    q: 'Do you offer a discount for a longer commitment?',
    a: 'Retainers and dedicated-team arrangements price better per day than one-off projects, because we can plan capacity. We do not discount a fixed-scope project for a promise of future work — that just moves the risk onto the current project.',
  },
  {
    q: 'What if the project runs over?',
    a: 'On a fixed-price phase, an overrun caused by us is ours to absorb. That is the point of fixed pricing and it is why we spend time on the scope document before quoting. An overrun caused by a scope change gets quoted separately, in writing, before it starts.',
  },
]

export default function PricingPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Pricing' }])} />

      <Section className="pb-12 md:pb-16">
        <Container>
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Pricing' }]} />
          <div className="flex max-w-3xl flex-col gap-5">
            <Eyebrow>Pricing</Eyebrow>
            <h1 className="text-display-1">
              What things actually <span className="em-accent">cost</span>
            </h1>
            <p className="text-body-lg text-(--color-text-muted)">
              Real ranges, published, so you can rule us in or out in ninety seconds. Everything
              here is a fixed price per phase — scoped, quoted and approved before any work starts.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <ButtonLink href="/contact/" size="lg">
                Get my project estimate
              </ButtonLink>
              <ButtonLink href="/how-we-work/" size="lg" variant="secondary">
                How the phases work
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* --- Per-service ranges ------------------------------------------ */}
      <Section tone="veil">
        <Container>
          <Section className="pb-4">
        <Container>
          <div className="max-w-3xl">
            <BudgetMatcher />
          </div>
        </Container>
      </Section>

      <Section glow="left">
        <Container>
          <SectionHeading
            eyebrow="Start here"
            title="Fixed price, fixed scope, no surprises"
            accent="Fixed price"
            lead="You should not need a five-figure budget to get something real built properly. These are complete, finished pieces of work at a fixed price — not trial versions, and not cut-price custom projects. The scope is written down, which is exactly why the price can be what it is."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {STARTER_PACKS.map((pack) => (
              <Card key={pack.name}>
                <h3 className="text-h3">{pack.name}</h3>
                <p className="font-(family-name:--font-display) text-[1.75rem] font-bold text-(--color-accent)">
                  ${pack.price.toLocaleString('en-US')}
                </p>
                <p className="text-small text-(--color-text-subtle)">{pack.timeline}</p>
                <p className="mt-3 text-small text-(--color-text-muted)">{pack.forWho}</p>
                <ul className="mt-4 space-y-2">
                  {pack.includes.map((i) => (
                    <li key={i} className="text-small text-(--color-text-muted)">
                      <span aria-hidden="true" className="text-(--color-success)">✓</span> {i}
                    </li>
                  ))}
                </ul>
                {/* The exclusions are the reason the price holds. Hiding them
                    just moves the argument to week two of the project. */}
                <p className="mt-4 border-t border-white/10 pt-3 text-small text-(--color-text-subtle)">
                  <strong className="font-semibold">Not included:</strong> {pack.excludes}
                </p>
              </Card>
            ))}
          </div>
          <div className="panel mt-10 max-w-3xl rounded-(--radius-xl) p-8">
            <h3 className="text-h3">Why these are cheap, honestly</h3>
            <p className="mt-2 text-(--color-text-muted)">
              Not because the work is worth less, and not because we are hoping
              to upsell you later. It is because the scope is decided before we
              start. Open-ended projects carry the cost of every &ldquo;could we
              also just&hellip;&rdquo; — these do not, and that saving is passed
              to you. Our team is in Karachi, which lowers our cost base
              honestly rather than by cutting corners on the build.
            </p>
            <p className="mt-3 text-(--color-text-muted)">
              We would rather do a ${SITE.starterFloorUsd} job properly and earn the
              next one than take a budget we cannot deliver against. Outgrow a
              pack and we quote the custom version — with what you already paid
              credited against it.
            </p>
          </div>
        </Container>
      </Section>

      <SectionHeading
            eyebrow="By service"
            title="Custom builds, if a pack is not enough"
            accent="if a pack is not enough"
            lead="These are open-scope engagements — built from nothing, to your requirements, with no template underneath. Most people do not need one. Where a fixed-price pack covers the same ground, it is shown beside the range so you can see both numbers at once."
          />
          <div className="mt-12 grid gap-4">
            {SERVICES.map((s) => {
              const entry = SERVICE_ENTRY_POINT[s.slug]
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}/`}
                  className="panel group flex flex-col gap-4 rounded-(--radius-lg) p-6 transition-colors hover:border-coral-500/50 md:flex-row md:items-center md:justify-between"
                >
                  <div className="md:max-w-[46ch]">
                    <h3 className="text-h3 group-hover:text-coral-300">{s.name}</h3>
                    <p className="mt-1 text-small text-(--color-text-subtle)">{s.priceNote}</p>
                  </div>
                  {/* Affordable number is the loud one. The custom range is
                      secondary and muted — present for the people who need it,
                      not shouting at the people who do not. */}
                  <div className="shrink-0 md:text-right">
                    {entry ? (
                      <>
                        <p className="font-(family-name:--font-display) text-[1.5rem] font-bold leading-tight text-(--color-accent)">
                          from ${entry.price.toLocaleString('en-US')}
                        </p>
                        <p className="text-small text-(--color-text-subtle)">
                          {entry.label} — fixed price
                        </p>
                        <p className="mt-2 border-t border-white/10 pt-2 text-small text-(--color-text-subtle)">
                          Custom: {s.priceLabel}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-(family-name:--font-display) text-[1.25rem] font-semibold leading-tight text-(--color-text-muted)">
                          {s.priceLabel}
                        </p>
                        <p className="text-small text-(--color-text-subtle)">Custom scope</p>
                      </>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* --- What moves the number ---------------------------------------- */}
      <Section glow="right">
        <Container>
          <SectionHeading
            eyebrow="What moves the number"
            title="The honest version of a quote"
            accent="honest version"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Card className="gap-4">
              <Badge tone="accent">Pushes the price up</Badge>
              <ul className="flex flex-col gap-3">
                {DRIVERS_UP.map((d) => (
                  <li key={d} className="flex gap-2.5 text-(--color-text-muted)">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-coral-500" />
                    {d}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="gap-4">
              <Badge>Brings the price down</Badge>
              <ul className="flex flex-col gap-3">
                {DRIVERS_DOWN.map((d) => (
                  <li key={d} className="flex gap-2.5 text-(--color-text-muted)">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-white/40" />
                    {d}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </Section>

      {/* --- Not a fit ------------------------------------------------------ */}
      <Section tone="veil">
        <Container>
          <SectionHeading
            eyebrow="Straight talk"
            title="When we are not the right hire"
            accent="not the right hire"
            lead="An agency that says yes to everything is telling you nothing. Here is what we turn down."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {NOT_A_FIT.map((n) => (
              <Card key={n.title}>
                <h3 className="text-h3">{n.title}</h3>
                <p className="text-(--color-text-muted)">{n.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <FaqSection items={FAQS} title="Pricing questions" accent="questions" />
      <CtaBand
        title="Get a real number for your project"
        accent="real number"
        lead="Twenty minutes on a call, then a written scope with a fixed price and dates within three to five days. Free, and we will sign a mutual NDA first if you want one."
      />
    </>
  )
}
