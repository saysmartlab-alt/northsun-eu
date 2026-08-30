'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { PlayCircle, X } from 'lucide-react'

export interface GalleryInstallation {
  slug: string
  title: string
  description: string
  image: string
  alt: string
  youtubeId?: string
}

export interface GalleryModalTexts {
  eyebrow: string
  modalTitle: string
  modalSubtitle: string
  modalClose: string
  videoPlayLabel: string
  installations: GalleryInstallation[]
}

interface GalleryModalProps {
  open: boolean
  onClose: () => void
  texts: GalleryModalTexts
  galleryId: string
}

/**
 * Fullscreen gallery modal — pure display component. State (open/close) is
 * owned by the parent so a single modal can be triggered from multiple
 * callers on the same card (e.g. the corner badge on the media AND the pill
 * button in the card body).
 *
 * Videos load via facade pattern: image + play overlay, iframe only injected
 * after the visitor clicks. Uses youtube-nocookie.com so no YouTube cookies
 * are set until the user opts in.
 */
export function GalleryModal({
  open,
  onClose,
  texts,
  galleryId,
}: GalleryModalProps) {
  const [mounted, setMounted] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return
    previouslyFocused.current = document.activeElement as HTMLElement
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    const focusTimer = setTimeout(() => closeButtonRef.current?.focus(), 40)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
      clearTimeout(focusTimer)
      previouslyFocused.current?.focus()
    }
  }, [open, onClose])

  if (!mounted || !open) return null

  const titleId = `${galleryId}-title`

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[100] flex flex-col bg-navy/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Header — sticky, doesn't scroll */}
      <div
        className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-6 py-4 md:px-10 md:py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <p className="text-caption uppercase tracking-[0.18em] font-semibold text-yellow">
            {texts.eyebrow}
          </p>
          <h2 id={titleId} className="mt-1 text-h3 font-semibold text-white">
            {texts.modalTitle}
          </h2>
          <p className="mt-1 text-small text-white/60">{texts.modalSubtitle}</p>
        </div>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={texts.modalClose}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow"
        >
          <X className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      {/* Scrollable grid */}
      <div
        className="flex-1 overflow-y-auto px-6 py-8 md:px-10 md:py-10"
        onClick={(e) => e.stopPropagation()}
      >
        <ul
          role="list"
          className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
        >
          {texts.installations.map((installation) => (
            <li key={installation.slug} className="list-none">
              <InstallationCard
                installation={installation}
                playLabel={texts.videoPlayLabel}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  )
}

interface InstallationCardProps {
  installation: GalleryInstallation
  playLabel: string
}

function InstallationCard({ installation, playLabel }: InstallationCardProps) {
  const [videoLoaded, setVideoLoaded] = useState(false)

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-colors duration-200 hover:border-white/20">
      <div className="relative aspect-video w-full overflow-hidden bg-navy">
        {installation.youtubeId ? (
          videoLoaded ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${installation.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={installation.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <YouTubeFacade
              image={installation.image}
              alt={installation.alt}
              title={installation.title}
              playLabel={playLabel}
              onPlay={() => setVideoLoaded(true)}
            />
          )
        ) : (
          <Image
            src={installation.image}
            alt={installation.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        )}
      </div>
      <div className="p-5 md:p-6">
        <h3 className="text-h4 font-semibold text-white">{installation.title}</h3>
        <p className="mt-2 text-body text-white/75 leading-relaxed">
          {installation.description}
        </p>
      </div>
    </article>
  )
}

interface YouTubeFacadeProps {
  image: string
  alt: string
  title: string
  playLabel: string
  onPlay: () => void
}

function YouTubeFacade({
  image,
  alt,
  title,
  playLabel,
  onPlay,
}: YouTubeFacadeProps) {
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`${playLabel}: ${title}`}
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
        className="absolute inset-0 bg-navy/30 transition-colors duration-200 group-hover/facade:bg-navy/45"
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
}
