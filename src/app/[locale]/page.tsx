import { setRequestLocale } from 'next-intl/server'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'
import { Why } from '@/components/sections/Why'
import { References } from '@/components/sections/References'
import { Contact } from '@/components/sections/Contact'

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
      <Services locale={locale} />
      <Why locale={locale} />
      <References locale={locale} />
      <Contact locale={locale} />
    </main>
  )
}
