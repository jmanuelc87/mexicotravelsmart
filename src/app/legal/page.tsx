'use client';

import { useTranslation } from '../../../lib/i18n/useTranslation';

export default function LegalPage() {
  const { t } = useTranslation();

  return (
    <main>
      <header>
        <h1>{t('legal.title')}</h1>
      </header>
      <section>
        <p>{t('legal.subtitle')}</p>
        {/* Legal & insurance content will be added here */}
      </section>
    </main>
  );
}
