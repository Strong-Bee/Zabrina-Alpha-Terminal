import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://zabrina-alpha.terminal'),
  title: {
    default: 'ZABRINA ALPHA TERMINAL — Professional Trading Intelligence',
    template: '%s · ZABRINA ALPHA',
  },
  description:
    'Terminal trading profesional dengan data ekonomi global real-time, kalender event, dan analitik pasar terintegrasi.',
  keywords: [
    'trading terminal',
    'economic calendar',
    'kalender ekonomi',
    'GDP global',
    'forex',
    'market intelligence',
    'Zabrina Alpha',
  ],
  authors: [{ name: 'ZABRINA ALPHA' }],
  creator: 'ZABRINA ALPHA TERMINAL',
  applicationName: 'ZABRINA ALPHA TERMINAL',
  category: 'finance',
  openGraph: {
    title: 'ZABRINA ALPHA TERMINAL',
    description:
      'Terminal trading profesional dengan data ekonomi global real-time.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'ZABRINA ALPHA TERMINAL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZABRINA ALPHA TERMINAL',
    description:
      'Terminal trading profesional dengan data ekonomi global real-time.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#04060a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/flag-icons/7.5.0/css/flag-icons.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}