import { useTranslations } from 'next-intl';
import styles from './page.module.css';

interface Consulate {
  flag: string;
  name: string;
  phone: string;
  mapQuery: string;
}

const consulates: Consulate[] = [
  {
    flag: '🇺🇸',
    name: 'United States',
    phone: '+525550802000',
    mapQuery: 'Embajada+Estados+Unidos',
  },
  { flag: '🇨🇦', name: 'Canada', phone: '+525557247900', mapQuery: 'Embajada+Canad%C3%A1' },
  { flag: '🇬🇧', name: 'United Kingdom', phone: '+525516703200', mapQuery: 'Embajada+Reino+Unido' },
  { flag: '🇫🇷', name: 'France', phone: '+525591719700', mapQuery: 'Embajada+Francia' },
  { flag: '🇩🇪', name: 'Germany', phone: '+525552832200', mapQuery: 'Embajada+Alemania' },
  { flag: '🇪🇸', name: 'Spain', phone: '+525552804508', mapQuery: 'Embajada+Espa%C3%B1a' },
  { flag: '🇮🇹', name: 'Italy', phone: '+525552803691', mapQuery: 'Embajada+Italia' },
  { flag: '🇧🇷', name: 'Brazil', phone: '+525552014531', mapQuery: 'Embajada+Brasil' },
  { flag: '🇦🇷', name: 'Argentina', phone: '+525555209430', mapQuery: 'Embajada+Argentina' },
  { flag: '🇨🇴', name: 'Colombia', phone: '+525555250277', mapQuery: 'Embajada+Colombia' },
  { flag: '🇯🇵', name: 'Japan', phone: '+525552110028', mapQuery: 'Embajada+Jap%C3%B3n' },
  {
    flag: '🇰🇷',
    name: 'South Korea',
    phone: '+525552029866',
    mapQuery: 'Embajada+Rep%C3%BAblica+de+Corea',
  },
  { flag: '🇦🇺', name: 'Australia', phone: '+525511012200', mapQuery: 'Embajada+Australia' },
  { flag: '🇳🇿', name: 'New Zealand', phone: '+525552839460', mapQuery: 'Embajada+Nueva+Zelanda' },
  {
    flag: '🇳🇱',
    name: 'Netherlands',
    phone: '+525511056550',
    mapQuery: 'Embajada+Pa%C3%ADses+Bajos',
  },
  { flag: '🇧🇪', name: 'Belgium', phone: '+525552800758', mapQuery: 'Embajada+B%C3%A9lgica' },
  { flag: '🇨🇭', name: 'Switzerland', phone: '+525591784370', mapQuery: 'Embajada+Suiza' },
  { flag: '🇦🇹', name: 'Austria', phone: '+525552510806', mapQuery: 'Embajada+Austria' },
  { flag: '🇵🇹', name: 'Portugal', phone: '+525555207897', mapQuery: 'Embajada+Portugal' },
  { flag: '🇳🇴', name: 'Norway', phone: '+525550473700', mapQuery: 'Embajada+Noruega' },
  { flag: '🇸🇦', name: 'Saudi Arabia', phone: '+525550203161', mapQuery: 'Embajada+Arabia+Saudita' },
  { flag: '🇶🇦', name: 'Qatar', phone: '+525555402926', mapQuery: 'Embajada+Catar' },
  { flag: '🇪🇬', name: 'Egypt', phone: '+525552810698', mapQuery: 'Embajada+Egipto' },
  { flag: '🇲🇦', name: 'Morocco', phone: '+525552451790', mapQuery: 'Embajada+Marruecos' },
  { flag: '🇿🇦', name: 'South Africa', phone: '+525511004970', mapQuery: 'Embajada+Sud%C3%A1frica' },
];

export default function EmbassyPage() {
  const t = useTranslations('embassy');

  return (
    <main>
      <header>
        <h1 className={styles['page-title']}>{t('title')}</h1>
      </header>
      <section className={styles['container']}>
        <p className={styles['subtitle']}>{t('subtitle')}</p>
        <div className={styles['consulate-grid']}>
          {consulates.map((c) => (
            <div key={c.name} className={styles['consulate-card']}>
              <h3>
                {c.flag} {c.name}
              </h3>
              <p>
                📞 <a href={`tel:${c.phone}`}>{c.phone.replace('+52', '+52 ')}</a>
              </p>
              <p>
                <a
                  href={`https://maps.google.com/?q=${c.mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📍 Map
                </a>
              </p>
            </div>
          ))}
        </div>
        <div className={styles['sre-card']}>
          <h3>
            🌐{' '}
            <a
              href="https://directorio.sre.gob.mx/index.php/embajadas-background"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('official_dir')}
            </a>
          </h3>
        </div>
      </section>
    </main>
  );
}
