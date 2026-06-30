'use client';

import useMe from '@/hooks/useMe';

import { useIsLogin } from '@/providers/AuthProvider';

export default function useActivityOwner(activityUserId: number) {
  // 액세스 토큰이 httpOnly라 클라이언트에서 직접 읽을 수 없으므로, 서버에서 주입한
  // 로그인 상태(AuthProvider)로 useMe 호출 여부를 게이팅한다.
  const isLogin = useIsLogin();

  const { data: currentUser } = useMe({
    retry: false,
    enabled: isLogin,
  });

  const isOwner = !!(currentUser && currentUser.id === activityUserId);

  return { isOwner };
}
