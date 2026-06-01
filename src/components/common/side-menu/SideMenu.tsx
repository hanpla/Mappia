'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import IconSidemenuCalendar from '../icon/IconSidemenuCalendar';
import IconSidemenuList from '../icon/IconSidemenuList';
import IconSidemenuSetting from '../icon/IconSidemenuSetting';
import IconSidemenuUser from '../icon/IconSidemenuUser';
import ProfileImageUpload from '../image-upload/ProfileImageUpload';

interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string; color?: string }>;
}

interface SideMenuProps {
  initialProfileSrc?: string;
  onProfileChange?: (file: File) => void;
}

const menuItems: MenuItem[] = [
  { name: '내 정보', href: '/profile/info', icon: IconSidemenuUser },
  { name: '예약내역', href: '/profile/reservations', icon: IconSidemenuList },
  { name: '내 체험 관리', href: '/profile/manages', icon: IconSidemenuSetting },
  { name: '예약 현황', href: '/profile/dashboard', icon: IconSidemenuCalendar },
];

export default function SideMenu({
  initialProfileSrc,
  onProfileChange,
}: SideMenuProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center rounded-xl border border-gray-50 bg-white p-[24px_14px] shadow-[0_4px_24px_rgba(139,115,85,0.2)]">
      <div className="mb-6">
        <ProfileImageUpload
          name="profileImage"
          defaultSrc={initialProfileSrc}
          onChange={(file) => onProfileChange?.(file)}
        />
      </div>
      <ul className="w-full space-y-[14px]">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex w-full gap-2 rounded-2xl p-[15px_20px] ${
                  isActive
                    ? 'bg-khaki-6B5 text-white'
                    : 'hover:bg-ivory-F2E text-gray-600'
                }`}
              >
                <Icon
                  className="h-6 w-6"
                  color={isActive ? 'white' : '#707177'}
                />
                <span className="text-textlg-medium">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
