'use client';

import { useTranslation } from '../../../lib/i18n/useTranslation';

export default function ActivitiesPage() {
  const { t } = useTranslation();

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
