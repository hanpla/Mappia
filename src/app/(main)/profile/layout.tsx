import { ReactNode } from 'react';

import SideMenu from '@/components/common/side-menu/SideMenu';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <section className="grid grid-cols-1 gap-6 pt-[72px] md:grid-cols-12 md:gap-[60px]">
      <aside className="w-full md:col-span-4 md:max-w-[340px]">
        <SideMenu />
      </aside>
      <div className="w-full md:col-span-8">{children}</div>
    </section>
  );
}
