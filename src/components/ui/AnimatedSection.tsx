'use client'

import { useReducedMotion, motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
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
  const prefersReducedMotion = useReducedMotion()

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
