import { getTranslations } from 'next-intl/server'
import { HeaderInner, type HeaderTexts } from './HeaderInner'

interface HeaderProps {
  locale: string
}

/**
 * Header is a thin Server wrapper that loads translations and passes
 * them down to the Client `HeaderInner`. The inner component owns
 * scroll state, the mobile menu, and the locale switcher.
 */
export async function Header({ locale }: HeaderProps) {
  const t = await getTranslations({ locale, namespace: 'Header' })

  const texts: HeaderTexts = {
    nav: {
      about: t('nav.about'),
      services: t('nav.services'),
      references: t('nav.references'),
      contact: t('nav.contact'),
    },
    cta: {
      consultation: t('cta.consultation'),
    },
    aria: {
      banner: locale === 'cs' ? 'Hlavní hlavička' : 'Main header',
      mainNav: locale === 'cs' ? 'Hlavní navigace' : 'Main navigation',
      home: locale === 'cs' ? 'Domů, NorthSun' : 'Home, NorthSun',
      openMenu: locale === 'cs' ? 'Otevřít menu' : 'Open menu',
      closeMenu: locale === 'cs' ? 'Zavřít menu' : 'Close menu',
      mobileMenu: locale === 'cs' ? 'Mobilní menu' : 'Mobile menu',
      langSwitch: locale === 'cs' ? 'Přepnout jazyk' : 'Switch language',
    },
  }

  return <HeaderInner locale={locale} texts={texts} />
}
