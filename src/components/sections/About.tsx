import { getTranslations } from 'next-intl/server'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

interface AboutProps {
  locale: string
}

export async function About({ locale }: AboutProps) {
  const t = await getTranslations({ locale, namespace: 'About' })

  const label = t('label')
  const title = t('title')
  const lead = t('lead')
  const body = t('body')

  return (
    <Section
      id="o-nas"
      aria-labelledby="about-heading"
      className="bg-white"
    >
      <Container>
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 lg:gap-24">
            {/* Left column: label + H2 (4/12 on desktop) */}
            <div className="lg:col-span-4">
              <span className="block text-small uppercase tracking-[0.18em] font-semibold text-yellow">
                {label}
              </span>
              <h2
                id="about-heading"
                className="mt-5 text-h1 text-navy [text-wrap:balance]"
              >
                {title}
              </h2>
            </div>

            {/* Right column: lead + body (8/12 on desktop) */}
            <div className="lg:col-span-8">
              <p className="text-body-lg font-medium text-gray-dark [text-wrap:pretty]">
                {lead}
              </p>
              <p className="mt-6 text-body text-gray-medium leading-[1.7] [text-wrap:pretty]">
                {body}
              </p>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  )
}
