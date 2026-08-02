# LabTechCrew — Website Rebuild Blueprint

**Prepared for:** Ahsan Hayat & partners (LabTechCrew / forming Texas LLC)
**Scope:** Website rebuild spec + design system + SEO migration (WordPress/Elementor → Next.js + TypeScript + MongoDB)
**Date:** July 2026
**How to use this:** Feed this file to Claude Code in VS Code. It is written to be executable — every section is a spec, not an opinion piece. Section 12 has the exact build order and the prompts to paste.

---

## 0. Read this page first

I audited your live site (all 19 URLs), your sitemap, robots.txt, your Google presence, your LinkedIn page, and 10 competitor sites. Here is the honest summary.

**The migration is the easy part.** You have 19 pages. The redirect map is ~25 lines. Technically this is a two-week job.

**Three things are actually holding you back, and none of them are the tech stack:**

1. **Legal exposure that could kill a brand-new US LLC.** Your site currently carries fabricated-looking client metrics attributed to a *real named publisher*, seven third-party client logos, stock photos with filenames that look scraped from Freepik/Shutterstock comps, "Rated 5 out of 5" with no review source, and two contradictory client counts on the same page (200+ and 1200+). Fixing this is **non-negotiable before the LLC starts trading.** Section 10.

2. **Your identity is incoherent.** Florida address (malformed — it renders as "LnBonita Springs" with no street number) + New York area code (929) + Texas LLC + Karachi team + three spellings of your own brand in indexed metadata ("Labtechcrew", "LabTechCrew", "Labtehcrew"). A US buyer who checks — and on a $10k+ decision they check — sees a company that can't say where it is. Section 2.4.

3. **You have almost nothing to rank with.** 19 pages, one blog post, and that blog post is the default WordPress `hello-world` — currently live and submitted to Google at `labtechcrew.com/2024/12/29/hello-world/`. Delete it today.

**The single biggest opportunity I found:** the SERPs for `wordpress vs next js for business website` and `wordpress to nextjs migration service` are the weakest I inspected — page one is personal blogs and micro-agencies, zero directories. **You are about to perform exactly that migration.** Document it as you go and you have a first-party credibility asset pointed at an undefended, high-commercial-intent keyword. Section 9.

**Five things to do this week, before any code:**

1. Delete the `hello-world` post.
2. Fix `siteurl`/`home` in WordPress `wp_options` to `https://` (one change fixes robots.txt, all four sitemaps, and og:image).
3. Decide your one address and one phone number. Buy a phone number whose area code matches the address.
4. Pull the three shared stock JPGs and the Ottenheimer performance metrics pending verification.
5. Export 16 months of Google Search Console data by Page, and crawl the live site with Screaming Frog. **You cannot build a safe redirect map without these two files.**

---

## 1. What the audit found

### 1.1 Legal / advertising risk (ordered by exposure)

| # | Finding | Where | Why it matters |
|---|---|---|---|
| 1 | "230% more organic traffic", "150% increase in online sales", "40% drop in bounce rate" in 90 days | `/portfolio/ottenheimer-publishers/` | Specific numeric outcome claims about a **real, named, long-established publisher**. Requires documented substantiation *and* written client permission. Highest single risk on the site. |
| 2 | "Rated 5 out of 5" with no linked review source | `/about/` | FTC 16 CFR Part 465 (2024 Rule on Consumer Reviews & Testimonials) carries civil penalties. The FTC took final action against Sitejabber in Jan 2025 on exactly this class of issue. |
| 3 | "Trusted by 200+ Clients" and "over 1200 satisfied U.S. clients" **on the same page** | `/about/` | Two numbers on one page is self-evidence that neither is substantiated. |
| 4 | 7 third-party client logos, 3 of which have no case study anywhere on the site (OrbitDesignAgency, FourPointsMediaGroup, BetaBook Publishing) | `/about/` | Displaying a mark implies endorsement. Without written permission: trademark infringement + false association, Lanham Act §43(a). |
| 5 | Three identical stock JPGs reused across `/services/digital-marketing/`, `/portfolio/ppinstall/`, `/portfolio/uload/` — filenames like `digital-marketing-on-notepad-and-various-office-supplies.jpg` | 3 pages | Hyphenated descriptive filenames of this exact form are the signature of Freepik/Shutterstock comp previews. Getty and Shutterstock run reverse-image enforcement; demand letters run $800–$8,000 per image. |
| 6 | Team headshots `Team-4.jpg`, `Team-5.jpg`, `Team-6.jpg` presented as **Katherine Wright / Melvin Kimmons (Founder, CEO) / Cynthia Baker** | `/about/` | Sequentially-numbered `Team-N.jpg` is the standard artifact of a WordPress theme demo import. If these are stock models: model-release problem + stock-license problem + presenting a stock photo as your CEO. **Verify or remove.** |
| 7 | "#1 Software Innovation Partner", "Award Winning" (no award named), "Best Web Development Company" (in the indexed `/services/` title tag), "top game development company", "top-rated" | 5+ pages | Unsubstantiated superlatives sitting in the Google snippet. Also: you cannot rank for them, so they cost you and buy nothing. |
| 8 | Zombie-themed game screenshot presented as portfolio work | `/services/game-development/` | If not original, straightforward copyright infringement of a publisher's audiovisual work. |
| 9 | Console/engine trademarks: Xbox, PlayStation, PlayStation VR, Meta Quest, HTC Vive, Unity, Unreal | `/services/game-development/` | Sony/Microsoft/Meta/Epic prohibit implying partnership. Claiming console delivery without being a licensed developer is itself a substantiation problem. |
| 10 | Uber / DoorDash / Instacart / "Fortune 500" name-drops | `/services/mobile-app-development/`, `/services/brand-strategy/` | "Apps like Uber" is likely nominative fair use. Anything implying they're clients is actionable. Fortune 500® is a registered Fortune Media mark. |
| 11 | "Increased profitability with automated trading strategies", "bank-level security", "Wall Street" | `/portfolio/tradermind/` | Profitability claims tied to an automated trading product touch CFTC/SEC and FTC advertising rules even when made by the developer. |
| 12 | Skill percentages (85% Branding, 87% Web Dev, 90% App Dev, 78% Digital Marketing); counters rendering "0 Y / 0 + / 0 %" | `/services/`, `/about/` | Meaningless numbers with no methodology, plus a visibly broken widget. Reads as fabricated data. |

### 1.2 Technical / SEO defects

| # | Defect | Detail |
|---|---|---|
| 1 | `hello-world` post live and in sitemap | `https://labtechcrew.com/2024/12/29/hello-world/`. Also reveals date-based permalinks — needed for the redirect map. |
| 2 | `robots.txt` and all four sitemaps reference `http://` | `Sitemap: http://labtechcrew.com/sitemap_index.xml`; the index points to four `http://` children. The `<loc>` URLs inside are correctly `https`. Every sitemap fetch costs Google a redirect hop. Root cause: `siteurl`/`home` in `wp_options`. |
| 3 | `og:image` served over `http://` | Same root cause. Some social scrapers drop it. |
| 4 | 7 internal links on `/services/` point to non-canonical URLs | `/website-development` → `/services/website-development/`. Two redirect hops each, site-wide. **Do not copy this nav into Next.js.** |
| 5 | Category + author sitemaps submitted | With one post, `/category/uncategorized/` and `/author/admin/` are thin duplicate archives. |
| 6 | No JSON-LD detected on `/services/` or `/contact/` | Yoast normally emits a full `@graph`. Either disabled or Elementor is interfering. Verify with the Rich Results Test. |
| 7 | Homepage meta description is garbled | "…for US & Canadian businesses **sourcecited** AI proven live with QuranRI." Typo + unexplained internal project name. |
| 8 | Title-tag positioning conflict | Homepage = AI agents. `/services/` = "Best Web Development Company". `/contact/` = "Top Software Development Company USA". Three different head terms, two unearned superlatives. |
| 9 | `og:type: article` on service pages | Should be `website`. |
| 10 | Typos in indexed metadata | `/portfolio/ppinstall/` title reads "Labteh**c**rew" (missing c). `/portfolio/frame-x-labs/` meta reads "Framex**x**Labs" while H1 reads "FrameXlabs" and title reads "FramexLabs" — three spellings on one page. |
| 11 | `/portfolio/ottenheimer-publishers/` has no H1 | The highest-legal-risk page is also the weakest technically. |
| 12 | Four indexed URLs now 404 | `/services/ai-data-science-solutions/`, `/services/blockchain-development/`, `/services/cloud-saas-development/`, `/services/custom-web-app-development/`. They still appear in Google. **They need 301s.** |
| 13 | Grammar errors in indexed H2s | "Why Businesses Across the Trust Labtechcrew for Game Development?", "Meet LabTechCrew Proefessional Team" |

**One good finding:** your `robots.txt` currently blocks nothing, which means `OAI-SearchBot`, `PerplexityBot` and `Claude-SearchBot` can all reach you. **Do not break this during migration.** Copying an "AI-blocking robots.txt" snippet from an SEO blog is the single most damaging technical mistake available in this area — OpenAI states verbatim that *"sites that are opted out of OAI-SearchBot will not be shown in ChatGPT search answers, though can still appear as navigational links."*

---

## 2. Positioning and site strategy

You chose **stay full-service**. That's your call and this blueprint honors it. Here is how to make full-service work instead of it working against you.

### 2.1 The problem with full-service, stated plainly

Your current `/services/` page offers ten things: graphics design, website development, mobile apps, AI & data science, game development, brand strategy, digital marketing, blockchain, cloud/SaaS, custom web & app. Two of those (blockchain, cloud/SaaS) don't even have pages — they 404.

A US buyer with a $15k budget reads ten services as "generalist" and generalist reads as "cheap and interchangeable". Your direct competitors — TekRevol, Cubix — run the same ten-service nav, have DR 55–75 and years of link building, and toll-free numbers. On their own terms you cannot beat them yet.

### 2.2 The structure that fixes it without dropping anything

**Keep every service. Change the hierarchy.** Full-service in the footer, focused on the homepage.

```
HOMEPAGE  →  says ONE thing:  "AI + custom software for US businesses"
             (this is your highest-margin, fastest-growing, least-commoditised lane)

SERVICES HUB  →  says ALL things: three tiers, honestly labelled

  Tier 1 — BUILD          Tier 2 — INTELLIGENCE      Tier 3 — LAUNCH
  Web development         AI agents & chatbots        Brand strategy
  Mobile apps             AI automation (n8n)         Graphic & UI/UX design
  Custom software/SaaS    Data & integrations         Digital marketing / SEO
                                                      Game development
```

