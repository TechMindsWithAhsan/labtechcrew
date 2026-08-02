import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Container / Section / Eyebrow / SectionHeading.
 *
 * The page gradient lives on <body> and is `background-attachment: fixed`, so
 * sections are TRANSPARENT by default and the violet-to-black ramp shows
 * through the whole page — exactly like the ad creatives. Do not give a
 * section a solid dark background "to be safe"; it breaks the ramp and the
 * page starts looking like stacked black boxes.
 *
 * Section rhythm is py-24 mobile → py-32 desktop, consistently. Inconsistent
 * vertical rhythm is what makes a site feel "made in a page builder".
 */

export function Container({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('mx-auto w-full max-w-(--container-site) px-6 md:px-8', className)}>
      {children}
    </div>
  )
}

export function Section({
  as: Tag = 'section',
  tone = 'default',
  className,
  children,
  id,
  glow,
  /**
   * Skips offscreen layout work with `content-visibility: auto`.
   *
   * ⚠️ OFF BY DEFAULT, deliberately. On this page length it left 600px blank
   * holes where sections had not been painted yet (caught in a full-page
   * screenshot). Only turn it on for genuinely long pages — a 40-post blog
   * index — and re-screenshot after you do.
   */
  defer = false,
}: {
  as?: ElementType
  /**
   * default — transparent, the body gradient shows through (use this ~90% of the time)
   * veil    — a faint darkening band, for separating two adjacent sections
   * light   — white section for long-form reading only (blog, legal)
   */
  tone?: 'default' | 'veil' | 'light'
  /**
   * A soft violet bloom, so the lower two-thirds of a long page is not a flat
   * black void. Use it on one or two sections per page, no more.
   */
  glow?: 'left' | 'right'
  className?: string
  children: ReactNode
  id?: string
  defer?: boolean
}) {
  return (
    <Tag
      id={id}
      data-theme={tone === 'light' ? 'light' : undefined}
      className={cn(
        'relative py-24 md:py-32',
        tone === 'veil' && 'bg-black/20',
        tone === 'light' && 'bg-white',
        defer && 'defer-paint',
        className,
      )}
    >
      {glow ? (
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 overflow-hidden',
            glow === 'left'
              ? '[background:radial-gradient(46rem_26rem_at_8%_50%,rgba(91,52,232,0.20),transparent_70%)]'
              : '[background:radial-gradient(46rem_26rem_at_92%_50%,rgba(91,52,232,0.20),transparent_70%)]',
          )}
        />
      ) : null}
      <div className="relative">{children}</div>
    </Tag>
  )
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('text-eyebrow uppercase text-(--color-accent)', className)}>{children}</p>
  )
}

/**
 * Section heading with the brand's signature move built in: one coral word
 * inside a white heading. Pass `accent` and that word gets highlighted.
 *
 * ONE coral word per heading. Two and it stops meaning anything.
 */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  lead,
  align = 'left',
}: {
  eyebrow?: string
  title: string
  /** A substring of `title` to render in coral. Case-sensitive. */
  accent?: string
  lead?: string
  align?: 'left' | 'center'
}) {
  return (
    <div className={cn('flex flex-col gap-4', align === 'center' && 'items-center text-center')}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-display-2">{highlight(title, accent)}</h2>
      {lead ? (
        <p className="text-body-lg prose-measure text-(--color-text-muted)">{lead}</p>
      ) : null}
    </div>
  )
}

/** Splits a string around `accent` and wraps that fragment in the coral class. */
export function highlight(text: string, accent?: string): ReactNode {
  if (!accent) return text
  const i = text.indexOf(accent)
  if (i === -1) return text
  return (
    <>
      {text.slice(0, i)}
      <span className="em-accent">{accent}</span>
      {text.slice(i + accent.length)}
    </>
  )
}
