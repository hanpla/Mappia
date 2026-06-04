import Button from '../common/button/Button';

export default function MobileReservation() {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-[#E6E6E6] bg-white p-[18px_24px] lg:hidden">
      <div className="mb-[12px] flex flex-row items-center justify-between">
        <div className="flex flex-row gap-[6px]">
          <span className="text2lg-bold">₩ 1,000</span>
          <span className="textlg-medium text-[#79747E]">/ 1명</span>
        </div>
        <button className="textlg-bold text-brown-2A2 underline decoration-2 underline-offset-4">
          날짜 선택하기
        </button>
      </div>
      <Button className="w-full">예약하기</Button>
    </div>
  );
}
