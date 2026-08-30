'use client'

import { useEffect, useState } from 'react'
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
 *   - `paused`: auto-advance pauses only while the visitor's cursor is on the
 *     dots pill (so hover-preview isn't fought by the timer). The rest of the
 *     hero — text, CTAs — does NOT pause the rotation.
 *   - `index`: which slide is currently visible (also driven by dot hover/click).
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

  useEffect(() => setMounted(true), [])

  // Auto-advance runs regardless of prefers-reduced-motion — the OS setting
  // should mute the transition (crossfade/zoom), not silently disable the
  // slider. Reduced motion is handled inside HeroSlider by collapsing the
  // motion durations to 0 (instant swap), so users with Windows "Animation
  // effects: Off" still see slides rotate, just without the fade.
  useEffect(() => {
    if (!mounted || paused || slides.length <= 1) return
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, AUTO_ADVANCE_MS)
    return () => window.clearInterval(timer)
  }, [mounted, paused, slides.length])

  const dots = (
    <HeroSlideDots
      slides={slides}
      index={index}
      onSelect={setIndex}
      onHoverStart={() => setPaused(true)}
      onHoverEnd={() => setPaused(false)}
      locale={locale}
    />
  )

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[88vh] md:min-h-screen items-center overflow-hidden bg-navy pt-32 md:pt-36 pb-32 md:pb-40"
    >
      <HeroSlider slides={slides} index={index} />

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
