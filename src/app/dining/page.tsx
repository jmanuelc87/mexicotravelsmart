'use client';

import { useTranslations } from 'next-intl';

export default function DiningPage() {
  const t = useTranslations();

  return (
    <main>
      <header>
        <h1>{t('dining.title')}</h1>
      </header>
      <section>
        <p>{t('dining.subtitle')}</p>
        {/* Dining content will be added here */}
      </section>
    </main>
  );
}
