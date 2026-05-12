'use client';

import { useI18n } from './provider';
import type { Locale } from './provider';

export interface UseTranslationResult {
  t: (key: string, fallback?: string) => string;
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

/**
 * Hook that returns `{ t, locale, setLocale }` from the I18n context.
 * Must be used inside a component wrapped by <I18nProvider>.
 */
export function useTranslation(): UseTranslationResult {
  const { t, locale, setLocale } = useI18n();
  return { t, locale, setLocale };
}
