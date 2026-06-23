import { Phone, Mail, MapPin } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Flag } from '@/components/ui/Flag'
import { ContactForm } from './ContactForm'

interface ContactProps {
  locale: string
}

interface AddressItem {
  flag: 'CZ' | 'SE' | 'NO'
  country: string
  office: string
  lines: string[]
}

export async function Contact({ locale }: ContactProps) {
  const t = await getTranslations({ locale, namespace: 'Contact' })

  const label = t('label')
  const title = t('title')
  const lead = t('lead')

  const phone = t('info.phone')
  const email = t('info.email')
  const phoneLabel = t('phoneLabel')
  const phoneSubtitle = t('phoneSubtitle')
  const emailLabel = t('emailLabel')
  const addressesLabel = t('addressesLabel')
  const addresses = t.raw('info.addresses') as AddressItem[]

  // tel: href without spaces or non-digit chars (keep leading +).
  const phoneHref = `tel:${phone.replace(/[^\d+]/g, '')}`
  const mailHref = `mailto:${email}`

  return (
    <Section
      id="kontakt"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-navy"
    >
      {/* Same gradient family as Services (continuity), but mirrored:
          spotlight top-right + yellow whisper bottom-left to break repetition. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 85% 10%, rgba(0,74,173,0.55) 0%, transparent 55%), radial-gradient(ellipse at 10% 95%, rgba(252,192,19,0.15) 0%, transparent 50%), linear-gradient(135deg, #030057 0%, #02003d 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")`,
        }}
      />

      <Container className="relative">
        <AnimatedSection>
          {/* Section header */}
          <div>
            <span className="block text-small uppercase tracking-[0.18em] font-semibold text-yellow">
              {label}
            </span>
            <h2
              id="contact-heading"
              className="mt-5 text-h1 text-white [text-wrap:balance]"
            >
              {title}
            </h2>
            <p className="mt-5 text-body-lg text-white/75 max-w-3xl whitespace-pre-line">
              {lead}
            </p>
          </div>

          {/* 2-col layout: form 7/12, info 5/12 on desktop */}
          <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Form column */}
            <div className="lg:col-span-7">
              <ContactForm locale={locale} />
            </div>

            {/* Info column */}
            <aside
              aria-label={t('infoTitle')}
              className="lg:col-span-5 flex flex-col gap-8"
            >
              {/* Phone block */}
              <div>
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow/15 text-yellow"
                  >
                    <Phone className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="text-small uppercase tracking-[0.18em] font-semibold text-white/60">
                    {phoneLabel}
                  </span>
                </div>
                <a
                  href={phoneHref}
                  className="mt-4 block text-h3 font-bold text-yellow hover:text-yellow-600 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded-md"
                >
                  {phone}
                </a>
                <p className="mt-2 text-caption text-white/55">
                  {phoneSubtitle}
                </p>
              </div>

              {/* Email block */}
              <div>
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow/15 text-yellow"
                  >
                    <Mail className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="text-small uppercase tracking-[0.18em] font-semibold text-white/60">
                    {emailLabel}
                  </span>
                </div>
                <a
                  href={mailHref}
                  className="mt-4 block text-h3 font-bold text-yellow hover:text-yellow-600 transition-colors duration-200 break-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded-md"
                >
                  {email}
                </a>
              </div>

              {/* Addresses */}
              <div>
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow/15 text-yellow"
                  >
                    <MapPin className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="text-small uppercase tracking-[0.18em] font-semibold text-white/60">
                    {addressesLabel}
                  </span>
                </div>
                <ul role="list" className="mt-4 flex flex-col gap-3">
                  {addresses.map((addr, idx) => {
                    const isHQ = idx === 0
                    const anchorId =
                      idx === 0
                        ? 'vejprnice'
                        : idx === 1
                          ? 'marieholm'
                          : 'moss'
                    return (
                      <li key={anchorId} className="list-none">
                        <article
                          id={anchorId}
                          className="rounded-xl border border-white/10 bg-navy-mid/10 p-5 transition-colors duration-200 hover:border-white/20 hover:bg-navy-mid/15"
                        >
                          <div className="flex items-baseline justify-between gap-3">
                            <h3 className="text-h4 font-semibold text-white flex items-center gap-2.5">
                              <Flag code={addr.flag} className="h-4" />
                              <span>{addr.country}</span>
                            </h3>
                            <span
                              className={
                                isHQ
                                  ? 'text-caption uppercase tracking-wider font-semibold text-yellow'
                                  : 'text-caption uppercase tracking-wider font-medium text-white/50'
                              }
                            >
                              {addr.office}
                            </span>
                          </div>
                          <address className="mt-2 not-italic text-body text-white/75 leading-relaxed">
                            {addr.lines.map((line, lineIdx) => (
                              <span key={lineIdx} className="block">
                                {line}
                              </span>
                            ))}
                          </address>
                        </article>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </aside>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  )
}
