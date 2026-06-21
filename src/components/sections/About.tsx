import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
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
  const ctaReferences = t('ctaReferences')

  return (
    <Section id="o-nas" aria-labelledby="about-heading" className="bg-white">
      <Container>
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left column: vertical media placeholder (5/12) */}
            <div className="lg:col-span-5">
              <div
                className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-navy"
                aria-hidden="true"
              >
                {/* Subtle gradient + grain for premium feel until real media arrives */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 20%, rgba(0,74,173,0.55) 0%, transparent 55%), radial-gradient(circle at 80% 80%, rgba(252,192,19,0.18) 0%, transparent 50%), linear-gradient(135deg, #030057 0%, #02003d 100%)',
                  }}
                />
                <div
                  className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")`,
                  }}
                />
                {/* Placeholder copy (replace with <Image> or <video> once available) */}
                <div className="absolute bottom-6 left-6 right-6 text-white/40 text-caption uppercase tracking-[0.2em] font-semibold">
                  Media placeholder
                </div>
              </div>
            </div>

            {/* Right column: content stack (7/12) */}
            <div className="lg:col-span-7">
              <span className="block text-small uppercase tracking-[0.18em] font-semibold text-yellow">
                {label}
              </span>
              <h2
                id="about-heading"
                className="mt-5 text-h1 text-navy [text-wrap:balance]"
              >
                {title}
              </h2>
              <p className="mt-8 text-body-lg font-medium text-gray-dark [text-wrap:pretty]">
                {lead}
              </p>
              <p className="mt-5 text-body text-gray-dark/85 [text-wrap:pretty]">
                {body}
              </p>
              <Link
                href="#reference"
                className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-yellow px-7 py-4 text-base font-syne font-semibold text-navy shadow-sm transition-all duration-200 ease-out hover:bg-yellow-600 hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2"
              >
                <span>{ctaReferences}</span>
                <ArrowRight
                  className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  )
}
