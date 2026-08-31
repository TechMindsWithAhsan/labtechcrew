---
title: "We migrated our own site off WordPress. Here are the numbers."
slug: wordpress-migration-numbers
description: "Redirect map, metadata freeze, the two-hop chain the docs said would not happen, and the recovery curve."
draft: false
---

We ran labtechcrew.com on WordPress through July 2026. We moved it to Next.js in August 2026. This is what actually happened — not the marketing version, the real one, including the parts that went wrong.

## Why we moved

We needed to prove the architecture on our own platform before offering it to clients. The homepage already says "we proved the architecture on our own platform before offering it to anyone else," and that is exactly what happened. The WordPress site was the starting point, but it was not the product we wanted to sell.

## The starting numbers

Before touching anything, here's the one hard number we had: 19 indexed pages in Google Search Console. We didn't capture formal Core Web Vitals or PageSpeed scores going in, the WordPress site was small enough that the indexed page count was the metric that mattered for scoping the redirect map, and that's where our benchmarking energy went. The performance story is what came out after, not what went in.

## The redirect map

This is the part every migration guide glosses over and every migration actually lives or dies on. If a single URL that Google has indexed doesn't 301 redirect correctly to its new equivalent, you lose that page's ranking history, sometimes permanently.

We had 37 legacy URLs indexed or linked internally: 19 that Google had indexed, plus non-canonical internal links, WordPress archive paths, and a handful of URLs that already 404'd on the live site but still appeared in search results. We built a redirect map of 24 rules to cover all of them, matching WordPress's permalink structure to the new Next.js routes.

We used `npm run audit:gsc` against a Google Search Console Pages export to identify every URL Google actually had, then wrote redirect rules in `config/redirects.mjs` to cover each one. The auditor ranks URLs by clicks, so you fix what matters first.

## The two-hop chain the docs said wouldn't happen

The Next.js docs say redirects resolve in one hop. Ours did not. Every legacy URL was taking two hops: the first redirect sent the browser to the destination without a trailing slash, and the second redirect added the slash, because `trailingSlash: true` is set in `next.config.ts` but Next.js does not append the slash to the redirect `destination`. So a request to `/services/website-development/` would hit the redirect, get sent to `/services/website-development` (no slash), and immediately redirect again to `/services/website-development/`. Two hops, not one.

This was not in the documentation. It was caught by testing with `curl -I`, which showed `hops=2` instead of `hops=1`. The fix was writing every `destination` with a trailing slash, a one-line change that affected every redirect rule in the map.

## Metadata freeze

During the migration, we froze every title tag and meta description byte-for-byte: the exact strings Google had indexed, reproduced in the new code, marked `KEEP` in the source so nobody could accidentally "improve" them. The only titles we changed were `/services/` (which had "Best Web Development Company" — an unsubstantiated superlative sitting in the Google snippet) and `/contact/` (which had "Top Software Development Company USA").

We also caught a bug in testing: the new site's title template was appending `| LabTechCrew` to titles that already began with the brand, silently changing every preserved title, the exact thing the migration exists to prevent. Fixed in `lib/seo.ts`.

## The recovery curve

This is the number that actually matters to a business owner reading this: how long until organic traffic returned to (or exceeded) pre-migration levels, and what did the dip look like along the way?

We're still inside the recovery window as this post goes live, so we don't have a full week-by-week graph to show yet. What we can say is that the pattern matches what migration research consistently describes: a 10–30% traffic dip in the first week, gradual climb through weeks two to four, and a return to baseline somewhere around week four to eight on a well-executed migration. The failure signal isn't the dip; it's no upward trend by week four. We're watching Search Console daily and the trend line is moving the right direction.

## What we'd do differently

Two things, both of which come from the problems we actually hit rather than theoretical best practices:

First, we'd test every redirect with `curl -I` from day one, not just checking that the final status is 200, but verifying the hop count. The two-hop chain we discovered would have been caught in the first five minutes of that kind of testing, instead of after we'd already gone live. The docs said one hop; reality said two. Trust but verify.

Second, we'd freeze metadata earlier in the process, before any code changes start, not during them. The title-template bug we caught was a close call: the new site was silently rewriting every preserved title, and we only noticed because we were checking byte-for-byte. A systematic pre-migration audit of every title and description, locked down before the first line of new code ships, would have made that impossible to miss.

## What this means if you're considering the same move

If your WordPress site is under 19 indexed pages, a migration like this is a focused project: the redirect map and metadata freeze are the bulk of the work, and both are doable in a sprint if you're methodical about it. You should expect a temporary traffic dip in the 10–30% range before recovery, based on what migration research consistently shows.

If you're weighing whether this move is right for your business at all, our [companion post on WordPress vs. Next.js](/blog/wordpress-vs-nextjs) covers when WordPress is still the better answer. We moved because our situation called for it, not because WordPress is universally wrong.
