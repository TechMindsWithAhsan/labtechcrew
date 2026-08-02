#!/usr/bin/env node
/**
 * Static audit for the things that actually break layouts on a phone.
 *
 * Meta traffic is ~85% mobile, so a single horizontal overflow costs real
 * money: the page scrolls sideways, the CTA drifts off screen, and the
 * visitor leaves. These patterns are the usual causes.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const findings = []
const ROOTS = ['app', 'components']

const RULES = [
  {
    // w-[900px] etc. Anything wider than the smallest common viewport (320px)
    // that is not capped by max-w-full will push the page sideways.
    re: /\bw-\[(\d{3,})px\]/g,
    test: (m) => Number(m[1]) > 320,
    msg: (m) => `fixed width ${m[1]}px — will overflow a 320px viewport`,
  },
  {
    re: /\bmin-w-\[(\d{3,})px\]/g,
    test: (m) => Number(m[1]) > 320,
    msg: (m) => `min-width ${m[1]}px — cannot shrink on a phone`,
  },
  {
    // grid-cols-N with no responsive prefix = N columns even at 320px
    re: /className="[^"]*?(?<![a-z:])grid-cols-([3-9]|1[0-2])\b[^"]*"/g,
    test: (m) => !/\b(sm|md|lg|xl):grid-cols-/.test(m[0]),
    msg: (m) => `grid-cols-${m[1]} with no responsive prefix — ${m[1]} columns on a phone`,
  },
  {
    // Horizontal padding that eats a 320px screen alive
    re: /\bp[xl]?-\[(\d{2,})px\]/g,
    test: (m) => Number(m[1]) > 48,
    msg: (m) => `padding ${m[1]}px — very large on a small screen`,
  },
  {
    re: /\bwhitespace-nowrap\b/g,
    test: () => true,
    msg: () => `whitespace-nowrap — check the text is short enough not to overflow`,
    warn: true,
  },
  {
    re: /<table\b/g,
    test: () => true,
    msg: () => `raw <table> — needs an overflow-x-auto wrapper on mobile`,
  },
]

function walk(dir) {
  for (const e of readdirSync(dir)) {
    if (e === 'node_modules' || e.startsWith('.')) continue
    const full = join(dir, e)
    if (statSync(full).isDirectory()) walk(full)
    else if (['.tsx', '.ts'].includes(extname(full))) scan(full)
  }
}

function scan(file) {
  const lines = readFileSync(file, 'utf8').split('\n')
  lines.forEach((line, i) => {
    for (const rule of RULES) {
      rule.re.lastIndex = 0
      for (const m of line.matchAll(rule.re)) {
        if (rule.test(m)) {
          findings.push({ file, line: i + 1, msg: rule.msg(m), warn: !!rule.warn })
        }
      }
    }
  })
}

for (const r of ROOTS) walk(r)

const errors = findings.filter((f) => !f.warn)
const warns = findings.filter((f) => f.warn)

console.log(`Responsive audit — ${errors.length} issue(s), ${warns.length} to eyeball\n`)
for (const f of errors) console.log(`  ❌ ${f.file}:${f.line}  ${f.msg}`)
for (const f of warns) console.log(`  ⚠️  ${f.file}:${f.line}  ${f.msg}`)
if (errors.length === 0) console.log('  ✅ no hard overflow risks found')
