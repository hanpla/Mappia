import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function isTokenAlive(token: string): boolean {
  try {
    const raw = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const base64 = raw.padEnd(raw.length + ((4 - (raw.length % 4)) % 4), '=');
    const payload = JSON.parse(atob(base64)) as { exp?: number };
    return !!payload.exp && payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const { pathname } = request.nextUrl;

  if (
    refreshToken &&
    isTokenAlive(refreshToken) &&
    ['/login', '/signup'].includes(pathname)
  ) {
    return NextResponse.redirect(new URL('/activities', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/signup'],
};
