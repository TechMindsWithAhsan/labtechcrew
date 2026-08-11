# LabTechCrew — Launch Checklist

**From: the new Next.js site sitting on your computer**
**To: live on labtechcrew.com, with your Google rankings intact**

Work through this **in order**. Do not skip ahead to Vercel — three things must
happen before the new site is allowed to touch the domain.

Tick each box as you finish it. Nothing here is optional.

---

# ⛔ STEP 0b — Client permission for the portfolio screenshots

Eight case studies now carry real screenshots. Seven of them are other
people's businesses, and that is a contract question, not a copyright one.

- [ ] **One email per client, reply saved.** See `LICENSES.md` for the exact
      wording. Most service agreements are silent on portfolio rights or
      require written consent — and an NDA client who finds their site in your
      portfolio has a named claim against the LLC. Seven emails, one afternoon,
      and it never comes back.

- [ ] **Ottenheimer specifically.** Their hero showcases commercially published
      book cover art. Whether they are entitled to display it is their
      question, but ask — if the answer is unclear, swap in a different section
      of the same site. The case study does not depend on that screenshot.

- [ ] **TraderMind caption stays accurate.** The price chart is a TradingView
      widget and the page says so. Do not let anyone "tighten" that caption
      into a claim that we built the charting engine — a technical buyer will
      catch it, and it costs more than the Detection and Auto Trendline work
      (which genuinely is ours) earns.

---

# ⛔ STEP 0a — Two people questions, before the About page is public

Both of these are about real named individuals, so they are not cosmetic.

- [ ] **Ahmed's consent, in writing.** Syed Ahmed Ali Shah is listed on the
      About page as *Client growth & accounts*. He is currently a **full-time
      Customer Service Officer at Habib Bank Limited**. Most banks have an
      outside-employment clause; being named as staff of another company on a
      public website can breach it. Ask him, get a yes in writing, and only
      then deploy the About page. If the answer is "not yet", delete the entry
      from `lib/site.ts` — it is one block and the page reflows on its own.

- [ ] **Do not add his LinkedIn URL yet.** His headline still reads *Customer
      Service Officer at Habib Bank Limited*. Linking it from a software
      agency's team page raises exactly the question you do not want a US buyer
      asking mid-evaluation. Add the URL once the headline reflects this role.

- [ ] **Nasir Raza and Mahwish Hasan** appear in public directories as
      LabTechCrew staff but are **not** on the site. If they are current and
      willing, add them the same way — real name, real role, real bio. If they
      have moved on, consider getting those directory listings corrected.

---

# ⛔ STEP 0 — Do this today. It cannot be recovered later.

Google Search Console only keeps **16 months** of data on a rolling window.
Every day you wait, one day falls off the back and is gone permanently. If you
lose it, you cannot build a safe redirect map, and you cannot prove whether
the migration worked or failed.

- [ ] **Search Console → Performance → set date range to 16 months → Pages tab → Export → CSV**
      Save as `gsc-pages-16mo.csv`
- [ ] **Search Console → Performance → 16 months → Queries tab → Export → CSV**
      Save as `gsc-queries-16mo.csv` (this is your baseline for "did it recover")
- [ ] **Search Console → Links → Top linked pages → Export**
      These carry your backlinks. They *must* redirect correctly.
- [ ] **Search Console → Indexing → Pages → Export**
- [ ] Write down today's numbers so you can compare later:

| Metric | Today's number | Date |
|---|---|---|
| Total clicks (last 3 months) | | |
| Total impressions (last 3 months) | | |
| Average position | | |
| Number of indexed pages | | |

> **Why this matters:** in week one after launch you will see traffic drop.
> That is normal. Without this baseline you will not know whether it is the
> normal dip or a real problem, and you will either panic or ignore a disaster.

---

# 🖼 STEP 1 — Images: check first, then copy ONLY what is clean

**⚠️ This step was rewritten. Do not bulk-copy the uploads folder.**

Earlier guidance here said to copy your whole `/wp-content/uploads/` folder
into the new project. That was wrong for your situation, and following it would
have caused a bigger problem than it solved.

## Why

Your old uploads folder contains images you should NOT republish:

- three stock JPGs with filenames matching Shutterstock/Freepik comp previews,
  with no purchase receipt found
