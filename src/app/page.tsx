import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { type SessionData, sessionOptions } from '../../lib/session';
import { AudioPlayer } from '../components/AudioPlayer';
import { tracks } from '../../lib/content/tracks';
import styles from './page.module.css';

export default async function HomePage() {
  const t = await getTranslations();

  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  const isAuthenticated = !!session.access_token;

  const sections = [
    { href: '/emergency', key: 'nav.emergency', icon: '/images/tile-emergency.png', alt: 'Emergency' },
    { href: '/legal', key: 'nav.legal', icon: '/images/tile-legal.png', alt: 'Legal' },
    { href: '/transport', key: 'nav.transport', icon: '/images/tile-transport.png', alt: 'Transport' },
    { href: '/embassy', key: 'nav.embassy', icon: '/images/tile-embassy.png', alt: 'Embassy' },
    { href: '/dining', key: 'nav.dining', icon: '/images/tile-dining.png', alt: 'Dining' },
    { href: '/lodging', key: 'nav.lodging', icon: '/images/tile-lodging.png', alt: 'Lodging' },
    { href: '/tours', key: 'nav.tours', icon: '/images/tile-tours.png', alt: 'Tours' },
    { href: '/activities', key: 'nav.activities', icon: '/images/tile-activities.png', alt: 'Activities' },
    { href: '/media', key: 'nav.media', icon: '/images/tile-media.png', alt: 'Media' },
    { href: '/lost-docs', key: 'nav.lost_docs', icon: '/images/tile-lost-docs.png', alt: 'Lost Documents' },
    { href: '/states', key: 'nav.states', icon: '/images/tile-states.png', alt: 'States' },
  ];

  return (
    <main className={styles['page']}>
      <div className={styles['hero']}>
        <Image
          src="/images/hero.jpg"
          alt={t('home.title')}
          width={2000}
          height={1332}
          className={styles['hero-image']}
          priority
        />
        <h2 className={styles['hero-heading']}>{t('home.welcome')}</h2>
        <p className={styles['hero-subtitle']}>{t('home.subtitle')}</p>
      </div>
      <section className={styles['player-section']} aria-label="Music player">
        <AudioPlayer mode="full" tracks={tracks} isAuthenticated={isAuthenticated} />
      </section>
      <div className={styles['menu-grid']}>
        {sections.map(({ href, key, icon, alt }) => (
          <Link
            key={href}
            href={href}
            className={
              href === '/states'
                ? `${styles['menu-card']} ${styles['menu-card-full']}`
                : styles['menu-card']
            }
          >
            <Image
              src={icon}
              alt={alt}
              width={64}
              height={64}
              className={styles['menu-icon']}
            />
            {t(key)}
          </Link>
        ))}
      </div>
    </main>
  );
}
