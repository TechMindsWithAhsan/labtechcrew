import type { Metadata } from 'next'
import { Container, Section, SectionHeading, Eyebrow } from '@/components/ui/layout'
import { Button, ButtonLink } from '@/components/ui/button'
import { Card, Badge, StatBlock } from '@/components/ui/card'
import { Field, Input, Textarea, Select, Checkbox } from '@/components/ui/field'
import { TestimonialCard, TeamCard } from '@/components/sections/blocks'
import { LogoMark, Wordmark } from '@/components/ui/logo'
import { pageMetadata } from '@/lib/seo'

/**
 * Living styleguide. Noindex, and disallowed in robots.ts.
 *
 * Build components HERE first, in isolation, and do the accessibility pass —
 * keyboard, focus, contrast, screen reader — before assembling any page.
 * It is an order of magnitude cheaper than retrofitting.
 *
 * Every color on this page was sampled from the six LabTechCrew ad
 * creatives, and every text/background pair was contrast-checked. The numbers
 * are printed next to the swatches so nobody has to take it on faith.
 */
export const metadata: Metadata = pageMetadata({
  title: 'Styleguide',
  description: 'Internal component reference.',
  path: '/styleguide',
  noindex: true,
})

const RAMP = [
  ['brand-500 #2A0090', 'bg-brand-500', 'gradient top — the signature violet'],
  ['brand-600 #210074', 'bg-brand-600', ''],
  ['brand-700 #1B005E', 'bg-brand-700', ''],
  ['brand-800 #150047', 'bg-brand-800', ''],
  ['brand-850 #0E0032', 'bg-brand-850', ''],
  ['brand-900 #08001D', 'bg-brand-900', ''],
  ['brand-950 #05000F', 'bg-brand-950', 'gradient bottom'],
]

const ACCENTS = [
  ['coral-500 #DA797E', 'bg-coral-500', 'brand accent — emphasis + primary button'],
  ['coral-300 #EAB4B7', 'bg-coral-300', 'rose tint, from "Digital Era"'],
  ['coral-700 #B23F49', 'bg-coral-700', 'coral for LIGHT backgrounds only'],
  ['magenta #F90060', 'bg-magenta-500', 'once per page, maximum'],
  ['brand-250 #4D4B94', 'bg-brand-250', 'muted indigo, illustrations'],
  ['brand-300 #5B34E8', 'bg-brand-300', 'glow / decorative only'],
]

const CONTRAST = [
  ['white on #2A0090', '13.99:1', true],
  ['coral on #2A0090', '4.67:1', true],
  ['coral on #08001D', '6.83:1', true],
  ['#BFB2E4 on #2A0090', '7.13:1', true],
  ['#0F0026 on coral (button)', '6.80:1', true],
  ['white on coral', '2.99:1', false],
  ['coral on white', '2.99:1', false],
]

