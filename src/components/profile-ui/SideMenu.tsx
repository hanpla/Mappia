'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { getMe } from '@/lib/api/users';

import { profileMenuItems } from '@/constants/profileMenu';

import ProfileImageUpload from '../common/image-upload/ProfileImageUpload';

export default function SideMenu() {
  const pathname = usePathname();
  const { data: user } = useQuery({ queryKey: ['me'], queryFn: getMe });

  return (
    <div className="flex flex-col items-center rounded-xl border border-gray-50 bg-white p-[24px_14px] shadow-[0_4px_24px_rgba(139,115,85,0.2)]">
      <div className="mb-6">
        <ProfileImageUpload
          name="profileImage"
          defaultSrc={user?.profileImageUrl}
        />
      </div>
      <ul className="w-full space-y-[14px]">
        {profileMenuItems.map((item) => {
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
