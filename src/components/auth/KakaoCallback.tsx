'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { isAxiosError } from 'axios';

import { useAuthStore } from '@/stores/authStore';
import useToastStore from '@/stores/toastStore';

import { signInKakao, signUpKakao } from '@/lib/api/auth';
import { getApiErrorMessage } from '@/lib/utils/error';
import { getKakaoAuthUrl } from '@/lib/utils/kakao';

import type { LoginResponse } from '@/types/auth';

interface Props {
  code?: string;
  state?: string;
}

const KAKAO_ERROR_MESSAGE = '카카오 로그인에 실패했습니다.';

// 인가코드가 1회용이라 가입 단계에서 닉네임을 입력받을 수 없어 자동 생성한다.
// 코드가 1회용이면 닉네임 충돌 시 같은 코드로 재시도가 불가능하므로, 10자 한도
// 안에서 넓은 난수 공간(kakao + base36 5자)으로 충돌 확률을 낮춘다.
// (추후 가입 시 닉네임 입력 UI로 대체 권장)
const generateNickname = () =>
  `kakao${Math.random().toString(36).slice(2, 7).padEnd(5, '0')}`;

export default function KakaoCallback({ code, state }: Props) {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const showToast = useToastStore((s) => s.showToast);

  useEffect(() => {
    if (!code) {
      showToast('error', KAKAO_ERROR_MESSAGE);
      router.replace('/login');
      return;
    }

    // 인가코드는 1회용. StrictMode 이중 실행/리마운트로 같은 코드가 두 번
    // 소비되면 두 번째 호출이 "잘못된 인가 코드"로 실패하므로, 코드 값 기준으로
    // 한 번만 처리되도록 잠근다. (sessionStorage는 동기적이고 탭 내내 유지됨)
    const guardKey = `kakao_oauth_${code}`;
    if (sessionStorage.getItem(guardKey)) return;
    sessionStorage.setItem(guardKey, '1');

    const succeed = (data: LoginResponse) => {
      setAuth(data);
      showToast('success', '로그인에 성공했습니다.');
      router.refresh();
      router.replace('/');
    };

    const fail = (err: unknown) => {
      showToast('error', getApiErrorMessage(err, KAKAO_ERROR_MESSAGE));
      router.replace('/login');
    };

    const run = async () => {
      // 가입 의도로 재인증되어 돌아온 경우: 새 인가코드로 회원가입.
      // succeed()는 try 밖에서 호출 — 가입 성공 후 setAuth/router 오류가
      // '가입 실패'로 오인되지 않게 한다.
      if (state === 'signup') {
        let result: LoginResponse;
        try {
          result = (await signUpKakao(code, generateNickname())).data;
        } catch (err) {
          fail(err);
          return;
        }
        succeed(result);
        return;
      }

      // 기본: 로그인 시도
      let result: LoginResponse;
      try {
        result = (await signInKakao(code)).data;
      } catch (err) {
        // 백엔드가 404로 응답(미가입)했을 때만 가입용으로 재인증(새 코드 발급).
        // 그 외 4xx(잘못된 요청 등)나 5xx/네트워크 오류는 재인증해도 소용없으므로 에러를 표시한다.
        const status = isAxiosError(err) ? err.response?.status : undefined;
        if (status === 404) {
          // replace로 죽은 콜백(code=A)을 history에 남기지 않는다.
          window.location.replace(getKakaoAuthUrl('signup'));
        } else {
          fail(err);
        }
        return;
      }
      succeed(result);
    };

    run();
  }, [code, state, setAuth, showToast, router]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="textlg-regular text-gray-797">카카오 로그인 처리 중...</p>
    </main>
  );
}
