import Image from 'next/image'
import { ExternalLink, ShieldCheck } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

interface PartnersProps {
  locale: string
}

interface PartnerItem {
  slug: string
  name: string
  country: string
  role: string
  description: string
  logo: string
  logoAlt: string
  certUrl?: string
  certLabel?: string
  websiteUrl?: string
}

export async function Partners({ locale }: PartnersProps) {
  const t = await getTranslations({ locale, namespace: 'Partners' })

  const label = t('label')
  const title = t('title')
  const lead = t('lead')
  const items = t.raw('items') as PartnerItem[]

  const websiteLabel = locale === 'cs' ? 'Web partnera' : 'Visit website'

  return (
    <Section
      id="partneri"
      aria-labelledby="partners-heading"
      className="bg-white"
    >
      <Container>
        <AnimatedSection>
          {/* Section header (left-aligned, consistent with other sections) */}
          <div>
            <span className="block text-small uppercase tracking-[0.18em] font-semibold text-yellow">
              {label}
            </span>
            <h2
              id="partners-heading"
              className="mt-5 text-h1 text-navy [text-wrap:balance] [overflow-wrap:anywhere] hyphens-auto"
              lang={locale}
            >
              {title}
            </h2>
            <p className="mt-5 text-body-lg text-gray-dark/85 max-w-3xl whitespace-pre-line">
              {lead}
            </p>
          </div>

          {/* Partner cards grid (3 cols desktop, 2 tablet, 1 mobile) */}
          <ul
            role="list"
            className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {items.map((item, idx) => {
              const headingId = `partner-${item.slug}`
              const hasLogo = item.logo && item.logo.length > 0
              const linkUrl = item.certUrl || item.websiteUrl
              const linkLabel = item.certLabel || (item.websiteUrl ? websiteLabel : undefined)

              return (
                <AnimatedSection
                  key={item.slug}
                  as="li"
                  delay={idx * 0.06}
                  y={20}
                  className="list-none"
                >
                  <article
                    aria-labelledby={headingId}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-white p-7 md:p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-navy/20 hover:shadow-lg"
                  >
                    {/* Logo area — fixed height, centered logo OR text placeholder */}
                    <div className="relative flex h-20 md:h-24 w-full items-center justify-center">
                      {hasLogo ? (
                        <Image
                          src={item.logo}
                          alt={item.logoAlt}
                          width={200}
                          height={80}
                          className="max-h-full w-auto object-contain"
                        />
                      ) : (
                        <span
                          aria-label={item.logoAlt}
                          className="font-syne text-2xl md:text-3xl font-bold tracking-tight text-navy/85"
                        >
                          {item.name}
                        </span>
                      )}
                    </div>

                    {/* Cert badge (only PanelClaw) */}
                    {item.certUrl && (
                      <div className="mt-5 flex justify-center">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow/15 px-2.5 py-1 text-caption font-semibold uppercase tracking-wider text-navy">
                          <ShieldCheck
                            className="h-3.5 w-3.5"
                            strokeWidth={2.25}
                            aria-hidden="true"
                          />
                          <span>
                            {locale === 'cs' ? 'Certifikováno' : 'Certified'}
                          </span>
                        </span>
                      </div>
                    )}

                    {/* Name + role meta */}
                    <div className="mt-6 text-center">
                      <h3
                        id={headingId}
                        className="text-h4 font-semibold text-navy"
                      >
                        {item.name}
                      </h3>
                      <p className="mt-1.5 text-caption text-gray-medium uppercase tracking-wider">
                        {item.country} · {item.role}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="mt-4 flex-1 text-body text-gray-dark/75 leading-relaxed [text-wrap:pretty] text-center">
                      {item.description}
                    </p>

                    {/* External link: certificate OR partner website */}
                    {linkUrl && linkLabel && (
                      <div className="mt-5 flex justify-center">
                        <a
                          href={linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-small font-semibold text-navy underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-sm"
                        >
                          <span>{linkLabel}</span>
                          <ExternalLink
                            className="h-3.5 w-3.5"
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        </a>
                      </div>
                    )}
                  </article>
                </AnimatedSection>
              )
            })}
          </ul>
        </AnimatedSection>
      </Container>
    </Section>
  )
}
