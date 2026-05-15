"use client";

import { useTranslations } from 'next-intl';

export default function TransportPage() {
  const t = useTranslations();

  return (
    <main>
      <header>
        <h1>{t("transport.title")}</h1>
      </header>
      <section>
        <p>{t("transport.subtitle")}</p>
        {/* Transport content will be added here */}
      </section>
    </main>
  );
}
