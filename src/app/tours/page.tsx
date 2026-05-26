'use client';

import { useTranslations } from 'next-intl';
import styles from './page.module.css';

const operators = [
  { key: 'nuba', name: 'NUBA', href: 'https://www.nuba.net' },
  {
    key: 'corte',
    name: 'El Corte Inglés Viajes',
    href: 'https://www.viajeselcorteingles.es',
  },
  { key: 'civitatis', name: 'Civitatis', href: 'https://www.civitatis.com' },
  { key: 'viator', name: 'Viator (Tripadvisor)', href: 'https://www.viator.com' },
  { key: 'gyg', name: 'GetYourGuide', href: 'https://www.getyourguide.com' },
  { key: 'bestday', name: 'Best Day', href: 'https://www.bestday.com.mx' },
];

export default function ToursPage() {
  const t = useTranslations('tours');

  return (
    <main>
      <header>
        <h1 className={styles['page-title']}>{t('title')}</h1>
      </header>
      <section className={styles['container']}>
        <p className={styles['subtitle']}>{t('subtitle')}</p>

        <div className={styles['section']}>
          <h3 className={styles['section-heading']}>{t('operators_heading')}</h3>
          <div className={styles['operators-grid']}>
            {operators.map((op) => (
              <div key={op.key} className={styles['operator-card']}>
                <h4 className={styles['operator-name']}>{op.name}</h4>
                <p className={styles['operator-desc']}>{t(`${op.key}_desc`)}</p>
                <a
                  href={op.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['operator-link']}
                >
                  🌐 {op.href.replace('https://', '')}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className={styles['section']}>
          <h3 className={styles['section-heading']}>{t('official_heading')}</h3>
          <div className={styles['operator-card']}>
            <h4 className={styles['operator-name']}>SECTUR - Operadores Certificados</h4>
            <p className={styles['operator-desc']}>{t('sectur_desc')}</p>
            <a
              href="https://www.gob.mx/sectur"
              target="_blank"
              rel="noopener noreferrer"
              className={styles['operator-link']}
            >
              🌐 gob.mx/sectur
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
