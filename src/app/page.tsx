"use client";

import Link from "next/link";
import { useTranslation } from "../../lib/i18n/useTranslation";

export default function HomePage() {
  const { t } = useTranslation();

  const sections = [
    { href: "/embassy", label: t("nav.embassy") },
    { href: "/emergency", label: t("nav.emergency") },
    { href: "/legal", label: t("nav.legal") },
    { href: "/dining", label: t("nav.dining") },
    { href: "/transport", label: t("nav.transport") },
    { href: "/lodging", label: t("nav.lodging") },
    { href: "/tours", label: t("nav.tours") },
    { href: "/activities", label: t("nav.activities") },
    { href: "/media", label: t("nav.media") },
    { href: "/lost-docs", label: t("nav.lost_docs") },
    { href: "/states", label: t("nav.states") },
  ];

  return (
    <main>
      <header>
        <h1>{t("home.title")}</h1>
      </header>
      <section>
        <h2>{t("home.welcome")}</h2>
        <p>{t("home.subtitle")}</p>
        <nav aria-label="Main navigation">
          <ul>
            {sections.map(({ href, label }) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </main>
  );
}
