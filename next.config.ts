import type { NextConfig } from 'next'
// Shared with scripts/audit-redirects.mjs so the auditor checks the SAME map
// that ships. Never maintain two copies of a redirect table.
import { redirects } from './config/redirects.mjs'

/**
 * De-indexing guard — see app/robots.ts. Without either variable, robots.ts
 * serves `Disallow: /` and the deploy silently vanishes from search. A build
 * that cannot prove its environment must fail here, not ship noindex.
 * Vercel sets VERCEL_ENV itself; local builds get NEXT_PUBLIC_SITE_ENV from
 * .env.local (copied from .env.example).
 */
const vercelEnv = process.env.VERCEL_ENV
const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV

if (!vercelEnv && !siteEnv) {
  throw new Error(
    '[env] Neither VERCEL_ENV nor NEXT_PUBLIC_SITE_ENV is set — refusing to build. ' +
      'Without one, robots.ts ships "Disallow: /" and the site is silently de-indexed. ' +
      'Local builds: copy .env.example to .env.local (it sets NEXT_PUBLIC_SITE_ENV=development).',
  )
}

if (vercelEnv === 'production' && siteEnv && siteEnv !== 'production') {
  throw new Error(
    `[env] VERCEL_ENV is "production" but NEXT_PUBLIC_SITE_ENV is "${siteEnv}" — ` +
      'this deploy would ship a noindex robots.txt. Fix the env var before deploying.',
  )
}

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /**
   * CRITICAL — do not change without reading blueprint §8.2.
   *
   * Every one of the 19 indexed WordPress URLs ends in "/". Next's default
   * (`false`) would 308 all of them, and because the built-in slash redirect
   * is pushed to the FRONT of the route list it fires before our custom
   * redirects, producing chains like /a/ -> /a -> /b.
   */
  trailingSlash: true,

  redirects,

  images: {
    // Default in Next 16 is webp only. Order matters — avif first.
    formats: ['image/avif', 'image/webp'],
    // Next 16 default is 14400 (4h). 31 days is right for a marketing site.
    minimumCacheTTL: 2678400,
    // Next 16 defaults to [75]; `quality` is coerced to the nearest allowed.
    qualities: [60, 75],
    remotePatterns: [
      { protocol: 'https', hostname: 'labtechcrew.com' },
      { protocol: 'https', hostname: 'www.labtechcrew.com' },
    ],
  },

  experimental: {
    // Our own barrels are NOT optimised by default. Better still: avoid barrels.
    optimizePackageImports: ['lucide-react'],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ]
  },
}

export default nextConfig
