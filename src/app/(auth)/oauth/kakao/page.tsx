import KakaoCallback from '@/components/auth/KakaoCallback';

export default async function KakaoCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; state?: string }>;
}) {
  const { code, state } = await searchParams;

  return <KakaoCallback code={code} state={state} />;
}
