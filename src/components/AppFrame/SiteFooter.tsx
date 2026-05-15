'use client';

import { useModal } from '../Modal/ModalContext';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  const { openModal } = useModal();

  return (
    <footer className={styles['footer']}>
      <p className={styles['disclaimer']}>
        MÉXICO TRAVELSMART.MX ASSISTANT is an informational directory containing links to services
        operated by independent third parties. The operator of this platform does not provide or
        guarantee such services. By accessing external links, the user leaves this platform and
        becomes subject to the terms and policies of the corresponding third party.
      </p>
      <div className={styles['links']}>
        <button className={styles['link']} onClick={() => openModal('terms')}>
          Terms &amp; Conditions
        </button>
        <button className={styles['link']} onClick={() => openModal('privacy')}>
          Privacy Policy
        </button>
      </div>
    </footer>
  );
}
