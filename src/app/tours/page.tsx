"use client";

import { useTranslation } from "../../../lib/i18n/useTranslation";

export default function ToursPage() {
  const { t } = useTranslation();

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
