'use client';

import Image from 'next/image';
import { useState } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';

import UserDropdown from './UserDropdown';

export default function UserProfile() {
  const profileSrc = null;
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex cursor-pointer items-center justify-center gap-2.5"
      >
        <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-gray-100">
          {profileSrc ? (
            <Image
              src={profileSrc}
              alt="프로필 이미지"
              fill
              className="object-cover"
            />
          ) : null}
        </div>
        <span>Nickname</span>
      </button>
      {isOpen && <UserDropdown onClose={() => setIsOpen(false)} />}
    </div>
  );
}
