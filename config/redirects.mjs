/**
 * LabTechCrew — WordPress → Next.js redirect map
 * =============================================
 *
 * Blueprint §8.2. Read this before editing:
 *
 *  1. `trailingSlash: true` is set in next.config.ts because ALL 19 legacy
 *     URLs end in "/". Next normalises the INCOMING request before matching,
 *     so every `source` is written WITHOUT a trailing slash.
 *
 *  1b. ⚠️ VERIFIED BY TEST, NOT BY DOCS: Next does NOT append the trailing
 *     slash to the `destination`. Writing `destination: '/services/x'` emits
 *     `Location: /services/x`, which then 308s again to `/services/x/` —
 *     a two-hop chain on every legacy URL, and three hops for a request that
 *     arrived without a slash. So every `destination` here IS written WITH a
 *     trailing slash. Re-verify with `curl -I` after any Next.js upgrade.
 *
 *  2. NEVER write a rule whose only difference between source and destination
 *     is the slash. That is an infinite redirect loop. (Adding the slash to a
 *     DIFFERENT path, as above, is safe — the paths still differ.)
 *
 *  3. Always put "/" before ":" — `/old:slug` is a literal string and risks
 *     an infinite loop. Write `/old/:slug`.
 *
 *  4. `permanent: true` emits HTTP 308, not 301. Google treats them
 *     identically and explicitly recommends both.
 *
 *  5. Keep these forever. They cost nothing and Google advises >= 1 year.
 *
 *  6. Vercel's cap is 2048 ROUTES per deployment — shared with rewrites,
 *     headers, and routes Next generates from your dynamic segments. Not
 *     2048 redirects. We are ~25.
 *
 * Run `npm run audit:seo` after any change.
 */

/** URLs that were live on WordPress and must keep working. Used by the auditor. */
export const LEGACY_URLS = [
  '/',
  '/about/',
  '/services/',
  '/portfolio/',
  '/contact/',
  '/services/ai-chatbots-development/',
  '/services/brand-strategy/',
  '/services/digital-marketing/',
  '/services/game-development/',
  '/services/graphics-design/',
  '/services/mobile-app-development/',
  '/services/website-development/',
  '/portfolio/frame-x-labs/',
  '/portfolio/lift-and-learn-fitness/',
  '/portfolio/ottenheimer-publishers/',
  '/portfolio/ppinstall/',
  '/portfolio/the-digital-samurais/',
  '/portfolio/tradermind/',
  '/portfolio/uload/',
  // Indexed but currently 404 on WordPress — we recover these.
  '/services/ai-data-science-solutions/',
  '/services/blockchain-development/',
  '/services/cloud-saas-development/',
  '/services/custom-web-app-development/',
  // Non-canonical internal links that exist on the live /services/ page.
  '/website-development/',
  '/graphics-design/',
  '/mobile-app-development/',
  '/ai-chatbots-development/',
  '/game-development/',
  '/brand-strategy/',
  '/digital-marketing/',
  // WordPress default post + cruft.
  '/2024/12/29/hello-world/',
  '/category/uncategorized/',
  '/author/admin/',
  '/feed/',
]

