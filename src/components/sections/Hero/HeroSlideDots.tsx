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
 * Manual slide switcher — pill of dots. Position-agnostic (no self-* or
 * ml-* classes) so the caller can drop it wherever it fits: mobile hero
 * renders it as a floating bottom-center overlay above the trust strip;
 * desktop hero renders it inside the CTA row (right-aligned via a wrapper).
 *
 * Hover behavior: hovering a dot immediately shows that slide, and auto-
 * advance is paused for the entire pill so the visitor can browse without
 * the timer jumping ahead. Dots have an invisible p-2 hit area so mobile
 * taps land reliably (48 px tap target inside the 8 px visual dot).
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
      className="flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 backdrop-blur-sm ring-1 ring-white/10"
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
            className="group/dot relative -m-1 flex h-6 w-6 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            <span
              aria-hidden="true"
              className={cn(
                'block h-2 rounded-full transition-all duration-300 ease-out',
                isActive
                  ? 'bg-white w-8'
                  : 'bg-white/40 group-hover/dot:bg-white/70 w-2'
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
