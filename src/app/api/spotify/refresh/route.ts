import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { type SessionData, sessionOptions } from '../../../../../lib/session';

export const runtime = 'nodejs';

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

interface SpotifyRefreshResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
}

/**
 * POST /api/spotify/refresh
 *
 * Explicitly refreshes the access token using the stored refresh token.
 * Updates the session with the new token and expiry.
 * Clears the session and returns 401 if Spotify rejects the refresh.
 *
 * This route is available for explicit refresh requests; the `/api/spotify/token`
 * route handles proactive refreshes automatically for the SDK.
 */
export async function POST(): Promise<NextResponse> {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

  if (!session.refresh_token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

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
    // Token invalid or revoked — clear session
    session.destroy();
    await session.save();
    return NextResponse.json({ error: 'Refresh token invalid or revoked' }, { status: 401 });
  }

  const data = (await refreshRes.json()) as SpotifyRefreshResponse;

  session.access_token = data.access_token;
  session.expires_at = Date.now() + data.expires_in * 1_000;
  if (data.refresh_token) {
    session.refresh_token = data.refresh_token;
  }
  await session.save();

  return NextResponse.json({ accessToken: session.access_token });
}
