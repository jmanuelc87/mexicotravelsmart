'use client';

import { usePathname, useRouter } from 'next/navigation';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import styles from './Header.module.css';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';

  return (
    <header className={styles['header']}>
      <div className={styles['nav-buttons']}>
        {!isHome && (
          <>
            <button
              className={styles['btn-back']}
              onClick={() => router.back()}
              aria-label="Go back"
            >
              &#8592; Back
            </button>
            <button
              className={styles['btn-home']}
              onClick={() => router.push('/')}
              aria-label="Go home"
            >
              &#8962; Home
            </button>
          </>
        )}
      </div>
      <LanguageSwitcher />
    </header>
  );
}