Why this works: the homepage earns the click on your strongest story, the services hub catches every other search and every Bark/Meta lead regardless of what they asked for, and nothing gets deleted.

**Rule: one primary conversion path.** No matter which of the ten services a visitor lands on, every CTA funnels to the same place — a scoping call. Do not build ten different forms.

### 2.3 Positioning statement (use this verbatim as the source of truth)

> **LabTechCrew builds AI agents, custom software, and the web and mobile products around them — for US businesses that need one accountable team, not five vendors.**
>
> Contracted through LabTechCrew LLC, a Texas limited liability company. You own 100% of the code and IP from the moment it's written.

Every page's copy should be derivable from that. If a sentence on the new site doesn't ladder up to it, cut it.

### 2.4 Fix your identity — this blocks everything downstream

You are currently a Florida address with a New York phone number forming a Texas LLC with a Karachi team. Pick one story and tell it everywhere identically.

**Recommended:**

| Field | Value |
|---|---|
| Legal entity | LabTechCrew LLC, a Texas limited liability company |
| Primary address | One real Texas address (see caveat below) |
| Phone | One US number with an **area code matching that address** (Dallas 214/469/972, Houston 713/281/832, Austin 512/737, San Antonio 210/726) |
| Secondary location | "Engineering team — Karachi, Pakistan" in the footer, second line |
| Brand spelling | **LabTechCrew** — one casing, everywhere, forever |

**Caveat on Google Business Profile:** Google's guidelines are explicit that **virtual offices and PO boxes / remote mailboxes are ineligible** — *"If your business rents a physical mailing address but doesn't operate out of that location, also known as a virtual office, that location isn't eligible for a Business Profile."* Registered-agent addresses aren't named in the guidelines, but they fall foul of the same rule wherever you don't actually operate from and staff that address. A *suspended* profile is worse than no profile because it poisons the entity. **Assume you cannot win the local 3-pack** and plan around it (Section 9 shows which geo keywords are still winnable without a physical office — there are some, and offshore agencies are already ranking them).

### 2.5 Disclosing that you're in Pakistan — what actually works

I audited how every comparable handles this:

| Agency | Leads with | Pakistan shown? | US phone |
|---|---|---|---|
| Folio3 | San Mateo, CA | **Yes** — full Karachi address, equal footer prominence | +1 408 365 4638 |
| Arbisoft | Multi-office, no hierarchy | **Yes** — Lahore/Islamabad/Karachi alongside Plano TX | +1 214 856 3756 |
| Cubix | West Palm Beach, FL | Yes, footer only | 866-978-2220 |
| Tkxel | Reston, VA | Yes, footer only | +1 202-978-3410 |
| TekRevol | "headquartered in the USA" | **No — omitted entirely** | +1 800-362-9239 |

**The dominant, credible pattern: real US address and US phone first; Pakistan as one line in the footer.** Nothing concealed, just ordered. Only TekRevol conceals, and it's the outlier. Concealment buys you almost nothing the ordering pattern doesn't already give you, and it's fragile — a buyer who discovers it has now found you being dishonest about the one thing they were already nervous about.

**What US buyers actually object to** (from developer/buyer forums, ranked by real frequency) — note that English fluency and nationality barely register:

1. **Communication latency.** *"A request costs a 12-hour cost because you don't get a response until their daytime."*
2. **Code quality.** *"800 lines of copy/pasta horror for what should have been three functions."*
3. **Ghosting.** A real Trustpilot review of a Pakistani shop: bad code, unresolved bugs, *"we are left behind with no response… and if there is response it is very slow."*
4. **Team turnover** — the team you vetted isn't the team that ships.
5. **"Cheap = bad."** Buyers use price as a quality proxy. **Underpricing actively reads as a red flag.** Do not compete on being cheapest.
6. Timezone, legal recourse, IP ownership, data security.

### 2.6 Four things no competitor says — say all four, on the homepage

I checked every Pakistani-origin comparable. **None of them state any of these on a homepage.** Each is free, true, and directly answers a top-5 objection:

1. **"5 hours of daily overlap with US Eastern time — 8am–1pm ET, every working day."** (Karachi is UTC+5. Say it as a number, not as "we're flexible.") → kills objection #1
2. **"You own 100% of the code and IP from the moment it's written. Not on delivery. Not on final payment."** → kills objection #8
3. **"Your contract is with LabTechCrew LLC, a Texas limited liability company, governed by Texas law."** → kills objections #3 and #7 in one sentence
4. **"US bank account. W-9 on file. We invoice like any standard US vendor — no international wires."** → kills the AP-department objection nobody else even addresses

Add, from Arbisoft's playbook (best NDA line I found): **"We'll send a mutual NDA before the discovery call if requested. Zero obligation."**

---

## 3. Information architecture

### 3.1 The new sitemap

```
/                                   Home
/services/                          Services hub (all 10, three tiers)
  /services/website-development/         ← keep URL
  /services/mobile-app-development/      ← keep URL
  /services/ai-chatbots-development/     ← keep URL
  /services/graphics-design/             ← keep URL
  /services/brand-strategy/              ← keep URL
  /services/digital-marketing/           ← keep URL
  /services/game-development/            ← keep URL
  /services/ai-automation/               ← NEW (n8n / workflow automation)
  /services/custom-software/             ← NEW (absorbs blockchain + cloud/SaaS 404s)
  /services/wordpress-to-nextjs-migration/  ← NEW — highest-ROI page on the site
/work/                              Portfolio index  (see note)
  /portfolio/ppinstall/                  ← keep URL
  /portfolio/uload/                      ← keep URL
  /portfolio/tradermind/                 ← keep URL  ⚠ rewrite claims
  /portfolio/ottenheimer-publishers/     ← keep URL  ⚠ rewrite or pull
  /portfolio/frame-x-labs/               ← keep URL
  /portfolio/lift-and-learn-fitness/     ← keep URL  ⚠ needs real screenshots
  /portfolio/the-digital-samurais/       ← keep URL
  /portfolio/quranri/                    ← NEW — your strongest asset, currently missing
/how-we-work/                       NEW — process, contracts, IP, NDA, timezone
/pricing/                           NEW — see §6.6, this is your highest-leverage page
/about/                             Rebuilt, claims removed
/contact/                           Three-tier form (see §6.5)
/blog/                              NEW
  /blog/[slug]/
/locations/[city]/                  NEW — Dallas, Houston, Austin, San Antonio (AI automation only)
/legal/privacy/  /legal/terms/  /legal/cookies/
```

**Note on `/portfolio/` vs `/work/`:** keep the existing `/portfolio/` prefix for the seven existing case studies — they're indexed and the URLs carry equity. Do not rename them to `/work/` for aesthetics. If you want a nicer index URL, make `/work/` the new index and 301 `/portfolio/` → `/work/`, but leave the children alone.

### 3.2 Navigation

**Header (desktop):**

```
[LabTechCrew logo]   Services ▾   Work   How We Work   Pricing   About   [ Get a project estimate ]
```

- `Services ▾` is a **mega-menu** with the three tiers from §2.2, each item with a one-line descriptor. Not a plain dropdown list of ten links.
- One button, high contrast, right-aligned: **"Get a project estimate"**. Not "Contact us."
- Sticky on scroll, 64px tall, with a hairline bottom border that appears only after 8px of scroll.
- **US phone number visible in the header on desktop.** Digital Silk — the closest analogue to your paid-traffic buyer — does this, and it converts.

**Header (mobile):** logo · phone icon (tel: link) · hamburger. The estimate button becomes a full-width sticky bar at the bottom of the viewport.

**Footer, three rows:**

```
Row 1:  Services (all 10, plain links)  |  Company  |  Work  |  Resources
Row 2:  LabTechCrew LLC · [Texas street address] · [US phone] · info@labtechcrew.com
        Engineering team — Karachi, Pakistan
Row 3:  © 2026 LabTechCrew LLC  ·  Privacy  ·  Terms  ·  Cookies      [LinkedIn] [Instagram] [Facebook]
```

---

## 4. Page-by-page blueprint

Each page below is a section list in render order, with the job each section does and the copy direction. Copy direction is written as instructions, not as final copy — write final copy in your own voice, then run it past the claims checklist in §10.3.

### 4.1 Home

| # | Section | Job | Spec |
|---|---|---|---|
| 1 | **Hero** | Say what you do, for whom, and give one action | H1 states outcome + audience. Subhead states scope + accountability. **Static image or CSS gradient — no autoplay video** (§7.2). Two CTAs: primary `Get a project estimate`, secondary `See our work`. Below the buttons, one line of micro-trust: *"Texas LLC · 5 hrs daily overlap with US Eastern · You own the IP"* |
| 2 | **Proof strip** | Kill the "who are you" reflex in <2s | 4–6 **real** project names (PPInstalls, uLoad, TraderMind, QuranRI, FrameXlabs, Digital Samurai) as text or your-own-work marks. **No third-party client logos without written permission.** |
| 3 | **What we build** | Show the three tiers | 3 cards → Build / Intelligence / Launch. Each with 3–4 sub-services and a link to the hub. Not 10 flat tiles. |
| 4 | **Featured case study** | One deep proof, not seven shallow ones | QuranRI. Problem → what you built → stack → outcome. Only outcomes you can evidence. Link to full case study. |
| 5 | **The four differentiators** | Answer the offshore objections nobody else answers | The four statements from §2.6, as four short blocks with icons. This section is your moat. |
| 6 | **How we work** | Reduce perceived risk | 4 steps (Scope → Design → Build → Support), each with a stated *duration* and *what you receive*. Link to `/how-we-work/`. |
| 7 | **Pricing anchor** | Qualify before the form | "Projects start at $X,000." One sentence, three example bands, link to `/pricing/`. See §6.6 for why this matters more than anything else on the page. |
| 8 | **Testimonials** | Social proof — real only | Name, role, company, and ideally a LinkedIn link. **If you cannot verify a testimonial, delete it.** Two real ones beat eight unverifiable ones. |
| 9 | **FAQ** | Catch objections + long-tail search | 6–8 questions. Real answers, plain text. **No FAQPage schema** — Google dropped FAQ rich results on 7 May 2026. |
| 10 | **Final CTA** | Convert the scroller | Repeat the estimate CTA with a scheduling embed. |

