/**
 * Paid-traffic landing pages.
 *
 * One campaign, one page, one offer. Add a new entry here and the route
 * generates itself at /lp/[slug]/ — noindex, no nav, one form.
 *
 * BUDGET NOTE (blueprint §6.7): category cost per lead runs $501 for IT
 * services and $595 for software development. Meta for B2B tech runs roughly
 * $63–$100. That gap is the entire reason Meta is worth testing — but it only
 * holds if the traffic lands somewhere built to convert it, which is what
 * these pages are for.
 *
 * BARK NOTE: cap it at one Starter Pack. Non-response is explicitly excluded
 * from Bark's refund policy while being the most common seller complaint,
 * credits now expire in three months, and up to five professionals receive
 * every lead. Use it to practise sub-five-minute response, not as a channel.
 */

export type Campaign = {
  slug: string
  title: string
  description: string
  eyebrow: string
  headline: string
  headlineAccent?: string
  subhead: string
  bullets: string[]
  proof: string
  formHeading: string
  formSubhead: string
  /** 'quick' = 3 fields, highest volume. 'brief' = budget required, best quality. */
  formTier: 'quick' | 'brief'
}

export const CAMPAIGNS: Campaign[] = [
  {
    slug: 'ai-assistant',
    title: 'Custom AI Assistant for Your Business',
    description: 'A grounded AI assistant that answers from your own documents and cites the source.',
    eyebrow: 'For US & Canadian businesses',
    headline: 'An AI assistant that answers from your data — and shows its source',
    headlineAccent: 'shows its source',
    subhead:
      'Not a chatbot that invents your refund policy. A retrieval-grounded assistant trained on documents you approve, that cites every answer and hands off to a human when the question goes beyond what it can defend.',
    bullets: [
      'Answers built from your own documents, never from what a model half-remembers',
      'A source link on every response, so your team can audit it and your customer can verify it',
      'A refusal boundary you define — legal, medical and financial questions go to a person',
      'Live in four to eight weeks, with a fixed price agreed before we start',
    ],
    proof:
      'We built and run QuranRI, a source-grounded AI learning platform used by students and governed by published terms and a real refusal policy. It is live and public — open it and try to make it say something it should not.',
    formHeading: 'Get a fixed-price scope',
    formSubhead:
      'Three fields. We reply within one business day, and we will sign a mutual NDA first if you want one.',
    formTier: 'quick',
  },
  {
    slug: 'website',
    title: 'A Website That Actually Generates Calls',
    description: 'Fast, indexable websites for US businesses. Fixed price, four to six weeks.',
    eyebrow: 'For US & Canadian businesses',
    headline: 'A website that loads fast and gets answered',
    headlineAccent: 'gets answered',
    subhead:
      'Most agency sites are beautiful and silent. We build the other kind — under two seconds on a phone, structured so Google and AI search can both read it, with a form that reaches someone within minutes.',
    bullets: [
      'Built on Next.js — you get the repository, not a licence to a page builder',
      'Core Web Vitals treated as an acceptance criterion, not a report we email you afterwards',
      'If you are migrating, a redirect map where every old URL resolves in exactly one hop',
      'Fixed price, agreed before we start. Live in four to six weeks.',
    ],
    proof:
      'We migrated our own site off WordPress and documented every step, including a redirect chain the framework documentation said would not happen. Ask us for the before-and-after numbers — it is the same migration you would be buying.',
    formHeading: 'Get a fixed-price scope',
    formSubhead:
      'Three fields. We reply within one business day, and we will sign a mutual NDA first if you want one.',
    formTier: 'quick',
  },
  {
    slug: 'logo-design',
    title: 'Logo & Brand Kit — $299 Fixed',
    description: 'A logo and core brand identity delivered in one week, with full source files.',
    eyebrow: 'Small projects welcome',
    headline: 'A logo and identity you actually own, in one week',
    headlineAccent: 'actually own',
    subhead:
      'Brief on Monday, three directions by Thursday, two rounds of refinement, and every file you will ever be asked for — including the editable Figma. Fixed price, $299.',
    bullets: [
      'Primary mark plus the variations you will need: horizontal, stacked, icon, monochrome',
      'Colour, type and clear-space rules written down, so it stays consistent after we leave',
      'SVG and PNG at every size, plus the editable source files — no "we keep the working files"',
      'Font licences documented, so you know exactly what you can use commercially',
    ],
    proof:
      'We design and build the whole stack — identity, interface and the product underneath. A logo from us is drawn by people who will also have to implement it, which is why it works at 24 pixels as well as on a billboard.',
    formHeading: 'Start a logo project',
    formSubhead: 'Tell us about the business and your budget, and we will come back with a scope.',
    formTier: 'brief',
  },
  {
    slug: 'automation',
    title: 'AI Automation — Delete the Manual Steps',
    description: 'Workflow automation for small US businesses. Audit first, then build what pays back.',
    eyebrow: 'For US & Canadian businesses',
    headline: 'Delete the copy-and-paste between your tools',
    headlineAccent: 'copy-and-paste',
    subhead:
      'Every small business has one person whose real job is moving information between systems. We find that work, automate it, and hand you the documentation so you own it.',
    bullets: [
      'Half-day audit first — we tell you what is not worth automating as well as what is',
      'Built in n8n, self-hostable and open, so the workflows stay yours and cost does not scale with volume',
      'AI where judgment is needed, plain rules everywhere else — rules do not hallucinate or bill per token',
      'Measured before-and-after in hours per month. If it does not pay back, you should know early.',
    ],
    proof:
      'We build the automation layer inside our own products, not just for clients. The audit is the same one we run on ourselves, and it starts at a few thousand dollars rather than a platform subscription.',
    formHeading: 'Book the audit call',
    formSubhead: 'Twenty minutes. We will tell you on the call if there is nothing worth automating.',
    formTier: 'quick',
  },
]

export function getCampaign(slug: string): Campaign | undefined {
  return CAMPAIGNS.find((c) => c.slug === slug)
}
