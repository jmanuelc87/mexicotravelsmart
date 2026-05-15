'use client';

import { useModal } from '../Modal/ModalContext';
import styles from './FloatingToolbar.module.css';

export function FloatingToolbar() {
  const { openModal } = useModal();

  return (
    <div className={styles['toolbar']}>
      <button className={styles['btn']} onClick={() => openModal('phrases')}>
        💬 Phrases
      </button>
      <button className={styles['btn']} onClick={() => openModal('translator')}>
        🌐 Translator
      </button>
    </div>
  );
}