- `Team-4.jpg`, `Team-5.jpg`, `Team-6.jpg` — presented as named staff including
  a "Founder, CEO", the signature of a WordPress theme demo import
- seven client logos with no written permission on file
- a zombie game screenshot of unverified origin

Copying that folder means **republishing all of it under your own domain, on a
brand-new US LLC.** Getty and Shutterstock run automated reverse-image
enforcement. A 404 is the cleanest way to un-publish an image you should not
have published in the first place.

There is also a technical point that undercuts the original reasoning: **an
image file with no page referencing it eventually drops out of Google Images
anyway.** Google needs the image embedded in an indexed page. Orphan files fall
out regardless of whether the URL still resolves.

## Do this instead

### 1a. Find out whether you have any image traffic at all

- [ ] Search Console → **Performance** → **Search type: Image** → last 16 months
- [ ] Write the number down: ______ clicks

For a small agency site this is usually near zero. **If it is under about 20
clicks across 16 months, skip the rest of this step entirely.** You are
protecting nothing.

### 1b. Copy only what is clean and what you will actually use

- [ ] Your logo file
- [ ] Any real screenshots of **your own** projects that you own outright
- [ ] Nothing else

Put them in `public/wp-content/uploads/` at their **original paths**, so any
that do carry image rankings keep them.

- [ ] Record every file you keep in `LICENSES.md`

### 1c. Let the rest 404 — deliberately

Every image you do not copy will return 404. For the unlicensed ones that is
the outcome you want. For the rest, the loss is a handful of image impressions
against a real legal exposure. Not a close call.

---

# 🖼 STEP 1b — The site currently has no images. That is temporary.

Be aware of what this means: **the new site ships with zero photographs.** Every
image on the old site was either unlicensed, unverifiable, or a theme demo
asset, so none of them could come across.

A US buyer landing on an agency site with no visuals will notice. Before you
run paid traffic to it, add:

- [ ] Real screenshots of QuranRI — including the logged-in features
- [ ] Real screenshots of PPInstalls and uLoad
- [ ] Real photographs of the four founders
- [ ] Your logo as an SVG

These do not block launch — a clean text site beats a site with a demand letter
attached — but they should land within the first two weeks.

Safe sources for anything else: **Unsplash** and **Pexels** (free for
commercial use, no attribution required — read the current terms, avoid
recognisable faces and third-party brands), or commissioned illustration.
Record everything in `LICENSES.md`.

# 💾 STEP 2 — Back up the old site completely

Once DNS moves, you cannot get anything back from WordPress.

- [ ] Full site backup through your host (files + database), downloaded to your computer
- [ ] Export the database separately as `.sql`
- [ ] Save a copy of `wp-content/uploads/` — the FULL folder, as an archive on your
      computer. This is your backup, NOT something you publish. Only the clean
      files from Step 1b go into the new project.
- [ ] **Do not cancel your WordPress hosting for at least 60 days.** If
      something goes badly wrong you want the ability to point DNS back.
- [ ] Take screenshots of your 5 most important pages, so you can compare content later

---

# ✍️ STEP 3 — Fill in the code. The site cannot launch with placeholders.

Open the project in VS Code and search for `TODO`.

### 3a. `lib/site.ts`

- [ ] `legalName` — exactly as filed in Texas
- [ ] `address` — one real, staffed street address
      *(not a virtual office, not a PO box — both are ineligible for a Google
      Business Profile, and a suspended profile is worse than no profile)*
- [ ] `contact.phone` — **already set to (929) 563-2844. Leave it.** It matches
      your verified Google Business Profile, which carries your 4 five-star
      reviews. A mismatch between site and profile is a NAP inconsistency, and
      editing the profile can trigger re-verification and suspension. Change it
      only 30+ days after launch, as a separate deliberate project.
- [ ] `pricingFloorUsd` — decide the number as a team. Set it and the pricing
      copy changes automatically.
- [ ] `TEAM` — replace all three `TODO` people with real names, roles and
      LinkedIn URLs. **The US partner is the single most valuable line on the
      whole site.**

### 3b. `app/globals.css`

- [ ] `--color-brand-500` — sample the exact violet from your logo file and
      paste the hex. Everything else is derived from it.

### 3c. `components/ui/logo.tsx`

