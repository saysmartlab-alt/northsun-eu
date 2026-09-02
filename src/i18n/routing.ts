import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['cs', 'en'],
  defaultLocale: 'en',
  localePrefix: 'always',
  // Always land on EN — do not sniff Accept-Language so a Czech browser
  // hitting `/` still gets `/en` (the CZ visitor can switch via the
  // header pill). Default requested by the client.
  localeDetection: false,
  pathnames: {
    '/': '/',
    '/about': {
      cs: '/o-nas',
      en: '/about',
    },
    '/contact': {
      cs: '/kontakt',
      en: '/contact',
    },
    '/coming-soon': {
      cs: '/coming-soon',
      en: '/coming-soon',
    },
  },
})
