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
    <div className="fixed top-6 right-6 z-20 flex items-center gap-2 font-syne text-sm font-semibold tracking-wider">
      {LOCALES.map(({ code, label }, i) => (
        <span key={code} className="flex items-center gap-2">
          {i > 0 && <span className="text-white/15">/</span>}
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