- [ ] Replace the placeholder `LogoMark` with your real logo exported as **SVG**.
      Do not use the 512×512 PNG from WordPress — it will look blurry.

### 3d. `lib/data/work.ts`

- [ ] Search for `riskFlags` and resolve every single one. They are in the code
      on purpose so they cannot be quietly forgotten.
- [ ] **QuranRI:** add screenshots of the logged-in features — voice tutor,
      canvas, image generation, courses. A buyer who clicks through and cannot
      find a feature you claimed is a buyer you have lost.
- [ ] **QuranRI:** if the iOS and Android apps are live, add the store URLs and
      add `'iOS', 'Android'` to `platforms`. If they are not live yet, leave it
      as `Web` only.
- [ ] **Lift and Learn Fitness:** add real app screenshots, or delete this case
      study. It currently has none.
- [ ] **PPInstalls and uLoad:** replace the shared stock photos with real
      product screenshots.

---

# ⚖️ STEP 4 — Legal cleanup. Do not launch a US LLC without this.

### 4a. Images — open `LICENSES.md` and clear every **BLOCKED** row

- [ ] Find the purchase receipt for the three shared stock JPGs, **or delete them**
- [ ] Get **written email permission** for each of the 7 client logos, **or remove the logo wall**
- [ ] Confirm the three team photos are real employees. **If they are stock models, delete them.**
- [ ] Verify the game screenshot is yours. **If not, delete it.**
- [ ] Fill in the licence table for every image you keep

> Getty and Shutterstock run automated reverse-image scanning. Demand letters
> run $800–$8,000 per image. `LICENSES.md` is your defence when one arrives.

### 4b. Claims

- [ ] Ottenheimer's 230% / 150% / 40% figures — get **written client sign-off**,
      or leave them out (they are already removed from the new site)
- [ ] Every testimonial you want to add must have a real name, role, company and
      ideally a LinkedIn link. **Two verifiable beat eight unverifiable.**
- [ ] No "Best", "#1", "Top", "Award Winning" anywhere

### 4c. Legal pages — `lib/data/legal.ts`

- [x] Fill in every `[TODO]`: your service providers, retention periods, the
      analytics and ad platforms you actually use
- [x] **Pay a US attorney to review the privacy policy, terms, and your
      MSA/SOW template.** A few hundred dollars. Cheapest insurance you will buy.
- [x] Set the "Last updated" date to the day they sign it off

> ✅ Done August 7, 2026 — the Privacy Policy, Terms of Service and Cookie
> Policy were reviewed and approved by a licensed US attorney and are in
> force; all three pages carry "Last updated August 7, 2026". Note this
> sign-off covers those three site pages only — a separate MSA/SOW template,
> if you use one, is its own engagement document.

---

# 🚀 STEP 5 — Deploy to Vercel, but NOT on your domain yet

This is the part people rush. Deploy first, test on the temporary URL, and
only touch DNS when everything passes.

### 5a. Put the code on GitHub

- [ ] Create a **private** repo on github.com
- [ ] In your project folder:
```bash
git init
git add .
git commit -m "New LabTechCrew site"
git branch -M main
git remote add origin https://github.com/YOUR-NAME/labtechcrew.git
git push -u origin main
```
- [ ] Confirm `.env.local` did **not** get uploaded (it is in `.gitignore` — check anyway)

### 5b. Connect Vercel

- [ ] Sign up at vercel.com with your GitHub account
- [ ] **Add New → Project → import your repo**
- [ ] Framework preset: Next.js (it will detect this)
- [ ] Click **Deploy**
- [ ] You get a URL like `labtechcrew-abc123.vercel.app`. **This is your staging site.**

### 5c. Environment variables — read this carefully

Vercel → your project → Settings → Environment Variables.

| Variable | Value | Which environments |
|---|---|---|
| `MONGODB_URI` | your Atlas connection string | Production + Preview |
| `LEAD_NOTIFY_EMAIL` | where leads should arrive | Production + Preview |
| `LEAD_WEBHOOK_URL` | Slack or WhatsApp webhook | Production + Preview |
| `RESEND_API_KEY` | from resend.com | Production + Preview |
| `TURNSTILE_SECRET_KEY` | from Cloudflare | Production + Preview |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | from Cloudflare | Production + Preview |
| `NEXT_PUBLIC_GA_ID` | your GA4 ID | **Production only** |
| `NEXT_PUBLIC_META_PIXEL_ID` | your Pixel ID | **Production only** |

