/**
 * Content facade.
 *
 * The real content lives in `lib/data/services.ts`, `lib/data/work.ts`,
 * and `content/blog/*.md`. This file exists so pages, the sitemap and any
 * future CMS have one import surface — swap the bodies for database calls
 * later without touching a single page component.
 *
 * Everything here is build-time. No marketing page should query a database on
 * request (blueprint §7.3): all of them are statically generated, which is
 * both a speed decision and an AI-visibility prerequisite, since AI crawlers
 * execute zero JavaScript.
 */

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

import { SERVICES, getService, type ServiceContent } from './data/services'
import {
  CASE_STUDIES,
  getCaseStudy,
  caseStudiesForService,
  featuredCaseStudies,
  caseStudyName,
  type CaseStudy,
} from './data/work'

export type { ServiceContent, CaseStudy }
export {
  SERVICES,
  getService,
  CASE_STUDIES,
  getCaseStudy,
  caseStudiesForService,
  featuredCaseStudies,
  caseStudyName,
}

export type Post = {
  slug: string
  title: string
  description: string
  publishedAt: Date
  updatedAt: Date
  readingMinutes: number
  body: string
  draft: boolean
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')

function readMarkdownFiles(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return []

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'))

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8')
    const { data, content } = matter(raw)

    const stat = fs.statSync(path.join(CONTENT_DIR, file))
    const publishedAt = stat.birthtime
    const updatedAt = stat.mtime

    const wordCount = content.split(/\s+/).filter(Boolean).length
    const readingMinutes = Math.max(1, Math.round(wordCount / 200))

    const body = remark().use(html).processSync(content).toString()

    return {
      slug: data.slug ?? file.replace(/\.md$/, ''),
      title: data.title ?? file.replace(/\.md$/, ''),
      description: data.description ?? '',
      publishedAt,
      updatedAt,
      readingMinutes,
      body,
      draft: data.draft === true,
    } satisfies Post
  })

  return posts.sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
  )
}

let _posts: Post[] | null = null

function getPosts(): Post[] {
  if (!_posts) _posts = readMarkdownFiles()
  return _posts
}

export async function getAllPosts(): Promise<Post[]> {
  return getPosts().filter((p) => !p.draft)
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return getPosts().find((p) => p.slug === slug && !p.draft)
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
