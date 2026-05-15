'use client';

import { useModal } from '../ModalContext';
import styles from './ExternalLinkModal.module.css';

interface ExternalLinkModalProps {
  url: string;
}

export function ExternalLinkModal({ url }: ExternalLinkModalProps) {
  const { closeModal } = useModal();

  function handleProceed() {
    window.open(url, '_blank', 'noopener,noreferrer');
    closeModal();
  }

  return (
    <div className={styles['modal']}>
      <div className={styles['header']}>⚠️ You are leaving MÉXICO TRAVELSMART.MX ASSISTANT</div>
      <div className={styles['body']}>
        <p>
          This link leads to a site operated by an independent third party. The services offered on
          that site are not operated or guaranteed by this platform.
        </p>
        <span className={styles['url']}>{url}</span>
      </div>
      <div className={styles['buttons']}>
        <button className={styles['cancel']} onClick={closeModal}>
          Cancel
        </button>
        <button className={styles['proceed']} onClick={handleProceed}>
          Continue to external site
        </button>
      </div>
    </div>
  );
}
