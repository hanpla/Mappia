'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { profileMenuItems } from '@/constants/profileMenu';

// 모바일(md 미만) 전용 상단 탭 네비게이션. 데스크톱에서는 SideMenu가 대신 표시된다.
export default function ProfileMenu() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center rounded-xl bg-white p-2 shadow-[0_4px_24px_rgba(139,115,85,0.2)] md:hidden">
      {profileMenuItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 rounded-xl px-2 py-2 text-center text-sm whitespace-nowrap transition-colors ${
              isActive
                ? 'bg-khaki-6B5 font-bold text-white'
                : 'hover:text-black-1B1 text-gray-600'
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
