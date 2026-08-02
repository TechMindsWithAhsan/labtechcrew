#!/usr/bin/env node
/**
 * Reports which case studies have no product screenshots.
 *
 * Missing screenshots render as nothing — good for layout, bad for awareness,
 * because a case study can quietly ship as a wall of text with no evidence.
 * This makes the gap visible without breaking the build: a portfolio page
 * without a screenshot still converts far better than one with a stock photo,
 * so this WARNS, it does not fail.
 */
import { readFileSync } from 'node:fs'

const src = readFileSync('lib/data/work.ts', 'utf8')
const slugs = [...src.matchAll(/^\s{4}slug: '([^']+)'/gm)].map((m) => m[1])
const withShots = new Set(
  [...src.matchAll(/slug: '([^']+)'[\s\S]*?shots:\s*\[/g)].map((m) => m[1]),
)
// shots: [ may appear after a later slug; recompute per-block instead
const blocks = src.split(/\n  \{\n/).slice(1)
const missing = []
for (const b of blocks) {
  const s = b.match(/slug: '([^']+)'/)
  if (!s) continue
  if (!/\bshots:\s*\[/.test(b)) missing.push(s[1])
}

console.log(`Case studies: ${slugs.length}`)
if (missing.length === 0) {
  console.log('✅ every case study has product screenshots')
} else {
  console.log(`\n⚠️  ${missing.length} case stud${missing.length === 1 ? 'y has' : 'ies have'} NO screenshots:\n`)
  for (const m of missing) console.log(`   /portfolio/${m}/`)
  console.log('\n   These render as text only. That is safe, but a real screen from')
  console.log('   the build is the most persuasive thing a portfolio page can carry.')
  console.log('   Add to `shots:[]` in lib/data/work.ts. Never use stock imagery.\n')
}
