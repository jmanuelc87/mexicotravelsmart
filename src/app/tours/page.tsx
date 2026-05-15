"use client";

import { useTranslations } from 'next-intl';

export default function ToursPage() {
  const t = useTranslations();

  return (
    <main>
      <header>
        <h1>{t("tours.title")}</h1>
      </header>
      <section>
        <p>{t("tours.subtitle")}</p>
        {/* Tours content will be added here */}
      </section>
    </main>
  );
}
