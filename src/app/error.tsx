'use client';

import LogoSad from '@/components/common/logo/LogoSad';
import CallbackLink from '@/components/not-found-error/CallbackLink';
import Container from '@/components/not-found-error/Container';
import Msg from '@/components/not-found-error/Msg';
import RetryButton from '@/components/not-found-error/RetryButton';

interface ErrorProps {
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <Container>
      <LogoSad size={100} />
      <Msg
        title="오류가 발생했습니다"
        description="일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
      />
      <div className="mt-8 flex flex-col gap-4 md:flex-row">
        <RetryButton onClick={reset} />
        <NotFoundLink />
      </div>
    </Container>
  );
}
