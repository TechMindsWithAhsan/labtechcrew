import { Container } from '@/components/ui/layout'
import { ButtonLink } from '@/components/ui/button'
import { highlight } from '@/components/ui/layout'
import { PRIMARY_CTA } from '@/lib/site'

/**
 * Hero — Server Component, static render.
 *
 * The brand's signature move is one coral word inside a white heading. Pass
 * `accent` with the word you want highlighted. ONE word. Two and it stops
 * meaning anything.
 *
 * NO AUTOPLAY VIDEO. Google/Deloitte measured +21.6% form-submission
 * progression per 0.1s of LCP improvement in lead generation, and a hero
 * video is the signature agency LCP failure (next/image does not touch video).
 * Meta traffic is overwhelmingly mobile, where conversion is already ~1.53%
 * against ~3.9% on desktop. Every millisecond is paid for twice.
 *
 * The glow below is pure CSS — zero bytes, zero layout shift, and it mirrors
 * the radial light in the ad creatives.
 *
 * When a hero IMAGE is added, use a static import so width/height/blur are
 * inferred at build, and:
 *
 *   <Image src={hero} alt="…" fetchPriority="high" loading="eager"
 *          placeholder="blur" sizes="100vw" className="w-full h-auto" />
 *
 * NOT `priority` — deprecated in Next 16 in favour of `preload`.
 * `h-auto` alongside `w-full` is mandatory or you generate CLS.
 */
export function Hero({
  eyebrow,
  title,
  accent,
  lead,
  microTrust,
}: {
  eyebrow?: string
  title: string
  /** A substring of `title` rendered in coral. Case-sensitive. */
  accent?: string
  lead: string
  microTrust?: string[]
}) {
  return (
    <section className="relative overflow-hidden pb-24 pt-20 md:pb-32 md:pt-28">
      {/* Radial glow, echoing the light source in the ad creatives. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(58rem_36rem_at_78%_-14%,rgba(91,52,232,0.55),transparent_66%)]"
      />
      {/* A single warm bloom, so the page is not uniformly cold. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/2 size-[26rem] rounded-full opacity-25 blur-3xl [background:radial-gradient(circle,rgba(218,121,126,0.65),transparent_65%)]"
      />

      <Container className="relative">
        <div className="flex max-w-3xl flex-col gap-6">
          {eyebrow ? (
            <p className="text-eyebrow uppercase text-(--color-accent)">{eyebrow}</p>
          ) : null}

          <h1 className="text-display-1 text-white">{highlight(title, accent)}</h1>

          <p className="text-body-lg prose-measure text-(--color-text-muted)">{lead}</p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={PRIMARY_CTA.href} size="lg">
              {PRIMARY_CTA.label}
            </ButtonLink>
            <ButtonLink href="/work/" size="lg" variant="secondary">
              See our work
            </ButtonLink>
          </div>

          {microTrust?.length ? (
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-small text-(--color-text-muted)">
              {microTrust.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-coral-500" />
                  {t}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
