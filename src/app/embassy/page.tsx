'use client';

import { useTranslations } from 'next-intl';

export default function EmbassyPage() {
  const t = useTranslations();

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
