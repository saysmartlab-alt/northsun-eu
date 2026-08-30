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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 xl:gap-24 items-stretch">
            {/* Left column: content stack (7/12) — heading-left rhythm matches rest of page */}
            <div className="lg:col-span-7 flex flex-col">
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
              <p className="mt-5 text-body text-gray-dark/85 [text-wrap:pretty] max-w-prose">
                {body}
              </p>
              <Link
                href="#reference"
                className="group mt-10 lg:mt-auto self-start inline-flex items-center gap-2 rounded-lg bg-yellow px-7 py-4 text-base font-syne font-semibold text-navy shadow-sm transition-all duration-200 ease-out hover:bg-yellow-600 hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2"
              >
                <span>{ctaReferences}</span>
                <ArrowRight
                  className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>

            {/* Right column: portrait video — Norsko Solar Roof reference (5/12) */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-navy shadow-xl ring-1 ring-navy/10">
                <video
                  src="/video/norway-rooftop.mp4#t=7.75"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={
                    locale === 'cs'
                      ? 'NorthSun: Komerční solární střecha v Norsku'
                      : 'NorthSun: Commercial solar rooftop in Norway'
                  }
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  )
}
