  
import { Metadata } from 'next'
import { Inter, Red_Hat_Display } from 'next/font/google'
import '../css/style.css'
import Script from 'next/script'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import ClientLayout from './client-layout';
import { getTranslations } from 'next-intl/server';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const redhat = Red_Hat_Display({
  subsets: ['latin'],
  variable: '--font-red-hat-display',
  display: 'swap'
})
export async function generateMetadata({params:{locale}}: {params:{locale:string}}): Promise<Metadata> {
  const t = await getTranslations('index.meta')
  const url = process.env.NEXT_PUBLIC_URL
  return {
    title: 'yes or no Wheel',
    description: 'yes or no Wheel',
      icons: {
      icon: '/favicon.ico',
    },
    metadataBase: new URL(url??""),
      alternates: {
      canonical: url
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: url,
      title: t('title'),
      description: t('description'),
      siteName: t('openGraph'),
    },
    twitter: {
      card: 'summary_large_image',
      site: url,
      title: t('title'),
      description: t('description'),
    }
  }
}



export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode,
  params: { locale: string }
}) {
  const messages = await getMessages();
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZST2KZR440"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZST2KZR440');
          `}
        </Script>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3394687558379500"
          crossOrigin="anonymous"></Script>
        <meta name="google-adsense-account" content="ca-pub-3394687558379500"></meta>
      </head>
      <body className={`${inter.variable} ${redhat.variable} font-inter antialiased bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 tracking-tight`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}