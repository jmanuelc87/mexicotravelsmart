'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styles from './page.module.css';

export default function LostDocsPage() {
  const t = useTranslations('lost_docs');

  return (
    <main>
      <header>
        <h1>{t('title')}</h1>
      </header>
      <section>
        <p>{t('subtitle')}</p>

        {/* Lost Phone Section */}
        <h3 className={styles['section-heading']}>{t('lost_phone_header')}</h3>

        <div className={styles['card']}>
          <h4>{t('lost_phone_step1')}</h4>
          <ul className={styles['step-list']}>
            <li>{t('lost_phone_step1_1')}</li>
            <li>{t('lost_phone_step1_2')}</li>
            <li>{t('lost_phone_step1_3')}</li>
          </ul>
        </div>

        <div className={styles['card']}>
          <h4>{t('lost_phone_step2')}</h4>
          <ul className={styles['step-list']}>
            <li>{t('lost_phone_step2_1')}</li>
            <li>{t('lost_phone_step2_2')}</li>
            <li>{t('lost_phone_step2_3')}</li>
          </ul>
        </div>

        <div className={styles['card']}>
          <h4>{t('lost_phone_step3')}</h4>
          <ul className={styles['step-list']}>
            <li>
              Telcel: <a href="tel:*264">*264</a>
            </li>
            <li>
              AT&T: <a href="tel:*111">*111</a>
            </li>
            <li>
              Movistar: <a href="tel:*611">*611</a>
            </li>
          </ul>
        </div>

        {/* Lost Passport Section */}
        <h3 className={styles['section-heading']}>{t('lost_passport_header')}</h3>

        <div className={styles['emergency-card']}>
          <h4>{t('lost_passport_first')}</h4>
          <p>
            <strong>{t('lost_passport_contact')}</strong>
          </p>
          <div className={styles['nav-buttons']}>
            <Link href="/embassy" className={styles['nav-btn']}>
              🏛 {t('lost_passport_btn')}
            </Link>
          </div>
        </div>

        <div className={styles['card']}>
          <h4>{t('lost_passport_step1')}</h4>
          <p>{t('lost_passport_step1_desc')}</p>
          <p>
            {t('lost_passport_police')} <a href="tel:*0311">*0311</a>
          </p>
        </div>

        <div className={styles['card']}>
          <h4>{t('lost_passport_step2')}</h4>
          <ul className={styles['step-list']}>
            <li>{t('lost_passport_doc1')}</li>
            <li>{t('lost_passport_doc2')}</li>
            <li>{t('lost_passport_doc3')}</li>
            <li>{t('lost_passport_doc4')}</li>
          </ul>
        </div>

        <div className={styles['card']}>
          <h4>{t('lost_passport_step3')}</h4>
          <p>{t('lost_passport_step3_desc')}</p>
          <div className={styles['nav-buttons']}>
            <Link href="/embassy" className={styles['nav-btn']}>
              🏛 {t('lost_passport_directory')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
