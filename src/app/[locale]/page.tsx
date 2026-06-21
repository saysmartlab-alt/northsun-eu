import { setRequestLocale } from 'next-intl/server'
import { Container } from '@/components/ui/Container'

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center bg-white">
      <Container>
        <p className="text-center text-body-lg text-gray-medium">
          MVP homepage, coming soon (literally).
        </p>
      </Container>
    </main>
  )
}
