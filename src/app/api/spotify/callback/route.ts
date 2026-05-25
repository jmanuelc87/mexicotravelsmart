import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { type SessionData, sessionOptions } from '../../../../../lib/session';

export const runtime = 'nodejs';

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}

/**
 * GET /api/spotify/callback
 *
 * Handles the Spotify OAuth callback:
 * 1. Validates `state` against the stored `oauth_state` (CSRF protection).
 * 2. Exchanges the authorization `code` + `code_verifier` for tokens.
 * 3. Stores `access_token`, `refresh_token`, and `expires_at` in the session.
 * 4. Clears PKCE fields from the session.
 * 5. Redirects the user to `/media`.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  // Spotify returned an error (e.g. user denied access)
  if (error) {
    return NextResponse.redirect(
      new URL(`/?error=${encodeURIComponent(error)}`, request.url),
    );
  }

  if (!code || !state) {
    return NextResponse.json(
      { error: 'Missing code or state parameter' },
      { status: 400 },
    );
  }

  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

  // CSRF check
  if (!session.oauth_state || session.oauth_state !== state) {
    return NextResponse.json(
      { error: 'State mismatch — possible CSRF attempt' },
      { status: 400 },
    );
  }

  const { code_verifier } = session;

  if (!code_verifier) {
    return NextResponse.json(
      { error: 'Missing code_verifier in session' },
      { status: 400 },
    );
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json(
      { error: 'Missing Spotify environment variables' },
      { status: 500 },
    );
  }

  // Exchange code for tokens
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier,
  });

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const tokenRes = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!tokenRes.ok) {
    const text = await tokenRes.text();
    return NextResponse.json(
      { error: `Token exchange failed: ${text}` },
      { status: 400 },
    );
  }

  const tokenData = (await tokenRes.json()) as SpotifyTokenResponse;

  // Store tokens, clear PKCE fields
  session.access_token = tokenData.access_token;
  session.refresh_token = tokenData.refresh_token;
  session.expires_at = Date.now() + tokenData.expires_in * 1_000;
  session.code_verifier = undefined;
  session.oauth_state = undefined;
  await session.save();

  return NextResponse.redirect(new URL('/', request.url));
}
