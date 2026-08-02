import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/seo'
import { ALL_SERVICE_SLUGS } from '@/lib/site'
import { getAllCaseStudies, getAllPosts, getLocationSlugs } from '@/lib/content'

/**
 * Blueprint §8.4.
 *
 * `lastModified` DISCIPLINE — this is the part teams get wrong:
 * Google largely ignores changefreq and priority but DOES use lastmod,
 * *only if it is honest*. Emitting `new Date()` for every URL on every build
 * makes the field worthless site-wide. Port `post_modified` from WordPress
 * during migration and never reset it.
 *
 * Every URL here must be the 200-returning variant (trailing slash, matching
 * the canonical). A sitemap full of 308s is the most common post-migration
 * audit finding.
 *
 * Note: Next does NOT generate a sitemap index. Irrelevant below 50k URLs.
 */

const STATIC_PAGES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/services/', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/work/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/how-we-work/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/pricing/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about/', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact/', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/blog/', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/legal/privacy/', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/legal/terms/', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/legal/cookies/', priority: 0.2, changeFrequency: 'yearly' },
  // NOTE: /lp/* landing pages are deliberately absent. They are noindex and
  // disallowed in robots.ts — indexing them would cannibalise the service
  // pages they were cloned from.
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [caseStudies, posts] = await Promise.all([getAllCaseStudies(), getAllPosts()])

  const buildDate = new Date()

  return [
    ...STATIC_PAGES.map((p) => ({
      url: absoluteUrl(p.path),
      lastModified: buildDate,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),

    ...ALL_SERVICE_SLUGS.map((slug) => ({
      url: absoluteUrl(`/services/${slug}`),
      lastModified: buildDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),

    // Case studies keep the legacy /portfolio/ prefix — those URLs are indexed.
    ...caseStudies.map((c) => ({
      url: absoluteUrl(`/portfolio/${c.slug}`),
      lastModified: c.updatedAt, // ported from WordPress post_modified — do NOT reset
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),

    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),

    ...getLocationSlugs().map((city) => ({
      url: absoluteUrl(`/locations/${city}`),
      lastModified: buildDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
