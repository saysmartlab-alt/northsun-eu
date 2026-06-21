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
  const title = t('title')
  const lead = t('lead')
  const items = t.raw('items') as ServiceItem[]

  return (
    <Section
      id="sluzby"
      aria-labelledby="services-heading"
      className="bg-gray-light"
    >
      <Container>
        <AnimatedSection>
          {/* Section header (left-aligned, max-w-3xl) */}
          <div className="max-w-3xl">
            <span className="block text-small uppercase tracking-[0.18em] font-semibold text-yellow">
              {label}
            </span>
            <h2
              id="services-heading"
              className="mt-5 text-h1 text-navy [text-wrap:balance]"
            >
              {title}
            </h2>
            <p className="mt-5 text-body-lg text-gray-dark/85 [text-wrap:pretty]">
              {lead}
            </p>
          </div>

          {/* Grid: 1 / 2 / 3 columns */}
          <ul
            role="list"
            className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {items.map((item) => {
              const Icon = ICON_MAP[item.slug]
              const headingId = `service-${item.slug}`

              return (
                <li key={item.slug} className="list-none">
                  <article
                    aria-labelledby={headingId}
                    className="group h-full cursor-default rounded-2xl border border-border bg-white p-6 md:p-10 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-navy/20 hover:shadow-md"
                  >
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow/15"
                      aria-hidden="true"
                    >
                      {Icon && <Icon className="h-6 w-6 text-navy" />}
                    </div>
                    <h3
                      id={headingId}
                      className="mt-6 text-h4 font-semibold text-navy"
                    >
                      {item.title}
                    </h3>
                    <p className="mt-3 text-body text-gray-dark/80 leading-relaxed">
                      {item.description}
                    </p>
                  </article>
                </li>
              )
            })}
          </ul>
        </AnimatedSection>
      </Container>
    </Section>
  )
}
