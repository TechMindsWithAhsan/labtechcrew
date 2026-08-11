/**
 * SINGLE SOURCE OF TRUTH for identity, NAP, navigation and service taxonomy.
 *
 * Blueprint §2.4: the live WordPress site currently shows a malformed Florida
 * address ("LnBonita Springs", no street number), a New York 929 phone number,
 * and a Texas LLC in formation. That incoherence is a NAP consistency failure
 * and it suppresses everything downstream.
 *
 * ⚠️ FILL IN EVERY `TODO` BELOW BEFORE LAUNCH. Nothing else should hardcode a
 * phone number, address or brand string — import from here.
 */

/**
 * Business hours, stated once and imported everywhere.
 *
 * ⚠️ Do not hardcode a time in a page. This string used to be written out by
 * hand in nine files, which is how the site ended up describing the same
 * working day three slightly different ways.
 */
const HOURS = {
  /** Just the times, for use inside a sentence. */
  range: '9:00 AM – 6:00 PM',
  days: 'Monday to Friday',
  /** The full statement. Use this unless the sentence needs the parts. */
  display: '9:00 AM – 6:00 PM, Monday to Friday',
} as const

export const SITE = {
  /** One casing. Forever. The live site currently uses three. */
  name: 'LabTechCrew',
  legalName: 'LabTechCrew LLC', // TODO confirm exact name on the TX filing
  jurisdiction: 'a Texas limited liability company',

  url: 'https://labtechcrew.com',
  locale: 'en-US',

  tagline: 'AI systems, custom software, and the products around them.',
  description:
    'LabTechCrew builds AI assistants that answer from your own verified data, plus the web, mobile and software products around them, for businesses in the US and Canada that want one accountable team, not five vendors.',

  contact: {
    email: 'info@labtechcrew.com',
    /**
     * ⚠️ KEEP THIS NUMBER. It matches the live, verified Google Business
     * Profile that currently carries 4 five-star reviews.
     *
     * Earlier guidance in this project said to switch to a Texas area code.
     * That was wrong once the Business Profile was confirmed to exist: a phone
     * mismatch between the site and the profile is a NAP inconsistency, and
     * editing the profile's phone or address triggers re-verification — which,
     * against a registered-agent or virtual address, can get it SUSPENDED.
     * Reviews cannot be rebuilt. An area code that does not match the state is
     * a cosmetic oddity almost no buyer notices.
     *
     * If you do want a Texas number later: 30+ days after the migration is
     * stable, add it to the Business Profile as an ADDITIONAL number first,
     * run both for a few weeks, then retire this one. One change at a time,
     * never during a migration.
     */
    phone: '+1-929-563-2844',
    phoneDisplay: '(929) 563-2844',
  },

  /** Business hours. See the HOURS block above before changing these. */
  hours: HOURS,

  /**
   * Booking calendar. EMPTY until you have an account — and that is fine.
   *
   * ⚠️ Leave this blank rather than guessing a URL. When it is empty, the
   * booking panel falls back to a real "call or email us" card. When you paste
   * a URL in, the same panel becomes an embedded calendar. Nothing else to
   * change, and no empty box either way.
   *
   * To turn it on: create a free Cal.com account, make a 20-minute event type,
   * and paste its public link here, e.g.
   *   bookingUrl: 'https://cal.com/labtechcrew/20min',
   * Calendly links work the same way.
   */
  bookingUrl: '',

  /**
   * WhatsApp, in international format WITHOUT +, spaces or dashes.
   * e.g. '19295632844' for +1 929 563 2844.
   *
   * ⚠️ EMPTY = the button does not render at all. No broken link, no dead icon.
   *
   * Worth turning on before you run Meta ads. Meta owns WhatsApp, click-to-chat
   * is the lowest-friction reply path they offer, and a thumb-tap into a chat
   * a buyer already has open beats a contact form on a phone by a wide margin.
   * Use a number someone actually watches during business hours — a WhatsApp
   * button that goes unanswered for six hours is worse than none.
   */
  whatsapp: '',

  /**
   * Operating address — Bonita Springs, Florida.
   *
   * This is the address already published about the company, so the site now
   * MATCHES it. Consistent-and-old beats accurate-and-mismatched: your Google
   * Business Profile carries four five-star reviews, and a name/address/phone
   * conflict between site and profile suppresses the whole entity.
   *
   * 🚚 THE TEXAS MOVE — read before you change anything here.
   * The firm is relocating to Texas. When that happens, change things in THIS
   * ORDER, one at a time, never together:
   *   1. Complete the move. Have the real Texas street address in hand.
   *   2. Update this block, deploy, and let the new address sit live for a
   *      couple of weeks so Google sees the site and profile still agree.
   *   3. ONLY THEN edit the Google Business Profile address.
   *   4. Then update LinkedIn, Facebook, Instagram and any directory listing.
   *
   * Editing the Business Profile address triggers re-verification, and against
   * a virtual or registered-agent address that can end in SUSPENSION. Reviews
   * cannot be rebuilt. Never do it in the same week as a site migration — if
   * rankings move you will have no idea which change caused it.
   *
   * Registered in Texas while operating from Florida is completely normal in
   * the meantime. The Texas location pages target Texas MARKETS and each one
   * states plainly that we have no office there. Keep that honesty.
   */
  address: {
    /** Empty on purpose. The confirmed operating address is the city/state/ZIP
     *  below — Bonita Springs, FL 34135 — with no street line. The malformed
     *  "Lnbonita Springs" string scraped from the old WordPress footer was
     *  never a real address and must not come back. Renderers treat '' as
     *  "no street line" and skip it. If a staffed street address is added
     *  later (e.g. after the Texas move), set it here and every renderer
     *  picks it up automatically. */
    street: '',
    city: 'Bonita Springs',
    region: 'FL',
    regionName: 'Florida',
    postalCode: '34135',
    country: 'US',
    /** Flip to true once the Texas move is done and step 2 above is complete. */
    movingToTexas: true,
  },

  /**
   * Markets we actually sell into. Used in copy and in schema.
   *
   * ⚠️ THIS IS THE ONLY GEOGRAPHY THE SITE STATES, and it describes who we
   * SELL TO, not where anyone sits. There is deliberately no field here for
   * the delivery team's location. If you ever add one, it must be accurate:
   * stating a location we do not have would be a misrepresentation, and a
   * marketing page asserting it is the worst possible document to face in a
   * payment dispute or a chargeback representment. Saying nothing is a
   * normal marketing choice. Saying something false is not.
   */
  markets: ['United States', 'Canada'],

  /** Blueprint §2.6 — four claims no competitor makes. Say them as numbers. */
  differentiators: [
    {
      title: `Open ${HOURS.range}, ${HOURS.days}`,
      body: `Our working day, on a calendar you can book — not "we're flexible". Calls, screen shares and decisions happen inside it, and anything urgent outside it has a named person and a phone number rather than a shared inbox.`,
    },
    {
      title: 'You never pay for work you have not seen',
      body: 'An advance to begin, then one payment per phase, each scoped and approved in writing before it starts, demonstrated before it is invoiced. Full code and IP ownership transfers on final payment. It is in the contract, not just on this page.',
    },
    {
      title: 'A US contract, under US law',
      body: 'Your agreement is with LabTechCrew LLC, a Texas limited liability company, governed by Texas law. One entity to hold accountable.',
    },
    {
      title: 'You pay us like any US vendor',
      body: 'ACH, domestic or international wire, card through Stripe, Square, PayPal, Wise or a company check. Invoiced in USD with a W-9 on file. Nothing for your finance team to escalate.',
    },
  ],

  social: {
    linkedin: 'https://www.linkedin.com/company/labtechcrew',
    instagram: 'https://www.instagram.com/labtechcrew.digital/',
    facebook: 'https://www.facebook.com/labtechcrew',
  },

  /**
   * TODO — decide this number as a team, then use it everywhere:
   * homepage anchor, /pricing/, the estimator, the budget dropdown.
   * Blueprint §6.6: publishing a floor costs ~40% of raw leads and buys
   * ~70% better lead quality. With Bark/Meta traffic that trade favors you.
   *
   * Set it to a real number and the pricing copy switches automatically.
   */
  /**
   * TWO FLOORS, ON PURPOSE.
   *
   * `starterFloorUsd` is the entry point: FIXED-SCOPE packages. Affordable
   * because the scope is bounded, not because the rate was cut.
   *
   * `customFloorUsd` is the floor for bespoke work, where scope is open and
   * every hour is real.
   *
   * ⚠️ THE DISTINCTION IS THE WHOLE BUSINESS MODEL. A $299 logo with three
   * concepts, two revision rounds and a five-day deadline is profitable. The
   * SAME $299 logo with "unlimited revisions until you are happy" is a loss
   * that gets worse the longer it runs, and the client who negotiated hardest
   * is the one who will use every round. Never sell a starter pack with an
   * open scope, and never let a starter pack quietly become custom work
   * without re-quoting it.
   *
   * ⚠️ CHANNEL RULE: starter packs are NOT for paid ads. A qualified click in
   * this category costs $50–150 and closes at 10–20%, so acquisition runs
   * $250–1,500 per client — more than the pack is worth. Sell packs through
   * organic search, the Google Business Profile, referrals and social. Point
   * paid budget at the custom tier, where the maths works.
   */
  starterFloorUsd: 299,
  customFloorUsd: 2500,
  /** @deprecated Use starterFloorUsd / customFloorUsd. Kept so old imports do not break. */
  pricingFloorUsd: 299,

  /** Our own product. The single strongest proof asset we have. */
  flagship: {
    name: 'QuranRI',
    url: 'https://www.quranri.com/',
    slug: 'quranri',
  },
} as const