**H1 formula.** Your competitors all write category statements ("We are a Software Development Company"). Beat them by writing an outcome:

- ✅ *"Ship the software your business needs — with one team that's accountable for all of it."*
- ✅ *"AI agents, custom software, and the apps around them. Built by one US-contracted team."*
- ❌ *"Innovating Beyond Boundaries"* (current LinkedIn tagline — says nothing)
- ❌ Anything with "Best", "#1", "Top", "World-class", "Cutting-edge"

**Do not put a Meta-ad-style hero on the homepage.** Ads go to dedicated landing pages (§6.7).

### 4.2 Services hub (`/services/`)

1. H1 + one paragraph, no superlatives. **Retitle away from "Best Web Development Company"** — that superlative is currently your Google snippet.
2. Three tier blocks, each with its services as cards: icon, name, one-line outcome, "starting at $X", link.
3. "Not sure which you need?" → estimate CTA.
4. Process (shared component).
5. Pricing bands (shared component).
6. FAQ.
7. Final CTA.

**Delete:** the skill-percentage bars (85%/87%/90%/78%) and the "Watch Video" block. Both read as theme filler.

### 4.3 Service page template (`/services/[slug]/`)

Same structure for all ten. Build once, drive from MongoDB.

1. **Hero** — H1 = `{Service} Services` or the outcome variant. Subhead names the buyer. Primary CTA.
2. **Who this is for** — 3 bullets naming the situation, not the industry. ("You have a WordPress site that's slow and you're losing leads on mobile.")
3. **What's included** — 4–6 concrete deliverables. Nouns, not adjectives.
4. **Stack** — tech logos are fine here (nominative use), but never imply partnership or certification you don't hold.
5. **Related case studies** — 2, pulled by tag from MongoDB.
6. **Price band** — "Typical range for this service: $X–$Y." Honest ranges beat "contact for pricing."
7. **Process** (shared) → **FAQ** (3–5, service-specific) → **CTA** (shared).

**The two new pages that matter most:**

- **`/services/wordpress-to-nextjs-migration/`** — hybrid service page + methodology guide. This is the weakest SERP I found and you are performing this migration right now. Include your actual before/after Core Web Vitals numbers, your actual redirect map approach, and screenshots of your own GSC recovery curve. Nobody else on page one can do that.
- **`/services/ai-automation/`** — target `n8n automation agency` / `ai automation agency for small business`. Page one for those terms is 100% micro-sites with no authority. Land-grab window.

### 4.4 Case study template (`/portfolio/[slug]/`)

Case studies convert **badly** as lead-capture (0.76% of traffic, 53% bounce, and readers are 8–22% *less* likely to fill a form) but they convert **well** as deal-progression assets — readers are 18% more likely to become real pipeline. So: keep them deep, keep them linked from service pages, and **do not put them in the primary conversion path.**

Structure: Client & context → The problem → What we built → Stack → **Results (only what you can evidence)** → Client quote (only if real) → 2 related projects → CTA.

**Per-case-study actions:**

| Case study | Action |
|---|---|
| Ottenheimer Publishers | **Get written sign-off on the 230%/150%/40% numbers or delete them.** Add an H1 (it has none). |
| TraderMind | Remove "increased profitability", "bank-level security", "Wall Street". Describe what you built, not what it earned. |
| Lift and Learn Fitness | Add real screenshots or pull the page. Remove "earned recognition as a go-to fitness app" — recognition by whom? |
| PPInstalls, uLoad | Replace the shared stock JPGs with real product screenshots. If you don't have them, mock the UI yourself — that's honest and it's yours. |
| FrameXlabs | Fix the three spellings (title "FramexLabs" / meta "FramexxLabs" / H1 "FrameXlabs"). Pick one. |
| QuranRI | **Write this one.** It's your best work, it's yours, there's no permission problem, and it's the only thing on the site that supports an AI positioning. |

### 4.5 `/how-we-work/` — new, and it does more work than any other page

This is where the four differentiators become a full page. Sections: engagement models (fixed-scope project / monthly retainer / dedicated team) · the delivery process with durations · **contracts** (MSA + SOW, Texas governing law, mutual NDA on request) · **IP ownership** (verbatim: *"Work product belongs to you the instant it's created. Not after the project ships, and not after final payment."*) · **communication** (named overlap hours, tools, response SLA) · **who you'll actually work with** — named humans with photos and LinkedIn links, **including your US partner**.

That last one is your cheapest and strongest trust asset. No Pakistani comparable does it.

### 4.6 `/pricing/` — new

Publishing prices reduces raw form fills by roughly 40% and improves the *quality* of what does come through by roughly 70% (HockeyStack, 31M visitors, 80 B2B companies). For Bark and Meta traffic — where your problem is tyre-kickers, not volume — that trade is strongly in your favour.

Structure: a stated floor (*"We take on projects starting from $X,000"*), 3–4 bands with what's in each, what drives price up/down, an interactive **estimator** (name, email, service, scope questions → instant range + it becomes a lead), and an honest "what we're not a fit for" section. Halo Lab and Superside both do this and both sell at premium from non-US locations.

### 4.7 `/about/` — rebuilt

Keep: founding story, mission, real team, real locations.
**Delete: the client-logo wall, "#1", "Award Winning", "Rated 5 out of 5", "200+/1200+ clients", the broken 0-counters, and the three stock headshots unless they're real employees.**
Add: the four founders — real names, real photos, real LinkedIn URLs, real roles, including who's in Texas and who's in Karachi.

A page that says "four people, here we are, here's what we've built" outperforms a page claiming 1200 clients that a buyer can't verify.

### 4.8 `/contact/` — three tiers on one page

Copy Halo Lab's structure exactly; it's the best I found:

1. **Low friction** — Full name · Company email · Phone (optional) → **"Discuss project"**. Line underneath: *"We respond within one business day."* Plus the NDA sentence.
2. **Qualified** — project description + **required budget dropdown**: `$1k–$5k · $5k–$15k · $15k–$50k · $50k–$150k · $150k+` → **"Send project brief"**
3. **High intent** — inline scheduling embed → **"Book a 20-minute scoping call"**

Then: US address, US phone (click-to-call), email, and Karachi as the second location.

**On the submit action:** putting instant scheduling on the thank-you step raises form-to-meeting from ~30% to ~67% (Chili Piper, ~4M submissions). This is a bigger lever than any copy change on the page. Build it.

### 4.9 `/blog/` and `/locations/[city]/`

Blog: clean index, category filter, `Article` schema, real `lastModified` dates. Content plan in §9.
Locations: **four pages only** — Dallas, Houston, Austin, San Antonio — and **for AI automation, not web design.** Reason in §9.4. Genuinely different content per page. Do not generate 50 thin templated pages; 2026 spam policies eat doorway pages.

---

## 5. Design system

### 5.1 Colour

Your logo is dark navy on white. I could not extract exact hex values from the live CSS (Elementor's globals aren't publicly exposed at the standard path), so **open your logo file, sample the navy, and paste it into `--brand-900` below.** Everything else derives from it.

Recommended system — navy authority base, one electric accent for action only:

```css
/* app/globals.css */
@layer base {
  :root {
    /* Brand — REPLACE brand-900 with the exact navy from your logo */
    --brand-900: #0B1B34;   /* logo navy — headers, footer, dark sections */
    --brand-800: #12294C;
    --brand-700: #1B3B6B;
    --brand-600: #24508F;
    --brand-500: #2F66B5;   /* links on light backgrounds */
    --brand-100: #E4ECF7;
    --brand-50:  #F3F7FC;

    /* Accent — CTAs ONLY. If a thing isn't clickable it doesn't get this colour. */
    --accent-500: #00C2A8;  /* teal-cyan: reads "AI/tech", not "generic agency blue" */
    --accent-600: #00A891;
    --accent-100: #D6F7F1;

    /* Neutrals */
    --ink-900: #0D1117;  --ink-700: #303743;  --ink-500: #5B6472;
    --ink-300: #A9B1BD;  --ink-100: #E7EAEE;  --paper: #FFFFFF;
    --surface: #F7F8FA;

    /* Semantic */
    --success: #17915F;  --warning: #B4700A;  --danger: #C0362C;

    /* Radii, shadow, motion */
    --r-sm: 6px;  --r-md: 10px;  --r-lg: 16px;  --r-xl: 24px;
    --shadow-sm: 0 1px 2px rgb(13 17 23 / .06);
    --shadow-md: 0 4px 16px rgb(13 17 23 / .08);
    --shadow-lg: 0 12px 40px rgb(13 17 23 / .12);
    --ease: cubic-bezier(.22,.61,.36,1);
  }
}
```

**Rules — enforce these in review, they're what separate a professional site from a template:**

1. **The accent colour appears only on interactive elements.** Buttons, links, focus rings, active states. Never on decorative shapes, never on icons that aren't clickable. This is the single most common tell of an amateur agency site.
2. **Maximum three colours visible in any viewport** (navy + one neutral + accent). Elementor sites fail this constantly.
3. **Contrast:** body text ≥ 4.5:1, large text and UI ≥ 3:1. `--ink-500` on `--paper` is your floor for body copy.
4. **Dark sections are punctuation, not wallpaper.** Use `--brand-900` for exactly two or three bands per page (hero or final CTA, footer). A page that alternates dark/light every section looks restless.

### 5.2 Type

```ts
// app/fonts.ts  — ONE file. Calling a loader twice creates two font instances.
import { Inter, Sora } from 'next/font/google'

export const sans = Inter({
  subsets: ['latin'], display: 'swap', variable: '--font-sans',
})
export const display = Sora({           // headings — geometric, technical, not overused
  subsets: ['latin'], display: 'swap', variable: '--font-display',
  weight: ['600', '700'],
})
```

Scale (fluid, `clamp()`):

| Token | Size | Use |
|---|---|---|
| `display-1` | `clamp(2.75rem, 6vw, 4.5rem)` / 1.05 / -0.02em | H1 hero only |
| `display-2` | `clamp(2rem, 4vw, 3rem)` / 1.1 / -0.015em | Section H2 |
| `h3` | `clamp(1.375rem, 2vw, 1.75rem)` / 1.25 | Card titles |
| `body-lg` | `1.125rem` / 1.65 | Hero subhead, intro paragraphs |
| `body` | `1rem` / 1.7 | Everything |
| `small` | `0.875rem` / 1.6 | Captions, legal |
| `eyebrow` | `0.8125rem` / 1.4 / 0.08em / uppercase / 600 | Section labels |

