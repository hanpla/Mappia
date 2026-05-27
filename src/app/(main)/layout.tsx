import { ReactNode } from 'react';

import Gnb from '@/components/common/Gnb/Gnb';

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main>
      <Gnb />
      {children}
    </main>
  );
}
