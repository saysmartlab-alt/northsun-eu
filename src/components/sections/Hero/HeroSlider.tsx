'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface HeroSlide {
  src: string
  alt: string
}

interface HeroSliderProps {
  slides: HeroSlide[]
  paused: boolean
  locale: string
  autoAdvanceMs?: number
  crossfadeMs?: number
}

/**
 * Full-bleed hero background slider. Sits at the same z-plane as the old
 * single background image (-z-10), gets overlaid by the gradient/content
 * layers unchanged.
 *
 * Behavior:
 *  - Crossfade (opacity) between slides, ~1.2s ease-in-out.
 *  - Auto-advance every `autoAdvanceMs` when not paused.
 *  - Paused when the parent Hero section reports hover.
 *  - prefers-reduced-motion: no auto-advance, transitions collapsed to
 *    instant switches; the first slide is always shown initially and
 *    manual dots still work if the visitor wants to browse.
 *  - Dots for manual switching, keyboard accessible.
 *  - First slide priority + eager, others lazy.
 */
export function HeroSlider({
  slides,
  paused,
  locale,
  autoAdvanceMs = 6000,
  crossfadeMs = 1200,
}: HeroSliderProps) {
  const [index, setIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const userPrefersReducedMotion = useReducedMotion()
  const prefersReducedMotion = mounted && userPrefersReducedMotion

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mounted || prefersReducedMotion || paused || slides.length <= 1) return
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, autoAdvanceMs)
    return () => window.clearInterval(timer)
  }, [mounted, prefersReducedMotion, paused, slides.length, autoAdvanceMs])

  const dotLabel = locale === 'cs' ? 'Zobrazit snímek' : 'Show slide'
  const groupLabel =
    locale === 'cs' ? 'Přepínač snímků hero' : 'Hero slide switcher'

  const transitionStyle = { transitionDuration: `${crossfadeMs}ms` }

  return (
    <>
      {/* Slide stack — same z-plane as the previous single background. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {slides.map((slide, i) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            loading={i === 0 ? 'eager' : 'lazy'}
            quality={75}
            sizes="100vw"
            style={transitionStyle}
            className={cn(
              'object-cover object-[60%_center] md:object-center',
              'transition-opacity ease-in-out motion-reduce:transition-none',
              i === index ? 'opacity-100' : 'opacity-0'
            )}
          />
        ))}
      </div>

      {/* Manual dots — only when there is more than one slide. Positioned
          above the TrustStrip (bottom ~50-60 px), always accessible. */}
      {slides.length > 1 && (
        <div
          role="group"
          aria-label={groupLabel}
          className="pointer-events-none absolute inset-x-0 bottom-24 md:bottom-28 z-20 flex justify-center"
        >
          <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-black/30 px-3 py-2 backdrop-blur-sm">
            {slides.map((slide, i) => {
              const isActive = i === index
              return (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`${dotLabel} ${i + 1}: ${slide.alt}`}
                  aria-current={isActive}
                  className={cn(
                    'h-2 rounded-full transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy',
                    isActive
                      ? 'bg-white w-8'
                      : 'bg-white/40 hover:bg-white/70 w-2'
                  )}
                />
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