Measure: **60–75 characters** max for body copy (`max-w-[68ch]`). Long-form prose blocks in Elementor typically run 110+ characters wide, which is the main reason those pages feel unreadable.

**Never** load fonts via `@import url('https://fonts.googleapis.com/…')` or a `<link>`. Both forfeit `next/font`'s metric-matched fallback and guarantee layout shift on swap; the `@import` variant costs three sequential round trips before text paints. **Grep the new codebase for `fonts.googleapis.com` before every deploy** — coming from Elementor, this will try to sneak back in.

### 5.3 Spacing, grid, motion

- **8px base scale:** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128.
- **Section rhythm:** `py-24` mobile → `py-32` desktop. Be consistent; inconsistent vertical rhythm is what makes a site feel "made in a page builder."
- **Container:** `max-w-[1200px]`, `px-6` mobile / `px-8` desktop. 12-column grid, 24px gutter.
- **Breakpoints:** 640 / 768 / 1024 / 1280 / 1536.
- **Motion:** 150ms for hovers, 250ms for entrances, `--ease`. **Only animate `transform` and `opacity`.** Animating `height`/`top`/`box-shadow` is a direct CLS generator. Respect `prefers-reduced-motion`.
- **Focus:** every interactive element gets a visible `2px` accent ring with `2px` offset. Non-negotiable — it's an accessibility requirement and US buyers in healthcare/gov will check.

### 5.4 Component inventory

Build these and nothing else. If a design needs an eleventh component type, question the design.

**Primitives:** `Button` (primary/secondary/ghost × sm/md/lg) · `Link` · `Input` `Textarea` `Select` `Checkbox` (all with label + error + aria-describedby) · `Badge` · `Card` · `Avatar` · `Icon` (single sprite or `lucide-react`) · `Container` · `Section` · `Grid`

**Composites:** `Header` (+ `MegaMenu`, `MobileNav`) · `Footer` · `Hero` · `ProofStrip` · `ServiceCard` · `ServiceTierBlock` · `CaseStudyCard` · `CaseStudyHero` · `ProcessSteps` · `PriceBand` · `PricingEstimator` · `TestimonialCard` · `TeamCard` · `FaqAccordion` · `CtaBand` · `ContactFormTier1/2/3` · `SchedulerEmbed` · `LogoMark` · `StatBlock` · `Breadcrumbs` · `JsonLd` · `ConsentBanner`

**Accessibility floor:** semantic landmarks (`header`/`nav`/`main`/`footer`), one H1 per page, heading order never skips, all images have meaningful `alt` (decorative ones get `alt=""`), forms have real `<label>`s, the mega-menu is keyboard-operable and closes on `Escape`, `:focus-visible` everywhere, colour is never the only signal.

---

## 6. Conversion architecture

### 6.1 One path, everywhere

```
Any page → CTA → /contact/ (or inline estimator) → submit
        → instant scheduling offered on the thank-you step
        → email + Slack/WhatsApp notification to the team within seconds
        → human response target: under 5 minutes during overlap hours
```

### 6.2 CTA copy

Use **verb + deliverable, first person**. Netguru uses "Estimate project" rather than "Contact us"; the best-documented CTA study on record (ContentVerve/MarketingSherpa) found switching "your" → "my" lifted click-through 90%.

- Primary: **"Get my project estimate"**
- Secondary: **"Book a 20-minute scoping call"**
- Tertiary: **"See our work"**
- Banned: "Submit", "Learn more", "Click here", "Contact us"

**Honesty note:** there is no credible cross-industry study proving "Book a call" beats "Get a quote" universally. Ship the above, then A/B test. Don't let anyone tell you a blog post settled it.

### 6.3 Form fields

Tier 1: 3 fields. Tier 2: 5 including required budget. Tier 3: scheduler only.

Field count matters less than what happens after submit. There is **no trustworthy controlled study** isolating field count for B2B services — most of the "5 fields = 17% CVR" tables circulating in 2026 are AI-generated with fabricated citations. 3–5 fields is the defensible range; instant scheduling on submit is the proven ~2× lever.

### 6.4 Speed to lead

Contacting a lead within 5 minutes vs 30 makes qualification roughly 21× more likely, and the first responder wins ~78% of deals (Oldroyd/MIT + HBR). **Caveat: this data is from 2007–2012 and has never been replicated. It's still the best evidence available — don't let anyone sell it to you as new research.**

For Bark specifically it's decisive: up to five professionals get the same lead, and a lead older than ~30 minutes has already been called by several of them.

Build: form submit → MongoDB write → email + **WhatsApp/Slack push to whoever is awake**. Assign an on-call rotation across your Karachi morning and your US partner's afternoon so the overlap gap is covered.

### 6.5 Lead data model

```ts
// MongoDB — collection: leads
{
  _id, createdAt,
  name, email, phone,
  company?, website?,
  service: 'web'|'mobile'|'ai-agent'|'ai-automation'|'design'|'marketing'|'game'|'custom'|'migration',
  budgetBand: '1-5k'|'5-15k'|'15-50k'|'50-150k'|'150k+',
  timeline?: 'asap'|'1-3mo'|'3-6mo'|'exploring',
  message?,
  source: 'organic'|'meta'|'bark'|'linkedin'|'referral'|'direct',
  utm: { source?, medium?, campaign?, content?, term? },
  landingPage, referrer,
  status: 'new'|'contacted'|'qualified'|'proposal'|'won'|'lost',
  firstResponseAt?, ownerId?,
  consent: { marketing: boolean, at: Date },   // required
  ip?, userAgent?,                              // spam scoring only, disclose in privacy policy
}
```

Index on `createdAt`, `status`, `source`. Compute time-to-first-response — it's the one internal metric that predicts revenue.

**Spam/bot defence** (you asked about fake traffic): Cloudflare Turnstile on every form + a honeypot field + server-side rate limiting by IP + `zod` validation on the server, never only in the browser. Do **not** use email-only validation; bots pass it.

### 6.6 The pricing decision

Publish a floor. It costs you ~40% of raw form fills and buys ~70% better lead quality, and with Bark/Meta traffic your bottleneck is quality. Halo Lab publishes "$5,000 minimum", Superside publishes "$15,000/month minimum", Netguru publishes "$5,000 to $15,000 for simple apps… $60,000+ for complex". All three sell into the US from outside it, at premium.

Also relevant to §2.5 objection #5: **a stated floor is itself a trust signal.** "Cheap" is what US buyers fear about offshore. A floor says you aren't.

### 6.7 Paid traffic landing pages

**Do not send Meta or Bark traffic to the homepage.** Build `/lp/[campaign]/` — `noindex`, no header nav (logo only, no escape links), one offer, one form, the four differentiators, one case study, one FAQ block. Static hero image, never video: mobile converts at roughly 1.53% vs 3.9% desktop and Meta traffic is overwhelmingly mobile, so every 0.1s of LCP matters (Google/Deloitte measured +21.6% form-submission progression per 0.1s LCP improvement in lead-gen).

**Benchmarks to plan against, so nobody panics in week 3:** software development sites convert at ~1.1% site-wide, IT services ~1.5%; a dedicated consult page should hit 5–15%. Category cost per lead runs $501 (IT services) to $595 (software dev); Meta for B2B tech runs roughly $63–$100. That gap is why Meta is worth testing.

**On Bark, honestly:** it is structurally hostile to your ticket size. Credits run ~$2.35 each and 1–30 credits per lead unlock; up to five pros get every lead; **non-response is explicitly excluded from their refund policy** while being the most common complaint; credits now expire in 3 months (changed Nov 2025, applied retroactively); Trustpilot/Sitejabber sit at 2.6★ across ~1,644 reviews and the BBB shows 103 complaints in 3 years. Creative/dev-specific reviewers rate it 1.5/5. **Cap it at one Starter Pack, claim the Get Hired Guarantee within the 3-day window if it fails, and treat it as speed-to-lead training.** Put the weight on Meta, Upwork (Halo Lab uses "100% Job Success on Upwork" as a homepage trust badge), and LinkedIn outbound.

---

## 7. Technical architecture

### 7.1 Stack

| Layer | Choice | Note |
|---|---|---|
| Framework | **Next.js 16.x, App Router** | `middleware.ts` is deprecated and renamed to `proxy.ts` in 16.0, which defaults to the Node runtime. It's a deprecation with a codemod (`npx @next/codemod@canary middleware-to-proxy .`), not a hard break — `middleware.ts` still works for Edge cases. You won't need either. |
| Language | **TypeScript, `strict: true`** | |
| Styling | **Tailwind CSS v4** + CSS variables from §5.1 | Tokens live in `globals.css`, not scattered in components |
| DB | **MongoDB Atlas** + **Mongoose** or the native driver | Content (services, case studies, posts) + leads |
| Validation | **Zod** | Same schema client and server |
| Forms | **react-hook-form** + zod resolver | |
| Email | **Resend** or Postmark | Transactional only |
| Scheduling | **Cal.com** (self-hostable) or Calendly | Lazy-mount it — see §7.2 |
| Analytics | **GA4** via `@next/third-parties` + **Meta Pixel** hand-rolled | §7.4 |
| Hosting | **Vercel** | Or any Node host; Vercel gives you Speed Insights on preview deploys |
| Bot defence | **Cloudflare Turnstile** | |
| Content editing | Simple admin route + MongoDB, or Sanity/Payload if a non-dev will edit | Don't over-build a CMS for 30 pages |

**MongoDB is fine here, but be clear-eyed:** for 30 mostly-static marketing pages the database earns its place only for (a) leads and (b) blog/case-study content you'll add often. Everything else should be statically generated at build. Do not build a page that queries Mongo on every request — see §7.2.

### 7.2 Core Web Vitals — the rules that actually matter

Thresholds are unchanged: **LCP ≤2.5s · INP ≤200ms · CLS ≤0.1**, at the 75th percentile, mobile and desktop separately. (Ignore any 2026 blog claiming new thresholds — those posts are fabricated.)

**LCP**

```tsx
// Hero — Server Component, no 'use client'
import Image from 'next/image'
import hero from './hero.jpg'   // static import → dimensions + blur inferred at build

<Image
  src={hero}
  alt="LabTechCrew engineers reviewing an AI agent architecture"
  fetchPriority="high"      // Next 16: `priority` is DEPRECATED in favour of `preload`
  loading="eager"
  placeholder="blur"
  sizes="100vw"
  className="w-full h-auto" // h-auto is mandatory or you generate CLS
/>
```

