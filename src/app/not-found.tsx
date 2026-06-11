import Logo404 from '@/components/common/logo/Logo404';
import NotFoundLink from '@/components/not-found-error/CallbackLink';
import Container from '@/components/not-found-error/Container';
import Msg from '@/components/not-found-error/Msg';

export default function NotFound() {
  return (
    <Container>
      <div className="mb-20 flex flex-col items-center justify-center">
        <Logo404 size={100} />
        <Msg
          title="페이지를 찾을 수 없습니다"
          description="요청하신 페이지가 존재하지 않거나 변경되었을 수 있습니다."
        />
        <div className="mt-8">
          <NotFoundLink />
        </div>
      </div>
    </Container>
  );
}
