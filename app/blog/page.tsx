import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Section, SectionHeading, Eyebrow } from '@/components/ui/layout'
import { Card } from '@/components/ui/card'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { CtaBand } from '@/components/sections/blocks'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import { getAllPosts } from '@/lib/content'

/**
 * Blog index.
 *
 * Empty on purpose, and it handles empty gracefully rather than showing three
 * filler posts. The planned first two (blueprint §9.6) target the weakest
 * SERPs found in research — page one for both is personal blogs and
 * micro-agencies with zero directories — and we are living the topic:
 *
 *   1. "WordPress vs Next.js for a business website"
 *   2. "How we migrated our own site off WordPress" — with the real
 *      before/after Core Web Vitals and the Search Console recovery curve
 *
 * Publishing filler to make this look populated is worse than an empty
 * section, because a thin blog is a quality signal in the wrong direction.
 */
export const metadata: Metadata = pageMetadata({
  title: 'Notes on Building Software',
  description:
    'Working notes from LabTechCrew on AI architecture, WordPress to Next.js migrations, Core Web Vitals and shipping software for US clients.',
  path: '/blog',
})

const PLANNED = [
  {
    title: 'WordPress vs Next.js for a business website',
    note: 'The honest comparison, including when WordPress is still the right answer.',
  },
  {
    title: 'We migrated our own site off WordPress. Here are the numbers.',
    note: 'Redirect map, metadata freeze, the two-hop chain the docs said would not happen, and the recovery curve.',
  },
  {
    title: 'What it actually costs to run an AI assistant',
    note: 'Per-conversation economics with real figures, not a vendor pricing page.',
  },
  {
    title: 'Designing what an AI must refuse to answer',
    note: 'The part of the build that took longest on QuranRI, and why it matters more than the model.',
  },
]

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog' }])} />

      <Section className="pb-12 md:pb-16">
        <Container>
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Blog' }]} />
          <div className="flex max-w-3xl flex-col gap-5">
            <Eyebrow>Notes</Eyebrow>
            <h1 className="text-display-1">
              Working notes, <span className="em-accent">not thought leadership</span>
            </h1>
            <p className="text-body-lg text-(--color-text-muted)">
              Things we learned building real projects, written up while they are still fresh
              enough to be specific.
            </p>
          </div>
        </Container>
      </Section>

      {posts.length ? (
        <Section tone="veil">
          <Container>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <Card key={p.slug} href={`/blog/${p.slug}/`} className="h-full">
                  <p className="text-small text-(--color-text-subtle)">
                    {p.publishedAt.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}{' '}
                    · {p.readingMinutes} min read
                  </p>
                  <h2 className="text-h3">{p.title}</h2>
                  <p className="text-(--color-text-muted)">{p.description}</p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      ) : (
        <Section tone="veil">
          <Container>
            <div className="panel flex max-w-3xl flex-col gap-5 rounded-(--radius-xl) p-8">
              <h2 className="text-h3">Nothing published yet — and that is deliberate</h2>
              <p className="text-(--color-text-muted)">
                We would rather have an empty section than four posts of filler. Here is what is
                actually being written, in order:
              </p>
              <ol className="flex flex-col gap-4">
                {PLANNED.map((p, i) => (
                  <li key={p.title} className="flex gap-4">
                    <span className="font-(family-name:--font-display) text-[1.125rem] font-bold text-(--color-accent)">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>
                      <span className="block font-medium text-white">{p.title}</span>
                      <span className="block text-small text-(--color-text-subtle)">{p.note}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="text-small text-(--color-text-subtle)">
                Want one of these sooner, or have a question you would like answered properly?{' '}
                <Link href="/contact/" className="text-(--color-accent) hover:underline">
                  Ask us
                </Link>{' '}
                — we will usually just answer it directly.
              </p>
            </div>
          </Container>
        </Section>
      )}

      <CtaBand />
    </>
  )
}
