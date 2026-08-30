'use client'

import { cn } from '@/lib/utils'
import type { HeroSlide } from './HeroSlider'

interface HeroSlideDotsProps {
  slides: HeroSlide[]
  index: number
  onSelect: (i: number) => void
  /** Fires when the cursor enters the pill (or any dot) — parent uses it to
   *  pause auto-advance so a hover-previewed slide stays put. */
  onHoverStart?: () => void
  /** Fires when the cursor leaves the pill — parent resumes auto-advance. */
  onHoverEnd?: () => void
  locale: string
}

/**
 * Manual slide switcher — pill of dots. Rendered as a sibling of the two
 * hero CTA buttons so its bottom edge aligns with the CTAs' bottom edge on
 * desktop (right-aligned via `sm:ml-auto`). On mobile the CTA row switches
 * to flex-col so the dots stack under the buttons without overflow.
 *
 * Hover behavior: hovering a dot immediately shows that slide, and auto-
 * advance is paused for the entire pill so the visitor can browse without
 * the timer jumping ahead.
 */
export function HeroSlideDots({
  slides,
  index,
  onSelect,
  onHoverStart,
  onHoverEnd,
  locale,
}: HeroSlideDotsProps) {
  const dotLabel = locale === 'cs' ? 'Zobrazit snímek' : 'Show slide'
  const groupLabel =
    locale === 'cs' ? 'Přepínač snímků hero' : 'Hero slide switcher'

  if (slides.length <= 1) return null

  return (
    <div
      role="group"
      aria-label={groupLabel}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className="flex items-center gap-2 rounded-full bg-black/30 px-3 py-2 backdrop-blur-sm self-end sm:ml-auto"
    >
      {slides.map((slide, i) => {
        const isActive = i === index
        return (
          <button
            key={slide.src}
            type="button"
            onClick={() => onSelect(i)}
            onMouseEnter={() => onSelect(i)}
            onFocus={() => onSelect(i)}
            aria-label={`${dotLabel} ${i + 1}: ${slide.alt}`}
            aria-current={isActive}
            className={cn(
              'h-2 rounded-full transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy',
              isActive ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/70 w-2'
            )}
          />
        )
      })}
    </div>
  )
}
