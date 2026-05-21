'use client'

import { useState, useEffect, FormEvent, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import BackgroundSlideshow from './BackgroundSlideshow'

const richAccent = {
  accent: (chunks: ReactNode) => <span className="text-yellow">{chunks}</span>,
}

const LAUNCH = new Date('2026-10-01T00:00:00')

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
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 py-10 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
        {/* Heading + subheading + services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          className="mb-10 sm:mb-14 max-w-5xl"
        >
          <h1 className="font-syne font-extrabold text-white uppercase leading-[0.92] tracking-tighter text-[clamp(2.8rem,11vw,9rem)]">
            {t('heading')}
            <span className="text-yellow">.</span>
          </h1>
          <p className="mt-5 sm:mt-7 font-syne text-white/55 leading-relaxed max-w-2xl text-[clamp(0.95rem,1.6vw,1.15rem)]">
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
          className="flex items-start gap-x-2 sm:gap-x-4 lg:gap-x-6"
          style={{ fontSize: 'clamp(2.2rem, 7.5vw, 6rem)' }}
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

        {/* Email form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-10 sm:mt-14 w-full max-w-md"
        >
          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex max-[500px]:flex-col"
              >
                <input
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-5 py-3.5 bg-white/[0.06] border border-white/[0.14] border-r-0 rounded-l-md max-[500px]:rounded-l-md max-[500px]:rounded-tr-md max-[500px]:border-r max-[500px]:border-b-0 text-white font-syne text-base outline-none transition-colors placeholder:text-white/30 focus:border-yellow/45 focus:bg-white/[0.09]"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-yellow text-navy font-syne font-bold text-[0.95rem] border-none rounded-r-md max-[500px]:rounded-r-md max-[500px]:rounded-bl-md cursor-pointer whitespace-nowrap transition-all hover:bg-yellow-50 active:scale-[0.98]"
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
                className="font-syne font-semibold text-[1rem] text-yellow"
              >
                {t('thanksMessage')}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Logo — bottom right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.8, ease: 'easeOut' }}
        className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 lg:bottom-14 lg:right-14 z-20"
      >
        <Image
          src="/logo.svg"
          alt="NorthSun"
          width={220}
          height={220}
          priority
          className="w-24 sm:w-36 lg:w-52 h-auto"
        />
      </motion.div>
    </div>
  )
}
