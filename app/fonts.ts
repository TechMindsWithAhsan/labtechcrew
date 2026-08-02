/**
 * ONE definitions file. Calling a next/font loader twice creates TWO font
 * instances. Import from here, never re-declare.
 *
 * Blueprint §5.2 — never load fonts via `@import url('fonts.googleapis.com')`
 * or a <link>. Both forfeit next/font's metric-matched fallback and guarantee
 * layout shift on swap. Coming from Elementor this will try to sneak back in:
 * grep the repo for `fonts.googleapis.com` before every deploy.
 */
import { Inter, Sora } from 'next/font/google'

export const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const display = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['600', '700'],
})

export const fontVariables = `${sans.variable} ${display.variable}`
