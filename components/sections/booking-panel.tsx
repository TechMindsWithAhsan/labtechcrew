import { SITE } from '@/lib/site'

/**
 * BookingPanel — replaces two empty dashed placeholder boxes that were
 * rendering on the live site.
 *
 * ⚠️ WHAT WAS BROKEN, so it does not come back:
 * The contact page carried a 620px-tall empty box reading "Scheduling embed —
 * reserve this exact height", and the form's SUCCESS state carried a 220px
 * one. The second was the more expensive of the two: it appeared on the
 * thank-you screen immediately after someone submitted an enquiry — the single
 * highest-intent moment on the site — and told them, in effect, that the page
 * was unfinished. On bought traffic you get one impression, and that was it.
 *
 * Both were `TODO Phase 4` markers that were never meant to ship.
 *
 * This component NEVER renders an empty box:
 *   · `SITE.bookingUrl` set   → embedded calendar, height reserved, lazy-loaded
 *   · `SITE.bookingUrl` empty → a real card with phone, email and hours
 *
 * The fallback is not a consolation prize. A phone number a buyer can press on
 * a mobile is a perfectly good conversion path, and for US buyers evaluating
 * an offshore team it is often the one they actually want.
 */
export function BookingPanel({ compact = false }: { compact?: boolean }) {
  const height = compact ? 520 : 620

  if (SITE.bookingUrl) {
    return (
      <div
        className="overflow-hidden rounded-(--radius-lg) border border-white/12"
        /* Explicit height reserves the box BEFORE the iframe loads, so the
           page cannot shift under someone's thumb mid-tap. */
        style={{ height }}
      >
        <iframe
          src={SITE.bookingUrl}
          title="Book a 20-minute scoping call"
          loading="lazy"
          className="h-full w-full border-0"
        />
      </div>
    )
  }

  return (
    <div className="panel flex flex-col gap-4 rounded-(--radius-lg) p-6">
      <div>
        <h3 className="text-h3">Rather just talk? Call us.</h3>
        <p className="mt-2 text-(--color-text-muted)">
          No booking form, no waiting for a reply. If we are at our desks we
          will pick up, and if we are not, leave a message and we will call you
          back the same working day.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          href={`tel:${SITE.contact.phone}`}
          className="rounded-(--radius-md) bg-(--color-accent) px-5 py-3 text-center font-semibold text-(--color-accent-contrast) transition-colors hover:opacity-90"
        >
          Call {SITE.contact.phoneDisplay}
        </a>
        <a
          href={`mailto:${SITE.contact.email}?subject=Project%20enquiry`}
          className="rounded-(--radius-md) border border-white/20 px-5 py-3 text-center font-semibold text-white transition-colors hover:bg-white/5"
        >
          Email {SITE.contact.email}
        </a>
      </div>

      <p className="border-t border-white/10 pt-4 text-small text-(--color-text-subtle)">
        Answered 8am–1pm US Eastern, Monday to Friday — five hours of overlap
        with your working day, every working day.
      </p>
    </div>
  )
}
