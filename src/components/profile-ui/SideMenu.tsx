'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import useMe from '@/hooks/useMe';

import { profileMenuItems } from '@/constants/profileMenu';

import ProfileImageUpload from '@/components/common/image-upload/ProfileImageUpload';

import DefaultProfileImage from '@/assets/logo/logo_head-smile.svg';

export default function SideMenu() {
  const pathname = usePathname();
  const { data: user } = useMe();

  return (
    <div className="flex flex-col items-center rounded-xl border border-gray-50 bg-white px-3.5 py-6 shadow-[0_4px_24px_rgba(139,115,85,0.2)]">
      <div className="mb-6">
        <ProfileImageUpload
          name="profileImage"
          defaultSrc={user?.profileImageUrl}
          defaultImage={DefaultProfileImage}
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
                className={`flex w-full gap-2 rounded-2xl px-5 py-3.75 ${
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
