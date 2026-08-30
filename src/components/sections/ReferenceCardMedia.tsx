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
  /** External video link (YouTube, LinkedIn, etc.) — renders as small yellow badge overlay. */
  videoUrl?: string
  videoLabel?: string
  /** Self-hosted video source (served from /public). When present, the card
   *  renders a <video> element with the poster instead of the image, so the
   *  visitor can play inline. Mutually exclusive with the videoUrl overlay. */
  videoSrc?: string
  videoPoster?: string
  /** YouTube video ID for inline click-to-load facade. Highest precedence.
   *  Same GDPR-friendly pattern as the gallery: image poster + play button;
   *  iframe (youtube-nocookie.com) injected only after the user clicks. */
  youtubeId?: string
}

/**
 * Reference card media area. Four modes, in priority order:
 * 1. `youtubeId` → image poster + play overlay, iframe on click (facade).
 * 2. `videoSrc`  → self-hosted <video> with poster + native controls.
 * 3. `videoUrl`  → static Image + small overlay badge linking to external video.
 * 4. neither     → static Image, click opens a fullscreen lightbox for a closer look.
 *
 * Client component: useState for lightbox + YouTube facade loaded state,
 * useEffect for ESC handler and body scroll lock.
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
  videoSrc,
  videoPoster,
  youtubeId,
}: ReferenceCardMediaProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [ytLoaded, setYtLoaded] = useState(false)

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
  const inlineVideoLabel = `Video: ${title}`
  const ytPlayAria =
    locale === 'cs'
      ? `Přehrát video: ${title}`
      : `Play video: ${title}`

  const hasYouTube = Boolean(youtubeId)
  const hasSelfHosted = Boolean(videoSrc)
  const hasInlineMedia = hasYouTube || hasSelfHosted

  return (
    <>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy/5">
        {hasYouTube ? (
          ytLoaded ? (
            /* iframe injected only after Play click — nothing loads from
               youtube-nocookie.com until the user opts in by interacting. */
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={inlineVideoLabel}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setYtLoaded(true)}
              aria-label={ytPlayAria}
              className="group/facade absolute inset-0 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-yellow"
            >
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover/facade:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-navy/25 transition-colors duration-200 group-hover/facade:bg-navy/40"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  aria-hidden="true"
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow shadow-lg transition-transform duration-200 group-hover/facade:scale-110"
                >
                  <PlayCircle className="h-9 w-9 text-navy" strokeWidth={1.5} />
                </span>
              </div>
            </button>
          )
        ) : hasSelfHosted ? (
          /* Self-hosted video: preload="none" so the file only downloads when
             the visitor actually clicks Play. Poster shows immediately, native
             controls give the play button. */
          <video
            src={videoSrc}
            poster={videoPoster ?? image}
            controls
            preload="none"
            playsInline
            aria-label={inlineVideoLabel}
            className="absolute inset-0 h-full w-full bg-navy object-cover"
          />
        ) : (
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
        )}

        {/* Bottom gradient — improves badge contrast for image/poster.
            pointer-events-none so it never blocks the video controls, iframe,
            or button click. Hidden entirely once the YouTube iframe is live
            so YouTube's own controls remain fully readable. */}
        {!(hasYouTube && ytLoaded) && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy/50 via-navy/10 to-transparent"
          />
        )}
        {/* Location badge — hide when YouTube iframe active so it doesn't
            sit awkwardly on top of the player chrome. */}
        {!(hasYouTube && ytLoaded) && (
          <div className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-md bg-black/50 px-2.5 py-1 backdrop-blur-sm">
            <Flag code={flag} title={location} className="h-3.5" />
            <span className="text-caption font-semibold uppercase tracking-wider text-white">
              {location}
            </span>
          </div>
        )}
        {/* External-video badge — only when no inline video (mutex). */}
        {!hasInlineMedia && videoUrl && videoLabel && (
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

      {/* Lightbox modal — only for pure image cards. Any inline video (self-
          hosted or YouTube facade) already plays in place, so a lightbox on
          top would be redundant. */}
      {!hasInlineMedia &&
        mounted &&
        open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-sm"
          >
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
