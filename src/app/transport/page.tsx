import { useTranslations } from 'next-intl';
import styles from './page.module.css';

const services = [
  { name: 'Metro CDMX', href: 'https://www.metro.cdmx.gob.mx', fare: '$5 MXN' },
  { name: 'Metrobús', href: 'https://www.metrobus.cdmx.gob.mx', fare: '$6 MXN' },
  { name: 'Uber', href: 'https://www.uber.com/mx/es/', fare: null },
  { name: 'DiDi', href: 'https://web.didiglobal.com/mx/', fare: null },
  { name: 'ADO', href: 'https://www.ado.com.mx', fare: null },
];

export default function TransportPage() {
  const t = useTranslations('transport');

  return (
    <main>
      <header>
        <h1 className={styles['page-title']}>{t('title')}</h1>
      </header>
      <section className={styles['container']}>
        <p className={styles['subtitle']}>{t('subtitle')}</p>

        <div className={styles['link-grid']}>
          {services.map((service) => (
            <div key={service.name} className={styles['link-card']}>
              <a href={service.href} target="_blank" rel="noopener noreferrer">
                {service.name}
              </a>
              {service.fare && <p className={styles['fare']}>Tarifa: {service.fare}</p>}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