export type Service = {
  slug: string
  name: string
  /** One line, outcome-first. Shown in nav, cards and the footer. */
  outcome: string
}

export type ServiceTier = {
  id: string
  label: string
  blurb: string
  services: Service[]
}

/**
 * Service taxonomy — blueprint §2.2. Full-service, but with a hierarchy.
 *
 * REMOVED July 2026: `digital-marketing` and `game-development`.
 * Both URLs are indexed in Google, so they are 301'd in config/redirects.mjs
 * rather than deleted. Never just remove an indexed URL.
 */
export const SERVICE_TIERS: ServiceTier[] = [
  {
    id: 'build',
    label: 'Build',
    blurb: 'The product itself: shipped, not prototyped.',
    services: [
      { slug: 'website-development', name: 'Web Development', outcome: 'Fast, indexable sites that turn traffic into calls.' },
      { slug: 'mobile-app-development', name: 'Mobile Apps', outcome: 'iOS and Android, one codebase, real store launches.' },
      { slug: 'custom-software', name: 'Custom Software & SaaS', outcome: 'Platforms built around how your business actually runs.' },
      { slug: 'wordpress-to-nextjs-migration', name: 'WordPress → Next.js', outcome: 'Rebuild without losing a single ranking.' },
    ],
  },
  {
    id: 'intelligence',
    label: 'Intelligence',
    blurb: 'Where the leverage is. Proven on our own product first.',
    services: [
      { slug: 'ai-chatbots-development', name: 'AI Agents & Assistants', outcome: 'Answers from your data, with the source attached.' },
      { slug: 'ai-voice-agents', name: 'AI Voice Agents', outcome: 'Systems that listen, answer and hand off cleanly.' },
      { slug: 'ai-automation', name: 'AI Automation', outcome: 'Workflows that delete the manual steps between tools.' },
    ],
  },
  {
    id: 'design',
    label: 'Design',
    blurb: 'How it looks, and why anyone trusts it.',
    services: [
      { slug: 'graphics-design', name: 'Design & Brand Identity', outcome: 'Logos, UI/UX and Figma systems people finish using.' },
      { slug: 'brand-strategy', name: 'Brand Strategy', outcome: 'Positioning before pixels. What you say, and to whom.' },
    ],
  },
]

