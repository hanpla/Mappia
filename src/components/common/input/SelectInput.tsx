'use client';

import { useState } from 'react';

import useClickOutside from '@/hooks/useClickOutside';

import IconCheck from '@/components/common/icon/IconCheck';
import IconChevronDown from '@/components/common/icon/IconChevronDown';
import IconChevronUp from '@/components/common/icon/IconChevronUp';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectInputProps {
  id: string;
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  hasError?: boolean;
  className?: string;
}

export default function SelectInput({
  id,
  options,
  value,
  placeholder = '선택해주세요',
  onChange,
  hasError = false,
  className = '',
}: SelectInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const selectedOption = options.find((opt) => opt.value === value);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      <button
        id={id}
        type="button"
        onClick={handleToggle}
        className={`flex h-14 w-full cursor-pointer items-center justify-between rounded-sm border bg-white px-4 text-left transition-colors duration-200 outline-none ${
          isOpen || hasError
            ? hasError
              ? 'border-red-FF4'
              : 'border-nomad-8B7'
            : 'border-gray-A4A focus:border-nomad-8B7'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={`textlg-regular ${
            selectedOption ? 'text-black-1B1' : 'text-gray-A1A'
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="text-gray-4B4 ml-2 flex shrink-0 items-center">
          {isOpen ? <IconChevronUp size={24} /> : <IconChevronDown size={24} />}
        </span>
      </button>

      {isOpen && (
        <ul
          className="border-gray-DDD absolute top-[calc(100%+8px)] right-0 left-0 z-50 max-h-60 overflow-y-auto rounded-sm border bg-white py-2 shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
          role="listbox"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`textlg-regular flex w-full cursor-pointer items-center px-4 py-3 text-left transition-colors duration-150 ${
                    isSelected
                      ? 'bg-green-0B3 text-white'
                      : 'text-black-1B1 hover:bg-gray-FAF'
                  }`}
                >
                  <span className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center">
                    {isSelected && <IconCheck size={16} color="#FFFFFF" />}
                  </span>
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
