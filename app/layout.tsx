import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL('https://zeeroai.me'),
  title: {
    default: 'ZEERO AI - Zenith of Enhanced Education with Realtime Optimization',
    template: '%s | ZEERO AI',
  },
  description: 'Revolutionary AI-powered EdTech platform that generates video lectures from text prompts. Transform education with personalized AI tutoring, virtual meeting rooms, and intelligent learning experiences. Join 10,000+ students learning with AI.',
  keywords: ['AI education', 'video lectures', 'EdTech', 'online learning', 'AI tutor', 'personalized learning', 'AI video generation', 'educational technology', 'virtual classroom', 'adaptive learning', 'machine learning education', 'ZEERO AI', 'smart tutoring system', 'automated lectures'],
  authors: [
    { name: 'Wasif Sohail', url: 'https://www.linkedin.com/in/wasif-sohail-1858463a1' },
    { name: 'Shahzeb Mustafa' },
    { name: 'Iqra Khan' },
  ],
  creator: 'ZEERO AI',
  publisher: 'ZEERO AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/images/zeero-logo.png',
    shortcut: '/images/zeero-logo.png',
    apple: '/images/zeero-logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zeeroai.me',
    siteName: 'ZEERO AI',
    title: 'ZEERO AI - Transform Learning with AI-Powered Education',
    description: 'Generate comprehensive video lectures from text prompts. Personalized AI tutoring, virtual meeting rooms, and intelligent learning experiences for everyone.',
    images: [
      {
        url: '/images/zeero-logo.png',
        width: 1200,
        height: 630,
        alt: 'ZEERO AI - AI-Powered Educational Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZEERO AI - Transform Learning with AI',
    description: 'Revolutionary AI-powered EdTech platform generating video lectures from text. Join 10,000+ students.',
    images: ['/images/zeero-logo.png'],
    creator: '@zeeroai',
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
  verification: {
    google: 'google-site-verification-code',
  },
  alternates: {
    canonical: 'https://zeeroai.me',
  },
  category: 'education',
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: '#020617',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ZEERO AI',
  alternateName: 'Zenith of Enhanced Education with Realtime Optimization',
  url: 'https://zeeroai.me',
  logo: 'https://zeeroai.me/images/zeero-logo.png',
  description: 'AI-powered EdTech platform that generates video lectures from text prompts.',
  foundingDate: '2024',
  founders: [
    {
      '@type': 'Person',
      name: 'Wasif Sohail',
      jobTitle: 'Co-Founder & CEO',
    },
    {
      '@type': 'Person',
      name: 'Shahzeb Mustafa',
      jobTitle: 'Co-Founder & CTO',
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'founder@zeeroai.me',
    contactType: 'customer service',
  },
  sameAs: [
    'https://www.linkedin.com/company/zeeroai',
    'https://twitter.com/zeeroai',
    'https://github.com/WasifSohail5',
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ZEERO AI',
  url: 'https://zeeroai.me',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://zeeroai.me/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ZEERO AI',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '10000',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          suppressHydrationWarning
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
          suppressHydrationWarning
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
          suppressHydrationWarning
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