- **Missing `sizes` on `fill` or responsive images is the #1 LCP defect in Next.js.** Without `sizes`, the browser assumes 100vw and Next generates only a 1x/2x srcset — a card in a 3-column grid downloads a 3840w image for a 380px slot. One auditor reported a 15–20 point Lighthouse gain from this fix alone.
- **Never fetch above-the-fold content client-side.** `useEffect` + fetch for the hero serialises JS download → hydrate → fetch → render. This is the single most destructive pattern available.
- **No autoplay hero video.** A 12MB MP4 is the signature agency failure and `next/image` doesn't touch video.
- **One `await cookies()` or `await headers()` anywhere in a layout opts the entire subtree into dynamic rendering.** Static-render everything.
- **Make your CDN ignore `utm_*`, `gclid`, `fbclid` in the cache key** — otherwise every paid-traffic hit is a cache miss with a cold TTFB. This one is specifically about you: all your traffic is going to carry UTMs.

```js
// next.config.ts — image config (Next 16 defaults changed)
images: {
  formats: ['image/avif', 'image/webp'],   // default is webp only; order matters
  minimumCacheTTL: 2678400,                // 31 days
  qualities: [60, 75],                     // Next 16 defaults to [75] only
  remotePatterns: [{ protocol: 'https', hostname: 'labtechcrew.com' }],
}
```

**CLS**

1. Cookie banner must be `position: fixed` — a banner injected into normal document flow is the largest single CLS source on agency sites (~0.25 on its own).
2. `w-full` always needs `h-auto`.
3. Fonts via `next/font` only.
4. Reserve space for every embed (`aspect-ratio`) — YouTube, Cal.com, maps.
5. No `useEffect`-gated rendering that returns `null` server-side. Render a correctly-sized placeholder, or branch with CSS media queries instead of JS.
6. Animate `transform`/`opacity` only.
7. Next 16 removed automatic `scroll-behavior: smooth` — opt back in with `data-scroll-behavior="smooth"` if you want it.

**INP**

- **`'use client'` is a boundary, not a file.** Everything imported below it ships to the browser. A `'use client'` in `app/layout.tsx` because of one dropdown turns your whole site into a client-rendered React app with an SSR'd first paint — the worst of both. Keep layouts as Server Components and pass Server Component children into client leaves:

```tsx
<MobileNavToggle>        {/* 'use client' — leaf only */}
  <NavLinks />           {/* still a Server Component, passed as children */}
</MobileNavToggle>
```

- Lazy-load below-fold heavy things with a **dimension-matched skeleton**:

```tsx
const Scheduler = dynamic(() => import('./scheduler'), {
  ssr: false, loading: () => <div className="h-[620px] rounded-lg bg-(--surface)" />
})
```

- Add your own barrels to `experimental.optimizePackageImports`, or better, **don't create barrel files at all.**
- **GTM is the most common cause of failing INP on an otherwise-clean Next.js site** — Hotjar + Clarity + LinkedIn Insight + Meta Pixel + HubSpot + Intercom is 500KB+ of third-party JS, and it's invisible in your repo because marketing owns the container. Agree a tag budget now.
- **Do not port Elementor's CSS or DOM.** 400KB of unused utility CSS and jQuery-for-one-slider is exactly what you're escaping.

### 7.3 Rendering strategy

Everything static. Services, case studies and posts come from MongoDB at **build time** via `generateStaticParams`, revalidated on publish (webhook → `revalidateTag`). Only the form POST route is dynamic. At your scale you almost certainly don't need `cacheComponents`/PPR.

This is not only a speed decision: **AI crawlers execute zero JavaScript** (Vercel/MERJ, ~500M GPTBot fetches). A client-rendered shell is invisible to ChatGPT, Perplexity and AI Overviews. Server rendering is a prerequisite, not an optimisation.

### 7.4 Analytics and consent

```tsx
// GA4 — @next/third-parties handles client-side pageviews automatically.
// Do NOT also hand-roll pageview events; you'll double-count.
import { GoogleAnalytics } from '@next/third-parties/google'
<GoogleAnalytics gaId="G-XXXX" />
```

Meta Pixel has no `@next/third-parties` component, and **App Router client-side navigations do not fire PageView automatically** — hand-roll it with `strategy="lazyOnload"`, fire `fbq('track','PageView')` on `pathname`/`searchParams` change, and wrap it in `<Suspense>` (`useSearchParams` requires it).

**Consent Mode v2 ordering constraint:** consent *defaults* must run **before** gtag loads or they don't work. Split three ways — defaults as a tiny inline `beforeInteractive` script, CMP **UI** as a lazy `position: fixed` client component, and the **tags** as `afterInteractive`/`lazyOnload`. The worst possible pattern is loading a 150KB hosted CMP `beforeInteractive`.

Skip Partytown/`strategy="worker"` — still experimental, still no App Router support, discussion open since Aug 2023 with no Vercel response.

### 7.5 Folder structure

```
app/
  layout.tsx                 # RSC. fonts, Organization+WebSite JSON-LD, header, footer
  page.tsx                   # Home
  services/page.tsx
  services/[slug]/page.tsx
  work/page.tsx
  portfolio/[slug]/page.tsx
  how-we-work/page.tsx
  pricing/page.tsx
  about/page.tsx
  contact/page.tsx
  blog/page.tsx
  blog/[slug]/page.tsx
  locations/[city]/page.tsx
  lp/[campaign]/page.tsx     # noindex
  legal/(privacy|terms|cookies)/page.tsx
  api/lead/route.ts          # POST — zod + Turnstile + Mongo + notify
  api/vitals/route.ts        # POST — web-vitals beacon
  sitemap.ts
  robots.ts
  not-found.tsx              # real 404
components/{ui,sections,forms}/
lib/{db.ts,models/,seo.ts,schema.ts,analytics.ts}
content/                     # MDX for blog if you prefer files over Mongo
public/
next.config.ts
```

---

## 8. SEO migration

At 19 pages this is technically trivial. The risk isn't complexity, it's carelessness.

### 8.1 Before you touch anything

1. **Screaming Frog crawl** of the live site → export every 200 URL, image URL, title, description, canonical, H1. Archive it.
2. **Google Search Console → Performance → export 16 months by Page.** This is the most important file. It catches URLs that exist only because Google indexed them.
3. **GSC → Indexing → Pages** export.
4. **GSC → Links → Top linked pages.** These carry your backlinks and *must* redirect correctly.
5. **Export Yoast metadata from `wp_postmeta`** — keys `_yoast_wpseo_title`, `_yoast_wpseo_metadesc`, `_yoast_wpseo_meta-robots-noindex`. Without this you'll regenerate every title from the H1.
6. **Export `post_modified` for every page.** You need honest `lastmod` values.
7. **Baseline snapshot:** impressions, clicks, average position for your top 50 queries and pages. Without it you cannot prove recovery.

The union of files 1 and 2 **is** your redirect map. A CMS export alone is not sufficient.

### 8.2 Trailing slash — set it to `true` on day one

Every one of your 19 indexed URLs ends in `/`. Next.js defaults to `trailingSlash: false`, which would 308 all of them. Worse, the built-in slash redirect is pushed to the *front* of the route list, so it fires before your custom redirects and produces chains: `/a/` → `/a` → `/b`.

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  trailingSlash: true,   // matches every legacy WP URL — zero redirect hops

  async redirects() {
    return [
      // Non-canonical internal links that currently exist on /services/
      { source: '/website-development',     destination: '/services/website-development',     permanent: true },
      { source: '/graphics-design',         destination: '/services/graphics-design',         permanent: true },
      { source: '/mobile-app-development',  destination: '/services/mobile-app-development',  permanent: true },
      { source: '/ai-chatbots-development', destination: '/services/ai-chatbots-development', permanent: true },
      { source: '/game-development',        destination: '/services/game-development',        permanent: true },
      { source: '/brand-strategy',          destination: '/services/brand-strategy',          permanent: true },
      { source: '/digital-marketing',       destination: '/services/digital-marketing',       permanent: true },

      // Indexed URLs that now 404 — recover this equity
      { source: '/services/ai-data-science-solutions',  destination: '/services/ai-chatbots-development', permanent: true },
      { source: '/services/custom-web-app-development', destination: '/services/website-development',     permanent: true },
      { source: '/services/blockchain-development',     destination: '/services/custom-software',         permanent: true },
      { source: '/services/cloud-saas-development',     destination: '/services/custom-software',         permanent: true },

      // Portfolio index rename (only if you adopt /work/)
      { source: '/portfolio', destination: '/work', permanent: true },

      // WordPress date permalinks → flat blog
      { source: '/:y(\\d{4})/:m(\\d{2})/:d(\\d{2})/:slug', destination: '/blog/:slug', permanent: true },

      // WordPress cruft
      { source: '/category/:slug*', destination: '/blog',  permanent: true },
      { source: '/tag/:slug*',      destination: '/blog',  permanent: true },
      { source: '/author/:slug*',   destination: '/about', permanent: true },
      { source: '/feed/:path*',     destination: '/blog',  permanent: true },
      { source: '/wp-admin/:path*', destination: '/',      permanent: true },
      { source: '/wp-login.php',    destination: '/',      permanent: true },

      // Legacy ?p=123 — `source` alone cannot match query strings
      { source: '/', has: [{ type: 'query', key: 'p', value: '(?<postId>\\d+)' }],
        destination: '/blog', permanent: true },
    ]
  },
}
export default nextConfig
```

**Gotchas:**
- With `trailingSlash: true`, write every `source` **without** a trailing slash (Next normalises the incoming request before matching) but write every `destination` **with** one.
  > **Corrected by testing, July 2026.** The widely-repeated advice — including the first draft of this document — is that Next appends the slash to the destination for you. It does not. I ran the map above against a real Next 16.2.12 server: `destination: '/services/website-development'` emits `Location: /services/website-development`, which then 308s again to the slashed form. That is a two-hop chain on every legacy URL. With slashed destinations, `curl -L` reports `num_redirects=1`. The one case you cannot avoid is a request that arrives *without* a slash (`/website-development`) — Next's built-in normalisation fires first and you get two hops. Every indexed URL on the live site has a trailing slash, so real traffic takes one hop.
- Never write a rule whose only difference between source and destination is the slash — that's an infinite loop. (Adding a slash to a *different* path, as above, is safe.)
- **Verify with `curl`, not with docs.** `curl -s -o /dev/null -L -w "hops=%{num_redirects} final=%{url_effective}\n" http://localhost:3000/old-url/` — anything above `hops=1` is a chain. Re-run it after every Next.js upgrade.
- Always put `/` before `:` — `/old:slug` is a literal string and risks infinite redirects.
- `permanent: true` emits **308**, not 301. Google treats them identically and explicitly recommends both.
- Use `next.config.ts` redirects, not `proxy.ts`. Config redirects are validated at build time (bad patterns fail the build, loops are caught) and run at the CDN with no function invocation.
- **On the 2,048 ceiling — get this right if anyone quotes it at you.** Vercel's limit is **Routes created per Deployment: 2,048 on Hobby and Pro** (Enterprise is custom). Redirects, rewrites *and* custom headers all draw on that one budget, **and so do the routes Next.js generates automatically from your dynamic routes.** So the usable redirect headroom is meaningfully below 2,048, not equal to it. At ~25 redirects this is academic for you — but don't repeat the common "2,048 redirects" shorthand to a client.

