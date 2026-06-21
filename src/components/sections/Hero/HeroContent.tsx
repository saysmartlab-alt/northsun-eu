'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

interface HeroContentTexts {
  label: string
  title: string
  lead: string
  ctaPrimary: string
  ctaSecondary: string
}

interface HeroContentProps {
  texts: HeroContentTexts
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Shared CTA base — same shape/typography for both buttons, only color treatment differs.
// Mirrors `Button` size="lg" sizing so the two CTAs sit visually balanced.
const ctaBase =
  'inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-syne font-semibold rounded-lg transition-all duration-200 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy'

const ctaPrimaryClasses =
  'bg-yellow text-navy hover:bg-yellow-600 shadow-sm hover:shadow-md group'

const ctaSecondaryClasses =
  'border-2 border-white/70 text-white hover:bg-white hover:text-navy hover:border-white'

export function HeroContent({ texts }: HeroContentProps) {
  const [mounted, setMounted] = useState(false)
  const userPrefersReducedMotion = useReducedMotion()
  // During SSR + first client paint, render full motion so server/client markup matches.
  // After mount, switch to the real user preference.
  const prefersReducedMotion = mounted && userPrefersReducedMotion

  useEffect(() => {
    setMounted(true)
  }, [])

  const buildVariants = (delay: number): Variants =>
    prefersReducedMotion
      ? {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration: 0.2, delay: Math.min(delay * 0.3, 0.2) },
          },
        }
      : {
          hidden: { opacity: 0, y: 16 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease, delay },
          },
        }

  return (
    <div className="relative z-10 w-full">
      <motion.span
        initial="hidden"
        animate="visible"
        variants={buildVariants(0.2)}
        className="block text-small uppercase tracking-[0.18em] font-semibold text-yellow"
      >
        {texts.label}
      </motion.span>

      <motion.h1
        id="hero-heading"
        initial="hidden"
        animate="visible"
        variants={buildVariants(0.3)}
        className={cn(
          'mt-5 text-display text-white max-w-[22ch]',
          '[text-wrap:balance]'
        )}
      >
        {texts.title}
      </motion.h1>

      <motion.p
        initial="hidden"
        animate="visible"
        variants={buildVariants(0.5)}
        className="mt-6 text-body-lg text-white/85 max-w-2xl"
      >
        {texts.lead}
      </motion.p>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={buildVariants(0.7)}
        className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
      >
        <Link href="#kontakt" className={cn(ctaBase, ctaPrimaryClasses)}>
          <span>{texts.ctaPrimary}</span>
          <ArrowRight
            className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>

        <Link href="#reference" className={cn(ctaBase, ctaSecondaryClasses)}>
          {texts.ctaSecondary}
        </Link>
      </motion.div>
    </div>
  )
}
