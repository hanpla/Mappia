import IconCheck from '@/components/common/icon/IconCheck';

import { SelectOption } from './SelectInput';

interface SelectDropdownProps {
  options: SelectOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
}

export default function SelectDropdown({
  options,
  selectedValue,
  onSelect,
}: SelectDropdownProps) {
  return (
    <ul
      className="border-gray-DDD shadow-dropdown absolute top-full right-0 left-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-sm border bg-white py-2"
      role="listbox"
    >
      {options.map((option) => {
        const isSelected = option.value === selectedValue;
        return (
          <li key={option.value} role="option" aria-selected={isSelected}>
            <button
              type="button"
              onClick={() => onSelect(option.value)}
              className={`textlg-regular flex w-full cursor-pointer items-center px-4 py-3 text-left transition-colors duration-150 ${
                isSelected
                  ? 'bg-nomad-112 text-white'
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
  );
}