export const ALL_SERVICE_SLUGS: string[] = SERVICE_TIERS.flatMap((t) =>
  t.services.map((s) => s.slug),
)

/**
 * ⚠️ DERIVED. Never write the service count into copy by hand.
 *
 * The homepage said "Ten services" for weeks after `digital-marketing` and
 * `game-development` were removed, while /services/ two clicks away said
 * "Nine". Both numbers now come from here, so removing a service updates every
 * sentence that counts them. Pair with `numberWord()` from lib/utils.
 */
export const SERVICE_COUNT = ALL_SERVICE_SLUGS.length
export const SERVICE_TIER_COUNT = SERVICE_TIERS.length

export function findService(slug: string): Service | undefined {
  return SERVICE_TIERS.flatMap((t) => t.services).find((s) => s.slug === slug)
}

export function tierForService(slug: string): ServiceTier | undefined {
  return SERVICE_TIERS.find((t) => t.services.some((s) => s.slug === slug))
}

export type NavItem = { href: string; label: string; mega?: boolean }

/** Primary nav. One CTA, right-aligned. Never "Contact us". Blueprint §3.2 + §6.2. */
export const PRIMARY_NAV: NavItem[] = [
  { href: '/services/', label: 'Services', mega: true },
  { href: '/work/', label: 'Work' },
  { href: '/how-we-work/', label: 'How We Work' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/about/', label: 'About' },
]

export const PRIMARY_CTA = { href: '/contact/', label: 'Get my project estimate' } as const
export const SECONDARY_CTA = { href: '/contact/#book', label: 'Book a 20-minute scoping call' } as const

/**
 * Budget bands — used by the qualified contact form AND the estimator.
 * A required budget field is the cheapest tire-kicker filter you have.
 *
 * The bottom band exists on purpose: small logo and landing-page jobs are the
 * near-term cash flow, and a $1k enquiry that arrives pre-qualified is worth
 * more than a $50k enquiry that never had a budget.
 */
/**
 * STARTER PACKS — fixed price, fixed scope, fixed timeline.
 *
 * Every pack MUST state what is included AND what is not. The exclusions are
 * not fine print; they are the reason the price can be this low, and saying
 * them out loud prevents the argument that otherwise arrives in week two.
 */
/**
 * Which fixed-price pack is the affordable doorway into each service.
 *
 * ⚠️ WHY THIS EXISTS: the services list on /pricing showed only custom ranges —
 * $5,000–$25,000, $15,000–$60,000, $20,000–$120,000 — set in large bold accent
 * type, so a five-figure number was the loudest thing on the page. A visitor on
 * a small budget reads the first one and leaves before ever reaching the $299
 * packs. Every service that HAS an affordable entry point now shows it right
 * beside the custom range, so the answer to "can I afford this?" arrives at the
 * same moment as the question.
 */
export const SERVICE_ENTRY_POINT: Record<string, { label: string; price: number }> = {
  'website-development': { label: 'One-Page Website', price: 499 },
  'mobile-app-development': { label: 'App MVP', price: 2499 },
  'ai-chatbots-development': { label: 'AI Assistant Starter', price: 1999 },
  'graphics-design': { label: 'Logo & Brand Kit', price: 299 },
  'wordpress-to-nextjs-migration': { label: 'Business Website', price: 899 },
}

export const STARTER_PACKS = [
  {
    name: 'Logo & Brand Kit',
    price: 299,
    timeline: '5 working days',
    forWho: 'A new business that needs to look real before it can sell anything.',
    includes: [
      '3 original logo concepts, 2 revision rounds on your chosen one',
      'Color palette, typography and usage rules in a one-page guide',
      'Files for web, print and social: SVG, PNG, PDF',
      'Full ownership transferred to you in writing on final payment',
    ],
    excludes: 'Naming, packaging design, or a full brand strategy engagement.',
  },
  {
    name: 'One-Page Website',
    price: 499,
    timeline: '7 working days',
    forWho: 'A service business that needs to be findable and reachable this month.',
    includes: [
      'Single scrolling page, written and built around one action',
      'Contact form delivered to your inbox, and a WhatsApp button',
      'Mobile-first, fast, and indexable by Google from day one',
      'Basic on-page SEO and a Google Business Profile check',
    ],
    excludes: 'Multi-page structure, blog, e-commerce, or custom illustration.',
  },
  {
    name: 'Business Website',
    price: 899,
    timeline: '2–3 weeks',
    forWho: 'An established business whose current site is costing it enquiries.',
    includes: [
      'Up to 6 pages, written for search and for buyers, not filler text',
      'Enquiry form with email notification, plus analytics',
      'A CMS so you can edit your own text without calling us',
      '30 days of post-launch fixes at no charge',
    ],
    excludes: 'Custom web applications, logins, payments or integrations.',
  },
  {
    name: 'Online Store Starter',
    price: 1499,
    timeline: '3–4 weeks',
    forWho: 'A seller moving off Instagram DMs and into an actual checkout.',
    includes: [
      'Storefront with up to 50 products loaded and categorized',
      'Payments, shipping rules and order notifications configured',
      'Customer accounts, cart recovery and order tracking',
      'A one-hour handover session so your team can run it',
    ],
    excludes: 'Marketplace features, subscriptions, or ERP integration.',
  },
  {
    name: 'AI Assistant Starter',
    price: 1999,
    timeline: '3–4 weeks',
    forWho: 'A business answering the same twenty questions every single day.',
    includes: [
      'An assistant grounded on YOUR documents, that cites its sources',
      'A published refusal boundary — it says "I do not know" instead of inventing',
      'Website widget plus WhatsApp, with conversation logs',
      'One retraining round after you see real usage',
    ],
    excludes: 'Multi-language deployment, voice, or CRM write-back.',
  },
  {
    name: 'Mobile App MVP',
    price: 2499,
    timeline: '5–7 weeks',
    forWho: 'A founder who needs something real in users\u2019 hands to test the idea.',
    includes: [
      'One core flow, built properly, for Android and iOS',
      'Accounts, a working backend, and push notifications',
      'Store submission handled for both platforms',
      'Source code in your repository from the first commit',
    ],
    excludes: 'Payments, chat, maps or offline sync. Those are custom scope.',
  },
] as const

export const BUDGET_BANDS = [
  { value: 'under-2.5k', label: 'Under $2,500 (a Starter Pack)' },
  { value: '2.5-5k', label: '$2,500 – $5,000' },
  { value: '5-15k', label: '$5,000 – $15,000' },
  { value: '15-50k', label: '$15,000 – $50,000' },
  { value: '50-150k', label: '$50,000 – $150,000' },
  { value: '150k+', label: '$150,000+' },
] as const

export const TIMELINES = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '1-3mo', label: 'In 1–3 months' },
  { value: '3-6mo', label: 'In 3–6 months' },
  { value: 'exploring', label: 'Just exploring' },
] as const

