'use client';

import { useEffect, useTransition } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { setLocale } from '../../app/actions/setLocale';
import styles from './LanguageSwitcher.module.css';

const LOCALES = ['en', 'es', 'pt', 'fr', 'de', 'it', 'zh', 'ko', 'ar', 'ja'] as const;
type Locale = (typeof LOCALES)[number];

const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  zh: '中文',
  ko: '한국어',
  ar: 'العربية',
  ja: '日本語',
};

const STORAGE_KEY = 'selectedLang';

export default function LanguageSwitcher() {
  const t = useTranslations('language');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored && stored !== locale && (LOCALES as ReadonlyArray<string>).includes(stored)) {
      startTransition(async () => {
        await setLocale(stored);
        router.refresh();
      });
    }
    // Only run on mount to restore a stored preference when the cookie has expired
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as Locale;
    localStorage.setItem(STORAGE_KEY, next);
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  }

  return (
    <div className={styles['switcher']}>
      <label htmlFor="lang-select" className={styles['sr-only']}>
        {t('select')}
      </label>
      <select
        id="lang-select"
        className={styles['select']}
        value={locale}
        onChange={handleChange}
        disabled={isPending}
        aria-label={t('select')}
      >
        {LOCALES.map((loc) => (
          <option key={loc} value={loc}>
            {LOCALE_LABELS[loc]}
          </option>
        ))}
      </select>
    </div>
  );
}
