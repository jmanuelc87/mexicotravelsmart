'use client';

/**
 * SpotifyPlayerProvider
 *
 * Manages the full Spotify Web Playback SDK lifecycle:
 *  - Injects the SDK <script> tag once on mount (no-op if already present).
 *  - Creates a Spotify.Player instance after the SDK fires its ready callback.
 *  - Subscribes to SDK events and drives the shared `audioReducer` state machine.
 *  - Exposes { state, controls, deviceId } via SpotifyPlayerContext for
 *    consumption by useSpotifyPlayer.
 *
 * Renders children unconditionally — the SDK is only loaded when this provider
 * is mounted (i.e. only for authenticated users).
 */

import {
  createContext,
  useReducer,
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {
  audioReducer,
  initialAudioState,
  type AudioState,
} from '../AudioPlayer/audioReducer';
import type { AudioControls } from '../AudioPlayer/useAudioPlayer';
import type { Track } from '../../../lib/content/types';

// ─── Constants ────────────────────────────────────────────────────────────────

const SDK_URL = 'https://sdk.scdn.co/spotify-player.js';
/** Throttle TIME_UPDATE dispatches to ~4 fps. */
const TIME_UPDATE_INTERVAL_MS = 250;

// ─── Context ──────────────────────────────────────────────────────────────────

export interface SpotifyPlayerContextValue {
  state: AudioState;
  controls: AudioControls;
  deviceId: string | null;
}

export const SpotifyPlayerContext =
  createContext<SpotifyPlayerContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export interface SpotifyPlayerProviderProps {
  children: React.ReactNode;
  /** Full track list — required so controls.play() can resolve the Spotify URI. */
  tracks: Track[];
}

export function SpotifyPlayerProvider({
  children,
  tracks,
}: SpotifyPlayerProviderProps) {
  const [state, dispatch] = useReducer(audioReducer, initialAudioState);
  const [deviceId, setDeviceId] = useState<string | null>(null);

  // ── Stable refs (avoid stale closures in event callbacks) ─────────────────
  const playerRef = useRef<Spotify.Player | null>(null);
  const deviceIdRef = useRef<string | null>(null);
  const stateRef = useRef<AudioState>(state);
  const tracksRef = useRef<Track[]>(tracks);
  const lastTrackIdRef = useRef<string | null>(null);
  const lastTimeUpdateRef = useRef<number>(0);
  /**
   * Bridges loadTrack → play() so that when a user selects a track from the
   * list (loadTrack dispatches a reducer update, then play() fires synchronously),
   * play() uses the intended index rather than the stale stateRef value.
   * Consumed (reset to null) by the first play() call that follows.
   */
  const pendingTrackIndexRef = useRef<number | null>(null);

  // Keep refs in sync with latest render values
  stateRef.current = state;
  tracksRef.current = tracks;
  deviceIdRef.current = deviceId;

  // ── SDK initialisation (mount-only) ───────────────────────────────────────

  useEffect(() => {
    /**
     * Creates and connects the Spotify.Player instance.
     * Called either immediately (if SDK already loaded) or via the global
     * onSpotifyWebPlaybackSDKReady callback (first load).
     */
    function initPlayer() {
      const player = new window.Spotify.Player({
        name: 'Mexico Travel Smart',
        getOAuthToken: async (cb) => {
          try {
            const res = await fetch('/api/spotify/token');
            if (!res.ok) {
              cb('');
              return;
            }
            const data = (await res.json()) as { accessToken: string };
            cb(data.accessToken);
          } catch {
            cb('');
          }
        },
        volume: 0.8,
      });

      // 3.2 — Store device_id from the ready event
      player.addListener('ready', ({ device_id }) => {
        deviceIdRef.current = device_id;
        setDeviceId(device_id);
      });

      player.addListener('not_ready', () => {
        deviceIdRef.current = null;
        setDeviceId(null);
      });

      // 3.3 — Sync SDK state → audioReducer
      player.addListener('player_state_changed', (sdkState) => {
        if (!sdkState) return;

        const { paused, position, duration, track_window } = sdkState;
        const currentTrack = track_window?.current_track;

        // Track change: find new trackIndex by matching Spotify track ID
        if (currentTrack && currentTrack.id !== lastTrackIdRef.current) {
          lastTrackIdRef.current = currentTrack.id;

          const idx = tracksRef.current.findIndex(
            (t) => t.spotifyId === currentTrack.id,
          );
          if (idx >= 0 && idx !== stateRef.current.trackIndex) {
            dispatch({ type: 'LOAD_TRACK', payload: { trackIndex: idx } });
          }

          // Sync duration (ms → s)
          if (duration > 0) {
            dispatch({
              type: 'DURATION_CHANGE',
              payload: { duration: duration / 1_000 },
            });
          }
        }

        // Play / Pause transitions
        // Per spec: paused=false → PLAY; paused=true && position>0 → PAUSE
        if (!paused) {
          if (stateRef.current.status !== 'playing') {
            dispatch({ type: 'PLAY' });
          }
        } else if (position > 0) {
          if (stateRef.current.status === 'playing') {
            dispatch({ type: 'PAUSE' });
          }
        } else {
          // paused=true, position=0 — track ended with no continuation
          if (stateRef.current.status === 'playing') {
            dispatch({ type: 'ENDED' });
          }
        }

        // TIME_UPDATE — throttled to ~4 fps
        const now = Date.now();
        if (now - lastTimeUpdateRef.current >= TIME_UPDATE_INTERVAL_MS) {
          lastTimeUpdateRef.current = now;
          dispatch({
            type: 'TIME_UPDATE',
            payload: { currentTime: position / 1_000 },
          });
        }
      });

      // 3.4 — Error events
      player.addListener('account_error', ({ message }) => {
        dispatch({
          type: 'ERROR',
          payload: {
            message: `Spotify Premium is required to use the player. ${message}`,
          },
        });
      });

      player.addListener('authentication_error', ({ message }) => {
        dispatch({
          type: 'ERROR',
          payload: {
            message: `Authentication error — please reconnect Spotify. ${message}`,
          },
        });
      });

      player.addListener('initialization_error', ({ message }) => {
        dispatch({ type: 'ERROR', payload: { message } });
      });

      player.addListener('playback_error', ({ message }) => {
        dispatch({ type: 'ERROR', payload: { message } });
      });

      // 3.2 — Connect to Spotify Connect
      player.connect();
      playerRef.current = player;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${SDK_URL}"]`,
    );

    if (existingScript) {
      // Script tag already present — init immediately if SDK is ready,
      // otherwise wait for the callback (e.g. strict-mode double-mount).
      if (window.Spotify) {
        initPlayer();
      } else {
        window.onSpotifyWebPlaybackSDKReady = initPlayer;
      }
    } else {
      // First load — let the SDK call our callback when ready
      window.onSpotifyWebPlaybackSDKReady = initPlayer;

      const script = document.createElement('script');
      script.src = SDK_URL;
      script.async = true;
      script.onerror = () => {
        dispatch({
          type: 'ERROR',
          payload: {
            message:
              'Failed to load the Spotify player. Check your network connection.',
          },
        });
      };
      document.body.appendChild(script);
    }

    // 3.6 — Disconnect on unmount
    return () => {
      if (playerRef.current) {
        playerRef.current.disconnect();
        playerRef.current = null;
      }
    };
  }, []); // mount-only — SDK lifecycle runs once

  // ── Controls ──────────────────────────────────────────────────────────────

  /** Starts playback of the current track via the BFF proxy. */
  const play = useCallback(async (): Promise<void> => {
    const dId = deviceIdRef.current;
    // Prefer the pending index set by loadTrack (handles the select-then-play
    // race where the reducer state hasn't re-rendered yet), then fall back to
    // the current state index.
    const idx = pendingTrackIndexRef.current ?? stateRef.current.trackIndex;
    pendingTrackIndexRef.current = null; // consume the one-shot intent
    const track = tracksRef.current[idx];
    if (!track?.spotifyId || !dId) return;

    await fetch('/api/spotify/play', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uri: `spotify:track:${track.spotifyId}`,
        deviceId: dId,
      }),
    });
  }, []);

  const pause = useCallback((): void => {
    playerRef.current?.pause();
    dispatch({ type: 'PAUSE' });
  }, []);

  const toggle = useCallback(async (): Promise<void> => {
    if (stateRef.current.status === 'playing') {
      pause();
    } else {
      await play();
    }
  }, [play, pause]);

  const next = useCallback((): void => {
    playerRef.current?.nextTrack();
  }, []);

  const prev = useCallback((): void => {
    playerRef.current?.previousTrack();
  }, []);

  /** Seek to `time` seconds. SDK expects milliseconds. */
  const seek = useCallback((time: number): void => {
    playerRef.current?.seek(time * 1_000);
    dispatch({ type: 'SEEK', payload: { currentTime: time } });
  }, []);

  const setVolume = useCallback((volume: number): void => {
    const clamped = Math.min(1, Math.max(0, volume));
    playerRef.current?.setVolume(clamped);
    dispatch({ type: 'SET_VOLUME', payload: { volume: clamped } });
  }, []);

  const toggleMute = useCallback((): void => {
    dispatch({ type: 'TOGGLE_MUTE' });
  }, []);

  const loadTrack = useCallback((trackIndex: number): void => {
    // Signal which track play() should use — consumed on the next play() call.
    pendingTrackIndexRef.current = trackIndex;
    dispatch({ type: 'LOAD_TRACK', payload: { trackIndex } });
  }, []);

  // ── Context value ─────────────────────────────────────────────────────────

  const controls: AudioControls = useMemo(
    () => ({
      play,
      pause,
      toggle,
      next,
      prev,
      seek,
      setVolume,
      toggleMute,
      loadTrack,
    }),
    [play, pause, toggle, next, prev, seek, setVolume, toggleMute, loadTrack],
  );

  const value = useMemo(
    () => ({ state, controls, deviceId }),
    [state, controls, deviceId],
  );

  return (
    <SpotifyPlayerContext.Provider value={value}>
      {children}
    </SpotifyPlayerContext.Provider>
  );
}
