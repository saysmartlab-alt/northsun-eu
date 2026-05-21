import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ComingSoon.css'

const LAUNCH = new Date('2026-10-01T00:00:00')

function getTime() {
  const diff = LAUNCH - Date.now()
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 }
  return {
    d: Math.floor(diff / 864e5),
    h: Math.floor(diff / 36e5) % 24,
    m: Math.floor(diff / 6e4) % 60,
    s: Math.floor(diff / 1e3) % 60,
  }
}

export default function ComingSoon() {
  const [time, setTime] = useState(getTime())
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setTime(getTime()), 1000)
    return () => clearInterval(t)
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    if (email) setSent(true)
  }

  return (
    <div className="cs">
      <div className="cs-glow" />

      <motion.div
        className="cs-inner"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <img src="/logo.svg" alt="NorthSun" className="cs-logo" />

        <h1 className="cs-title">Brzy spouštíme</h1>
        <p className="cs-sub">
          Česko-švédská solární firma.<br />
          Nový web se připravuje.
        </p>

        <div className="cs-countdown">
          {[
            { v: time.d, l: 'dní' },
            { v: time.h, l: 'hodin' },
            { v: time.m, l: 'minut' },
            { v: time.s, l: 'sekund' },
          ].map(({ v, l }, i) => {
            const digits = String(v).length
            const fs = digits >= 3
              ? 'clamp(1.9rem, 5.3vw, 3.65rem)'
              : 'clamp(2.8rem, 8vw, 5.5rem)'
            return (
              <div key={i} className="cs-block">
                <span className="cs-num" style={{ fontSize: fs }}>
                  {String(v).padStart(2, '0')}
                </span>
                <span className="cs-lbl">{l}</span>
              </div>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.form
              key="form"
              className="cs-form"
              onSubmit={handleSubmit}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <input
                type="email"
                placeholder="Váš e-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button type="submit">Informujte mě</button>
            </motion.form>
          ) : (
            <motion.p
              key="thanks"
              className="cs-thanks"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Děkujeme. Dáme vám vědět jako prvním.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <footer className="cs-footer">
        <span>© 2026 NorthSun</span>
        <span>northsun.eu</span>
      </footer>
    </div>
  )
}
