'use client';

import useReservation from '@/hooks/useReservation';

import { MyReservationItem } from '@/types/my-reservations';

import Button from '@/components/common/button/Button';
import CalendarReverse from '@/components/common/calendar/CalendarReverse';
import IconMinus from '@/components/common/icon/IconMinus';
import IconPlus from '@/components/common/icon/IconPlus';
import StandardModal from '@/components/common/modal/StandardModal';

interface ReservationEditModalProps {
  item: MyReservationItem;
  isOpen: boolean;
  isSubmitting: boolean;
  price: number;
  onClose: () => void;
  onConfirm: (scheduleId: number, headCount: number) => void;
}

export default function ReservationEditModal({
  item,
  isOpen,
  isSubmitting,
  price,
  onClose,
  onConfirm,
}: ReservationEditModalProps) {
  const {
    currentYear,
    currentMonth,
    availableSchedules,
    selectedDateStr,
    selectedTimeSlot,
    setSelectedTimeSlot,
    headCount,
    isSelectedDateInCurrentMonth,
    selectedDateTimes,
    handleDateChange,
    handleMonthChange,
    handleDecrease,
    handleIncrease,
  } = useReservation(item.activity.id, item.totalPrice / item.headCount, {
    initialDate: item.date,
    initialTimeSlot: {
      id: item.scheduleId,
      startTime: item.startTime,
      endTime: item.endTime,
    },
    initialHeadCount: item.headCount,
  });

  return (
    <StandardModal
      isOpen={isOpen}
      onClose={() => !isSubmitting && onClose()}
      className="pt-0"
    >
      <div className="flex h-[500px] w-full max-w-[480px] flex-col p-0 sm:h-[600px] md:h-[530px]">
        <div className="mb-0 flex h-3 items-center justify-between">
          <h2 className="text-black-1B1 -mt-4 mb-5 flex h-0 items-center text-lg font-bold">
            {item.activity.title}
          </h2>
          <div className="w-6" />
        </div>
        <div className="min-h-0 flex-1 space-y-6 overflow-y-auto pr-8 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:max-h-10 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-transparent">
          <div className="space-y-2">
            <label className="textlg-bold block">날짜</label>
            <CalendarReverse
              currentYear={currentYear}
              currentMonth={currentMonth}
              selectedDateStr={selectedDateStr}
              onDateClick={handleDateChange}
              availableDates={availableSchedules.map((s) => s.date)}
              onMonthChange={handleMonthChange}
            />
          </div>
          <div className="flex flex-row items-center justify-between">
            <label className="textlg-bold block">참여 인원 수</label>
            <div className="border-gray-EEE flex w-35 items-center justify-between rounded-3xl border px-4.75 py-1.5">
              <button type="button" onClick={handleDecrease}>
                <IconMinus size="16" color="#4B4B4B" />
              </button>
              <span className="textlg-bold text-gray-4B4">{headCount}</span>
              <button type="button" onClick={handleIncrease}>
                <IconPlus size="16" color="#4B4B4B" />
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
                selectedDateTimes.map((time) => (
                  <Button
                    key={time.id}
                    onClick={() => setSelectedTimeSlot(time)}
                    variant={
                      selectedTimeSlot?.id === time.id ? 'solid' : 'outline'
                    }
                    hasHover={false}
                    className="w-full"
                  >
                    {time.startTime} ~ {time.endTime}
                  </Button>
                ))
              )}
            </div>
          </div>
        </div>
        <Button
          variant="solid"
          hasHover={false}
          disabled={!selectedTimeSlot || isSubmitting}
          onClick={() => onConfirm(selectedTimeSlot!.id, headCount)}
          className="text-white-FFF mt-6 h-13.5 w-full rounded-xl font-bold"
        >
          {isSubmitting ? '수정 중...' : '수정하기'}
        </Button>
      </div>
    </StandardModal>
  );
}
