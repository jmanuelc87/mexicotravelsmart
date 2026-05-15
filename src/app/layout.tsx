import type { Metadata } from 'next';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { AppFrame } from '../components/AppFrame/AppFrame';
import { ModalProvider } from '../components/Modal/ModalContext';
import { ModalPortal } from '../components/Modal/ModalPortal';
import { ExternalLinkInterceptor } from '../components/Modal/ExternalLinkInterceptor';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mexico Travel Smart',
  description: 'Your guide for FIFA World Cup 2026 in Mexico',
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
