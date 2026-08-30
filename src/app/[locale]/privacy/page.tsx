import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { CONTACT_EMAIL } from '@/lib/constants'

interface PrivacyPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Privacy' })
  return {
    title: t('title'),
    description: t('metaDescription'),
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: {
        cs: '/cs/privacy',
        en: '/en/privacy',
      },
    },
  }
}

interface PrivacySection {
  heading: string
  body: string
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Privacy' })

  const sections = t.raw('sections') as PrivacySection[]
  const backLabel =
    locale === 'cs' ? 'Zpět na hlavní stránku' : 'Back to homepage'

  return (
    <Section id="privacy" className="bg-white pt-32 md:pt-36">
      <Container>
        {/* Back link — small text link above the label */}
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-1.5 text-small font-semibold text-navy/70 hover:text-navy transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 rounded-sm"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>{backLabel}</span>
        </Link>

        {/* Header row: label + h1 + intro on left, decorative space on right */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-6">
          <div className="lg:col-span-8">
            <p className="text-small uppercase tracking-[0.18em] font-semibold text-yellow">
              {t('label')}
            </p>
            <h1 className="mt-5 text-h1 text-navy [text-wrap:balance]">
              {t('title')}
            </h1>
          </div>
          <p className="lg:col-span-8 text-body-lg text-gray-dark/85 leading-relaxed [text-wrap:pretty]">
            {t('intro', { email: CONTACT_EMAIL })}
          </p>
        </div>

        {/* GDPR sections — heading left column, body right column (editorial 2-col) */}
        <div className="mt-16 md:mt-20 space-y-12 md:space-y-14">
          {sections.map((section, idx) => (
            <section
              key={idx}
              className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-4 border-t border-border pt-8 md:pt-10"
            >
              <h2 className="lg:col-span-4 text-h3 text-navy [text-wrap:balance]">
                {section.heading}
              </h2>
              <p className="lg:col-span-8 text-body text-gray-dark/85 leading-relaxed whitespace-pre-line [text-wrap:pretty]">
                {section.body.replace(/{email}/g, CONTACT_EMAIL)}
              </p>
            </section>
          ))}
        </div>

        {/* Footer row: last updated + back link */}
        <div className="mt-16 md:mt-20 flex flex-col-reverse gap-4 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-caption text-gray-medium">{t('lastUpdated')}</p>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-1.5 self-start text-small font-semibold text-navy hover:text-yellow transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 rounded-sm md:self-auto"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>{backLabel}</span>
          </Link>
        </div>
      </Container>
    </Section>
  )
}
