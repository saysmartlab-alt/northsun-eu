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
 * to the next. Ken Burns adds a slow scale that reveals more of the panels
 * or landscape during the ~6s each slide is visible, so the hero never feels
 * static. Fully collapses to a still image under prefers-reduced-motion.
 *
 * All slides stay mounted so opacity crossfade is smooth (no unmount flicker).
 * First slide is priority + eager; the rest are lazy so page load isn't hit.
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
            initial={{ opacity: i === 0 ? 0 : 0, scale: 1 }}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: prefersReducedMotion ? 1 : isActive ? 1.08 : 1,
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
              className="object-cover object-[60%_center] md:object-center"
            />
          </motion.div>
        )
      })}
    </div>
  )
}
