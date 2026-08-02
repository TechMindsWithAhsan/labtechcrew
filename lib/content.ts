/**
 * Content facade.
 *
 * The real content lives in `lib/data/services.ts` and `lib/data/work.ts`.
 * This file exists so pages, the sitemap and any future CMS have one import
 * surface — swap the bodies for database calls later without touching a
 * single page component.
 *
 * Everything here is build-time. No marketing page should query a database on
 * request (blueprint §7.3): all of them are statically generated, which is
 * both a speed decision and an AI-visibility prerequisite, since AI crawlers
 * execute zero JavaScript.
 */

import { SERVICES, getService, type ServiceContent } from './data/services'
import {
  CASE_STUDIES,
  getCaseStudy,
  caseStudiesForService,
  featuredCaseStudies,
  type CaseStudy,
} from './data/work'

export type { ServiceContent, CaseStudy }
export { SERVICES, getService, CASE_STUDIES, getCaseStudy, caseStudiesForService, featuredCaseStudies }

export type Post = {
  slug: string
  title: string
  description: string
  publishedAt: Date
  updatedAt: Date
  readingMinutes: number
  /** Plain-text body. Swap for MDX when the first post is written. */
  body?: string
}

/**
 * Blog is empty on purpose.
 *
 * Blueprint §9.6 — the first two posts should be
 *   1. "WordPress vs Next.js for a business website"
 *   2. the write-up of THIS migration, with the real before/after numbers
 * because that SERP is the weakest we inspected (page one is personal blogs
 * and micro-agencies, zero directories) and you are living the topic.
 *
 * Publishing filler to make the section look populated is worse than an empty
 * section. The index handles zero posts gracefully.
 */
const POSTS: Post[] = []

export async function getAllPosts(): Promise<Post[]> {
  return POSTS
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return POSTS.find((p) => p.slug === slug)
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  return CASE_STUDIES
}

/**
 * Location pages — blueprint §9.4.
 *
 * FOUR pages, and for AI AUTOMATION rather than web design. Reason: the
 * "web design + city" SERPs carry a local 3-pack you cannot enter without an
 * eligible physical address, and Clutch sits on page one. The AI-automation
 * geo SERPs show no map pack and are currently held by programmatic micro-sites
 * with no local presence.
 *
 * Do NOT expand this to fifty templated pages. Google's spam policies eat
 * doorway pages, and four genuinely different pages beat fifty thin ones.
 */
export const LOCATIONS = [
  {
    slug: 'dallas',
    city: 'Dallas',
    state: 'TX',
    stateName: 'Texas',
    blurb:
      'Dallas–Fort Worth runs on logistics, healthcare admin and professional services — three sectors where most of the working day is one team moving information between systems that do not talk.',
  },
  {
    slug: 'houston',
    city: 'Houston',
    state: 'TX',
    stateName: 'Texas',
    blurb:
      'Houston operations tend to be document-heavy: permits, inspections, compliance packets, vendor paperwork. That is exactly the shape of work a grounded assistant handles well and a general chatbot handles badly.',
  },
  {
    slug: 'austin',
    city: 'Austin',
    state: 'TX',
    stateName: 'Texas',
    blurb:
      'Austin teams are usually already automated somewhere and stuck somewhere else — a Zapier bill that grows faster than revenue, or a workflow nobody wants to touch because one person built it.',
  },
  {
    slug: 'san-antonio',
    city: 'San Antonio',
    state: 'TX',
    stateName: 'Texas',
    blurb:
      'San Antonio service businesses lose most to missed calls and slow follow-up. Answering and qualifying reliably is worth more than any dashboard.',
  },
] as const

export function getLocationSlugs(): readonly string[] {
  return LOCATIONS.map((l) => l.slug)
}

export function getLocation(slug: string) {
  return LOCATIONS.find((l) => l.slug === slug)
}

/** Kept for the sitemap and any legacy import. */
export function getServiceMeta(slug: string) {
  const s = getService(slug)
  if (!s) return undefined
  return { slug: s.slug, seoTitle: s.seoTitle, seoDescription: s.seoDescription, h1: s.h1 }
}
