/**
 * Service page content.
 *
 * ⚠️ THE `seoTitle` / `seoDescription` VALUES MARKED **KEEP** ARE THE LIVE,
 * INDEXED STRINGS FROM THE WORDPRESS SITE (captured July 2026). Blueprint §8.3.
 * Do not "improve" them until Search Console confirms the migration has
 * recovered — otherwise you cannot tell a metadata regression from a normal
 * migration dip. Only the brand casing has been corrected.
 *
 * CLAIMS RULE (blueprint §10.3): every sentence here has to survive six
 * questions — is it a number I can document? does it name a client I have
 * written permission from? is it a superlative with a named third party and a
 * date? is it a photo of a real consenting employee? is it someone else's mark?
 * is it a promise we can keep every single time? If not, it does not ship.
 */

export type ServiceContent = {
  slug: string
  name: string
  tier: 'build' | 'intelligence' | 'design'

  seoTitle: string
  seoDescription: string
  /** true = new page, no legacy metadata to preserve */
  isNew?: boolean

  eyebrow: string
  h1: string
  /** A substring of h1 rendered in coral. Case-sensitive. One word or phrase. */
  h1Accent?: string
  lead: string

  /** Three situations, written as the buyer would describe them. Not industries. */
  forWho: string[]

  /** What they actually receive. Nouns, not adjectives. */
  included: { title: string; body: string }[]

  /** Nominative use only — never implies partnership or certification. */
  stack: string[]

  priceLabel: string
  priceNote: string

  /** Case-study slugs from lib/data/work.ts */
  proof: string[]

  faqs: { q: string; a: string }[]
}

