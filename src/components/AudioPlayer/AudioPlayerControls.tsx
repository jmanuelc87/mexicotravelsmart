'use client';

/**
 * AudioPlayerControls — W2-T18.9
 *
 * Play/pause toggle, prev/next buttons. Memoized with a custom comparator
 * so timeupdate events (currentTime changes) never trigger a re-render here.
 */

import { memo } from 'react';
import { useTranslations } from 'next-intl';
import type { AudioStatus } from './audioReducer';
import styles from './AudioPlayerControls.module.css';

// ─── Props ────────────────────────────────────────────────────────────────────

export interface AudioPlayerControlsProps {
  status: AudioStatus;
  /** Whether the prev button should be enabled (e.g. trackCount > 1). */
  canPrev: boolean;
  /** Whether the next button should be enabled (e.g. trackCount > 1). */
  canNext: boolean;
  onToggle: () => Promise<void>;
  onPrev: () => void;
  onNext: () => void;
}

// ─── SVG icons (inline — no external dependency) ─────────────────────────────

function IconPlay() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="1em" height="1em">
      <path d="M8 5v14l11-7z" fill="currentColor" />
    </svg>
  );
}

function IconPause() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="1em" height="1em">
      <path d="M6 19h4V5H6zm8-14v14h4V5z" fill="currentColor" />
    </svg>
  );
}

function IconPrev() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="1em" height="1em">
      <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" fill="currentColor" />
    </svg>
  );
}

function IconNext() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="1em" height="1em">
      <path d="M6 18l8.5-6L6 6v12zm2.5-6 5.5 4V8zm7-6h2v12h-2z" fill="currentColor" />
    </svg>
  );
}

function IconLoading() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="1em" height="1em">
      <circle
        cx="12" cy="12" r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="28 56"
        className={styles['spin']}
      />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

function AudioPlayerControlsInner({
  status,
  canPrev,
  canNext,
  onToggle,
  onPrev,
  onNext,
}: AudioPlayerControlsProps) {
  const t = useTranslations('audio_player');

  const isPlaying = status === 'playing';
  const isLoading = status === 'loading';
  // 8.1 — 'locked' (unauthenticated) and 'error' both fully disable controls
  const isLocked = status === 'locked';
  const isDisabled = status === 'error' || isLocked;

  return (
    <div
      className={`${styles['controls']} ${isLocked ? styles['controls--locked'] : ''}`}
      role="group"
      aria-label={t('playback_progress')}
    >
      {/* Prev */}
      <button
        type="button"
        className={styles['btn']}
        onClick={onPrev}
        disabled={!canPrev || isDisabled}
        aria-label={t('prev_track')}
      >
        <IconPrev />
      </button>

      {/* Play / Pause / Loading */}
      <button
        type="button"
        className={`${styles['btn']} ${styles['btn-primary']}`}
        onClick={onToggle}
        disabled={isDisabled}
        aria-label={isPlaying ? t('pause') : t('play')}
        aria-pressed={isPlaying}
      >
        {isLoading ? <IconLoading /> : isPlaying ? <IconPause /> : <IconPlay />}
      </button>

      {/* Next */}
      <button
        type="button"
        className={styles['btn']}
        onClick={onNext}
        disabled={!canNext || isDisabled}
        aria-label={t('next_track')}
      >
        <IconNext />
      </button>
    </div>
  );
}

/**
 * Custom memo comparator — only re-render when the props that matter for
 * controls change. Excludes currentTime / duration so timeupdate events
 * never cause a re-render here.
 */
function areEqual(
  prev: AudioPlayerControlsProps,
  next: AudioPlayerControlsProps,
): boolean {
  return (
    prev.status === next.status &&
    prev.canPrev === next.canPrev &&
    prev.canNext === next.canNext &&
    prev.onToggle === next.onToggle &&
    prev.onPrev === next.onPrev &&
    prev.onNext === next.onNext
  );
}

export const AudioPlayerControls = memo(AudioPlayerControlsInner, areEqual);
AudioPlayerControls.displayName = 'AudioPlayerControls';
