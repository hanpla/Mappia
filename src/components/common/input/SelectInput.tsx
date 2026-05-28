'use client';

import { useState } from 'react';

import { twMerge } from 'tailwind-merge';

import useClickOutside from '@/hooks/useClickOutside';

import SelectDropdown from './SelectDropdown';
import SelectTrigger from './SelectTrigger';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectInputProps {
  name: string;
  options: SelectOption[];
  value: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export default function SelectInput({
  name,
  options,
  value,
  placeholder = '선택해주세요',
  onChange,
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
    <div className={twMerge('relative', className)} ref={containerRef}>
      <input type="hidden" name={name} value={value || ''} />

      <SelectTrigger
        isOpen={isOpen}
        selectedLabel={selectedOption?.label}
        placeholder={placeholder}
        onToggle={handleToggle}
      />

      {isOpen && (
        <SelectDropdown
          options={options}
          selectedValue={value}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
}
