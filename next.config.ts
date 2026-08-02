import type { NextConfig } from 'next'
// Shared with scripts/audit-redirects.mjs so the auditor checks the SAME map
// that ships. Never maintain two copies of a redirect table.
import { redirects } from './config/redirects.mjs'

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