### 8.3 The seven pages whose metadata must survive verbatim

These carry your current rankings. Port the title and description **exactly** unless flagged, then improve them *after* you've confirmed recovery — not on launch day.

| URL | Current title | Action |
|---|---|---|
| `/about/` | `Labtechcrew : Web Development & Digital Solutions Company USA` | Keep. Fix brand casing to `LabTechCrew`. |
| `/services/` | `LabTechCrew: Best Web Development Company – Digital Services` | **Rewrite** — "Best" is an unsubstantiated superlative in your Google snippet, and you can't rank for it. → `Software, App & AI Development Services \| LabTechCrew` |
| `/portfolio/` | `LabTechCrew: Best Web Development & Digital Services` | **Rewrite** — duplicate intent with `/services/`. → `Our Work — Case Studies in Web, Mobile & AI \| LabTechCrew` |
| `/contact/` | `Labtechcrew: Contact - Top Software Development Company USA` | **Rewrite** — drop "Top". → `Contact LabTechCrew — Get a Project Estimate` |
| `/services/ai-chatbots-development/` | `Labtechcrew: AI Services in USA - Data Science & Chatbot Solutions` | Keep, fix casing. Your best-aligned service title. |
| `/services/website-development/` | `Labtechcrew: Custom Websites & E-Commerce Web Development` | Keep, fix casing. |
| `/services/mobile-app-development/` | `Labtechcrew: Mobile App iOS & Android Development USA` | Keep, fix casing. |
| `/services/game-development/` | `Labtechcrew: Game Development Company USA - Mobile Games` | Drop "top game development company" from the meta description. |
| `/portfolio/ppinstall/` | `Labtehcrew: PPInstalls Affiliate Marketing Platform Development` | **Fix the typo** — missing `c`. |
| `/portfolio/frame-x-labs/` | `Labtechcrew: FramexLabs Web Development & Integration USA` | Fix "FramexxLabs" in the meta description. Pick one spelling. |
| `/portfolio/ottenheimer-publishers/` | (has no H1) | Add an H1. Resolve the metrics question first. |

**Title template:** `%s | LabTechCrew`, with `title: { absolute: 'LabTechCrew — ...' }` on the homepage so you don't get `LabTechCrew | LabTechCrew`.

### 8.4 Metadata, canonicals, sitemap, robots

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://labtechcrew.com'),
  title: { default: 'LabTechCrew — AI, Web & App Development for US Business',
           template: '%s | LabTechCrew' },
}
```

```ts
// lib/seo.ts — slash policy lives in exactly ONE place
const TRAILING = true
export function canonical(path: string) {
  const p = path.startsWith('/') ? path : `/${path}`
  return TRAILING ? (p.endsWith('/') ? p : `${p}/`) : (p.replace(/\/$/, '') || '/')
}
```

**Five canonical bugs to avoid:** (1) hand-writing `<link rel="canonical">` instead of using `metadataBase`; (2) canonical pointing at the wrong slash variant, so it 308s — this is the signature of "Duplicate, Google chose different canonical" in GSC; (3) `metadataBase` host ≠ served host (apex vs www); (4) canonicalling paginated pages to page 1 — Google explicitly says don't; (5) **setting canonical in a layout with dynamic children** — `alternates` merges shallowly and will canonical a whole section to one URL. **Set canonical at page level only.**

Also: metadata merges **shallowly**. If a layout sets `openGraph: {title, description, images}` and a page sets `openGraph: {title}`, the page replaces the whole object and you silently lose your OG images. Extract a shared `ogDefaults` and spread it.

```ts
// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  // Hard guard: never ship a staging noindex to production
  if (process.env.VERCEL_ENV !== 'production') {
    return { rules: { userAgent: '*', disallow: '/' } }
  }
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/lp/'] }],
    // NEVER add '/_next/' — it blocks the image optimiser
    // NEVER block OAI-SearchBot, PerplexityBot, Claude-SearchBot
    sitemap: 'https://labtechcrew.com/sitemap.xml',   // HTTPS — fixes your current defect
    host: 'https://labtechcrew.com',
  }
}
```

`app/sitemap.ts`: emit every canonical URL with **honest `lastModified`** ported from WordPress `post_modified`. Google largely ignores `changefreq` and `priority` but does use `lastmod` — only if it's truthful. Emitting `new Date()` on every build makes the field worthless site-wide. Use the native `sitemap.ts`, not `next-sitemap`.

### 8.5 Structured data — what actually earns a rich result in 2026

| Type | Ship it? | Why |
|---|---|---|
| `Organization` | ✅ **Yes** | Knowledge panel: logo, name, contact. Real. |
| `BreadcrumbList` | ✅ **Yes** | Replaces the URL line in SERPs. Cheap, high confidence. |
| `Article` | ✅ On blog posts | Real. |
| `LocalBusiness`/`ProfessionalService` | ⚠️ **Only with a real address** | Otherwise it's a lie in machine-readable form. |
| `Service` | ➖ Optional | Valid schema.org and helps entity understanding, but **not a rich result type**. Don't promise a SERP feature. |
| `FAQPage` | ❌ **No** | Google: *"As of May 7, 2026, FAQ rich results are no longer appearing in Google Search. We will be dropping the FAQ search appearance, rich result report, and support in the Rich results test in June 2026."* Search Console API support ends August 2026. To be precise: the markup isn't penalised, it just no longer earns anything and you can no longer test or report on it. Keep the FAQ *content*; skip the markup. |
| `HowTo` | ❌ No | Dead since Sept 2023. |
| `aggregateRating` on your own Organization | ❌ **Never** | Google: if the entity controls the reviews about itself, those pages are *"ineligible for star review feature."* Embedding a Google reviews widget doesn't rescue it. Do not let a plugin add this. |

Inject via a native `<script>` in a Server Component (Next's own guidance — JSON-LD is data, not executable code), and **escape `<`** because `JSON.stringify` does not sanitise XSS:

```tsx
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}
```

**Skip `hreflang` entirely.** Google's own position: *"it doesn't make any sense to use hreflang if you only have one language / region."* Adding `hreflang="en-US"` does not tell Google you're American. It buys nothing. (It also isn't harmful — malformed hreflang is simply ignored — so don't let anyone scare you either way.)

### 8.6 Images — the risk nobody plans for

`next/image` rewrites `src` **and** `srcset` to `/_next/image?url=…`, so every indexed image URL changes at once. Google's guidance is explicit that image URLs need redirecting and that Image Search reprocesses much more slowly than web search.

**Strategy, best to worst:**

1. **Best — keep serving images from the existing `/wp-content/uploads/` paths.** Zero risk. Google permits cross-domain image URLs in sitemaps.
2. **Good — move hosting, but 301 every old image URL and keep those redirects ≥1 year.**
3. **Acceptable — use `overrideSrc`** (available since v14.2.0), which exists precisely for this. Next's docs: *"when upgrading an existing website from `<img>` to `<Image>`, you may wish to maintain the same `src` attribute for SEO purposes such as image ranking or avoiding recrawl."*

```tsx
<Image
  src="https://labtechcrew.com/wp-content/uploads/2025/08/labtechcrew.png"
  overrideSrc="https://labtechcrew.com/wp-content/uploads/2025/08/labtechcrew.png"
  alt="LabTechCrew logo" width={512} height={512} sizes="(max-width:768px) 100vw, 512px" />
