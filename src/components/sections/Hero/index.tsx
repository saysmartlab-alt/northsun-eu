import { getTranslations } from 'next-intl/server'
import { HeroSection } from './HeroSection'
import type { HeroSlide } from './HeroSlider'

interface HeroProps {
  locale: string
}

/**
 * Hero slide list — restricted to sources whose native resolution is high
 * enough to stay sharp on 2560+ px displays without Next.js Image upscaling.
 *
 * Sizing budget (with Ken Burns scale 1.06):
 *   4K wide monitor        3840 × ~2100 px hero area  →  needs ≥ 4000 px source
 *   Notebook / 1440p        2560 × ~1400 px            →  needs ≥ 2700 px source
 *
 * The 1400 × 700 project cover shots are fine inside reference cards but
 * become visibly blurry when the hero stretches them full-width; they were
 * removed here and stay only in <ReferenceCardMedia>.
 *
 * Order picked so the first slide (LCP) is the strongest wide shot.
 */
function buildSlides(locale: string): HeroSlide[] {
  const cs = locale === 'cs'
  return [
    {
      src: '/hero/1.jpg',
      alt: cs
        ? 'Střešní solární instalace NorthSun v severní Evropě'
        : 'NorthSun rooftop solar installation in Northern Europe',
    },
    {
      src: '/hero/2.jpg',
      alt: cs
        ? 'Komerční solární střecha v norské Langhusu'
        : 'Commercial solar rooftop in Langhus, Norway',
    },
    {
      src: '/hero/3.jpg',
      alt: cs
        ? 'Plovoucí solární elektrárna, jižní Švédsko'
        : 'Floating solar power plant, southern Sweden',
    },
    {
      src: '/images/projects/floating-solar/cover.jpg',
      alt: cs
        ? 'Plovoucí solární elektrárna se Sunsurf, Švédsko'
        : 'Floating solar power plant with Sunsurf, Sweden',
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
