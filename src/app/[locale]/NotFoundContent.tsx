'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, MessageSquare } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'

interface NotFoundContentProps {
  locale: string
  texts: {
    label: string
    heading: string
    lead: string
    primaryCta: string
    secondaryCta: string
  }
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const ctaBase =
  'inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-syne font-semibold rounded-lg transition-all duration-200 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy'

const ctaPrimaryClasses =
  'bg-yellow text-navy hover:bg-yellow-600 shadow-sm hover:shadow-md group'

const ctaSecondaryClasses =
  'border-2 border-white/70 text-white hover:bg-white hover:text-navy hover:border-white'

export function NotFoundContent({ locale, texts }: NotFoundContentProps) {
  const prefersReducedMotion = useReducedMotion()

  const digits = ['4', '0', '4']
  const middleIndex = 1

  return (
    <section
      role="main"
      aria-labelledby="not-found-heading"
      className="relative isolate flex min-h-[88vh] md:min-h-screen items-center overflow-hidden bg-navy pt-32 pb-24 md:py-32"
    >
      {/* Same dark gradient family as Services/Why/Contact — brand continuity */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 15%, rgba(0,74,173,0.55) 0%, transparent 55%), radial-gradient(ellipse at 85% 90%, rgba(252,192,19,0.18) 0%, transparent 50%), linear-gradient(135deg, #030057 0%, #02003d 100%)',
        }}
      />
      {/* Subtle grain overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")`,
        }}
      />

      <Container className="relative z-10 text-center">
        {/* Massive 404 numerals */}
        <div
          aria-hidden="true"
          className="flex items-center justify-center font-syne font-extrabold leading-none tracking-tighter"
          style={{ fontSize: 'clamp(7rem, 22vw, 16rem)' }}
        >
          {digits.map((digit, idx) => {
            const isMiddle = idx === middleIndex
            return (
              <motion.span
                key={idx}
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 24, rotate: idx === 0 ? -6 : idx === 2 ? 6 : 0 }
                }
                animate={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 1, y: 0, rotate: 0 }
                }
                transition={{
                  duration: prefersReducedMotion ? 0.2 : 0.9,
                  delay: prefersReducedMotion ? 0 : 0.1 + idx * 0.12,
                  ease,
                }}
                className={cn('inline-block', isMiddle ? 'text-yellow' : 'text-white')}
              >
                {/* Middle 0 keeps a continuous gentle scale — subtle "breathing" without distracting */}
                {isMiddle && !prefersReducedMotion ? (
                  <motion.span
                    className="inline-block"
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {digit}
                  </motion.span>
                ) : (
                  digit
                )}
              </motion.span>
            )
          })}
        </div>

        {/* Label */}
        <motion.p
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease }}
          className="mt-6 text-small uppercase tracking-[0.24em] font-semibold text-yellow"
        >
          {texts.label}
        </motion.p>

        {/* Heading */}
        <motion.h1
          id="not-found-heading"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75, ease }}
          className="mt-5 text-h1 text-white [text-wrap:balance] max-w-3xl mx-auto"
        >
          {texts.heading}
        </motion.h1>

        {/* Lead */}
        <motion.p
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease }}
          className="mt-6 text-body-lg text-white/80 max-w-xl mx-auto [text-wrap:pretty]"
        >
          {texts.lead}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05, ease }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Link href={`/${locale}`} className={cn(ctaBase, ctaPrimaryClasses)}>
            <ArrowLeft
              className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            <span>{texts.primaryCta}</span>
          </Link>

          <Link
            href={`/${locale}#kontakt`}
            className={cn(ctaBase, ctaSecondaryClasses)}
          >
            <MessageSquare className="h-5 w-5" aria-hidden="true" />
            <span>{texts.secondaryCta}</span>
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
