# LabTechCrew — website rebuild

Next.js 16 · TypeScript (strict) · Tailwind v4 · MongoDB

**The site is complete.** Every page from `LabTechCrew-Rebuild-Blueprint.md`
is built, on the brand palette sampled from the real ad creatives, with full
content. 36 internal URLs, all returning 200.

Read the blueprint before changing anything structural. Section numbers are
referenced in comments throughout the code.

---

## Getting started

```bash
npm install
cp .env.example .env.local     # then fill it in
npm run dev
```

Open http://localhost:3000 and http://localhost:3000/styleguide

```bash
npm run typecheck   # tsc --noEmit
npm run build       # production build
npm run audit:seo   # redirect map auditor — run after ANY redirect change
npm run audit:gsc -- Pages.csv   # checks your Search Console export for URLs
                                 # that would 404 on launch day
npm run check       # typecheck + build
```

> **Note:** `npm run build` needs outbound network access the first time,
> because `next/font/google` downloads and self-hosts Inter and Sora at build
> time. That is the correct behaviour — it is what removes the third-party
> request and gives you metric-matched fallbacks. On an offline machine the
> build will fail at the font step and nothing else.

---

## What is already done

| Area | Status |
|---|---|
| `trailingSlash: true` + complete WordPress redirect map | ✅ built and **verified single-hop with curl** |
| Redirect auditor (loops, chains, slash policy, coverage) | ✅ `npm run audit:seo` |
| `robots.ts` with production guard, no `/_next/` block, AI search bots allowed | ✅ |
| `sitemap.ts` with canonical URLs and honest `lastModified` | ✅ |
| `lib/seo.ts` — single-source slash policy, page metadata, JSON-LD builders | ✅ |
| Design tokens, fluid type scale, focus rings, reduced-motion | ✅ `app/globals.css` |
| Component library + `/styleguide` (noindex) | ✅ |
| Header as a Server Component with client-leaf nav | ✅ |
| Lead schema, MongoDB model, `/api/lead`, notification fan-out | ✅ |
| Web Vitals beacon | ✅ |
| Legacy titles/descriptions preserved verbatim | ✅ `lib/data/services.ts` |
| Full content for 9 services and 8 case studies | ✅ `lib/data/` |
| Every internal link verified 200 | ✅ crawler, 36 URLs |
| Lead API tested: validation, honeypot, rate limit | ✅ |
| One H1 per page, no image without alt, canonicals correct | ✅ |
| Landing pages + styleguide noindex and disallowed | ✅ |

## Day-to-day changes

See **HOW-TO-UPDATE.md** — adding a project, a service, changing prices or
text, and which changes to make in VS Code versus which to bring back to
Claude in the browser.

## Pages

| Route | What it is |
|---|---|
| `/` | Home — flagship-first positioning |
| `/services/` | Hub, three tiers, nine services |
| `/services/[slug]/` | 9 full service pages |
| `/work/` | Case-study index |
| `/portfolio/[slug]/` | 8 case studies (legacy URLs preserved) |
| `/how-we-work/` | Contracts, IP, timezone, process — the page that sells |
| `/pricing/` | Published ranges, price drivers, who we turn down |
| `/about/` | Real team, real story, no invented numbers |
| `/blog/` | Index, empty by design, handles zero posts |
| `/locations/[city]/` | 4 Texas AI-automation pages |
| `/legal/[doc]/` | Privacy, terms, cookies — attorney approved, in force |
| `/lp/[campaign]/` | 4 paid-traffic landing pages, noindex |
| `/contact/` | Three-tier form |
| `/styleguide/` | Component reference, noindex |

## What still needs a human

- The `TODO`s in `lib/site.ts` — US address, matching-area-code phone, legal
  name, `pricingFloorUsd` — and the brand navy in `app/globals.css`.
- Every **BLOCKED** row in `LICENSES.md`.
- Every `riskFlags` entry in `lib/data/work.ts`. They sit in the source
  deliberately so they cannot be quietly skipped.
- Real logo SVG in place of the placeholder `LogoMark`.
- Real screenshots on the case studies.
- Scheduling embed, pricing estimator, Turnstile keys, first two blog posts.

---

## Before you write another line of code

These are in `lib/site.ts` and they block everything downstream:

1. **`SITE.address`** — one real, staffed US street address. Not a virtual
   office, not a PO box (both are explicitly ineligible for a Google Business
   Profile, and a suspended profile is worse than no profile).
2. **`SITE.contact.phone`** — a US number whose **area code matches that
   address**. The live site pairs a Florida address with a New York 929
   number.
3. **`SITE.pricingFloorUsd`** — decide the number as a team.
4. **`--color-brand-900` in `app/globals.css`** — sample the exact navy from
   the logo file.
5. **`SITE.legalName`** — as filed in Texas.

---

## Rules that are not style preferences

Break these and you lose rankings, speed, or a court case.

**SEO**

- Never add `/_next/` to `robots.ts` disallow — it blocks the image optimiser.
- Never block `OAI-SearchBot`, `PerplexityBot` or `Claude-SearchBot`. OpenAI:
  sites opted out of `OAI-SearchBot` "will not be shown in ChatGPT search
  answers."
- Canonicals are set at **page level only**, never in a layout with dynamic
  children — `alternates` merges shallowly.
- Do not "improve" the legacy titles marked `KEEP` in `lib/content.ts` until
  Search Console confirms the migration has recovered.
- No `FAQPage` schema (dead 7 May 2026), no `HowTo` (dead Sept 2023), no
  `aggregateRating` on your own `Organization` (self-serving; ignored).

**Performance**

- `'use client'` on **leaf components only**. Never in a layout.
- Every `next/image` needs `alt` and `sizes`. Missing `sizes` on a `fill` or
  responsive image is the #1 LCP defect in Next.js.
- Use `fetchPriority="high"` + `loading="eager"` for the LCP image, not
  `priority` (deprecated in Next 16).
- `w-full` always needs `h-auto`.
- No client-side data fetching for anything above the fold.
- No autoplay hero video.
- Fonts only via `next/font`. **Grep for `fonts.googleapis.com` before every
  deploy** — coming from Elementor this will try to sneak back in.
- The consent banner is `position: fixed`. A banner in normal document flow is
  the largest single CLS source on agency sites.

**Claims**

Nothing ships that fails the checklist in blueprint §10.3. Short version: no
number without a document, no client name without written permission, no
superlative without a named third party and a date, no photo of a person who
is not a real consenting employee, no logo or screenshot you do not have a
licence for.

`LICENSES.md` records the source and licence of every asset. Keep it current —
when a demand letter arrives, that file is your defence.

---

## Deployment

Vercel, or any Node host. Set `NEXT_PUBLIC_SITE_ENV=production` (or rely on
`VERCEL_ENV`) or `robots.txt` will serve `Disallow: /`.

**Launch-day order — do not improvise this:**

1. Lower DNS TTL a week ahead.
2. Verify Search Console by **DNS TXT** (file/tag verification can vanish with
   the old site).
3. Deploy, then immediately fetch the production `robots.txt` and grep five
   rendered pages for `noindex`. Highest-consequence check on the list.
4. Submit the new sitemap. **Keep the old sitemap submitted too** — watching
   the old one drain and the new one fill is your progress tracker.
5. Crawl staging with Screaming Frog in list mode first: every legacy URL must
   resolve in **one hop to a 200**.

Expect a 10–30% traffic dip in week one even on a clean migration. The failure
signal is not the dip — it is the absence of a recovery trend by week four.
