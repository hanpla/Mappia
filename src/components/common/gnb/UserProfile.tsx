'use client';

import Image from 'next/image';
import { useState } from 'react';

import useClickOutside from '@/hooks/useClickOutside';

import DefaultProfileImage from '@/assets/logo/logo_head-smile.svg';

import UserDropdown from './UserDropdown';

interface Props {
  nickname?: string;
  profileImageUrl?: string;
  isLoading: boolean;
}

export default function UserProfile({
  nickname,
  profileImageUrl,
  isLoading,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2.5">
        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
        <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex cursor-pointer items-center justify-center gap-2.5"
      >
        <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-gray-100">
          {profileImageUrl ? (
            <Image
              src={profileImageUrl}
              alt="프로필 이미지"
              fill
              sizes="32px"
              className="object-cover"
            />
          ) : (
            <Image
              src={DefaultProfileImage}
              alt="기본 프로필 이미지"
              width={91}
              height={89}
              className="h-3/4 w-3/4 object-contain opacity-60"
            />
          )}
        </div>
        <span>{nickname}</span>
      </button>
      {isOpen && <UserDropdown onClose={() => setIsOpen(false)} />}
    </div>
  );
}
