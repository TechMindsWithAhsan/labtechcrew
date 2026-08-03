# CLAUDE.md — project rules for LabTechCrew

You are working on the LabTechCrew website rebuild: **Next.js 16 App Router,
TypeScript strict, Tailwind v4, MongoDB.** Read this file before writing code.
`LabTechCrew-Rebuild-Blueprint.md` in the repo root has the full reasoning and
the section numbers referenced below.

## Project state

**The site is complete.** Every page is built, every internal link returns
200, the build passes, and the redirect map is verified single-hop against a
running server.

36 internal URLs, all 200. 32 in the sitemap. Landing pages and the styleguide
are noindex and disallowed. One H1 per page, no image without alt text,
canonicals correct on every page.

**Still open — these are content and business tasks, not code:**

- Fill the `TODO`s in `lib/site.ts` (US address, matching-area-code phone,
  legal name, `pricingFloorUsd`) and the brand navy in `app/globals.css`.
- Resolve every entry in `LICENSES.md` marked **BLOCKED**.
- Resolve every `riskFlags` entry in `lib/data/work.ts` — they are deliberately
  in the source so they cannot be forgotten.
- Replace the placeholder `LogoMark` with the real SVG export.
- Add real screenshots to the case studies, especially QuranRI's
  authenticated features.
- Have a US attorney review `lib/data/legal.ts`. Every `[TODO]` must go first.
- Phase 4 remainder: scheduling embed on the form success state, the pricing
  estimator, Cloudflare Turnstile wiring, and the first two blog posts.

### Services taxonomy — changed July 2026

Nine services in three tiers. **Digital marketing and game development were
removed.** Both URLs were indexed, so they are 301'd in
`config/redirects.mjs`, not deleted:
`/services/game-development/` → `/services/mobile-app-development/` and
`/services/digital-marketing/` → `/services/`. Never delete an indexed URL.

New pages added: `ai-voice-agents`, `ai-automation`, `custom-software`,
`wordpress-to-nextjs-migration`.

## Commands

```bash
npm run dev         # http://localhost:3000  and  /styleguide
npm run typecheck
npm run build
npm run audit:seo   # run after ANY change to config/redirects.mjs
npm run audit:gsc -- <gsc-pages-export.csv>
                    # unions the Search Console Pages export against the
                    # redirect map and reports URLs that would 404, ranked by
                    # clicks. The sitemap shows what the CMS thinks exists;
                    # this shows what Google ACTUALLY has. Run before DNS.
npm run check       # the full gate, seven steps in order:
                    #   1. lint:tokens       CSS-variable syntax guard
                    #   2. check:responsive  mobile overflow audit
                    #   3. typecheck         tsc --noEmit
                    #   4. build             next build
                    #   5. check:links       every internal href resolves
                    #   6. audit:seo         redirect map, single-hop
                    #   7. check:shots       case studies missing screenshots
                    # All seven are pure local work — no server, no Playwright.
                    # NOTE: check:links and check:shots print their findings but
                    # always exit 0. A green exit code is not enough; read the
                    # output for ❌ and ⚠️.
```

---

## Brand — sampled from the real ad creatives, not invented

The six LinkedIn/Instagram creatives all use **one gradient**: a hue-257
violet ramp from `#2A0090` to black, with **coral `#DA797E`** as the single
warm emphasis colour. That is what makes the ads recognisable, so it is the
spine of the site. Full token list and the reasoning are in
`app/globals.css` — read the comment block at the top before changing colour.

| Role | Value | Where it came from |
|---|---|---|
| Gradient top | `#2A0090` | top of every creative |
| Gradient bottom | `#05000F` | bottom of every creative |
| Emphasis / primary button | `#DA797E` | "Branding", "spine", "GOOD", "NOW" |
| Rose tint | `#EAB4B7` | "Digital Era" |
| Rare highlight | `#F90060` | "Social" — used once, ever |
| Muted indigo | `#4D4B94` | the illustration circles |
| Logo gradient | `#FFA26D → #E97E92 → #555AFA` | the logo swoosh |

