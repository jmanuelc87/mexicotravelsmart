'use client';

import { useTranslation } from '../../../lib/i18n/useTranslation';

export default function EmergencyPage() {
  const { t } = useTranslation();

  return (
    <main>
      <header>
        <h1>{t('emergency.title')}</h1>
      </header>
      <section>
        <p>{t('emergency.subtitle')}</p>
        {/* Emergency numbers content will be added here */}
      </section>
    </main>
  );
}
