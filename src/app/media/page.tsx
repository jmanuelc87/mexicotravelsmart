"use client";

import { useTranslation } from "../../../lib/i18n/useTranslation";

export default function MediaPage() {
  const { t } = useTranslation();

  return (
    <main>
      <header>
        <h1>{t("media.title")}</h1>
      </header>
      <section>
        <p>{t("media.subtitle")}</p>
        {/* Media content will be added here */}
      </section>
    </main>
  );
}
