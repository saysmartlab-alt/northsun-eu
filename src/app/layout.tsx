import type { Metadata } from 'next'
import { Syne } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NorthSun — Premium solární EPC',
  description: 'Česko-švédsko-norská EPC firma. Engineering-led solární řešení pro domácnosti a investory.',
  metadataBase: new URL('https://northsun-eu.com'),
  openGraph: {
    title: 'NorthSun — Premium solární EPC',
    description: 'Neděláme nejlevněji, děláme nejlépe.',
    url: 'https://northsun-eu.com',
    siteName: 'NorthSun',
    locale: 'cs_CZ',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" className={syne.variable}>
      <body>{children}</body>
    </html>
  )
}
