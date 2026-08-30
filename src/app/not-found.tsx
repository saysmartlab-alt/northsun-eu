import type { Metadata } from 'next'
import { Syne } from 'next/font/google'
import { NotFoundContent } from './[locale]/NotFoundContent'
import './globals.css'

// Root not-found is used for URLs that miss the locale prefix entirely
// (e.g. /random-path without /cs or /en). Since there's no root layout
// (next-intl [locale]/layout owns HTML shell), root not-found must ship
// its own <html>/<body>.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Chyba 404 — NorthSun',
}

const syne = Syne({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

// Root-level fallback texts — CZ by default (defaultLocale in routing).
const TEXTS = {
  label: 'Chyba 404',
  heading: 'Tady nic nesvítí.',
  lead: 'Stránka, kterou hledáte, neexistuje nebo byla přesunuta. Zkuste hlavní stránku nebo nám napište.',
  primaryCta: 'Zpět na hlavní stránku',
  secondaryCta: 'Napište nám',
}

export default function RootNotFound() {
  return (
    <html lang="cs" className={syne.variable}>
      <body>
        <NotFoundContent locale="cs" texts={TEXTS} />
      </body>
    </html>
  )
}
