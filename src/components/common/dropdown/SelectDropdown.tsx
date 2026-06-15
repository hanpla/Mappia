'use client';

import useDropdown from '@/hooks/useDropdown';

import IconCheck from '@/components/common/icon/IconCheck';
import IconChevronDown from '@/components/common/icon/IconChevronDown';
import IconChevronUp from '@/components/common/icon/IconChevronUp';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectDropdownProps {
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
}

export default function SelectDropdown({
  value,
  onChange,
  options,
  placeholder = '선택하세요',
}: SelectDropdownProps) {
  const { ref, isOpen, toggle, close } = useDropdown();

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (val: string) => {
    if (onChange) {
      onChange(val);
    }
    close();
  };

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={toggle}
        className={
          'textlg-regular bg-white-FFF text-black-1B1 flex h-14 w-full cursor-pointer items-center justify-between rounded-2xl border px-5 text-left transition-all duration-200 outline-none ' +
          (isOpen ? 'border-khaki-6B5' : 'border-beige-8B7')
        }
      >
        <span
          className={
            selectedOption
              ? 'text-black-1B1 truncate'
              : 'text-gray-A1A truncate'
          }
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        {isOpen ? (
          <IconChevronUp size={24} color="#1b1b1b" />
        ) : (
          <IconChevronDown size={24} color="#1b1b1b" />
        )}
      </button>

      {isOpen && (
        <ul className="shadow-dropdown border-gray-DDD bg-white-FFF absolute left-0 z-50 mt-2 max-h-75 w-full overflow-y-auto rounded-2xl border p-2 outline-none">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`textlg-regular flex w-full cursor-pointer items-center truncate rounded-md px-5 py-3 text-left transition-all duration-150 outline-none ${
                    isSelected
                      ? 'bg-khaki-6B5 text-white-FFF'
                      : 'text-black-1B1 hover:bg-gray-FAF'
                  }`}
                >
                  {isSelected && (
                    <IconCheck
                      size={20}
                      color="#ffffff"
                      className="mr-2 shrink-0"
                    />
                  )}
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
