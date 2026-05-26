'use client';

import { useTranslations } from 'next-intl';
import styles from './page.module.css';

export default function LegalPage() {
  const t = useTranslations('legal');

  return (
    <main>
      <header>
        <h1 className={styles['page-title']}>{t('title')}</h1>
      </header>
      <section className={styles['container']}>
        <p className={styles['subtitle']}>{t('subtitle')}</p>

        <div className={styles['section']}>
          <h3>{t('services')}</h3>
          <div className={styles['featured-card']}>
            <h4>LHO | Legal Foresight &amp; Global Affairs</h4>
            <p>{t('lho_desc')}</p>
            <p>
              📞{' '}
              <a href="https://wa.me/526635929477" target="_blank" rel="noopener noreferrer">
                +52 663 592 9477
              </a>
            </p>
            <p>
              🌐{' '}
              <a href="https://www.LHO.global" target="_blank" rel="noopener noreferrer">
                LHO.global
              </a>
            </p>
          </div>
        </div>

        <div className={styles['section']}>
          <h3>{t('insurance')}</h3>
          <div className={styles['card']}>
            <h4>AXA Assistance</h4>
            <p>
              🌐{' '}
              <a href="https://www.axa-assistance.com" target="_blank" rel="noopener noreferrer">
                axa-assistance.com
              </a>
            </p>
          </div>
          <div className={styles['card']}>
            <h4>Allianz Travel</h4>
            <p>
              🌐{' '}
              <a
                href="https://www.allianz-assistance.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                allianz-assistance.com
              </a>
            </p>
          </div>
          <div className={styles['card']}>
            <h4>Assist Card</h4>
            <p>
              🌐{' '}
              <a href="https://www.assistcard.com" target="_blank" rel="noopener noreferrer">
                assistcard.com
              </a>
            </p>
          </div>
          <div className={styles['card']}>
            <h4>Mapfre</h4>
            <p>
              🌐{' '}
              <a href="https://www.mapfre.com.mx" target="_blank" rel="noopener noreferrer">
                mapfre.com.mx
              </a>
            </p>
          </div>
          <div className={styles['card']}>
            <h4>GNP Seguros</h4>
            <p>
              🌐{' '}
              <a href="https://www.gnp.com.mx" target="_blank" rel="noopener noreferrer">
                gnp.com.mx
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
