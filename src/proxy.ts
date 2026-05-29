import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const { pathname } = request.nextUrl;

  const isLoggedIn = !!(accessToken && refreshToken);

  if (isLoggedIn && ['/login', '/signup'].includes(pathname)) {
    return NextResponse.redirect(new URL('/activities', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/signup'],
};
