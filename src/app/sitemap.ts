import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.northsun-eu.com'
const LOCALES = ['cs', 'en'] as const
const DEFAULT_LOCALE = 'en' as const

/**
 * Public routes across all locales. Homepage aggregates all content
 * (About/Services/References/Why/Partners/Contact are anchor sections on `/`),
 * so we only ship the actual route entries: homepage + privacy.
 *
 * `x-default` points at the English variant so Google serves EN to the
 * "language unknown" segment, matching the runtime default (routing.ts).
 */
const PUBLIC_ROUTES = [
  { path: '', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return PUBLIC_ROUTES.flatMap((route) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          ...Object.fromEntries(
            LOCALES.map((l) => [l, `${BASE_URL}/${l}${route.path}`])
          ),
          'x-default': `${BASE_URL}/${DEFAULT_LOCALE}${route.path}`,
        },
      },
    }))
  )
}
