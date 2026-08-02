import { Container, Section, SectionHeading } from '@/components/ui/layout'

/**
 * FAQ — a SERVER COMPONENT built on native <details>/<summary>.
 *
 * Zero JavaScript. An accordion is the classic place teams reach for a client
 * component and ship 4KB of state management for something the platform does
 * natively — and every kilobyte of client JS is INP you pay for on mobile.
 *
 * ⚠️ DO NOT ADD FAQPage SCHEMA. Google, verbatim: "As of May 7, 2026, FAQ
 * rich results are no longer appearing in Google Search. We will be dropping
 * the FAQ search appearance, rich result report, and support in the Rich
 * results test in June 2026." Search Console API support ends August 2026.
 * The markup is not penalised — it simply earns nothing and can no longer be
 * tested or reported on. Keep the CONTENT (it catches long-tail queries and
 * feeds AI Overviews); skip the markup.
 */

export type Faq = { q: string; a: string }

export function FaqSection({
  items,
  title = 'Questions we get asked',
  accent = 'asked',
  eyebrow = 'FAQ',
}: {
  items: Faq[]
  title?: string
  accent?: string
  eyebrow?: string
}) {
  return (
    <Section>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} accent={accent} />
        <div className="mt-10 max-w-3xl divide-y divide-white/10 border-y border-white/10">
          {items.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[1.0625rem] font-semibold text-(--color-text) marker:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="grid size-6 shrink-0 place-items-center rounded-full border border-white/20 text-(--color-accent) transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="prose-measure mt-3 text-(--color-text-muted)">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  )
}