export const SERVICES: ServiceContent[] = [
  /* ======================================================================
     BUILD
     ====================================================================== */
  {
    slug: 'website-development',
    name: 'Web Development',
    tier: 'build',
    // KEEP — only brand casing corrected.
    seoTitle: 'LabTechCrew: Custom Websites & E-Commerce Web Development',
    seoDescription:
      'LabTechCrew builds fast, secure, SEO-optimized websites, e-commerce, WordPress, and web apps in the USA.',
    eyebrow: 'Web development',
    h1: 'Websites that load fast, rank, and get answered',
    h1Accent: 'get answered',
    lead: 'Most agency sites are beautiful and silent. We build the other kind: pages that load in under two seconds on a phone, survive a Google migration without losing a ranking, and put a real person on the other end of the form.',
    forWho: [
      'Your current site is slow on mobile and you can feel the leads leaking.',
      'You are on WordPress with fourteen plugins and you are afraid to touch it.',
      'You get traffic but almost nobody fills the form, and nobody can tell you why.',
    ],
    included: [
      {
        title: 'A build on Next.js and TypeScript',
        body: 'Server-rendered, statically generated, deployed to a CDN. Not a page builder with a theme bolted on. You get the repository, not a license.',
      },
      {
        title: 'Core Web Vitals as an acceptance criterion',
        body: 'We do not hand over until LCP, INP and CLS pass on mobile in the lab. Google measured a 21.6% improvement in lead-form completion per 0.1s of LCP gained. Speed is a revenue line, not a vanity score.',
      },
      {
        title: 'A conversion path, not just pages',
        body: 'One primary action on every page, a form with a scheduling step behind it, and lead notifications that reach a phone within seconds.',
      },
      {
        title: 'Search kept intact',
        body: 'A one-hop redirect map, preserved titles and descriptions, honest sitemap dates, and Search Console monitored for the first six weeks after launch.',
      },
      {
        title: 'E-commerce when you need it',
        body: 'Shopify, headless Shopify, or a custom checkout, chosen for your margin and volume, not for what we prefer to build.',
      },
      {
        title: 'Analytics you will actually read',
        body: 'GA4, consent handled properly, and a short monthly note explaining what changed and what we would do next.',
      },
    ],
    stack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'MongoDB', 'Shopify', 'WordPress', 'Vercel'],
    priceLabel: '$5,000 – $25,000',
    priceNote: 'Custom sites start around $5k. For a one-page site ($499) or a six-page business site ($899), the fixed-price Starter Packs are the better buy.',
    proof: ['quranri', 'frame-x-labs', 'the-digital-samurais'],
    faqs: [
      {
        q: 'Will I lose my Google rankings?',
        a: 'Not if the migration is done properly. Before we touch anything we export sixteen months of Search Console data and crawl every live URL, then build a redirect map where each old address resolves in exactly one hop. Expect a 10–30% dip in the first week (that is normal even on a clean migration) and a return to baseline by week four to six. We monitor it and tell you either way.',
      },
      {
        q: 'Can I edit the site myself afterwards?',
        a: 'Yes. We wire content to a CMS or a simple admin area so your team edits text, images, posts and case studies without a developer. Structural changes still need code, and that is deliberate: it is what stops a site drifting back into a slow mess.',
      },
      {
        q: 'Why not just use WordPress?',
        a: 'Sometimes WordPress is the right answer, and we will tell you when it is. It stops being the right answer when plugin count is dictating your page speed, when you need a real application behind the marketing pages, or when you want the site to be readable by AI search, which does not execute JavaScript, so a plugin-rendered page can be invisible to it.',
      },
      {
        q: 'How long does it take?',
        a: 'A focused marketing site is three to six weeks from signed scope to live. Larger builds run six to twelve. You see it on a staging URL every week from week two, so nothing arrives as a surprise.',
      },
    ],
  },

  {
    slug: 'mobile-app-development',
    name: 'Mobile Apps',
    tier: 'build',
    // KEEP
    seoTitle: 'LabTechCrew: Mobile App iOS & Android Development USA',
    seoDescription:
      'Expert mobile app development in the USA. LabTechCrew builds custom iOS, Android & cross-platform apps for growth. Contact us today!',
    eyebrow: 'Mobile apps',
    h1: 'iOS and Android, from one codebase to the store',
    h1Accent: 'to the store',
    lead: 'An app that never gets through review is not an app. We build cross-platform products in React Native, ship them through App Store and Play review, and stay on for the version after launch, which is the version that actually decides whether people keep it.',
    forWho: [
      'Your customers keep asking whether there is an app, and there is not.',
      'You have a working web product and the mobile experience is holding it back.',
      'You had an app built, the team disappeared, and nobody can update it.',
    ],
    included: [
      {
        title: 'One codebase, both platforms',
        body: 'React Native with TypeScript. Native modules where a platform genuinely needs them (camera, background location, secure storage) and shared code everywhere else.',
      },
      {
        title: 'Authentication and payments that hold up',
        body: 'Email, social and Apple sign-in, secure token storage, and in-app purchase or Stripe depending on what Apple will actually allow for your category.',
      },
      {
        title: 'Store submission handled',
        body: 'Listing copy, screenshots, privacy nutrition labels, data-safety declarations and the review back-and-forth. Rejections are normal; the difference is whether someone knows how to answer them.',
      },
      {
        title: 'Offline and low-bandwidth behavior',
        body: 'Real users are on a subway with one bar. Local caching, queued writes and honest empty states are part of the build, not a later ticket.',
      },
      {
        title: 'Crash reporting and analytics from day one',
        body: 'You see what broke and where people dropped off, in a dashboard we set up and walk you through.',
      },
      {
        title: 'A post-launch window',
        body: 'Thirty days of fixes included after store approval. The first real-user week always finds something.',
      },
    ],
    stack: ['React Native', 'TypeScript', 'Expo', 'Redux', 'Firebase', 'Stripe', 'App Store', 'Google Play'],
    priceLabel: '$15,000 – $60,000',
    priceNote: 'Custom apps start around $15k. To validate an idea first, the $2,499 App MVP Starter Pack ships one core flow to both stores.',
    proof: ['uload', 'lift-and-learn-fitness', 'quranri'],
    faqs: [
      {
        q: 'React Native or fully native?',
        a: 'React Native for the large majority of business apps: one team, one codebase, and roughly the same result for the user. Fully native earns its cost when you are doing heavy real-time graphics, deep hardware work, or something the platform vendors gate. We will say which one you need before you pay us anything.',
      },
      {
        q: 'Who owns the app listings?',
        a: 'You do. The App Store Connect and Google Play accounts are created under your business, not ours, so the listing, the reviews and the users sit on your account throughout. We work inside them as your developer. Ownership of the app source code itself transfers to you on final payment for the engagement. The agencies to watch are the ones that register the developer account in their own name, because that is the part you cannot buy back.',
      },
      {
        q: 'What if Apple rejects it?',
        a: 'It happens, and it is usually about metadata, permissions copy or a payment rule rather than the code. Handling review is part of the engagement: we respond, adjust and resubmit until it is through.',
      },
    ],
  },

  {
    slug: 'custom-software',
    name: 'Custom Software & SaaS',
    tier: 'build',
    isNew: true,
    seoTitle: 'Custom Software & SaaS Development for US Business',
    seoDescription:
      'Custom software, SaaS platforms, dashboards and internal tools built around how your business actually runs. Fixed-scope projects or a dedicated team, contracted through a Texas LLC.',
    eyebrow: 'Custom software',
    h1: 'The system your business already runs on, finally built',
    h1Accent: 'finally built',
    lead: 'Most companies are running on a spreadsheet, three SaaS tools and one person who remembers how it all fits together. We replace that with software, usually smaller and cheaper than people expect, because we build the part that hurts first.',
    forWho: [
      'A spreadsheet is doing a job that a database should be doing.',
      'You pay for four tools that almost talk to each other, and a person who copies between them.',
      'You want to sell your process as a product, but it only exists in someone\'s head.',
    ],
    included: [
      {
        title: 'A scoping phase that produces a document, not a mood',
        body: 'We map the workflow, name the entities, and write down what the software must do and, as importantly, what it will not do. You own that document whether or not you build with us.',
      },
      {
        title: 'A working slice in weeks, not a big-bang launch',
        body: 'We build the single most painful part first and put it in real hands. Everything after that is informed by use instead of by guessing.',
      },
      {
        title: 'Roles, permissions and an audit trail',
        body: 'Who can see what, who changed what, and when. This is what separates internal software from a prototype, and it is the first thing an enterprise buyer asks about.',
      },
      {
        title: 'Integrations with what you already pay for',
        body: 'Stripe, QuickBooks, HubSpot, Slack, Google Workspace, your existing database. The goal is fewer tabs, not another one.',
      },
      {
        title: 'Multi-tenant architecture if you plan to sell it',
        body: 'Tenant isolation, billing, plan limits and onboarding, designed in from the start rather than retrofitted after your third customer.',
      },
      {
        title: 'Documentation and a handover',
        body: 'Architecture notes, environment setup and a recorded walkthrough, so a future developer is not starting from zero.',
      },
    ],
    stack: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'PostgreSQL', 'Prisma', 'Stripe', 'AWS', 'Docker'],
    priceLabel: '$20,000 – $120,000',
    priceNote: 'A first working slice usually lands between $20k and $40k. Full platforms with billing and multi-tenancy run higher.',
    proof: ['ppinstall', 'tradermind', 'quranri'],
    faqs: [
      {
        q: 'Can you work with our existing system?',
        a: 'Usually yes. We start with a short technical review of what exists, then either build alongside it through an API or strangle it out piece by piece. Full rewrites are the last option, not the first. They are where most software projects die.',
      },
      {
        q: 'What happens if we want to bring it in-house later?',
        a: 'Good. That is a healthy outcome and we build for it. You hold the repository, the infrastructure accounts and the documentation throughout, so onboarding your own engineer is a week, not a rescue mission.',
      },
      {
        q: 'Do you do fixed price or hourly?',
        a: 'Fixed price per phase. We scope a phase, price it, and you approve it before it starts. That keeps the incentive on shipping rather than on billing hours, and it means you can stop after any phase without a fight.',
      },
    ],
  },

  {
    slug: 'wordpress-to-nextjs-migration',
    name: 'WordPress → Next.js Migration',
    tier: 'build',
    isNew: true,
    seoTitle: 'WordPress to Next.js Migration Service: Keep Your Rankings',
    seoDescription:
      'Migrate WordPress to Next.js without losing search rankings. Redirect mapping, metadata preservation, Core Web Vitals. Here is exactly how we did our own site.',
    eyebrow: 'Migration',
    h1: 'Leave WordPress without losing your rankings',
    h1Accent: 'without losing your rankings',
    lead: 'We migrated our own site off WordPress and Elementor. We know precisely where it goes wrong, because we documented every step of ours: the redirect chain we caught with curl that the documentation told us would not exist, the metadata we froze on launch day, the traffic dip we expected and briefed everyone about in advance.',
    forWho: [
      'Your WordPress site is slow, and every plugin you remove breaks something.',
      'You want a modern stack but you cannot afford to lose the search traffic you have.',
      'Someone quoted you a rebuild and never mentioned redirects.',
    ],
    included: [
      {
        title: 'A full inventory before anything is touched',
        body: 'Sixteen months of Search Console data by page, a complete crawl of the live site, your Yoast titles and descriptions pulled from the database, and your real modified dates. That union is the redirect map. A CMS export alone always misses URLs Google indexed and you forgot.',
      },
      {
        title: 'A one-hop redirect map, tested with curl',
        body: 'Every legacy URL resolves in exactly one hop to a 200. We verify it on staging in list mode before DNS moves, not after. Chains are the single most common post-migration audit finding.',
      },
      {
        title: 'Metadata frozen on launch day',
        body: 'Your existing titles and descriptions ship unchanged, even the ones we would like to rewrite. Improve them after Search Console confirms recovery. Otherwise you cannot tell a metadata mistake from a normal migration dip.',
      },
      {
        title: 'WordPress cruft handled',
        body: 'Date permalinks, category and tag archives, author pages, feeds, attachment pages, `?p=` links, `wp-admin` and the default hello-world post nobody remembers publishing.',
      },
      {
        title: 'Structured data rebuilt, not lost',
        body: 'Organization, WebSite, Article and breadcrumbs. Not FAQPage (Google dropped FAQ rich results on 7 May 2026) and never a self-serving star rating, which Google ignores by policy.',
      },
      {
        title: 'Six weeks of monitoring after launch',
        body: 'Weekly Search Console review with a plain-English note. Expect a dip in week one. The failure signal is not the dip: it is no recovery trend by week four.',
      },
    ],
    stack: ['Next.js', 'TypeScript', 'Screaming Frog', 'Google Search Console', 'Vercel', 'Cloudflare'],
    priceLabel: '$6,000 – $30,000',
    priceNote: 'Driven by page count and how much of the content needs rewriting rather than porting.',
    proof: ['the-digital-samurais', 'frame-x-labs'],
    faqs: [
      {
        q: 'How much traffic will I lose?',
        a: 'Plan for a 10–30% dip in the first week and a return to baseline by week four to six. That range holds on clean migrations. Image search recovers more slowly than web search and there is no published figure for how much slower. We tell you that up front rather than after.',
      },
      {
        q: 'Do I keep my URLs?',
        a: 'Wherever possible, yes, including the trailing slashes. Changing a URL for aesthetics costs equity for nothing. We only change an address when the old one is genuinely broken or duplicated, and then it gets a 301 and stays redirected permanently.',
      },
      {
        q: 'Can you prove you can do this?',
        a: 'We did it to ourselves and wrote down the numbers. Ask us for the before-and-after Core Web Vitals and the Search Console recovery curve for labtechcrew.com: it is the same migration you are buying.',
      },
    ],
  },

  /* ======================================================================
     INTELLIGENCE
     ====================================================================== */
  {
    slug: 'ai-chatbots-development',
    name: 'AI Agents & Assistants',
    tier: 'intelligence',
    // KEEP — the best-aligned service title on the live site.
    seoTitle: 'LabTechCrew: AI Services in USA - Data Science & Chatbot Solutions',
    seoDescription:
      'LabTechCrew offers AI and Data Science development services in the USA, including ML, NLP, DL, and chatbot solutions for business growth.',
    eyebrow: 'AI agents & assistants',
    h1: 'An assistant that answers from your data, and shows its source',
    h1Accent: 'shows its source',
    lead: 'A general chatbot bolted onto your website will confidently invent your refund policy. We build retrieval-grounded assistants that answer only from documents you approve, attach the source to every answer, and say "I don\'t know, here is a human" when the question is outside what they can defend.',
    forWho: [
      'Your team answers the same forty questions every week from documents nobody reads.',
      'You tried an off-the-shelf chatbot and it made something up in front of a customer.',
      'You have real expertise sitting in PDFs, and no way to make it available at 2am.',
    ],
    included: [
      {
        title: 'A retrieval layer over your own content',
        body: 'Your documents, policies, manuals and catalog: chunked, embedded and indexed. The model answers from what you gave it, not from what it half-remembers from the internet.',
      },
      {
        title: 'Citations on every answer',
        body: 'Each response links back to the passage it came from. Your team can audit it, and your customer can verify it. This is the single feature that turns a demo into something you can put in front of a client.',
      },
      {
        title: 'Refusal behavior you define',
        body: 'The most important engineering in this work is deciding what the system must not answer. Legal, medical, financial or safety-critical questions get a defined handoff instead of a confident guess. We built exactly this into our own product.',
      },
      {
        title: 'An evaluation set, not a vibe check',
        body: 'We write a test set of real questions with expected sources, and score changes against it. Without one you are shipping prompt edits on feel, and every "improvement" silently breaks something else.',
      },
      {
        title: 'Handoff to a human, cleanly',
        body: 'Conversation history, the customer\'s question and the sources it looked at, handed to your inbox, Slack or CRM. Nobody has to ask "so what did you already try?"',
      },
      {
        title: 'Cost and latency you can live with',
        body: 'Model choice, caching and prompt design tuned to your traffic. We show you the per-conversation cost before you commit to a plan.',
      },
    ],
    stack: ['RAG architecture', 'Vector search', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Evaluation harness'],
    priceLabel: '$12,000 – $60,000',
    priceNote: 'Custom assistants start around $12k. For a single document set on your site and WhatsApp, the $1,999 AI Assistant Starter Pack is the entry point.',
    proof: ['quranri', 'tradermind'],
    faqs: [
      {
        q: 'How is this different from just using ChatGPT?',
        a: 'A general model is trained on the whole internet and has no idea which of your policies is current. A retrieval-grounded assistant only reads the documents you gave it, attaches the source to what it says, and can be made to refuse rather than guess. The value is not a smarter model; it is a narrower one that you can audit.',
      },
      {
        q: 'Will it make things up?',
        a: 'Grounding and citations reduce it substantially; nothing removes it entirely, and anyone who tells you otherwise is selling. That is why we build refusal paths, keep a human handoff one click away, and put an accuracy disclaimer in the interface. Our own product does all three.',
      },
      {
        q: 'Do you use our data to train a model?',
        a: 'No. Your content is stored in your own index and used to answer your own questions. Training arrangements, retention and deletion are written into the contract, and we will sign a data processing agreement.',
      },
      {
        q: 'What does it cost to run each month?',
        a: 'Hosting, vector storage and model usage. For most business volumes that lands in the low hundreds of dollars a month. We model it against your expected traffic during scoping so there is no surprise on the first invoice.',
      },
    ],
  },

  {
    slug: 'ai-voice-agents',
    name: 'AI Voice Agents',
    tier: 'intelligence',
    isNew: true,
    seoTitle: 'AI Voice Agent Development: Answer Calls and Qualify Leads',
    seoDescription:
      'Custom AI voice agents that answer, qualify and hand off, grounded in your own data, with a defined escalation path to a human. Built and supported by a US-contracted team.',
    eyebrow: 'AI voice agents',
    h1: 'A voice that answers at 2am and knows when to stop talking',
    h1Accent: 'knows when to stop talking',
    lead: 'Voice is where AI either earns trust or destroys it in ten seconds. We build agents that speak from your approved content, capture what matters, and hand a live caller to a person the moment the conversation leaves their competence.',
    forWho: [
      'You miss calls after hours and you have no idea what they were worth.',
      'Your front desk spends its day on the same five questions and booking changes.',
      'You want voice in your product (a tutor, a guide, a support line), not just a phone bot.',
    ],
    included: [
      {
        title: 'Speech in, speech out, grounded in between',
        body: 'Transcription, retrieval against your own content, and natural speech back. The grounding step is what stops it inventing a price or a policy on a recorded line.',
      },
      {
        title: 'A written escalation policy',
        body: 'We define, with you, exactly which intents go straight to a human (complaints, cancellations, anything medical, legal or financial), and the agent obeys it. This is the part that keeps you out of trouble.',
      },
      {
        title: 'Consent, recording and retention handled',
        body: 'Two-party consent states, recording notices, storage duration and deletion requests. Voice data is the most sensitive category you will ever collect and it is regulated accordingly.',
      },
      {
        title: 'Structured output from every call',
        body: 'Name, intent, urgency, outcome and a transcript, written to your CRM or inbox. A voice agent that leaves no record is a missed lead with extra steps.',
      },
      {
        title: 'Latency tuned so it feels like a conversation',
        body: 'Interruption handling, barge-in and sub-second response targets. If the pause is long enough to notice, people hang up.',
      },
      {
        title: 'In-product voice, not only telephony',
        body: 'Voice inside a web or mobile app (a guided lesson, a walkthrough, an accessible interface) is often the higher-value version of this, and it is what we built into our own platform.',
      },
    ],
    stack: ['Speech-to-text', 'Text-to-speech', 'RAG architecture', 'React Native', 'Next.js', 'WebSockets', 'Twilio'],
    priceLabel: '$18,000 – $70,000',
    priceNote: 'A scoped inbound agent starts around $18k. In-product voice experiences and multi-language deployments run higher.',
    proof: ['quranri'],
    faqs: [
      {
        q: 'Will callers know it is not a person?',
        a: 'Yes, and it should tell them. Attempting to pass a voice agent off as human is both a trust problem and, in a growing number of jurisdictions, a legal one. Disclosure costs you almost nothing; what people object to is being trapped, not being told.',
      },
      {
        q: 'What happens when it cannot help?',
        a: 'It hands off, with the transcript, to a human by warm transfer, callback or ticket, whichever your operation actually supports. We define that path before we build the agent, not after.',
      },
      {
        q: 'Is voice data safe?',
        a: 'It is handled as sensitive personal data: encrypted in transit and at rest, retained for a period you set, deletable on request, and covered by a data processing agreement. If you operate in a two-party-consent state we build the notice into the call flow.',
      },
    ],
  },

  {
    slug: 'ai-automation',
    name: 'AI Automation',
    tier: 'intelligence',
    isNew: true,
    seoTitle: 'AI Automation & n8n Workflow Agency for Small Business',
    seoDescription:
      'We build AI automations and n8n workflows that remove the manual steps between your tools. Scoped in a 20-minute call, live in weeks, documented so you own it.',
    eyebrow: 'AI automation',
    h1: 'Delete the copy-and-paste between your tools',
    h1Accent: 'copy-and-paste',
    lead: 'Every small business has one person whose real job is moving information between systems. That work is invisible, expensive and completely automatable. We find it, automate it, and hand you the documentation.',
    forWho: [
      'Someone re-types the same information into two systems every day.',
      'Leads arrive by email and get to your CRM whenever somebody remembers.',
      'You want AI in your operations but every vendor wants to sell you a platform.',
    ],
    included: [
      {
        title: 'A workflow audit first',
        body: 'Half a day mapping what actually happens, where the delay is, and what it costs in hours per month. Some of what we find is not worth automating and we will say so.',
      },
      {
        title: 'Automations built in n8n',
        body: 'Self-hostable and open, so the workflows are yours. No per-task pricing that punishes you for growing, and no vendor holding your operations hostage.',
      },
      {
        title: 'AI used where judgment is needed, rules everywhere else',
        body: 'Classifying, summarizing and drafting are good jobs for a model. Moving a field from A to B is not. That is a rule, and rules do not hallucinate or bill per token.',
      },
      {
        title: 'Error handling and alerting',
        body: 'When an automation fails at 3am, someone finds out. Silent failure is worse than no automation, because you stop checking.',
      },
      {
        title: 'Documentation and a handover session',
        body: 'A diagram, a written runbook and a recorded walkthrough, so your team can change it without calling us.',
      },
      {
        title: 'A measured before-and-after',
        body: 'Hours per month before, hours per month after. If the number is not worth the invoice, we would rather you knew that early.',
      },
    ],
    stack: ['n8n', 'Node.js', 'TypeScript', 'Webhooks', 'REST APIs', 'MongoDB', 'Docker'],
    priceLabel: '$3,000 – $20,000',
    priceNote: 'A single high-value workflow starts around $3k. A full operations build with multiple integrations runs higher.',
    proof: ['ppinstall'],
    faqs: [
      {
        q: 'Why n8n and not Zapier or Make?',
        a: 'Zapier is excellent until volume makes per-task pricing painful, and it caps how much custom logic you can express. n8n is open and self-hostable, so cost stays flat as you grow and the workflows remain yours. If Zapier is genuinely the better fit for your scale, we will set that up instead.',
      },
      {
        q: 'What if our process changes?',
        a: 'You get the runbook and the diagram, and the workflows live in your own account. Small changes your team can make. Larger ones we quote per change. There is no retainer you have to keep paying to keep the lights on.',
      },
      {
        q: 'How quickly does this pay for itself?',
        a: 'For a workflow consuming five or more hours a week, usually within a quarter. We measure the before number during the audit specifically so this is arithmetic rather than a promise.',
      },
    ],
  },

  /* ======================================================================
     DESIGN
     ====================================================================== */
  {
    slug: 'graphics-design',
    name: 'Design & Brand Identity',
    tier: 'design',
    // KEEP
    seoTitle: 'LabTechCrew: Graphic Design Services in the USA',
    seoDescription:
      'LabTechCrew delivers graphic design solutions brand identity, UI/UX, and marketing design that drive growth and success for your business.',
    eyebrow: 'Design & identity',
    h1: 'Design that survives contact with a real user',
    h1Accent: 'a real user',
    lead: 'Logos, interfaces and the system that keeps them consistent after we leave. We design in Figma, hand over the source files and the tokens, and build what we drew, so nothing gets lost in the gap between designer and developer.',
    forWho: [
      'You need a logo and a basic identity, and you need it this month.',
      'Your product works but people get lost, and support is paying for it.',
      'Every new page looks slightly different from the last one.',
    ],
    included: [
      {
        title: 'Logo and core identity',
        body: 'Primary mark, variations, color, type and clear-space rules, delivered as SVG and PNG in every size you will actually be asked for.',
      },
      {
        title: 'A design system, not a pile of screens',
        body: 'Color tokens, type scale, spacing, and components with real states: hover, focus, disabled, error, empty, loading. The unglamorous states are where products fall apart.',
      },
      {
        title: 'UI/UX for web and mobile',
        body: 'Flows and wireframes before visuals, so we are arguing about structure while it is still cheap to change.',
      },
      {
        title: 'Accessibility checked, not assumed',
        body: 'Contrast measured against WCAG, visible focus states, keyboard paths, sensible heading order. US buyers in healthcare, education and government will check.',
      },
      {
        title: 'Marketing collateral',
        body: 'Social templates, pitch decks, one-pagers and ad creative built from the same system, so your ads and your site look like the same company.',
      },
      {
        title: 'Files you own outright',
        body: 'Editable Figma, exported assets, fonts documented with their licenses. Ownership transfers on final payment and the editable sources go with it, no lock-in, no "we keep the working files".',
      },
    ],
    stack: ['Figma', 'Design tokens', 'Tailwind CSS', 'SVG', 'WCAG 2.1', 'Adobe Illustrator'],
    priceLabel: '$2,500 – $20,000',
    priceNote: 'Custom design engagements run from $2,500. If you just need a logo and brand kit, the fixed-price $299 Starter Pack covers it properly. Start there.',
    proof: ['quranri', 'the-digital-samurais'],
    faqs: [
      {
        q: 'Do you do small jobs, like just a logo?',
        a: 'Yes, and we do not treat them as a favor. Small work is how most good client relationships start, and a logo done properly is a week: brief, three directions, two rounds of refinement, full file set.',
      },
      {
        q: 'Who owns the design?',
        a: 'You do, in full, including the editable source files. Ownership transfers on final payment for the engagement, and nothing is held back once it clears. Any licensed fonts or stock are documented with their license so you know exactly what you can use commercially and where.',
      },
      {
        q: 'Can you work with our existing brand?',
        a: 'Often that is the better option. We can extend what you have into a proper system rather than replace it: cheaper, faster, and it does not throw away recognition you have already paid for.',
      },
    ],
  },

  {
    slug: 'brand-strategy',
    name: 'Brand Strategy',
    tier: 'design',
    // KEEP
    seoTitle: 'LabTechCrew: Brand Strategy Services in USA',
    seoDescription:
      'Build a strong brand identity with LabTechCrew. Expert Brand Strategy USA services to help your business grow and stand out.',
    eyebrow: 'Brand strategy',
    h1: 'Decide what you stand for before you design anything',
    h1Accent: 'what you stand for',
    lead: 'Most rebrands are a color change wearing a strategy costume. This is the other work: who you are for, what you actually do better, what you will refuse, and the exact sentences your team uses to say it.',
    forWho: [
      'You look like every competitor and you compete on price because of it.',
      'Three people in your company describe what you do three different ways.',
      'You are entering the US market and what worked at home is landing flat.',
    ],
    included: [
      {
        title: 'Buyer and competitor research',
        body: 'We read what your competitors actually say, and what your buyers actually complain about. Positioning built without that is decoration.',
      },
      {
        title: 'A positioning statement you can defend',
        body: 'One paragraph naming who it is for, what changes for them, and why you. Short enough to remember, specific enough to lose someone, which is the point.',
      },
      {
        title: 'Messaging architecture',
        body: 'Primary message, three supporting proof points, and the objections you must answer on every page. This becomes your website copy, your ads and your sales script.',
      },
      {
        title: 'Voice and tone with real examples',
        body: 'Not "friendly yet professional". Actual sentences: how you open an email, how you decline, how you price, how you apologize.',
      },
      {
        title: 'Naming when you need it',
        body: 'Candidates screened for domain availability and obvious trademark conflicts before you fall in love with one.',
      },
      {
        title: 'A one-page brand brief',
        body: 'The whole strategy on a single page your team will actually reread. Everything longer gets filed and forgotten.',
      },
    ],
    stack: ['Competitive research', 'Buyer interviews', 'Positioning frameworks', 'Messaging architecture', 'Figma'],
    priceLabel: '$3,000 – $15,000',
    priceNote: 'A focused positioning and messaging engagement starts around $3k. Full research, naming and identity runs higher.',
    proof: ['quranri', 'the-digital-samurais'],
    faqs: [
      {
        q: 'Is this not just marketing fluff?',
        a: 'It is fluff when it stops at adjectives. It stops being fluff when it produces the exact sentences on your homepage, the objections your sales calls have to answer, and a written list of the work you will turn down. That last one is how you tell whether a strategy is real.',
      },
      {
        q: 'How long does it take?',
        a: 'Two to four weeks. Research and interviews first, then a working session with your founders, then the written strategy. It is deliberately short; this work goes stale if you let it run for a quarter.',
      },
      {
        q: 'Do we have to redesign everything afterwards?',
        a: 'No. Sometimes the strategy confirms the identity is fine and the words were the problem. That is a cheaper and better outcome, and we will tell you when we find it.',
      },
    ],
  },
]

export function getService(slug: string): ServiceContent | undefined {
  return SERVICES.find((s) => s.slug === slug)
}
