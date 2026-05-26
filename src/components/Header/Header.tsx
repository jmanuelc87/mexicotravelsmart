'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useModal } from '../Modal/ModalContext';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import styles from './Header.module.css';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('nav');
  const { openModal } = useModal();
  const isHome = pathname === '/';

  return (
    <header className={styles['header']}>
      {/* Pink banner with site name */}
      <div className={styles['banner']}>
        {!isHome && (
          <div className={styles['nav-buttons']}>
            <button
              className={styles['btn-back']}
              onClick={() => router.back()}
              aria-label="Go back"
            >
              &#8592;
            </button>
            <button
              className={styles['btn-home']}
              onClick={() => router.push('/')}
              aria-label="Go home"
            >
              &#8962;
            </button>
          </div>
        )}
        <span className={styles['site-name']}>mexicotravelsmart.mx</span>
        <div className={styles['lang-slot']}>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Action bar — Frases & Traductor */}
      <div className={styles['action-bar']}>
        <button
          className={styles['btn-frases']}
          onClick={() => openModal('phrases')}
          aria-label={t('phrases')}
        >
          💬 {t('phrases')}
        </button>
        <button
          className={styles['btn-traductor']}
          onClick={() => openModal('translator')}
          aria-label={t('translator')}
        >
          🌐 {t('translator')}
        </button>
      </div>
    </header>
  );
}
