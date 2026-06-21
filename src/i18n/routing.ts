import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['cs', 'en'],
  defaultLocale: 'cs',
  localePrefix: 'always',
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
