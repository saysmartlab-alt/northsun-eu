'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { PlayCircle, X } from 'lucide-react'
import { Flag } from '@/components/ui/Flag'

type FlagCode = 'CZ' | 'SE' | 'NO' | 'NL' | 'HR' | 'DE' | 'BE' | 'EU'

interface ReferenceCardMediaProps {
  image: string
  alt: string
  flag: FlagCode
  location: string
  title: string
  locale: string
  videoUrl?: string
  videoLabel?: string
}

/**
 * Reference card image + click-to-zoom lightbox.
 * Client component because of useState/useEffect for modal + ESC handler.
 * Lightbox rendered via portal to document.body to escape article's
 * overflow-hidden + transform on hover.
 */
export function ReferenceCardMedia({
  image,
  alt,
  flag,
  location,
  title,
  locale,
  videoUrl,
  videoLabel,
}: ReferenceCardMediaProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const openLabel =
    locale === 'cs'
      ? `Zobrazit fotku ${title} ve větším`
      : `View ${title} photo in full size`
  const closeLabel = locale === 'cs' ? 'Zavřít fotku' : 'Close photo'
  const videoAriaLabel =
    locale === 'cs'
      ? `Otevřít video k projektu ${title}`
      : `Open video for project ${title}`

  return (
    <>
      {/* Image area (clickable to open lightbox) */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy/5">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={openLabel}
          aria-haspopup="dialog"
          className="group/img absolute inset-0 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-yellow"
        >
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </button>
        {/* Bottom gradient pro readability location badge */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent"
        />
        {/* Location badge (non-interactive) */}
        <div className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-md bg-black/50 px-2.5 py-1 backdrop-blur-sm">
          <Flag code={flag} title={location} className="h-3.5" />
          <span className="text-caption font-semibold uppercase tracking-wider text-white">
            {location}
          </span>
        </div>
        {/* Video badge (separately clickable, on top of image button) */}
        {videoUrl && videoLabel && (
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={videoAriaLabel}
            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-yellow px-2.5 py-1 text-navy backdrop-blur-sm transition-colors duration-200 hover:bg-yellow-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            <PlayCircle className="h-3.5 w-3.5" strokeWidth={2} />
            <span className="text-caption font-semibold uppercase tracking-wider">
              {videoLabel}
            </span>
          </a>
        )}
      </div>

      {/* Lightbox modal (rendered via portal) */}
      {mounted &&
        open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-sm"
          >
            {/* Close button (top-right) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setOpen(false)
              }}
              aria-label={closeLabel}
              autoFocus
              className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/20 md:right-6 md:top-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow"
            >
              <X className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
            </button>
            {/* Image container (click stops propagation to keep modal open) */}
            <div
              className="relative max-h-[90vh] w-auto max-w-7xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={image}
                alt={alt}
                width={1920}
                height={1200}
                className="block h-auto max-h-[90vh] w-auto rounded-lg object-contain mx-auto"
                priority
              />
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
