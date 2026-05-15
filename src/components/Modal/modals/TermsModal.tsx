'use client';

import dynamic from 'next/dynamic';
import { useModal } from '../ModalContext';
import styles from './LegalModal.module.css';

const contentMap = {
  en: dynamic(() => import('../../../content/tc/en'), { loading: () => <p>Loading…</p> }),
  es: dynamic(() => import('../../../content/tc/es'), { loading: () => <p>Loading…</p> }),
  pt: dynamic(() => import('../../../content/tc/pt'), { loading: () => <p>Loading…</p> }),
  fr: dynamic(() => import('../../../content/tc/fr'), { loading: () => <p>Loading…</p> }),
  de: dynamic(() => import('../../../content/tc/de'), { loading: () => <p>Loading…</p> }),
  it: dynamic(() => import('../../../content/tc/it'), { loading: () => <p>Loading…</p> }),
  zh: dynamic(() => import('../../../content/tc/zh'), { loading: () => <p>Loading…</p> }),
  ko: dynamic(() => import('../../../content/tc/ko'), { loading: () => <p>Loading…</p> }),
  ar: dynamic(() => import('../../../content/tc/ar'), { loading: () => <p>Loading…</p> }),
  ja: dynamic(() => import('../../../content/tc/ja'), { loading: () => <p>Loading…</p> }),
} as const;

type SupportedLocale = keyof typeof contentMap;

function isSupportedLocale(l: string): l is SupportedLocale {
  return l in contentMap;
}

interface TermsModalProps {
  locale: string;
}

export function TermsModal({ locale }: TermsModalProps) {
  const { closeModal } = useModal();
  const safe = isSupportedLocale(locale) ? locale : 'en';
  const Content = contentMap[safe];

  return (
    <div className={styles['modal']}>
      <div className={styles['header']}>
        <span className={styles['title']}>Terms and Conditions of Use</span>
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
