import type { Metadata } from 'next'
import { Container, Section, SectionHeading, Eyebrow } from '@/components/ui/layout'
import { Card, Badge } from '@/components/ui/card'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { CtaBand } from '@/components/sections/blocks'
import { FaqSection } from '@/components/sections/faq'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import { SITE } from '@/lib/site'

/**
 * /how-we-work/ — the page that does more selling than any other.
 *
 * Blueprint §4.5 and §2.5. Research finding: US buyers' objections to an
 * offshore team are almost never about English or nationality. Ranked by real
 * frequency they are: communication latency, code quality, ghosting, team
 * turnover, and "cheap means bad". Every section below answers one of those in
 * writing, which is something no comparable agency's site does.
 */
export const metadata: Metadata = pageMetadata({
  title: 'How We Work — Contracts, IP, Timezone and Delivery',
  description:
    'Engagement models, fixed-price phases, IP ownership from day one, a mutual NDA on request, Texas-governed contracts and five hours of daily US Eastern overlap.',
  path: '/how-we-work',
})

const ENGAGEMENTS = [
  {
    name: 'Fixed-scope project',
    price: 'Priced per phase',
    body: 'We scope, price and date a phase. You approve it before it starts, and you can stop cleanly at the end of any phase. Best for a defined build with a known end state.',
    best: 'A site, an app, a first working slice of software.',
  },
  {
    name: 'Monthly retainer',
    price: 'From $4,000 / month',
    body: 'A set number of days each month against a rolling backlog you control. No unused hours to argue about, no scope negotiation for every small change.',
    best: 'Ongoing improvement after launch, or a product that keeps moving.',
  },
  {
    name: 'Dedicated team',
    price: 'From $6,000 / month',
    body: 'Named people, working your hours, in your tools and your standups. You direct the work; we handle employment, cover and continuity.',
    best: 'A roadmap longer than one project, or extending an in-house team.',
  },
]

const PROCESS = [
  {
    n: '01',
    title: 'Scoping call',
    duration: '20 minutes',
    what: 'You describe the problem, not the solution.',
    body: 'We ask what changes for your business if this works. About a third of the time the honest answer is smaller and cheaper than the enquiry asked for, and we say so on the call. Free, and we will send a mutual NDA first if you want one.',
  },
  {
    n: '02',
    title: 'Written scope',
    duration: '3–5 days',
    what: 'A document with a fixed price and dates.',
    body: 'What we will build, what we will not build, what we need from you and when, and what it costs. You own that document whether or not you hire us.',
  },
  {
    n: '03',
    title: 'Design',
    duration: '1–3 weeks',
    what: 'Flows first, then interface.',
    body: 'Wireframes before visuals, so we argue about structure while it is still cheap to change. You sign off before anyone writes code.',
  },
  {
    n: '04',
    title: 'Build',
    duration: '3–12 weeks',
    what: 'A live staging URL from week two.',
    body: 'Weekly demos on a real URL you can open on your own phone. Not a status report — the actual thing. If something is late you hear it in that call, not at the end.',
  },
  {
    n: '05',
    title: 'Launch',
    duration: '1 week',
    what: 'Deployment, monitoring, handover.',
    body: 'Analytics verified, search monitored, documentation and a recorded walkthrough handed over. For migrations we watch Search Console weekly for six weeks.',
  },
  {
    n: '06',
    title: 'Support',
    duration: 'Ongoing',
    what: 'Thirty days included, then optional.',
    body: 'Thirty days of fixes after launch as standard, because the first real-user week always finds something. After that, a retainer if you want one — and no penalty if you do not.',
  },
]

const FAQS = [
  {
    q: 'What happens if we are not happy with the work?',
    a: 'Phases are the mechanism. Because each one is scoped, priced and approved separately, you can stop at the end of any phase and keep everything produced up to that point — code, designs, documents, accounts. There is no long contract to escape from, and nothing is withheld pending a final payment.',
  },
  {
    q: 'How do you handle the time difference?',
    a: 'We hold 8am to 1pm US Eastern as fixed working hours, Monday to Friday — five hours of live overlap every working day. Meetings are booked inside that window on a calendar you can see. Outside it, anything urgent has a named person and a phone number rather than a shared inbox.',
  },
  {
    q: 'Who actually does the work?',
    a: 'The people named on our About page. If a specialist joins for part of a build you will be told who and why before they start. You will never be introduced to a senior engineer and handed a junior — that practice is why "offshore" carries the reputation it does.',
  },
  {
    q: 'What if a developer leaves mid-project?',
    a: 'Everything lives in your repository with documented architecture and environment setup, and at least two people are familiar with every project. Turnover is a real risk in this industry and the honest answer is not "it will not happen" — it is that the project does not depend on one person\'s memory.',
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Yes. We will send a mutual NDA before the first call if you request one. Zero obligation, no minimum project size.',
  },
  {
    q: 'How do we pay you?',
    a: 'US bank account, W-9 on file, invoiced in USD like any US vendor. Typically a deposit to start a phase and the balance on completion of it. No international wires and nothing for your finance team to escalate.',
  },
]