```

4. **Risky — let `next/image` rewrite everything with no redirects.** This is the default and it's the failure mode.

`alt` is a **required prop** on `next/image`, which means migration forces you to write alt text for every image WordPress never gave one. Don't keyword-stuff it; decorative images get `alt=""`.

### 8.7 Launch and after

**Launch day, in order:**
1. Lower DNS TTL a week ahead.
2. **Verify GSC by DNS TXT** — file/HTML-tag verification can vanish with the old site.
3. Deploy. **Immediately fetch production `robots.txt` and grep five rendered pages for `noindex`.** Highest-consequence check on this list.
4. Submit the new sitemap. **Keep the old sitemap submitted too** — the old-URL sitemap starts high and the new one at zero and they gradually reverse. That's your progress tracker.
5. URL Inspection → "Test Live URL" on the homepage and three templates. Read the **rendered** HTML, not the raw response.
6. Verify the redirect map on staging first with Screaming Frog in list mode: **every old URL must resolve in exactly one hop to a 200.**

**Do not use the Change of Address tool** — it's only for domain changes. Same domain with URL changes = plain 301s.

**What to expect** (experience-based, not Google-documented):

| Window | Expect |
|---|---|
| Days 0–7 | Crawl spike, index churn. **A 10–30% traffic dip is normal even on a clean migration.** |
| Weeks 2–4 | Most URLs recrawled, recovering toward baseline |
| Weeks 4–8 | At or near parity |
| Weeks 8–12 | Stabilised. Still down >10% here = a real problem, not settling |
| Image Search | Materially slower. No published number. |

**The failure signal isn't the dip — it's the absence of a recovery trend by week 4.** Brief your partners on this *before* launch, not after.

Watch in GSC for: a rise in "Page with redirect" (correct and healthy), "Soft 404" (means you're not calling `notFound()`), and "Duplicate, Google chose different canonical" (the signature of a slash mismatch).

**Keep redirects at least one year. Honestly, keep them forever** — they cost nothing under the 2,048 cap.

**Core Web Vitals reporting lag:** PageSpeed Insights field data is a **28-day rolling window at p75**. Day 0 after a fix shows zero change; day 14 is directional; **day 28 is the first date the number reflects only the new experience**. Search Console lags further — budget ~6 weeks from deploy to a green report. Low-traffic sites often have no URL-level CrUX data at all and fall back to origin level. Say this to clients too; it's a good look.

---

## 9. Content and keyword plan

### 9.1 Honesty about the numbers

Every search-volume figure below is an **estimate**. I could not access Semrush, Ahrefs or Google Trends — all blocked. The **difficulty** assessments come from actually inspecting the SERPs and I'm confident in them; the volumes are not sourced. Verify the top tier with a free WordStream lookup or a 7-day Ahrefs trial before committing. **Anyone who hands you "1,300/mo, KD 12" for these terms without a tool login is making it up.**

### 9.2 Tier 1 — build these first, SERPs verified weak

| # | Keyword | Difficulty | Evidence |
|---|---|---|---|
| 1 | **wordpress vs next js for business website** | **Very low** | Page one is entirely zero-authority — a personal blog on a `.com.np` domain ranks #1. No directories, no publishers. If that ranks, you rank. |
| 2 | **wordpress to nextjs migration service** | **Very low** | Page one is small agencies and *personal sites*. Zero directories. **Highest commercial intent of anything I found — and you are doing this exact migration right now.** |
| 3 | **n8n automation agency** / n8n workflow automation services | **Very low** | Page one is 100% micro-sites. Nobody has authority yet. Land-grab window. |
| 4 | **ai automation agency for small business** (+ city variants) | **Low** | Autocomplete-confirmed demand. |
| 5 | **shopify development company for [skincare / clothing / jewelry / furniture] brands** | **Low** | All four autocomplete-confirmed, yet the SERP returns generic listicles and Dribbble profiles. Nothing targets the vertical. |
| 6 | **ai receptionist for [plumbers / dentists / law firms / salons / auto repair]** | **Low–med** | Ten vertical variants in autocomplete. SERP is small AI SaaS startups, no directories. Sell it as a productised service. |

### 9.3 Tier 2 — winnable in 3–9 months with a genuinely good page

`ai chatbot development cost` / `how much does an ai chatbot cost 2026` (medium — but a tiny site, viston.tech, ranks page one, so the bar is beatable with real numbers plus a calculator) · `shopify headless development agency` · `wordpress to shopify migration services` · `app development cost calculator` · `ai automation consulting for small business`

### 9.4 Geography — the finding that saves you money

Autocomplete for `mobile app development company dallas` returns **brand names**: jploft, iqlance, appverticals, tekrevol, software orca — several with "reviews" attached. Two things follow:

- **Good:** every one of those is an offshore agency ranking a Texas geo page with no meaningful local presence. **The "you need a US office to rank locally" objection is empirically false in this niche.**
- **Bad:** they're DR 55–75 with years of link building, and the "+reviews" autocompletes mean buyers are actively vetting them. You'd be the eleventh identical page.

**The operative rule: run the query first. If a map pack appears, skip it. If it's pure organic, build the page.**

- ❌ Skip `web design company Dallas`, `web designer near me` — Clutch.co sits on page one, plus a local 3-pack you can't enter without an eligible address.
- ✅ Build `/locations/[dallas|houston|austin|san-antonio]/` **for AI automation**, where no map pack triggers and the current page-one holders are programmatic micro-sites (`automatenexus.com/locations/texas/dallas`, `aiemployees.us/locations/dallas`, `talosautomation.ai/locations/dallas-ai-automation`). Four real pages, genuinely different content. **Not fifty templated ones** — 2026 spam policies eat doorway pages.

### 9.5 Formats that win these SERPs

| Cluster | Format | Currently owned by |
|---|---|---|
| Migration (WP→Next, WP→Shopify) | Service page + step-by-step guide hybrid | Small agencies, personal sites — **wide open** |
| "X vs Y" comparison | Long comparison with a decision table | Zero-authority blogs — **wide open** |
| Cost / pricing | Breakdown + interactive calculator, real dollar ranges, "2026" in the title | Mid-tier agency blogs |
| "Top 10 X companies" | Listicle where you rank yourself #3–5 | Agency blogs doing exactly this — a **proven** format in your space |
| Vertical service pages | "Shopify dev for skincare brands" + 2 case studies | **Nobody** |

Cost and "vs" queries trigger AI Overviews and People Also Ask, so **put a direct extractable answer near the top of cost pages** or you'll get summarised and skipped.

### 9.6 90-day sequence

| Weeks | Ship |
|---|---|
| 1–2 | `wordpress vs next js for business website` + `/services/wordpress-to-nextjs-migration/`. Lowest difficulty, highest intent, mutually supporting, and you're living it. |
| 3–4 | `/services/ai-automation/` + `n8n automation agency`. Land-grab before the category matures. |
| 5–8 | Cost cluster: `ai chatbot development cost 2026` with a real calculator, plus `app development cost calculator`. |
| 9–12 | Four vertical Shopify pages + four AI-automation location pages. |
| Ongoing | One "Top 10 [X] Companies 2026" listicle per quarter, with yourself at #3–5. Gets you into competitors' link graphs. |

### 9.7 Getting cited by AI (ChatGPT, Perplexity, AI Overviews)

Ordered by evidence strength. Ignore anyone selling you more than this.

**Strong evidence — do these:**

1. **Audit `robots.txt` for `OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot`, `Bingbot`, `Googlebot`.** Sites opted out of `OAI-SearchBot` are excluded from ChatGPT search answers. You're clean today — don't break it.
2. **Server-render everything.** AI crawlers run zero JavaScript. Binary; unfixable by content work.
3. **Add statistics, cited sources and direct quotations to your content; do not keyword-stuff.** The only controlled experiment in this field (Princeton/Georgia Tech/Allen Institute, KDD 2024, 10,000 queries) measured: quotations **+40.4%**, statistics **+31.1%**, cite-sources **+31.1%**, keyword stuffing **−8.2%**. Crucially, **lower-ranked sources benefited most (+97–115% at positions 4–5)** — which is exactly your position.
4. **Keep doing classic SEO.** Roughly 38–46% of AI Overview citations come from top-10 organic results.
5. **Turn on Bing Webmaster Tools "AI Performance"** (shipped Feb 2026, free). Its **Grounding Queries** report gives you the actual phrases AI used when retrieving your content — prompt-side data Google withholds.
6. **Target long-tail conversational queries.** AI Overviews appear on 46.4% of 7+ word queries vs 9.5% of single-word queries. Your §9.2 strategy pays double here.
7. **`Google-Extended: Disallow` does NOT remove you from AI Overviews** — widespread misconception. It governs Gemini training only.

**Waste of time — don't let anyone bill you for these:**

- **`llms.txt`.** Ahrefs analysed 137,210 domains via server logs (May 2026): **97% of published llms.txt files were never fetched by anything.** Of requests that did arrive, 96% were bots, and SEO audit tools outpaced every AI bot category. Zero requests came from AI bots for files that don't exist — they never go looking. John Mueller: *"purely speculative for now."*
- "AI-optimised" markup schemes and AI-specific meta tags. Google states verbatim: *"You don't need to create new machine readable files, AI text files, or markup to appear in these features."*
- **Paid Reddit seeding.** Reddit announced explicit anti-GEO enforcement on 6 July 2026 and is removing ~25,000 spammy posts/day. The downside is **permanent domain blacklisting** — r/smallbusiness and r/SaaS AutoMods blacklist agency *URLs*, not just accounts, and 39% of founder-relevant subreddits ban self-promotion outright. A burned domain is burned for every future employee and campaign.
- **Clutch/DesignRush/GoodFirms for AI visibility.** They're fully crawlable and still absent from every major citation dataset. **Justify Clutch on referral leads and buyer trust — it does rank page one for the Dallas terms you can't win — but never on AI visibility.** (And be aware: the "Clutch gets 84.5% of ChatGPT citations" figure circulating in agency blogs is more than 10× what Wikipedia gets. It's fabricated.)

---

## 10. Legal and risk cleanup

### 10.1 Do before the LLC starts trading

| # | Action | Owner |
|---|---|---|
| 1 | Verify the licence for every stock image, especially `digital-marketing-on-notepad-and-various-office-supplies.jpg` and the other two shared JPGs. **No receipt = delete.** | Design |
| 2 | Get **written** logo-usage consent for all seven `/about/` client logos, or replace the wall with text-only "industries served" | Founders |
| 3 | Confirm Katherine Wright / Melvin Kimmons / Cynthia Baker are real employees. **If they're stock models, remove them.** | Founders |
| 4 | Get written client sign-off on the Ottenheimer 230% / 150% / 40% metrics, **or delete them** | Founders |
| 5 | Remove "Rated 5 out of 5" unless it links to a real Google/Clutch profile | Content |
| 6 | Verify the provenance of the zombie game screenshot. **Unverified = remove.** | Design |
| 7 | Remove every unqualified superlative: "#1", "Best", "Top", "Award Winning", "top-rated" | Content |
| 8 | Reconcile the client count. One number, substantiated, or no number | Founders |
| 9 | Rewrite the TraderMind profitability and "bank-level security" claims | Content |
| 10 | Delete the skill-percentage bars and the broken 0-counters | Design |
| 11 | Confirm every testimonial is real and attributable. **Unverifiable = delete.** | Founders |
| 12 | Write privacy policy, terms of service, cookie policy. You collect PII and run Meta Pixel — these aren't optional | Legal |

### 10.2 Replacement imagery — the cheap, safe path

Screenshot your **own** work (you built PPInstalls, uLoad, TraderMind, QuranRI — use real product UI). For anything else: **Unsplash** or **Pexels** (free, commercial use, no attribution required — but read the current terms, and avoid recognisable faces and brands), or generate custom illustrations. Keep a `LICENSES.md` in the repo recording the source and licence of every single asset. When a demand letter arrives, that file is your defence.

### 10.3 The claims checklist — run every sentence through this before publishing

1. Is it a number? → Can I produce a document proving it? If no, cut it.
2. Does it name a client? → Do I have written permission? If no, anonymise it ("a US publisher").
3. Is it a superlative? → Is there a named third party who ranked me, with a date? If no, cut it.
4. Is it a person's photo? → Is that person a real employee who consented? If no, cut it.
5. Is it someone else's logo or screenshot? → Do I have written permission or a licence? If no, cut it.
6. Is it a promise ("100%", "24/7", "guaranteed")? → Can we actually deliver it every time? If no, cut it.

**This is not legal advice — I'm not a lawyer.** Before the LLC starts trading, have a US attorney review the site's claims and your MSA/SOW templates. For a company this size that's a few hundred dollars and it's the cheapest insurance you'll buy.

---

## 11. Measurement

| Metric | Target | Where |
|---|---|---|
| LCP (p75, mobile) | < 2.0s | CrUX / PSI (28-day window) |
| INP (p75) | < 150ms | CrUX / PSI |
| CLS (p75) | < 0.05 | CrUX / PSI |
| Site-wide conversion | 1.5–2.5% | GA4 |
| `/contact/` conversion | 8–15% | GA4 |
| Landing page conversion | 5–15% | GA4 |
| **Time to first response** | **< 5 min** in overlap hours | MongoDB `firstResponseAt` |
| Form → meeting booked | > 50% | Scheduler |
| Organic sessions | Back to baseline by week 6 | GSC |
| Indexed pages | 100% of sitemap | GSC |
| Cost per qualified lead | < $150 | Meta + your CRM |

**Do not add a paid AI-visibility tool.** The entry tiers sample one response per prompt per day, which is a coin flip rendered as a trend line, and the "share of voice" denominators are invented by the vendor. Your honest free stack: server logs (track `GPTBot` vs `OAI-SearchBot` vs `ChatGPT-User` separately — the third means a real user's question triggered a fetch *right now*), Bing WMT AI Performance, GSC gen-AI impressions, and GA4 referrals from `chatgpt.com` / `perplexity.ai` / `claude.ai` / `copilot.microsoft.com` / `gemini.google.com` with explicit acknowledgment that it undercounts.

---

## 12. Build order

Do not build this in one pass. Each phase ends in something shippable.

### Phase 0 — Fix the live WordPress site (2 days, before any code)

Delete `hello-world`. Fix `siteurl`/`home` to https. Fix the seven non-canonical internal links. Set Yoast taxonomy + author archives to noindex. Pull the risky images and claims from §10.1. Export everything in §8.1.

### Phase 1 — Foundation (3–4 days)

Next.js 16 + TS strict + Tailwind v4. `trailingSlash: true` and the full redirect map in `next.config.ts` **on day one**. Design tokens from §5.1. `next/font` setup. `lib/seo.ts`, `app/robots.ts`, `app/sitemap.ts`, `JsonLd` component. MongoDB connection + models. **Ship a deployed skeleton with correct redirects before writing a single page.**

### Phase 2 — Design system (4–5 days)

Every primitive and composite from §5.4, built in isolation with a `/styleguide` route (noindex). Accessibility pass — keyboard, focus, contrast, screen reader — before any page is assembled.

### Phase 3 — Core pages (5–7 days)

Home → Services hub → Service template → Case study template → Contact. Static generation, page-level canonicals, honest `lastModified`.

### Phase 4 — Conversion (3–4 days)

Three-tier contact form, `/api/lead` with zod + Turnstile + Mongo + email/WhatsApp notify, scheduling embed on the thank-you step, pricing estimator, GA4 + Meta Pixel + consent mode.

### Phase 5 — Content (4–5 days)

Port all 18 existing pages with metadata preserved per §8.3. Write the QuranRI case study. Write `/how-we-work/`, `/pricing/`, rebuilt `/about/`. Fix every typo. Legal pages.

### Phase 6 — Pre-launch QA (2 days)

Screaming Frog on staging: every old URL → one hop → 200. Lighthouse ≥95 on the four key templates. Rich Results Test. Keyboard-only pass. Mobile real-device test. **Grep for `noindex` and `fonts.googleapis.com`.** Confirm `robots.txt` doesn't block AI search bots.

### Phase 7 — Launch + 30 days

Follow §8.7 exactly. Then: weekly GSC review, first three blog posts, four location pages, first Meta campaign to a dedicated `/lp/` page.

### Prompts to paste into Claude Code

```
1. "Read LabTechCrew-Rebuild-Blueprint.md. Scaffold a Next.js 16 App Router project with
   TypeScript strict mode and Tailwind v4. Implement next.config.ts exactly as specified in
   section 8.2 including trailingSlash: true and the complete redirect map. Implement
   lib/seo.ts, app/robots.ts, app/sitemap.ts and the JsonLd component from sections 8.4
   and 8.5. Do not create any pages yet."

