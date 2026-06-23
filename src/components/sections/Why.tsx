import { getTranslations } from 'next-intl/server'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

interface WhyProps {
  locale: string
}

interface WhyItem {
  title: string
  description: string
}

export async function Why({ locale }: WhyProps) {
  const t = await getTranslations({ locale, namespace: 'Why' })

  const label = t('label')
  const title = t('title')
  const lead = t('lead')
  const items = t.raw('items') as WhyItem[]

  return (
    <Section
      id="proc-northsun"
      aria-labelledby="why-heading"
      className="relative overflow-hidden bg-navy"
    >
      {/* Subtle navy gradient + grain for depth (continuity s ostatními dark sekcemi) */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 80% 20%, rgba(0,74,173,0.45) 0%, transparent 55%), radial-gradient(ellipse at 15% 90%, rgba(252,192,19,0.10) 0%, transparent 50%), linear-gradient(135deg, #030057 0%, #02003d 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")`,
        }}
      />

      <Container className="relative">
        <AnimatedSection>
          {/* Section header (left-aligned, no max-w constraint on wrapper) */}
          <div>
            <span className="block text-small uppercase tracking-[0.18em] font-semibold text-yellow">
              {label}
            </span>
            <h2
              id="why-heading"
              className="mt-5 text-h1 text-white [text-wrap:balance]"
            >
              {title}
            </h2>
            <p className="mt-5 text-body-lg text-white/80 max-w-3xl [text-wrap:pretty]">
              {lead}
            </p>
          </div>

          {/* 4 pillars: 2x2 desktop, 1 col mobile. Editorial big-number approach. */}
          <ul
            role="list"
            className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16"
          >
            {items.map((item, idx) => {
              const number = String(idx + 1).padStart(2, '0')
              const headingId = `why-pillar-${idx + 1}`

              return (
                <AnimatedSection
                  key={number}
                  as="li"
                  delay={idx * 0.1}
                  y={20}
                  className="list-none"
                >
                  <article
                    aria-labelledby={headingId}
                    className="group flex items-start gap-6 md:gap-8"
                  >
                    {/* Big number, decorative — dominates the left side.
                        inline-block + min-w + tabular-nums = consistent width so item 01
                        (narrow "1" glyph) aligns with items 02–04 (wider digits). */}
                    <span
                      aria-hidden="true"
                      className="inline-block tabular-nums shrink-0 min-w-[1.6em] font-syne font-extrabold leading-none text-yellow transition-colors duration-200 ease-out group-hover:text-white"
                      style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)' }}
                    >
                      {number}
                    </span>

                    {/* Vertical divider between number and content */}
                    <span
                      aria-hidden="true"
                      className="h-16 w-px shrink-0 self-start bg-white/15"
                    />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3
                        id={headingId}
                        className="text-h3 font-semibold text-white [text-wrap:balance]"
                      >
                        {item.title}
                      </h3>
                      <p className="mt-3 text-body text-white/75 leading-relaxed [text-wrap:pretty]">
                        {item.description}
                      </p>
                    </div>
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
