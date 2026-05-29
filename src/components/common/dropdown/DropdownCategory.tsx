'use client';

import useDropdown from '@/hooks/useDropdown';

import IconCheck from '@/components/common/icon/IconCheck';
import IconChevronDown from '@/components/common/icon/IconChevronDown';
import IconChevronUp from '@/components/common/icon/IconChevronUp';

const DEFAULT_OPTIONS = [
  '문화·예술',
  '식음료',
  '스포츠',
  '투어',
  '관광',
] as const;

interface DropdownCategoryProps<T extends string> {
  options?: readonly T[] | T[];
  value: T | null | string;
  onChange: (value: T) => void;
  placeholder?: string;
  className?: string;
}

export default function DropdownCategory<T extends string>({
  options,
  value,
  onChange,
  placeholder = '카테고리',
  className = '',
}: DropdownCategoryProps<T>) {
  const { ref, isOpen, toggle, close } = useDropdown();

  const resolvedOptions = (options || DEFAULT_OPTIONS) as unknown as T[];

  const handleOptionClick = (option: T) => {
    onChange(option);
    close();
  };

  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={toggle}
        className={`flex h-14 w-full cursor-pointer items-center justify-between rounded-2xl border bg-white px-4 text-left transition-colors duration-200 outline-none ${
          isOpen ? 'border-beige-8B7' : 'border-gray-A4A'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={`textlg-regular ${
            value ? 'text-black-1B1' : 'text-gray-A1A'
          }`}
        >
          {value || placeholder}
        </span>
        <span className="text-gray-4B4 ml-2 flex shrink-0 items-center">
          {isOpen ? <IconChevronUp size={24} /> : <IconChevronDown size={24} />}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul
          role="listbox"
          className="border-gray-EEE shadow-dropdown absolute top-full right-0 left-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-2xl border bg-white p-2"
        >
          {resolvedOptions.map((option) => {
            const isSelected = value === option;
            return (
              <li key={option} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleOptionClick(option)}
                  className={`textmd-medium flex h-12 w-full items-center gap-2 rounded-lg px-4 text-left transition-colors duration-150 ${
                    isSelected
                      ? 'bg-khaki-6B5 text-white-FFF'
                      : 'text-black-1B1 hover:bg-gray-FAF'
                  }`}
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                    {isSelected && <IconCheck size={20} color="#ffffff" />}
                  </span>
                  <span>{option}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
