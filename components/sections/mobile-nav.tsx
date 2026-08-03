'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
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
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  // The portal needs a real `document`. Render nothing until we are on the
  // client, so server rendering and the first hydration pass agree.
  useEffect(() => setMounted(true), [])

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

  const panel = (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      /* position: fixed → out of document flow → contributes ZERO layout shift.
         z-100 clears every body-level fixed element: MobileCtaBar (z-30),
         WhatsAppButton (z-40) and ConsentBanner (z-50). Inside the header its
         old z-50 was local to the header's z-40 stacking context, so those
         three painted straight through the overlay. */
      className="fixed inset-0 z-100 flex flex-col bg-(--color-brand-950) lg:hidden"
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
  )

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

      {/*
        ⚠️ THE CONTAINING-BLOCK TRAP — the panel is portalled to document.body
        and MUST STAY THAT WAY. Do not "simplify" this back to inline JSX.

        <header> carries `backdrop-blur-md`. An element with a backdrop-filter
        becomes the CONTAINING BLOCK for its fixed-position descendants. This
        component is rendered inside that header, so a `fixed inset-0` panel
        living in the header sizes itself to the 64px header box (h-16), NOT
        the viewport: the menu opens as a thin strip across the top, the page
        shows through underneath it, and the panel's own bottom CTA spills out
        below the strip. It looks like a background or z-index bug. It is not.

        Portalling to <body> escapes both that containing block and the
        header's z-40 stacking context. The blur is intentional design — fix
        layering here, never by removing `backdrop-blur-md` from the header.

        The component itself stays in the React tree, so usePathname, the
        Escape handler and the scroll lock above are unaffected; only the DOM
        node moves. `aria-controls` still resolves because it is ID-based.
      */}
      {mounted && open ? createPortal(panel, document.body) : null}
    </>
  )
}
