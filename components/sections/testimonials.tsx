import { Container, Section, SectionHeading } from '@/components/ui/layout'

const TESTIMONIALS = [
  {
    quote:
      'I worked with Labtechcrew on a development project, and the experience was excellent from start to finish. Communication was clear, and the process was well-structured. They delivered on time and met all the agreed requirements. What I appreciated most was their responsiveness and attention to detail \u2014 any questions I had were answered promptly, and the final result matched what we discussed.',
    name: 'Betsy Rebelheart',
  },
  {
    quote:
      'From the very first interaction, their approach felt strategic yet human-centered, blending creativity with technical brilliance. What impressed me most was the transparency, seamless communication, and a laser-focused process from discovery to launch. Whether it\u2019s AI-driven solutions, mobile apps, SaaS platforms, or full-stack development, their expertise shines through every step.',
    name: 'MaverickCole Steele',
  },
]

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M10 8c-1.1 0-2 .9-2 2v4h4v-4H8.4c.4-1.6 1.6-2.8 3.2-3.2L10 8Zm8 0c-1.1 0-2 .9-2 2v4h4v-4h-3.6c.4-1.6 1.6-2.8 3.2-3.2L18 8Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function Testimonials() {
  return (
    <Section tone="veil">
      <Container>
        <SectionHeading
          eyebrow="What clients say"
          title="Words we earned, not words we wrote"
          accent="earned"
          lead="Every testimonial here is from a client we worked with directly. We publish no review we cannot verify."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="panel flex flex-col gap-5 rounded-(--radius-xl) p-8"
            >
              <QuoteIcon className="size-8 text-coral-500/50" />
              <blockquote className="flex flex-1 flex-col gap-4">
                <p className="text-body-lg text-(--color-text-muted)">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-auto border-t border-white/10 pt-4 text-small font-semibold text-white">
                  {t.name}
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
