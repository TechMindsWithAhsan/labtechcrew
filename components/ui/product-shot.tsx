import Image from 'next/image'

/**
 * ProductShot — the ONLY image type this site should carry.
 *
 * ══════════════════════════════════════════════════════════════════════════
 * WHY THIS COMPONENT EXISTS, AND WHY IT REFUSES EVERYTHING ELSE
 * ══════════════════════════════════════════════════════════════════════════
 *
 * This site's entire competitive position is that its claims are checkable.
 * Prices published. No office claimed where there is none. No invented team.
 * An image either strengthens that or contradicts it — there is no neutral
 * decoration on a page built this way.
 *
 * A screenshot of software we actually shipped is EVIDENCE: the visitor can
 * open the live URL beside it and confirm it in ten seconds.
 *
 * Stock photography is the opposite. "Diverse team smiling at a laptop" is the
 * single strongest tell of an offshore agency with nothing to show, and buyers
 * have been trained on it for twenty years. The previous WordPress site
 * carried three such JPGs — shared across three different case-study pages,
 * with filenames matching stock-agency comp patterns. They are logged as a
 * licensing risk in LICENSES.md. Do not bring them back.
 *
 * ❌ NEVER pass this component: stock photos, team headshots, third-party
 *    client logos (no written permission = legal exposure), AI-generated
 *    hero art, illustrated "dashboard" mockups of software that does not
 *    exist, or an award badge nobody awarded.
 * ✅ ONLY pass: a real screen from a real build, at a real URL.
 *
 * ── Performance, because this traffic is bought ──
 * Meta traffic is ~85% mobile and abandons on a slow first paint, so:
 *  · `width`/`height` are REQUIRED — they reserve the box and prevent the
 *    layout shift that otherwise throws the CTA down the page mid-tap.
 *  · `priority` on the one shot above the fold, never on the others.
 *  · next/image emits AVIF then WebP (configured in next.config.ts).
 */
export function ProductShot({
  src,
  alt,
  width,
  height,
  priority = false,
  caption,
  className = '',
}: {
  src?: string
  /** Describe what the software is DOING. "QuranRI answering with its source cited"
   *  — not "screenshot" or "app image", which tell a screen-reader user nothing. */
  alt?: string
  width: number
  height: number
  priority?: boolean
  caption?: string
  className?: string
}) {
  /**
   * No screenshot yet → render NOTHING.
   *
   * Deliberate. A placeholder box saying "image coming soon" on a page selling
   * software engineering does more damage than the empty space it fills, and
   * on bought traffic you only get one impression. `npm run check:shots`
   * reports which case studies are still missing one.
   */
  if (!src || !alt) return null

  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-(--radius-lg) border border-white/12 bg-(--color-brand-900)">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          className="h-auto w-full"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-small text-(--color-text-subtle)">{caption}</figcaption>
      ) : null}
    </figure>
  )
}
