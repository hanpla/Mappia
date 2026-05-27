import IconChevronDown from '@/components/common/icon/IconChevronDown';
import IconChevronUp from '@/components/common/icon/IconChevronUp';

interface SelectTriggerProps {
  isOpen: boolean;
  selectedLabel?: string;
  placeholder: string;
  onToggle: () => void;
}

export default function SelectTrigger({
  isOpen,
  selectedLabel,
  placeholder,
  onToggle,
}: SelectTriggerProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex h-14 w-full cursor-pointer items-center justify-between rounded-sm border bg-white px-4 text-left transition-colors duration-200 outline-none ${
        isOpen ? 'focus:border-[#8B7355]' : 'border-gray-A4A'
      }`}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
    >
      <span
        className={`textlg-regular ${
          selectedLabel ? 'text-black-1B1' : 'text-gray-A1A'
        }`}
      >
        {selectedLabel || placeholder}
      </span>
      <span className="text-gray-4B4 ml-2 flex shrink-0 items-center">
        {isOpen ? <IconChevronUp size={24} /> : <IconChevronDown size={24} />}
      </span>
    </button>
  );
}
