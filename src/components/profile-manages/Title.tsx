import Button from '../common/button/Button';

export default function Title() {
  return (
    <div className="mt-4 flex items-center justify-between">
      <h2 className="text2xl-bold md:text3xl-bold text-black-1B1">
        내 체험 관리
      </h2>
      <Button className="bg-brown-2A2 w-30 p-0">체험 등록하기</Button>
    </div>
  );
}
