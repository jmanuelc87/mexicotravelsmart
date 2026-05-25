/**
 * Spotify Web Playback SDK global type declarations.
 *
 * The SDK is loaded from https://sdk.scdn.co/spotify-player.js (CDN, not npm).
 * These declarations make `window.Spotify` and `window.onSpotifyWebPlaybackSDKReady`
 * fully typed throughout the project.
 *
 * @see https://developer.spotify.com/documentation/web-playback-sdk/reference
 */

declare namespace Spotify {
  interface PlayerInit {
    /** Display name shown in Spotify Connect device list. */
    name: string;
    /**
     * Called by the SDK whenever it needs a fresh OAuth token.
     * Invoke `cb` with the token string, or an empty string on failure.
     */
    getOAuthToken: (cb: (token: string) => void) => void;
    /** Initial volume, 0–1. Defaults to 1. */
    volume?: number;
  }

  interface WebPlaybackError {
    message: string;
  }

  interface WebPlaybackReady {
    device_id: string;
  }

  interface WebPlaybackArtist {
    name: string;
    uri: string;
  }

  interface WebPlaybackImage {
    url: string;
  }

  interface WebPlaybackAlbum {
    name: string;
    uri: string;
    images: WebPlaybackImage[];
  }

  interface WebPlaybackTrack {
    uri: string;
    id: string;
    type: 'track' | 'episode' | 'ad';
    media_type: 'audio' | 'video';
    name: string;
    is_playable: boolean;
    album: WebPlaybackAlbum;
    artists: WebPlaybackArtist[];
    duration_ms: number;
  }

  interface WebPlaybackTrackWindow {
    current_track: WebPlaybackTrack;
    previous_tracks: WebPlaybackTrack[];
    next_tracks: WebPlaybackTrack[];
  }

  interface PlaybackState {
    context: {
      uri: string | null;
      metadata: Record<string, unknown> | null;
    };
    /** Current playback position in milliseconds. */
    position: number;
    /** Track duration in milliseconds. */
    duration: number;
    paused: boolean;
    shuffle: boolean;
    /** 0 = no repeat, 1 = repeat context, 2 = repeat track */
    repeat_mode: 0 | 1 | 2;
    track_window: WebPlaybackTrackWindow;
    timestamp: number;
    bitrate: number;
  }

  type PlayerEvent =
    | 'ready'
    | 'not_ready'
    | 'player_state_changed'
    | 'initialization_error'
    | 'authentication_error'
    | 'account_error'
    | 'playback_error';

  interface Player {
    /** Connect this player to Spotify Connect. */
    connect(): Promise<boolean>;
    /** Disconnect and deregister the device from Spotify Connect. */
    disconnect(): void;

    addListener(event: 'ready', callback: (data: WebPlaybackReady) => void): boolean;
    addListener(event: 'not_ready', callback: (data: WebPlaybackReady) => void): boolean;
    addListener(event: 'player_state_changed', callback: (state: PlaybackState | null) => void): boolean;
    addListener(event: 'initialization_error', callback: (error: WebPlaybackError) => void): boolean;
    addListener(event: 'authentication_error', callback: (error: WebPlaybackError) => void): boolean;
    addListener(event: 'account_error', callback: (error: WebPlaybackError) => void): boolean;
    addListener(event: 'playback_error', callback: (error: WebPlaybackError) => void): boolean;

    removeListener(event: PlayerEvent, callback?: (...args: unknown[]) => void): boolean;

    /** Get the current SDK playback state. Null if not playing. */
    getCurrentState(): Promise<PlaybackState | null>;

    /** Set player volume, 0–1. */
    setVolume(volume: number): Promise<void>;
    /** Get player volume, 0–1. */
    getVolume(): Promise<number>;

    pause(): Promise<void>;
    resume(): Promise<void>;
    togglePlay(): Promise<void>;

    /** Seek to `position_ms` milliseconds. */
    seek(position_ms: number): Promise<void>;

    previousTrack(): Promise<void>;
    nextTrack(): Promise<void>;
  }

  const Player: new (options: PlayerInit) => Player;
}

interface Window {
  Spotify: typeof Spotify;
  /** Invoked by the SDK script once it has finished loading. */
  onSpotifyWebPlaybackSDKReady: () => void;
}
