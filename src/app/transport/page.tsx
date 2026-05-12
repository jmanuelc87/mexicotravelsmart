"use client";

import { useTranslation } from "../../../lib/i18n/useTranslation";

export default function TransportPage() {
  const { t } = useTranslation();

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
