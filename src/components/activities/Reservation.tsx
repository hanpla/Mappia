import Button from '../common/button/Button';
import CalendarReverse from '../common/calendar/CalendarReverse';

export default function Reservation() {
  return (
    <section className="border-beige-8B7 space-y-6 rounded-3xl border bg-white p-[30px] shadow-[0_4px_16px_rgba(17,34,17,0.05)]">
      <div>
        <span className="text2xl-bold">₩ 1,000</span>
        <span className="textxl-medium text-[#79747E]"> / 인</span>
      </div>

      <div className="space-y-2">
        <label className="textlg-bold block">날짜</label>
        <CalendarReverse />
      </div>

      <div className="flex flex-row items-center justify-between">
        <label className="textlg-bold block">참여 인원 수</label>
        <div className="border-gray-EEE flex w-[140px] items-center justify-between rounded-3xl border px-[19px] py-[6px]">
          <button
            type="button"
            className="text-gray-4B4 flex h-[20px] w-[20px] cursor-pointer items-center justify-center outline-none"
          >
            −
          </button>
          <span className="textlg-bold text-gray-4B4">10</span>
          <button
            type="button"
            className="text-gray-4B4 flex h-[20px] w-[20px] cursor-pointer items-center justify-center outline-none"
          >
            +
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="textlg-bold block">예약 가능한 시간</label>
        <div className="space-y-3">
          <Button variant="outline" className="w-full">
            14:00 ~ 15:00
          </Button>
          <Button variant="solid" className="w-full">
            15:00 ~ 16:00
          </Button>
        </div>
      </div>

      <div className="border-t-beige-8B7 flex flex-row items-center justify-between border-t pt-[20px]">
        <div className="flex flex-row gap-[6px]">
          <span className="textxl-medium text-[#79747E]">총 합계</span>
          <span className="textxl-bold">₩ 10,000</span>
        </div>
        <Button variant="solid">예약하기</Button>
      </div>
    </section>
  );
}
