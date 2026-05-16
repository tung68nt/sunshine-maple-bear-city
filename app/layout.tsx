import type { Metadata } from 'next'
import { Outfit, Inter, Lora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ChatWidget } from '@/components/chat-widget'
import { ExitIntentPopup } from '@/components/ExitIntentPopup'
import { GoogleTranslate } from '@/components/google-translate'
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
  title: 'Sunshine Maple Bear International Kindergarten — 100% English Canadian Education | Hanoi',
  description: 'Premium Canadian international kindergarten with 100% English instruction for children aged 12 months to 5 years. Official Maple Bear program at Sunshine City, Ciputra, Hanoi.',
  keywords: 'international kindergarten, maple bear, canadian preschool, 100% english, english immersion, hanoi, ciputra, sunshine city, early childhood',
  icons: {
    icon: [{ url: '/logo.png', type: 'image/png' }],
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Sunshine Maple Bear International Kindergarten — 100% English Canadian Education',
    description: 'Premium Canadian international kindergarten with 100% English instruction for children aged 12 months to 5 years at Sunshine City, Hanoi.',
    url: 'https://www.sunshinemaplebear.edu.vn',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/logo.png', width: 512, height: 512, alt: 'Sunshine Maple Bear' }],
  },
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
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#C8102E" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="canonical" href="https://www.sunshinemaplebear.edu.vn" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        <link rel="dns-prefetch" href="https://pvdos3hwo8pzdj8j8j8j.supabase.co" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <GoogleTranslate />
        {children}
        <ChatWidget />
        <ExitIntentPopup />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
