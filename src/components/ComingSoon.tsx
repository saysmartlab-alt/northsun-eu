'use client'

import { useState, useEffect, FormEvent, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import BackgroundSlideshow from './BackgroundSlideshow'

const richAccent = {
  accent: (chunks: ReactNode) => <span className="text-yellow">{chunks}</span>,
}

const LAUNCH = new Date('2026-07-02T00:00:00')

type TimeLeft = { d: number; h: number; m: number; s: number }

function getTime(): TimeLeft {
  const diff = LAUNCH.getTime() - Date.now()
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 }
  return {
    d: Math.floor(diff / 864e5),
    h: Math.floor(diff / 36e5) % 24,
    m: Math.floor(diff / 6e4) % 60,
    s: Math.floor(diff / 1e3) % 60,
  }
}

export default function ComingSoon() {
  const t = useTranslations('ComingSoon')
  const [time, setTime] = useState<TimeLeft>(getTime())
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const tick = setInterval(() => setTime(getTime()), 1000)
    return () => clearInterval(tick)
  }, [])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (email) setSent(true)
  }

  const units: Array<{ v: number; l: string }> = [
    { v: time.d, l: t('days') },
    { v: time.h, l: t('hours') },
    { v: time.m, l: t('minutes') },
    { v: time.s, l: t('seconds') },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050018]">
      {/* Animated background slideshow */}
      <BackgroundSlideshow />

      {/* Subtle grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Content layout — vertically centered */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-8 py-10 sm:px-20 sm:py-16 lg:px-32 lg:py-20">
        {/* Heading + subheading + services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          className="mb-10 sm:mb-14 max-w-5xl"
        >
          <h1 className="font-syne font-extrabold text-white uppercase leading-[0.92] tracking-tighter whitespace-nowrap text-[clamp(1.4rem,6.4vw,7.2rem)]">
            <span className="inline sm:block">{t('headingLine1')}</span>
            <span className="inline sm:block">
              {' '}
              {t('headingLine2')}
              <span className="text-yellow">.</span>
            </span>
          </h1>
          <p className="mt-5 sm:mt-7 font-syne text-white/55 leading-relaxed max-w-5xl text-[clamp(0.95rem,1.6vw,1.15rem)]">
            {t.rich('subHeading1', richAccent)} {t.rich('subHeading2', richAccent)}
          </p>
          <p className="mt-2.5 sm:mt-3 font-syne text-white/55 leading-relaxed max-w-3xl text-[clamp(0.95rem,1.6vw,1.15rem)]">
            {t('services')}
          </p>
        </motion.div>

        {/* Bottom: Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
          className="flex items-start gap-x-2 sm:gap-x-4 lg:gap-x-6 flex-wrap gap-y-3"
          style={{ fontSize: 'clamp(1.75rem, 7.5vw, 6rem)' }}
        >
          {units.map(({ v, l }, i) => (
            <div key={i} className="flex items-start gap-1.5 sm:gap-2">
              <span className="font-mono font-extrabold leading-none text-yellow/85 text-[1em]">
                {String(v).padStart(2, '0')}
              </span>
              <span className="font-syne font-bold text-white text-[9px] sm:text-[11px] lg:text-xs uppercase tracking-[0.18em] mt-1.5 sm:mt-2 lg:mt-3 whitespace-nowrap">
                {l}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Email form + logo row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-10 sm:mt-14 w-full flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-6"
        >
          <div className="w-full max-w-md">
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col sm:flex-row"
                >
                  <input
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    inputMode="email"
                    autoComplete="email"
                    className="flex-1 min-w-0 px-5 py-4 sm:py-3.5 bg-white/[0.06] border border-white/[0.14] sm:border-r-0 rounded-md sm:rounded-l-md sm:rounded-r-none text-white font-syne text-base outline-none transition-colors placeholder:text-white/30 focus:border-yellow/45 focus:bg-white/[0.09]"
                  />
                  <button
                    type="submit"
                    className="mt-2 sm:mt-0 min-h-[48px] px-6 py-3.5 bg-yellow text-navy font-syne font-bold text-[0.95rem] border-none rounded-md sm:rounded-l-none sm:rounded-r-md cursor-pointer whitespace-nowrap transition-all hover:bg-yellow-50 active:scale-[0.98]"
                  >
                    {t('submitButton')}
                  </button>
                </motion.form>
              ) : (
                <motion.p
                  key="thanks"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="font-syne font-semibold text-[1rem] text-yellow py-2"
                >
                  {t('thanksMessage')}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.8, ease: 'easeOut' }}
            className="flex-shrink-0 self-start sm:self-auto sm:-translate-y-10"
          >
            <Image
              src="/logo.svg"
              alt="NorthSun"
              width={120}
              height={120}
              priority
              className="w-16 sm:w-24 lg:w-32 h-auto"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
