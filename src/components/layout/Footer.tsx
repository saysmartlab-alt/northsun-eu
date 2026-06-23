import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Container } from '@/components/ui/Container'

const socialLinkClass =
  'flex h-10 w-10 items-center justify-center rounded-full border border-border text-gray-dark/70 transition-colors duration-200 hover:border-navy hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2'

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

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

const PARTNER_LOGOS = [
  { slug: 'panelclaw', name: 'PanelClaw', logo: '/images/partners/panelclaw/logo.jpeg' },
  { slug: 'pillar', name: 'Pillar', logo: '/images/partners/pillar/logo.png' },
  { slug: 'sunsurf', name: 'Sunsurf', logo: '/images/partners/sunsurf/logo.svg' },
  { slug: 'aikosolar', name: 'Aiko Solar', logo: '/images/partners/aikosolar/logo.svg' },
  { slug: 'ecosol', name: 'Ecosol', logo: '/images/partners/ecosol/logo.png' },
  { slug: 'solarsk', name: 'Solar SK', logo: '/images/partners/solarsk/logo.png' },
] as const

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
      className="bg-white text-gray-dark"
    >
      <Container className="pt-20 md:pt-24 lg:pt-28 pb-10 md:pb-12">
        {/* Partner logos strip (premium credibility marker, links scroll to Partners section) */}
        <div className="mb-16 md:mb-20 pb-12 md:pb-16 border-b border-border">
          <p className="text-caption uppercase tracking-[0.18em] font-semibold text-gray-medium mb-7 text-center md:text-left">
            {locale === 'cs' ? 'Naši partneři' : 'Our partners'}
          </p>
          <ul
            role="list"
            className="flex flex-wrap items-center justify-center md:justify-between gap-x-10 md:gap-x-6 gap-y-6"
          >
            {PARTNER_LOGOS.map((p) => (
              <li key={p.slug} className="list-none">
                <a
                  href="#partneri"
                  aria-label={p.name}
                  title={p.name}
                  className="block opacity-75 transition-opacity duration-200 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-sm"
                >
                  <Image
                    src={p.logo}
                    alt={`${p.name} logo`}
                    width={140}
                    height={36}
                    className="h-7 md:h-8 w-auto object-contain"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Main grid: logo + 3 link columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-8">
          {/* Logo + tagline block */}
          <div className="lg:col-span-3">
            <Image
              src="/logo.svg"
              alt="NorthSun"
              width={200}
              height={96}
              className="h-20 lg:h-24 w-auto"
              priority={false}
            />
            <p className="mt-6 max-w-xs text-body text-gray-dark/70 leading-relaxed">
              {tagline}
            </p>
            {/* Social links */}
            <ul role="list" className="mt-6 flex items-center gap-3">
              <li className="list-none">
                <a
                  href="https://www.linkedin.com/in/lukas-kohout-412a121b6/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={socialLinkClass}
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              </li>
              <li className="list-none">
                <a
                  href="https://www.youtube.com/@NorthSun.and.QualitySolar"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className={socialLinkClass}
                >
                  <YoutubeIcon className="h-4 w-4" />
                </a>
              </li>
            </ul>
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
                <h2 className="text-small uppercase tracking-[0.18em] font-semibold text-yellow-600 mb-5">
                  {column.title}
                </h2>
                <ul role="list" className="flex flex-col">
                  {column.links.map((link) => (
                    <li key={link.href} className="list-none">
                      <a
                        href={link.href}
                        className="block py-1.5 text-body text-gray-dark/75 hover:text-navy transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-gray-light rounded-sm"
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
        <div className="mt-16 md:mt-20 border-t border-border" />

        <div className="mt-10 md:mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-caption text-gray-medium leading-relaxed">
            {t.rich('legal.copyright', {
              privacy: (chunks) => (
                <Link
                  href={`/${locale}/privacy`}
                  className="text-gray-dark hover:text-navy underline underline-offset-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-gray-light rounded-sm"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
          <div
            aria-hidden="true"
            className="flex items-center gap-2 text-caption text-gray-medium"
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
