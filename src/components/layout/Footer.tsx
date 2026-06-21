import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Container } from '@/components/ui/Container'

interface FooterProps {
  locale: string
}

interface FooterLink {
  label: string
  href: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

/**
 * Footer is intentionally a static Server Component (no motion, no client JS).
 * It uses plain anchor tags for internal links because the localized routes
 * (e.g. /o-nas/, /sluzby/...) aren't registered in `i18n/routing` pathnames yet,
 * and the link list is content-driven from messages JSON.
 */
export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations({ locale, namespace: 'Footer' })

  const tagline = t('tagline')
  const columns = t.raw('columns') as FooterColumn[]

  return (
    <footer
      role="contentinfo"
      aria-label={locale === 'cs' ? 'Patička' : 'Footer'}
      className="relative overflow-hidden bg-navy text-white"
    >
      {/* Subtle navy-mid spotlight (decoration only, continuity with Contact dark) */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(0,74,173,0.35) 0%, transparent 60%), linear-gradient(180deg, #030057 0%, #02003d 100%)',
        }}
      />

      <Container className="relative pt-20 md:pt-24 lg:pt-28 pb-10 md:pb-12">
        {/* Main grid: logo + 3 link columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-8">
          {/* Logo + tagline block */}
          <div className="lg:col-span-3">
            <Image
              src="/logo.svg"
              alt="NorthSun"
              width={140}
              height={64}
              className="h-16 w-auto"
              priority={false}
            />
            <p className="mt-6 max-w-xs text-body text-white/60 leading-relaxed">
              {tagline}
            </p>
          </div>

          {/* Link columns */}
          <nav
            aria-label={
              locale === 'cs' ? 'Navigace v patičce' : 'Footer navigation'
            }
            className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8"
          >
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="text-small uppercase tracking-[0.18em] font-semibold text-yellow mb-5">
                  {column.title}
                </h2>
                <ul role="list" className="flex flex-col">
                  {column.links.map((link) => (
                    // Plain anchor for both external (mailto/tel) and
                    // internal placeholders (target pages don't exist yet
                    // in MVP). Swap internal links for next-intl `Link`
                    // once routes are registered in `i18n/routing`.
                    <li key={link.href} className="list-none">
                      <a
                        href={link.href}
                        className="block py-1.5 text-body text-white/70 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Divider + legal row */}
        <div className="mt-16 md:mt-20 border-t border-white/10" />

        <div className="mt-10 md:mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-caption text-white/40 leading-relaxed">
            {t.rich('legal.copyright', {
              privacy: (chunks) => (
                <Link
                  href={`/${locale}/privacy`}
                  className="text-white/60 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded-sm"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
          <div
            aria-hidden="true"
            className="flex items-center gap-2 text-caption text-white/40"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-yellow" />
            <span>
              {locale === 'cs'
                ? 'EPC napříč severní Evropou'
                : 'EPC across Northern Europe'}
            </span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
