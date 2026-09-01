import type { Metadata } from 'next'
import { SITE } from './site'

/**
 * Slash policy lives in EXACTLY ONE place. Blueprint §8.4.
 *
 * Must stay in sync with `trailingSlash` in next.config.ts. If a canonical
 * points at the wrong slash variant it 308s, and Google reads that as a
 * conflicting signal — it is the signature of "Duplicate, Google chose
 * different canonical" in Search Console.
 */
const TRAILING_SLASH = true

export function canonicalPath(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  if (!TRAILING_SLASH) return p.replace(/\/$/, '') || '/'
  return p.endsWith('/') ? p : `${p}/`
}

export function absoluteUrl(path: string): string {
  return `${SITE.url}${canonicalPath(path)}`
}

/**
 * Shared Open Graph defaults.
 *
 * Metadata merges SHALLOWLY. If a layout sets
 * `openGraph: { title, description, images }` and a page sets
 * `openGraph: { title }`, the page REPLACES the whole object and you silently
 * lose your OG images. Always spread this.
 */
export const ogDefaults = {
  siteName: SITE.name,
  locale: SITE.locale,
  type: 'website' as const, // NOT 'article' — the live site has this bug on service pages
  images: [
    {
      url: '/og/default.png',
      width: 1200,
      height: 630,
      alt: `${SITE.name} | ${SITE.tagline}`,
    },
  ],
}

type PageMetaInput = {
  title: string
  description: string
  path: string
  /** Landing pages and the styleguide. */
  noindex?: boolean
  ogImage?: string
}

/**
 * Build page metadata. Use at PAGE level only.
 *
 * Never set `alternates.canonical` in a layout that has dynamic children —
 * `alternates` merges shallowly and will canonical the whole section to one
 * URL. That is canonical bug #5 in the blueprint.
 */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
  ogImage,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path)

  /**
   * ⚠️ BUG CAUGHT BY TESTING, July 2026 — do not remove this.
   *
   * The root layout sets `title.template = '%s | LabTechCrew'`. But the legacy
   * WordPress titles we are PRESERVING already begin with the brand, e.g.
   *   "LabTechCrew: AI Services in USA - Data Science & Chatbot Solutions"
   * The template appended the brand a second time, producing
   *   "LabTechCrew: AI Services in USA - ... | LabTechCrew"
   * which is not the string Google has indexed. Every preserved title on the
   * site was silently being changed — the exact failure this whole migration
   * is designed to avoid, and completely invisible in the browser.
   *
   * Fix: if a title already carries the brand, emit it as `absolute` so the
   * template is bypassed. New pages that do not mention the brand still get
   * the suffix appended normally.
   *
   * Verify after any change:  curl -s https://labtechcrew.com/about/ | grep '<title>'
   */
  const alreadyBranded = /labtechcrew/i.test(title)

  return {
    title: alreadyBranded ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      ...ogDefaults,
      title,
      description,
      url,
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
  }
}

/* ==========================================================================
   JSON-LD builders — blueprint §8.5
   --------------------------------------------------------------------------
   Ship: Organization, WebSite, BreadcrumbList, Article (blog only).
   Do NOT ship: FAQPage (Google dropped FAQ rich results 7 May 2026),
   HowTo (dead Sept 2023), or aggregateRating on your own Organization
   (Google: if the entity controls the reviews about itself, those pages are
   "ineligible for star review feature" — embedding a Google or Facebook
   reviews widget does not rescue it).

   LocalBusiness / ProfessionalService: only once SITE.address is real.
   ========================================================================== */

export const ORG_ID = `${SITE.url}/#organization`
export const WEBSITE_ID = `${SITE.url}/#website`

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: absoluteUrl('/logo.png'),
    description: SITE.description,
    email: SITE.contact.email,
    telephone: SITE.contact.phone,
    /**
     * Locality WITHOUT a street line — this is a service-area business, which
     * is exactly how the verified Google Business Profile is configured (no
     * address shown, no Directions button).
     *
     * `addressLocality` + `addressRegion` are safe and useful: they corroborate
     * the profile and help Google connect this site to that entity. A fake or
     * malformed `streetAddress` would do the opposite — a NAP mismatch against
     * a profile carrying real reviews is a genuine risk, and editing the
     * profile's address triggers re-verification you do not want mid-migration.
     */
    address: {
      '@type': 'PostalAddress',
      ...(SITE.address.street ? { streetAddress: SITE.address.street } : {}),
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    areaServed: SITE.markets.map((m) => ({ '@type': 'Country', name: m })),
    sameAs: Object.values(SITE.social),
    // NO aggregateRating. Self-serving ratings are ignored by Google.
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    publisher: { '@id': ORG_ID },
  }
}

/** The LAST crumb has no `item` — it is the current page. */
export function breadcrumbSchema(crumbs: { name: string; path?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.path ? { item: absoluteUrl(c.path) } : {}),
    })),
  }
}

export function articleSchema(input: {
  headline: string
  description: string
  path: string
  datePublished: string
  dateModified: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(input.path) },
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    publisher: { '@id': ORG_ID },
    author: { '@id': ORG_ID },
    ...(input.image ? { image: [input.image] } : {}),
  }
}
