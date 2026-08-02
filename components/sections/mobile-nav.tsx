'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button'
import { PRIMARY_CTA } from '@/lib/site'

/**
 * Client LEAF. It receives its links as Server Component `children`, so the
 * nav markup never enters the client bundle — only this toggle does.
 */
export function MobileNav({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="grid size-10 place-items-center rounded-(--radius-md) text-(--color-text-muted) hover:bg-white/8 lg:hidden"
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>

      {open ? (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          /* position: fixed → out of document flow → contributes ZERO layout shift */
          className="fixed inset-0 z-50 flex flex-col bg-(--color-brand-950) lg:hidden"
        >
          <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
            <span className="font-(family-name:--font-display) font-bold text-white">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid size-10 place-items-center rounded-(--radius-md) text-(--color-text-muted) hover:bg-white/8"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">{children}</div>

          <div className="border-t border-white/10 p-4">
            <ButtonLink href={PRIMARY_CTA.href} size="lg" className="w-full">
              {PRIMARY_CTA.label}
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </>
  )
}