2. "Using the design tokens in section 5.1 and the type scale in 5.2, create app/globals.css
   and the full component primitive set from section 5.4. Build a /styleguide route (noindex)
   that renders every component in every state. All components must be Server Components
   unless they need interactivity — read section 7.2 on 'use client' boundaries first."

3. "Build the homepage exactly to the section list in 4.1. Static render. Hero image uses
   fetchPriority='high' and loading='eager' with a static import, never priority (deprecated
   in Next 16). Every image needs an explicit sizes prop. No autoplay video."

4. "Build the service page template at app/services/[slug]/page.tsx per section 4.3, driven
   by MongoDB with generateStaticParams. Port the exact title tags and meta descriptions from
   the table in section 8.3 — do not rewrite the ones marked Keep. Set canonical at page level
   only, never in a layout."

5. "Build the three-tier contact form from 4.8 and the /api/lead route from 6.5: zod validation
   server-side, Cloudflare Turnstile, MongoDB write, email + webhook notify. Show a scheduling
   embed on the success state, lazy-loaded with a dimension-matched skeleton."
```

**Standing rules for the build:**

- Every image needs `alt` and `sizes`. No exceptions.
- `'use client'` only on leaf components. Never in a layout.
- No `useEffect` data-fetching for anything above the fold.
- No `aggregateRating`, no `FAQPage` schema.
- No claim ships that fails the §10.3 checklist.
- Nothing from Elementor gets copied — not the CSS, not the DOM, not the nav hrefs.

---

## Appendix A — what was verified, and what wasn't

Every technical claim in sections 7 and 8 was independently re-checked against primary documentation before this document was finalised. **Confirmed against primary sources:** the FAQPage deprecation date and wording · `priority` → `preload` in Next 16 · the `middleware` → `proxy` rename · the Next 16 image config default changes · Google's self-serving-review rule · OpenAI's `OAI-SearchBot` statement · `overrideSrc` · all four 404 URLs on your site · the live `hello-world` post · Google's virtual-office/PO-box ineligibility rule.

**Corrected during review** (so you don't get caught repeating the common versions): the "2,048 redirects" figure is really a 2,048 *routes-per-deployment* budget shared with rewrites, headers and framework-generated routes; "registered agent addresses are ineligible" is an inference, not a Google quote; blocking `OAI-SearchBot` removes you from ChatGPT *search answers* but you can still appear as a navigational link.

**Explicitly NOT verified — treat as estimates:** every search-volume figure in section 9 (all tools were inaccessible; the *difficulty* reads come from real SERP inspection and are reliable) · the exact brand hex values in section 5.1 (sample them from your own logo file) · Bark's per-lead credit costs (dynamic, never published as a rate card) · the 5-minute speed-to-lead data, which is genuinely from 2007–2012 and has never been replicated.

---

## Appendix B — key sources

Google: [Site moves with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) · [FAQPage (deprecation notice)](https://developers.google.com/search/docs/appearance/structured-data/faqpage) · [Review snippet](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) · [AI features guidance](https://developers.google.com/search/docs/appearance/ai-features) · [Business Profile guidelines](https://support.google.com/business/answer/3038177) · [Milliseconds Make Millions (Google/Deloitte)](https://www.thinkwithgoogle.com/_qs/documents/9757/Milliseconds_Make_Millions_report_hQYAbZJ.pdf)

Next.js: [Image reference](https://nextjs.org/docs/app/api-reference/components/image) · [generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) · [JSON-LD guide](https://nextjs.org/docs/app/guides/json-ld) · [proxy.ts](https://nextjs.org/docs/app/api-reference/file-conventions/proxy) · [Next 16 release](https://nextjs.org/blog/next-16) · [Vercel limits](https://vercel.com/docs/limits)

Conversion: [HockeyStack — pricing/demo/case-study pages, 31M visitors](https://www.hockeystack.com/lab-blog-posts/state-of-pricing-demo-case-study-pages) · [Chili Piper form benchmark](https://www.chilipiper.com/post/form-conversion-rate-benchmark-report) · [Portent — site speed vs conversion](https://portent.com/blog/analytics/research-site-speed-hurting-everyones-revenue.htm) · [MarketingExperiments — my vs your](https://marketingexperiments.com/email-marketing/email-optimization-a-single-word-change-results-in-a-90-lift-in-sign-ups) · [Sopro B2B CPL benchmarks](https://sopro.io/resources/blog/b2b-cost-per-lead-benchmarks/) · [First Page Sage B2B conversion rates](https://firstpagesage.com/reports/b2b-conversion-rates-by-industry-fc/)

AI search: [GEO, KDD 2024 (arXiv 2311.09735)](https://arxiv.org/abs/2311.09735) · [Ahrefs llms.txt study, 137,210 domains](https://ahrefs.com/blog/llmstxt-study/) · [OpenAI bots documentation](https://developers.openai.com/api/docs/bots) · [Bing WMT AI Performance](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview) · [Mueller on llms.txt (SEJ)](https://www.searchenginejournal.com/google-says-llms-txt-is-purely-speculative-for-now/577576/)

Trust & compliance: [FTC final order against Sitejabber, Jan 2025](https://www.ftc.gov/news-events/news/press-releases/2025/01/ftc-approves-final-order-against-sitejabber-which-misrepresented-ratings-reviews-consumers-who-had) · [Clutch review authenticity policy](https://clutch.co/resources/clutch-commitment-to-authentic-reviews) · [Full Scale — offshore IP framework](https://fullscale.io/blog/offshore-development-ip-protection-framework/)

Competitors studied: [halo-lab.com](https://halo-lab.com) · [netguru.com](https://netguru.com) · [thoughtbot.com](https://thoughtbot.com) · [webstacks.com](https://webstacks.com) · [digitalsilk.com](https://digitalsilk.com) · [superside.com](https://superside.com) · [tenten.co](https://tenten.co) · [ramotion.com](https://ramotion.com) · [clay.global](https://clay.global) · [tekrevol.com](https://tekrevol.com) · [cubix.co](https://cubix.co) · [folio3.com](https://folio3.com) · [arbisoft.com](https://arbisoft.com)
