import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.northsun-eu.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // API routes are server-only + coming-soon is legacy pre-launch page.
      disallow: ['/api/', '/cs/coming-soon', '/en/coming-soon'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
