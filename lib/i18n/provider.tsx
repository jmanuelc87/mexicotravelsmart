'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

// Supported locales
export const SUPPORTED_LOCALES = [
  'en',
  'es',
  'fr',
  'pt',
  'it',
  'de',
  'ja',
  'zh',
  'ko',
  'ar',
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

// Flat dictionary type — keys are dot-separated paths like "embassy.title"
type Dictionary = Record<string, string>;

// Eagerly import the default (English) dictionary
import enDict from './locales/en.json';

// Flatten a nested JSON object into dot-separated keys
function flatten(obj: Record<string, unknown>, prefix = ''): Dictionary {
  return Object.entries(obj).reduce<Dictionary>((acc, [key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null) {
      Object.assign(acc, flatten(value as Record<string, unknown>, fullKey));
    } else {
      acc[fullKey] = String(value);
    }
    return acc;
  }, {});
}

const flatEnDict = flatten(enDict as Record<string, unknown>);

// Detect locale from cookie → navigator.language → "en"
function detectLocale(): Locale {
  if (typeof document === 'undefined') return DEFAULT_LOCALE;

  // 1. Check cookie
  const cookieMatch = document.cookie.split('; ').find((row) => row.startsWith('locale='));
  if (cookieMatch) {
    const cookieLocale = cookieMatch.split('=')[1] as Locale;
    if (SUPPORTED_LOCALES.includes(cookieLocale)) return cookieLocale;
  }

  // 2. Check navigator.language
  if (typeof navigator !== 'undefined' && navigator.language) {
    const browserLang = navigator.language.split('-')[0] as Locale;
    if (SUPPORTED_LOCALES.includes(browserLang)) return browserLang;
  }

  // 3. Fallback to English
  return DEFAULT_LOCALE;
}

// Lazy-load a non-default locale dictionary
async function loadDictionary(locale: Locale): Promise<Dictionary> {
  if (locale === DEFAULT_LOCALE) return flatEnDict;

  try {
    const localeModule = await import(`./locales/${locale}.json`);
    return flatten(localeModule.default as Record<string, unknown>);
  } catch {
    console.warn(`Failed to load locale "${locale}", falling back to English.`);
    return flatEnDict;
  }
}

// Context shape
interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [dict, setDict] = useState<Dictionary>(flatEnDict);

  // Detect locale on mount (client-side only)
  useEffect(() => {
    const detected = detectLocale();
    if (detected !== DEFAULT_LOCALE) {
      loadDictionary(detected).then((d) => {
        setDict(d);
        setLocaleState(detected);
      });
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    // Write cookie (1 year expiry)
    document.cookie = `locale=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;

    if (newLocale === DEFAULT_LOCALE) {
      setDict(flatEnDict);
      setLocaleState(newLocale);
    } else {
      loadDictionary(newLocale).then((d) => {
        setDict(d);
        setLocaleState(newLocale);
      });
    }
  }, []);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      return dict[key] ?? fallback ?? key;
    },
    [dict]
  );

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  return useContext(I18nContext);
}
