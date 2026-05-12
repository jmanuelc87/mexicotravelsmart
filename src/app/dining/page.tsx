'use client';

import { useTranslation } from '../../../lib/i18n/useTranslation';

export default function DiningPage() {
  const { t } = useTranslation();

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
