'use client';

import { useMemo } from 'react';

import { generateCalendarDates } from '@/lib/utils/calendar';

import Chip from '@/components/common/chip/Chip';
import type { ChipStatus } from '@/components/common/chip/Chip';

export interface ReservationEvent {
  status: ChipStatus;
  count: number;
}

export interface CalendarStatusData {
  [dateStr: string]: {
    hasRedDot?: boolean;
    badges: ReservationEvent[];
  };
}

interface CalendarStatusProps {
  eventsData?: CalendarStatusData;
  onDateClick?: (dateStr: string) => void;
  currentYear: number;
  currentMonth: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export default function CalendarStatus({
  eventsData = {},
  onDateClick,
  currentYear,
  currentMonth,
  onPrevMonth,
  onNextMonth,
}: CalendarStatusProps) {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const weeks = useMemo(() => {
    const dates = generateCalendarDates(currentYear, currentMonth);
    const result = [];
    for (let i = 0; i < dates.length; i += 7) {
      result.push(dates.slice(i, i + 7));
    }
    return result;
  }, [currentYear, currentMonth]);

  return (
    <aside className="border-gray-EEE font-pretendard flex w-full flex-col rounded-[24px] border bg-white p-4 shadow-sm select-none md:p-5 lg:p-6">
      <div className="mb-2 flex items-center justify-center gap-6 py-1 lg:mb-4 lg:gap-8 lg:py-2">
        <button
          onClick={onPrevMonth}
          className="textsm-bold text-black-1B1 md:textmd-bold lg:textlg-bold cursor-pointer p-1 transition-opacity hover:opacity-40"
        >
          ◀
        </button>
        <span className="textmd-semibold text-black-1B1 md:text2lg-semibold lg:textxl-semibold min-w-[100px] text-center tracking-tight lg:min-w-[110px]">
          {currentYear}년 {currentMonth + 1}월
        </span>
        <button
          onClick={onNextMonth}
          className="textsm-bold text-black-1B1 md:textmd-bold lg:textlg-bold cursor-pointer p-1 transition-opacity hover:opacity-40"
        >
          ▶
        </button>
      </div>

      <div className="textxs-bold text-black-333 md:textsm-bold lg:textmd-bold grid grid-cols-7 pb-2 text-center lg:pb-3">
        {days.map((day, idx) => (
          <div
            key={idx}
            className={day === 'S' && idx === 0 ? 'text-red-FF4' : ''}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="flex flex-1 flex-col justify-between">
        {weeks.map((week, weekIdx) => (
          <div
            key={weekIdx}
            className="border-gray-EEE grid grid-cols-7 border-t pt-1"
          >
            {week.map((dateItem, idx) => {
              const dayData = eventsData[dateItem.dateStr];
              const shouldShowRedDot =
                dayData && dayData.badges && dayData.badges.length > 0;
              return (
                <div
                  key={idx}
                  onClick={() => onDateClick?.(dateItem.dateStr)}
                  className="hover:bg-gray-FAF flex min-h-[68px] cursor-pointer flex-col items-center justify-start rounded-xl bg-white p-0.5 transition-colors md:min-h-[64px] lg:min-h-[96px] lg:p-1"
                >
                  <div className="relative mt-1 flex items-center justify-center px-2 select-none">
                    <span
                      className={`textsm-regular md:textmd-regular lg:textlg-regular inline-block ${
                        dateItem.currentMonth
                          ? 'text-black-333'
                          : 'text-gray-CBC'
                      }`}
                    >
                      {dateItem.day}
                    </span>

                    {shouldShowRedDot && (
                      <span className="bg-red-FF4 pointer-events-none absolute top-px right-px h-1 w-1 rounded-full md:top-0 md:right-0 md:h-1.5 md:w-1.5 lg:top-[-2px] lg:right-[-2px]" />
                    )}
                  </div>

                  <div className="mt-1 flex w-full flex-col gap-0.5 overflow-hidden px-0.5 lg:gap-1">
                    {dayData?.badges.map((badge, bIdx) => (
                      <Chip
                        key={bIdx}
                        status={badge.status}
                        count={badge.count}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
}