### Colour rules — measured, not opinion

- **Dark by default.** Every creative is dark. A white site is not this brand.
  Light sections (`tone="light"`) exist only for long-form reading.
- **One coral word per heading.** That is the brand's signature move. Use the
  `accent` prop on `Hero` / `SectionHeading`. Two coral words and it stops
  meaning anything.
- **A coral surface always carries dark text.** White on coral is **2.99:1**
  and fails WCAG. `#0F0026` on coral is **6.8:1**. Never invert the primary
  button.
- **Coral on white is 2.99:1 and fails.** Inside `data-theme="light"` the
  token automatically switches to `#B23F49`. Do not hardcode coral in a light
  section.
- **`#F90060` at most once per page.** It is a highlight, not a palette member.
- **Sections are transparent by default** so the body gradient shows through.
  Giving a section a solid dark background breaks the ramp and the page starts
  looking like stacked black boxes.
- Verified contrast: white on `#2A0090` = 13.99:1 · coral on `#2A0090` = 4.67:1
  · coral on `#08001D` = 6.83:1 · `#BFB2E4` muted body on `#2A0090` = 7.13:1.

### Bugs already found and fixed — do not reintroduce

1. **`content-visibility: auto` left 600px blank holes.** The `defer` prop on
   `Section` is off by default now. Only enable it on genuinely long pages,
   and re-screenshot after you do.
2. **`background-attachment: fixed` broke the ramp.** It maps the gradient to
   the viewport, so violet reappears at the top of every screen. The gradient
   is anchored to the page and bounded to 2200px. Leave it that way.
3. **Redirect destinations without a trailing slash caused a two-hop chain.**
   Next does NOT append it. Caught with `curl`, not visible in the browser.
   Every `destination` in `config/redirects.mjs` ends with `/`.
4. **`fetch('/api/lead')` was 308-redirected on every form submission.**
   `trailingSlash: true` applies to API routes too. Both client fetches now
   post to the slashed path. If you add an API call, include the slash.
5. **The honeypot returned 422, teaching bots they had been caught.** The
   field is now validated permissively in zod and checked in the route, which
   returns 200 so the bot believes it succeeded.
6. **`app/favicon.ico` must contain RGBA PNG frames** or the Turbopack build
   fails with "The PNG is not in RGBA format".

**Always screenshot after a visual change.** Playwright with the system
Chromium (`executablePath: '/opt/pw-browsers/chromium'` in the cloud; locally
just `npx playwright install chromium`). A full-page screenshot catches things
that look fine in a 900px viewport.

---

## SEO rules — these carry real money

The site is migrating from WordPress with live Google rankings. Breaking one
of these costs traffic that takes months to recover.

- **`trailingSlash: true` stays.** All 19 legacy URLs end in `/`.
- **Redirect `destination` values must END WITH `/`.** Verified by test: Next
  does *not* append it, and without it every legacy URL takes two hops.
  Run `npm run audit:seo` after any change to `config/redirects.mjs`.
- **Never add `/_next/` to `robots.ts` disallow** — it blocks the image
  optimiser entirely.
- **Never block `OAI-SearchBot`, `PerplexityBot` or `Claude-SearchBot`.**
  OpenAI: sites opted out of `OAI-SearchBot` "will not be shown in ChatGPT
  search answers."
- **Canonicals at page level only.** `alternates` merges shallowly — setting a
  canonical in a layout with dynamic children canonicals the whole section to
  one URL.
- **Do not "improve" the legacy titles marked `KEEP`** in `lib/content.ts`
  until Search Console confirms recovery. Those exact strings carry current
  rankings.
- **Honest `lastModified`.** Port `post_modified` from WordPress. Emitting
  `new Date()` on every build makes the field worthless site-wide.
