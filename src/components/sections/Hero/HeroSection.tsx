'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { HeroContent } from './HeroContent'
import { HeroSlider, type HeroSlide } from './HeroSlider'
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

/**
 * Client wrapper for the hero section. Owns the hover-pause state so the
 * child slider can pause auto-advance while the visitor's cursor is in the
 * hero. Server-fetched translations flow in as props from Hero/index.tsx.
 */
export function HeroSection({
  content,
  trust,
  slides,
  locale,
}: HeroSectionProps) {
  const [paused, setPaused] = useState(false)

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[88vh] md:min-h-screen items-center overflow-hidden bg-navy pt-32 md:pt-36 pb-32 md:pb-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <HeroSlider slides={slides} paused={paused} locale={locale} />

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
        <HeroContent texts={content} />
      </Container>

      <TrustStrip texts={trust} />
    </section>
  )
}