- [ ] ⚠️ **Do NOT set `NEXT_PUBLIC_SITE_ENV`.** Leave it out entirely. Vercel
      sets `VERCEL_ENV` automatically, and the code already uses it. If you set
      `NEXT_PUBLIC_SITE_ENV=production` on all environments, **your preview
      deployments become indexable** and Google will find duplicate copies of
      your whole site.
- [ ] Redeploy after adding variables (Deployments → ⋯ → Redeploy)

### 5d. Set up MongoDB Atlas

- [ ] Create a free cluster at mongodb.com/atlas
- [ ] Database Access → create a user with a strong password
- [ ] Network Access → **Allow access from anywhere (0.0.0.0/0)** — Vercel's IPs
      are not fixed, so this is required
- [ ] Copy the connection string into `MONGODB_URI`

---

# 🧪 STEP 6 — Test the staging site properly

Open your `.vercel.app` URL. Work through all of this.

### Every page loads

- [ ] `/` `/services/` `/work/` `/how-we-work/` `/pricing/` `/about/` `/blog/` `/contact/`
- [ ] All 9 service pages
- [ ] All 8 case studies
- [ ] 4 location pages
- [ ] 3 legal pages
- [ ] Type a fake URL like `/does-not-exist/` → a proper 404 page appears

### The form actually works

- [ ] Submit the short form with your real email
- [ ] **Did the notification reach your phone?** If not, the whole site is
      decoration. Fix the webhook before anything else.
- [ ] Check MongoDB Atlas → Collections → the lead is saved
- [ ] Submit the long form. It should refuse to submit without a budget.
- [ ] Try a bad email like `abc` — it should show an error, not submit

### Mobile

- [ ] Open the staging URL **on your actual phone**, not just a resized browser
- [ ] The menu opens and closes
- [ ] The sticky bottom button is visible and tappable
- [ ] Nothing overlaps or scrolls sideways
- [ ] The phone number in the header dials when tapped

### Speed

- [ ] Run your staging URL through **pagespeed.web.dev**
- [ ] Mobile score should be 90+. If it is not, tell me before you go live.

### Search readiness

- [ ] Visit `your-url.vercel.app/robots.txt` → it should say **`Disallow: /`**
      (correct — staging must not be indexed)
- [ ] Visit `/sitemap.xml` → should list 32 URLs
- [ ] Run the homepage through **search.google.com/test/rich-results** → the
      Organization block should appear with no errors

### Redirects — the most important test

On your computer, in the project folder:

```bash
npm run audit:seo
```

- [ ] It says **"Every legacy URL resolves. No loops, no chains."**
- [ ] Then test against staging — replace the URL with yours:

```bash
curl -s -o /dev/null -L -w "hops=%{num_redirects} final=%{url_effective} code=%{http_code}\n" \
  https://YOUR-SITE.vercel.app/services/game-development/
```

Every legacy URL must show **`hops=1`** and **`code=200`**. Test at least these:

- [ ] `/services/game-development/`
- [ ] `/services/digital-marketing/`
- [ ] `/services/website-development/`
- [ ] `/portfolio/`
- [ ] `/2024/12/29/hello-world/`
- [ ] `/website-development/`

---

# 🧹 STEP 7 — Clean the old WordPress site (one hour, big payoff)

Do this while WordPress is still live. It improves what Google carries across.

- [ ] Delete the `hello-world` post
- [ ] Fix `siteurl` and `home` in the database from `http://` to `https://`
- [ ] Yoast → Search Appearance → set Categories and Authors to **"No"**
- [ ] Remove the stock photos and unsubstantiated claims you identified in Step 4

---

# 🌐 STEP 8 — DNS. The actual switch.

### 8a. One week before

- [ ] In your DNS provider, lower the **TTL on the A record to 300 seconds**
      (5 minutes). This lets you undo the switch quickly if something breaks.
- [ ] Verify Search Console using the **DNS TXT method**, not the file or HTML
      tag method. File verification disappears with the old site and you lose
      access to your own data on the worst possible day.

### 8b. Add the domain in Vercel

- [ ] Vercel → Settings → Domains → Add `labtechcrew.com`
- [ ] Also add `www.labtechcrew.com` and set it to **redirect to** `labtechcrew.com`
      *(apex is your canonical — it is what `metadataBase` uses)*