export default function HowWeWorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'How We Work' }])} />

      <Section className="pb-12 md:pb-16">
        <Container>
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'How We Work' }]} />
          <div className="flex max-w-3xl flex-col gap-5">
            <Eyebrow>How we work</Eyebrow>
            <h1 className="text-display-1">
              The boring parts, <span className="em-accent">in writing</span>
            </h1>
            <p className="text-body-lg text-(--color-text-muted)">
              Contracts, IP, payment, timezone and what happens when something goes wrong. These
              are the questions that decide whether you hire an offshore team, and almost nobody
              answers them on their website. We do, here, before you have to ask.
            </p>
          </div>
        </Container>
      </Section>

      {/* --- The four guarantees ----------------------------------------- */}
      <Section tone="veil" className="py-16 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="Non-negotiables"
            title="Four things that are true on every engagement"
            accent="every engagement"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SITE.differentiators.map((d) => (
              <Card key={d.title}>
                <h3 className="text-h3">{d.title}</h3>
                <p className="text-(--color-text-muted)">{d.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* --- Engagement models -------------------------------------------- */}
      <Section glow="right">
        <Container>
          <SectionHeading
            eyebrow="Engagement models"
            title="Three ways to work with us"
            accent="Three ways"
            lead="Pick the one that matches the shape of the work. We will tell you on the call if you have picked the expensive one."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ENGAGEMENTS.map((e) => (
              <Card key={e.name} className="h-full gap-4">
                <div>
                  <h3 className="text-h3">{e.name}</h3>
                  <p className="mt-1 font-(family-name:--font-display) text-[1.25rem] font-bold text-(--color-accent)">
                    {e.price}
                  </p>
                </div>
                <p className="text-(--color-text-muted)">{e.body}</p>
                <p className="mt-auto border-t border-white/10 pt-4 text-small text-(--color-text-subtle)">
                  <strong className="text-white">Best for:</strong> {e.best}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* --- Process ------------------------------------------------------- */}
      <Section tone="veil">
        <Container>
          <SectionHeading
            eyebrow="The process"
            title="Six steps, each with a duration attached"
            accent="a duration attached"
            lead="A process diagram without dates is decoration. Here is what happens and how long it takes."
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROCESS.map((s) => (
              <li key={s.n}>
                <Card className="h-full gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-(family-name:--font-display) text-[1.5rem] font-bold text-(--color-accent)">
                      {s.n}
                    </span>
                    <Badge>{s.duration}</Badge>
                  </div>
                  <h3 className="text-h3">{s.title}</h3>
                  <p className="font-medium text-white">{s.what}</p>
                  <p className="text-(--color-text-muted)">{s.body}</p>
                </Card>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* --- Contracts and IP ---------------------------------------------- */}
      <Section glow="left">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="panel flex flex-col gap-4 rounded-(--radius-xl) p-8">
              <Eyebrow>Contracts</Eyebrow>
              <h2 className="text-h3">Who you are actually contracting with</h2>
              <ul className="flex flex-col gap-3 text-(--color-text-muted)">
                <li>
                  Your agreement is with <strong className="text-white">{SITE.legalName}</strong>,{' '}
                  {SITE.jurisdiction}, governed by Texas law. One entity, in your jurisdiction, to
                  hold accountable.
                </li>
                <li>
                  A master services agreement plus a statement of work per phase — the standard
                  structure your legal team already knows how to read.
                </li>
                <li>A mutual NDA before the first call, on request. Zero obligation.</li>
                <li>
                  A data processing agreement on request, if you handle personal data and need one.
                </li>
              </ul>
            </div>

            <div className="panel flex flex-col gap-4 rounded-(--radius-xl) p-8">
              <Eyebrow>Intellectual property</Eyebrow>
              <h2 className="text-h3">You own it from the moment it is written</h2>
              <ul className="flex flex-col gap-3 text-(--color-text-muted)">
                <li>
                  Work product belongs to you the instant it is created. Not on delivery, not on
                  final payment.
                </li>
                <li>
                  <strong className="text-white">
                    Watch for &ldquo;IP transfers upon final payment&rdquo; in other proposals.
                  </strong>{' '}
                  That is code held hostage with extra steps.
                </li>
                <li>
                  Repositories, cloud accounts, domains, App Store and Play Console accounts are
                  created in your name, not ours.
                </li>
                <li>Confidentiality survives the engagement, with no expiry date.</li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* --- Communication -------------------------------------------------- */}
      <Section tone="veil" className="py-16 md:py-20">
        <Container>
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow="Communication"
              title="Five hours of overlap, every working day"
              accent="Five hours"
            />
            <div className="mt-8 flex flex-col gap-4 text-body-lg text-(--color-text-muted)">
              <p>
                The single most common complaint about offshore teams is not language or quality —
                it is that a question costs you a day. Our fixed working window is{' '}
                <strong className="text-white">8am to 1pm US Eastern, Monday to Friday</strong>.
                Inside it we are live: calls, screen shares, decisions in real time.
              </p>
              <p>
                Weekly demo on a staging URL you can open yourself. Same day and time, every week,
                from week two. A written summary after each one — what shipped, what is next, what
                we need from you.
              </p>
              <p>
                We work in your tools. Slack, Teams, Jira, Linear, Notion, email — whatever your
                team already opens. We will not ask you to learn ours.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <FaqSection items={FAQS} title="The questions that actually decide it" accent="actually decide it" />
      <CtaBand title="Start with the 20-minute call" accent="20-minute call" />
    </>
  )
}