- **No `FAQPage` schema** (Google dropped FAQ rich results 7 May 2026), no
  `HowTo` (dead Sept 2023), and **never `aggregateRating` on your own
  `Organization`** — self-serving ratings are ignored.
- **No `hreflang`.** Single language, single region. It buys nothing.

## Performance rules

- **`'use client'` on LEAF components only. Never in a layout.** It is a
  boundary, not a file — everything imported below it ships to the browser.
  Pass Server Components in as `children` instead.
- **Every `next/image` needs `alt` and `sizes`.** Missing `sizes` on a `fill`
  or responsive image is the #1 LCP defect in Next.js.
- Use `fetchPriority="high"` + `loading="eager"` for the LCP image. **Not
  `priority`** — deprecated in Next 16.
- `w-full` always needs `h-auto`, or you generate CLS.
- **No client-side data fetching above the fold.** No autoplay hero video.
- **Fonts only via `next/font`.** Grep for `fonts.googleapis.com` before every
  deploy — coming from Elementor this tries to sneak back in.
- The consent banner is `position: fixed`. A banner in normal document flow is
  the largest single CLS source on agency sites.
- Only animate `transform` and `opacity`.

## Content rules — legal, not stylistic

The company is opening a US LLC. Every sentence must pass blueprint §10.3:

1. **Is it a number?** Produce the document, or cut it.
2. **Does it name a client?** Written permission, or anonymise it.
3. **Is it a superlative?** Named third party + date, or cut it. No "Best",
   "#1", "Top", "Award Winning", "world-class".
4. **Is it a person's photo?** Real consenting employee, or cut it.
5. **Someone else's logo or screenshot?** Licence or written permission, or
   cut it.
6. **Is it a promise** ("100%", "24/7", "guaranteed")? Deliverable every time,
   or cut it.

Record every asset in `LICENSES.md`. It has a **BLOCKED** table — nothing on
that list ships until it is resolved.

## Identity — fill these before launch

`lib/site.ts` has `TODO` markers for the US address, the US phone (area code
**must** match the address), the legal name and `pricingFloorUsd`. The live
WordPress site pairs a Florida address with a New York 929 number and a Texas
LLC — do not carry that incoherence over.

Footer ordering matters: **US entity, address and phone first; Karachi second.**
That is the pattern Folio3, Arbisoft, Cubix and Tkxel all use. Nothing hidden,
just ordered.

## Conventions

- Server Components by default. `'use client'` is the exception and needs a
  reason.
- Import from `@/lib/site` for anything about the company. Never hardcode a
  phone number, address or brand string.
- Use the design tokens (`text-(--color-text-muted)`, `bg-coral-500`, `.panel`).
  Do not introduce new hex values.
- ⚠️ CSS VARIABLES USE **PARENTHESES**, NOT SQUARE BRACKETS. Tailwind v4 removed
  the v3 shorthand where `text-[--x]` was auto-read as `text-[var(--x)]`.
  In v4, `text-[--color-text-muted]` compiles to the INVALID declaration
  `color: --color-text-muted`, which every browser silently discards — so the
  element renders with no colour at all and nothing warns you. This exact
  mistake once shipped 243 times across 32 files and made the services
  mega-menu render fully transparent.
    ✅ `bg-(--color-brand-800)`   ✅ `bg-brand-800`   ✅ `bg-[var(--x)]`
    ❌ `bg-[--color-brand-800]`
  Square brackets are still correct for literal arbitrary values —
  `text-[0.9375rem]`, `w-[min(56rem,90vw)]` — just never for a bare variable.
  Guard before every deploy:  `npm run lint:tokens`
- No barrel files (`components/index.ts`). They defeat tree-shaking.
- Tailwind ancestor variants are `[[data-theme=light]_&]:x` — the single-bracket
  form silently does nothing.
- Real 404s via `notFound()`, never a 200 "oops" page.
