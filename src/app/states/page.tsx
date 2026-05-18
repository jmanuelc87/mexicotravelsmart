'use client';

import { useTranslations } from 'next-intl';
import { states } from '../../../lib/content/states';
import styles from './page.module.css';

export default function StatesPage() {
  const t = useTranslations('states');

  return (
    <main>
      <header>
        <h1>{t('title')}</h1>
      </header>
      <section>
        <div className={styles['states-grid']}>
          {states.map((state) => (
            <div key={state.name} className={styles['state-card']}>
              <h3 className={styles['state-heading']}>📍 {state.name}</h3>
              <ul className={styles['destination-list']}>
                {state.destinations.map((dest) => (
                  <li key={dest.url}>
                    <a href={dest.url} target="_blank" rel="noopener noreferrer">
                      {dest.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
