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
      className="border-gray-EEE shadow-dropdown absolute top-full right-0 left-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-2xl border bg-white p-2"
      role="listbox"
    >
      {options.map((option) => {
        const isSelected = option.value === selectedValue;
        return (
          <li key={option.value} role="option" aria-selected={isSelected}>
            <button
              type="button"
              onClick={() => onSelect(option.value)}
              className={`textmd-medium flex h-12 w-full items-center gap-2 rounded-lg px-4 text-left transition-colors duration-150 ${
                isSelected
                  ? 'bg-khaki-6B5 text-white-FFF'
                  : 'text-black-1B1 hover:bg-gray-FAF'
              }`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                {isSelected && <IconCheck size={20} color="#ffffff" />}
              </span>
              <span>{option.label}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
