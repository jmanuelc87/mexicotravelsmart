'use client';

// TEMPLATE — copy to src/app/<route>/page.tsx and rename.
// Replace every occurrence of "template" / "Template" with the route name.
// Add matching keys to all 10 locale files under lib/i18n/locales/.

import { useTranslations } from 'next-intl';

export default function TemplatePage() {
  const t = useTranslations();

  return (
    <main>
      <header>
        <h1>{t('template.title')}</h1>
      </header>
      <section>
        <p>{t('template.subtitle')}</p>
      </section>
    </main>
  );
}
