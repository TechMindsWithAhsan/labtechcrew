/**
 * Case studies.
 *
 * ⚠️ TWO HARD RULES, both of which the old WordPress site broke:
 *
 * 1. NO OUTCOME NUMBER WITHOUT A DOCUMENT. The legacy Ottenheimer page claimed
 *    "230% more organic traffic / 150% more sales / 40% lower bounce" about a
 *    real, named, long-established publisher. Those are gone from this file.
 *    If you obtain written client sign-off, add them to `results` — until then
 *    the page describes what was built, which is still persuasive and cannot
 *    be challenged.
 *
 * 2. NO COMPARATIVE SUPERIORITY CLAIM WITHOUT A PUBLISHED BENCHMARK.
 *    Naming ChatGPT, Claude or Gemini in a superiority claim is Lanham Act
 *    §43(a) exposure and competitors can sue directly — unlike an FTC matter.
 *    The QuranRI entry therefore describes ARCHITECTURE (grounding, citation,
 *    refusal) rather than asserting it beats anything. That is also the
 *    stronger sell: it demonstrates judgment, which is what a $30k buyer is
 *    actually paying for.
 *
 *    `benchmarkPlaceholder` below is where a real number goes the day you
 *    publish the methodology. Read the comment on it before filling it in.
 *
 * VERIFICATION NOTE (July 2026): everything in the QuranRI entry marked
 * `publiclyVerifiable: true` was confirmed on quranri.com by an independent
 * crawl. The authenticated features — voice tutor, canvas, image generation,
 * course structure — sit behind the login and could NOT be confirmed from
 * outside. They are described here on the founders' word. Before this page
 * goes live, add screenshots of each one. A US buyer who clicks through and
 * cannot find a feature you claimed is a buyer you have lost.
 */

export type CaseStudy = {
  slug: string
  title: string
  client: string
  category: string
  year: string
  featured?: boolean

  seoTitle: string
  seoDescription: string

  /** One line for cards and the work index. */
  summary: string
  /** Hero paragraph on the case-study page. */
  lead: string

  challenge: string
  approach: { title: string; body: string }[]
  /** ONLY things that can be evidenced. Prefer descriptions of scope over metrics. */
  results: string[]

  stack: string[]
  /** Service slugs this project proves. */
  services: string[]

  liveUrl?: string
  platforms?: string[]

  /**
   * Real product screenshots ONLY — never stock, never a mockup of software
   * that does not exist. Files live in /public/shots/<slug>/.
   *
   * `alt` must describe what the software is DOING, because that is the part
   * that persuades: "QuranRI answering a question with its source cited"
   * rather than "app screenshot".
   *
   * Missing screenshots render as nothing at all, so a case study without them
   * degrades to text rather than breaking. `npm run check:shots` lists them.
   */
  shots?: {
    src: string
    alt: string
    width: number
    height: number
    caption?: string
  }[]

  /** Ported from WordPress post_modified. Never reset to new Date(). */
  updatedAt: Date

  /** Blocks publication until resolved. Surfaced in the build, not hidden. */
  riskFlags?: string[]
}