/** @type {import('next').NextConfig['redirects']} */
export const redirects = async () => [
  // ---------------------------------------------------------------------
  // 1. Non-canonical internal links currently on the live /services/ page.
  //    Each of these is a redirect hop TODAY. Do not copy the old nav hrefs.
  // ---------------------------------------------------------------------
  { source: '/website-development', destination: '/services/website-development/', permanent: true },
  { source: '/graphics-design', destination: '/services/graphics-design/', permanent: true },
  { source: '/mobile-app-development', destination: '/services/mobile-app-development/', permanent: true },
  { source: '/ai-chatbots-development', destination: '/services/ai-chatbots-development/', permanent: true },
  { source: '/game-development', destination: '/services/mobile-app-development/', permanent: true },
  { source: '/brand-strategy', destination: '/services/brand-strategy/', permanent: true },
  { source: '/digital-marketing', destination: '/services/', permanent: true },

  // ---------------------------------------------------------------------
  // 2. Indexed URLs that 404 on the live site. Verified 404 July 2026.
  //    These still appear in Google — recovering them is free equity.
  // ---------------------------------------------------------------------
  { source: '/services/ai-data-science-solutions', destination: '/services/ai-chatbots-development/', permanent: true },
  { source: '/services/custom-web-app-development', destination: '/services/website-development/', permanent: true },
  { source: '/services/blockchain-development', destination: '/services/custom-software/', permanent: true },
  { source: '/services/cloud-saas-development', destination: '/services/custom-software/', permanent: true },

  // ---------------------------------------------------------------------
  // 2b. SERVICES RETIRED July 2026 — digital marketing and game development.
  //
  //     These two pages are INDEXED and currently rank. Deleting an indexed
  //     URL throws away the equity and hands Google a 404; 301'ing it passes
  //     the signal to a page that still exists. This is the whole reason the
  //     migration is worth doing carefully.
  //
  //     game-development  → mobile-app-development (closest surviving intent:
  //                         both are app builds for iOS/Android)
  //     digital-marketing → /services/ hub (no surviving page matches the
  //                         intent; the hub is the honest destination)
  // ---------------------------------------------------------------------
  { source: '/services/game-development', destination: '/services/mobile-app-development/', permanent: true },
  { source: '/services/digital-marketing', destination: '/services/', permanent: true },

  // ---------------------------------------------------------------------
  // 3. Portfolio index moves to /work/. The seven CHILD case-study URLs
  //    keep their /portfolio/ prefix — they are indexed and carry equity.
  //    Do not "tidy" them to /work/[slug].
  // ---------------------------------------------------------------------
  { source: '/portfolio', destination: '/work/', permanent: true },

  // ---------------------------------------------------------------------
  // 4. WordPress date permalinks → flat blog.
  //    Confirmed live: /2024/12/29/hello-world/
  // ---------------------------------------------------------------------
  //
  //    ⚠️ POINTS AT /blog/, NOT /blog/:slug/ — caught by testing.
  //    You have exactly ONE WordPress post ever published: the default
  //    `hello-world`. Redirecting to /blog/hello-world/ sent Google a 301
  //    into a 404, which is worse than either a clean 404 or a clean
  //    redirect. The blog index always returns 200, so it is the honest
  //    destination.
  //
  //    IF YOU EVER IMPORT REAL WORDPRESS POSTS: change the destination back
  //    to '/blog/:slug/', create app/blog/[slug]/page.tsx, and re-run
  //    `npm run audit:seo` plus a curl check that each one lands on a 200.
  {
    source: '/:y(\\d{4})/:m(\\d{2})/:d(\\d{2})/:slug',
    destination: '/blog/',
    permanent: true,
  },

  // ---------------------------------------------------------------------
  // 5. WordPress archive + system cruft.
  // ---------------------------------------------------------------------
  { source: '/category/:slug*', destination: '/blog/', permanent: true },
  { source: '/tag/:slug*', destination: '/blog/', permanent: true },
  { source: '/author/:slug*', destination: '/about/', permanent: true },
  { source: '/feed/:path*', destination: '/blog/', permanent: true },
  { source: '/comments/feed/:path*', destination: '/blog/', permanent: true },
  { source: '/wp-admin/:path*', destination: '/', permanent: true },
  { source: '/wp-login.php', destination: '/', permanent: true },
  { source: '/xmlrpc.php', destination: '/', permanent: true },

  // ---------------------------------------------------------------------
  // 6. Legacy ?p=123 permalinks. `source` alone cannot match a query
  //    string — this needs `has`.
  // ---------------------------------------------------------------------
  {
    source: '/',
    has: [{ type: 'query', key: 'p', value: '(?<postId>\\d+)' }],
    destination: '/blog/',
    permanent: true,
  },
]
