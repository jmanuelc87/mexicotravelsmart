import type { SessionOptions } from 'iron-session';

/**
 * Typed interface for all data stored in the iron-session encrypted cookie.
 *
 * PKCE fields (`code_verifier`, `oauth_state`) are populated during the
 * authorization redirect and cleared after a successful token exchange.
 *
 * Token fields are populated after the OAuth callback and kept server-side;
 * the `refresh_token` is never sent to the browser.
 */
export interface SessionData {
  /** PKCE code verifier — generated in /api/spotify/auth, consumed in /api/spotify/callback */
  code_verifier?: string;
  /** Random state parameter for CSRF protection */
  oauth_state?: string;
  /** Spotify access token (short-lived, ~1 hour) */
  access_token?: string;
  /** Spotify refresh token (long-lived, never sent to browser) */
  refresh_token?: string;
  /** Unix timestamp (ms) when the access token expires */
  expires_at?: number;
}

/**
 * iron-session v8 configuration options.
 *
 * `password` must be at least 32 characters.
 * `cookieName` is the name of the httpOnly encrypted cookie.
 */
export const sessionOptions: SessionOptions = {
  cookieName: 'mts_spotify_session',
  password: process.env.SESSION_SECRET as string,
  cookieOptions: {
    // In production set secure: true (HTTPS only)
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
  },
  ttl: 60 * 60 * 24 * 7, // 7 days
};
