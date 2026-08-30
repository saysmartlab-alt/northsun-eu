'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

interface BackToTopProps {
  locale: string
  /** Show the button once the visitor has scrolled at least this far (px). */
  showAfter?: number
}

/**
 * Fixed-position "scroll to top" button. Appears in the bottom-right corner
 * once the visitor has scrolled past `showAfter` px, disappears when back at
 * the top. Smooth scroll on click, respects prefers-reduced-motion (instant
 * jump instead of smooth glide).
 */
export function BackToTop({ locale, showAfter = 600 }: BackToTopProps) {
  const [visible, setVisible] = useState(false)
  const userPrefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showAfter)
    onScroll() // initial state on mount / hydration
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [showAfter])

  const label = locale === 'cs' ? 'Zpět nahoru' : 'Back to top'

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: userPrefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label={label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-40 flex h-6 w-6 items-center justify-center rounded-full bg-yellow text-navy shadow-lg ring-1 ring-navy/10 backdrop-blur transition-colors duration-200 hover:bg-yellow-600 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy md:bottom-8 md:right-8 md:h-7 md:w-7"
        >
          <ArrowUp
            className="h-3 w-3 md:h-3.5 md:w-3.5"
            strokeWidth={2.5}
            aria-hidden="true"
          />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
