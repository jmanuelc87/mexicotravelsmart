export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { getSpotifyToken } from '../token';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TrackPreview {
  id: string;
  name: string;
  artists: string[];
  albumArt: string | null;
  previewUrl: string | null;
}

/** Minimal shape we care about from the Spotify Tracks API response. */
interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    images: { url: string; width: number; height: number }[];
  };
  preview_url: string | null;
}

interface SpotifyTracksResponse {
  tracks: (SpotifyTrack | null)[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SPOTIFY_TRACKS_URL = 'https://api.spotify.com/v1/tracks';
const MAX_IDS = 50;
const CACHE_CONTROL =
  'public, s-maxage=3600, stale-while-revalidate=86400';

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function toTrackPreview(track: SpotifyTrack | null, id: string): TrackPreview {
  if (!track) {
    // Invalid / unknown ID — return null preview without failing the batch.
    return { id, name: '', artists: [], albumArt: null, previewUrl: null };
  }

  const albumArt =
    track.album.images.find((img) => img.width <= 300)?.url ??
    track.album.images[0]?.url ??
    null;

  return {
    id: track.id,
    name: track.name,
    artists: track.artists.map((a) => a.name),
    albumArt,
    previewUrl: track.preview_url,
  };
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest): Promise<NextResponse> {
  const idsParam = request.nextUrl.searchParams.get('ids');

  if (!idsParam || idsParam.trim() === '') {
    return NextResponse.json(
      { error: 'Missing required query parameter: ids' },
      { status: 400 },
    );
  }

  const ids = idsParam
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean)
    .slice(0, MAX_IDS);

  if (ids.length === 0) {
    return NextResponse.json(
      { error: 'ids parameter must contain at least one track ID' },
      { status: 400 },
    );
  }

  let token: string;
  try {
    token = await getSpotifyToken();
  } catch (err) {
    console.error('[spotify/tracks] Failed to obtain access token:', err);
    return NextResponse.json(
      { error: 'Failed to authenticate with Spotify' },
      { status: 502 },
    );
  }

  let data: SpotifyTracksResponse;
  try {
    const url = `${SPOTIFY_TRACKS_URL}?ids=${ids.join(',')}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`[spotify/tracks] Spotify API error (${res.status}):`, text);
      return NextResponse.json(
        { error: 'Upstream Spotify request failed' },
        { status: 502 },
      );
    }

    data = (await res.json()) as SpotifyTracksResponse;
  } catch (err) {
    console.error('[spotify/tracks] Network error calling Spotify API:', err);
    return NextResponse.json(
      { error: 'Upstream Spotify request failed' },
      { status: 502 },
    );
  }

  const tracks: TrackPreview[] = data.tracks.map((track, i) =>
    toTrackPreview(track, ids[i]),
  );

  return NextResponse.json(
    { tracks },
    {
      status: 200,
      headers: { 'Cache-Control': CACHE_CONTROL },
    },
  );
}
