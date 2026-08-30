import { getTranslations } from 'next-intl/server'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { ReferenceCardMedia } from './ReferenceCardMedia'
import { GalleryCard } from './GalleryCard'
import type { GalleryModalTexts } from './GalleryModal'

interface ReferencesProps {
  locale: string
}

type FlagCode = 'CZ' | 'SE' | 'NO' | 'NL' | 'HR' | 'DE' | 'BE' | 'EU'
type RefTag = 'own' | 'own-with-sunsurf' | 'partner-sunsurf'
type GallerySlug = 'lulea' | 'skelleftea'

interface ReferenceItem {
  slug: string
  flag: FlagCode
  location: string
  title: string
  year?: string
  power?: string
  type?: string
  description: string
  tag: RefTag
  /** External video link — shows a small "Video" badge overlay on the card. */
  videoUrl?: string
  /** Self-hosted video file (in /public). Renders inline `<video>` with poster + native controls. */
  videoSrc?: string
  /** Poster image for self-hosted video (fallback: falls back to `image`). */
  videoPoster?: string
  /** YouTube video ID — renders inline facade + iframe-on-click (youtube-nocookie). */
  youtubeId?: string
  image: string
  alt: string
  /** Optional gallery key. Swaps the tag badge for a CTA that opens the
   *  matching gallery modal (grid of sub-installations). */
  gallery?: GallerySlug
}

interface GalleryTextsWithBadge extends GalleryModalTexts {
  ctaLabel: string
  badgeLabel: string
  badgeAriaLabel: string
}

export async function References({ locale }: ReferencesProps) {
  const t = await getTranslations({ locale, namespace: 'References' })

  const label = t('label')
  const title = t('title')
  const lead = t('lead')
  const tagOwn = t('tagOwn')
  const tagOwnWithSunsurf = t('tagOwnWithSunsurf')
  const tagPartnerSunsurf = t('tagPartnerSunsurf')
  const videoLabel = locale === 'cs' ? 'Video' : 'Video'
  const items = t.raw('items') as ReferenceItem[]
  const luleaGallery = t.raw('luleaGallery') as GalleryTextsWithBadge
  const skellefteaGallery = t.raw('skellefteaGallery') as GalleryTextsWithBadge

  const galleryData: Record<GallerySlug, GalleryTextsWithBadge> = {
    lulea: luleaGallery,
    skelleftea: skellefteaGallery,
  }

  const tagLabel = (tag: RefTag): string => {
    if (tag === 'own') return tagOwn
    if (tag === 'own-with-sunsurf') return tagOwnWithSunsurf
    return tagPartnerSunsurf
  }

  const badgeVariant = (tag: RefTag): 'success' | 'muted' =>
    tag === 'partner-sunsurf' ? 'muted' : 'success'

  return (
    <Section
      id="reference"
      aria-labelledby="references-heading"
      className="bg-white"
    >
      <Container>
        <AnimatedSection>
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
            <p className="mt-5 text-body-lg text-gray-dark/85 max-w-3xl whitespace-pre-line">
              {lead}
            </p>
          </div>

          <ul
            role="list"
            className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {items.map((item, idx) => {
              const headingId = `ref-${item.slug}`
              const metadata = [item.year, item.type, item.power].filter(Boolean)
              const gallery = item.gallery
                ? galleryData[item.gallery]
                : undefined

              // Gallery items delegate to Client wrapper so the corner badge
              // and pill button share modal state.
              if (item.gallery && gallery) {
                return (
                  <GalleryCard
                    key={item.slug}
                    item={item}
                    gallery={gallery}
                    galleryId={`gallery-${item.gallery}`}
                    tagLabel={tagLabel(item.tag)}
                    badgeVariant={badgeVariant(item.tag)}
                    animationDelay={idx * 0.06}
                    locale={locale}
                  />
                )
              }

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
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:border-navy/20 hover:shadow-lg"
                  >
                    <ReferenceCardMedia
                      image={item.image}
                      alt={item.alt}
                      flag={item.flag}
                      location={item.location}
                      title={item.title}
                      locale={locale}
                      videoUrl={item.videoUrl}
                      videoLabel={item.videoUrl ? videoLabel : undefined}
                      videoSrc={item.videoSrc}
                      videoPoster={item.videoPoster}
                      youtubeId={item.youtubeId}
                    />

                    <div className="flex flex-1 flex-col p-6 md:p-7">
                      <h3
                        id={headingId}
                        className="text-h4 font-semibold text-navy [text-wrap:balance]"
                      >
                        {item.title}
                      </h3>
                      {metadata.length > 0 && (
                        <p className="mt-1.5 text-caption text-gray-medium uppercase tracking-wider">
                          {metadata.join(' · ')}
                        </p>
                      )}
                      <p className="mt-3 text-body text-gray-dark/75 leading-relaxed [text-wrap:pretty]">
                        {item.description}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <Badge variant={badgeVariant(item.tag)}>
                          {tagLabel(item.tag)}
                        </Badge>
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
