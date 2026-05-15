'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const SUPPORTED_LOCALES = ['en', 'es', 'pt', 'fr', 'de', 'it', 'zh', 'ko', 'ar', 'ja'] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

export async function setLocale(locale: Locale) {
  if (!(SUPPORTED_LOCALES as ReadonlyArray<string>).includes(locale)) return;
  const cookieStore = await cookies();
  cookieStore.set('locale', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
  revalidatePath('/', 'layout');
}
