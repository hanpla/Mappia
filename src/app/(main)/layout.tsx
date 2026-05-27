import { ReactNode } from 'react';

import Footer from '@/components/common/footer/Footer';
import Gnb from '@/components/common/gnb/Gnb';

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Gnb />
      <main>{children}</main>
      <Footer />
    </>
  );
}
