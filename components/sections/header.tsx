import Link from 'next/link'
import { Phone } from 'lucide-react'
import { Container } from '@/components/ui/layout'
import { ButtonLink } from '@/components/ui/button'
import { Wordmark } from '@/components/ui/logo'
import { PRIMARY_NAV, PRIMARY_CTA, SITE, SERVICE_TIERS } from '@/lib/site'
import { MobileNav } from './mobile-nav'
import { MegaMenu } from './mega-menu'

/**
 * Header — a SERVER COMPONENT.
 *
 * This is the most important architectural rule in the project. Putting
 * 'use client' here because of one dropdown would drag the entire tree below
 * it into the client bundle and turn the whole site into a client-rendered
 * React app with an SSR'd first paint — the worst of both worlds, and the
 * top-listed INP killer in Next's own performance discussion.
 *
 * The interactive bits (MobileNav, MegaMenu) are 'use client' LEAVES, and
 * they receive Server Component children as props — those arrive as a
 * serialized RSC payload, not as a client import, so they never enter the
 * bundle.
 *
 * Visually: transparent over the page gradient, with a blur + hairline that
 * only appear on scroll. A solid header bar would cut the gradient in half.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-(--color-brand-950)/70 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2.5">
            <Wordmark className="h-8 w-auto" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {PRIMARY_NAV.map((item) =>
              item.mega ? (
                <MegaMenu key={item.href} label={item.label} href={item.href}>
                  {/* Server-rendered children — never enters the client bundle */}
                  <div className="grid gap-8 md:grid-cols-3">
                    {SERVICE_TIERS.map((tier) => (
                      <div key={tier.id} className="flex flex-col gap-3">
                        <p className="text-eyebrow uppercase text-(--color-accent)">{tier.label}</p>
                        <ul className="flex flex-col gap-2.5">
                          {tier.services.map((s) => (
                            <li key={s.slug}>
                              <Link
                                href={`/services/${s.slug}/`}
                                className="-mx-2 block rounded-(--radius-sm) px-2 py-1.5 hover:bg-white/8"
                              >
                                <span className="block text-[0.9375rem] font-medium text-white">
                                  {s.name}
                                </span>
                                <span className="block text-small text-(--color-text-subtle)">
                                  {s.outcome}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </MegaMenu>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-(--radius-sm) px-3 py-2 text-[0.9375rem] font-medium text-(--color-text-muted) hover:text-white"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3">
            {/* A visible US phone number converts paid traffic. Digital Silk,
                the closest analogue to this buyer, does exactly this. */}
            <a
              href={`tel:${SITE.contact.phone}`}
              className="hidden items-center gap-1.5 text-[0.9375rem] font-medium text-(--color-text-muted) hover:text-white md:inline-flex"
            >
              <Phone className="size-4" aria-hidden="true" />
              {SITE.contact.phoneDisplay}
            </a>

            <ButtonLink href={PRIMARY_CTA.href} className="hidden lg:inline-flex">
              {PRIMARY_CTA.label}
            </ButtonLink>

            <MobileNav>
              <nav aria-label="Mobile" className="flex flex-col gap-1">
                {PRIMARY_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-(--radius-md) px-3 py-3 text-[1rem] font-medium text-white hover:bg-white/8"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-2 border-t border-white/10 pt-4">
                  <p className="px-3 text-eyebrow uppercase text-(--color-accent)">Services</p>
                  {SERVICE_TIERS.flatMap((t) => t.services).map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}/`}
                      className="block rounded-(--radius-md) px-3 py-2.5 text-[0.9375rem] text-(--color-text-muted) hover:bg-white/8 hover:text-white"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </nav>
            </MobileNav>
          </div>
        </div>
      </Container>
    </header>
  )
}

/**
 * Mobile sticky CTA. Mobile converts at roughly 1.53% against 3.9% on desktop,
 * and Meta traffic is overwhelmingly mobile — keep the action always reachable.
 */
export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-(--color-brand-950)/90 p-3 backdrop-blur lg:hidden">
      <ButtonLink href={PRIMARY_CTA.href} size="lg" className="w-full">
        {PRIMARY_CTA.label}
      </ButtonLink>
    </div>
  )
}
