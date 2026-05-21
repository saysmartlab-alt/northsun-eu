'use client'

import { useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'

const LOCALES = [
  { code: 'cs', label: 'CZ' },
  { code: 'en', label: 'EN' },
] as const

export default function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <div
      className="fixed top-2 right-3 sm:top-6 sm:right-10 lg:top-10 lg:right-28 z-20 flex items-center font-syne text-sm font-semibold tracking-wider"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      {LOCALES.map(({ code, label }, i) => (
        <span key={code} className="flex items-center">
          {i > 0 && <span className="text-white/30 px-1">/</span>}
          <Link
            href={pathname}
            locale={code}
            className={
              'inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-2 transition-colors ' +
              (locale === code
                ? 'text-yellow'
                : 'text-white/40 hover:text-white/80 active:text-white')
            }
          >
            {label}
          </Link>
        </span>
      ))}
    </div>
  )
}
