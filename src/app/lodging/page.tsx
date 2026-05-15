'use client';

import { useTranslations } from 'next-intl';

export default function LodgingPage() {
  const t = useTranslations();

  return (
    <main>
      <header>
        <h1>{t('lodging.title')}</h1>
      </header>
      <section>
        <p>{t('lodging.subtitle')}</p>
        {/* Lodging content will be added here */}
      </section>
    </main>
  );
}
