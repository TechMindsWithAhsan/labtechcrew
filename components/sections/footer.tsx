import Link from 'next/link'
import { Container } from '@/components/ui/layout'
import { Wordmark } from '@/components/ui/logo'
import { SITE, SERVICE_TIERS } from '@/lib/site'

/**
 * Footer — blueprint §3.2 and §2.5.
 *
 * ORDERING IS THE WHOLE POINT: the US entity, street address and US phone
 * come FIRST; Karachi is stated plainly on the second line. That is the
 * pattern every credible Pakistani-origin comparable uses (Folio3, Arbisoft,
 * Cubix, Tkxel). Nothing is concealed — it is just ordered. Concealment is
 * fragile; a buyer who discovers it has found you being evasive about the one
 * thing they were already nervous about.
 *
 * Visually the footer sits at the black end of the page gradient, which is
 * exactly where the creatives put their contact details.
 */
export function Footer() {
  const services = SERVICE_TIERS.flatMap((t) => t.services)

  return (
    <footer className="relative border-t border-white/10 bg-black/40 py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <Wordmark className="h-8 w-auto" />
            </div>
            <p className="text-small max-w-[34ch] text-(--color-text-subtle)">{SITE.tagline}</p>
          </div>

          <FooterColumn title="Services">
            {services.map((s) => (
              <FooterLink key={s.slug} href={`/services/${s.slug}/`}>
                {s.name}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            <FooterLink href="/work/">Work</FooterLink>
            <FooterLink href="/how-we-work/">How We Work</FooterLink>
            <FooterLink href="/pricing/">Pricing</FooterLink>
            <FooterLink href="/about/">About</FooterLink>
            <FooterLink href="/blog/">Blog</FooterLink>
            <FooterLink href="/contact/">Contact</FooterLink>
          </FooterColumn>

          <FooterColumn title="Get in touch">
            <address className="not-italic text-small leading-relaxed text-(--color-text-subtle)">
              <strong className="block font-semibold text-white">{SITE.legalName}</strong>
              {SITE.address.street}
              <br />
              {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}
              <br />
              <a href={`tel:${SITE.contact.phone}`} className="text-(--color-accent) hover:text-coral-300">
                {SITE.contact.phoneDisplay}
              </a>
              <br />
              <a href={`mailto:${SITE.contact.email}`} className="hover:text-white">
                {SITE.contact.email}
              </a>
            </address>
            <p className="text-small text-(--color-text-subtle)">
              Engineering team — {SITE.engineering.city}, {SITE.engineering.country}
            </p>
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-small text-(--color-text-subtle) md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}, {SITE.jurisdiction}.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/legal/privacy/" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/legal/terms/" className="hover:text-white">
              Terms
            </Link>
            <Link href="/legal/cookies/" className="hover:text-white">
              Cookies
            </Link>
            <a href={SITE.social.linkedin} rel="noopener" className="hover:text-white">
              LinkedIn
            </a>
            <a href={SITE.social.instagram} rel="noopener" className="hover:text-white">
              Instagram
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-eyebrow uppercase text-white">{title}</p>
      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-small text-(--color-text-subtle) hover:text-white">
        {children}
      </Link>
    </li>
  )
}
