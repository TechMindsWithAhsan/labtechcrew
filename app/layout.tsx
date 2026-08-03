import { WhatsAppButton } from '@/components/ui/whatsapp-button'
import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { fontVariables } from './fonts'
import { SITE } from '@/lib/site'
import { organizationSchema, websiteSchema, ogDefaults } from '@/lib/seo'
import { JsonLd } from '@/components/ui/json-ld'
import { Header, MobileCtaBar } from '@/components/sections/header'
import { Footer } from '@/components/sections/footer'
import { ConsentBanner } from '@/components/sections/consent-banner'
import { WebVitals } from './_components/web-vitals'

/**
 * Root layout — a SERVER COMPONENT. It must stay one.
 *
 * Title template rules people break:
 *  1. `template` applies to CHILDREN only — a title set in the same layout is
 *     not templated.
 *  2. `title.default` is required whenever you set `template`.
 *  3. `title.template` in a page.tsx has no effect. Use
 *     `title: { absolute: '…' }` on the homepage or you get
 *     "LabTechCrew | LabTechCrew".
 *
 * Do NOT set `alternates.canonical` here. `alternates` merges shallowly and
 * would canonical every child page to one URL. Canonicals are page-level only.
 *
 * `pb-20 lg:pb-0` on <body> is not decorative — see the note below.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — AI, Web & App Development for US Business`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: ogDefaults,
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/favicon.ico' },
  formatDetection: { telephone: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID

  return (
    <html lang="en" className={fontVariables} data-scroll-behavior="smooth">
      {/*
        pb-20 lg:pb-0 — MobileCtaBar below is position:fixed at bottom-0, so it
        is out of flow and covers whatever the page ends with, which is the
        footer. Measured height: p-3 (24px) + the size="lg" button's h-13 (52px)
        + border-t (1px) = 77px. pb-20 is 80px, the smallest step on the scale
        that clears it. The bar is lg:hidden, so the padding comes back off at
        the same breakpoint or every desktop page gains 80px of dead space.
        If the bar's padding or button size changes, re-measure this.
      */}
      <body className="flex min-h-dvh flex-col pb-20 antialiased lg:pb-0">
        {/*
          Consent Mode v2 DEFAULTS must execute before gtag.js loads, or the
          defaults do not apply at all. This inline script is deliberately
          tiny and beforeInteractive; the CMP *UI* is lazy and fixed, and the
          *tags* are afterInteractive/lazyOnload. Never load a hosted CMP
          bundle beforeInteractive — it blocks the critical path AND injects a
          flow-shifting banner.
        */}
        <Script id="consent-defaults" strategy="beforeInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});`}
        </Script>

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-(--radius-md) focus:bg-coral-500 focus:px-4 focus:py-2 focus:text-(--color-accent-contrast) focus:shadow-(--shadow-md)"
        >
          Skip to content
        </a>

        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />

        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />

        <MobileCtaBar />
        <ConsentBanner />
        <WebVitals />

        {/*
          GA4. @next/third-parties handles client-side pageviews automatically
          via history state changes — do NOT also hand-roll pageview events or
          you double-count. Swap this raw Script for
          <GoogleAnalytics gaId={gaId} /> once the package is added.
        */}
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`gtag('js', new Date()); gtag('config', '${gaId}');`}
            </Script>
          </>
        ) : null}

        {/*
          Meta Pixel has no @next/third-parties component, and App Router
          client-side navigations do NOT fire PageView automatically. Phase 4:
          extract this into a client component that fires
          fbq('track','PageView') on pathname/searchParams change, wrapped in
          <Suspense> because useSearchParams requires a Suspense boundary.
        */}
        {pixelId ? (
          <Script id="meta-pixel" strategy="lazyOnload">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${pixelId}');fbq('track','PageView');`}
          </Script>
        ) : null}

        {/* Renders nothing until SITE.whatsapp is set. */}
        <WhatsAppButton />
      </body>
    </html>
  )
}
