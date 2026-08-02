# How to update the site

You do not need me for day-to-day changes. Almost everything on this site is
driven by **data files**, not by page code — so adding a project or changing a
price is editing one object in one file.

Every change follows the same three steps:

```bash
npm run dev      # see it at http://localhost:3000
npm run check    # typecheck + build — must pass before you push
git add . && git commit -m "what you changed" && git push
```

Pushing to GitHub deploys to Vercel automatically. Roughly two minutes.

---

## Add a new project to the portfolio

**File:** `lib/data/work.ts`

Copy this template, paste it into the `CASE_STUDIES` array, fill it in.

```ts
{
  slug: 'client-name',                    // becomes /portfolio/client-name/
  title: 'Client Name — what it is',
  client: 'Client Name',
  category: 'Web platform',               // shown above the title
  year: '2026',
  featured: true,                         // true = appears on the homepage

  seoTitle: 'LabTechCrew: Client Name Web Development',
  seoDescription: 'One sentence, under 160 characters, describing what you built.',

  summary: 'One line for the card on the work page.',
  lead: 'Two sentences at the top of the page. What was the situation.',

  challenge: 'A paragraph on what was genuinely hard. Not "they needed a website" — the real constraint.',

  approach: [
    { title: 'What you decided', body: 'Why, and what it meant in practice.' },
    { title: 'Second decision', body: 'Same again.' },
  ],

  results: [
    'Only things you can evidence.',
    'Describe what shipped rather than inventing a percentage.',
  ],

  stack: ['Next.js', 'TypeScript', 'MongoDB'],
  services: ['website-development', 'graphics-design'],   // must match real slugs

  liveUrl: 'https://client.com/',         // optional
  platforms: ['Web', 'iOS'],              // optional

  updatedAt: new Date('2026-08-01T00:00:00Z'),
},
```

**That is all.** The page, the card on `/work/`, the "Proof" block on every
matching service page, the sitemap entry and the internal links all appear
automatically.

### The rule for `results`

**No number without a document.** If a client tells you traffic went up 200%,
get it in an email before you publish it. The old site claimed traffic and
revenue figures for a named publisher with nothing behind them — that is the
kind of thing a competitor or the FTC can act on, and it is why those numbers
were removed.

If you cannot evidence it, describe what you built instead. That still sells.

---

## Add a new service

**Two files, both quick.**

**1. `lib/site.ts`** — add it to the right tier:

```ts
{ slug: 'seo-services', name: 'SEO', outcome: 'One line, outcome first.' },
```

**2. `lib/data/services.ts`** — add the full page content. Copy an existing
entry and replace the fields. `forWho` is three situations in the buyer's own
words, `included` is 4–6 concrete deliverables, `faqs` is 3–4 real questions.

Nav, footer, services hub, sitemap and the pricing table all update themselves.

### ⚠️ If you REMOVE a service

Never just delete it. If Google has indexed the page, add a redirect in
`config/redirects.mjs` first:

```ts
{ source: '/services/old-service', destination: '/services/closest-match/', permanent: true },
```

Source **without** a trailing slash, destination **with** one. Then:

```bash
npm run audit:seo
```

---

## Change prices

**`lib/site.ts`** → `pricingFloorUsd` for the headline number.
**`lib/data/services.ts`** → `priceLabel` and `priceNote` per service.
**`components/sections/blocks.tsx`** → the three `BANDS` on the homepage.

---

## Change your address, phone, team

All in **`lib/site.ts`**. Nothing else hardcodes them, so one edit updates the
header, footer, contact page, about page and the structured data.

⚠️ **The phone number is `(929) 563-2844` on purpose** — it matches your Google
Business Profile, which carries your 4 five-star reviews. Read the comment
above it before changing it.

---

## Change words on a page

| Page | File |
|---|---|
| Homepage | `app/page.tsx` |
| Services hub | `app/services/page.tsx` |
| A single service | `lib/data/services.ts` |
| A case study | `lib/data/work.ts` |
| Pricing | `app/pricing/page.tsx` |
| How we work | `app/how-we-work/page.tsx` |
| About | `app/about/page.tsx` |
| Contact | `app/contact/page.tsx` |
| Footer | `components/sections/footer.tsx` |
| Legal pages | `lib/data/legal.ts` |

---

## ⛔ Do NOT change these until Search Console says you have recovered

The `seoTitle` and `seoDescription` values marked **KEEP** in
`lib/data/services.ts` and `lib/data/work.ts`, and the homepage title in
`app/page.tsx`, are the exact strings Google has indexed today.

Leave them frozen until Search Console shows clicks and impressions back at
pre-migration levels — realistically **week 6 to 8**. Then change **one at a
time**, on a quiet day, and watch it for a fortnight.

Change five titles at once and you will never know which one moved your
ranking.

---

## Add a blog post

The blog index exists; the individual post route does not yet, because there
are no posts. When you write the first one you need:

1. `app/blog/[slug]/page.tsx` — the post template
2. Posts added to the `POSTS` array in `lib/content.ts`, or MDX files

Ask me or Claude Code to build the route when you have the first post written.
Two of them are worth writing before anything else:

- **"WordPress vs Next.js for a business website"**
- **"How we migrated our own site off WordPress"** — with your real before and
  after numbers

Page one for both of those searches is currently personal blogs and tiny
agencies with no directories in the way. You are living the topic, so you can
write something nobody else can.

---

## After EVERY change, before you push

```bash
npm run check       # typecheck + build. If this fails, do not push.
npm run audit:seo   # only needed if you touched redirects
```

If you changed how something looks, **take a screenshot of the whole page** —
not just the top. A 900px browser window hides most problems. Two real bugs on
this project were only visible in a full-page screenshot.

---

## Where to do the work: VS Code or Claude in the browser?

**VS Code with the Claude Code extension — for almost everything.**

Adding a project, changing text, fixing a price, adjusting spacing. You can run
`npm run dev` and see the change in your browser instantly. I cannot see your
screen; you can. That matters more than anything else for visual work.

Claude Code reads `CLAUDE.md` automatically, so it already knows the brand
rules, the SEO rules and the bugs not to reintroduce. Give it short, specific
instructions:

```
Read CLAUDE.md. Add a new case study to lib/data/work.ts for [client].
Here are the details: [...]. Then run npm run check.
```

**Come back to me in the browser for:**

- Anything touching **redirects or indexed titles** — one mistake costs months
- **Research-heavy content**: a new service page, keyword targeting, competitor
  work. I can search the web and check what actually ranks.
- **Something is broken and you cannot see why.** I can run the full crawl,
  test every link, check every title and hit the API from outside.
- **Before any launch or big structural change** — a second pair of eyes on the
  whole site.

Rule of thumb: **if you can see the problem, fix it in VS Code. If you need
someone to go and find out, bring it here.**
