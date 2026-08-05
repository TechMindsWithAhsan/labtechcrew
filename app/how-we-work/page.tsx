import type { Metadata } from 'next'
import { Container, Section, SectionHeading, Eyebrow } from '@/components/ui/layout'
import { Card, Badge } from '@/components/ui/card'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { CtaBand } from '@/components/sections/blocks'
import { HeroColumns } from '@/components/sections/hero'
import { FaqSection } from '@/components/sections/faq'
import characterHowWeWork from '@/public/characters/how-we-work.webp'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import { SITE } from '@/lib/site'
import { numberWord } from '@/lib/utils'

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
  title: 'How We Work: Contracts, IP, Timezone and Delivery',
  description:
    'Engagement models, fixed-price phases invoiced only after you sign them off, full code and IP transfer on final payment, a mutual NDA on request, Texas-governed contracts and business hours of 9:00 AM to 6:00 PM, Monday to Friday.',
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
    body: 'Weekly demos on a real URL you can open on your own phone. Not a status report: the actual thing. Frontend and backend are separate phases, each quoted and approved before it starts and invoiced only once you have signed it off. If something is late you hear it in that call, not at the end.',
  },
  {
    n: '05',
    title: 'QA and launch',
    duration: '1 week',
    what: 'Deployment, monitoring, handover.',
    body: 'Analytics verified, search monitored, documentation and a recorded walkthrough handed over. For migrations we watch Search Console weekly for six weeks. This is the last phase: when its invoice clears, full ownership of the code and IP is yours.',
  },
  {
    n: '06',
    title: 'Support',
    duration: 'Ongoing',
    what: 'Thirty days included, then optional.',
    body: 'Thirty days of fixes after launch as standard, because the first real-user week always finds something. After that, a retainer if you want one, and no penalty if you do not.',
  },
]

const FAQS = [
  {
    q: 'What happens if we are not happy with the work?',
    a: 'Phases are the mechanism. Each one is scoped, priced and approved separately, demonstrated before it is invoiced and signed off before the next begins, so you find out how we work while the commitment is still one phase long. Stop at any boundary and that phase\'s invoice becomes the final payment of the engagement: it clears, ownership of everything produced transfers to you, and we hand over the code, designs, documents and accounts. There is no long contract to escape from.',
  },
  {
    q: 'When are you available?',
    a: `Our business hours are ${SITE.hours.display}. Meetings are booked inside them on a calendar you can see, and anything you send during them gets a reply from a person the same working day: not an acknowledgement, an answer or a time by which you will have one. Outside them, anything urgent has a named person and a phone number rather than a shared inbox.`,
  },
  {
    q: 'Who actually does the work?',
    a: 'One named technical lead from the first call to the last, plus whoever that build genuinely needs. If a specialist joins for part of it you will be told who and why before they start. You will never be introduced to a senior engineer and then handed a junior. The bait-and-switch is the single most common complaint about agencies of every size, and it is a choice, not an accident.',
  },
  {
    q: 'What if a developer leaves mid-project?',
    a: 'Everything lives in your repository with documented architecture and environment setup, and at least two people are familiar with every project. Turnover is a real risk in this industry and the honest answer is not "it will not happen". It is that the project does not depend on one person\'s memory.',
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Yes. We will send a mutual NDA before the first call if you request one. Zero obligation, no minimum project size.',
  },
  {
    q: 'How do we pay you?',
    a: 'An advance to begin, then one invoice per phase, raised when that phase is complete and you have approved it. Pay however your finance team already pays vendors: ACH bank transfer, domestic or international wire, credit or debit card (Visa, Mastercard, American Express and Discover, processed through Stripe), Square, PayPal, Wise, or a company check. Invoiced in USD with a W-9 on file, so there is nothing for accounts payable to escalate. Above $10,000 we invoice by ACH or wire, because card processing fees on a five-figure invoice come out of the project budget rather than ours.',
  },
]

export default function HowWeWorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'How We Work' }])} />

      <Section>
        <Container>
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'How We Work' }]} />
          <HeroColumns
            character={{
              src: characterHowWeWork,
              alt: 'Figure in a gray suit with an alarm clock for a head, checking a wristwatch',
            }}
          >
            <div className="flex max-w-3xl flex-col gap-5">
              <Eyebrow>How we work</Eyebrow>
              <h1 className="text-display-1">
                The boring parts, <span className="em-accent">in writing</span>
              </h1>
              <p className="text-body-lg text-(--color-text-muted)">
                Contracts, IP, payment, timezone and what happens when something goes wrong. These
                are the questions that decide whether you hire an agency at all, and almost nobody
                answers them on their website. We do, here, before you have to ask.
              </p>
            </div>
          </HeroColumns>
        </Container>
      </Section>

      {/* --- The four guarantees ----------------------------------------- */}
      <Section tone="veil">
        <Container>
          <SectionHeading
            eyebrow="Non-negotiables"
            title={`${numberWord(SITE.differentiators.length, true)} things that are true on every engagement`}
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
            title={`${numberWord(PROCESS.length, true)} steps, each with a duration attached`}
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
                  A master services agreement plus a statement of work per phase: the standard
                  structure your legal team already knows how to read.
                </li>
                <li>A mutual NDA before the first call, on request. Zero obligation.</li>
                <li>
                  A data processing agreement on request, if you handle personal data and need one.
                </li>
              </ul>
            </div>

            <div className="panel flex flex-col gap-4 rounded-(--radius-xl) p-8">
              <Eyebrow>Payment and intellectual property</Eyebrow>
              <h2 className="text-h3">Paid a phase at a time, yours in full on completion</h2>
              <ul className="flex flex-col gap-3 text-(--color-text-muted)">
                <li>
                  An advance to begin, then one invoice per phase: discovery and scoping, UI/UX
                  design, frontend build, backend build, QA and launch. Each phase is scoped,
                  quoted and approved in writing before it starts.
                </li>
                <li>
                  <strong className="text-white">
                    You are never asked to pay for work you have not seen.
                  </strong>{' '}
                  A phase is demonstrated on a real URL and signed off by you before it is
                  invoiced, and before the next one begins.
                </li>
                <li>
                  Full ownership of the source code and IP transfers to you on receipt of final
                  payment for the engagement. Until then you hold a license to use the delivered
                  work for review and evaluation, and we retain title.
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
      <Section tone="veil">
        <Container>
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow="Communication"
              title="A question gets an answer the same day"
              accent="the same day"
            />
            <div className="mt-8 flex flex-col gap-4 text-body-lg text-(--color-text-muted)">
              <p>
                The most common complaint about any outsourced team is not language or quality. It
                is that a question costs you a day. We are open{' '}
                <strong className="text-white">{SITE.hours.display}</strong>. Inside those hours we
                are live: calls, screen shares, decisions in real time, and a reply from the person
                doing the work rather than a ticket number.
              </p>
              <p>
                Outside them, urgent means urgent. You have a named person and their direct phone
                number from the first week, not a shared inbox and not a rota you cannot see.
                Everything else waits for the next working morning, which is what the word is
                supposed to mean.
              </p>
              <p>
                Weekly demo on a staging URL you can open yourself. Same day and time, every week,
                from week two. A written summary after each one: what shipped, what is next, what
                we need from you.
              </p>
              <p>
                We work in your tools. Slack, Teams, Jira, Linear, Notion, email, whatever your
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
