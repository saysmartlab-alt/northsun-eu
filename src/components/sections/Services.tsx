import { getTranslations } from 'next-intl/server'
import {
  Home,
  Sun,
  Car,
  Building2,
  Waves,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

interface ServicesProps {
  locale: string
}

type ServiceSlug =
  | 'residential'
  | 'solar-parks'
  | 'carports'
  | 'facades'
  | 'floating-pv'
  | 'repairs'

interface ServiceItem {
  slug: ServiceSlug
  title: string
  description: string
}

const ICON_MAP: Record<ServiceSlug, LucideIcon> = {
  residential: Home,
  'solar-parks': Sun,
  carports: Car,
  facades: Building2,
  'floating-pv': Waves,
  repairs: Wrench,
}

export async function Services({ locale }: ServicesProps) {
  const t = await getTranslations({ locale, namespace: 'Services' })

  const label = t('label')
  const lead = t('lead')
  const items = t.raw('items') as ServiceItem[]

  return (
    <Section
      id="sluzby"
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-navy"
    >
      {/* Dramatic navy gradient: navy-mid spotlight top-left + yellow whisper bottom-right */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 10%, rgba(0,74,173,0.55) 0%, transparent 55%), radial-gradient(ellipse at 85% 95%, rgba(252,192,19,0.15) 0%, transparent 50%), linear-gradient(135deg, #030057 0%, #02003d 100%)',
        }}
      />
      {/* Subtle grain overlay (premium feel, no flatness) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")`,
        }}
      />

      <Container className="relative">
        <AnimatedSection>
          {/* Section header (left-aligned, full container width pro forced breaks) */}
          <div>
            <span className="block text-small uppercase tracking-[0.18em] font-semibold text-yellow">
              {label}
            </span>
            <h2
              id="services-heading"
              className="mt-5 text-h1 text-white whitespace-pre-line"
            >
              {t.rich('title', {
                num: (chunks) => <span className="text-yellow">{chunks}</span>,
              })}
            </h2>
            <p className="mt-5 text-body-lg text-white/75 whitespace-pre-line max-w-3xl [text-wrap:balance]">
              {lead}
            </p>
          </div>

          {/* Grid: 1 / 2 / 3 columns. Per-card stagger animation. */}
          <ul
            role="list"
            className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {items.map((item, idx) => {
              const Icon = ICON_MAP[item.slug]
              const headingId = `service-${item.slug}`
              const number = String(idx + 1).padStart(2, '0')

              return (
                <AnimatedSection
                  key={item.slug}
                  as="li"
                  delay={idx * 0.08}
                  y={24}
                  className="list-none"
                >
                  <article
                    aria-labelledby={headingId}
                    className="group relative h-full cursor-default overflow-hidden rounded-2xl border border-border bg-white p-7 md:p-9 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-navy/30 hover:shadow-[0_20px_40px_-12px_rgba(3,0,87,0.18)]"
                  >
                    {/* Subtle gradient that reveals on hover (extra depth) */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          'radial-gradient(circle at 100% 0%, rgba(252,192,19,0.10) 0%, transparent 55%)',
                      }}
                    />

                    {/* Card number (top-right) — editorial premium touch */}
                    <span
                      aria-hidden="true"
                      className="absolute right-7 top-7 font-syne text-caption font-semibold tracking-widest text-navy/30 transition-colors duration-300 group-hover:text-navy/50 md:right-9 md:top-9"
                    >
                      {number}
                    </span>

                    {/* Icon container — solid on hover */}
                    <div
                      aria-hidden="true"
                      className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-yellow/20 transition-all duration-300 group-hover:bg-yellow group-hover:scale-105 group-hover:rotate-3"
                    >
                      {Icon && (
                        <Icon
                          className="h-7 w-7 text-navy transition-transform duration-300 group-hover:scale-110"
                          strokeWidth={1.75}
                        />
                      )}
                    </div>

                    <h3
                      id={headingId}
                      className="relative mt-7 text-h4 font-semibold text-navy"
                    >
                      {item.title}
                    </h3>
                    <p className="relative mt-3 text-body text-gray-dark/80 leading-relaxed">
                      {item.description}
                    </p>
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