- [ ] Vercel shows you the DNS records it needs

### 8c. Switch — do this on a Tuesday or Wednesday morning

Never on a Friday. Never before a holiday.

- [ ] In your DNS provider, change the **A record** to Vercel's IP
      (or the CNAME, as Vercel instructs)
- [ ] ⚠️ **DO NOT TOUCH YOUR MX RECORDS.** MX records handle email. If you
      change or delete them, `info@labtechcrew.com` stops receiving mail and
      you will not notice for hours.
- [ ] Wait for Vercel to show "Valid Configuration" and issue the SSL certificate
      (usually 10–60 minutes)

---

# ⏱ STEP 9 — The first hour after going live

Do these in this order. The first one is the highest-consequence check on the
entire list.

- [ ] Open `labtechcrew.com/robots.txt`
      **It must say `Allow: /`, NOT `Disallow: /`.**
      If it says Disallow, your entire site is invisible to Google — stop and
      fix it immediately.
- [ ] View source on 5 pages and search for `noindex`. It should only appear on
      `/lp/` and `/styleguide/`.
- [ ] `labtechcrew.com/sitemap.xml` loads and shows 32 URLs
- [ ] Test one old image URL:
      `labtechcrew.com/wp-content/uploads/2025/08/labtechcrew.png` → must load
- [ ] **Submit the contact form on the live site.** Did the alert reach your phone?
- [ ] Check the padlock (SSL) is showing
- [ ] Open the site on your phone on mobile data, not wifi

### Search Console

- [ ] Submit `https://labtechcrew.com/sitemap.xml`
- [ ] **Keep the old sitemap submitted too.** Watching the old one drain and the
      new one fill is your progress tracker.
- [ ] URL Inspection → test the homepage → **"Test Live URL"** → check the
      *rendered* HTML, not just the response
- [ ] Do the same for one service page and one case study
- [ ] **Do not use the Change of Address tool.** That is only for changing
      domain. Same domain with URL changes = plain 301s, which you already have.

---

# 📊 STEP 10 — Weeks 1 to 6. Do not panic in week one.

### What is normal

| When | What you should see |
|---|---|
| Days 0–7 | **Traffic drops 10–30%. This is normal even on a perfect migration.** Crawl activity spikes. |
| Weeks 2–4 | Most URLs recrawled. Traffic climbing back. |
| Weeks 4–8 | At or near your baseline. |
| Weeks 8–12 | Stable. Still down more than 10% here = a real problem. |
| Image search | Slower than web search. No published figure for how much. |

**The failure signal is not the dip. It is no recovery trend by week four.**
Tell your partners this *before* launch, not after.

### Weekly, for six weeks

- [ ] Search Console → Performance → compare against your Step 0 baseline
- [ ] Search Console → Pages → look for:
      - "Page with redirect" going up = **correct and healthy**
      - "Soft 404" = a real bug, tell me
      - "Duplicate, Google chose different canonical" = a slash mismatch, tell me
- [ ] Check your leads are still arriving (submit a test form)
- [ ] After **day 28**, run pagespeed.web.dev again — that is the first day the
      field data reflects only the new site

### Also set up in week one

- [ ] **Bing Webmaster Tools** → verify → turn on **AI Performance**. It is free
      and it shows you the actual queries AI used when citing your content.
      Google withholds this.
- [ ] GA4 → confirm form submissions are being recorded as conversions

---

# 🔴 If something goes badly wrong

Because you lowered the TTL to 5 minutes in Step 8a, you can roll back fast.

1. Change the A record back to your WordPress host
2. Within ~5 minutes the old site is serving again
3. Tell me exactly what broke — do not start editing under pressure

Keep WordPress hosting alive for **60 days** so this option exists.

---

# The two things that decide whether this was worth it

**One.** Every legacy URL resolves in one hop to a 200. If you only verify one
thing before switching DNS, verify that.

**Two.** When a lead comes in, a human replies in under five minutes during
business hours, 9:00 AM – 6:00 PM. Everything on this site exists to make a US buyer
fill that form. Response speed is what converts them afterwards, and it is the
only part no competitor can copy from you.

Set the on-call rotation **before** launch, not after the first lead goes cold.
