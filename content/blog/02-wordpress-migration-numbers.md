---
title: "We migrated our own site off WordPress. Here are the numbers."
slug: wordpress-migration-numbers
description: "Redirect map, metadata freeze, the two-hop chain the docs said would not happen, and the recovery curve."
draft: true
---

# We migrated our own site off WordPress. Here are the numbers.

> **IMPORTANT — READ BEFORE PUBLISHING:** This post is supposed to be your single most credible piece of content, because it's the one where you show real numbers from your own migration instead of asking a reader to trust a claim. I've built the full structure and the analysis around each section below. Everywhere you see a bracket like [X], that's a spot where your actual number, date, or detail needs to go. Do not publish this with placeholder numbers left in — that would directly contradict the "we publish no number without the method" standard the rest of your site has already set.

We ran labtechcrew.com on WordPress until [DATE]. We moved it to Next.js in [MONTH YEAR]. This is what actually happened — not the marketing version, the real one, including the parts that went wrong.

## Why we moved

[Fill in: what was the actual trigger? Slow load times? A specific plugin conflict? Wanting to prove your own stack before selling it to clients — this is implied by your homepage copy "we proved the architecture on our own platform before offering it to anyone else." If that's the real reason, say so directly here.]

## The starting numbers

Before touching anything, here's where the WordPress site actually stood:

- Core Web Vitals (LCP / CLS / INP): [X]
- PageSpeed Insights score, mobile: [X]/100
- Number of indexed pages in Google Search Console: [X]
- Monthly organic traffic (rough average, last 3 months pre-migration): [X]
- Number of active plugins: [X]

## The redirect map

This is the part every migration guide glosses over and every migration actually lives or dies on. If a single URL that Google has indexed doesn't 301 redirect correctly to its new equivalent, you lose that page's ranking history — sometimes permanently.

[Fill in: how many URLs did you have to map? Did you export from WordPress's permalink structure and match it to your new Next.js route structure? Any pages you decided to intentionally kill (410) instead of redirect, and why?]

We used [tool/method] to build the redirect map, covering [X] URLs.

## The two-hop chain the docs said wouldn't happen

[This is clearly a real, specific incident you experienced — I've kept it in the outline because it sounds like exactly the kind of concrete, credible detail that makes this post worth reading. Fill in: what actually happened? A redirect chain (URL A → URL B → URL C instead of a direct A → C) that some tool or documentation claimed shouldn't occur under normal config? What caused it, and how did you find and fix it?]

## Metadata freeze

[Fill in: what does "metadata freeze" refer to in your migration — did you lock title tags and meta descriptions exactly as-is during the transition to isolate ranking impact from content changes vs. platform changes? If so, explain that decision and what you learned from it.]

## The recovery curve

This is the number that actually matters to a business owner reading this: how long until organic traffic returned to (or exceeded) pre-migration levels, and what did the dip look like along the way?

- Week 1 post-launch: [X]% of baseline traffic
- Week 2: [X]%
- Week 4: [X]%
- Week 8: [X]%
- Week 12: [X]%

[Consider adding a simple line chart or table here once you have the real data — this is the single most valuable visual you could put in this post.]

## What we'd do differently

[Fill in: with hindsight, what would you change about the process? Any step you rushed that you shouldn't have, or over-engineered that you didn't need to?]

## What this means if you're considering the same move

If your WordPress site is under [X] indexed pages, a migration like this is a [X]-week project, and you should expect a temporary traffic dip in the [X]% range before recovery, based on what we saw.

If you're weighing whether this move is right for your business at all, our [companion post on WordPress vs. Next.js](/blog/wordpress-vs-nextjs) covers when WordPress is still the better answer — we moved because our situation called for it, not because WordPress is universally wrong.

---

*[NOTE FOR AHSAN: Once you fill in the real numbers, this becomes one of your strongest pieces of content — it's the exact kind of "here's a number, and here's the method behind it" content your site already promises. Send me the real answers to the bracketed questions above and I'll turn this into the final polished version.]*
