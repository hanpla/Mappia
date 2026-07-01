import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

import { ACCESS_TOKEN_KEY } from '@/lib/utils/token';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const STRIPPED_REQUEST_HEADERS = [
  'host',
  'connection',
  'content-length',
  'cookie',
];

const handler = async (
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) => {
  // Next 16: route handler의 params와 cookies()는 모두 비동기다.
  const { path } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;

  const headers = new Headers(request.headers);
  STRIPPED_REQUEST_HEADERS.forEach((name) => headers.delete(name));
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const targetUrl = `${BASE_URL}/${path.join('/')}${request.nextUrl.search}`;
  const hasBody = request.method !== 'GET' && request.method !== 'HEAD';

  try {
    const backendResponse = await fetch(targetUrl, {
      method: request.method,
      headers,
      body: hasBody ? await request.arrayBuffer() : undefined,
      cache: 'no-store',
    });

    const responseHeaders = new Headers();
    const contentType = backendResponse.headers.get('content-type');
    if (contentType) {
      responseHeaders.set('content-type', contentType);
    }

    return new NextResponse(backendResponse.body, {
      status: backendResponse.status,
      headers: responseHeaders,
    });
  } catch {
    return NextResponse.json({ message: 'Bad Gateway' }, { status: 502 });
  }
};

export {
  handler as GET,
  handler as POST,
  handler as PATCH,
  handler as PUT,
  handler as DELETE,
};
