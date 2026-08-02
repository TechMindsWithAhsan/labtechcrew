# Will I lose my SEO if I change from WordPress to Next.js?

**Short answer: no. SEO does not live in WordPress. It lives on your domain
and your URLs.**

Google has never indexed "your WordPress site." It has indexed a list of
addresses:

```
labtechcrew.com/
labtechcrew.com/about/
labtechcrew.com/services/website-development/
labtechcrew.com/portfolio/ppinstall/
...
```

Google does not know or care what software produced the HTML at those
addresses. WordPress, Next.js, hand-written PHP, a person typing files — if
the address still returns a page with the same title and the same subject,
your ranking stays.

**You only lose rankings when you break one of six things.** Here is each one,
and exactly what has been done about it.

---

## The six ways a rebuild kills SEO — and where you stand

| # | What kills it | Your status |
|---|---|---|
| 1 | **URLs change** and the old ones 404 | ✅ Every one of your 19 indexed URLs is preserved, trailing slash included |
| 2 | **Missing or chained redirects** | ✅ 24 rules, every one tested to resolve in exactly **one hop** to a 200 |
| 3 | **Titles and descriptions rewritten** | ✅ Frozen byte-for-byte (see the table below) |
| 4 | **`noindex` accidentally shipped** | ✅ Production guard in code + a launch-hour check |
| 5 | **Images 404** because the folder moved | ⚠️ **You must do Step 1 of the launch checklist.** This is the one still open. |
| 6 | **Site becomes slower or JS-only** | ✅ Faster than before, and every page is server-rendered |

---

## What transfers automatically, with no work from you

These are attached to the **domain**, not the software:

- **Domain authority and age** — labtechcrew.com is the same domain
- **Backlinks** — every link pointing at you still points at the same address
- **Search Console property and history** — same domain, so all your data stays
- **Google Business Profile and your 4 five-star reviews** — a completely
  separate system (see below)
- **Facebook, LinkedIn and Instagram profiles** — separate, untouched

You do **not** need to re-verify Search Console, re-submit the site, or
"re-crawl from scratch." Your property continues.

---

## Every indexed page: exactly what changes

I served the new site locally and compared each title against what Google has
today.

| URL | Title tag | Status |
|---|---|---|
| `/` | Custom AI Agents & Knowledge Assistants \| LabTechCrew | ✅ **Identical** |
| `/about/` | LabTechCrew : Web Development & Digital Solutions Company USA | ✅ **Identical** |
| `/services/website-development/` | LabTechCrew: Custom Websites & E-Commerce Web Development | ✅ **Identical** |
| `/services/mobile-app-development/` | LabTechCrew: Mobile App iOS & Android Development USA | ✅ **Identical** |
| `/services/ai-chatbots-development/` | LabTechCrew: AI Services in USA - Data Science & Chatbot Solutions | ✅ **Identical** |
| `/services/graphics-design/` | LabTechCrew: Graphic Design Services in the USA | ✅ **Identical** |
| `/services/brand-strategy/` | LabTechCrew: Brand Strategy Services in USA | ✅ **Identical** |
| `/portfolio/ppinstall/` | LabTechCrew: PPInstalls Affiliate Marketing Platform Development | ✅ Identical, **typo fixed** ("Labtehcrew" → "LabTechCrew") |
| `/portfolio/uload/` | LabTechCrew: uLoad - Delivery - Mobile App Development USA | ✅ **Identical** |
| `/portfolio/tradermind/` | LabTechCrew: TraderMind Market Analysis Platform Development | ✅ **Identical** |
| `/portfolio/frame-x-labs/` | LabTechCrew: FrameXLabs Web Development & Integration USA | ✅ **Identical** |
| `/portfolio/ottenheimer-publishers/` | LabTechCrew: Ottenheimer Publishers Custom Web Development | ✅ **Identical** |
| `/portfolio/the-digital-samurais/` | LabTechCrew: Digital Samurai WordPress Website Design & SEO | ✅ **Identical** |
| `/portfolio/lift-and-learn-fitness/` | LabTechCrew: Lift and Learn Fitness Custom Mobile App USA | ✅ **Identical** |
| `/services/` | Software, App & AI Development Services \| LabTechCrew | 🔄 **Changed on purpose** — was "Best Web Development Company", an unsubstantiated superlative sitting in your Google snippet, and a term you cannot rank for |
| `/portfolio/` | 301 → `/work/` | 🔄 Index moved; **all 7 child case studies keep their `/portfolio/` addresses** |
| `/contact/` | Contact LabTechCrew — Get a Project Estimate | 🔄 **Changed on purpose** — dropped "Top Software Development Company USA" |
| `/services/game-development/` | 301 → `/services/mobile-app-development/` | 🔄 Service retired, equity redirected |
| `/services/digital-marketing/` | 301 → `/services/` | 🔄 Service retired, equity redirected |

### A bug this comparison caught

The new site's title template was appending `| LabTechCrew` to titles that
already began with the brand, producing:

> LabTechCrew: AI Services in USA - Data Science & Chatbot Solutions **| LabTechCrew**

