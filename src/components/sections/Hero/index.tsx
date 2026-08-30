import { getTranslations } from 'next-intl/server'
import { HeroSection } from './HeroSection'
import type { HeroSlide } from './HeroSlider'

interface HeroProps {
  locale: string
}

/**
 * Build the hero slide list. Alts are localized inline (short strings that
 * don't warrant messages-file surgery). First slide is the original floating
 * PV plant; the rest are strong drone/poster shots pulled from existing
 * project galleries so no extra assets are shipped.
 */
function buildSlides(locale: string): HeroSlide[] {
  const cs = locale === 'cs'
  return [
    {
      src: '/hero/3.jpg',
      alt: cs
        ? 'Plovoucí solární elektrárna, jižní Švédsko'
        : 'Floating solar power plant, southern Sweden',
    },
    {
      src: '/images/projects/rudshogda/cover.jpg',
      alt: cs
        ? '1 MW solární instalace v Rudshøgdě, Norsko'
        : '1 MW solar installation in Rudshøgda, Norway',
    },
    {
      src: '/images/projects/lulea/black-roof.jpg',
      alt: cs
        ? 'Dron pohled na střešní instalaci v Luleå, Švédsko'
        : 'Drone view of a rooftop installation in Luleå, Sweden',
    },
    {
      src: '/images/projects/skelleftea/skelleftea.jpg',
      alt: cs
        ? 'Střešní fotovoltaická instalace v Skellefteå, Švédsko'
        : 'Rooftop solar installation in Skellefteå, Sweden',
    },
    {
      src: '/images/projects/installation-winter/cover.jpg',
      alt: cs
        ? 'Instalace ve složitých severských podmínkách'
        : 'Installation in demanding Nordic conditions',
    },
  ]
}

export async function Hero({ locale }: HeroProps) {
  const t = await getTranslations({ locale, namespace: 'Hero' })

  const content = {
    label: t('label'),
    title: t('title'),
    lead: t('lead'),
    ctaPrimary: t('ctaPrimary'),
    ctaSecondary: t('ctaSecondary'),
  }

  const trust = {
    locations: t('trustStrip.locations'),
    cert: t('trustStrip.cert'),
    partner: t('trustStrip.partner'),
  }

  return (
    <HeroSection
      content={content}
      trust={trust}
      slides={buildSlides(locale)}
      locale={locale}
    />
  )
}
