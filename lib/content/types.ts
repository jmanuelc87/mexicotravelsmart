export interface Phrase {
  es: string;
  trans: string;
  pron?: string;
}

export interface IntlDestination {
  emoji: string;
  name: string;
  tag: string;
  page?: string;
}

export interface NatDestination {
  emoji: string;
  name: string;
  tag: string;
  page?: string;
}

export interface TrackAlbumArt {
  url: string;
  width: number;
  height: number;
}

export interface Track {
  title: string;
  artist: string;
  /** Spotify track ID. Null when the track has no Spotify match. */
  spotifyId: string | null;
  /**
   * 30-second preview URL served by Spotify.
   * Null when Spotify has not made a preview available for this track
   * (common after the late-2024 preview deprecation for many catalogue titles).
   * Tracks with a null previewUrl are retained in the list and displayed
   * without an audio control — they must NOT be silently dropped.
   */
  previewUrl: string | null;
  /** Album artwork at ~300 × 300 px. Null when spotifyId is null. */
  albumArt: TrackAlbumArt | null;
}

export interface CountryTip {
  id: string;
  visa: string;
  tips: string;
  culture: string;
}
