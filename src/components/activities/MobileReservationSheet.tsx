'use client';

import { Dispatch, SetStateAction, useState } from 'react';

import useBodyScrollLock from '@/hooks/useBodyScrollLock';

import { ScheduleWithTimes, TimeSlot } from '@/types/activities';

import Button from '../common/button/Button';
import CalendarReverse from '../common/calendar/CalendarReverse';
import IconMinus from '../common/icon/IconMinus';
import IconPlus from '../common/icon/IconPlus';
import IconX from '../common/icon/IconX';

interface MoblieReservationSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentYear: number;
  currentMonth: number;
  selectedDateStr: string | null;
  availableSchedules: ScheduleWithTimes[];
  isSelectedDateInCurrentMonth: boolean | null;
  selectedDateTimes: TimeSlot[];
  selectedTimeSlot: TimeSlot | null;
  headCount: number;
  setSelectedTimeSlot: Dispatch<SetStateAction<TimeSlot | null>>;
  handleDateChange: (date: string | null) => void;
  handleMonthChange: (year: number, month: number) => void;
  handleDecrease: () => void;
  handleIncrease: () => void;
}

export default function MoblieReservationSheet({
  isOpen,
  onClose,
  currentYear,
  currentMonth,
  selectedDateStr,
  availableSchedules,
  isSelectedDateInCurrentMonth,
  selectedDateTimes,
  selectedTimeSlot,
  headCount,
  setSelectedTimeSlot,
  handleDateChange,
  handleMonthChange,
  handleDecrease,
  handleIncrease,
}: MoblieReservationSheetProps) {
  const [isClosing, setIsClosing] = useState(false);

  useBodyScrollLock(isOpen);

  const handleCloseAnimation = () => {
    setIsClosing(true);

    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleCloseAnimation}
      className={`fixed inset-0 z-50 flex items-end bg-black/50 lg:hidden ${
        isClosing ? 'animate-fade-out' : 'animate-fade-in'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex max-h-[85vh] w-full flex-col rounded-t-3xl bg-white p-[24px_24px_18px] shadow-[0_-4px_12px_rgba(0,0,0,0.05)] ${
          isClosing ? 'animate-slide-down' : 'animate-slide-up'
        }`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text2lg-bold md:textxl-bold">날짜</h3>
          <button type="button" onClick={handleCloseAnimation}>
            <IconX size={25} />
          </button>
        </div>

        <div className="overflow-y-auto pt-6 pb-20 md:pb-28">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.5fr_1fr]">
            <div>
              <CalendarReverse
                currentYear={currentYear}
                currentMonth={currentMonth}
                selectedDateStr={selectedDateStr}
                onDateClick={handleDateChange}
                availableDates={availableSchedules.map((s) => s.date)}
                onMonthChange={handleMonthChange}
              />
            </div>

            <div className="space-y-9 rounded-3xl p-0 shadow-none md:px-6 md:py-7.5 md:shadow-[0_4px_24px_rgba(139,115,85,0.2)]">
              <div className="space-y-5">
                <label className="textlg-bold block">예약 가능한 시간</label>
                <div className="space-y-3">
                  {!isSelectedDateInCurrentMonth ? (
                    <p className="text-gray-4B4 text-center text-sm">
                      날짜를 먼저 선택해 주세요.
                    </p>
                  ) : selectedDateTimes.length === 0 ? (
                    <p className="text-gray-4B4 text-center text-sm">
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

              <div className="space-y-5">
                <label className="textlg-bold block">참여 인원 수</label>
                <div className="border-gray-EEE flex w-full items-center justify-between rounded-3xl border px-4.75 py-1.5">
                  <button
                    type="button"
                    onClick={handleDecrease}
                    className="p-2.5"
                  >
                    <IconMinus size="20" color="#4B4B4B" />
                  </button>
                  <span className="textlg-bold text-gray-4B4">{headCount}</span>
                  <button
                    type="button"
                    onClick={handleIncrease}
                    className="p-2.5"
                  >
                    <IconPlus size="20" color="#4B4B4B" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 left-0 bg-white p-[18px_24px]">
          <Button
            variant="solid"
            onClick={handleCloseAnimation}
            disabled={!selectedTimeSlot}
            hasHover={false}
            className="text-md w-full py-3 font-bold"
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
