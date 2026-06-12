import { NextRequest, NextResponse } from 'next/server';

const BOT_API_URL = process.env.BOT_API_URL;
const BOT_API_KEY = process.env.BOT_API_KEY;

type Params = { path: string[] };

async function proxy(req: NextRequest, params: Params): Promise<NextResponse> {
  if (!BOT_API_URL) {
    return NextResponse.json({ error: 'Bot API not configured' }, { status: 500 });
  }

  const targetUrl = `${BOT_API_URL}/${params.path.join('/')}${req.nextUrl.search}`;

  const headers: Record<string, string> = {
    'X-API-Key': BOT_API_KEY ?? '',
  };

  const deviceId = req.headers.get('X-Device-ID');
  if (deviceId) headers['X-Device-ID'] = deviceId;

  const contentType = req.headers.get('Content-Type');
  if (contentType) headers['Content-Type'] = contentType;

  const hasBody = req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH';

  const upstream = await fetch(targetUrl, {
    method: req.method,
    headers,
    body: hasBody ? req.body : undefined,
    // @ts-expect-error — Node 18+ fetch supports duplex for streaming bodies
    duplex: hasBody ? 'half' : undefined,
  });

  const body = await upstream.arrayBuffer();

  const responseHeaders = new Headers();
  const forwardedHeaders = ['content-type', 'retry-after'];
  for (const h of forwardedHeaders) {
    const v = upstream.headers.get(h);
    if (v) responseHeaders.set(h, v);
  }

  return new NextResponse(body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  return proxy(req, await params);
}

export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {
  return proxy(req, await params);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<Params> }) {
  return proxy(req, await params);
}
