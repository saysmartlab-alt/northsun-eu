'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'

interface TrustStripTexts {
  locations: string
  cert: string
  partner: string
}

interface TrustStripProps {
  texts: TrustStripTexts
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function TrustStrip({ texts }: TrustStripProps) {
  const prefersReducedMotion = useReducedMotion()

  const variants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2, delay: 0.2 } },
      }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease, delay: 0.9 },
        },
      }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="absolute inset-x-0 bottom-0 z-10 bg-navy/30 backdrop-blur-sm border-t border-white/10 py-5 md:py-6"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12 flex items-center justify-between gap-6">
        {/* Left: flags + locations (always visible) */}
        <div className="flex items-center gap-3 md:gap-4">
          <span
            className="flex items-center gap-1 text-[20px] leading-none"
            aria-hidden="true"
          >
            <span>🇨🇿</span>
            <span>🇸🇪</span>
            <span>🇳🇴</span>
          </span>
          <span className="text-caption uppercase tracking-wider text-white/60">
            {texts.locations}
          </span>
        </div>

        {/* Right: cert + partner (desktop only) */}
        <div className="hidden md:flex items-center gap-4 text-caption uppercase tracking-wider text-white/60">
          <span aria-hidden="true" className="h-4 w-px bg-white/20" />
          <span>{texts.cert}</span>
          <span aria-hidden="true">·</span>
          <span>{texts.partner}</span>
        </div>
      </div>
    </motion.div>
  )
}
