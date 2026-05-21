'use client'

import { useState, useEffect, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

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
  const [time, setTime] = useState<TimeLeft>(getTime())
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setTime(getTime()), 1000)
    return () => clearInterval(t)
  }, [])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (email) setSent(true)
  }

  const units: Array<{ v: number; l: string }> = [
    { v: time.d, l: 'dní' },
    { v: time.h, l: 'hodin' },
    { v: time.m, l: 'minut' },
    { v: time.s, l: 'sekund' },
  ]

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-navy px-6 py-10 overflow-hidden">
      <div
        className="pointer-events-none absolute top-[-120px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(252,192,19,0.07) 0%, transparent 65%)' }}
      />

      <motion.div
        className="relative z-10 w-full max-w-[780px] flex flex-col items-center text-center gap-9"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <Image
          src="/logo.svg"
          alt="NorthSun"
          width={180}
          height={180}
          priority
          className="w-[180px] h-auto"
        />

        <h1 className="font-syne font-extrabold text-white leading-[1.05] tracking-tighter whitespace-nowrap text-[clamp(2rem,7vw,6rem)]">
          Brzy spouštíme
        </h1>

        <p className="font-syne text-white/55 leading-[1.65] text-[clamp(1rem,2.4vw,1.2rem)]">
          Česko-švédská solární firma.
          <br />
          Nový web se připravuje.
        </p>

        <div className="flex items-start gap-[clamp(12px,3.5vw,36px)]">
          {units.map(({ v, l }, i) => {
            const digits = String(v).length
            const fontSize =
              digits >= 3 ? 'clamp(1.9rem, 5.3vw, 3.65rem)' : 'clamp(2.8rem, 8vw, 5.5rem)'

            return (
              <div
                key={i}
                className="flex flex-col items-center gap-2.5"
                style={{ width: 'clamp(76px, 13vw, 130px)' }}
              >
                <span
                  className="block w-full text-center font-syne font-extrabold text-yellow leading-none tabular-nums"
                  style={{ fontSize }}
                >
                  {String(v).padStart(2, '0')}
                </span>
                <span className="font-syne font-bold text-[0.7rem] uppercase tracking-[0.14em] text-white/35">
                  {l}
                </span>
              </div>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex w-full max-w-[500px] max-[500px]:flex-col"
            >
              <input
                type="email"
                placeholder="Váš e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-5 py-[15px] bg-white/[0.05] border border-white/[0.14] border-r-0 rounded-l-md max-[500px]:rounded-l-md max-[500px]:rounded-tr-md max-[500px]:border-r max-[500px]:border-b-0 text-white font-syne text-base outline-none transition-colors placeholder:text-white/30 focus:border-yellow/45 focus:bg-white/[0.07]"
              />
              <button
                type="submit"
                className="px-6 py-[15px] bg-yellow text-navy font-syne font-bold text-[0.95rem] border-none rounded-r-md max-[500px]:rounded-r-md max-[500px]:rounded-bl-md cursor-pointer whitespace-nowrap transition-all hover:bg-yellow-50 active:scale-[0.98]"
              >
                Informujte mě
              </button>
            </motion.form>
          ) : (
            <motion.p
              key="thanks"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="font-syne font-semibold text-[1.1rem] text-yellow"
            >
              Děkujeme. Dáme vám vědět jako prvním.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <footer className="fixed bottom-6 left-0 right-0 z-10 flex justify-center gap-10 font-syne text-[0.78rem] text-white/20 tracking-wider">
        <span>© 2026 NorthSun</span>
        <span>northsun.eu</span>
      </footer>
    </div>
  )
}
