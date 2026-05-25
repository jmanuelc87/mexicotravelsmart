import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { type SessionData, sessionOptions } from '../../../../../lib/session';

export const runtime = 'nodejs';

interface PlayRequestBody {
  uri: string;
  deviceId: string;
}

/**
 * PUT /api/spotify/play
 *
 * BFF proxy route: accepts `{ uri, deviceId }` from the client and forwards a
 * `PUT https://api.spotify.com/v1/me/player/play` request using the server-side
 * access token from the iron-session.
 *
 * Returns 401 if the session has no access token.
 * Returns 204 on success (mirrors Spotify's response).
 */
export async function PUT(request: NextRequest): Promise<NextResponse> {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

  if (!session.access_token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  let body: PlayRequestBody;
  try {
    body = (await request.json()) as PlayRequestBody;
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { uri, deviceId } = body;

  if (!uri || !deviceId) {
    return NextResponse.json(
      { error: 'Missing uri or deviceId in request body' },
      { status: 400 },
    );
  }

  const spotifyRes = await fetch(
    `https://api.spotify.com/v1/me/player/play?device_id=${encodeURIComponent(deviceId)}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uris: [uri] }),
    },
  );

  if (spotifyRes.status === 401) {
    return NextResponse.json({ error: 'Spotify token expired' }, { status: 401 });
  }

  if (!spotifyRes.ok && spotifyRes.status !== 204) {
    const text = await spotifyRes.text();
    return NextResponse.json(
      { error: `Spotify play request failed: ${text}` },
      { status: spotifyRes.status },
    );
  }

  return new NextResponse(null, { status: 204 });
}
