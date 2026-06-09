'use client';

import { useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  deleteNotification,
  getMyNotifications,
} from '@/lib/api/my-notifications';
import { getMe } from '@/lib/api/users';

import useClickOutside from '@/hooks/useClickOutside';

import IconNotification from '../icon/IconNotification';
import IconNotificationDot from '../icon/IconNotificationDot';
import NotificationDropdown from './NotificationDropdown';
import UserProfile from './UserProfile';

export default function UserSection() {
  const { data: user } = useQuery({ queryKey: ['me'], queryFn: getMe });

  const queryClient = useQueryClient();
  const { data: notificationsData } = useQuery({
    queryKey: ['my-notifications'],
    queryFn: getMyNotifications,
  });
  const notifications = notificationsData?.notifications ?? [];

  const { mutate: dismiss } = useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-notifications'] });
    },
  });

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useClickOutside<HTMLDivElement>(() =>
    setIsNotificationOpen(false),
  );

  return (
    <div className="flex items-center justify-center gap-6.25 max-md:gap-3">
      <div
        ref={notificationRef}
        className="relative flex items-center justify-center"
      >
        <button onClick={() => setIsNotificationOpen((prev) => !prev)}>
          {notifications.length > 0 ? (
            <IconNotificationDot size="24" className="cursor-pointer" />
          ) : (
            <IconNotification size="24" className="cursor-pointer" />
          )}
        </button>
        {isNotificationOpen && (
          <NotificationDropdown
            notifications={notifications}
            onDismiss={dismiss}
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
