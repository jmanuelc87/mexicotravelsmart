import { useTranslations } from 'next-intl';
import styles from './page.module.css';

const guides = [
  { name: 'Michelin Guide MX', href: 'https://guide.michelin.com/mx/es' },
  { name: "World's 50 Best", href: 'https://www.theworlds50best.com' },
  { name: 'TasteAtlas', href: 'https://www.tasteatlas.com/mexico' },
  { name: 'Chilango', href: 'https://www.chilango.com' },
  { name: 'TimeOut México', href: 'https://www.timeout.com/mexico-city' },
];

const reservations = [
  { name: 'OpenTable MX', href: 'https://www.opentable.com.mx' },
  { name: 'TheFork MX', href: 'https://www.thefork.com.mx' },
];

const delivery = [
  { name: 'Uber Eats MX', href: 'https://www.ubereats.com/mx' },
  { name: 'Rappi MX', href: 'https://www.rappi.com.mx' },
  { name: 'DiDi Food MX', href: 'https://web.didiglobal.com/mx/food/' },
];

export default function DiningPage() {
  const t = useTranslations('dining');

  return (
    <main>
      <header>
        <h1>{t('title')}</h1>
      </header>
      <section>
        <p>{t('subtitle')}</p>

        <div className={styles['section']}>
          <h3 className={styles['section-heading']}>{t('guides_section')}</h3>
          <div className={styles['link-grid']}>
            {guides.map((link) => (
              <div key={link.name} className={styles['link-card']}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.name}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className={styles['section']}>
          <h3 className={styles['section-heading']}>{t('reservations_section')}</h3>
          <div className={styles['link-grid']}>
            {reservations.map((link) => (
              <div key={link.name} className={styles['link-card']}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.name}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className={styles['section']}>
          <h3 className={styles['section-heading']}>{t('delivery_section')}</h3>
          <div className={styles['link-grid']}>
            {delivery.map((link) => (
              <div key={link.name} className={styles['link-card']}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
