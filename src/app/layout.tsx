import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { ReactNode, Suspense } from 'react';

import '@/styles/globals.css';

import AuthToastWatcher from '@/components/auth/AuthToastWatcher';
import ToastContainer from '@/components/common/toast/ToastContainer';

import AuthProvider from '@/providers/AuthProvider';
import QueryProvider from '@/providers/QueryProvider';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ),
  title: 'MAPPIA',
  description:
    '캘린더와 지도로 간편하게 탐색하고 예약하는 글로벌 체험 상품 공유 플랫폼',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'MAPPIA',
    description:
      '캘린더와 지도로 간편하게 탐색하고 예약하는 글로벌 체험 상품 공유 플랫폼',
    siteName: 'MAPPIA',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MAPPIA 서비스 이미지',
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  return (
    <html lang="ko" className="antialiased">
      <body className="bg-ivory-F2E overflow-x-hidden">
        <QueryProvider>
          <AuthProvider isLogin={!!accessToken || !!refreshToken}>
            {children}
          </AuthProvider>
        </QueryProvider>
        <ToastContainer />
        <Suspense fallback={null}>
          <AuthToastWatcher />
        </Suspense>
      </body>
    </html>
  );
}
