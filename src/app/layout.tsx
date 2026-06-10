import type { Metadata, Viewport } from 'next';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { AppFrame } from '../components/AppFrame/AppFrame';
import { ModalProvider } from '../components/Modal/ModalContext';
import { ModalPortal } from '../components/Modal/ModalPortal';
import { ExternalLinkInterceptor } from '../components/Modal/ExternalLinkInterceptor';
import { Analytics } from "@vercel/analytics/next"
import './globals.css';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';

export const metadata: Metadata = {
  title: {
    default: 'Mexico Travel Smart',
    template: '%s | Mexico Travel Smart',
  },
  description: 'Your guide for FIFA World Cup 2026 in Mexico',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [{ url: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'Mexico Travel Smart',
    description: 'Your guide for FIFA World Cup 2026 in Mexico',
    siteName: 'Mexico Travel Smart',
    type: 'website',
    images: [
      {
        url: baseUrl ? `${baseUrl}/og-image.jpg` : '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mexico Travel Smart',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mexico Travel Smart',
    description: 'Your guide for FIFA World Cup 2026 in Mexico',
    images: [baseUrl ? `${baseUrl}/og-image.jpg` : '/og-image.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#e91e63',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <Analytics />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ModalProvider>
            <AppFrame>{children}</AppFrame>
            <ModalPortal />
            <ExternalLinkInterceptor />
          </ModalProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
