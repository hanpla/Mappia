'use client';

import { useState } from 'react';

import { CalendarDate, generateCalendarDates } from '@/lib/utils/calendar';

interface CalendarReverseProps {
  selectedDateStr?: string | null;
  onDateClick?: (dateStr: string | null) => void;
  className?: string;
}

export default function CalendarReverse({
  selectedDateStr = null,
  onDateClick,
  className = '',
}: CalendarReverseProps) {
  const today = new Date();
  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const dates = generateCalendarDates(currentYear, currentMonth);
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((prev) => prev - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((prev) => prev + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleDateClick = (dateItem: CalendarDate, isPast: boolean) => {
    if (isPast) return;

    const dateString = `${dateItem.year}-${String(dateItem.month + 1).padStart(2, '0')}-${String(dateItem.day).padStart(2, '0')}`;

    if (selectedDateStr === dateString) {
      onDateClick?.(null);
    } else {
      onDateClick?.(dateString);
    }
  };

  const monthNames = [
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

  return (
    <aside
      className={`font-pretendard text-black-333 flex w-full flex-col gap-[6%] bg-white p-[7%] select-none ${className}`}
    >
      <section className="w-full">
        <div className="mb-[6%] flex items-center justify-between">
          <span className="textmd-semibold md:textlg-semibold text-black-1B1 transition-all">
            {monthNames[currentMonth]} {currentYear}
          </span>

          <div className="textxs-regular text-gray-4B4 flex gap-4 md:gap-5">
            <button
              onClick={handlePrevMonth}
              className="hover:text-black-1B1 cursor-pointer p-1 transition-colors"
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
          {days.map((day, idx) => (
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
            const itemDateStr = `${dateItem.year}-${String(dateItem.month + 1).padStart(2, '0')}-${String(dateItem.day).padStart(2, '0')}`;
            const targetDate = new Date(
              dateItem.year,
              dateItem.month,
              dateItem.day,
            );
            const isPast = targetDate < todayMidnight;
            const isToday =
              dateItem.day === today.getDate() &&
              dateItem.month === today.getMonth() &&
              dateItem.year === today.getFullYear();

            const isSelected = selectedDateStr === itemDateStr;

            let dayStyles =
              'text-black-333 hover:bg-gray-FAF textsm-regular md:textmd-regular';

            if (!dateItem.currentMonth) {
              dayStyles =
                'text-gray-CBC hover:bg-gray-FAF textsm-regular md:textmd-regular';
            }
            if (isToday) {
              dayStyles =
                'bg-ivory-F2E text-black-1B1 textsm-bold md:textmd-bold';
            }
            if (isSelected) {
              dayStyles =
                'bg-beige-8B7 text-white textsm-semibold md:textmd-semibold hover:bg-beige-8B7';
            }
            if (isPast) {
              dayStyles =
                'text-gray-CBC opacity-40 cursor-not-allowed pointer-events-none textsm-regular md:textmd-regular';
            }

            return (
              <div
                key={idx}
                className="flex items-center justify-center p-[4%]"
              >
                <button
                  onClick={() => handleDateClick(dateItem, isPast)}
                  disabled={isPast}
                  className={`flex aspect-square w-full cursor-pointer items-center justify-center rounded-full transition-all ${dayStyles}`}
                >
                  {dateItem.day}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </aside>
  );
}
