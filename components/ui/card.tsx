import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Cards use the `.panel` class — a translucent violet fill with a hairline
 * white border, so the body gradient shows through. A solid-fill card on a
 * gradient page reads as a flat sticker; a translucent one reads as depth.
 */

export function Card({
  className,
  children,
  href,
}: {
  className?: string
  children: ReactNode
  href?: string
}) {
  const classes = cn(
    'panel group relative flex flex-col gap-3 rounded-(--radius-lg) p-6',
    'transition-[border-color,box-shadow,transform] duration-200 ease-(--ease-brand)',
    href && 'hover:border-coral-500/50 hover:shadow-(--shadow-md) hover:-translate-y-0.5',
    className,
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }
  return <div className={classes}>{children}</div>
}

export function Badge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode
  tone?: 'neutral' | 'accent' | 'highlight'
}) {
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[0.75rem] font-medium',
        tone === 'neutral' && 'bg-white/10 text-(--color-text-muted)',
        tone === 'accent' && 'bg-coral-500/15 text-coral-300',
        // #F90060. At most ONE of these on a page. It is a highlight, not a color.
        tone === 'highlight' && 'bg-magenta-500 text-white',
      )}
    >
      {children}
    </span>
  )
}

export function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-(family-name:--font-display) text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-none text-(--color-accent)">
        {value}
      </span>
      <span className="text-small text-(--color-text-muted)">{label}</span>
    </div>
  )
}
