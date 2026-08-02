# Asset licence register

Every image, font, icon and piece of third-party content on this site gets a
row here **before** it ships. No row, no deploy.

This is not bureaucracy. Getty and Shutterstock run automated reverse-image
enforcement and their demand letters run roughly $800–$8,000 per image. When
one arrives, this file is the difference between paying it and answering it in
one email.

| Asset path | Type | Source | Licence | Proof (receipt / URL / email) | Added |
|---|---|---|---|---|---|
| `app/fonts.ts` → Inter | Font | Google Fonts | SIL Open Font License 1.1 | https://fonts.google.com/specimen/Inter/license | 2026-07 |
| `app/fonts.ts` → Sora | Font | Google Fonts | SIL Open Font License 1.1 | https://fonts.google.com/specimen/Sora/license | 2026-07 |
| `lucide-react` icons | Icons | Lucide | ISC | https://lucide.dev/license | 2026-07 |

---

## Client work screenshots (`public/shots/**`)

Screenshots of software we built, shown in case studies. Added 2026-08.

| Asset | Client | What it shows | Third-party content inside the frame | Status |
|---|---|---|---|---|
| `shots/quranri/*` (3) | QuranRI / VIqra | Our own flagship product | None | ✅ Our IP |
| `shots/tradermind/*` (3) | TraderMind | Charting workspace, AI assistant, marketing site | Price chart is a **TradingView** widget — captioned as such on the page, not claimed as ours | ⚠️ Permission |
| `shots/ppinstall/landing.png` | PPInstalls | Platform homepage | None significant | ⚠️ Permission |
| `shots/uload/apps.jpg` | Utrade Logistics | Four app screens | Map tiles (Apple Maps attribution visible) | ⚠️ Permission |
| `shots/frame-x-labs/landing.jpg` | Frame X Lab | Studio homepage | Their hero carousel shows a **Stacks** (Bitcoin L2) site — incidental, inside the client's own design | ⚠️ Permission |
| `shots/the-digital-samurais/who-we-are.jpg` | The Digital Samurais | Introduction section | 3D brand character — client-owned. Capability percentages are the **client's own claims** | ⚠️ Permission |
| `shots/ottenheimer-publishers/landing.jpg` | Ottenheimer Publishers | Publisher homepage | **Commercially published book cover art** — see the note below | ⚠️ Permission + review |
| `shots/lift-and-learn-fitness/brand-and-app.jpg` | Lift & Learn Fitness | Identity + app UI | Fitness photography inside the app UI — licensed by the client, not by us | ⚠️ Permission |

### ⚠️ The real exposure is permission, not copyright

The copyright question people worry about here is the small one. Showing a
screenshot of software you built, which happens to contain the client's own
content, is ordinary portfolio practice and very rarely draws a claim.

**The claim that actually reaches the LLC is a contract claim.** Most service
agreements are either silent on portfolio rights or require written consent
before you publish a client's work. If any of these engagements had an NDA or
a confidentiality clause, publishing that client's site in our portfolio
breaches it — and unlike a copyright question, that one has a named
counterparty who already knows who we are and what we agreed to.

**Do this before these pages go live.** One email per client:

> "We'd like to feature [project] in our portfolio at labtechcrew.com — a
> screenshot, a description of what we built, and a link. Happy to send you
> the page first. Are you OK with that?"

A one-line reply saved to a folder closes this permanently. Record the date in
the Status column above. Seven emails, one afternoon.

### Note on the Ottenheimer screenshot

The book showcase in that hero includes cover art from commercially published
titles. Two things follow:

1. **Whether the client is entitled to display those covers is the client's
   question, not ours** — but it is worth asking, because if the answer is no,
   we do not want our portfolio amplifying it.
2. Our caption deliberately describes the *page's job* rather than the books,
   and we do not name titles or authors anywhere on the page.

If the client cannot confirm their position, replace this screenshot with a
different section of the same site. The case study does not depend on it.

### Standing rule

`public/shots/**` is for real screens from real builds. Never stock
photography, never a third-party logo wall, never a mockup of software that
does not exist. Every new file gets a row above before it deploys.

---

## Blocked — must be resolved before these pages go live

Carried over from the WordPress audit (blueprint §10.1). Each one is either
licensed, replaced, or deleted. There is no fourth option.

| Asset | Where it was used | Problem | Owner | Status |
|---|---|---|---|---|
| `digital-marketing-on-notepad-and-various-office-supplies.jpg` | `/services/digital-marketing/`, `/portfolio/ppinstall/`, `/portfolio/uload/` | Filename pattern matches Freepik/Shutterstock comp previews. No receipt located. | Design | ❌ BLOCKED |
| `working-desk-with-digital-tablet-showing-digital-marketing-concept.jpg` | same three pages | same | Design | ❌ BLOCKED |
| `digital-marketing-on-notepad-and-various-business-papers-on-brown-background-.jpg` | same three pages | same | Design | ❌ BLOCKED |
| `Team-4.jpg`, `Team-5.jpg`, `Team-6.jpg` | `/about/` — shown as Katherine Wright, Melvin Kimmons (Founder, CEO), Cynthia Baker | Sequential `Team-N.jpg` is the signature of a WordPress theme demo import. If these are stock models: model-release problem + licence problem + presenting a stock photo as your CEO. | Founders | ❌ BLOCKED |
| Zombie-themed game screenshot | `/services/game-development/` | Presented as portfolio work. If not original, this is copyright infringement of a publisher's audiovisual work. | Design | ❌ BLOCKED |
| 7 client logos: Ottenheimer Publishers, TraderMind, Frame X Labs, TheDigitalSamurais, OrbitDesignAgency, FourPointsMediaGroup, BetaBook Publishing | `/about/` logo wall | Displaying a mark implies endorsement. Three of these have no case study anywhere on the site. Needs **written** permission per logo, or replace the wall with text-only "industries served". | Founders | ❌ BLOCKED |
| 4 unnamed brand logos | `/services/brand-strategy/` | Unattributed third-party marks. | Design | ❌ BLOCKED |
| 6 sample logos shown as portfolio examples | `/services/graphics-design/` | Common pattern: lifted from Dribbble/Behance. Verify you produced each one and that the client does not own the mark. | Design | ❌ BLOCKED |
| Console / engine marks: Xbox, PlayStation, PlayStation VR, Meta Quest, HTC Vive, Unity, Unreal | `/services/game-development/` | Sony, Microsoft, Meta and Epic all prohibit implying partnership. Text-only nominative reference is defensible; logos are not. | Content | ⚠️ REVIEW |

## Safe replacement sources

1. **Screenshots of your own work** — PPInstalls, uLoad, TraderMind, QuranRI,
   FrameXLabs. Free, unambiguous, and more convincing than any stock photo.
2. **Unsplash** and **Pexels** — free for commercial use, no attribution
   required. Read the current terms, and avoid recognisable faces and
   recognisable third-party brands in frame.
3. **Custom illustration** — commission it or generate it, then record it here
   as your own work.