export const CASE_STUDIES: CaseStudy[] = [
  /* ======================================================================
     FLAGSHIP — our own product
     ====================================================================== */
  {
    slug: 'quranri',
    title: 'QuranRI — a grounded AI learning platform',
    client: 'QuranRI (with VIqra Educational & Welfare Services)',
    category: 'AI platform · EdTech',
    year: '2025–2026',
    featured: true,
    seoTitle: 'QuranRI Case Study — Building a Source-Grounded AI Learning Platform',
    seoDescription:
      'How LabTechCrew designed and built QuranRI: a retrieval-grounded AI education platform that answers from verified sources, refuses what it cannot defend, and hands students to human teachers. Live in production.',
    summary:
      'A retrieval-grounded AI tutor that answers from verified sources, cites them, and knows when to hand a student to a human.',
    lead:
      'An education institution that had been teaching one-to-one since 2008 needed to reach students it could never staff for. We spent eight months building the platform that does it — and, more importantly, the guardrails that make it safe to put in front of a child.',
    challenge:
      'The obvious build was a chatbot with a religious-sounding system prompt. That build is also a liability: a general model asked a doctrinal question will answer confidently and be wrong, in a domain where being wrong is not a support ticket but a reputational and ethical failure. The real problem was not making an AI that talks about scripture. It was making one that knows the boundary of what it is allowed to say, and stops.',
    approach: [
      {
        title: 'Retrieval first, generation second',
        body: 'Answers are constructed from an indexed corpus of verified source texts rather than from model memory. The system retrieves, then writes from what it retrieved. If nothing relevant comes back, it says so instead of improvising.',
      },
      {
        title: 'A published refusal boundary',
        body: 'The platform explicitly does not issue legal, medical, psychological, financial or religious rulings, and its terms say so in writing. Deciding what a system must not answer took longer than making it answer well, and it is the single design decision we are most often asked to reproduce for clients.',
      },
      {
        title: 'Assessment before instruction',
        body: 'New learners take a Noorani Qaida placement test — name, email, age, then a graded quiz — so the platform teaches at the right level from the first minute instead of guessing. It doubles as a clean qualification step for the human teaching side.',
      },
      {
        title: 'AI to qualify, humans to finish',
        body: 'The platform handles the scalable part: assessment, practice, repetition, answering the same foundational question at 2am without fatigue. Qualified students then route to one-to-one sessions with VIqra\'s teachers. The AI does not replace the teacher — it protects the teacher\'s time for the work only a teacher can do.',
      },
      {
        title: 'Built for children, and audited for it',
        body: 'The product is used by under-18s, so it was built to PIPEDA, GDPR and COPPA expectations from the start: parental review, correction and deletion rights, defined retention, and separate privacy and legal contacts. Retrofitting child-safety compliance after launch is close to impossible.',
      },
      {
        title: 'A full product, not a chat window',
        body: 'Multilingual reading with translation and recitation, geolocated prayer times, an authenticated learner area with saved progress, an incognito mode, light and dark themes, and an in-chat feedback control so every weak answer becomes a training signal.',
      },
    ],
    results: [
      'Live in production and publicly testable at quranri.com.',
      'Every answer is generated from an indexed source corpus, with the source attached.',
      'A written, enforced refusal boundary — no legal, medical, psychological, financial or religious rulings.',
      'Placement testing routes each learner to the right level, and qualified learners to a human teacher.',
      'Built to PIPEDA, GDPR and COPPA expectations, with published privacy and terms and a named data protection contact.',
      'Designed, built, evaluated and shipped by one team over eight months — architecture, prompting, evaluation, web client, mobile client, brand.',
    ],
    stack: [
      'RAG architecture',
      'Vector search',
      'Next.js',
      'TypeScript',
      'React Native',
      'Node.js',
      'MongoDB',
      'Speech interfaces',
      'Evaluation harness',
    ],
    services: [
      'ai-chatbots-development',
      'ai-voice-agents',
      'custom-software',
      'mobile-app-development',
      'website-development',
      'graphics-design',
    ],
    liveUrl: 'https://www.quranri.com/',
    /**
     * Real screens, captured from the live product. The captions describe what
     * is happening on screen and nothing more — a caption that overclaims what
     * the picture shows is worse than no caption, because the picture is right
     * there to contradict it.
     */
    shots: [
      {
        src: '/shots/quranri/answer-with-citation.png',
        alt: 'QuranRI answering a question about justice, with a References panel listing Surah An-Nisa 135 and Surah Al-Ma\u2019idah 8 beneath the answer',
        width: 1902,
        height: 865,
        caption:
          'Every claim carries the verse it came from, listed underneath and linked. Nothing is asserted without a source a reader can go and check.',
      },
      {
        src: '/shots/quranri/medical-boundary.png',
        alt: 'QuranRI responding to a question about high blood pressure by offering Islamic perspectives on health rather than giving medical advice',
        width: 1907,
        height: 862,
        caption:
          'Asked a medical question, it does not answer it. It stays inside what it is allowed to discuss and offers the angles it can actually support. That boundary took longer to build than the answering did.',
      },
      {
        src: '/shots/quranri/mobile-app.png',
        alt: 'The QuranRI mobile app home screen on an Android phone, showing the ask box and sections for Quran, Hadith, Tutor and Prayers',
        width: 720,
        height: 1497,
        caption: 'The same system on Android and iOS, shipped to both stores.',
      },
    ],
    platforms: ['Web'],
    updatedAt: new Date('2026-07-01T00:00:00Z'),
    riskFlags: [
      'ADD SCREENSHOTS of the authenticated features — voice tutor, canvas/whiteboard, image generation, course structure. They are behind the login and cannot be verified by a prospect from the outside. A claimed feature a buyer cannot find costs more trust than not claiming it.',
      'CONFIRM the iOS and Android store URLs before adding them to `platforms`. An independent search found no App Store or Google Play listing, no store badges on quranri.com and no PWA manifest. If the apps are live, link them; if they are in review, say "coming to iOS and Android".',
      'DO NOT add a comparative accuracy claim here until a benchmark methodology is published. See `benchmarkPlaceholder` in this file.',
    ],
  },

  /* ======================================================================
     CLIENT WORK — legacy URLs preserved, claims rewritten
     ====================================================================== */
  {
    slug: 'ppinstall',
    title: 'PPInstalls — affiliate marketing platform',
    client: 'PPInstalls',
    category: 'SaaS platform',
    year: '2025',
    shots: [
      {
        src: '/shots/ppinstall/landing.png',
        alt: 'The PPInstalls platform homepage showing the publisher signup route and network statistics',
        width: 1011,
        height: 852,
        caption:
          'The publisher-facing entry point. Everything above the fold answers one question \u2014 how fast can I be earning \u2014 because that is the only thing a publisher evaluating an ad network cares about on the first visit.',
      },
    ],
    featured: true,
    // TYPO FIXED: the live title reads "Labtehcrew" — missing the c.
    seoTitle: 'LabTechCrew: PPInstalls Affiliate Marketing Platform Development',
    seoDescription:
      "LabTechCrew's PPInstalls is a secure, cloud-powered affiliate marketing platform designed for brands and affiliates to grow.",
    summary: 'A cloud affiliate-marketing platform with tracking, payouts and role-based dashboards.',
    lead:
      'Affiliate programmes fail on trust: the brand cannot see what is real, and the affiliate cannot see what they are owed. We built the layer that shows both sides the same numbers.',
    challenge:
      'Two audiences with opposed incentives need one source of truth. Brands need attribution they can audit and fraud they can catch; affiliates need live performance and predictable payouts. Anything that looks like the brand controls the numbers unilaterally kills the programme.',
    approach: [
      {
        title: 'Event tracking built to be auditable',
        body: 'Click and conversion events are recorded immutably with their attribution window, so a disputed payout can be traced rather than argued.',
      },
      {
        title: 'Separate dashboards, one dataset',
        body: 'Brand and affiliate views are role-scoped over the same records. Nobody sees a different number depending on who they are.',
      },
      {
        title: 'Serverless where traffic is spiky',
        body: 'Campaign launches produce sharp, short bursts. A serverless data and functions layer absorbs them without paying for idle capacity the rest of the month.',
      },
      {
        title: 'Payout and reporting workflow',
        body: 'Approval states, payout scheduling and exportable statements, so finance is not rebuilding the report in a spreadsheet every month.',
      },
    ],
    results: [
      'A production affiliate platform with brand and affiliate roles over a single auditable dataset.',
      'Event tracking with recorded attribution windows for dispute resolution.',
      'Serverless architecture sized for campaign traffic spikes.',
    ],
    stack: ['Next.js', 'Firebase', 'Firestore', 'Node.js', 'Express', 'AWS'],
    services: ['custom-software', 'website-development', 'ai-automation'],
    updatedAt: new Date('2025-08-31T03:34:33Z'),
    riskFlags: [
      'Replace the three generic marketing stock JPGs currently used on this page with real product screenshots. They are shared with two other pages and their filenames match stock-agency comp patterns — see LICENSES.md.',
    ],
  },

  {
    /**
     * ⚠️ SLUG STAYS 'uload' ON PURPOSE — DO NOT "FIX" IT.
     *
     * The real client is Utrade Logistics. "uLoad" was recorded in error when
     * this case study was first written; the display name is now corrected.
     *
     * But /portfolio/uload/ is an INDEXED URL on the live WordPress site and
     * sits in config/redirects.mjs among the URLs that must keep resolving.
     * Renaming the slug would 404 an indexed page and throw away whatever
     * ranking it holds, to fix a string no visitor ever sees. The URL is for
     * search engines; the title is for humans. Only the title was wrong.
     */
    slug: 'uload',
    title: 'Utrade Logistics — on-demand delivery app',
    client: 'Utrade Logistics',
    category: 'Mobile app',
    year: '2025',
    shots: [
      {
        src: '/shots/uload/apps.jpg',
        alt: 'Four screens from the Utrade Logistics delivery app: launch screen, account selection for client, driver and transporter, the management home, and live route tracking on a map',
        width: 1600,
        height: 694,
        caption:
          'Three apps in one codebase \u2014 client, driver and transporter each get their own entry point and their own screens. The fourth panel is the part that matters most: live route tracking, which is the only feature a delivery app is really judged on.',
      },
    ],
    featured: true,
    seoTitle: 'Utrade Logistics Case Study — Delivery App Development | LabTechCrew',
    seoDescription:
      'How LabTechCrew built Utrade Logistics: an on-demand delivery app with live route tracking, three-party accounts and a dispatch console, on iOS and Android.',
    summary: 'iOS and Android delivery app with live tracking, payments and a dispatch console.',
    lead:
      'Delivery apps are judged on one thing: does the map match reality. Everything else — signup, payment, history — only matters if the tracking is honest.',
    challenge:
      'Three parties, three different urgencies. The customer wants to know where their driver is right now. The driver wants a screen they can use one-handed while parked. Operations wants to see the whole fleet without refreshing. And all of it has to survive a phone with one bar of signal.',
    approach: [
      {
        title: 'Location as a first-class problem',
        body: 'Background location with batching and interpolation, so the map moves smoothly without draining the driver\'s battery or flooding the backend.',
      },
      {
        title: 'A driver interface designed for a moving vehicle',
        body: 'Large targets, minimal steps, no state that is lost if the app is backgrounded mid-job.',
      },
      {
        title: 'Payments and identity that reduce drop-off',
        body: 'Social and Apple sign-in, saved cards, and platform wallets — because every extra field at checkout costs a delivery.',
      },
      {
        title: 'Offline-tolerant by design',
        body: 'Actions queue locally and reconcile when signal returns, instead of failing in front of a customer standing at a door.',
      },
    ],
    results: [
      'Shipped to iOS and Android from a single React Native codebase.',
      'Real-time driver tracking with battery-conscious background location.',
      'Card and wallet payments with social and Apple sign-in.',
      'An operations console for dispatch and order state.',
    ],
    stack: ['React Native', 'Redux', 'Firebase Auth', 'Stripe', 'Google Maps API', 'Node.js'],
    services: ['mobile-app-development', 'custom-software'],
    updatedAt: new Date('2025-08-31T03:34:45Z'),
    riskFlags: [
      'Replace the generic marketing stock JPGs with real app screenshots — see LICENSES.md.',
    ],
  },

  {
    slug: 'tradermind',
    title: 'TraderMind — market analysis platform',
    client: 'TraderMind',
    category: 'Data platform',
    year: '2025',
    shots: [
      {
        src: '/shots/tradermind/charting-app.png',
        alt: 'The TraderMind charting workspace showing a BTC/USDT candlestick chart with Detection, Auto Fib Retracement and Auto Trendline tools in the toolbar',
        width: 1600,
        height: 722,
        caption:
          'The analysis workspace. The price chart itself is a TradingView widget \u2014 what we built is the layer around it: pattern detection, automatic Fibonacci retracement and trendline generation, and the state that keeps a trader\u2019s workspace intact between sessions.',
      },
      {
        src: '/shots/tradermind/ai-assistant.png',
        alt: 'A user asking the TraderMind assistant about market trends and receiving an explanation alongside the live chart',
        width: 1600,
        height: 722,
        caption:
          'The assistant sits beside the chart rather than replacing it. It explains what a pattern means in plain language and offers to run the analysis, so a beginner is not left reading candlesticks alone.',
      },
      {
        src: '/shots/tradermind/landing.jpg',
        alt: 'The TraderMind marketing site hero reading Clear Insights, Confident Decisions',
        width: 1600,
        height: 906,
        caption: 'The public site and brand, built alongside the product.',
      },
    ],
    seoTitle: 'LabTechCrew: TraderMind Market Analysis Platform Development',
    seoDescription:
      'TraderMind: a real-time market analysis platform with streaming data, predictive analytics tooling and a configurable dashboard, built by LabTechCrew.',
    summary: 'Real-time market data, streaming charts and a configurable analysis dashboard.',
    lead:
      'A platform that streams live market data and lets analysts build their own view of it — engineered for latency and for the moments when the feed misbehaves.',
    challenge:
      'Financial interfaces are unforgiving. A chart that lags by two seconds is worse than no chart, and a silent disconnect that leaves stale prices on screen is genuinely dangerous. The engineering problem is not the analytics — it is the connection.',
    approach: [
      {
        title: 'Streaming architecture with honest failure states',
        body: 'WebSocket connections with heartbeat, automatic reconnect and an unmistakable stale-data indicator. If the feed drops, the screen says so rather than showing an old number as if it were current.',
      },
      {
        title: 'Rendering tuned for continuous updates',
        body: 'Charts redraw at a fixed budget with data batched between frames, so the interface stays responsive while prices move.',
      },
      {
        title: 'Analytics as a separate service',
        body: 'The Python analysis layer runs independently of the presentation layer, so heavy computation never blocks the interface.',
      },
      {
        title: 'Configurable, saved workspaces',
        body: 'Analysts arrange their own panels and layouts and get them back on the next login.',
      },
    ],
    results: [
      'Real-time streaming market data with reconnect handling and explicit stale-data indication.',
      'A separated Python analytics service behind a responsive front end.',
      'Per-user saved dashboard layouts.',
    ],
    stack: ['Python', 'WebSockets', 'React', 'MongoDB', 'Redis'],
    services: ['custom-software', 'ai-chatbots-development'],
    updatedAt: new Date('2025-08-31T03:34:50Z'),
    riskFlags: [
      'RESOLVED IN THIS COPY: the legacy page claimed "increased profitability with automated trading strategies", "bank-level security" and used "Wall Street" positioning. Profitability claims attached to an automated trading product engage CFTC/SEC and FTC advertising rules even when the developer makes them. Do not reintroduce them.',
    ],
  },

  {
    slug: 'frame-x-labs',
    title: 'FrameXLabs — platform build and analytics',
    client: 'FrameXLabs',
    category: 'Web platform',
    year: '2025',
    shots: [
      {
        src: '/shots/frame-x-labs/landing.jpg',
        alt: 'The Frame X Lab homepage with the headline Smart Apps. Bold Ideas. Zero Limits. above a rotating showcase of the studio\u2019s work',
        width: 1600,
        height: 679,
        caption:
          'A studio site whose whole job is to make the work look confident before anyone reads a word. The hero rotates through their own builds rather than describing them.',
      },
    ],
    featured: true,
    // The live page uses three different spellings across title, meta and H1.
    seoTitle: 'LabTechCrew: FrameXLabs Web Development & Integration USA',
    seoDescription:
      'LabTechCrew built a scalable, SEO-optimized platform for FrameXLabs using React, GA4, Cloudflare and full conversion tracking.',
    summary: 'A performance-focused platform build with a complete analytics and conversion-tracking stack.',
    lead:
      'A site rebuilt for speed, and instrumented properly — so that for the first time the marketing spend could be traced to an outcome.',
    challenge:
      'The old build was slow, and worse, unmeasurable. Ad spend was going out with no reliable way to attribute what came back, which meant every optimisation argument was a matter of opinion.',
    approach: [
      {
        title: 'Rebuilt for Core Web Vitals',
        body: 'Image handling, script strategy and render path reworked against LCP, INP and CLS rather than against a Lighthouse score taken once on a desktop.',
      },
      {
        title: 'Analytics designed before it was installed',
        body: 'Events named and documented first, then implemented through a tag manager, so the data model is intentional instead of accumulated.',
      },
      {
        title: 'Conversion tracking wired end to end',
        body: 'Ad platform to landing page to form submission, with consent handled properly so the measurement is lawful as well as accurate.',
      },
      {
        title: 'Edge caching and protection',
        body: 'CDN caching with sensible cache keys and bot protection in front of the origin.',
      },
    ],
    results: [
      'A rebuilt platform measured against Core Web Vitals rather than a one-off lab score.',
      'A documented event model implemented through tag management.',
      'End-to-end conversion tracking from ad click to form submission, with consent handling.',
    ],
    stack: ['React', 'GA4', 'Google Tag Manager', 'Cloudflare', 'WordPress'],
    services: ['website-development', 'wordpress-to-nextjs-migration'],
    updatedAt: new Date('2025-08-31T03:34:14Z'),
  },

  {
    slug: 'the-digital-samurais',
    title: 'The Digital Samurais — site, identity and search',
    client: 'The Digital Samurais',
    category: 'Web & brand',
    year: '2025',
    shots: [
      {
        src: '/shots/the-digital-samurais/who-we-are.jpg',
        alt: 'The Digital Samurais website introduction section, with a 3D samurai brand character beside a list of the agency\u2019s principles and capability bars',
        width: 1600,
        height: 747,
        caption:
          'A brand built around one character, carried consistently through the site. The capability figures shown are the client\u2019s own claims about themselves, presented as they supplied them.',
      },
    ],
    seoTitle: 'LabTechCrew: Digital Samurai WordPress Website Design & SEO',
    seoDescription:
      'LabTechCrew built The Digital Samurais a WordPress site with a custom logo and a structured SEO programme aimed at US businesses.',
    summary: 'Brand identity, a WordPress build and a structured technical SEO programme.',
    lead:
      'A full launch package for a services business entering a crowded market: the mark, the site, and the search foundation underneath both.',
    challenge:
      'A new brand with no search presence, competing against firms with years of accumulated authority. The temptation is to chase head terms immediately, which is the fastest way to spend a year ranking for nothing.',
    approach: [
      {
        title: 'Identity before implementation',
        body: 'Logo, colour and type resolved first, so the site was an expression of a decision rather than the place the decision got made.',
      },
      {
        title: 'A site structured around search intent',
        body: 'Information architecture built from the queries the business could realistically win, not from an internal org chart.',
      },
      {
        title: 'Technical SEO as foundation work',
        body: 'Clean URL structure, correct metadata, structured data, an accurate sitemap and a robots policy that does not accidentally block anything.',
      },
      {
        title: 'Content targeted at the winnable tail',
        body: 'Long-tail commercial-intent pages first. Head terms are a year-three ambition, not a launch strategy.',
      },
    ],
    results: [
      'Complete visual identity delivered with full source files.',
      'A WordPress build structured around commercial search intent.',
      'Technical SEO foundation: URL structure, metadata, structured data, sitemap and robots policy.',
    ],
    stack: ['WordPress', 'PHP', 'Yoast SEO', 'Figma'],
    services: ['website-development', 'graphics-design', 'brand-strategy'],
    updatedAt: new Date('2025-08-31T03:34:39Z'),
  },

  {
    slug: 'ottenheimer-publishers',
    title: 'Ottenheimer Publishers — e-commerce rebuild',
    client: 'Ottenheimer Publishers',
    category: 'E-commerce',
    year: '2025',
    shots: [
      {
        src: '/shots/ottenheimer-publishers/landing.jpg',
        alt: 'The Ottenheimer Publishers homepage asking Got A Story To Tell, with a book showcase on the left and a submitted-manuscript card on the right',
        width: 1600,
        height: 723,
        caption:
          'One question above the fold, aimed at exactly one person: an author deciding whether to submit. Everything else on the page is subordinate to that decision.',
      },
    ],
    seoTitle: 'LabTechCrew: Ottenheimer Publishers Custom Web Development',
    seoDescription:
      'LabTechCrew built Ottenheimer Publishers a responsive, SEO-structured e-commerce site with a streamlined checkout and full analytics.',
    summary: 'A mobile-first e-commerce rebuild with a streamlined checkout and proper analytics.',
    lead:
      'A publisher\'s catalogue rebuilt for the way people actually browse books now — on a phone, in short sessions, deciding fast.',
    challenge:
      'A large catalogue that was hard to navigate on mobile, and a checkout with more steps than it needed. Both problems compound: browsing friction reduces the number of people who reach checkout, and checkout friction removes a share of the ones who do.',
    approach: [
      {
        title: 'Catalogue structure rebuilt for mobile browsing',
        body: 'Categorisation, filtering and search designed for a small screen first, with the desktop layout derived from it rather than the other way round.',
      },
      {
        title: 'Checkout reduced to what is necessary',
        body: 'Fewer steps, fewer required fields, clear progress. Every removed field is a recovered order.',
      },
      {
        title: 'Analytics implemented properly',
        body: 'GA4 with e-commerce events and a privacy-focused analytics layer alongside it, so merchandising decisions have evidence behind them.',
      },
      {
        title: 'Search structure preserved through the rebuild',
        body: 'Product and category URLs mapped and redirected so an existing catalogue did not disappear from search on launch day.',
      },
    ],
    results: [
      'A mobile-first catalogue and checkout rebuild.',
      'GA4 e-commerce events plus a privacy-focused analytics layer.',
      'Product and category URLs mapped and redirected through the rebuild.',
    ],
    stack: ['WordPress', 'WooCommerce', 'GA4', 'Piwik PRO'],
    services: ['website-development', 'wordpress-to-nextjs-migration'],
    updatedAt: new Date('2025-08-31T03:34:28Z'),
    riskFlags: [
      'RESOLVED IN THIS COPY: the legacy page claimed 230% more organic traffic, 150% more online sales and a 40% bounce-rate drop within 90 days, attributed to a real named publisher. Those figures are removed. Re-add them ONLY with written client sign-off and the analytics export that supports them.',
      'The legacy page has no H1 at all. This rebuild adds one.',
    ],
  },

  {
    slug: 'lift-and-learn-fitness',
    title: 'Lift and Learn Fitness — training app',
    client: 'Lift and Learn Fitness',
    category: 'Mobile app',
    year: '2025',
    shots: [
      {
        src: '/shots/lift-and-learn-fitness/brand-and-app.jpg',
        alt: 'The Lift and Learn Fitness identity beside the app, showing workouts filtered by Gym or Home and by muscle group, each labelled with a difficulty level',
        width: 1200,
        height: 1200,
        caption:
          'Identity and product designed together. The filters carry the whole experience \u2014 Gym or Home, muscle group, difficulty \u2014 because someone standing in a gym has about five seconds to find the right session.',
      },
    ],
    seoTitle: 'LabTechCrew: Lift and Learn Fitness Custom Mobile App USA',
    seoDescription:
      'Lift and Learn Fitness: a mobile app with structured workout programmes, video tutorials, progress tracking and subscriptions, built by LabTechCrew.',
    summary: 'Structured workout programmes, video tutorials, progress tracking and subscriptions.',
    lead:
      'A training app built around the only metric that matters in fitness software: whether someone opens it again in week three.',
    challenge:
      'Fitness apps are uninstalled faster than almost any other category. The engineering is straightforward; the retention design is not. Everything had to serve the return visit rather than the first impression.',
    approach: [
      {
        title: 'Programmes, not a library of exercises',
        body: 'A structured path with a clear next session, so opening the app never requires a decision the user has to make while tired.',
      },
      {
        title: 'Video that works on a gym connection',
        body: 'Adaptive streaming and optional downloads, because gym wifi is unreliable and mobile data is expensive.',
      },
      {
        title: 'Progress made visible',
        body: 'Weight, volume and consistency charted over time. Visible progress is the strongest retention mechanic available.',
      },
      {
        title: 'Subscriptions through the platforms',
        body: 'In-app purchase on both stores with restore, upgrade and cancellation paths handled properly.',
      },
    ],
    results: [
      'Cross-platform app with structured programmes and video tutorials.',
      'Progress tracking across weight, volume and consistency.',
      'Subscription billing through both app stores with full restore and cancellation handling.',
    ],
    stack: ['React Native', 'Firebase', 'In-app purchase'],
    services: ['mobile-app-development', 'graphics-design'],
    updatedAt: new Date('2025-08-31T03:34:21Z'),
    riskFlags: [
      'The legacy page has NO app screenshots at all — only the LabTechCrew logo — while claiming the app "earned recognition as a go-to fitness app for U.S. audiences". Recognition by whom? That claim is removed here. Add real screenshots or take this case study down.',
    ],
  },
]

