/**
 * JSON-LD injector — Server Component, native <script>.
 *
 * Next's own guidance: JSON-LD is structured data, not executable code, so a
 * native <script> is correct here — do NOT use next/script.
 *
 * The `.replace(/</g, '\\u003c')` is not optional. Google's docs warn that
 * JSON.stringify does not sanitise XSS; escaping `<` closes the
 * `</script>`-injection hole for any DB-sourced string.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
