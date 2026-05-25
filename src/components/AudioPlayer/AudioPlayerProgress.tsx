'use client';

/**
 * AudioPlayerProgress — W2-T18.10
 *
 * Draggable seek bar implemented with pointer events + setPointerCapture.
 *
 * Design decisions:
 *  - During drag we update a *local* scrubTime ref only — we do NOT dispatch
 *    SEEK on every pointermove. This prevents audio click artifacts and the
 *    timeupdate handler overwriting the visual position mid-drag.
 *  - onSeek is called exactly once, on pointerup.
 *  - setPointerCapture ensures pointermove/pointerup fire on the target even
 *    when the pointer leaves the element — gives mouse/touch parity and smooth
 *    iOS Safari dragging.
 *  - Keyboard: ArrowLeft/Right ±5 s, Home (0), End (duration).
 *  - Memoized: re-renders only when currentTime, duration, or onSeek change.
 */

import { memo, useRef, useCallback, useId } from 'react';
import { useTranslations } from 'next-intl';
import styles from './AudioPlayerProgress.module.css';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function positionToTime(
  clientX: number,
  rect: DOMRect,
  duration: number,
): number {
  const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
  return ratio * duration;
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface AudioPlayerProgressProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

function AudioPlayerProgressInner({
  currentTime,
  duration,
  onSeek,
}: AudioPlayerProgressProps) {
  const t = useTranslations('audio_player');
  const trackRef = useRef<HTMLDivElement>(null);
  const progressId = useId();

  // Drag state — using refs to avoid re-renders during drag.
  const isDragging = useRef(false);
  const scrubTime = useRef(currentTime);

  const hasDuration = duration > 0;
  const progress = hasDuration ? clamp(currentTime / duration, 0, 1) : 0;

  // ── Pointer event handlers ────────────────────────────────────────────────

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!hasDuration) return;
      // Capture so pointermove/up fire here even outside the element.
      e.currentTarget.setPointerCapture(e.pointerId);
      isDragging.current = true;

      const rect = e.currentTarget.getBoundingClientRect();
      scrubTime.current = positionToTime(e.clientX, rect, duration);

      // Immediately reflect tap position visually via CSS custom property.
      e.currentTarget.style.setProperty(
        '--scrub-progress',
        String(scrubTime.current / duration),
      );
    },
    [hasDuration, duration],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging.current || !hasDuration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      scrubTime.current = positionToTime(e.clientX, rect, duration);

      // Update visual only — do NOT dispatch SEEK (no audio click mid-drag).
      e.currentTarget.style.setProperty(
        '--scrub-progress',
        String(scrubTime.current / duration),
      );
    },
    [hasDuration, duration],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      e.currentTarget.style.removeProperty('--scrub-progress');
      // Commit seek exactly once — no audio click during drag.
      onSeek(scrubTime.current);
    },
    [onSeek],
  );

  const handlePointerCancel = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      e.currentTarget.style.removeProperty('--scrub-progress');
      // On cancel (e.g. phone call interruption) seek to last scrub position.
      onSeek(scrubTime.current);
    },
    [onSeek],
  );

  // ── Keyboard handler ──────────────────────────────────────────────────────

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!hasDuration) return;
      let newTime: number | null = null;

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          newTime = clamp(currentTime - 5, 0, duration);
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          newTime = clamp(currentTime + 5, 0, duration);
          break;
        case 'Home':
          newTime = 0;
          break;
        case 'End':
          newTime = duration;
          break;
        default:
          return;
      }

      e.preventDefault();
      onSeek(newTime);
    },
    [hasDuration, currentTime, duration, onSeek],
  );

  // ─── Render ───────────────────────────────────────────────────────────────

  const progressPercent = progress * 100;

  return (
    <div className={styles['progress-wrapper']}>
      {/* Time labels */}
      <span className={styles['time']} aria-hidden="true">
        {formatTime(currentTime)}
      </span>

      {/* Seekable track */}
      <div
        ref={trackRef}
        role="slider"
        id={progressId}
        aria-label={t('seek')}
        aria-valuemin={0}
        aria-valuemax={Math.round(duration)}
        aria-valuenow={Math.round(currentTime)}
        aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
        tabIndex={hasDuration ? 0 : -1}
        aria-disabled={!hasDuration}
        className={styles['track']}
        style={{ '--progress': `${progressPercent}%` } as React.CSSProperties}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onKeyDown={handleKeyDown}
      >
        <div className={styles['track-fill']} />
        <div
          className={styles['thumb']}
          aria-hidden="true"
        />
      </div>

      {/* Duration */}
      <span className={styles['time']} aria-hidden="true">
        {formatTime(duration)}
      </span>
    </div>
  );
}

export const AudioPlayerProgress = memo(AudioPlayerProgressInner);
AudioPlayerProgress.displayName = 'AudioPlayerProgress';
