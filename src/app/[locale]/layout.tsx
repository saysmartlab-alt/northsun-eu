import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Syne } from 'next/font/google'
import { routing } from '@/i18n/routing'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import '../globals.css'

const syne = Syne({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL('https://northsun-eu.com'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: `https://northsun-eu.com/${locale}`,
      siteName: 'NorthSun',
      locale: locale === 'cs' ? 'cs_CZ' : 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        cs: '/cs',
        en: '/en',
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  setRequestLocale(locale)

  return (
    <html lang={locale} className={syne.variable}>
      <body>
        <NextIntlClientProvider>
          <LanguageSwitcher />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
