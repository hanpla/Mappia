import { ReactNode } from 'react';

import Footer from '@/components/common/footer/Footer';
import Gnb from '@/components/common/gnb/Gnb';
import RecentActivitiesButton from '@/components/recent-activities/RecentActivitiesButton';

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Gnb />
      <main className="inner flex grow flex-col">{children}</main>
      <RecentActivitiesButton />
      <Footer />
    </div>
  );
}
