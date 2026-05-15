import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

const SUPPORTED_LOCALES = ['en', 'es', 'pt', 'fr', 'de', 'it', 'zh', 'ko', 'ar', 'ja'] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];
const DEFAULT_LOCALE: Locale = 'en';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const raw = cookieStore.get('locale')?.value as Locale | undefined;
  const locale: Locale =
    raw && (SUPPORTED_LOCALES as ReadonlyArray<string>).includes(raw) ? raw : DEFAULT_LOCALE;

  return {
    locale,
    messages: (await import(`../../lib/i18n/locales/${locale}.json`)).default,
  };
});
