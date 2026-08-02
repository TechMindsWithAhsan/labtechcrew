import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

/**
 * Visible breadcrumbs. Pair with `breadcrumbSchema()` from lib/seo — Google
 * still supports BreadcrumbList and it replaces the URL line in the SERP,
 * which is one of the cheapest visible wins available.
 *
 * The LAST crumb has no href — it is the current page.
 */
export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-small text-(--color-text-subtle)">
        {items.map((item, i) => (
          <li key={item.name} className="flex items-center gap-1.5">
            {item.href ? (
              <Link href={item.href} className="hover:text-white">
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-(--color-text-muted)">
                {item.name}
              </span>
            )}
            {i < items.length - 1 ? (
              <ChevronRight className="size-3.5 opacity-50" aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}
