#!/usr/bin/env node
/**
 * Google Search Console coverage auditor.
 *
 *   npm run audit:gsc -- ~/Downloads/gsc-pages-16mo.csv
 *
 * WHY THIS EXISTS
 * ---------------
 * The sitemap tells you what your CMS thinks exists. The Search Console Pages
 * export tells you what GOOGLE ACTUALLY HAS. Those two lists are never the
 * same, and the gap is where migrations quietly bleed traffic:
 *
 *   · pages published years ago and later unlinked, still indexed
 *   · URLs with query strings or old parameters
 *   · pages that 404 today but still rank (you have four of these)
 *   · uppercase / lowercase variants
 *   · URLs someone linked to from an ad, a directory or a press release
 *
 * A CMS export alone misses every one of them. This script unions your GSC
 * export against the redirect map and the new site's real pages, and tells you
 * exactly which URLs would 404 on launch day — RANKED BY THE CLICKS THEY EARN,
 * so you fix the ones that actually matter first.
 *
 * Run it BEFORE you switch DNS. Then again 30 days after.
 */

import { readFileSync } from 'node:fs'
import { redirects } from '../config/redirects.mjs'

/* ---------------------------------------------------------------- new site */

const SITE_PAGES = new Set([
  '/', '/about', '/services', '/work', '/how-we-work', '/pricing', '/contact', '/blog',
  '/services/website-development', '/services/mobile-app-development',
  '/services/custom-software', '/services/wordpress-to-nextjs-migration',
  '/services/ai-chatbots-development', '/services/ai-voice-agents',
  '/services/ai-automation', '/services/graphics-design', '/services/brand-strategy',
  '/portfolio/quranri', '/portfolio/ppinstall', '/portfolio/uload', '/portfolio/tradermind',
  '/portfolio/frame-x-labs', '/portfolio/the-digital-samurais',
  '/portfolio/ottenheimer-publishers', '/portfolio/lift-and-learn-fitness',
  '/locations/dallas', '/locations/houston', '/locations/austin', '/locations/san-antonio',
  '/legal/privacy', '/legal/terms', '/legal/cookies',
])

/* --------------------------------------------------------------- utilities */

const strip = (p) => (p !== '/' && p.endsWith('/') ? p.slice(0, -1) : p)
const escapeLiteral = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Same matcher as audit-redirects.mjs — `/:name*` swallows the preceding slash. */
function toRegex(source) {
  const tokenRe = /(\/?):([A-Za-z0-9_]+)(\([^)]*\))?([*+?])?/g
  let out = '', last = 0, m
  while ((m = tokenRe.exec(source)) !== null) {
    out += escapeLiteral(source.slice(last, m.index))
    const slash = m[1] === '/'
    const inner = m[3] ? m[3] : '[^/]+'
    const mod = m[4]
    if (mod === '*') out += slash ? `(?:/${inner})*` : `(?:${inner})*`
    else if (mod === '+') out += slash ? `(?:/${inner})+` : `(?:${inner})+`
    else if (mod === '?') out += slash ? `(?:/${inner})?` : `(?:${inner})?`
    else out += (slash ? '/' : '') + inner
    last = m.index + m[0].length
  }
  out += escapeLiteral(source.slice(last))
  return new RegExp(`^${out}$`)
}

/** Minimal CSV parser that survives quoted fields containing commas. */
function parseCsv(text) {
  const rows = []
  let row = [], field = '', inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++ } else inQuotes = false
      } else field += c
    } else if (c === '"') inQuotes = true
    else if (c === ',') { row.push(field); field = '' }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = '' }
    else if (c !== '\r') field += c
  }
  if (field || row.length) { row.push(field); rows.push(row) }
  return rows.filter((r) => r.some((c) => c.trim() !== ''))
}

const num = (v) => {
  const n = Number(String(v ?? '').replace(/[^0-9.]/g, ''))
  return Number.isFinite(n) ? n : 0
}

/* -------------------------------------------------------------------- main */

const file = process.argv[2]
if (!file) {
  console.error(`
Usage:  npm run audit:gsc -- <path-to-gsc-pages-export.csv>

Get the file from:
  Search Console → Performance → date range "16 months"
  → the "Pages" tab → Export → Download CSV

If the download is a .zip, unzip it and use "Pages.csv".
`)
  process.exit(1)
}

