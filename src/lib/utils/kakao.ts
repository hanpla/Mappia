// 카카오 인가 요청 URL 빌더.
// state='signup'을 붙이면 콜백이 '가입 의도'로 인식한다 (인가코드는 1회용이라
// 로그인 실패 시 새 코드를 받기 위해 재인증할 때 사용).
export function getKakaoAuthUrl(state?: 'signup') {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY ?? '',
    redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI ?? '',
  });
  if (state) params.set('state', state);

  return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
}
