"use client";

import { useTranslation } from "../../lib/i18n/useTranslation";
import { SUPPORTED_LOCALES } from "../../lib/i18n/provider";
import type { Locale } from "../../lib/i18n/provider";

const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  pt: "Português",
  it: "Italiano",
  de: "Deutsch",
  ja: "日本語",
  zh: "中文",
  ko: "한국어",
  ar: "العربية",
};

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useTranslation();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setLocale(event.target.value as Locale);
  }

  return (
    <div>
      <label htmlFor="language-switcher" className="sr-only">
        {t("language.select")}
      </label>
      <select
        id="language-switcher"
        value={locale}
        onChange={handleChange}
        aria-label={t("language.select")}
      >
        {SUPPORTED_LOCALES.map((loc) => (
          <option key={loc} value={loc}>
            {LOCALE_LABELS[loc]}
          </option>
        ))}
      </select>
    </div>
  );
}
