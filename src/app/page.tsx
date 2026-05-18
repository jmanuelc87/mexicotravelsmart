'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styles from './page.module.css';

export default function HomePage() {
  const t = useTranslations();

  const sections = [
    { href: '/emergency', key: 'nav.emergency' },
    { href: '/legal', key: 'nav.legal' },
    { href: '/transport', key: 'nav.transport' },
    { href: '/embassy', key: 'nav.embassy' },
    { href: '/dining', key: 'nav.dining' },
    { href: '/lodging', key: 'nav.lodging' },
    { href: '/tours', key: 'nav.tours' },
    { href: '/activities', key: 'nav.activities' },
    { href: '/media', key: 'nav.media' },
    { href: '/lost-docs', key: 'nav.lost_docs' },
    { href: '/states', key: 'nav.states' },
  ];

  return (
    <main className={styles['page']}>
      <div className={styles['hero']}>
        <Image
          src="/images/hero.jpg"
          alt={t('home.title')}
          width={2000}
          height={1332}
          className={styles['hero-image']}
          priority
        />
        <h2 className={styles['hero-heading']}>{t('home.welcome')}</h2>
        <p className={styles['hero-subtitle']}>{t('home.subtitle')}</p>
      </div>
      <div className={styles['menu-grid']}>
        {sections.map(({ href, key }) => (
          <Link
            key={href}
            href={href}
            className={
              href === '/states'
                ? `${styles['menu-card']} ${styles['menu-card-full']}`
                : styles['menu-card']
            }
          >
            {t(key)}
          </Link>
        ))}
      </div>
    </main>
  );
}
