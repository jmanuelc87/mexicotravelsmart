import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { I18nProvider } from '../../lib/i18n/provider';
import LanguageSwitcher from '../components/LanguageSwitcher';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Mexico Travel Smart',
  description: 'Your guide for FIFA World Cup 2026 in Mexico',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <I18nProvider>
          <header>
            <nav>
              <LanguageSwitcher />
            </nav>
          </header>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
