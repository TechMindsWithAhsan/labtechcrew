#!/usr/bin/env node
/**
 * Guard against the Tailwind v4 CSS-variable syntax bug.
 *
 * `text-[--color-accent]` was valid in Tailwind v3. In v4 it compiles to the
 * invalid declaration `color: --color-accent`, which browsers discard without
 * warning — no build error, no console message, just an element with no
 * colour. It shipped 243 times in this repo and made the services mega-menu
 * render fully transparent.
 *
 * Runs in ~50ms. Wire it into `npm run check` so CI catches a regression
 * before a human has to notice a transparent dropdown.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const ROOTS = ['app', 'components', 'lib']
const EXTS = new Set(['.ts', '.tsx', '.css', '.mdx'])
// Matches a bare custom property inside square brackets: [--foo]
const BAD = /\[--[a-zA-Z0-9-]+\]/g

const findings = []

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry.startsWith('.')) continue
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full)
    else if (EXTS.has(extname(full))) scan(full)
  }
}

function scan(file) {
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      for (const m of line.matchAll(BAD)) {
        findings.push({ file, line: i + 1, token: m[0] })
      }
    })
}

for (const r of ROOTS) {
  try { walk(r) } catch { /* directory absent — fine */ }
}

if (findings.length === 0) {
  console.log('✅ token lint: no invalid CSS-variable syntax found')
  process.exit(0)
}

console.error(`\n❌ token lint: ${findings.length} invalid CSS-variable utilit${findings.length === 1 ? 'y' : 'ies'} found.\n`)
console.error('   Tailwind v4 needs PARENTHESES for variables. Square brackets')
console.error('   compile to invalid CSS that browsers silently drop.\n')
for (const f of findings) {
  const fixed = f.token.replace('[', '(').replace(']', ')')
  console.error(`   ${f.file}:${f.line}  ${f.token}  →  ${fixed}`)
}
console.error('')
process.exit(1)
