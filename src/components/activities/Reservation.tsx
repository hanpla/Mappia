'use client';

import useReservation from '@/hooks/useReservation';

import { ActivityDetailContent } from '@/types/activities';

import Button from '../common/button/Button';
import CalendarReverse from '../common/calendar/CalendarReverse';
import LogoJoy from '../common/logo/LogoJoy';
import ConfirmModal from '../common/modal/ConfirmModal';

interface ReservationProps {
  activity: ActivityDetailContent;
}

export default function Reservation({ activity }: ReservationProps) {
  const { id, price } = activity;

  const {
    currentYear,
    currentMonth,
    availableSchedules,
    selectedDateStr,
    selectedTimeSlot,
    setSelectedTimeSlot,
    headCount,
    isModalOpen,
    setIsModalOpen,
    totalPrice,
    isSelectedDateInCurrentMonth,
    selectedDateTimes,
    handleDateChange,
    handleMonthChange,
    handleDecrease,
    handleIncrease,
    handleReservation,
    handleNavigation,
  } = useReservation(id, price);

  return (
    <section className="border-beige-8B7 space-y-6 rounded-3xl border bg-white p-7.5 shadow-[0_4px_16px_rgba(17,34,17,0.05)]">
      <div>
        <span className="text2xl-bold">₩ {price.toLocaleString()}</span>
        <span className="textxl-medium text-[#79747E]"> / 인</span>
      </div>

      <div className="space-y-2">
        <label className="textlg-bold block">날짜</label>
        <div className="transition-all">
          <CalendarReverse
            currentYear={currentYear}
            currentMonth={currentMonth}
            selectedDateStr={selectedDateStr}
            onDateClick={handleDateChange}
            availableDates={availableSchedules.map((s) => s.date)}
            onMonthChange={handleMonthChange}
          />
        </div>
      </div>

      <div className="flex flex-row items-center justify-between">
        <label className="textlg-bold block">참여 인원 수</label>
        <div className="border-gray-EEE flex w-35 items-center justify-between rounded-3xl border px-4.75 py-1.5">
          <button
            type="button"
            onClick={handleDecrease}
            className="text-gray-4B4 flex h-5 w-5 cursor-pointer items-center justify-center outline-none"
          >
            −
          </button>
          <span className="textlg-bold text-gray-4B4">{headCount}</span>
          <button
            type="button"
            onClick={handleIncrease}
            className="text-gray-4B4 flex h-5 w-5 cursor-pointer items-center justify-center outline-none"
          >
            +
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="textlg-bold block">예약 가능한 시간</label>
        <div className="space-y-3">
          {!isSelectedDateInCurrentMonth ? (
            <p className="text-gray-4B4 py-2 text-center text-sm">
              날짜를 먼저 선택해 주세요.
            </p>
          ) : selectedDateTimes.length === 0 ? (
            <p className="text-gray-4B4 py-2 text-center text-sm">
              예약 가능한 시간이 없습니다.
            </p>
          ) : (
            selectedDateTimes.map((time) => {
              const isTimeSelected = selectedTimeSlot?.id === time.id;

              return (
                <Button
                  key={time.id}
                  onClick={() => setSelectedTimeSlot(time)}
                  variant={isTimeSelected ? 'solid' : 'outline'}
                  hasHover={false}
                  className="w-full"
                >
                  {time.startTime} ~ {time.endTime}
                </Button>
              );
            })
          )}
        </div>
      </div>

      <div className="border-t-beige-8B7 flex flex-row items-center justify-between border-t pt-5">
        <div className="flex flex-row gap-1.5">
          <span className="textxl-medium text-[#79747E]">총 합계</span>
          <span className="textxl-bold">₩ {totalPrice.toLocaleString()}</span>
        </div>
        <Button
          variant="solid"
          onClick={handleReservation}
          disabled={!selectedTimeSlot}
          hasHover={false}
          className={!selectedTimeSlot ? 'cursor-not-allowed' : ''}
        >
          예약하기
        </Button>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        icon={<LogoJoy className="h-13 w-13 md:h-20 md:w-20" />}
        message="예약이 완료되었습니다."
        cancelText="닫기"
        confirmText="예약확인"
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleNavigation}
      />
    </section>
  );
}
