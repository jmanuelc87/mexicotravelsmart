'use client';

/**
 * AudioPlayer — Spotify OAuth + Web Playback SDK integration
 *
 * Architecture
 * ────────────
 * AudioPlayer (shell)
 *  ├─ isAuthenticated=true  → <SpotifyPlayerProvider> → <AudioPlayerAuthenticated>
 *  └─ isAuthenticated=false → <AudioPlayerLocked>
 *
 * Splitting into two inner components is necessary because React's rules of
 * hooks prohibit conditional hook calls:
 *  - AudioPlayerAuthenticated calls useSpotifyPlayer() (context hook)
 *  - AudioPlayerLocked renders a static disabled state; no hook needed
 *
 * The SpotifyPlayerProvider is the SDK lifecycle owner. It must be an ancestor
 * of any component calling useSpotifyPlayer().
 *
 * Unchanged from original:
 *  - audioReducer state machine
 *  - AudioPlayerControls / AudioPlayerProgress interfaces
 *  - CSS module class names and layout
 */

import { useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { AudioPlayerControls } from './AudioPlayerControls';
import { AudioPlayerProgress } from './AudioPlayerProgress';
import { SpotifyPlayerProvider } from '../SpotifyPlayerProvider';
import { SpotifyConnectPrompt } from '../SpotifyConnectPrompt';
import { useSpotifyPlayer } from '../../hooks/useSpotifyPlayer';
import type { Track } from '../../../lib/content/types';
import styles from './AudioPlayer.module.css';

// ─── Props ────────────────────────────────────────────────────────────────────

export interface AudioPlayerProps {
  /** Visual layout. */
  mode: 'compact' | 'full';
  tracks: Track[];
  /** 6.1 — Passed from the server component after reading iron-session. */
  isAuthenticated?: boolean;
  initialTrackIndex?: number;
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

/** Inlines album art or an emoji placeholder. */
function AlbumArt({ track }: { track: Track | undefined }) {
  if (track?.albumArt) {
    return (
      <Image
        src={track.albumArt.url}
        alt=""
        width={track.albumArt.width}
        height={track.albumArt.height}
        className={styles['album-art']}
        unoptimized
      />
    );
  }
  return (
    <div className={styles['album-art-placeholder']} aria-hidden="true">
      🎵
    </div>
  );
}

// ─── AudioPlayerAuthenticated ─────────────────────────────────────────────────
// Must be rendered inside <SpotifyPlayerProvider>.
// 6.4: No <audio> element; useSpotifyPlayer drives all state + controls.

interface InnerProps {
  mode: 'compact' | 'full';
  tracks: Track[];
  initialTrackIndex: number;
}

function AudioPlayerAuthenticated({ mode, tracks, initialTrackIndex }: InnerProps) {
  const t = useTranslations('audio_player');
  const tc = useTranslations('spotify_connect');
  const { state, controls } = useSpotifyPlayer();

  const currentTrack = tracks[state.trackIndex] ?? tracks[0];

  // ── aria-live announcer ────────────────────────────────────────────────────
  const announcerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = announcerRef.current;
    if (!el || !currentTrack) return;

    let message = '';
    if (state.status === 'playing') {
      message = t('now_playing', { title: currentTrack.title, artist: currentTrack.artist });
    } else if (state.status === 'paused') {
      message = t('paused');
    } else if (state.status === 'loading') {
      message = t('loading_track', { title: currentTrack.title });
    }

    if (message) {
      el.textContent = '';
      requestAnimationFrame(() => { el.textContent = message; });
    }
  }, [state.status, state.trackIndex, currentTrack, t]);

  // ── Media Session API ──────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return;
    if (!currentTrack) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentTrack.title,
      artist: currentTrack.artist,
      artwork: currentTrack.albumArt
        ? [{ src: currentTrack.albumArt.url, sizes: `${currentTrack.albumArt.width}x${currentTrack.albumArt.height}`, type: 'image/jpeg' }]
        : [],
    });

    navigator.mediaSession.setActionHandler('play', () => { controls.play().catch(() => {}); });
    navigator.mediaSession.setActionHandler('pause', () => { controls.pause(); });
    navigator.mediaSession.setActionHandler('previoustrack', () => { controls.prev(); });
    navigator.mediaSession.setActionHandler('nexttrack', () => { controls.next(); });

    return () => {
      (['play', 'pause', 'previoustrack', 'nexttrack'] as const).forEach(
        (action) => navigator.mediaSession.setActionHandler(action, null),
      );
    };
  }, [state.trackIndex, currentTrack, controls]);

  // ── Initialise to non-zero starting track ─────────────────────────────────
  useEffect(() => {
    if (initialTrackIndex > 0 && initialTrackIndex < tracks.length) {
      controls.loadTrack(initialTrackIndex);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Stable seek + track-select callbacks ──────────────────────────────────
  const handleSeek = useCallback((time: number) => controls.seek(time), [controls]);

  const handleTrackSelect = useCallback(
    (i: number) => {
      controls.loadTrack(i);
      controls.play().catch(() => {});
    },
    [controls],
  );

  // 6.6 — Detect auth-related errors to show "Reconnect" link
  const isAuthError =
    state.status === 'error' &&
    (state.errorMessage?.toLowerCase().includes('reconnect') ||
      state.errorMessage?.toLowerCase().includes('authentication'));

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div
      role="region"
      aria-label={t('player_label')}
      className={`${styles['player']} ${styles[`player--${mode}`]}`}
      data-mode={mode}
    >
      <span ref={announcerRef} role="status" aria-live="polite" aria-atomic="true" className={styles['sr-only']} />

      {/* ── Track info ─────────────────────────────────────────────────── */}
      <div className={styles['track-info']} aria-hidden="false">
        <AlbumArt track={currentTrack} />
        <div className={styles['track-meta']}>
          <span className={styles['track-title']}>{currentTrack?.title ?? '—'}</span>
          <span className={styles['track-artist']}>{currentTrack?.artist ?? '—'}</span>
        </div>

        {/* 6.5 — Disconnect button in track header area */}
        <form action="/api/spotify/logout" method="post" className={styles['disconnect-form']}>
          <button type="submit" className={styles['disconnect-btn']} aria-label={tc('disconnect')}>
            {tc('disconnect')}
          </button>
        </form>
      </div>

      {/* ── Controls ───────────────────────────────────────────────────── */}
      <div className={styles['controls-row']}>
        <AudioPlayerControls
          status={state.status}
          canPrev={tracks.length > 1}
          canNext={tracks.length > 1}
          onToggle={controls.toggle}
          onPrev={controls.prev}
          onNext={controls.next}
        />
      </div>

      {/* ── Seek bar ───────────────────────────────────────────────────── */}
      <div className={styles['progress-row']}>
        <AudioPlayerProgress
          currentTime={state.currentTime}
          duration={state.duration}
          onSeek={handleSeek}
        />
      </div>

      {/* 6.6 — Error display */}
      {state.status === 'error' && state.errorMessage && (
        <div className={styles['error-banner']} role="alert">
          <span>{state.errorMessage}</span>
          {isAuthError && (
            <a href="/api/spotify/auth" className={styles['reconnect-link']}>
              {tc('reconnect')}
            </a>
          )}
        </div>
      )}

      {/* ── Full-mode track list ───────────────────────────────────────── */}
      {mode === 'full' && (
        <ol className={styles['track-list']} aria-label={t('track_list_label')}>
          {tracks.map((track, i) => {
            const isActive = i === state.trackIndex;
            return (
              <li
                key={`${track.title}-${i}`}
                className={`${styles['track-item']} ${isActive ? styles['track-item--active'] : ''}`}
              >
                <button
                  type="button"
                  className={styles['track-btn']}
                  onClick={() => handleTrackSelect(i)}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {track.albumArt ? (
                    <Image src={track.albumArt.url} alt="" width={40} height={40} className={styles['track-thumb']} unoptimized />
                  ) : (
                    <div className={styles['track-thumb-placeholder']} aria-hidden="true">🎵</div>
                  )}
                  <span className={styles['track-item-meta']}>
                    <span className={styles['track-item-title']}>{track.title}</span>
                    <span className={styles['track-item-artist']}>{track.artist}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

// ─── AudioPlayerLocked ────────────────────────────────────────────────────────
// 6.3: Static disabled view for unauthenticated visitors.
// No <audio> element, no SDK. Controls and seek bar are inert.

function AudioPlayerLocked({ mode, tracks }: Pick<InnerProps, 'mode' | 'tracks'>) {
  const t = useTranslations('audio_player');

  // Show the first track as a passive display; no playback occurs.
  const currentTrack = tracks[0];

  return (
    <div
      role="region"
      aria-label={t('player_label')}
      className={`${styles['player']} ${styles[`player--${mode}`]}`}
      data-mode={mode}
    >
      {/* ── Track info ─────────────────────────────────────────────────── */}
      <div className={styles['track-info']} aria-hidden="false">
        <AlbumArt track={currentTrack} />
        <div className={styles['track-meta']}>
          <span className={styles['track-title']}>{currentTrack?.title ?? '—'}</span>
          <span className={styles['track-artist']}>{currentTrack?.artist ?? '—'}</span>
        </div>
      </div>

      {/* ── Controls — status='locked' disables all buttons (task 8.1) ── */}
      <div className={styles['controls-row']}>
        <AudioPlayerControls
          status="locked"
          canPrev={tracks.length > 1}
          canNext={tracks.length > 1}
          onToggle={() => Promise.resolve()}
          onPrev={() => {}}
          onNext={() => {}}
        />
      </div>

      {/* ── Seek bar — duration=0 makes it inert (aria-disabled=true) ─── */}
      <div className={styles['progress-row']}>
        <AudioPlayerProgress currentTime={0} duration={0} onSeek={() => {}} />
      </div>

      {/* ── Connect prompt — full mode only; too tall for compact bar ──── */}
      {mode === 'full' && <SpotifyConnectPrompt />}

      {/* ── Full-mode track list (muted items) ────────────────────────── */}
      {mode === 'full' && (
        <ol className={styles['track-list']} aria-label={t('track_list_label')}>
          {tracks.map((track, i) => (
            <li
              key={`${track.title}-${i}`}
              className={`${styles['track-item']} ${styles['track-item--locked']}`}
            >
              {/* Rendered as a div, not a button — non-interactive when locked */}
              <div className={styles['track-btn']} aria-hidden="true">
                {track.albumArt ? (
                  <Image src={track.albumArt.url} alt="" width={40} height={40} className={styles['track-thumb']} unoptimized />
                ) : (
                  <div className={styles['track-thumb-placeholder']} aria-hidden="true">🎵</div>
                )}
                <span className={styles['track-item-meta']}>
                  <span className={styles['track-item-title']}>{track.title}</span>
                  <span className={styles['track-item-artist']}>{track.artist}</span>
                </span>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

// ─── AudioPlayer (shell) ──────────────────────────────────────────────────────

export function AudioPlayer({
  mode,
  tracks,
  isAuthenticated = false,
  initialTrackIndex = 0,
}: AudioPlayerProps) {
  // 6.4: Authenticated → SpotifyPlayerProvider wraps the active player.
  //       Provider loads the SDK; inner component drives state via useSpotifyPlayer.
  if (isAuthenticated) {
    return (
      <SpotifyPlayerProvider tracks={tracks}>
        <AudioPlayerAuthenticated
          mode={mode}
          tracks={tracks}
          initialTrackIndex={initialTrackIndex}
        />
      </SpotifyPlayerProvider>
    );
  }

  // 6.3: Unauthenticated → locked static view; no SDK loaded.
  return <AudioPlayerLocked mode={mode} tracks={tracks} />;
}
