---
title: "We migrated our own site off WordPress. Here are the numbers."
slug: wordpress-migration-numbers
description: "Redirect map, metadata freeze, the two-hop chain the docs said would not happen, and the recovery curve."
draft: true
---

# We migrated our own site off WordPress. Here are the numbers.

We ran labtechcrew.com on WordPress through July 2026. We moved it to Next.js in August 2026. This is what actually happened — not the marketing version, the real one, including the parts that went wrong.

## Why we moved

We needed to prove the architecture on our own platform before offering it to clients. The homepage already says "we proved the architecture on our own platform before offering it to anyone else," and that is exactly what happened. The WordPress site was the starting point, but it was not the product we wanted to sell.

## The starting numbers

Before touching anything, here's where the WordPress site actually stood:

- Core Web Vitals (LCP / CLS / INP): [FILL IN — no data in repo]
- PageSpeed Insights score, mobile: [FILL IN — no data in repo]/100
- Number of indexed pages in Google Search Console: 19
- Monthly organic traffic (rough average, last 3 months pre-migration): [FILL IN — no data in repo]
- Number of active plugins: [FILL IN — no data in repo]

## The redirect map

This is the part every migration guide glosses over and every migration actually lives or dies on. If a single URL that Google has indexed doesn't 301 redirect correctly to its new equivalent, you lose that page's ranking history — sometimes permanently.

We had 37 legacy URLs indexed or linked internally — 19 that Google had indexed, plus non-canonical internal links, WordPress archive paths, and a handful of URLs that already 404'd on the live site but still appeared in search results. We built a redirect map of 24 rules to cover all of them, matching WordPress's permalink structure to the new Next.js routes.

We used `npm run audit:gsc` against a Google Search Console Pages export to identify every URL Google actually had, then wrote redirect rules in `config/redirects.mjs` to cover each one. The auditor ranks URLs by clicks, so you fix what matters first.

## The two-hop chain the docs said wouldn't happen

The Next.js docs say redirects resolve in one hop. Ours did not. Every legacy URL was taking two hops: the first redirect sent the browser to the destination without a trailing slash, and the second redirect added the slash — because `trailingSlash: true` is set in `next.config.ts` but Next.js does not append the slash to the redirect `destination`. So a request to `/services/website-development/` would hit the redirect, get sent to `/services/website-development` (no slash), and immediately redirect again to `/services/website-development/`. Two hops, not one.

This was not in the documentation. It was caught by testing with `curl -I`, which showed `hops=2` instead of `hops=1`. The fix was writing every `destination` with a trailing slash — a one-line change that affected every redirect rule in the map.

## Metadata freeze

During the migration, we froze every title tag and meta description byte-for-byte — the exact strings Google had indexed, reproduced in the new code, marked `KEEP` in the source so nobody could accidentally "improve" them. The only titles we changed were `/services/` (which had "Best Web Development Company" — an unsubstantiated superlative sitting in the Google snippet) and `/contact/` (which had "Top Software Development Company USA").

We also caught a bug in testing: the new site's title template was appending `| LabTechCrew` to titles that already began with the brand, silently changing every preserved title — the exact thing the migration exists to prevent. Fixed in `lib/seo.ts`.

## The recovery curve

This is the number that actually matters to a business owner reading this: how long until organic traffic returned to (or exceeded) pre-migration levels, and what did the dip look like along the way?

- Week 1 post-launch: [FILL IN — no data in repo]% of baseline traffic
- Week 2: [FILL IN]%
- Week 4: [FILL IN]%
- Week 8: [FILL IN]%
- Week 12: [FILL IN]%

General expectations from migration research: traffic typically drops 10–30% in week one on a well-executed migration, climbs through weeks two to four, and returns to baseline by week four to eight. The failure signal is not the dip — it is no upward trend by week four. But those are ranges, not our actual numbers, and this section needs the real data to be credible.

## What we'd do differently

[FILL IN — no retrospective data in repo]

## What this means if you're considering the same move

If your WordPress site is under 19 indexed pages, a migration like this is a [FILL IN — no data on project duration]-week project, and you should expect a temporary traffic dip in the 10–30% range before recovery, based on what migration research consistently shows.

If you're weighing whether this move is right for your business at all, our [companion post on WordPress vs. Next.js](/blog/wordpress-vs-nextjs) covers when WordPress is still the better answer — we moved because our situation called for it, not because WordPress is universally wrong.
