'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link, usePathname } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'

export interface HeaderTexts {
  nav: {
    about: string
    services: string
    references: string
    contact: string
  }
  cta: {
    consultation: string
  }
  aria: {
    banner: string
    mainNav: string
    home: string
    openMenu: string
    closeMenu: string
    mobileMenu: string
    langSwitch: string
  }
}

interface HeaderInnerProps {
  locale: string
  texts: HeaderTexts
}

interface NavItem {
  key: 'about' | 'services' | 'references' | 'contact'
  href: string
  label: string
}

const LOCALES = [
  { code: 'cs', label: 'CZ' },
  { code: 'en', label: 'EN' },
] as const

// Pixel threshold past which the header switches from transparent to solid.
// Picked low (60px) so the switch happens before the Hero scrolls visibly far.
const SCROLL_THRESHOLD = 60

export function HeaderInner({ locale, texts }: HeaderInnerProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => setMounted(true), [])

  // On sub-pages (e.g. /privacy) anchor-only links would stay on the sub-page
  // and never resolve. Prefix with locale root so clicks jump to homepage
  // section. On the homepage itself, plain anchors scroll without a reload.
  const isHomepage = pathname === '/'
  const anchorPrefix = isHomepage ? '' : `/${locale}`

  const navItems: NavItem[] = [
    { key: 'about', href: `${anchorPrefix}#o-nas`, label: texts.nav.about },
    { key: 'services', href: `${anchorPrefix}#sluzby`, label: texts.nav.services },
    { key: 'references', href: `${anchorPrefix}#reference`, label: texts.nav.references },
    { key: 'contact', href: `${anchorPrefix}#kontakt`, label: texts.nav.contact },
  ]

  // Scroll listener: toggle solid background past threshold.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD)
    }
    onScroll() // initial sync (e.g. when page loads scrolled mid-way)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [mobileOpen])

  // Close menu on Escape.
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  const goToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setMobileOpen(false)
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  const onNavClick = () => {
    // Let the browser handle the hash-based smooth scroll; just close the menu.
    setMobileOpen(false)
  }

  // Sub-pages need always-solid header (light body bg + transparent header
  // = white nav text on white = invisible). Homepage keeps the scroll-driven
  // transparent → solid transition for editorial hero feel.
  const headerBg = scrolled || !isHomepage
    ? 'bg-navy/95 backdrop-blur-md border-b border-navy-mid/30'
    : 'bg-transparent border-b border-transparent'

  return (
    <>
      <motion.header
        role="banner"
        aria-label={texts.aria.banner}
        initial={false}
        animate={
          mounted && !prefersReducedMotion ? { y: 0, opacity: 1 } : false
        }
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,border-color] duration-200 ease-out',
          headerBg
        )}
      >
        <Container className="flex h-20 lg:h-24 items-center justify-between gap-6">
          {/* Logo (left) */}
          <a
            href="#hero"
            onClick={goToTop}
            aria-label={texts.aria.home}
            className="flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            <Image
              src="/logo.svg"
              alt="NorthSun"
              width={140}
              height={64}
              priority
              className="h-14 lg:h-16 w-auto"
              style={{ width: 'auto' }}
            />
          </a>

          {/* Nav (center, desktop) */}
          <nav
            aria-label={texts.aria.mainNav}
            className="hidden lg:block"
          >
            <ul role="list" className="flex items-center gap-8 xl:gap-10">
              {navItems.map((item) => (
                <li key={item.key} className="list-none">
                  <a
                    href={item.href}
                    className="text-small uppercase tracking-[0.15em] font-medium text-white/80 hover:text-yellow transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded-sm py-2"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right cluster: language + CTA (desktop) */}
          <div className="hidden lg:flex items-center gap-6">
            <LanguageSwitcherInline
              locale={locale}
              pathname={pathname}
              ariaLabel={texts.aria.langSwitch}
            />
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center rounded-lg bg-yellow text-navy font-syne font-semibold text-small px-5 py-2.5 transition-all duration-200 ease-out hover:bg-yellow-600 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              {texts.cta.consultation}
            </a>
          </div>

          {/* Hamburger (mobile) */}
          <button
            type="button"
            aria-label={mobileOpen ? texts.aria.closeMenu : texts.aria.openMenu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-md text-white hover:text-yellow transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </Container>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={texts.aria.mobileMenu}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-30 lg:hidden bg-navy/95 backdrop-blur-md"
          >
            {/* Spacer for header height so content starts below it */}
            <div className="h-16" aria-hidden="true" />
            <Container className="flex flex-col h-[calc(100dvh-4rem)] py-8">
              <nav
                aria-label={texts.aria.mainNav}
                className="flex-1"
              >
                <ul role="list" className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <li key={item.key} className="list-none">
                      <a
                        href={item.href}
                        onClick={onNavClick}
                        className="block py-4 text-h3 font-semibold text-white text-right hover:text-yellow transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow rounded-sm"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-8 flex flex-col gap-6">
                <LanguageSwitcherInline
                  locale={locale}
                  pathname={pathname}
                  ariaLabel={texts.aria.langSwitch}
                  onNavigate={() => setMobileOpen(false)}
                />
                <a
                  href="#kontakt"
                  onClick={onNavClick}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-yellow text-navy font-syne font-semibold text-base px-6 py-4 transition-all duration-200 ease-out hover:bg-yellow-600 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                >
                  {texts.cta.consultation}
                </a>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Pathname type matches the union returned by next-intl's `usePathname`
// for our registered routes. We accept the union and pass it straight to `Link`.
type AppPathname = ReturnType<typeof usePathname>

interface LanguageSwitcherInlineProps {
  locale: string
  pathname: AppPathname
  ariaLabel: string
  onNavigate?: () => void
}

function LanguageSwitcherInline({
  locale,
  pathname,
  ariaLabel,
  onNavigate,
}: LanguageSwitcherInlineProps) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex items-center rounded-full border border-white/25 bg-white/5 p-1 font-syne text-small font-semibold tracking-wider backdrop-blur-sm"
    >
      {LOCALES.map(({ code, label }) => {
        const active = locale === code
        return (
          <Link
            key={code}
            href={pathname}
            locale={code}
            onClick={onNavigate}
            aria-current={active ? 'true' : undefined}
            className={cn(
              'inline-flex items-center justify-center min-h-[36px] min-w-[44px] px-3 rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy',
              active
                ? 'bg-yellow text-navy shadow-sm'
                : 'text-white/85 hover:text-white'
            )}
          >
            {label}
          </Link>
        )
      })}
    </div>
  )
}
