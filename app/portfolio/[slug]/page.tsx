import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight, Check } from 'lucide-react'
import { Container, Section, SectionHeading, Eyebrow } from '@/components/ui/layout'
import { Card, Badge } from '@/components/ui/card'
import { ButtonLink } from '@/components/ui/button'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { ProductShot } from '@/components/ui/product-shot'
import { JsonLd } from '@/components/ui/json-ld'
import { CaseStudyCard, CtaBand } from '@/components/sections/blocks'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import { CASE_STUDIES, getCaseStudy, getService } from '@/lib/content'

/**
 * Case-study template.
 *
 * ⚠️ THE URL PREFIX IS `/portfolio/`, NOT `/work/`. These seven addresses are
 * indexed and carry link equity. The index moved to /work/ and 301s; the
 * children stay exactly where they are. Renaming them for tidiness would throw
 * away the only ranking asset this site currently has.
 */

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return {}

  return pageMetadata({
    title: study.seoTitle,
    description: study.seoDescription,
    path: `/portfolio/${slug}`,
  })
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()

  const related = CASE_STUDIES.filter((c) => c.slug !== slug).slice(0, 3)

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/work' },
          { name: study.client },
        ])}
      />

      {/* --- Hero --------------------------------------------------------- */}
      <Section className="pb-12 md:pb-16">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Work', href: '/work/' },
              { name: study.client },
            ]}
          />
          <div className="grid gap-10 lg:grid-cols-[1fr_18rem] lg:items-start">
            <div className="flex max-w-3xl flex-col gap-5">
              <Eyebrow>
                {study.category} · {study.year}
              </Eyebrow>
              {/* The legacy Ottenheimer page had no H1 at all. Every page has one now. */}
              <h1 className="text-display-1">{study.title}</h1>
              <p className="text-body-lg prose-measure text-(--color-text-muted)">{study.lead}</p>
              {study.liveUrl ? (
                <div className="pt-2">
                  <ButtonLink href={study.liveUrl} target="_blank" rel="noopener">
                    Try it live
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </ButtonLink>
                </div>
              ) : null}
            </div>

            <aside className="panel flex flex-col gap-5 rounded-(--radius-lg) p-6 lg:sticky lg:top-24">
              <div>
                <p className="text-eyebrow uppercase text-(--color-text-subtle)">Client</p>
                <p className="mt-1 font-semibold text-white">{study.client}</p>
              </div>
              {study.platforms?.length ? (
                <div className="border-t border-white/10 pt-4">
                  <p className="text-eyebrow uppercase text-(--color-text-subtle)">Platforms</p>
                  <p className="mt-1 text-(--color-text-muted)">{study.platforms.join(' · ')}</p>
                </div>
              ) : null}
              <div className="border-t border-white/10 pt-4">
                <p className="text-eyebrow uppercase text-(--color-text-subtle)">Built with</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {study.stack.map((s) => (
                    <li key={s}>
                      <Badge>{s}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-white/10 pt-4">
                <p className="text-eyebrow uppercase text-(--color-text-subtle)">Services used</p>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {study.services.map((s) => {
                    const svc = getService(s)
                    if (!svc) return null
                    return (
                      <li key={s}>
                        <Link
                          href={`/services/${s}/`}
                          className="text-small text-(--color-accent) hover:underline"
                        >
                          {svc.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* --- Challenge ---------------------------------------------------- */}
      {/* Real screens from the build. Renders nothing until they exist, so a
          case study without screenshots degrades to text rather than to a row
          of broken boxes. First shot is priority — it is usually the LCP
          element on this page. */}
      {study.shots?.length ? (
        <Section className="pb-12 md:pb-16">
          <Container>
            <div className="grid gap-8 md:grid-cols-2">
              {study.shots.map((shot, i) => (
                <ProductShot
                  key={shot.src}
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  caption={shot.caption}
                  priority={i === 0}
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section tone="veil" className="py-16 md:py-20">
        <Container>
          <div className="max-w-3xl">
            <SectionHeading eyebrow="The problem" title="What was actually hard" accent="actually hard" />
            <p className="mt-6 text-body-lg text-(--color-text-muted)">{study.challenge}</p>
          </div>
        </Container>
      </Section>

      {/* --- Approach ------------------------------------------------------ */}
      <Section glow="right">
        <Container>
          <SectionHeading eyebrow="What we did" title="How it was built" accent="How" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {study.approach.map((a, i) => (
              <Card key={a.title} className="gap-3">
                <span className="font-(family-name:--font-display) text-[1.25rem] font-bold text-(--color-accent)">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-h3">{a.title}</h3>
                <p className="text-(--color-text-muted)">{a.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* --- Results ------------------------------------------------------- */}
      <Section tone="veil">
        <Container>
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow="Outcome"
              title="What shipped"
              accent="shipped"
              lead="Described rather than quantified — we only publish numbers a client has signed off in writing."
            />
            <ul className="mt-10 flex flex-col gap-4">
              {study.results.map((r) => (
                <li key={r} className="flex gap-3">
                  <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-coral-500/20">
                    <Check className="size-3 text-(--color-accent)" aria-hidden="true" />
                  </span>
                  <span className="text-body-lg text-(--color-text-muted)">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* --- Related ------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading eyebrow="More work" title="Other projects" accent="Other" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {related.map((c) => (
              <CaseStudyCard key={c.slug} study={c} />
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand title="Have a project like this?" accent="like this" />
    </>
  )
}
