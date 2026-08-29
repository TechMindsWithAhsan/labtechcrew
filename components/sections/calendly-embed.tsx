'use client'

import { useEffect, useRef, useState } from 'react'

const CALENDLY_URL =
  'https://calendly.com/labtechcrew65/20min?background_color=05000f&text_color=ffffff&primary_color=da797e&hide_gdpr_banner=1&hide_landing_page_details=1'

const HEIGHT = 1050

export function CalendlyEmbed() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="relative overflow-hidden rounded-(--radius-lg) border border-white/12"
      style={{ minHeight: HEIGHT }}
    >
      {/* Skeleton — shown until iframe fires onLoad */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-(--color-brand-900)"
        style={{
          opacity: isLoaded ? 0 : 1,
          transition: 'opacity 350ms ease-in-out',
          pointerEvents: isLoaded ? 'none' : 'auto',
        }}
      >
        {/* Shimmer bar */}
        <div className="skeleton-shimmer h-3 w-48 rounded-full bg-white/8" />
        <p className="text-small text-(--color-text-muted)">Loading your calendar…</p>
      </div>

      {/* Iframe — only mounted after IntersectionObserver fires */}
      {shouldLoad && (
        <iframe
          src={CALENDLY_URL}
          title="Book a 20-minute scoping call"
          width="100%"
          height={HEIGHT}
          frameBorder="0"
          scrolling="no"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 350ms ease-in-out',
          }}
        />
      )}
    </div>
  )
}
