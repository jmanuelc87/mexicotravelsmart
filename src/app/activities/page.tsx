'use client';

import { useTranslations } from 'next-intl';

export default function ActivitiesPage() {
  const t = useTranslations();

  return (
    <main>
      <header>
        <h1>{t('activities.title')}</h1>
      </header>
      <section>
        <p>{t('activities.subtitle')}</p>
        {/* Activities content will be added here */}
      </section>
    </main>
  );
}
