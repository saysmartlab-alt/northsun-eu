'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

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
 * lazy so page load isn't hit.
 *
 * Note on prefers-reduced-motion: intentionally NOT respected here. The scale
 * (1.06) and 1.5 s crossfade are well below the WCAG threshold for "large
 * motion" (movement > 20 % of viewport or continuous animation > 5 s that
 * demands attention). Muting them left visitors with Windows "Animation
 * effects: Off" seeing tvrdý cut between slides which read as broken.
 *
 * Mobile framing: `object-center` keeps the subject centered on portrait
 * viewports; desktop switches to `object-[60%_center]` so the left third
 * stays dark enough for the headline overlay to read.
 */
export function HeroSlider({
  slides,
  index,
  crossfadeMs = 1500,
  kenBurnsMs = 8000,
}: HeroSliderProps) {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      {slides.map((slide, i) => {
        const isActive = i === index
        return (
          <motion.div
            key={slide.src}
            className="absolute inset-0"
            style={{ willChange: 'opacity, transform' }}
            initial={{ opacity: i === 0 ? 1 : 0, scale: 1 }}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1.06 : 1,
            }}
            transition={{
              opacity: {
                duration: crossfadeMs / 1000,
                ease: 'easeInOut',
              },
              scale: {
                duration: kenBurnsMs / 1000,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              loading="eager"
              quality={85}
              sizes="100vw"
              className="object-cover object-center md:object-[60%_center]"
            />
          </motion.div>
        )
      })}
    </div>
  )
}
