'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Analytics } from '@vercel/analytics/next'

const STORAGE_KEY = 'nsu-cookie-consent'
type ConsentValue = 'accepted' | 'rejected'

interface CookieConsentProps {
  locale: string
  texts: {
    message: string
    privacyLabel: string
    accept: string
    reject: string
    ariaBanner: string
    ariaAccept: string
    ariaReject: string
  }
}

/**
 * GDPR cookie consent banner + gated analytics.
 *
 * Analytics (Vercel) is mounted ONLY after the visitor accepts.
 * `rejected` state hides the banner AND keeps analytics off — GDPR-compliant
 * "no consent = no tracking".
 *
 * State persists in localStorage. First visit shows the banner; subsequent
 * visits skip it and honour the stored decision.
 */
export function CookieConsent({ locale, texts }: CookieConsentProps) {
  const [consent, setConsent] = useState<ConsentValue | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'accepted' || stored === 'rejected') {
        setConsent(stored)
      }
    } catch {
      // localStorage may throw in private mode / sandboxed iframes — treat as no consent yet.
    }
  }, [])

  const persist = (value: ConsentValue) => {
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // Storage full or blocked — decision still applies for this session.
    }
    setConsent(value)
  }

  const showBanner = mounted && consent === null

  return (
    <>
      {/* Vercel Analytics loads only after explicit acceptance.
          Rejected + first-visit-not-yet-decided = no tracking script. */}
      {consent === 'accepted' && <Analytics />}

      {showBanner && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label={texts.ariaBanner}
          className="fixed inset-x-0 bottom-0 z-[80] border-t border-white/10 bg-navy/95 backdrop-blur-md text-white shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.35)]"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between md:gap-8 md:px-12 md:py-6">
            <p className="max-w-3xl text-small md:text-body text-white/90 leading-relaxed">
              {texts.message}{' '}
              <Link
                href={`/${locale}/privacy`}
                className="underline underline-offset-4 hover:text-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow rounded-sm"
              >
                {texts.privacyLabel}
              </Link>
            </p>
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:gap-3 md:shrink-0">
              <button
                type="button"
                onClick={() => persist('rejected')}
                aria-label={texts.ariaReject}
                className="inline-flex items-center justify-center rounded-lg border border-white/25 px-5 py-2.5 text-small font-syne font-semibold text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
              >
                {texts.reject}
              </button>
              <button
                type="button"
                onClick={() => persist('accepted')}
                aria-label={texts.ariaAccept}
                className="inline-flex items-center justify-center rounded-lg bg-yellow px-5 py-2.5 text-small font-syne font-semibold text-navy transition-colors duration-200 hover:bg-yellow-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
              >
                {texts.accept}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
