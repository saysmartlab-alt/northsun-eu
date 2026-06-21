import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { HeroContent } from './HeroContent'
import { TrustStrip } from './TrustStrip'

interface HeroProps {
  locale: string
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
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[88vh] md:min-h-screen items-center overflow-hidden bg-navy pt-32 md:pt-36 pb-32 md:pb-40 px-6 md:px-12"
    >
      {/* Background photo: floating PV plant.
          Mobile shifts focus right (60%) so panels stay visible behind text on the left. */}
      <Image
        src="/hero/3.jpg"
        alt=""
        fill
        priority
        quality={75}
        sizes="100vw"
        className="object-cover object-[60%_center] md:object-center -z-10"
      />

      {/* Dual gradient overlay: horizontal fade (R-side reveal) + vertical bottom darken */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/85 via-navy/60 to-navy/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/70 via-transparent to-transparent"
      />

      {/* Inner container, content left-aligned */}
      <div className="mx-auto w-full max-w-7xl">
        <HeroContent texts={content} />
      </div>

      <TrustStrip texts={trust} />
    </section>
  )
}
