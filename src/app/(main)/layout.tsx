import { ReactNode } from 'react';

import Footer from '@/components/common/footer/Footer';
import Gnb from '@/components/common/gnb/Gnb';

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Gnb />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
