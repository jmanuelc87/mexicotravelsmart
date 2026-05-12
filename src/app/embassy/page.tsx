'use client';

import { useTranslation } from '../../../lib/i18n/useTranslation';

export default function EmbassyPage() {
  const { t } = useTranslation();

  return (
    <main>
      <header>
        <h1>{t('embassy.title')}</h1>
      </header>
      <section>
        <p>{t('embassy.subtitle')}</p>
        {/* Embassy content will be added here */}
      </section>
    </main>
  );
}
