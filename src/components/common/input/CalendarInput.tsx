import { ComponentPropsWithoutRef } from 'react';

import { twMerge } from 'tailwind-merge';

import IconCalendar from '@/components/common/icon/IconCalendar';

export interface CalendarInputProps extends ComponentPropsWithoutRef<'button'> {
  isOpen: boolean;
  onToggle: () => void;
  placeholder?: string;
}

export default function CalendarInput({
  id,
  name,
  value,
  placeholder = 'YY/MM/DD',
  isOpen,
  onToggle,
  className = '',
  ...props
}: CalendarInputProps) {
  return (
    <div className={twMerge('relative w-full', className)}>
      {name && <input type="hidden" name={name} value={value || ''} />}

      <button
        id={id}
        onClick={onToggle}
        className={`flex h-14 w-full cursor-pointer items-center justify-between rounded-sm border bg-white px-4 text-left transition-colors duration-200 outline-none ${
          isOpen ? 'border-[#8B7355]' : 'border-gray-A4A'
        }`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        {...props}
        type="button"
      >
        <span
          className={`textlg-regular ${
            value ? 'text-black-1B1' : 'text-gray-A1A'
          }`}
        >
          {value || placeholder}
        </span>
        <span className="text-gray-4B4 ml-2 flex shrink-0 items-center">
          <IconCalendar size={24} />
        </span>
      </button>
    </div>
  );
}
