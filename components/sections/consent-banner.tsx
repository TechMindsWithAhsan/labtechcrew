'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

/**
 * Consent banner — `position: fixed`, so it sits OUT of document flow and
 * contributes exactly zero layout shift.
 *
 * A cookie banner injected into normal flow is the single largest CLS source
 * on agency sites: it prepends to <body> ~800ms after first paint, pushes
 * everything down ~120px, and generates CLS around 0.25 on its own. A hosted
 * CMP bundle loaded `beforeInteractive` does that AND blocks the critical
 * path with 100–200KB. Do not do either.
 *
 * Consent Mode v2 ordering constraint: the consent DEFAULTS must run before
 * gtag.js loads or they do not work. Split it three ways —
 *   defaults  → tiny inline script, beforeInteractive (see app/layout.tsx)
 *   this UI   → lazy, fixed, client component
 *   the tags  → afterInteractive / lazyOnload
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem('ltc-consent')) setVisible(true)
    } catch {
      /* storage blocked — stay hidden rather than nag */
    }
  }, [])

  function decide(granted: boolean) {
    try {
      localStorage.setItem('ltc-consent', granted ? 'granted' : 'denied')
    } catch {
      /* ignore */
    }
    const w = window as unknown as { gtag?: (...args: unknown[]) => void }
    w.gtag?.('consent', 'update', {
      ad_storage: granted ? 'granted' : 'denied',
      ad_user_data: granted ? 'granted' : 'denied',
      ad_personalization: granted ? 'granted' : 'denied',
      analytics_storage: granted ? 'granted' : 'denied',
    })
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/12 bg-(--color-brand-850) p-4 text-(--color-text-muted) lg:bottom-4 lg:left-4 lg:right-auto lg:max-w-md lg:rounded-(--radius-lg) lg:border"
    >
      <p className="text-small">
        We use cookies to measure how the site performs and how our ads do. You can say no and
        everything still works.
      </p>
      <div className="mt-3 flex gap-2">
        <Button size="sm" onClick={() => decide(true)}>
          Accept
        </Button>
        <Button size="sm" variant="secondary" onClick={() => decide(false)}>
          Decline
        </Button>
      </div>
    </div>
  )
}
