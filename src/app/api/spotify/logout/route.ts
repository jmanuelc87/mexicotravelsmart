import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { type SessionData, sessionOptions } from '../../../../../lib/session';

export const runtime = 'nodejs';

/**
 * POST /api/spotify/logout
 *
 * Destroys the iron-session cookie, effectively disconnecting the user's
 * Spotify account. Safe to call even when no session is active.
 *
 * Redirects to `/media` so the page re-renders in the locked state.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

  session.destroy();
  await session.save();

  return NextResponse.redirect(new URL('/', request.url));
}
