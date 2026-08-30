'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { HeroContent } from './HeroContent'
import { HeroSlider, type HeroSlide } from './HeroSlider'
import { HeroSlideDots } from './HeroSlideDots'
import { TrustStrip } from './TrustStrip'

interface HeroContentTexts {
  label: string
  title: string
  lead: string
  ctaPrimary: string
  ctaSecondary: string
}

interface TrustStripTexts {
  locations: string
  cert: string
  partner: string
}

interface HeroSectionProps {
  content: HeroContentTexts
  trust: TrustStripTexts
  slides: HeroSlide[]
  locale: string
}

const AUTO_ADVANCE_MS = 6000

/**
 * Client wrapper for the hero. Owns:
 *   - `paused`: pause auto-advance while the visitor's cursor is inside the hero
 *   - `index`: which slide is currently visible (also driven by dot clicks)
 *
 * State is lifted here (not inside HeroSlider) so the dots can live in the
 * CTA button row of HeroContent — its bottom edge aligns with the CTAs on
 * desktop for a clean right-side corner placement.
 */
export function HeroSection({
  content,
  trust,
  slides,
  locale,
}: HeroSectionProps) {
  const [paused, setPaused] = useState(false)
  const [index, setIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const userPrefersReducedMotion = useReducedMotion()
  const prefersReducedMotion = mounted && userPrefersReducedMotion

  useEffect(() => setMounted(true), [])

  // Auto-advance every AUTO_ADVANCE_MS while not paused. Reduced-motion
  // disables it entirely; the visitor can still click dots to browse.
  useEffect(() => {
    if (!mounted || prefersReducedMotion || paused || slides.length <= 1) return
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, AUTO_ADVANCE_MS)
    return () => window.clearInterval(timer)
  }, [mounted, prefersReducedMotion, paused, slides.length])

  const dots = (
    <HeroSlideDots
      slides={slides}
      index={index}
      onSelect={setIndex}
      locale={locale}
    />
  )

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[88vh] md:min-h-screen items-center overflow-hidden bg-navy pt-32 md:pt-36 pb-32 md:pb-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <HeroSlider slides={slides} index={index} />

      {/* Dual gradient overlay: horizontal fade (R-side reveal) + vertical bottom darken.
          Kept identical to the previous single-image hero so text contrast is preserved
          across every slide in the rotation. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/85 via-navy/60 to-navy/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/70 via-transparent to-transparent"
      />

      <Container className="relative z-10">
        <HeroContent texts={content} slideDots={dots} />
      </Container>

      <TrustStrip texts={trust} />
    </section>
  )
}
