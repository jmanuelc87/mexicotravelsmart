import { useTranslations } from 'next-intl';
import styles from './page.module.css';

const platforms = [
  { key: 'booking', href: 'https://www.booking.com' },
  { key: 'expedia', href: 'https://www.expedia.com' },
  { key: 'hotels', href: 'https://www.hotels.com' },
  { key: 'tripadvisor', href: 'https://www.tripadvisor.com' },
  { key: 'agoda', href: 'https://www.agoda.com' },
  { key: 'airbnb', href: 'https://www.airbnb.com' },
  { key: 'vrbo', href: 'https://www.vrbo.com' },
  { key: 'homestay', href: 'https://www.homestay.com' },
];

const chains = [
  { key: 'marriott', href: 'https://www.marriott.com' },
  { key: 'hilton', href: 'https://www.hilton.com' },
  { key: 'hyatt', href: 'https://www.hyatt.com' },
  { key: 'ihg', href: 'https://www.ihg.com' },
  { key: 'posadas', href: 'https://www.posadas.com' },
  { key: 'barcelo', href: 'https://www.barcelo.com' },
];

const editorial = [
  { key: 'forbes', href: 'https://www.forbestravelguide.com' },
  { key: 'condenast', href: 'https://www.cntraveler.com' },
];

export default function LodgingPage() {
  const t = useTranslations('lodging');

  return (
    <main>
      <header>
        <h1 className={styles['page-title']}>{t('title')}</h1>
      </header>
      <section className={styles['container']}>
        <p className={styles['subtitle']}>{t('subtitle')}</p>

        <div className={styles['section']}>
          <h3 className={styles['section-heading']}>{t('platforms_section')}</h3>
          <div className={styles['link-grid']}>
            {platforms.map((item) => (
              <div key={item.key} className={styles['link-card']}>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {t(`platforms.${item.key}`)}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className={styles['section']}>
          <h3 className={styles['section-heading']}>{t('chains_section')}</h3>
          <div className={styles['link-grid']}>
            {chains.map((item) => (
              <div key={item.key} className={styles['link-card']}>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {t(`chains.${item.key}`)}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className={styles['section']}>
          <h3 className={styles['section-heading']}>{t('editorial_section')}</h3>
          <div className={styles['link-grid']}>
            {editorial.map((item) => (
              <div key={item.key} className={styles['link-card']}>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {t(`editorial.${item.key}`)}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
