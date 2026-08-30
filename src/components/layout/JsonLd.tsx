import { CONTACT_EMAIL, CONTACT_PHONE } from '@/lib/constants'

const BASE_URL = 'https://www.northsun-eu.com'

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'North Sun s.r.o.',
  alternateName: 'NorthSun',
  legalName: 'North Sun s.r.o.',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.svg`,
  image: `${BASE_URL}/logo.svg`,
  description:
    'Czech-Swedish-Norwegian EPC company specialising in premium solar energy solutions across Northern Europe.',
  taxID: 'CZ17279976',
  vatID: 'CZ17279976',
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'CZ_ICO',
    value: '17279976',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Sokolská 137',
    addressLocality: 'Vejprnice',
    postalCode: '330 27',
    addressCountry: 'CZ',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: CONTACT_PHONE,
      email: CONTACT_EMAIL,
      contactType: 'sales',
      areaServed: ['CZ', 'SE', 'NO', 'DE', 'NL', 'BE', 'HR'],
      availableLanguage: ['cs', 'en', 'de', 'sv', 'no', 'nl'],
    },
  ],
  sameAs: [
    'https://www.linkedin.com/in/lukas-kohout-412a121b6/',
    'https://www.youtube.com/@NorthSun.and.QualitySolar',
  ],
  location: [
    {
      '@type': 'Place',
      name: 'North Sun s.r.o. — Vejprnice (HQ)',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Sokolská 137',
        addressLocality: 'Vejprnice',
        postalCode: '330 27',
        addressCountry: 'CZ',
      },
    },
    {
      '@type': 'Place',
      name: 'North Sun — Marieholm office',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kungsgatan 5F',
        addressLocality: 'Marieholm',
        postalCode: '240 30',
        addressCountry: 'SE',
      },
    },
    {
      '@type': 'Place',
      name: 'North Sun — Moss office',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Bernt Ankers gate 17',
        addressLocality: 'Moss',
        postalCode: '1534',
        addressCountry: 'NO',
      },
    },
  ],
} as const

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: BASE_URL,
  name: 'NorthSun',
  publisher: { '@id': `${BASE_URL}/#organization` },
  inLanguage: ['cs-CZ', 'en'],
} as const

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
      />
    </>
  )
}
