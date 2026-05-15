"use client";

import { useTranslations } from 'next-intl';

export default function StatesPage() {
  const t = useTranslations();

  return (
    <main>
      <header>
        <h1>{t("states.title")}</h1>
      </header>
      <section>
        <p>{t("states.subtitle")}</p>
        {/* Mexican states content will be added here */}
      </section>
    </main>
  );
}
