'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

export interface HeroSlide {
  src: string
  alt: string
}

interface HeroSliderProps {
  slides: HeroSlide[]
  /** Index of the slide to display. Auto-advance + dot clicks are driven from
   *  the parent (HeroSection). */
  index: number
  /** Crossfade duration in ms. */
  crossfadeMs?: number
  /** Ken Burns zoom animation duration in ms — slow, so it plays through the
   *  slide's whole visible time even if the visitor lingers. */
  kenBurnsMs?: number
}

/**
 * Hero background slider with Ken Burns zoom on the active slide + crossfade
 * to the next. All slides stay mounted so opacity crossfade is smooth. First
 * slide is priority + eager (visible immediately, no fade-in), the rest are
 * lazy so page load isn't hit. Fully collapses to a still image under
 * prefers-reduced-motion.
 *
 * Mobile framing: `object-center` keeps the subject centered on portrait
 * viewports (was `object-[60%_center]` which pushed the subject off-frame
 * on narrow screens); desktop keeps the 60% offset so the left side stays
 * dark enough for the headline overlay to read.
 */
export function HeroSlider({
  slides,
  index,
  crossfadeMs = 1500,
  kenBurnsMs = 8000,
}: HeroSliderProps) {
  const [mounted, setMounted] = useState(false)
  const userPrefersReducedMotion = useReducedMotion()
  const prefersReducedMotion = mounted && userPrefersReducedMotion

  useEffect(() => setMounted(true), [])

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      {slides.map((slide, i) => {
        const isActive = i === index
        return (
          <motion.div
            key={slide.src}
            className="absolute inset-0"
            initial={{ opacity: i === 0 ? 1 : 0, scale: 1 }}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: prefersReducedMotion ? 1 : isActive ? 1.06 : 1,
            }}
            transition={{
              opacity: {
                duration: prefersReducedMotion ? 0 : crossfadeMs / 1000,
                ease: 'easeInOut',
              },
              scale: {
                duration: prefersReducedMotion ? 0 : kenBurnsMs / 1000,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              loading={i === 0 ? 'eager' : 'lazy'}
              quality={75}
              sizes="100vw"
              className="object-cover object-center md:object-[60%_center]"
            />
          </motion.div>
        )
      })}
    </div>
  )
}
