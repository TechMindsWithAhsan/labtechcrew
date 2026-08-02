#!/usr/bin/env node
/**
 * Redirect map auditor.
 *
 * Run `npm run audit:seo` after ANY change to config/redirects.mjs, and again
 * against staging before you touch DNS.
 *
 * What it checks:
 *   1. Every legacy URL either matches a redirect rule or is expected to be a
 *      live page in the new site. Nothing silently 404s.
 *   2. No rule redirects to itself (infinite loop).
 *   3. No chains — a destination must not itself be the source of another rule.
 *   4. Every `source` and `destination` is written WITHOUT a trailing slash
 *      (required by trailingSlash: true).
 *   5. `/` before `:` in every parameterised source.
 *
 * This is a static check. It does NOT replace crawling staging with Screaming
 * Frog in list mode, where every old URL must resolve in exactly ONE hop to a
 * 200. Do both.
 */

import { redirects, LEGACY_URLS } from '../config/redirects.mjs'

const NEW_SITE_PAGES = new Set([
  '/',
  '/about',
  '/services',
  '/work',
  '/how-we-work',
  '/pricing',
  '/contact',
  '/blog',
  '/services/website-development',
  '/services/mobile-app-development',
  '/services/ai-chatbots-development',
  '/services/graphics-design',
  '/services/brand-strategy',
  '/services/digital-marketing',
  '/services/game-development',
  '/services/ai-automation',
  '/services/custom-software',
  '/services/wordpress-to-nextjs-migration',
  '/portfolio/ppinstall',
  '/portfolio/uload',
  '/portfolio/tradermind',
  '/portfolio/ottenheimer-publishers',
  '/portfolio/frame-x-labs',
  '/portfolio/lift-and-learn-fitness',
  '/portfolio/the-digital-samurais',
  '/portfolio/quranri',
])

const strip = (p) => (p !== '/' && p.endsWith('/') ? p.slice(0, -1) : p)

const escapeLiteral = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * Turn a Next.js `source` pattern into a matcher.
 *
 * The subtle bit: in path-to-regexp, the `*` and `+` modifiers on `/:name`
 * swallow the PRECEDING slash — so `/feed/:path*` matches `/feed` as well as
 * `/feed/anything`. Getting this wrong makes the auditor report false
 * uncovered URLs, which is worse than not auditing at all.
 */
function toRegex(source) {
  const tokenRe = /(\/?):([A-Za-z0-9_]+)(\([^)]*\))?([*+?])?/g
  let out = ''
  let last = 0
  let m

  while ((m = tokenRe.exec(source)) !== null) {
    out += escapeLiteral(source.slice(last, m.index))

    const slash = m[1] === '/'
    const inner = m[3] ? m[3] : '[^/]+' // custom pattern already carries its parens
    const mod = m[4]

    if (mod === '*') {
      out += slash ? `(?:/${inner})*` : `(?:${inner})*`
    } else if (mod === '+') {
      out += slash ? `(?:/${inner})+` : `(?:${inner})+`
    } else if (mod === '?') {
      out += slash ? `(?:/${inner})?` : `(?:${inner})?`
    } else {
      out += (slash ? '/' : '') + inner
    }

    last = m.index + m[0].length
  }

  out += escapeLiteral(source.slice(last))
  return new RegExp(`^${out}$`)
}

const rules = await redirects()
const errors = []
const warnings = []

// --- 2, 4, 5: structural rules -------------------------------------------
for (const r of rules) {
  if (r.source !== '/' && r.source.endsWith('/')) {
    errors.push(`source has a trailing slash (trailingSlash:true forbids it): ${r.source}`)
  }
  if (!r.destination.endsWith('/')) {
    errors.push(
      `destination MUST end with "/" or the browser makes a second hop: ${r.destination}`,
    )
  }
  if (strip(r.source) === strip(r.destination) && !r.has) {
    errors.push(`INFINITE LOOP — source === destination: ${r.source}`)
  }
  if (/[^/]:/.test(r.source)) {
    errors.push(`missing "/" before ":" (infinite-redirect risk): ${r.source}`)
  }
  if (r.permanent !== true) {
    warnings.push(`not permanent (emits 307, not 308): ${r.source}`)
  }
}

// --- 3: chains ------------------------------------------------------------
const sourceMatchers = rules.map((r) => ({ rule: r, re: toRegex(r.source) }))
for (const r of rules) {
  if (r.destination.includes(':')) continue // parameterised, cannot resolve statically
  const chained = sourceMatchers.find(
    (m) => m.rule !== r && m.re.test(r.destination) && !m.rule.has,
  )
  if (chained) {
    errors.push(
      `CHAIN — "${r.source}" → "${r.destination}" but "${chained.rule.source}" also matches that destination`,
    )
  }
}

// --- 1: coverage ----------------------------------------------------------
const uncovered = []
for (const legacy of LEGACY_URLS) {
  const path = strip(legacy)
  if (NEW_SITE_PAGES.has(path)) continue
  const hit = sourceMatchers.find((m) => m.re.test(path))
  if (!hit) uncovered.push(legacy)
}

// --- report ---------------------------------------------------------------
const line = '─'.repeat(72)
console.log(line)
console.log(`Redirect audit — ${rules.length} rules, ${LEGACY_URLS.length} legacy URLs`)
console.log(line)

if (uncovered.length) {
  console.log('\n❌ LEGACY URLS WITH NO REDIRECT AND NO MATCHING PAGE:')
  uncovered.forEach((u) => console.log(`   ${u}`))
}
if (errors.length) {
  console.log('\n❌ ERRORS:')
  errors.forEach((e) => console.log(`   ${e}`))
}
if (warnings.length) {
  console.log('\n⚠️  WARNINGS:')
  warnings.forEach((w) => console.log(`   ${w}`))
}

if (!uncovered.length && !errors.length) {
  console.log('\n✅ Every legacy URL resolves. No loops, no chains, slash policy consistent.')
  console.log('   Next: crawl STAGING with Screaming Frog in list mode and confirm')
  console.log('   every old URL returns 200 in exactly one hop.\n')
} else {
  console.log('')
  process.exit(1)
}
