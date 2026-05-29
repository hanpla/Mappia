import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';

import { getMe } from '@/lib/api/me';

import '@/styles/globals.css';

import ToastContainer from '@/components/common/toast/ToastContainer';

import AuthStoreProvider from '@/providers/AuthStoreProvider';
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

  const user = accessToken ? await getMe(accessToken) : null;

  return (
    <html lang="ko" className="antialiased">
      <body className="bg-ivory-F2E" suppressHydrationWarning>
        <QueryProvider>
          <AuthStoreProvider initialProps={{ isLogin: !!user, user }}>
            {children}
          </AuthStoreProvider>
        </QueryProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
