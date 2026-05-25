export const runtime = 'nodejs';

interface TokenCache {
  token: string;
  expiresAt: number; // Unix ms
}

let cache: TokenCache | null = null;

/**
 * Resolves any in-flight token request so parallel callers share one fetch.
 */
let inflightRequest: Promise<string> | null = null;

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
/** Refresh the token this many milliseconds before it actually expires. */
const REFRESH_BUFFER_MS = 60_000;

async function fetchToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      'Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET env vars',
    );
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    'base64',
  );

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Spotify token request failed (${res.status}): ${text}`);
  }

  const data = (await res.json()) as { access_token: string; expires_in: number };

  cache = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1_000 - REFRESH_BUFFER_MS,
  };

  return cache.token;
}

/**
 * Returns a valid Spotify client-credentials access token.
 *
 * - Serves from the module-scoped in-memory cache when still fresh.
 * - Refreshes ≥ 60 s before expiry.
 * - Deduplicates concurrent calls: two parallel invocations produce exactly
 *   one network request.
 */
export async function getSpotifyToken(): Promise<string> {
  // Cache hit
  if (cache && Date.now() < cache.expiresAt) {
    return cache.token;
  }

  // Deduplicate parallel calls — all waiters share the same fetch promise.
  if (inflightRequest) {
    return inflightRequest;
  }

  inflightRequest = fetchToken().finally(() => {
    inflightRequest = null;
  });

  return inflightRequest;
}
