import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Syne, JetBrains_Mono } from 'next/font/google'
import { routing } from '@/i18n/routing'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BackToTop } from '@/components/layout/BackToTop'
import { ResetScrollOnReload } from '@/components/layout/ResetScrollOnReload'
import { CookieConsent } from '@/components/layout/CookieConsent'
import { JsonLd } from '@/components/layout/JsonLd'
import '../globals.css'

const syne = Syne({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-mono',
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
    metadataBase: new URL('https://www.northsun-eu.com'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: `https://www.northsun-eu.com/${locale}`,
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

  const c = await getTranslations({ locale, namespace: 'CookieConsent' })
  const cookieTexts = {
    message: c('message'),
    privacyLabel: c('privacyLabel'),
    accept: c('accept'),
    reject: c('reject'),
    ariaBanner: c('ariaBanner'),
    ariaAccept: c('ariaAccept'),
    ariaReject: c('ariaReject'),
  }

  return (
    <html lang={locale} className={`${syne.variable} ${jetbrains.variable}`}>
      <body>
        <a href="#main-content" className="skip-to-content">
          {locale === 'cs' ? 'Přeskočit na obsah' : 'Skip to content'}
        </a>
        <NextIntlClientProvider>
          <Header locale={locale} />
          {children}
          <Footer locale={locale} />
        </NextIntlClientProvider>
        <JsonLd />
        <ResetScrollOnReload />
        <BackToTop locale={locale} />
        <CookieConsent locale={locale} texts={cookieTexts} />
      </body>
    </html>
  )
}