/**
 * The team. Blueprint §2.6 — naming and photographing real people, with real
 * LinkedIn links, is the cheapest and strongest trust asset available, and
 * almost no comparable agency does it.
 *
 * ⚠️ Only real people. The live WordPress site shows three headshots named
 * Team-4.jpg / Team-5.jpg / Team-6.jpg presented as named staff including a
 * "Founder, CEO" — that filename pattern is a theme demo import.
 */
/**
 * TEAM — intentionally EMPTY. Do not repopulate casually.
 *
 * Named individuals were removed from this site on purpose. Three reasons,
 * and all three still apply:
 *
 *  1. CONSENT AND EXPOSURE. Publishing a real person's name, face and employer
 *     on a public marketing site is a decision about THEM, not about you. One
 *     prior entry was a full-time bank employee, where being listed as staff
 *     of another company could have breached his employment terms. Never add
 *     anyone without a written yes.
 *
 *  2. IT ANSWERED THE WRONG QUESTION. A buyer cannot verify a photograph. The
 *     real question behind "who are you?" is "what happens to my money, my
 *     code and my timeline if this goes wrong?" The About page now answers
 *     that with enforceable commitments instead — see COMMITMENTS there.
 *
 *  3. IT ANSWERED A QUESTION NOBODY ASKED IN THE END. The buyer's real
 *     concern is accountability, and the site answers that with the
 *     contracting entity, the governing law, the phone number and the
 *     enforceable commitments on the About page. Optics are a weaker
 *     argument than terms.
 *
 * IF YOU ADD PEOPLE BACK: real name, real role, real photograph, real LinkedIn
 * whose headline matches the role, and written consent on file. Add them
 * ALONGSIDE the commitments, never instead of them. Do not attach a location
 * to anyone unless it is that person's real one — an invented location on a
 * team card is the same misrepresentation as an invented one anywhere else.
 */
