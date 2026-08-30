---
title: "WordPress vs Next.js for a business website"
slug: wordpress-vs-nextjs
description: "The honest comparison, including when WordPress is still the right answer."
---

# WordPress vs Next.js for a business website

Most agencies that build in Next.js will tell you WordPress is dead. Most agencies that build in WordPress will tell you Next.js is overkill. Both are selling something. Here's the version without a horse in the race — or rather, with one, but said out loud: we build in Next.js, and we still think WordPress is the right call for some businesses. Here's how to tell which one you are.

## What WordPress actually gets right

WordPress runs a huge share of the web for a reason. If your site is mostly content — pages, posts, a handful of forms — WordPress lets a non-developer edit copy, swap images, and publish a blog post without opening a code editor. That's not a small thing. It's the difference between "call the agency" and "just fix it yourself" for the next five years of your site's life.

The plugin ecosystem is also genuinely deep. Need a booking calendar, a membership gate, a basic store? There's very likely a plugin for it, built and maintained by someone else, for free or a small license fee.

## Where WordPress starts to hurt

The same plugin ecosystem that makes WordPress fast to extend is also what makes it slow to run and hard to keep secure. Every plugin is another dependency that can go stale, conflict with another plugin, or become the entry point for an attack. A WordPress site that's been alive for three-plus years, with a dozen plugins layered on by different people over time, is usually the slowest, most fragile version of itself it's ever been.

Performance is the other wall. WordPress renders pages dynamically from a database on every request unless you bolt on a caching layer — and even then, Core Web Vitals (the speed metrics Google actually uses for ranking) are a constant fight against plugin bloat, unoptimized images, and render-blocking scripts from a theme you didn't write.

## What Next.js actually gets right

Next.js sites are typically pre-built (statically generated) or rendered on-demand at the edge, which means there's no database query standing between a visitor and the page. That translates directly into faster load times and better Core Web Vitals scores — which is not just a vanity metric, it's a ranking factor and a conversion factor. A site that loads in under a second converts measurably better than one that takes three.

There's no plugin graveyard to inherit. Every piece of functionality is code your team wrote and understands, which means fewer mystery bugs and a smaller attack surface — no plugin update breaking your checkout at 2am.

## Where Next.js starts to hurt

None of this is free. A Next.js site needs a developer to make almost any content or structural change — there's no default "just log in and edit the page" experience unless you deliberately build a CMS layer (like a headless CMS) on top, which is extra scope, extra cost, and one more thing that can break.

For a five-page brochure site with a blog nobody reads, that overhead usually isn't worth it. You'd be paying developer rates to move text around that a WordPress editor could handle for free.

## So which one is actually right for you

Use this as a rough filter, not a rule:

**WordPress is probably right if:**
- Your team needs to publish content constantly without developer involvement
- Your site is mostly content, not a product or application
- Budget is tight and you need something live fast
- You're fine hiring ongoing plugin/security maintenance, or doing it yourself

**Next.js is probably right if:**
- Speed and Core Web Vitals directly affect your business (e-commerce, lead gen at scale, anything ad-traffic-driven)
- You're building something closer to an application than a brochure — a dashboard, a portal, an AI-driven feature
- You want fewer long-term security/maintenance headaches, even if it costs more upfront
- Your content changes are infrequent enough that "call the developer" isn't a burden

## The honest bottom line

We build in Next.js because most of our clients are building AI-driven products and platforms, not blogs — and for that category of work, WordPress is the wrong tool from day one. But if someone comes to us wanting a five-page local business site they'll update twice a year, we'll say so, even though it's the smaller invoice. That's also the whole reason the next post in this series exists — we moved *our own* site off WordPress, and we're publishing exactly what that cost and what it broke.

---

*[NOTE FOR AHSAN: This draft is written from general technical knowledge and industry-standard comparisons. If you want to strengthen it further, consider adding: 1) A real example from a past client where you recommended WordPress instead of Next.js and why, 2) Any specific Core Web Vitals numbers you've seen improve on a real migration, 3) A specific plugin-conflict horror story if you have one — concrete anecdotes make this kind of post far more credible than generic claims.]*
