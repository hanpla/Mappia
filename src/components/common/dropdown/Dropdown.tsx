'use client';

import Image from 'next/image';
import { useState } from 'react';

import useClickOutside from '@/hooks/useClickOutside';

import CheckmarkIcon from '@/assets/icons/Icon_checkmark.svg';
import ChevronIcon from '@/assets/icons/Icon_chevron-left.svg';

interface DropdownOption<T> {
  label: string;
  value: T;
}

interface DropdownProps<T> {
  options: DropdownOption<T>[];
  value?: T;
  onChange: (value: T) => void;
  placeholder?: string;
}

export default function Dropdown<T extends string | number>({
  options,
  value,
  onChange,
  placeholder = '카테고리',
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const selectedOption = options.find((option) => option.value === value);

  const handleTriggerClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (optionValue: T) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={handleTriggerClick}
        className="flex h-12 w-full items-center justify-between rounded-2xl border border-[#6B5747] bg-white px-4 text-left"
      >
        <span className={selectedOption ? 'text-black-1B1' : 'text-gray-A4A'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <Image
          src={ChevronIcon}
          alt=""
          width={20}
          height={20}
          className={isOpen ? 'rotate-90' : '-rotate-90'}
        />
      </button>

      {isOpen && (
        <ul className="absolute top-full right-0 left-0 z-10 mt-1 overflow-hidden rounded-2xl bg-white p-2 shadow-[0_10px_30px_3px_rgba(139,115,85,0.15)]">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={String(option.value)}>
                <button
                  type="button"
                  onClick={() => handleOptionClick(option.value)}
                  className={`flex h-12 w-full items-center gap-2 rounded-lg px-4 text-left ${
                    isSelected
                      ? 'bg-[#704C2E] text-white'
                      : 'text-black hover:bg-gray-100'
                  }`}
                >
                  <span className="flex h-5 w-5 items-center justify-center">
                    {isSelected && (
                      <Image
                        src={CheckmarkIcon}
                        alt=""
                        width={20}
                        height={20}
                      />
                    )}
                  </span>
                  <span>{option.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
