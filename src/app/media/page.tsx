import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { AudioPlayer } from '../../components/AudioPlayer';
import { tracks } from '../../../lib/content/tracks';
import { type SessionData, sessionOptions } from '../../../lib/session';
import styles from './media.module.css';

export const runtime = 'nodejs';

export async function generateMetadata() {
  const t = await getTranslations('media');
  return { title: t('title') };
}

/**
 * 7.1 — Read iron-session server-side to determine if the visitor has a
 * valid Spotify access token. Derive `isAuthenticated` and pass it to
 * `<AudioPlayer>` so the correct branch (locked vs. active) is rendered.
 */
export default async function MediaPage() {
  const t = await getTranslations('media');

  // 7.1 — Read session cookie; derive auth state
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  const isAuthenticated = !!session.access_token;

  return (
    <main className={styles['page']}>
      <header className={styles['header']}>
        <h1 className={styles['title']}>{t('title')}</h1>
        <p className={styles['subtitle']}>{t('subtitle')}</p>
      </header>

      <section className={styles['player-section']} aria-label="Music player">
        {/* 7.2 — Pass isAuthenticated so AudioPlayer renders the correct branch */}
        <AudioPlayer mode="full" tracks={tracks} isAuthenticated={isAuthenticated} />
      </section>
    </main>
  );
}
