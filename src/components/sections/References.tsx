import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { Flag } from '@/components/ui/Flag'

interface ReferencesProps {
  locale: string
}

type FlagCode = 'CZ' | 'SE' | 'NO' | 'NL' | 'HR' | 'DE' | 'BE' | 'EU'
type RefTag = 'own' | 'partner-sunsurf'

interface ReferenceItem {
  flag: FlagCode
  location: string
  title: string
  description: string
  tag: RefTag
  image: string
  alt: string
}

function slugify(title: string, idx: number): string {
  // Strip diacritics, lowercase, ascii-only. Fallback to index for empty result.
  const base = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return base ? `${base}-${idx}` : `ref-${idx}`
}

export async function References({ locale }: ReferencesProps) {
  const t = await getTranslations({ locale, namespace: 'References' })

  const label = t('label')
  const title = t('title')
  const lead = t('lead')
  const tagOwn = t('tagOwn')
  const tagPartnerSunsurf = t('tagPartnerSunsurf')
  const items = t.raw('items') as ReferenceItem[]

  const tagLabel = (tag: RefTag): string =>
    tag === 'own' ? tagOwn : tagPartnerSunsurf

  return (
    <Section
      id="reference"
      aria-labelledby="references-heading"
      className="bg-gray-light"
    >
      <Container>
        <AnimatedSection>
          {/* Section header (left-aligned, pattern z Why/Services) */}
          <div>
            <span className="block text-small uppercase tracking-[0.18em] font-semibold text-yellow">
              {label}
            </span>
            <h2
              id="references-heading"
              className="mt-5 text-h1 text-navy [text-wrap:balance]"
            >
              {title}
            </h2>
            <p className="mt-5 text-body-lg text-gray-dark/85 max-w-3xl [text-wrap:pretty]">
              {lead}
            </p>
          </div>

          {/* Grid 6 karet: 1 / 2 / 3 sloupce, editorial wide format */}
          <ul
            role="list"
            className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {items.map((item, idx) => {
              const slug = slugify(item.title, idx)
              const headingId = `ref-${slug}`
              const badgeVariant = item.tag === 'own' ? 'success' : 'muted'

              return (
                <AnimatedSection
                  key={headingId}
                  as="li"
                  delay={idx * 0.06}
                  y={20}
                  className="list-none"
                >
                  <article
                    aria-labelledby={headingId}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:border-navy/20 hover:shadow-lg"
                  >
                    {/* Image (full bleed top, editorial 16/10 wide format) */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy/5">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      {/* Bottom gradient pro readability location badge */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent"
                      />
                      {/* Location badge na image overlay */}
                      <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-md bg-black/50 px-2.5 py-1 backdrop-blur-sm">
                        <Flag
                          code={item.flag}
                          title={item.location}
                          className="h-3.5"
                        />
                        <span className="text-caption font-semibold uppercase tracking-wider text-white">
                          {item.location}
                        </span>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="flex flex-1 flex-col p-6 md:p-7">
                      <h3
                        id={headingId}
                        className="text-h4 font-semibold text-navy [text-wrap:balance]"
                      >
                        {item.title}
                      </h3>
                      <p className="mt-2 text-body text-gray-dark/75 leading-relaxed [text-wrap:pretty]">
                        {item.description}
                      </p>
                      <div className="mt-4 flex">
                        <Badge variant={badgeVariant}>{tagLabel(item.tag)}</Badge>
                      </div>
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
