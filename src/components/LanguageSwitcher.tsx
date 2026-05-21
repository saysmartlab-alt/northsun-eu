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
    <div className="fixed top-6 right-10 sm:top-10 sm:right-16 lg:right-28 z-20 flex items-center gap-4 font-syne text-sm font-semibold tracking-wider">
      {LOCALES.map(({ code, label }, i) => (
        <span key={code} className="flex items-center gap-4">
          {i > 0 && <span className="text-white/30">/</span>}
          <Link
            href={pathname}
            locale={code}
            className={
              locale === code
                ? 'text-yellow'
                : 'text-white/40 hover:text-white/80 transition-colors'
            }
          >
            {label}
          </Link>
        </span>
      ))}
    </div>
  )
}
