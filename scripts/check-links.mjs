import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = '.next/server/app'
const pages = new Set()
function collect(dir, prefix = '') {
  for (const e of readdirSync(dir)) {
    const full = join(dir, e)
    if (statSync(full).isDirectory()) collect(full, `${prefix}/${e}`)
    else if (e.endsWith('.html')) {
      const name = e.replace(/\.html$/, '')
      pages.add(name === 'index' ? `${prefix}/` : `${prefix}/${name}/`)
    }
  }
}
collect(ROOT)

// Known dynamic/API/asset routes that are valid but not static HTML
const ALLOW = [/^\/api\//, /^\/#/, /^\/_next\//, /\.(xml|txt|png|svg|ico|webmanifest|jpg)$/]

const links = new Map()
function scan(dir) {
  for (const e of readdirSync(dir)) {
    const full = join(dir, e)
    if (statSync(full).isDirectory()) scan(full)
    else if (e.endsWith('.html')) {
      const html = readFileSync(full, 'utf8')
      for (const m of html.matchAll(/href=\\?"(\/[^"\\?#]*)/g)) {
        let href = m[1]
        if (!href.endsWith('/') && !/\.[a-z0-9]+$/i.test(href)) href += '/'
        if (!links.has(href)) links.set(href, new Set())
        links.get(href).add(full.replace(ROOT, '') || '/')
      }
    }
  }
}
scan(ROOT)

const broken = []
for (const [href, from] of links) {
  if (ALLOW.some((r) => r.test(href))) continue
  if (!pages.has(href)) broken.push({ href, from: [...from].slice(0, 3) })
}

console.log(`Static pages built : ${pages.size}`)
console.log(`Distinct internal links checked : ${links.size}`)
if (broken.length === 0) {
  console.log('\n✅ No broken internal links. Every href resolves to a built page.')
} else {
  console.log(`\n❌ ${broken.length} broken link(s):`)
  for (const b of broken) console.log(`   ${b.href}   ← linked from ${b.from.join(', ')}`)
}
