import { setRequestLocale } from 'next-intl/server'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main id="main-content">
      <Hero locale={locale} />
      <About locale={locale} />
    </main>
  )
}
