'use client';

// TEMPLATE — copy to src/components/Modal/modals/MyNewModal.tsx and rename.
// Steps to wire up:
//   1. Add 'my-new-modal' to the ModalType union in ModalContext.tsx
//   2. Add the render case to ModalPortal.tsx
//   3. Call openModal('my-new-modal') from any client component

import { useModal } from '../ModalContext';
import styles from './_TemplateModal.module.css';

export function TemplateModal() {
  const { closeModal } = useModal();

  return (
    <div className={styles['modal']}>
      <div className={styles['header']}>
        <h3 className={styles['title']}>Modal Title</h3>
        <button className={styles['close']} onClick={closeModal} aria-label="Close">
          &times;
        </button>
      </div>
      <div className={styles['body']}>{/* Modal content here */}</div>
    </div>
  );
}
