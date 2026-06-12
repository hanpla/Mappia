import { ReactNode } from 'react';

import ProfileMenu from '@/components/profile-ui/ProfileMenu';
import SideMenu from '@/components/profile-ui/SideMenu';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <section className="grid grid-cols-1 gap-8 pt-6 md:grid-cols-12 md:gap-15">
      <ProfileMenu />
      <aside className="hidden w-full md:col-span-4 md:block md:max-w-85">
        <SideMenu />
      </aside>
      <div className="w-full md:col-span-8">{children}</div>
    </section>
  );
}