const rows = parseCsv(readFileSync(file, 'utf8'))
if (!rows.length) { console.error('That file is empty.'); process.exit(1) }

// Find the URL column and the clicks column, whatever GSC named them.
const header = rows[0].map((h) => h.trim().toLowerCase())
let urlCol = header.findIndex((h) => h.includes('page') || h.includes('url') || h.includes('address'))
let clickCol = header.findIndex((h) => h.includes('click'))
let imprCol = header.findIndex((h) => h.includes('impression'))

// Some exports have no header row — detect a bare URL in cell 0.
const hasHeader = !/^https?:\/\//i.test(rows[0][0] ?? '')
if (urlCol === -1) urlCol = 0
const body = hasHeader ? rows.slice(1) : rows

const rules = (await redirects()).map((r) => ({ rule: r, re: toRegex(r.source) }))

const covered = [], orphans = []

for (const r of body) {
  const raw = (r[urlCol] ?? '').trim()
  if (!raw) continue

  let path
  try {
    path = raw.startsWith('http') ? new URL(raw).pathname : raw
  } catch { continue }

  const clean = strip(path.split('?')[0].split('#')[0]) || '/'
  const clicks = clickCol >= 0 ? num(r[clickCol]) : 0
  const impressions = imprCol >= 0 ? num(r[imprCol]) : 0

  if (SITE_PAGES.has(clean)) {
    covered.push({ path: clean, clicks, impressions, how: 'live page' })
    continue
  }
  const hit = rules.find((m) => m.re.test(clean))
  if (hit) {
    covered.push({ path: clean, clicks, impressions, how: `301 → ${hit.rule.destination}` })
    continue
  }
  orphans.push({ path: clean, clicks, impressions })
}

/* ------------------------------------------------------------------ report */

const line = '─'.repeat(78)
const totalClicks = [...covered, ...orphans].reduce((a, b) => a + b.clicks, 0)
const lostClicks = orphans.reduce((a, b) => a + b.clicks, 0)

console.log(line)
console.log('Search Console coverage audit')
console.log(line)
console.log(`URLs in your export ......... ${covered.length + orphans.length}`)
console.log(`Covered (live or 301'd) ..... ${covered.length}`)
console.log(`NOT covered ................. ${orphans.length}`)
if (totalClicks > 0) {
  const pct = ((lostClicks / totalClicks) * 100).toFixed(1)
  console.log(`Clicks at risk .............. ${lostClicks} of ${totalClicks} (${pct}%)`)
}

if (orphans.length) {
  console.log(`\n❌ THESE URLS WOULD 404 ON LAUNCH DAY — highest value first:\n`)
  orphans
    .sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions)
    .slice(0, 60)
    .forEach((o) =>
      console.log(`   ${String(o.clicks).padStart(6)} clicks  ${String(o.impressions).padStart(7)} impr   ${o.path}`),
    )
  if (orphans.length > 60) console.log(`   … and ${orphans.length - 60} more`)

  console.log(`
   WHAT TO DO
   ----------
   Anything with clicks or meaningful impressions needs a redirect. Add it to
   config/redirects.mjs pointing at the closest surviving page:

       { source: '/the-old-path', destination: '/the-new-path/', permanent: true },

   Remember: source WITHOUT a trailing slash, destination WITH one.
   Then re-run:  npm run audit:seo  &&  npm run audit:gsc -- ${file}

   A URL with 0 clicks AND 0 impressions across 16 months can be left to 404.
   Redirecting genuinely dead URLs to the homepage creates soft-404s, which is
   worse than a clean 404.
`)
  process.exit(1)
}

console.log(`\n✅ Every URL Google knows about is either a live page or redirected.`)
console.log(`   Next: crawl staging with Screaming Frog in list mode and confirm`)
console.log(`   each one resolves in exactly ONE hop to a 200.\n`)

// Show the top pages so they know what to protect.
const top = covered.sort((a, b) => b.clicks - a.clicks).slice(0, 15)
if (top.some((t) => t.clicks > 0)) {
  console.log('Your highest-value URLs — check each of these by hand after launch:\n')
  top.forEach((t) =>
    console.log(`   ${String(t.clicks).padStart(6)} clicks   ${t.path.padEnd(44)} ${t.how}`),
  )
  console.log('')
}
