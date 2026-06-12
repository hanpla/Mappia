'use client';

import { useMemo } from 'react';

import { CalendarDate, generateCalendarDates } from '@/lib/utils/calendar';

interface CalendarReverseProps {
  currentYear: number;
  currentMonth: number;
  selectedDateStr?: string | null;
  onDateClick?: (dateStr: string | null) => void;
  availableDates?: string[];
  onMonthChange?: (year: number, month: number) => void;
  className?: string;
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function CalendarReverse({
  currentYear,
  currentMonth,
  selectedDateStr = null,
  onDateClick,
  availableDates = [],
  onMonthChange,
  className = '',
}: CalendarReverseProps) {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const isPrevMonthDisabled =
    currentYear < today.getFullYear() ||
    (currentYear === today.getFullYear() && currentMonth <= today.getMonth());

  const dates = useMemo(
    () => generateCalendarDates(currentYear, currentMonth),
    [currentYear, currentMonth],
  );

  const handlePrevMonth = () => {
    if (isPrevMonthDisabled) return;

    let nextYear = currentYear;
    let nextMonth = currentMonth;

    if (currentMonth === 0) {
      nextYear = currentYear - 1;
      nextMonth = 11;
    } else {
      nextMonth = currentMonth - 1;
    }

    onMonthChange?.(nextYear, nextMonth);
  };

  const handleNextMonth = () => {
    let nextYear = currentYear;
    let nextMonth = currentMonth;

    if (currentMonth === 11) {
      nextYear = currentYear + 1;
      nextMonth = 0;
    } else {
      nextMonth = currentMonth + 1;
    }

    onMonthChange?.(nextYear, nextMonth);
  };

  const handleDateClick = (dateItem: CalendarDate) => {
    if (!dateItem.currentMonth) return;

    onDateClick?.(
      selectedDateStr === dateItem.dateStr ? null : dateItem.dateStr,
    );
  };

  return (
    <aside
      className={`font-pretendard text-black-333 flex w-full flex-col gap-[6%] bg-white select-none ${className}`}
    >
      <section className="w-full">
        <div className="mb-[6%] flex items-center justify-between">
          <span className="textmd-semibold md:textlg-semibold text-black-1B1 transition-all">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </span>

          <div className="textxs-regular text-gray-4B4 flex gap-4 md:gap-5">
            <button
              onClick={handlePrevMonth}
              disabled={isPrevMonthDisabled}
              className={`p-1 transition-all ${
                isPrevMonthDisabled
                  ? 'text-gray-CBC cursor-not-allowed'
                  : 'hover:text-black-1B1 cursor-pointer p-1 transition-colors'
              }`}
            >
              ◀
            </button>
            <button
              onClick={handleNextMonth}
              className="hover:text-black-1B1 cursor-pointer p-1 transition-colors"
            >
              ▶
            </button>
          </div>
        </div>

        <div className="textsm-medium md:textmd-medium text-gray-797 mb-[3%] grid grid-cols-7 text-center">
          {DAYS.map((day, idx) => (
            <div
              key={idx}
              className="flex aspect-square items-center justify-center"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-1.5 text-center md:gap-y-2">
          {dates.map((dateItem, idx) => {
            const isPast = dateItem.dateStr < todayStr;
            const isToday = dateItem.dateStr === todayStr;
            const isSelected = selectedDateStr === dateItem.dateStr;
            const isBookable = availableDates.includes(dateItem.dateStr);

            let dayStyles =
              'text-black-333 hover:bg-gray-FAF textsm-regular md:textmd-regular transition-all';

            if (isSelected) {
              dayStyles =
                'bg-beige-8B7 text-white textsm-bold md:textmd-bold transition-all';
            } else if (isToday) {
              dayStyles = isBookable
                ? 'bg-ivory-F2E text-black-1B1 textsm-bold md:textmd-bold border border-beige-8B7 transition-all'
                : 'bg-ivory-F2E text-black-1B1 textsm-bold md:textmd-bold transition-all';
            } else if (isBookable && !isPast) {
              dayStyles =
                'text-black-1B1 textsm-regular md:textmd-regular  hover:bg-gray-FAF border border-beige-8B7';
            } else if (isPast) {
              dayStyles =
                'text-gray-CBC cursor-not-allowed pointer-events-none';
            }

            return (
              <div
                key={idx}
                className="flex items-center justify-center p-[4%]"
              >
                {dateItem.currentMonth && (
                  <button
                    onClick={() => handleDateClick(dateItem)}
                    disabled={isPast}
                    className={`flex aspect-square w-full cursor-pointer items-center justify-center rounded-full ${dayStyles}`}
                  >
                    {dateItem.day}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </aside>
  );
}
