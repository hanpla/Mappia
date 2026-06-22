'use client';

import { getAccessToken } from '@/lib/utils/token';

import useMe from '@/hooks/useMe';

export default function useActivityOwner(activityUserId: number) {
  const hasToken = typeof window !== 'undefined' && !!getAccessToken();

  const { data: currentUser } = useMe({
    retry: false,
    enabled: hasToken,
  });

  const isOwner = !!(currentUser && currentUser.id === activityUserId);

  return { isOwner };
}
