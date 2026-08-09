import type { Metadata } from 'next'
import { Outfit, Inter, Lora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ExitIntentPopup } from '@/components/ExitIntentPopup'
import { VisitorTracker } from '@/components/VisitorTracker'
import './globals.css'

const displayFont = Outfit({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-body',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-accent',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sunshinemaplebear.edu.vn'),
  title: {
    default: 'Sunshine Maple Bear International Kindergarten — 100% English Canadian Education | Hanoi',
    template: '%s | Sunshine Maple Bear International Kindergarten'
  },
  description: 'Premium Canadian international kindergarten with 100% English instruction for children aged 12 months to 5 years. Official Maple Bear program at Sunshine City, Ciputra, Hanoi.',
  keywords: [
    'international kindergarten',
    'maple bear',
    'canadian preschool',
    '100% english',
    'english immersion',
    'hanoi',
    'ciputra',
    'sunshine city',
    'early childhood education',
    'truong mam non song ngu',
    'mam non maple bear'
  ],
  alternates: {
    canonical: 'https://www.sunshinemaplebear.edu.vn',
    languages: {
      'vi-VN': 'https://www.sunshinemaplebear.edu.vn',
      'en-US': 'https://www.sunshinemaplebear.edu.vn'
    }
  },
  icons: {
    icon: [{ url: '/logo.png', type: 'image/png' }],
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Sunshine Maple Bear International Kindergarten — 100% English Canadian Education',
    description: 'Premium Canadian international kindergarten with 100% English instruction for children aged 12 months to 5 years at Sunshine City, Hanoi.',
    url: 'https://www.sunshinemaplebear.edu.vn',
    siteName: 'Sunshine Maple Bear International Kindergarten',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/logo.png', width: 512, height: 512, alt: 'Sunshine Maple Bear Logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sunshine Maple Bear International Kindergarten — 100% English Canadian Education',
    description: 'Premium Canadian international kindergarten at Sunshine City, Ciputra, Hanoi.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'Preschool',
  'name': 'Sunshine Maple Bear International Kindergarten',
  'alternateName': 'Trường Mầm non Song ngữ Sunshine Maple Bear',
  'url': 'https://www.sunshinemaplebear.edu.vn',
  'logo': 'https://www.sunshinemaplebear.edu.vn/logo.png',
  'image': 'https://www.sunshinemaplebear.edu.vn/logo.png',
  'description': 'Canadian international kindergarten offering 100% English immersion education in Sunshine City, Ciputra, Hanoi.',
  'telephone': '+84 91 104 0022',
  'email': 'admissions@sunshinemaplebear.edu.vn',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'S4 Building, Sunshine City, Ciputra Urban Area, Phu Thuong',
    'addressLocality': 'Tay Ho',
    'addressRegion': 'Hanoi',
    'postalCode': '100000',
    'addressCountry': 'VN'
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': 21.085,
    'longitude': 105.795
  },
  'sameAs': [
    'https://www.facebook.com/sunshinemaplebear.edu.vn'
  ],
  'priceRange': '$$$'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${inter.variable} ${lora.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#C8102E" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        <link rel="dns-prefetch" href="https://pvdos3hwo8pzdj8j8j8j.supabase.co" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground" suppressHydrationWarning>
        <VisitorTracker />
        {children}
        <ExitIntentPopup />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
