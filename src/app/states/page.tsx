"use client";

import { useTranslation } from "../../../lib/i18n/useTranslation";

export default function StatesPage() {
  const { t } = useTranslation();

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
