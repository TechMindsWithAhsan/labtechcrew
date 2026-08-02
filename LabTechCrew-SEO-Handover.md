# What keeps your SEO, in what order to do it, and what to crawl

Three questions answered, in the order you need them.

---

# PART 1 — What is in the new site that keeps your SEO

Nine mechanisms. Each one is a specific file you can open and check.

### 1. Your URLs are unchanged, trailing slash and all
**`next.config.ts` → `trailingSlash: true`**

All 19 of your indexed URLs end in `/`. Next.js defaults to *no* slash, which
would have redirected every single one. This one line prevents that.

### 2. A redirect map, tested to resolve in one hop
**`config/redirects.mjs` — 24 rules**

Covers: the 7 broken internal links on your live `/services/` page, the 4 URLs
that already 404 on your site but still rank, the 2 retired services, the
`/portfolio/` → `/work/` move, WordPress date permalinks, category and author
archives, feeds, `wp-admin`, and legacy `?p=123` links.

Verified with `curl`: every one shows `hops=1` and `code=200`.

### 3. Your title tags, frozen byte-for-byte
**`lib/data/services.ts` and `lib/data/work.ts`**

Every title Google has indexed is reproduced exactly. Marked `KEEP` in the
code so nobody "improves" one by accident.

> A bug was caught here in testing: the site was appending `| LabTechCrew` to
> titles that already began with the brand. Every preserved title was being
> silently changed. Fixed in `lib/seo.ts`, and the fix is commented so it
> cannot return.

### 4. Canonical tags on every page, pointing at the right slash variant
**`lib/seo.ts` → `canonicalPath()`**

The slash rule lives in exactly one function. A canonical pointing at the
wrong variant is what produces *"Duplicate, Google chose different canonical"*
in Search Console — the most common post-migration failure.

### 5. A sitemap with honest dates
**`app/sitemap.ts` — 32 URLs**

Every URL is the version that returns 200. Google ignores `changefreq` and
`priority` but does use `lastmod` — only when it is truthful.

### 6. A robots.txt that cannot go wrong
**`app/robots.ts`**

- Serves `Disallow: /` on staging, `Allow: /` only in production — so a
  preview deployment can never be indexed
- Never blocks `/_next/` (that would kill image optimisation)
- Never blocks `OAI-SearchBot`, `PerplexityBot` or `Claude-SearchBot` — your
  current WordPress robots.txt happens to be clean here, and this keeps it that
  way

### 7. Structured data the old site did not have
**`lib/seo.ts` + `components/ui/json-ld.tsx`**

`Organization`, `WebSite`, `BreadcrumbList` on every page. Breadcrumbs replace
the URL line in your search result and help Google rebuild your **sitelinks**
faster.

No `FAQPage` (Google dropped FAQ rich results on 7 May 2026), no `HowTo`
(dead since 2023), and never `aggregateRating` on your own Organization —
Google ignores self-serving ratings by policy.

### 8. Every page server-rendered
**All 36 URLs are static HTML**

Not just a speed win. **AI crawlers execute zero JavaScript.** A client-rendered
site is invisible to ChatGPT, Perplexity and Google AI Overviews. Yours is not.

### 9. Speed as an acceptance criterion
Static generation, `next/font` self-hosting, no autoplay video, no page-builder
CSS. Google measured **+21.6% lead-form completion per 0.1s of LCP gained.**

---

# PART 2 — The order. Hosting is step 5, not step 1.

You asked whether to set up hosting first. **Almost — but do not connect your
domain yet.** Deploy to Vercel's temporary URL, test there, and only move DNS
when everything passes.

### Step 1 — Use the Search Console file you just downloaded ⬅ START HERE

You have the Pages export. It is the most valuable of the four files, and it
has one job: proving nothing gets left behind.

Your sitemap shows what your CMS thinks exists. **The GSC export shows what
Google actually has** — and those lists are never the same. The gap is where
migrations quietly bleed traffic.

I built you a tool for this. In the project folder:

```bash
npm run audit:gsc -- /path/to/your/Pages.csv
```

It reads your export, checks every URL against the redirect map, and prints
anything that would 404 — **ranked by the clicks it earns**, so you fix what
matters first. Example output:

```
URLs in your export ......... 47
Covered (live or 301'd) ..... 44
NOT covered ................. 3
Clicks at risk .............. 8 of 486 (1.6%)

❌ THESE URLS WOULD 404 ON LAUNCH DAY — highest value first:
        6 clicks      300 impr   /old-landing-page
        2 clicks       90 impr   /services/wordpress-maintenance
        0 clicks        0 impr   /team
```

For each one with clicks, add a line to `config/redirects.mjs`:

```js
{ source: '/old-landing-page', destination: '/services/website-development/', permanent: true },
```

Source **without** a trailing slash, destination **with** one.

Then re-run until it says ✅.

> A URL with **0 clicks and 0 impressions** across 16 months can be left to
> 404. Redirecting genuinely dead pages to the homepage creates soft-404s,
> which Google treats worse than a clean 404.

**Send me the output and I will write the redirect lines for you.**

### Step 2 — Rescue your images

Download `/wp-content/uploads/` from WordPress hosting → paste into
`public/wp-content/uploads/` in the project. Same paths, so every indexed image
URL keeps working after the switch.

Test: `npm run dev`, then open
`http://localhost:3000/wp-content/uploads/2025/08/labtechcrew.png`

### Step 3 — Back up WordPress completely

Files + database, downloaded. **Keep the hosting alive 60 days** — that is your
rollback.

### Step 4 — Fill the `TODO`s

