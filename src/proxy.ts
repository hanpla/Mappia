import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const isTokenAlive = (token: string): boolean => {
  try {
    const raw = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const base64 = raw.padEnd(raw.length + ((4 - (raw.length % 4)) % 4), '=');
    const payload = JSON.parse(atob(base64)) as { exp?: number };
    return !!payload.exp && payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

const AUTH_ROUTES = ['/login', '/signup'];
const PROTECTED_PREFIXES = ['/profile', '/my-activities'];

const hasSession = (request: NextRequest): boolean => {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  return (!!accessToken && isTokenAlive(accessToken)) || !!refreshToken;
};

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const isLoggedIn = hasSession(request);

  if (isLoggedIn && (pathname === '/' || AUTH_ROUTES.includes(pathname))) {
    return NextResponse.redirect(new URL('/activities', request.url));
  }

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (!isLoggedIn && isProtected) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callback', pathname + request.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile',
    '/profile/:path*',
    '/my-activities/:path*',
  ],
};
