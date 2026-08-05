import Image, { type StaticImageData } from 'next/image'
import type { ReactNode } from 'react'
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
 * Always use a static import, so width/height are inferred at build. That is
 * what reserves the box and prevents CLS — nothing else here does. `h-auto`
 * alongside a width class is mandatory for the same reason.
 *
 * NOT `priority` on either kind of image — deprecated in Next 16 in favor of
 * `preload`.
 *
 * THERE ARE TWO KINDS OF HERO IMAGE AND THEY GET OPPOSITE PROPS.
 *
 * 1. A hero BACKGROUND image — full width, at the top, almost certainly the
 *    LCP element:
 *
 *      <Image src={hero} alt="…" fetchPriority="high" loading="eager"
 *             placeholder="blur" sizes="100vw" className="w-full h-auto" />
 *
 * 2. A DECORATIVE character or side illustration — see HeroColumns below:
 *
 *      <Image src={character} alt="…" loading="lazy"
 *             sizes="…" className="h-auto w-auto max-h-…" />
 *
 *    No `fetchPriority`, no `loading="eager"`, no `placeholder="blur"`.
 *
 *    · The LCP element on these pages is the HEADLINE TEXT. Giving a decoration
 *      high priority makes it compete with the thing that actually gets
 *      measured. Below `lg` the character is under the fold entirely, and ~85%
 *      of our traffic is mobile — eager there means paying to download an image
 *      nobody has scrolled to.
 *    · No blur placeholder on a TRANSPARENT cut-out. The placeholder is a
 *      low-resolution raster painted into the image box, so blurring a cut-out
 *      bleeds its edges outward into a visible colored rectangle that then
 *      snaps away when the real file arrives. That is the flash on load, it is
 *      not a caching artifact, and it happens on every cold load. A blur
 *      placeholder is for a full-bleed photograph that fills its box.
 */

/**
 * A brand character illustration for a hero.
 *
 * `src` is a StaticImageData, NOT a string path — it must come from a static
 * import (`import img from '@/public/characters/home.webp'`). That is what lets
 * next/image infer the intrinsic width and height at build time, and those two
 * attributes are the ONLY thing reserving the box. A string src would push the
 * dimensions back to whoever writes the next page, and the day one is forgotten
 * the hero shifts under the reader's thumb.
 */
export type HeroCharacter = { src: StaticImageData; alt: string }

/**
 * Two-column hero layout: text left, character right, from `lg` up.
 *
 * WITHOUT a character it renders `children` untouched — no grid, no empty
 * column, no layout change of any kind. That is why it returns a fragment
 * rather than a wrapper div.
 *
 * ⚠️ SIZING IS BY HEIGHT, NOT WIDTH, and that is deliberate. The characters
 * range from 0.35 (a 487×1400 portrait) to 1.31 (a 1400×1068 landscape) — a
 * 3.8× spread. Any single column WIDTH that suits one ruins the other: at
 * 320px wide the portrait renders 920px tall and owns the viewport. So the
 * image is capped by `max-h` with `w-auto`, and the column is capped at 18rem
 * so a wide image cannot dominate the row either. Both ends are bounded, so
 * neither column can collapse.
 *
 * This is why `w-full` from the note above is NOT used here — `h-auto` is, and
 * it is the half of that rule that prevents CLS. The intrinsic dimensions come
 * from the static import, so the box is reserved before the bytes arrive.
 *
 * Below `lg` the character sits BELOW the text — after the CTA in DOM order, so
 * it cannot push the button down the page whatever height it renders at. It is
 * capped harder there (16rem) because mobile hero space is the most valuable on
 * the site.
 */
export function HeroColumns({
  character,
  children,
}: {
  character?: HeroCharacter
  children: ReactNode
}) {
  if (!character) return <>{children}</>

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] lg:items-center lg:gap-12">
      {children}
      <Image
        src={character.src}
        alt={character.alt}
        /* Lazy, no fetchPriority, no blur placeholder — all three deliberate.
           See the two-kinds-of-hero-image note at the top of this file. */
        loading="lazy"
        sizes="(min-width: 1024px) 18rem, 80vw"
        className="mx-auto h-auto w-auto max-h-64 max-w-full lg:max-h-96"
      />
    </div>
  )
}

export function Hero({
  eyebrow,
  title,
  accent,
  lead,
  microTrust,
  character,
}: {
  eyebrow?: string
  title: string
  /** A substring of `title` rendered in coral. Case-sensitive. */
  accent?: string
  lead: string
  microTrust?: string[]
  /** Optional brand character. Omitted → the single-column hero, unchanged. */
  character?: HeroCharacter
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
        <HeroColumns character={character}>
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
        </HeroColumns>
      </Container>
    </section>
  )
}
