import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  label?: ReactNode
  title: ReactNode
  lead?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  label,
  title,
  lead,
  align = 'left',
  className,
}: SectionHeaderProps) {
  const isCenter = align === 'center'

  return (
    <header
      className={cn(
        'flex flex-col',
        isCenter ? 'items-center text-center mx-auto' : 'items-start text-left',
        isCenter && 'max-w-3xl',
        className
      )}
    >
      {label && (
        <span className="text-small uppercase tracking-wider text-yellow font-semibold mb-4">
          {label}
        </span>
      )}
      <h2 className="text-h2 text-navy">{title}</h2>
      {lead && (
        <p
          className={cn(
            'mt-6 text-body-lg text-gray-medium',
            isCenter ? 'max-w-2xl' : 'max-w-3xl'
          )}
        >
          {lead}
        </p>
      )}
    </header>
  )
}
