import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { type SessionData, sessionOptions } from '../../../../../lib/session';

export const runtime = 'nodejs';

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
/** Refresh proactively if the token expires within this many ms. */
const REFRESH_THRESHOLD_MS = 60_000;

interface SpotifyRefreshResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string; // Spotify may rotate the refresh token
}

/**
 * GET /api/spotify/token
 *
 * Token-vending endpoint called by the Spotify Web Playback SDK's
 * `getOAuthToken` callback. Never returns the refresh token.
 *
 * - Returns the cached access token if it's fresh (> 60 s remaining).
 * - Refreshes proactively if within 60 s of expiry.
 * - Returns 401 if there is no authenticated session.
 */
export async function GET(): Promise<NextResponse> {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

  if (!session.access_token || !session.refresh_token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const now = Date.now();
  const expiresAt = session.expires_at ?? 0;
  const needsRefresh = expiresAt - now < REFRESH_THRESHOLD_MS;

  if (!needsRefresh) {
    return NextResponse.json({ accessToken: session.access_token });
  }

  // Proactive refresh
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'Missing Spotify environment variables' },
      { status: 500 },
    );
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const refreshRes = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: session.refresh_token,
      client_id: clientId,
    }).toString(),
  });

  if (!refreshRes.ok) {
    // Refresh failed — clear session and tell the SDK there's no token
    session.destroy();
    await session.save();
    return NextResponse.json({ error: 'Token refresh failed' }, { status: 401 });
  }

  const refreshData = (await refreshRes.json()) as SpotifyRefreshResponse;

  session.access_token = refreshData.access_token;
  session.expires_at = Date.now() + refreshData.expires_in * 1_000;
  // Spotify may rotate the refresh token; update if provided
  if (refreshData.refresh_token) {
    session.refresh_token = refreshData.refresh_token;
  }
  await session.save();

  return NextResponse.json({ accessToken: session.access_token });
}
