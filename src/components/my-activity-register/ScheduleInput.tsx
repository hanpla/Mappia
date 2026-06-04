'use client';

import SelectDropdown, {
  SelectOption,
} from '@/components/common/dropdown/SelectDropdown';
import IconMinus from '@/components/common/icon/IconMinus';
import IconPlus from '@/components/common/icon/IconPlus';

export interface Schedule {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface ScheduleInputProps {
  schedule: Schedule;
  isFirst?: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
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
  isFirst = false,
  onAdd,
  onRemove,
  onChange,
}: ScheduleInputProps) {
  return (
    <div className="mobile:flex-row mobile:items-end flex flex-col gap-2">
      <div className="mobile:flex-1">
        <input
          id={`schedule-date-${schedule.id}`}
          type="date"
          value={schedule.date}
          onChange={(e) => onChange(schedule.id, 'date', e.target.value)}
          className="textlg-regular border-beige-8B7 focus:border-khaki-6B5 h-14 w-full rounded-2xl border bg-white px-4 transition-colors duration-200 outline-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="mobile:w-[120px] mobile:flex-none flex-1">
          <SelectDropdown
            value={schedule.startTime}
            onChange={(value) => onChange(schedule.id, 'startTime', value)}
            options={TIME_OPTIONS}
            placeholder="00:00"
          />
        </div>

        <span className="text-black-1B1 flex h-14 items-center font-medium">
          -
        </span>

        <div className="mobile:w-[120px] mobile:flex-none flex-1">
          <SelectDropdown
            value={schedule.endTime}
            onChange={(value) => onChange(schedule.id, 'endTime', value)}
            options={TIME_OPTIONS}
            placeholder="00:00"
          />
        </div>

        {isFirst ? (
          <button
            type="button"
            onClick={onAdd}
            aria-label="시간대 추가"
            className="bg-beige-8B7 flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-colors hover:opacity-90"
          >
            <IconPlus size={24} color="#ffffff" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onRemove}
            aria-label="시간대 삭제"
            className="bg-beige-8B7 flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-colors hover:opacity-90"
          >
            <IconMinus size={24} color="#ffffff" />
          </button>
        )}
      </div>
    </div>
  );
}
