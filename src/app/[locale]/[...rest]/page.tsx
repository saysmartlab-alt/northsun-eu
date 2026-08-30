import { notFound } from 'next/navigation'

/**
 * Catch-all under `/[locale]/*` that triggers Next.js `notFound()`. Without
 * this, unmatched paths inside a locale fall through to the internal
 * `_not-found` route and render Next.js's default "This page could not be
 * found." — bypassing our styled `[locale]/not-found.tsx`.
 *
 * By explicitly matching any depth of segments and throwing notFound(), we
 * force render of the sibling `not-found.tsx` file.
 */
export default function LocaleCatchAll() {
  notFound()
}
