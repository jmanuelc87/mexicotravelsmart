'use client';

import { useTranslations } from 'next-intl';
import styles from './media.module.css';

// Recent News cards are hardcoded (static editorial content)
const recentNewsCards = [
  {
    title: 'Mexico Business News',
    desc: 'Business and economy news in English from Mexico',
    href: 'https://mexicobusiness.news',
  },
  {
    title: 'Estar Bien',
    desc: 'Wellness, lifestyle, and culture from Mexico',
    href: 'https://estarbien.com',
  },
  {
    title: 'El Financiero',
    desc: 'Business and financial news in Mexico',
    href: 'https://elfinanciero.com.mx',
  },
  {
    title: '+Lucha',
    desc: 'Mexican professional wrestling news and events',
    href: 'https://maslucha.com',
  },
];

const tvStreamingCards = [
  { title: 'TUDN', descKey: 'tudn_desc', href: 'https://tudn.com' },
  { title: 'TV Azteca Deportes', descKey: 'azteca_desc', href: 'https://aztecadeportes.com' },
  { title: 'ESPN México', descKey: 'espn_desc', href: 'https://espn.com.mx' },
  { title: 'FIFA+', descKey: 'fifa_desc', href: 'https://plus.fifa.com' },
  { title: 'ViX / ViX+', descKey: 'vix_desc', href: 'https://vix.com' },
  { title: 'FOX Sports', descKey: 'fox_desc', href: 'https://foxsports.com.mx' },
  { title: 'La Prensa Francesa', descKey: 'prensa_francesa_desc', href: 'https://laprensafrancesa.com.mx' },
];

const sportsNewsCards = [
  { title: 'Mediotiempo', descKey: 'mediotiempo_desc', href: 'https://mediotiempo.com' },
  { title: 'RÉCORD', descKey: 'record_desc', href: 'https://record.com.mx' },
  { title: 'N+ Deportes', descKey: 'nmas_desc', href: 'https://nmas.com.mx/deportes' },
];

const influencerCards = [
  { title: '@LuisitoComunica', descKey: 'influencer_luisito_desc', href: 'https://youtube.com/@LuisitoComunica' },
  { title: '@AlanXElMundo', descKey: 'influencer_alan_desc', href: 'https://youtube.com/@AlanXElMundo' },
  { title: '@MisterMundial', descKey: 'influencer_mister_desc', href: 'https://youtube.com/@MisterMundial' },
  { title: '@WeroWeroTV', descKey: 'influencer_wero_desc', href: 'https://youtube.com/@WeroWeroTV' },
  { title: '@Kiwilimón', descKey: 'influencer_kiwi_desc', href: 'https://youtube.com/@kiwilimon' },
  { title: '@MexicoTravel', descKey: 'influencer_mtravel_desc', href: 'https://youtube.com/@VisitMexico' },
];

export default function MediaPage() {
  const t = useTranslations('media');

  return (
    <main className={styles['page']}>
      <header className={styles['header']}>
        <h1 className={styles['page-title']}>{t('title')}</h1>
      </header>
      <p className={styles['subtitle']}>{t('subtitle')}</p>

      {/* Recent News */}
      <section className={styles['section']} aria-labelledby="recent-news-heading">
        <h2 id="recent-news-heading" className={styles['section-title']}>
          {t('recent_news')}
        </h2>
        <div className={styles['grid']}>
          {recentNewsCards.map((card) => (
            <article key={card.title} className={`${styles['card']} ${styles['featured-card']}`}>
              <h3 className={styles['card-title']}>{card.title}</h3>
              <p className={styles['card-desc']}>{card.desc}</p>
              <a
                className={styles['card-link']}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit →
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* TV & Streaming */}
      <section className={styles['section']} aria-labelledby="tv-streaming-heading">
        <h2 id="tv-streaming-heading" className={styles['section-title']}>
          {t('tv_streaming')}
        </h2>
        <div className={styles['grid']}>
          {tvStreamingCards.map((card) => (
            <article key={card.title} className={styles['card']}>
              <h3 className={styles['card-title']}>{card.title}</h3>
              <p className={styles['card-desc']}>{t(card.descKey)}</p>
              <a
                className={styles['card-link']}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit →
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Sports News */}
      <section className={styles['section']} aria-labelledby="sports-news-heading">
        <h2 id="sports-news-heading" className={styles['section-title']}>
          {t('sports_news')}
        </h2>
        <div className={styles['grid']}>
          {sportsNewsCards.map((card) => (
            <article key={card.title} className={styles['card']}>
              <h3 className={styles['card-title']}>{card.title}</h3>
              <p className={styles['card-desc']}>{t(card.descKey)}</p>
              <a
                className={styles['card-link']}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit →
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Influencers & Creators */}
      <section className={styles['section']} aria-labelledby="influencers-heading">
        <h2 id="influencers-heading" className={styles['section-title']}>
          {t('influencers')}
        </h2>
        <div className={styles['grid']}>
          {influencerCards.map((card) => (
            <article key={card.title} className={styles['card']}>
              <h3 className={styles['card-title']}>{card.title}</h3>
              <p className={styles['card-desc']}>{t(card.descKey)}</p>
              <a
                className={styles['card-link']}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit →
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
