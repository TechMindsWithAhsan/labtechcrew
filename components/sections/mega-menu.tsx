'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Client LEAF. Keyboard-operable; closes on Escape, outside click, focus loss
 * and — critically — on navigation.
 *
 * ⚠️ THE NAVIGATION BUG (fixed here, do not regress):
 * The Header lives in the root layout, so it does NOT unmount on an App Router
 * client-side navigation. Clicking a link inside the panel swapped the page
 * underneath while this component kept its state — so `open` stayed `true` and
 * the panel hung over the new page until the user physically moved the mouse
 * away. `onMouseLeave` cannot save you here: the pointer never left the
 * element, only the page changed. Treat a pathname change as a close signal.
 */
export function MegaMenu({
  label,
  href,
  children,
}: {
  label: string
  href: string
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Close whenever the route changes. This is the actual fix.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        // Return focus to the trigger so keyboard users are not stranded.
        ref.current?.querySelector('button')?.focus()
      }
    }
    const onPointerDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onFocusIn = (e: FocusEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('focusin', onFocusIn)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('focusin', onFocusIn)
    }
  }, [open])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="services-mega-panel"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 rounded-(--radius-sm) px-3 py-2 text-[0.9375rem] font-medium text-(--color-text-muted) hover:text-white"
      >
        {label}
        <ChevronDown
          className={cn('size-4 transition-transform duration-150', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {open ? (
        /* absolute → out of flow → zero layout shift */
        <div
          id="services-mega-panel"
          className="absolute left-1/2 top-full z-50 w-[min(56rem,90vw)] -translate-x-1/2 pt-3"
          /* Belt and braces: a click on a link to the CURRENT url fires no
             pathname change, so close on any panel click as well. */
          onClick={() => setOpen(false)}
        >
          <div className="rounded-(--radius-lg) border border-white/12 bg-(--color-brand-800) p-8 shadow-(--shadow-lg)">
            {children}
            <div className="mt-6 border-t border-white/10 pt-4">
              <Link
                href={href}
                className="text-[0.9375rem] font-semibold text-(--color-accent) hover:text-coral-300"
              >
                See all services →
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
