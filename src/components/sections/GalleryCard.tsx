'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ReferenceCardMedia } from './ReferenceCardMedia'
import { GalleryModal, type GalleryModalTexts } from './GalleryModal'

type FlagCode = 'CZ' | 'SE' | 'NO' | 'NL' | 'HR' | 'DE' | 'BE' | 'EU'
type RefTag = 'own' | 'own-with-sunsurf' | 'partner-sunsurf'

interface GalleryCardItem {
  slug: string
  flag: FlagCode
  location: string
  title: string
  year?: string
  power?: string
  type?: string
  description: string
  tag: RefTag
  image: string
  alt: string
}

interface GalleryCardGalleryTexts extends GalleryModalTexts {
  /** Short label shown on the corner badge inside the card image (e.g.
   *  "6 INSTALACÍ" / "3 INSTALLATIONS"). */
  badgeLabel: string
  /** Full a11y label read on badge focus. */
  badgeAriaLabel: string
  /** Pill button label in the card body (e.g. "Prohlédnout instalace"). */
  ctaLabel: string
}

interface GalleryCardProps {
  item: GalleryCardItem
  gallery: GalleryCardGalleryTexts
  galleryId: string
  tagLabel: string
  badgeVariant: 'success' | 'muted'
  animationDelay: number
  locale: string
}

/**
 * Card wrapper for flagship gallery projects (Luleå, Skellefteå). Owns the
 * modal open/close state so both trigger surfaces open the same modal:
 *   - Yellow badge in the media area's bottom-right corner (visual hint).
 *   - Navy pill button in the card body ("Prohlédnout instalace").
 *
 * Non-gallery reference items keep their inline Server-rendered structure
 * in References.tsx — this component is used only when item.gallery is set.
 */
export function GalleryCard({
  item,
  gallery,
  galleryId,
  tagLabel,
  badgeVariant,
  animationDelay,
  locale,
}: GalleryCardProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const headingId = `ref-${item.slug}`
  const metadata = [item.year, item.type, item.power].filter(Boolean)

  return (
    <AnimatedSection
      as="li"
      delay={animationDelay}
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
          galleryBadge={{
            label: gallery.badgeLabel,
            ariaLabel: gallery.badgeAriaLabel,
            onClick: () => setModalOpen(true),
          }}
        />

        {/* Card body */}
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
            <Badge variant={badgeVariant}>{tagLabel}</Badge>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={modalOpen}
              className="group/pill inline-flex items-center gap-2 rounded-full bg-navy px-4 py-1.5 text-small font-syne font-semibold text-white ring-1 ring-navy transition-colors duration-200 ease-out hover:bg-navy/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2"
            >
              <span>{gallery.ctaLabel}</span>
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover/pill:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </article>

      <GalleryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        texts={gallery}
        galleryId={galleryId}
      />
    </AnimatedSection>
  )
}
