import type { Metadata } from 'next';
import { ReactNode } from 'react';

import '@/styles/globals.css';

import ToastContainer from '@/components/common/toast/ToastContainer';

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
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko" className="antialiased">
      <body className="bg-ivory-F2E">
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
