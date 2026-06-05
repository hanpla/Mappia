'use client';

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getMe } from '@/lib/api/users';

import useClickOutside from '@/hooks/useClickOutside';

import IconNotification from '../icon/IconNotification';
import IconNotificationDot from '../icon/IconNotificationDot';
import NotificationDropdown, {
  INITIAL_NOTIFICATIONS,
} from './NotificationDropdown';
import UserProfile from './UserProfile';

export default function UserSection() {
  const { data: user } = useQuery({ queryKey: ['me'], queryFn: getMe });
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const notificationRef = useClickOutside<HTMLDivElement>(() =>
    setIsNotificationOpen(false),
  );

  const handleDismiss = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="flex items-center justify-center gap-6.25 max-md:gap-3">
      <div
        ref={notificationRef}
        className="relative flex items-center justify-center"
      >
        <button onClick={() => setIsNotificationOpen((prev) => !prev)}>
          {notifications.length > 0 ? (
            <IconNotificationDot size="24" />
          ) : (
            <IconNotification size="24" />
          )}
        </button>
        {isNotificationOpen && (
          <NotificationDropdown
            notifications={notifications}
            onDismiss={handleDismiss}
            onClose={() => setIsNotificationOpen(false)}
          />
        )}
      </div>
      <div className="flex items-center justify-center gap-6.25 max-md:gap-3">
        <div className="h-5.5 w-px bg-[#DDDDDD]" />
        <UserProfile
          nickname={user?.nickname}
          profileImageUrl={user?.profileImageUrl}
        />
      </div>
    </div>
  );
}