export default function StyleguidePage() {
  return (
    <>
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Internal"
            title="LabTechCrew styleguide"
            accent="styleguide"
            lead="Every primitive, every state. If a design needs a component that is not here, question the design before you add one."
          />
          <div className="mt-8 flex items-center gap-3">
            <LogoMark className="h-10 w-auto" />
            <Wordmark />
            <span className="ml-4 text-small text-(--color-text-subtle)">
              Brand mark
            </span>
          </div>
        </Container>
      </Section>

      <Section tone="veil">
        <Container>
          <h2 className="text-display-2">
            The violet <span className="em-accent">ramp</span>
          </h2>
          <p className="prose-measure mt-3 text-(--color-text-muted)">
            Sampled stop-for-stop from the creatives. It lives on <code>body</code> as one fixed
            gradient — sections are transparent so the ramp runs the full height of the page.
            Giving a section a solid dark background breaks it and the page starts looking like
            stacked black boxes.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {RAMP.map(([name, cls, note]) => (
              <div key={name} className="flex flex-col gap-2">
                <div className={`h-20 rounded-(--radius-md) border border-white/12 ${cls}`} />
                <span className="text-small text-(--color-text-muted)">{name}</span>
                {note ? (
                  <span className="text-[0.75rem] text-(--color-text-subtle)">{note}</span>
                ) : null}
              </div>
            ))}
          </div>

          <h3 className="mt-14 text-h3">Accents</h3>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {ACCENTS.map(([name, cls, note]) => (
              <div key={name} className="flex flex-col gap-2">
                <div className={`h-20 rounded-(--radius-md) border border-white/12 ${cls}`} />
                <span className="text-small text-(--color-text-muted)">{name}</span>
                <span className="text-[0.75rem] text-(--color-text-subtle)">{note}</span>
              </div>
            ))}
          </div>

          <h3 className="mt-14 text-h3">Measured contrast (WCAG 2.1)</h3>
          <ul className="mt-4 flex flex-col gap-2">
            {CONTRAST.map(([pair, ratio, pass]) => (
              <li key={pair as string} className="flex items-center gap-3 text-small">
                <span
                  className={`inline-flex w-14 justify-center rounded-full px-2 py-0.5 text-[0.7rem] font-semibold ${
                    pass ? 'bg-(--color-success)/20 text-(--color-success)' : 'bg-(--color-danger)/20 text-(--color-danger)'
                  }`}
                >
                  {pass ? 'PASS' : 'FAIL'}
                </span>
                <span className="text-(--color-text-muted)">{pair}</span>
                <span className="text-(--color-text-subtle)">{ratio}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="text-display-2">Type</h2>
          <div className="mt-8 flex flex-col gap-6">
            <p className="text-display-1">
              Display 1 — one <span className="em-accent">coral</span> word
            </p>
            <p className="text-display-2">Display 2 — section H2</p>
            <p className="text-h3">H3 — card titles</p>
            <p className="text-body-lg prose-measure text-(--color-text-muted)">
              Body large. Used for hero subheads and intro paragraphs. Measure is capped at 68
              characters — Elementor prose runs 110+, which is the main reason those pages feel
              unreadable.
            </p>
            <p className="text-body prose-measure text-(--color-text-muted)">
              Body. The default. Line height 1.7 because agency sites are read on phones in bad
              light by people who are half paying attention.
            </p>
            <p className="text-small text-(--color-text-subtle)">Small — captions and legal.</p>
            <Eyebrow>Eyebrow — section labels</Eyebrow>
            <p className="text-display-2 text-logo-gradient w-fit">Logo-gradient text</p>
          </div>
        </Container>
      </Section>

      <Section tone="veil">
        <Container>
          <h2 className="text-display-2">Buttons</h2>
          <p className="prose-measure mt-3 text-(--color-text-muted)">
            Primary is coral with <strong>dark</strong> text. White on coral measures 2.99:1 and
            fails WCAG — never invert it. Coral is the only warm color on the page, so it goes on
            the one action you actually want taken.
          </p>
          <div className="mt-8 flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Primary small</Button>
              <Button>Primary medium</Button>
              <Button size="lg">Primary large</Button>
              <Button disabled>Disabled</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <ButtonLink href="/contact/">As a link</ButtonLink>
            </div>
            <div className="flex flex-wrap items-center gap-3 rounded-(--radius-lg) bg-coral-500 p-6">
              <Button variant="inverse">Inverse — for use on a coral surface</Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="text-display-2">Cards, badges, stats</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Card>
              <h3 className="text-h3">Static card</h3>
              <p className="text-(--color-text-muted)">
                Translucent, so the page gradient shows through. A solid fill reads as a sticker.
              </p>
            </Card>
            <Card href="/styleguide/">
              <h3 className="text-h3">Linked card</h3>
              <p className="text-(--color-text-muted)">
                Lifts on hover, border turns coral. Whole surface is the hit area.
              </p>
            </Card>
            <Card>
              <div className="flex flex-wrap gap-2">
                <Badge>Neutral</Badge>
                <Badge tone="accent">Accent</Badge>
                <Badge tone="highlight">Once per page</Badge>
              </div>
              <div className="mt-4 flex gap-8">
                <StatBlock value="9–6" label="Business hours, Mon to Fri" />
                <StatBlock value="100%" label="IP transfer on final payment" />
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section tone="veil">
        <Container>
          <h2 className="text-display-2">Form controls</h2>
          <p className="prose-measure mt-3 text-(--color-text-muted)">
            Dark forms need an unmistakable focus state — coral border plus a coral ring. A subtle
            focus state on a dark form is a known conversion leak: people cannot tell where they
            are typing.
          </p>
          <div className="mt-8 grid max-w-2xl gap-5">
            <Field label="Full name" htmlFor="sg-name" required>
              <Input id="sg-name" placeholder="Jane Rivera" />
            </Field>
            <Field label="Company email" htmlFor="sg-email" required error="Please enter a valid email">
              <Input id="sg-email" aria-invalid="true" defaultValue="not-an-email" />
            </Field>
            <Field label="Budget" htmlFor="sg-budget" hint="We publish our ranges." required>
              <Select id="sg-budget" defaultValue="">
                <option value="" disabled>
                  Select a range
                </option>
                <option value="5-15k">$5,000 – $15,000</option>
              </Select>
            </Field>
            <Field label="What are you building?" htmlFor="sg-msg">
              <Textarea id="sg-msg" placeholder="A few sentences is plenty." />
            </Field>
            <Checkbox id="sg-consent" label="You can email me about my enquiry." />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="text-display-2">People and proof</h2>
          <p className="prose-measure mt-3 text-(--color-text-muted)">
            Real people and real quotes only. If it cannot be verified, it does not ship.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <TestimonialCard
              quote="Example only — replace with a verified quote and a LinkedIn URL."
              name="Placeholder Name"
              role="Role"
              company="Company"
            />
            <TeamCard
              name="Sample Person"
              role="Co-founder — AI & full-stack"
              location="Sample location — only ever a real, consented one"
            />
            <TeamCard
              name="TODO — US partner"
              role="Co-founder — US operations"
              location="Texas, USA"
            />
          </div>
        </Container>
      </Section>

      {/* The only light section in the system — long-form reading only. */}
      <Section tone="light">
        <Container>
          <h2 className="text-display-2">Light section (blog and legal only)</h2>
          <p className="prose-measure mt-3 text-(--color-text-muted)">
            Long-form reading on a dark gradient is tiring. Blog posts and legal pages get a white
            section. Inside <code>data-theme=&quot;light&quot;</code> the semantic tokens flip
            automatically, so components need no light variants — note that{' '}
            <span className="em-accent">coral emphasis</span> has switched to #B23F49, because raw
            coral measures 2.99:1 on white and fails.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