Every preserved title was quietly being changed — the exact thing this whole
migration exists to prevent, and completely invisible in a browser. It is
fixed, and the fix is documented in the code so it cannot come back.

---

## Your sitelinks (Contact, Services, Portfolio, AI & Data Science…)

Those six blue links under your main result are **sitelinks**. Important facts:

- **You cannot control them directly.** There is no setting, no markup, no
  submission. Google generates them from your site structure and internal
  linking.
- **They usually disappear for a few weeks after any migration**, then come
  back once Google has recrawled and re-understood the structure. Two to six
  weeks is typical.
- They come back **because** the URLs and internal linking are preserved —
  which they are.
- The new site also emits **BreadcrumbList** structured data on every page,
  which the old site did not. That helps Google re-establish the hierarchy
  faster, and it replaces the ugly URL line in your search result.

**Two of your current sitelinks will change, and both are improvements:**

- **"Game Development Services"** will disappear — you are retiring that
  service. It 301s to mobile app development, so the link equity moves rather
  than evaporates.
- **"AI & Data Science Solutions"** currently points at a page that **already
  404s on your live site.** Google is showing a sitelink to a broken page
  right now. The new site 301s it to your AI page, so a visitor who clicks it
  finally lands somewhere real.

---

## Your Google Business Profile — the important part

The panel on the right of your screenshot (Lab Tech Crew · 5.0 ★ · 4 Google
reviews · Software company · Phone · Open 24 hours) is **not part of your
website.** It lives in Google Business Profile, a separate product.

**Rebuilding the website does not touch it. At all.** Your 4 reviews, your
5.0 rating, your Facebook 5/5 — none of it is affected by changing your tech
stack.

It only breaks if you break it. There are two ways to do that:

### ⚠️ I need to correct advice I gave you earlier

Earlier in this project I told you to get a US phone number with an area code
matching your Texas address, and that your 929 number was a problem.

**Seeing this screenshot, that advice was wrong for your situation.** Here is
why:

Your Google Business Profile is **live, verified, and carrying 4 five-star
reviews** with `+1 929-563-2844` as its phone number. Reviews are the single
hardest asset to rebuild — you cannot buy them back, and you cannot transfer
them.

If your new website shows a **different** phone number from your Business
Profile, you create a NAP (Name, Address, Phone) mismatch across your web
presence. That weakens local ranking signals. And if you go into the Business
Profile to change the phone or add a Texas address, you trigger
re-verification — and if the address you submit is a registered agent or a
virtual office, **Google can suspend the profile.** A suspended profile hides
your reviews and is genuinely hard to recover.

**So: launch the new site with `+1 929-563-2844`, exactly as your Business
Profile has it.**

An area code that does not match the state is a cosmetic oddity that almost no
buyer notices. A suspended profile costs you four five-star reviews. That is
not a close call.

**Then, 30+ days after the migration is stable**, if you still want a Texas
number, do it as a separate deliberate project:
1. Get the Texas number and let it ring alongside the old one
2. Add it to your Business Profile as an **additional** phone, not a replacement
3. Update it on the website at the same time
4. Wait a few weeks with both live
5. Only then retire the 929 number

One change at a time. Never during a migration.

### The other rule

**Do not touch the Business Profile in the same week you switch DNS.** If
rankings move, you want one variable, not three. Website first. Profile later,
if at all.

---

## What actually happens after you switch — the honest timeline

| When | What you will see |
|---|---|
| Day 0–2 | Crawl activity spikes. Sitelinks may vanish. Nothing is wrong. |
| Day 3–7 | **Traffic down 10–30%. This is normal on a perfect migration.** |
| Week 2–4 | URLs recrawled. Traffic climbing. Sitelinks start returning. |
| Week 4–8 | At or near your old numbers. Sitelinks generally back. |
| Week 8–12 | Stable. Still down more than 10%? That is a real problem — tell me. |
| Image search | Slower than web search. Google publishes no figure for how much. |

**The failure signal is not the dip. It is no upward trend by week four.**

Tell your partners this number *before* you launch. If they see a 25% drop in
week one having been promised "no impact", you will be forced to make panicked
changes that cause the actual damage.

---

## The one thing still outstanding

Your images are indexed at addresses like:

```
labtechcrew.com/wp-content/uploads/2025/08/labtechcrew.png
```

When DNS moves to Vercel, WordPress is gone and **every one of those returns
404** unless you bring the folder with you.

**Do this before launch:**

1. Download `/wp-content/uploads/` from your WordPress hosting
2. In the Next.js project, create `public/wp-content/uploads/`
3. Paste everything in
4. Run `npm run dev` and open
   `http://localhost:3000/wp-content/uploads/2025/08/labtechcrew.png`
   → it must show the image

That is the whole fix. Same paths, zero risk, and your Google Image rankings
survive.

---

## The three-line summary

1. **Your SEO is attached to labtechcrew.com and its URLs, not to WordPress.**
   Both are preserved, so it transfers.
2. **Every title and description Google has indexed is frozen byte-for-byte**
   on launch day. Improve them at week 6–8, one at a time, after recovery is
   confirmed.
3. **Keep the 929 phone number** so it matches your Google Business Profile.
   Your 4 five-star reviews are worth more than a tidy area code.