export const TEAM = [] as const

/**
 * ⚠️ FOUNDER COUNT — AN UNVERIFIED HARDCODED CLAIM. Read before changing it.
 *
 * The site says "four founders" in FOUR places. Nothing verifies the number:
 * `TEAM` above is deliberately empty, so there is no data to derive it from and
 * no build step that would catch it going stale. It is not derived on purpose —
 * deriving it from an empty array would print "zero founders" — so it has to be
 * maintained by hand, and hand-maintained numbers are exactly what rotted the
 * service count ("Ten services" for weeks after two were removed).
 *
 * ALL FOUR MUST CHANGE TOGETHER:
 *   1. app/about/page.tsx    — metadata description, "a four-founder software
 *                              team". This one is the Google snippet.
 *   2. app/about/page.tsx    — FAQ, "How big is the team?"
 *   3. app/about/page.tsx    — the h1, "Four founders who built the thing"
 *   4. app/services/page.tsx — FAQ, "Can one team really cover all of this?"
 *
 * (The comment block at the top of app/about/page.tsx also says "four real
 * people". Update that too, but it is a note, not a published claim.)
 *
 * This is a factual claim about the company under blueprint §10.3, on a page
 * whose whole argument is that everything on it can be checked. Confirm it is
 * still accurate before launch.
 *
 * There is deliberately no constant here to import. A `FOUNDER_COUNT` export
 * would look derived and be trusted like the service count, when it would in
 * fact be the same unverified number with an import statement in front of it.
 */
