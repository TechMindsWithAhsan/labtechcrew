import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Server Component. No 'use client' — a button that navigates needs no JS.
 *
 * COLOUR RULE, measured not guessed:
 *   coral #DA797E with WHITE text  = 2.99:1  ❌ fails WCAG
 *   coral #DA797E with #0F0026     = 6.8:1   ✅
 * So the primary button is coral with DARK text. Never invert it.
 *
 * Coral is the only warm colour in the brand, which makes it the strongest
 * possible draw on a violet-to-black page. Reserve it for the ONE action you
 * actually want taken. Everything else is secondary or ghost.
 */

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-(--radius-md) ' +
  'transition-[transform,background-color,border-color,color,box-shadow] duration-150 ease-(--ease-brand) ' +
  'active:translate-y-px disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap'

const variants: Record<Variant, string> = {
  // Coral fill + dark text. The one high-draw element on the page.
  primary:
    'bg-coral-500 text-(--color-accent-contrast) hover:bg-coral-400 shadow-(--shadow-coral)',
  // Outlined. Reads as "available" without competing with primary.
  secondary:
    'border border-white/25 text-white hover:border-coral-500 hover:text-coral-300 ' +
    '[[data-theme=light]_&]:border-(--color-border) [[data-theme=light]_&]:text-(--color-text) [[data-theme=light]_&]:hover:text-(--color-accent)',
  ghost: 'text-brand-100 hover:text-white hover:bg-white/8',
  // For use ON a coral or bright surface.
  inverse: 'bg-white text-brand-800 hover:bg-brand-50',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-[0.875rem]',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-13 px-7 text-[1rem]',
}

type ButtonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps & ComponentProps<'button'>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  )
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps & ComponentProps<typeof Link>) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </Link>
  )
}
