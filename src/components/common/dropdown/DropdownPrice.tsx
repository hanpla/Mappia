'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import useDropdown from '@/hooks/useDropdown';

import IconChevronDown from '@/components/common/icon/IconChevronDown';
import IconChevronUp from '@/components/common/icon/IconChevronUp';

export const PRICE_SORT_OPTIONS = [
  { label: '최신순', value: 'latest' },
  { label: '가격이 낮은 순', value: 'price_asc' },
  { label: '가격이 높은 순', value: 'price_desc' },
] as const;

export type PriceSortValue = (typeof PRICE_SORT_OPTIONS)[number]['value'];

interface DropdownPriceProps {
  placeholder?: string;
  className?: string;
}

export default function DropdownPrice({
  placeholder = '정렬',
  className = '',
}: DropdownPriceProps) {
  const { ref, isOpen, toggle, close } = useDropdown();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read sort value from searchParams, default to 'latest'
  const currentSort = searchParams?.get('sort') || 'latest';

  const handleOptionClick = (optionValue: PriceSortValue) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('sort', optionValue);
    router.push(`${pathname}?${params.toString()}`);
    close();
  };

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={toggle}
        className={`border-gray-DDD hover:bg-gray-FAF flex h-10 w-full cursor-pointer items-center justify-between gap-2 rounded-2xl border bg-white px-4 text-left transition-colors duration-200 outline-none ${
          isOpen ? 'border-beige-8B7' : ''
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="textmd-medium text-gray-797">{placeholder}</span>
        <span className="text-gray-797 flex items-center">
          {isOpen ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul
          role="listbox"
          className="border-gray-EEE shadow-dropdown absolute top-full right-0 z-50 mt-1 w-full min-w-[120px] overflow-hidden rounded-2xl border bg-white p-1"
        >
          {PRICE_SORT_OPTIONS.map((option) => {
            const isSelected = currentSort === option.value;
            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleOptionClick(option.value)}
                  className={`textsm-medium flex h-10 w-full items-center justify-start rounded-lg px-3 text-left transition-colors duration-150 ${
                    isSelected
                      ? 'bg-gray-FAF text-beige-8B7 font-semibold'
                      : 'text-black-1B1 hover:bg-gray-FAF'
                  }`}
                >
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
