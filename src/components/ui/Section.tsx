import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  as?: 'section' | 'article' | 'div'
  /** When true, removes vertical padding (use for hero, full-bleed) */
  bare?: boolean
}

export function Section({
  className,
  children,
  as: Tag = 'section',
  bare = false,
  ...rest
}: SectionProps) {
  return (
    <Tag
      className={cn(!bare && 'py-24 md:py-32 lg:py-40', className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}