`lib/site.ts` (address, legal name, price floor, team), `app/globals.css` (logo
violet), `components/ui/logo.tsx` (real SVG). Phone is already set to
`(929) 563-2844` to match your Google Business Profile — leave it.

### Step 5 — NOW set up hosting, on the temporary URL

GitHub → Vercel → deploy. You get `labtechcrew-abc123.vercel.app`.

**Do not add your domain yet.** This is your staging site.

⚠️ Do **not** set `NEXT_PUBLIC_SITE_ENV` in Vercel. Leave it out entirely —
Vercel sets `VERCEL_ENV` itself and the code already reads it. Setting it to
`production` on all environments makes your preview deployments indexable, and
Google finds duplicate copies of your whole site.

### Step 6 — Test on the temporary URL

Every page, the form (**did the alert reach your phone?**), your real phone,
PageSpeed, and:

```bash
npm run audit:seo
npm run audit:gsc -- /path/to/Pages.csv
```

Both must pass. Then test old URLs against staging:

```bash
curl -s -o /dev/null -L -w "hops=%{num_redirects} code=%{http_code}\n" \
  https://YOUR-SITE.vercel.app/services/game-development/
```

`hops=1` and `code=200` on every one.

### Step 7 — Connect the domain

TTL to 300 seconds a week early. Verify Search Console by **DNS TXT**. Add
`labtechcrew.com` and `www.labtechcrew.com` in Vercel, www redirecting to apex.
Switch on a **Tuesday or Wednesday morning**.

⚠️ **Do not touch your MX records.** That is your email.

---

# PART 3 — Do you need to crawl all those pages again?

**No. And for the removed pages, requesting indexing would be actively wrong.**

This is the part people get backwards, so here it is precisely.

## You do not "re-crawl" your site. Google does that itself.

Your Search Console property is tied to **labtechcrew.com**. Same domain, so
your property, your history and your verification all continue. You are not
starting over. You submit the sitemap once, and Google recrawls everything over
the following days and weeks.

## The removed services — leave them completely alone

| URL | What happens | Do you request indexing? |
|---|---|---|
| `/services/game-development/` | 301 → `/services/mobile-app-development/` | ❌ **No** |
| `/services/digital-marketing/` | 301 → `/services/` | ❌ **No** |
| `/services/blockchain-development/` | 301 → `/services/custom-software/` | ❌ **No** |
| `/services/cloud-saas-development/` | 301 → `/services/custom-software/` | ❌ **No** |
| `/services/ai-data-science-solutions/` | 301 → `/services/ai-chatbots-development/` | ❌ **No** |

**Why not:** a 301 is a message to Google saying *"this moved, send the ranking
to the new address."* Google reads that message the next time it crawls the URL
— which it will do on its own, because it already knows the URL exists.

Requesting indexing on a redirected URL does nothing useful. What you want is
for these to **drop out of the index naturally over 4–8 weeks** while their
value transfers to the destination page. That process is automatic and you
cannot speed it up.

You will see **"Page with redirect"** climbing in Search Console → Pages. That
is not an error. **That is the migration working.** Do not try to fix it.

> Note: three of those five URLs (`blockchain`, `cloud-saas`,
> `ai-data-science`) **already return 404 on your live site today** while still
> appearing in Google — one of them is even showing as a sitelink. The new site
> gives them a real destination for the first time. That is an improvement, not
> a loss.

## What you DO submit

**1. The sitemap — once.**

Search Console → Sitemaps → submit `https://labtechcrew.com/sitemap.xml`

**Leave the old sitemap submitted too.** Watching the old one drain while the
new one fills is your progress tracker.

**2. Request indexing for NEW pages only — about 8 of them.**

Search Console → URL Inspection → paste the URL → **Request Indexing**. These
pages have never existed, so Google has no reason to look for them yet:

- `/services/ai-voice-agents/`
- `/services/ai-automation/`
- `/services/custom-software/`
- `/services/wordpress-to-nextjs-migration/`
- `/portfolio/quranri/`
- `/how-we-work/`
- `/pricing/`
- `/work/`

That is it. There is a daily quota of roughly 10–12 requests, so this fits in
one sitting.

**3. Spot-check your top 5 existing pages** with URL Inspection → **Test Live
URL**, and read the *rendered* HTML, not just the response code. Confirm the
title is the one you expect. Do **not** request indexing — they are already
indexed, and the sitemap tells Google they changed.

## What NOT to do

- ❌ **Do not use the Change of Address tool.** That is only for moving to a
  different domain. Same domain with URL changes = plain 301s, which you have.
- ❌ **Do not remove URLs** with the Removals tool. It hides pages temporarily
  and interferes with the redirect signal.
- ❌ **Do not request indexing for redirected URLs.** No benefit, and it burns
  your daily quota.
- ❌ **Do not change titles, the Business Profile, or anything else in the same
  week.** One variable at a time. If rankings move you need to know why.

---

# The whole thing in ten lines

1. Run `npm run audit:gsc` on the Pages export you downloaded ⬅ **do this now**
2. Add redirects for anything it flags with clicks
3. Copy `wp-content/uploads` into `public/wp-content/uploads`
4. Back up WordPress, keep hosting 60 days
5. Fill the `TODO`s in `lib/site.ts`
6. Deploy to Vercel on the **temporary URL**
7. Test there — pages, form, mobile, speed, both audit scripts
8. Lower DNS TTL, verify GSC by DNS TXT, then switch the domain
9. First hour: check `robots.txt` says `Allow: /`, submit the sitemap, keep the old one
10. Request indexing for the 8 new pages. Leave everything else to Google.

Then wait. Traffic drops 10–30% in week one — that is normal. Back to baseline
by week four to six. **The failure signal is not the dip, it is no recovery
trend by week four.**
