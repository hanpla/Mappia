'use client';

import { useRef } from 'react';

import SelectDropdown, {
  SelectOption,
} from '@/components/common/dropdown/SelectDropdown';
import IconCalendar from '@/components/common/icon/IconCalendar';
import IconMinus from '@/components/common/icon/IconMinus';

export interface Schedule {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface ScheduleInputProps {
  schedule: Schedule;
  onRemove: () => void;
  onChange: (
    id: string,
    field: keyof Omit<Schedule, 'id'>,
    value: string,
  ) => void;
}

const TIME_OPTIONS: SelectOption[] = Array.from({ length: 48 }, (_, i) => {
  const hour = String(Math.floor(i / 2)).padStart(2, '0');
  const minute = i % 2 === 0 ? '00' : '30';
  const time = `${hour}:${minute}`;
  return { label: time, value: time };
});

export default function ScheduleInput({
  schedule,
  onRemove,
  onChange,
}: ScheduleInputProps) {
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleCalendarClick = () => {
    dateInputRef.current?.showPicker?.();
  };

  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  return (
    <div className="flex flex-col gap-2 min-[602px]:flex-row min-[602px]:items-end">
      <div className="relative min-[602px]:flex-1">
        <input
          ref={dateInputRef}
          type="date"
          value={schedule.date}
          min={minDate}
          onChange={(e) => onChange(schedule.id, 'date', e.target.value)}
          className="textlg-regular border-beige-8B7 focus:border-khaki-6B5 h-14 w-full cursor-pointer rounded-2xl border bg-white px-4 pr-12 transition-colors duration-200 outline-none [&::-webkit-calendar-picker-indicator]:hidden"
        />
        <button
          type="button"
          onClick={handleCalendarClick}
          aria-label="날짜 선택"
          className="text-black-1B1 absolute top-1/2 right-4 -translate-y-1/2"
        >
          <IconCalendar size={24} color="currentColor" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 min-[602px]:w-[120px] min-[602px]:flex-none">
          <SelectDropdown
            value={schedule.startTime}
            onChange={(value) => onChange(schedule.id, 'startTime', value)}
            options={TIME_OPTIONS}
            placeholder="00:00"
            showCheck={false}
          />
        </div>

        <span className="text-black-1B1 flex h-14 items-center font-medium">
          -
        </span>

        <div className="flex-1 min-[602px]:w-[120px] min-[602px]:flex-none">
          <SelectDropdown
            value={schedule.endTime}
            onChange={(value) => onChange(schedule.id, 'endTime', value)}
            options={TIME_OPTIONS}
            placeholder="00:00"
            showCheck={false}
          />
        </div>

        <button
          type="button"
          onClick={onRemove}
          aria-label="시간대 삭제"
          className="bg-beige-8B7 flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors hover:opacity-90"
        >
          <IconMinus size={24} color="#ffffff" />
        </button>
      </div>
    </div>
  );
}
