'use client';

/**
 * useSpotifyPlayer
 *
 * Reads SpotifyPlayerContext and re-exports { state, controls } in the same
 * shape as useAudioPlayer, so AudioPlayer.tsx can swap between the two
 * backends without changing any downstream components.
 *
 * Controls delegation:
 *  play()       → PUT /api/spotify/play  (via SpotifyPlayerProvider)
 *  pause()      → player.pause()
 *  toggle()     → play() or pause() based on current status
 *  next()       → player.nextTrack()
 *  prev()       → player.previousTrack()
 *  seek(t)      → player.seek(t * 1000)  (seconds → ms)
 *  setVolume()  → player.setVolume()
 *  toggleMute() → reducer TOGGLE_MUTE
 *  loadTrack()  → reducer LOAD_TRACK (play() still needs to be called)
 *
 * Must be used inside a <SpotifyPlayerProvider> tree.
 */

import { useContext } from 'react';
import { SpotifyPlayerContext } from '../components/SpotifyPlayerProvider/SpotifyPlayerProvider';
import type { AudioState } from '../components/AudioPlayer/audioReducer';
import type { AudioControls } from '../components/AudioPlayer/useAudioPlayer';

// ─── Public types ─────────────────────────────────────────────────────────────

export interface UseSpotifyPlayerReturn {
  state: AudioState;
  controls: AudioControls;
  /** The Spotify Connect device ID — null until the SDK fires its `ready` event. */
  deviceId: string | null;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Consumes SpotifyPlayerContext.
 *
 * Throws if called outside of a <SpotifyPlayerProvider> — this is intentional:
 * the authenticated AudioPlayer branch always wraps in a provider, so reaching
 * this hook without one is a programming error, not a runtime edge case.
 */
export function useSpotifyPlayer(): UseSpotifyPlayerReturn {
  const ctx = useContext(SpotifyPlayerContext);

  if (!ctx) {
    throw new Error(
      'useSpotifyPlayer must be used inside a <SpotifyPlayerProvider>.',
    );
  }

  // The provider already owns and exposes fully-built controls (4.2–4.6),
  // so the hook is a thin pass-through that maintains the useAudioPlayer shape.
  return {
    state: ctx.state,
    controls: ctx.controls,
    deviceId: ctx.deviceId,
  };
}
