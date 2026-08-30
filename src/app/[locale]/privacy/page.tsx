import type { Metadata } from 'next'
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

  return (
    <Section id="privacy" className="bg-white pt-32 md:pt-40">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-small uppercase tracking-[0.18em] font-semibold text-yellow">
            {t('label')}
          </p>
          <h1 className="mt-5 text-h1 text-navy [text-wrap:balance]">
            {t('title')}
          </h1>
          <p className="mt-6 text-body-lg text-gray-dark/80 whitespace-pre-line">
            {t('intro', { email: CONTACT_EMAIL })}
          </p>

          <div className="mt-14 space-y-10">
            {sections.map((section, idx) => (
              <section key={idx} className="border-t border-border pt-8">
                <h2 className="text-h3 text-navy [text-wrap:balance]">
                  {section.heading}
                </h2>
                <p className="mt-4 text-body text-gray-dark/85 leading-relaxed whitespace-pre-line">
                  {section.body.replace(/{email}/g, CONTACT_EMAIL)}
                </p>
              </section>
            ))}
          </div>

          <p className="mt-16 text-caption text-gray-medium">
            {t('lastUpdated')}
          </p>
        </div>
      </Container>
    </Section>
  )
}
