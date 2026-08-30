import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import ComingSoon from '@/components/ComingSoon'

// Legacy pre-launch page — keep accessible for archive but exclude from
// search indexing (also excluded via robots.ts disallow rules).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default async function ComingSoonPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return <ComingSoon />
}
