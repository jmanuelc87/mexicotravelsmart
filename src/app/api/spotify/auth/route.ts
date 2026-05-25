import { randomBytes, createHash } from 'crypto';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { type SessionData, sessionOptions } from '../../../../../lib/session';

export const runtime = 'nodejs';

const SPOTIFY_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';

/**
 * GET /api/spotify/auth
 *
 * Initiates the Spotify OAuth 2.0 Authorization Code + PKCE flow:
 * 1. Generates a cryptographically random `code_verifier` and derives
 *    `code_challenge` via SHA-256 Base64URL encoding.
 * 2. Generates a random `oauth_state` for CSRF protection.
 * 3. Stores both in the iron-session encrypted cookie.
 * 4. Redirects the browser to Spotify's authorization endpoint.
 */
export async function GET(): Promise<NextResponse> {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

  // Generate PKCE pair
  const code_verifier = randomBytes(32).toString('base64url');
  const code_challenge = createHash('sha256')
    .update(code_verifier)
    .digest('base64url');

  // Generate CSRF state
  const oauth_state = randomBytes(16).toString('base64url');

  // Persist in session
  session.code_verifier = code_verifier;
  session.oauth_state = oauth_state;
  await session.save();

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      { error: 'Missing SPOTIFY_CLIENT_ID or SPOTIFY_REDIRECT_URI' },
      { status: 500 },
    );
  }

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: 'streaming user-read-email user-read-private',
    state: oauth_state,
    code_challenge,
    code_challenge_method: 'S256',
  });

  return NextResponse.redirect(`${SPOTIFY_AUTHORIZE_URL}?${params.toString()}`);
}
