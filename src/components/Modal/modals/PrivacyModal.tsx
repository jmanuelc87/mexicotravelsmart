'use client';

import dynamic from 'next/dynamic';
import { useModal } from '../ModalContext';
import styles from './LegalModal.module.css';

const contentMap = {
  en: dynamic(() => import('../../../content/pp/en'), { loading: () => <p>Loading…</p> }),
  es: dynamic(() => import('../../../content/pp/es'), { loading: () => <p>Loading…</p> }),
  pt: dynamic(() => import('../../../content/pp/pt'), { loading: () => <p>Loading…</p> }),
  fr: dynamic(() => import('../../../content/pp/fr'), { loading: () => <p>Loading…</p> }),
  de: dynamic(() => import('../../../content/pp/de'), { loading: () => <p>Loading…</p> }),
  it: dynamic(() => import('../../../content/pp/it'), { loading: () => <p>Loading…</p> }),
  zh: dynamic(() => import('../../../content/pp/zh'), { loading: () => <p>Loading…</p> }),
  ko: dynamic(() => import('../../../content/pp/ko'), { loading: () => <p>Loading…</p> }),
  ar: dynamic(() => import('../../../content/pp/ar'), { loading: () => <p>Loading…</p> }),
  ja: dynamic(() => import('../../../content/pp/ja'), { loading: () => <p>Loading…</p> }),
} as const;

type SupportedLocale = keyof typeof contentMap;

function isSupportedLocale(l: string): l is SupportedLocale {
  return l in contentMap;
}

interface PrivacyModalProps {
  locale: string;
}

export function PrivacyModal({ locale }: PrivacyModalProps) {
  const { closeModal } = useModal();
  const safe = isSupportedLocale(locale) ? locale : 'en';
  const Content = contentMap[safe];

  return (
    <div className={styles['modal']}>
      <div className={styles['header']}>
        <span className={styles['title']}>Privacy Policy</span>
        <button className={styles['close']} onClick={closeModal} aria-label="Close">
          &times;
        </button>
      </div>
      <div className={styles['body']}>
        <Content />
      </div>
    </div>
  );
}
