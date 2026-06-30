import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

import { ACCESS_TOKEN_KEY } from '@/lib/utils/token';

// 인증 요청 프록시(BFF). 브라우저의 privateInstance는 외부 API를 직접 호출하지 않고
// 동일 출처(/api)의 이 핸들러로 보낸다. 핸들러가 httpOnly accessToken 쿠키를 읽어
// Authorization 헤더로 주입한 뒤 백엔드로 포워딩한다. 덕분에 액세스 토큰을 클라이언트
// JS에 전혀 노출하지 않고도(httpOnly: true) 인증을 유지할 수 있어 XSS 토큰 탈취를 막는다.
//
// /api/weather, /api/ai-review-analysis 같은 구체 경로는 Next 라우팅 우선순위상 이
// catch-all보다 먼저 매칭되므로 영향받지 않는다.

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 프록시가 다시 계산해야 하거나 백엔드로 넘기면 안 되는 요청 헤더.
// host/connection: 대상이 외부 API로 바뀌므로 fetch가 다시 설정해야 한다.
// content-length: 본문을 재전송하며 fetch가 다시 계산한다.
// cookie: 토큰은 Authorization으로만 전달하고 브라우저 쿠키는 백엔드로 흘리지 않는다.
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

  // 원본 요청 헤더를 복제해 Content-Type(멀티파트 boundary 포함) 등을 보존하되,
  // 호스트/쿠키 등은 제거하고 토큰은 Authorization으로만 전달한다.
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
      // arrayBuffer로 본문을 그대로 전달하면 JSON·멀티파트 모두 바이트 단위로 보존된다.
      body: hasBody ? await request.arrayBuffer() : undefined,
      cache: 'no-store',
    });

    // 상태 코드를 그대로 전달해야 클라이언트 인터셉터가 401을 감지해 토큰을 갱신할 수 있다.
    // content-encoding은 fetch가 이미 본문을 디코딩하므로 전달하지 않는다(content-type만 전달).
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
