import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check } from 'lucide-react'
import { Container, Section, SectionHeading, Eyebrow, highlight } from '@/components/ui/layout'
import { Card, Badge } from '@/components/ui/card'
import { ButtonLink } from '@/components/ui/button'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { CaseStudyCard, ProcessSteps, CtaBand, Differentiators } from '@/components/sections/blocks'
import { FaqSection } from '@/components/sections/faq'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import { ALL_SERVICE_SLUGS, tierForService } from '@/lib/site'
import { getService, caseStudiesForService } from '@/lib/content'

/**
 * Service page template.
 *
 * Statically generated for every slug. Metadata comes from the content layer,
 * where the legacy WordPress titles are preserved verbatim — do NOT rewrite the
 * ones marked KEEP until Search Console confirms the migration recovered.
 *
 * Canonical is set HERE, at page level. Never in a layout with dynamic
 * children — `alternates` merges shallowly and would canonical every service
 * page to one URL.
 */

export function generateStaticParams() {
  return ALL_SERVICE_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}

  return pageMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${slug}`,
  })
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getService(slug)
  // A real 404, not a soft 404. Soft 404s show up in Search Console and are
  // the standard sign that notFound() is not being used.
  if (!service) notFound()

  const tier = tierForService(slug)
  const proof = caseStudiesForService(slug, 2)

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.name },
        ])}
      />

      {/* ---------------------------------------------------------------- */}
      <Section className="pb-12 md:pb-16">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Services', href: '/services/' },
              { name: service.name },
            ]}
          />
          <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:items-start">
            <div className="flex max-w-3xl flex-col gap-5">
              <Eyebrow>{service.eyebrow}</Eyebrow>
              <h1 className="text-display-1">{highlight(service.h1, service.h1Accent)}</h1>
              <p className="text-body-lg prose-measure text-(--color-text-muted)">{service.lead}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <ButtonLink href="/contact/" size="lg">
                  Get my project estimate
                </ButtonLink>
                <ButtonLink href="/contact/#book" size="lg" variant="secondary">
                  Book a 20-minute call
                </ButtonLink>
              </div>
            </div>

            <aside className="panel flex flex-col gap-4 rounded-(--radius-lg) p-6 lg:sticky lg:top-24">
              <div>
                <p className="text-eyebrow uppercase text-(--color-text-subtle)">Typical range</p>
                <p className="mt-1 font-(family-name:--font-display) text-[1.75rem] font-bold text-(--color-accent)">
                  {service.priceLabel}
                </p>
                <p className="mt-2 text-small text-(--color-text-subtle)">{service.priceNote}</p>
              </div>
              <div className="border-t border-white/10 pt-4">
                <p className="text-eyebrow uppercase text-(--color-text-subtle)">We work in</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {service.stack.map((s) => (
                    <li key={s}>
                      <Badge>{s}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
              {tier ? (
                <p className="border-t border-white/10 pt-4 text-small text-(--color-text-subtle)">
                  Part of{' '}
                  <Link href="/services/" className="text-(--color-accent) hover:underline">
                    {tier.label}
                  </Link>{' '}
                  — {tier.blurb.toLowerCase()}
                </p>
              ) : null}
            </aside>
          </div>
        </Container>
      </Section>

      {/* --- Who this is for ------------------------------------------- */}
      <Section tone="veil" className="py-16 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="Who this is for"
            title="You are probably here because"
            accent="probably"
          />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {service.forWho.map((f) => (
              <li key={f}>
                <Card className="h-full">
                  <p className="text-body-lg text-white">{f}</p>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* --- What's included -------------------------------------------- */}
      <Section glow="right">
        <Container>
          <SectionHeading
            eyebrow="What you get"
            title="Everything below is in the scope, not the upsell"
            accent="in the scope"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {service.included.map((item) => (
              <Card key={item.title} className="gap-2">
                <div className="flex items-start gap-3">
                  <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-coral-500/20">
                    <Check className="size-3 text-(--color-accent)" aria-hidden="true" />
                  </span>
                  <h3 className="text-h3">{item.title}</h3>
                </div>
                <p className="pl-8 text-(--color-text-muted)">{item.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* --- Proof ------------------------------------------------------- */}
      {proof.length ? (
        <Section tone="veil">
          <Container>
            <SectionHeading
              eyebrow="Proof"
              title="Where we have done this before"
              accent="done this before"
              lead="Real projects. Every claim on their pages is one we can evidence."
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {proof.map((c) => (
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
      ) : null}

      <ProcessSteps />
      <Differentiators />
      <FaqSection items={service.faqs} title={`${service.name} — questions`} accent="questions" />

      {/* --- Other services ---------------------------------------------- */}
      <Section className="py-16 md:py-20">
        <Container>
          <SectionHeading eyebrow="Also useful" title="Other things we build" accent="build" />
          <div className="mt-8 flex flex-wrap gap-3">
            {ALL_SERVICE_SLUGS.filter((s) => s !== slug).map((s) => {
              const other = getService(s)
              if (!other) return null
              return (
                <Link
                  key={s}
                  href={`/services/${s}/`}
                  className="panel rounded-full px-4 py-2 text-small font-medium text-(--color-text-muted) transition-colors hover:border-coral-500/50 hover:text-white"
                >
                  {other.name}
                </Link>
              )
            })}
          </div>
        </Container>
      </Section>

      <CtaBand
        title={`Tell us about your ${service.name.toLowerCase()} project`}
        accent="project"
      />
    </>
  )
}
