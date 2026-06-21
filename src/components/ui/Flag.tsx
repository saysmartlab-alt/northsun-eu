import { CZ, SE, NO, NL, HR, DE, BE, EU } from 'country-flag-icons/react/3x2'
import { cn } from '@/lib/utils'

type FlagCode = 'CZ' | 'SE' | 'NO' | 'NL' | 'HR' | 'DE' | 'BE' | 'EU'

// `country-flag-icons` ships a custom FlagComponent type. We keep it untyped
// here (the union of all flag components) so that consumer props like `title`
// remain valid — the library expects them but TS's strict SVGProps narrowing
// strips them away if we widen the type.
const FLAGS: Record<FlagCode, typeof CZ> = {
  CZ,
  SE,
  NO,
  NL,
  HR,
  DE,
  BE,
  EU,
}

interface FlagProps {
  code: FlagCode
  className?: string
  /** Accessibility label, e.g. "Česko". If not provided, decorative (aria-hidden). */
  title?: string
}

export function Flag({ code, className, title }: FlagProps) {
  const Component = FLAGS[code]
  if (!Component) return null

  return (
    <Component
      title={title}
      aria-hidden={title ? undefined : true}
      className={cn(
        'inline-block h-4 w-auto shrink-0 rounded-sm shadow-[0_0_0_1px_rgba(255,255,255,0.08)]',
        className
      )}
    />
  )
}
