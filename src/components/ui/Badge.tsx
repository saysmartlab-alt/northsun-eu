import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'success' | 'muted' | 'accent'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  children: ReactNode
}

const variants: Record<BadgeVariant, string> = {
  // success = "Vlastní realizace" — brand yellow per ui-designer.md (yellow reserved for key highlights)
  success: 'bg-yellow text-navy ring-1 ring-yellow',
  // muted = "Ve spolupráci s X" — neutral partner attribution
  muted: 'bg-gray-light text-gray-medium ring-1 ring-border',
  // accent = subtle yellow tint, generic brand highlight (lower hierarchy than success)
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
