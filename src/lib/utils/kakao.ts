// 카카오 인가 요청 URL 빌더.
// - state='signup': 콜백이 '가입 의도'로 인식한다 (인가코드는 1회용이라 로그인 실패
//   시 새 코드를 받기 위해 재인증할 때 사용).
// - prompt='login': 카카오 세션이 남아 있어도 로그인 화면을 다시 띄워 재인증을
//   강제한다 (자동 로그인 방지). 단 카카오톡 인앱 브라우저에서는 미지원.
interface KakaoAuthUrlOptions {
  state?: 'signup';
  prompt?: 'login';
}

export function getKakaoAuthUrl({ state, prompt }: KakaoAuthUrlOptions = {}) {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY ?? '',
    redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI ?? '',
  });
  if (state) params.set('state', state);
  if (prompt) params.set('prompt', prompt);

  return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
}

// 인가코드 1회용 처리 가드 키 (sessionStorage). 코드별로 한 번만 처리되도록 잠근다.
const KAKAO_OAUTH_GUARD_PREFIX = 'kakao_oauth_';

export const getKakaoOauthGuardKey = (code: string) =>
  `${KAKAO_OAUTH_GUARD_PREFIX}${code}`;

// 로그아웃 등 세션 정리 시 남아있는 카카오 인가코드 가드를 모두 제거한다.
// (제거 중 인덱스가 밀리므로 뒤에서부터 순회한다.)
export const clearKakaoOauthGuards = () => {
  if (typeof window === 'undefined') return;
  for (let i = sessionStorage.length - 1; i >= 0; i--) {
    const key = sessionStorage.key(i);
    if (key?.startsWith(KAKAO_OAUTH_GUARD_PREFIX)) {
      sessionStorage.removeItem(key);
    }
  }
};
