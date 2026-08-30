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
  /** External video link (YouTube, LinkedIn, etc.) — small yellow badge overlay
   *  that opens the link in a new tab. Use when the video lives elsewhere. */
  videoUrl?: string
  videoLabel?: string
  /** Self-hosted video source (served from /public). Renders inline `<video>`
   *  element with poster + native controls. */
  videoSrc?: string
  videoPoster?: string
  /** YouTube video ID for inline click-to-load. Renders the cover image
   *  with a small yellow VIDEO badge in the bottom-right corner. Click the
   *  badge → iframe (youtube-nocookie.com) is injected in place of the image.
   *  GDPR-friendly: no YouTube request until the visitor opts in. */
  youtubeId?: string
}

/**
 * Reference card media area. Four modes, in priority order:
 * 1. `videoSrc`  → self-hosted <video> with poster + native controls.
 * 2. `youtubeId` → image + small VIDEO badge, iframe on click (facade).
 * 3. `videoUrl`  → image + small VIDEO badge that opens external link.
 * 4. neither     → image, click opens fullscreen lightbox.
 *
 * Both YouTube and image cards share the same lightbox for a bigger look
 * at the poster; only the badge action differs.
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
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [ytLoaded, setYtLoaded] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!lightboxOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [lightboxOpen])

  const openLabel =
    locale === 'cs'
      ? `Zobrazit fotku ${title} ve větším`
      : `View ${title} photo in full size`
  const closeLabel = locale === 'cs' ? 'Zavřít fotku' : 'Close photo'
  const externalAria =
    locale === 'cs'
      ? `Otevřít video k projektu ${title}`
      : `Open video for project ${title}`
  const inlineVideoLabel = `Video: ${title}`
  const ytPlayAria =
    locale === 'cs' ? `Přehrát video: ${title}` : `Play video: ${title}`

  const hasSelfHosted = Boolean(videoSrc)
  const hasYouTube = Boolean(youtubeId)
  const hasExternal = Boolean(videoUrl && videoLabel) && !hasSelfHosted && !hasYouTube
  const ytActive = hasYouTube && ytLoaded

  // Location badge + gradient hide when the YouTube iframe is live so
  // YouTube's own player chrome stays readable and unobstructed.
  const showOverlays = !ytActive && !hasSelfHosted

  return (
    <>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy/5">
        {/* Primary media */}
        {hasSelfHosted ? (
          <video
            src={videoSrc}
            poster={videoPoster ?? image}
            controls
            preload="none"
            playsInline
            aria-label={inlineVideoLabel}
            className="absolute inset-0 h-full w-full bg-navy object-cover"
          />
        ) : ytActive ? (
          /* iframe injected only after user clicks the VIDEO badge below. */
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={inlineVideoLabel}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          /* Default: image + lightbox click. Same for pure image cards,
             YouTube-badge cards (before iframe load), and external-link cards. */
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
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

        {/* Bottom gradient — subtle contrast lift for the badges. Skipped
            while a YouTube iframe or self-hosted video is playing so their
            own chrome stays clean. */}
        {showOverlays && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy/50 via-navy/10 to-transparent"
          />
        )}

        {/* Location badge (non-interactive) */}
        {showOverlays && (
          <div className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-md bg-black/50 px-2.5 py-1 backdrop-blur-sm">
            <Flag code={flag} title={location} className="h-3.5" />
            <span className="text-caption font-semibold uppercase tracking-wider text-white">
              {location}
            </span>
          </div>
        )}

        {/* YouTube badge — click to load iframe inline. Same visual as the
            external-link badge; only the action differs. */}
        {hasYouTube && !ytLoaded && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setYtLoaded(true)
            }}
            aria-label={ytPlayAria}
            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-yellow px-2.5 py-1 text-navy backdrop-blur-sm transition-colors duration-200 hover:bg-yellow-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            <PlayCircle className="h-3.5 w-3.5" strokeWidth={2} />
            <span className="text-caption font-semibold uppercase tracking-wider">
              {videoLabel ?? (locale === 'cs' ? 'Video' : 'Video')}
            </span>
          </button>
        )}

        {/* External-link badge (mutually exclusive with youtubeId/videoSrc). */}
        {hasExternal && (
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={externalAria}
            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-yellow px-2.5 py-1 text-navy backdrop-blur-sm transition-colors duration-200 hover:bg-yellow-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            <PlayCircle className="h-3.5 w-3.5" strokeWidth={2} />
            <span className="text-caption font-semibold uppercase tracking-wider">
              {videoLabel}
            </span>
          </a>
        )}
      </div>

      {/* Lightbox modal — only for image-based cards (not for cards showing
          an inline video). Available to pure image cards AND to cards with
          YouTube badges (before the iframe loads) so a visitor can see the
          poster full-screen before deciding to watch. */}
      {!hasSelfHosted &&
        !ytActive &&
        mounted &&
        lightboxOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setLightboxOpen(false)
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
