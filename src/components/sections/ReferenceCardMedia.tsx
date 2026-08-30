'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { Images, PlayCircle, X } from 'lucide-react'
import { Flag } from '@/components/ui/Flag'

type FlagCode = 'CZ' | 'SE' | 'NO' | 'NL' | 'HR' | 'DE' | 'BE' | 'EU'

interface GalleryBadge {
  /** Short uppercase text like "6 INSTALACÍ" / "3 INSTALLATIONS". */
  label: string
  /** Full a11y label read by screen readers ("Zobrazit galerii 6 instalací"). */
  ariaLabel: string
  onClick: () => void
}

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
  /** Gallery entry badge in bottom-right corner (same slot as VIDEO badge).
   *  Click opens the parent-owned gallery modal. Used on flagship cards
   *  like Luleå and Skellefteå to hint at more content inside. */
  galleryBadge?: GalleryBadge
}

/**
 * Reference card media area. Four modes, in priority order:
 * 1. `videoSrc`  → poster image + VIDEO badge; on click, <video> replaces
 *                  the poster and starts playing (same facade UX as YouTube).
 * 2. `youtubeId` → image + small VIDEO badge, iframe on click (facade).
 * 3. `videoUrl`  → image + small VIDEO badge that opens external link.
 * 4. neither     → image, click opens fullscreen lightbox.
 *
 * All video cards share the same visual — clean poster + small yellow VIDEO
 * badge in the bottom-right — so the section reads as one system regardless
 * of where the video actually lives.
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
  galleryBadge,
}: ReferenceCardMediaProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [ytLoaded, setYtLoaded] = useState(false)
  const [videoStarted, setVideoStarted] = useState(false)

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
  const videoActive = hasSelfHosted && videoStarted

  // Location badge + gradient hide when any inline video is live so the
  // player chrome (native <video> or YouTube iframe) stays readable.
  const showOverlays = !ytActive && !videoActive
  // Show poster image with a click-to-load VIDEO badge for cards that have
  // an inline video (YouTube OR self-hosted) but haven't been started yet.
  const showVideoBadge = (hasYouTube && !ytLoaded) || (hasSelfHosted && !videoStarted)

  return (
    <>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy/5">
        {/* Primary media */}
        {videoActive ? (
          /* Self-hosted <video> — autoplays because the visitor just clicked
             the VIDEO badge (user gesture satisfies autoplay policies). */
          <video
            src={videoSrc}
            poster={videoPoster ?? image}
            controls
            autoPlay
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
          /* Poster / image — shown for pure image cards, YouTube facade
             (before iframe load), self-hosted video facade (before <video>
             loads), and external-link cards. Click opens the lightbox for
             a bigger look. `videoPoster` takes precedence over `image` so
             a video card can use a dedicated poster frame if provided. */
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label={openLabel}
            aria-haspopup="dialog"
            className="group/img absolute inset-0 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-yellow"
          >
            <Image
              src={hasSelfHosted ? (videoPoster ?? image) : image}
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

        {/* Inline video badge — click to load either the YouTube iframe or
            the self-hosted <video> element in place of the poster. Same
            visual for both so the section reads as one system. */}
        {showVideoBadge && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              if (hasYouTube) setYtLoaded(true)
              else if (hasSelfHosted) setVideoStarted(true)
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

        {/* Gallery badge (same slot as VIDEO badge — flagship gallery cards
            never have their own video, so the slot is free). Clicks bubble
            up to the card owner which manages the shared modal state so
            the pill button below can also trigger the same modal. */}
        {showOverlays && galleryBadge && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              galleryBadge.onClick()
            }}
            aria-label={galleryBadge.ariaLabel}
            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-yellow px-2.5 py-1 text-navy backdrop-blur-sm transition-colors duration-200 hover:bg-yellow-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            <Images className="h-3.5 w-3.5" strokeWidth={2} />
            <span className="text-caption font-semibold uppercase tracking-wider">
              {galleryBadge.label}
            </span>
          </button>
        )}
      </div>

      {/* Lightbox modal — for the poster/image while no video is playing
          inline. Once a video (YouTube iframe or self-hosted <video>) is
          active, the lightbox is disabled so it can't cover the player. */}
      {!ytActive &&
        !videoActive &&
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
