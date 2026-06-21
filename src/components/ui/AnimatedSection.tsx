'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { useReducedMotion, motion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
  /** Distance (px) the element travels upward during fade-in. */
  y?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'header' | 'ul' | 'li'
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function AnimatedSection({
  children,
  delay = 0,
  y = 20,
  className,
  as = 'div',
}: AnimatedSectionProps) {
  const [mounted, setMounted] = useState(false)
  const userPrefersReducedMotion = useReducedMotion()
  // During SSR + first client paint, render the same markup on both sides.
  // After mount, switch to the user's actual preference.
  const prefersReducedMotion = mounted && userPrefersReducedMotion

  useEffect(() => {
    setMounted(true)
  }, [])

  const variants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay, ease },
        },
      }

  const MotionTag = motion[as] as typeof motion.div

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  )
}
