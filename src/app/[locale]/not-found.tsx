import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'
import { NotFoundContent } from './NotFoundContent'

// Keep 404 pages out of Google's index.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

/**
 * Locale-aware 404 for anything under /[locale]/*.
 * Uses getLocale() rather than params — Next.js does not pass params to
 * not-found.tsx, but next-intl still exposes the current locale via context.
 */
export default async function LocaleNotFound() {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'NotFound' })

  return (
    <NotFoundContent
      locale={locale}
      texts={{
        label: t('label'),
        heading: t('heading'),
        lead: t('lead'),
        primaryCta: t('primaryCta'),
        secondaryCta: t('secondaryCta'),
      }}
    />
  )
}
