import type { Metadata } from 'next'
import { Container, Section, SectionHeading, Eyebrow } from '@/components/ui/layout'
import { ButtonLink } from '@/components/ui/button'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { CaseStudyCard, CtaBand } from '@/components/sections/blocks'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import { getAllCaseStudies } from '@/lib/content'
import { SITE } from '@/lib/site'

/**
 * Work index.
 *
 * TITLE REWRITTEN from the live "/portfolio/" page's "LabTechCrew: Best Web
 * Development & Digital Services" — it duplicated the intent of /services/ and
 * carried an unsubstantiated superlative in the snippet.
 *
 * NOTE ON URLS: /portfolio/ 301s here, but the seven child case studies KEEP
 * their /portfolio/[slug]/ addresses. They are indexed and carry equity.
 * Do not "tidy" them to /work/[slug] for aesthetics.
 *
 * NOTE ON CONVERSION: case studies convert badly as lead capture — roughly
 * 0.76% of site traffic, 53% bounce, and readers are 8–22% LESS likely to
 * submit a form — but readers are ~18% more likely to become real pipeline.
 * So this is a deal-progression asset, not the primary conversion path. It is
 * linked from service pages and sent to warm prospects, and it is deliberately
 * not the loudest thing in the navigation.
 */
export const metadata: Metadata = pageMetadata({
  title: 'Our Work — Case Studies in AI, Web and Mobile',
  description:
    'Selected projects: a source-grounded AI learning platform, an affiliate SaaS, a delivery app, a market data platform and more. Every claim on these pages is one we can evidence.',
  path: '/work',
})

export default async function WorkPage() {
  const all = await getAllCaseStudies()
  const flagship = all.find((c) => c.slug === SITE.flagship.slug)
  const rest = all.filter((c) => c.slug !== SITE.flagship.slug)

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Work' }])} />

      <Section className="pb-12 md:pb-16">
        <Container>
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Work' }]} />
          <div className="flex max-w-3xl flex-col gap-5">
            <Eyebrow>Selected work</Eyebrow>
            <h1 className="text-display-1">
              Products we built, and <span className="em-accent">still stand behind</span>
            </h1>
            <p className="text-body-lg text-(--color-text-muted)">
              Eight projects, one of them our own. We have deliberately removed every performance
              number we cannot produce a document for — what is left is what was actually built,
              which is the part you can check.
            </p>
          </div>
        </Container>
      </Section>

      {/* --- Flagship ---------------------------------------------------- */}
      {flagship ? (
        <Section glow="right" className="py-8 md:py-12">
          <Container>
            <div className="panel flex flex-col gap-6 rounded-(--radius-xl) p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-coral-500 px-3 py-1 text-[0.75rem] font-semibold text-(--color-accent-contrast)">
                  Our own product
                </span>
                <span className="text-small text-(--color-text-subtle)">
                  {flagship.category} · {flagship.year}
                </span>
              </div>
              <h2 className="text-display-2">{flagship.title}</h2>
              <p className="text-body-lg prose-measure text-(--color-text-muted)">
                {flagship.lead}
              </p>
              <ul className="flex flex-wrap gap-2">
                {flagship.stack.slice(0, 6).map((s) => (
                  <li
                    key={s}
                    className="rounded-full bg-white/8 px-3 py-1 text-[0.75rem] text-(--color-text-muted)"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={`/portfolio/${flagship.slug}/`}>Read the case study</ButtonLink>
                {flagship.liveUrl ? (
                  <ButtonLink
                    href={flagship.liveUrl}
                    variant="secondary"
                    target="_blank"
                    rel="noopener"
                  >
                    Try it live →
                  </ButtonLink>
                ) : null}
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* --- Everything else --------------------------------------------- */}
      <Section tone="veil">
        <Container>
          <SectionHeading eyebrow="Client work" title="Built for other people" accent="other people" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((c) => (
              <CaseStudyCard key={c.slug} study={c} />
            ))}
          </div>
        </Container>
      </Section>

      {/* --- The honesty note -------------------------------------------- */}
      <Section className="py-16 md:py-20">
        <Container>
          <div className="panel flex max-w-3xl flex-col gap-4 rounded-(--radius-xl) p-8">
            <Eyebrow>Why there are so few percentages here</Eyebrow>
            <h2 className="text-h3">We removed the numbers we could not evidence</h2>
            <p className="text-(--color-text-muted)">
              An earlier version of this site claimed specific traffic and revenue gains for named
              clients. We could not produce written sign-off for those figures, so they are gone.
              What remains describes what was designed and shipped.
            </p>
            <p className="text-(--color-text-muted)">
              If a number matters to your decision, ask on the call. Where a client has agreed we
              can share it, we will — with the export behind it.
            </p>
          </div>
        </Container>
      </Section>

      <CtaBand title="Want something like one of these?" accent="one of these" />
    </>
  )
}
