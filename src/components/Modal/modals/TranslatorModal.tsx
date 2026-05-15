'use client';

import { useModal } from '../ModalContext';
import styles from './TranslatorModal.module.css';

const SERVICES = [
  {
    name: 'Google Translate',
    desc: 'Most popular, 130+ languages',
    url: 'https://translate.google.com',
    icon: '🌐',
  },
  {
    name: 'DeepL',
    desc: 'High-quality translations',
    url: 'https://www.deepl.com/translator',
    icon: '🔵',
  },
  {
    name: 'Microsoft Translator',
    desc: 'Microsoft AI translation',
    url: 'https://www.bing.com/translator',
    icon: '🪟',
  },
];

export function TranslatorModal() {
  const { closeModal } = useModal();

  return (
    <div className={styles['modal']}>
      <div className={styles['header']}>
        <h3 className={styles['title']}>🌐 Translators</h3>
        <button className={styles['close']} onClick={closeModal} aria-label="Close">
          &times;
        </button>
      </div>
      <div className={styles['grid']}>
        {SERVICES.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles['link']}
          >
            <span className={styles['icon']}>{s.icon}</span>
            <div>
              <strong>{s.name}</strong>
              <br />
              <small>{s.desc}</small>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
