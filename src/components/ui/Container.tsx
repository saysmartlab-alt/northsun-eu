import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Container({ className, children, ...rest }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-7xl px-6 md:px-12 2xl:max-w-[1480px] 2xl:px-16', className)} {...rest}>
      {children}
    </div>
  )
}
