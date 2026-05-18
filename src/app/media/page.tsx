'use client';

import { useTranslations } from 'next-intl';

export default function MediaPage() {
  const t = useTranslations();

  return (
    <main>
      <header>
        <h1>{t('media.title')}</h1>
      </header>
      <section>
        <p>{t('media.subtitle')}</p>
        {/* Media content will be added here */}
      </section>
    </main>
  );
}
