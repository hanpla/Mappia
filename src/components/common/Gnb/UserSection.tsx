'use client';

import { useState } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';

import NotificationDropdown from './NotificationDropdown';
import UserProfile from './UserProfile';

export default function UserSection() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useClickOutside<HTMLDivElement>(() =>
    setIsNotificationOpen(false),
  );

  return (
    <div className="flex items-center justify-center gap-6.25 max-md:gap-3">
      <div ref={notificationRef} className="relative">
        <button onClick={() => setIsNotificationOpen((prev) => !prev)}>
          알림
        </button>
        {isNotificationOpen && (
          <NotificationDropdown onClose={() => setIsNotificationOpen(false)} />
        )}
      </div>
      <div className="flex items-center justify-center gap-6.25 max-md:gap-3">
        <div className="mx-4 h-5.5 w-px bg-[#DDDDDD]" />
        <UserProfile />
      </div>
    </div>
  );
}
