'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

const IMAGES = ['/hero/1.jpg', '/hero/2.jpg', '/hero/3.jpg']

const INTERVAL_MS = 4500
const FADE_MS = 1100

const KEN_BURNS = [
  { from: { scale: 1.08, x: 0, y: 0 }, to: { scale: 1.22, x: '-2%', y: '-1.5%' } },
  { from: { scale: 1.2, x: '-1.5%', y: '-1%' }, to: { scale: 1.05, x: '1.5%', y: '1.5%' } },
  { from: { scale: 1.05, x: '1.5%', y: '1%' }, to: { scale: 1.2, x: '-1.5%', y: '-1%' } },
] as const

export default function BackgroundSlideshow() {
  const [index, setIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    const tick = setInterval(
      () => setIndex((i) => (i + 1) % IMAGES.length),
      INTERVAL_MS
    )
    return () => clearInterval(tick)
  }, [prefersReducedMotion])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_MS / 1000, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <motion.div
            initial={prefersReducedMotion ? false : KEN_BURNS[index % KEN_BURNS.length].from}
            animate={prefersReducedMotion ? { scale: 1, x: 0, y: 0 } : KEN_BURNS[index % KEN_BURNS.length].to}
            transition={{
              duration: prefersReducedMotion ? 0 : (INTERVAL_MS + FADE_MS * 2) / 1000,
              ease: 'linear',
            }}
            className="absolute inset-0"
          >
            <Image
              src={IMAGES[index]}
              alt=""
              fill
              priority={index === 0}
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 100vw"
              quality={75}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Brand overlay: darken left where text lives, navy + yellow accents */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(90deg, rgba(3,0,87,0.88) 0%, rgba(3,0,87,0.6) 45%, rgba(3,0,87,0.35) 100%),
            linear-gradient(180deg, rgba(5,0,24,0.4) 0%, rgba(5,0,24,0.75) 100%),
            radial-gradient(ellipse at 85% 15%, rgba(252, 192, 19, 0.14) 0%, transparent 45%)
          `,
        }}
      />
    </div>
  )
}