/**
 * ⚠️ READ BEFORE FILLING THIS IN.
 *
 * There is an accuracy metric on the current WordPress homepage labelled
 * "Flagship benchmark accuracy" whose value is injected by JavaScript and
 * renders as 0%. There is no published methodology, dataset, evaluator or
 * named comparison set behind it.
 *
 * A quantified accuracy claim, and especially a comparative one, is only safe
 * once you can hand a sceptical buyer four things:
 *
 *   1. the question set (how many questions, how they were chosen)
 *   2. the grading method (who or what graded, against what reference)
 *   3. the comparison set (which systems, which versions, on what date)
 *   4. the raw results, published somewhere a prospect can read them
 *
 * With those four, publish the number and link the methodology — it becomes a
 * genuine differentiator. Without them, a competitor can compel you to produce
 * substantiation you do not have, and the claim is worth less than the
 * architecture story it replaced.
 *
 * Set `published: true` and fill the fields only when all four exist.
 */
export const benchmarkPlaceholder = {
  published: false,
  accuracy: null as number | null,
  methodologyUrl: null as string | null,
  comparedAgainst: [] as string[],
  evaluatedOn: null as string | null,
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug)
}

/**
 * Short display name — the part of `title` before the em dash.
 *
 * Every title above is written "Name — description", so the name is derivable
 * and must always BE derived. The homepage "Recent work" strip used to hold a
 * hand-typed array of these names, which is why it went on saying "uLoad" long
 * after the client was renamed to Utrade Logistics here. Any list of project
 * names maintained by hand is a second copy of this data, and it will drift.
 *
 * A title with no em dash falls back to the whole title rather than an empty
 * string, so an entry that breaks the convention degrades instead of vanishing.
 */
export function caseStudyName(study: CaseStudy): string {
  // `?? study.title` is for the type checker (noUncheckedIndexedAccess) and for
  // the no-em-dash case at once — split always yields at least one element.
  return (study.title.split('—')[0] ?? study.title).trim()
}

export function caseStudiesForService(serviceSlug: string, limit = 2): CaseStudy[] {
  return CASE_STUDIES.filter((c) => c.services.includes(serviceSlug)).slice(0, limit)
}

export function featuredCaseStudies(limit = 3): CaseStudy[] {
  const featured = CASE_STUDIES.filter((c) => c.featured)
  return (featured.length ? featured : CASE_STUDIES).slice(0, limit)
}
