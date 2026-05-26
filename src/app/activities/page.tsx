'use client';

import { useTranslations } from 'next-intl';
import styles from './page.module.css';

const officials = [
  { key: 'fifa', name: 'FIFA World Cup 2026', href: 'https://www.fifa.com/worldcup' },
  { key: 'f1', name: 'Formula 1 Mexico City Grand Prix', href: 'https://www.formula1.com' },
];

const stadiums = [
  {
    key: 'azteca',
    name: 'Estadio Azteca',
    location: 'CDMX',
    href: 'https://www.estadioazteca.com.mx',
  },
  {
    key: 'akron',
    name: 'Estadio Akron',
    location: 'Guadalajara',
    href: 'https://www.estadioakron.com',
  },
  { key: 'bbva', name: 'Estadio BBVA', location: 'Monterrey', href: 'https://www.estadiobbva.com' },
];

const ticketing = [
  {
    key: 'fifa',
    name: 'FIFA Official Tickets',
    href: 'https://www.fifa.com/en/tournaments/mens/worldcup/canada-mexico-usa-2026/play-off-tournament-tickets',
    featured: true,
  },
  {
    key: 'ticketmaster',
    name: 'Ticketmaster México',
    href: 'https://www.ticketmaster.com.mx',
    featured: false,
  },
  { key: 'boletomovil', name: 'Boletomóvil', href: 'https://www.boletomovil.com', featured: false },
];

const livestream = [
  { key: 'fifa', name: 'FIFA+', href: 'https://www.fifa.com/fifaplus' },
  { key: 'tudn', name: 'TUDN En Vivo', href: 'https://www.tudn.com' },
  { key: 'vix', name: 'ViX+ Premium', href: 'https://www.vix.com' },
  { key: 'fox', name: 'FOX Sports Play', href: 'https://www.foxsportsplay.com' },
  { key: 'espn', name: 'ESPN Play', href: 'https://www.espnplay.com' },
];

export default function ActivitiesPage() {
  const t = useTranslations('activities');

  return (
    <main>
      <header>
        <h1 className={styles['page-title']}>{t('title')}</h1>
      </header>
      <section className={styles['container']}>
        <p className={styles['subtitle']}>{t('subtitle')}</p>
        <p className={styles['disclaimer']}>{t('disclaimer')}</p>

        <div className={styles['section']}>
          <h3 className={styles['section-heading']}>{t('officials_heading')}</h3>
          {officials.map((org) => (
            <div key={org.key} className={styles['card']}>
              <h4 className={styles['card-name']}>{org.name}</h4>
              <a
                href={org.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles['card-link']}
              >
                🌐 {org.href.replace('https://', '')}
              </a>
            </div>
          ))}
        </div>

        <div className={styles['section']}>
          <h3 className={styles['section-heading']}>{t('stadiums_heading')}</h3>
          {stadiums.map((stadium) => (
            <div key={stadium.key} className={styles['card']}>
              <h4 className={styles['card-name']}>
                {stadium.name} — {stadium.location}
              </h4>
              <a
                href={stadium.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles['card-link']}
              >
                🌐 {stadium.href.replace('https://', '')}
              </a>
            </div>
          ))}
        </div>

        <div className={styles['section']}>
          <h3 className={styles['section-heading']}>{t('ticketing_heading')}</h3>
          {ticketing.map((ticket) => (
            <div
              key={ticket.key}
              className={`${styles['card']}${ticket.featured ? ` ${styles['featured-card']}` : ''}`}
            >
              <h4 className={styles['card-name']}>{ticket.name}</h4>
              <a
                href={ticket.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles['card-link']}
              >
                🌐 {ticket.href.replace('https://', '')}
              </a>
            </div>
          ))}
        </div>

        <div className={styles['section']}>
          <h3 className={styles['section-heading']}>{t('livestream')}</h3>
          <p className={styles['disclaimer']}>{t('livestream_desc')}</p>
          <div className={styles['livestream-grid']}>
            {livestream.map((stream) => (
              <div key={stream.key} className={`${styles['card']} ${styles['livestream-card']}`}>
                <h4 className={styles['card-name']}>{stream.name}</h4>
                <p className={styles['card-desc']}>{t(`livestream_${stream.key}_desc`)}</p>
                <a
                  href={stream.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['card-link']}
                >
                  🌐 {stream.href.replace('https://', '')}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
