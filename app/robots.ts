import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

/**
 * Blueprint §8.4.
 *
 * THREE THINGS THAT MUST NEVER CHANGE HERE:
 *
 * 1. Never add `/_next/` to disallow — it blocks the image optimiser entirely.
 *
 * 2. Never block `OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot`.
 *    OpenAI, verbatim: "Sites that are opted out of OAI-SearchBot will not be
 *    shown in ChatGPT search answers, though can still appear as navigational
 *    links." Copying an "AI-blocking robots.txt" snippet from an SEO blog is
 *    the single most damaging technical mistake available in this area.
 *    The live WordPress site is currently clean — do not break it.
 *
 * 3. The production guard below exists because shipping a staging `noindex`
 *    to production is catastrophic AND silent. Verify on launch day by
 *    fetching the production robots.txt before you celebrate.
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction =
    process.env.VERCEL_ENV === 'production' ||
    process.env.NEXT_PUBLIC_SITE_ENV === 'production'

  if (!isProduction) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/lp/', // paid-traffic landing pages are noindex by design
          '/styleguide/',
        ],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`, // HTTPS — fixes the live site's http:// defect
    host: SITE.url,
  }
}
