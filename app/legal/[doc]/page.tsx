import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container, Section, Eyebrow } from '@/components/ui/layout'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import { SITE } from '@/lib/site'
import { LEGAL_DOCS, getLegalDoc } from '@/lib/data/legal'

/**
 * Legal pages, rendered in the ONE light section in the system — long-form
 * legal text on a dark violet gradient is genuinely tiring to read, and these
 * are documents people occasionally have to read carefully.
 *
 * The documents themselves live in lib/data/legal.ts and were reviewed and
 * approved by a licensed US attorney, in force as of August 7, 2026. Material
 * changes to them need legal re-review before they ship.
 */

export function generateStaticParams() {
  return LEGAL_DOCS.map((d) => ({ doc: d.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ doc: string }>
}): Promise<Metadata> {
  const { doc } = await params
  const legal = getLegalDoc(doc)
  if (!legal) return {}

  return pageMetadata({
    title: legal.title,
    description: legal.description,
    path: `/legal/${doc}`,
  })
}

export default async function LegalPage({ params }: { params: Promise<{ doc: string }> }) {
  const { doc } = await params
  const legal = getLegalDoc(doc)
  if (!legal) notFound()

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: legal.title }])}
      />

      <Section tone="light">
        <Container>
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: legal.title }]} />
          <div className="max-w-3xl">
            <Eyebrow>Legal</Eyebrow>
            <h1 className="text-display-2 mt-3">{legal.title}</h1>
            <p className="mt-3 text-small text-(--color-text-subtle)">
              Last updated {legal.updated} · {SITE.legalName}, {SITE.jurisdiction}
            </p>

            <div className="mt-10 flex flex-col gap-10">
              {legal.sections.map((s) => (
                <section key={s.heading}>
                  <h2 className="text-h3">{s.heading}</h2>
                  <div className="mt-3 flex flex-col gap-3">
                    {s.body.map((p, i) => (
                      <p key={i} className="prose-measure text-(--color-text-muted)">
                        {p}
                      </p>
                    ))}
                    {s.bullets?.length ? (
                      <ul className="prose-measure flex list-disc flex-col gap-2 pl-5 text-(--color-text-muted)">
                        {s.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-12 rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) p-6">
              <p className="text-small text-(--color-text-muted)">
                Questions about this document? Email{' '}
                <a href={`mailto:${SITE.contact.email}`} className="text-(--color-accent) underline">
                  {SITE.contact.email}
                </a>{' '}
                or write to {SITE.legalName},{SITE.address.street ? ` ${SITE.address.street},` : ''} {SITE.address.city},{' '}
                {SITE.address.region} {SITE.address.postalCode}.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
