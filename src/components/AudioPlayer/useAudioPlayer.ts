'use client';

/**
 * useAudioPlayer
 *
 * Owns the <audio> element ref and wires browser events to the audioReducer
 * state machine. Designed to be StrictMode-safe: all event listeners are added
 * and cleaned up symmetrically inside a single useEffect.
 *
 * IMPORTANT:
 *  - controls.play() is intentionally NOT called from any useEffect.
 *    It must only be invoked from user-gesture handlers to satisfy browser
 *    autoplay policy on iOS Safari and Android Chrome.
 *  - controls.play() returns the underlying HTMLAudioElement.play() Promise
 *    so callers can handle autoplay rejection (e.g. show a "tap to play" UI).
 */

import { useReducer, useRef, useEffect, useCallback } from 'react';
import {
  audioReducer,
  initialAudioState,
  type AudioState,
} from './audioReducer';

// ─── Constants ───────────────────────────────────────────────────────────────

/** Throttle timeupdate dispatches to ~4 fps to limit re-renders. */
const TIME_UPDATE_INTERVAL_MS = 250;

// ─── Public types ────────────────────────────────────────────────────────────

export interface AudioControls {
  /** Start playback. Returns the browser's play() Promise — handle rejection. */
  play: () => Promise<void>;
  pause: () => void;
  /** Toggle between play and pause based on current status. */
  toggle: () => Promise<void>;
  /** Skip to next track (wraps). */
  next: () => void;
  /** Skip to previous track (wraps). */
  prev: () => void;
  /** Seek to `time` seconds. Clamped to [0, duration] by the reducer. */
  seek: (time: number) => void;
  /** Set volume 0–1. Clamped by the reducer. */
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  /** Signal that a specific track index should be loaded. */
  loadTrack: (trackIndex: number) => void;
}

export interface UseAudioPlayerReturn {
  state: AudioState;
  /** Attach to an <audio> element. The caller controls the src attribute. */
  audioRef: React.RefObject<HTMLAudioElement | null>;
  controls: AudioControls;
}

export interface UseAudioPlayerOptions {
  /** Total number of tracks — required for NEXT/PREV wrap-around. */
  trackCount: number;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useAudioPlayer({
  trackCount,
}: UseAudioPlayerOptions): UseAudioPlayerReturn {
  const [state, dispatch] = useReducer(audioReducer, initialAudioState);

  // Stable ref to the <audio> DOM element — set by the parent via ref prop.
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Track the wall-clock time of the last TIME_UPDATE dispatch for throttling.
  const lastTimeUpdateAt = useRef<number>(0);

  // Keep a ref to the latest state so callbacks defined with useCallback don't
  // go stale without needing to list state in every dependency array.
  const stateRef = useRef<AudioState>(state);
  stateRef.current = state;

  // ── Event wiring ──────────────────────────────────────────────────────────
  //
  // Single useEffect — all listeners are added and removed in one place.
  // This guarantees StrictMode safety (double-invoke unmounts call cleanup
  // before the second mount re-adds listeners).

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      const now = Date.now();
      if (now - lastTimeUpdateAt.current < TIME_UPDATE_INTERVAL_MS) return;
      lastTimeUpdateAt.current = now;
      dispatch({ type: 'TIME_UPDATE', payload: { currentTime: audio.currentTime } });
    };

    const onLoadedMetadata = () => {
      dispatch({ type: 'DURATION_CHANGE', payload: { duration: audio.duration } });
    };

    // Also pick up duration if it arrives via durationchange (some browsers
    // fire this before loadedmetadata when the audio is already cached).
    const onDurationChange = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        dispatch({ type: 'DURATION_CHANGE', payload: { duration: audio.duration } });
      }
    };

    const onEnded = () => {
      dispatch({ type: 'ENDED' });
    };

    const onError = () => {
      const code = audio.error?.code;
      const message =
        audio.error?.message ||
        (code !== undefined ? `MediaError code ${code}` : 'Unknown audio error');
      dispatch({ type: 'ERROR', payload: { message } });
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('durationchange', onDurationChange);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('durationchange', onDurationChange);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
    // Intentionally empty deps: the ref value is stable for the lifetime of
    // the component. Re-running on every render would risk double listeners.
  }, []);

  // ── Controls ──────────────────────────────────────────────────────────────

  const play = useCallback((): Promise<void> => {
    const audio = audioRef.current;
    if (!audio) return Promise.resolve();
    dispatch({ type: 'PLAY' });
    // Return the raw Promise — caller must handle rejection (autoplay policy).
    return audio.play();
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    dispatch({ type: 'PAUSE' });
  }, []);

  const toggle = useCallback((): Promise<void> => {
    const { status } = stateRef.current;
    if (status === 'playing') {
      const audio = audioRef.current;
      if (audio) audio.pause();
      dispatch({ type: 'PAUSE' });
      return Promise.resolve();
    }
    // loading | paused | ended → attempt play
    const audio = audioRef.current;
    if (!audio) return Promise.resolve();
    dispatch({ type: 'PLAY' });
    return audio.play();
  }, []);

  const next = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    dispatch({ type: 'NEXT', payload: { trackCount } });
  }, [trackCount]);

  const prev = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    dispatch({ type: 'PREV', payload: { trackCount } });
  }, [trackCount]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (audio) {
      // Clamp defensively before touching the DOM — the reducer clamps too.
      audio.currentTime = Math.min(Math.max(0, time), audio.duration || 0);
    }
    dispatch({ type: 'SEEK', payload: { currentTime: time } });
  }, []);

  const setVolume = useCallback((volume: number) => {
    const audio = audioRef.current;
    if (audio) audio.volume = Math.min(1, Math.max(0, volume));
    dispatch({ type: 'SET_VOLUME', payload: { volume } });
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (audio) audio.muted = !audio.muted;
    dispatch({ type: 'TOGGLE_MUTE' });
  }, []);

  const loadTrack = useCallback((trackIndex: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    dispatch({ type: 'LOAD_TRACK', payload: { trackIndex } });
  }, []);

  return {
    state,
    audioRef,
    controls: {
      play,
      pause,
      toggle,
      next,
      prev,
      seek,
      setVolume,
      toggleMute,
      loadTrack,
    },
  };
}
