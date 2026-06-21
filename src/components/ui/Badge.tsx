import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'success' | 'muted' | 'accent'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  children: ReactNode
}

const variants: Record<BadgeVariant, string> = {
  // success = "Vlastní realizace" — engineering credibility, not loud
  success: 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200',
  // muted = "Ve spolupráci s X" — neutral partner attribution
  muted: 'bg-gray-light text-gray-medium ring-1 ring-border',
  // accent = generic brand highlight
  accent: 'bg-yellow/15 text-navy ring-1 ring-yellow/40',
}

export function Badge({
  variant = 'muted',
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-small font-medium',
        variants[variant],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  )
}
