"use client";

import { useTranslation } from "../../../lib/i18n/useTranslation";

export default function LostDocsPage() {
  const { t } = useTranslation();

  return (
    <main>
      <header>
        <h1>{t("lost_docs.title")}</h1>
      </header>
      <section>
        <p>{t("lost_docs.subtitle")}</p>
        {/* Lost documents content will be added here */}
      </section>
    </main>
  );
}
