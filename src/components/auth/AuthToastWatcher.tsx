'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import useToastStore from '@/stores/toastStore';

// 카카오 OAuth는 서버 Route Handler에서 처리되어 결과를 쿼리 파라미터로 전달한다.
// (?login=kakao=성공, ?error=kakao=실패) 여기서 토스트로 변환하고 URL을 정리한다.
export default function AuthToastWatcher() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const showToast = useToastStore((s) => s.showToast);
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;

    const isSuccess = searchParams.get('login') === 'kakao';
    const isError = searchParams.get('error') === 'kakao';
    if (!isSuccess && !isError) return;

    handled.current = true;
    if (isSuccess) showToast('success', '로그인에 성공했습니다.');
    else showToast('error', '카카오 로그인에 실패했습니다.');

    // 새로고침/뒤로가기 시 토스트가 다시 뜨지 않도록 URL에서 파라미터를 제거한다.
    const params = new URLSearchParams(searchParams);
    params.delete('login');
    params.delete('error');
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }, [searchParams, router, pathname, showToast]);

  return null;
}
