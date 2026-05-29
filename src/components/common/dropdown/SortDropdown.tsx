'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import useDropdown from '@/hooks/useDropdown';

import IconChevronDown from '@/components/common/icon/IconChevronDown';
import IconChevronUp from '@/components/common/icon/IconChevronUp';

const SORT_OPTIONS = [
  { label: '최신순', value: 'latest' },
  { label: '낮은가격순', value: 'price_asc' },
  { label: '높은가격순', value: 'price_desc' },
];

export interface SortDropdownProps {
  sortKey?: string;
}

export default function SortDropdown({ sortKey = 'sort' }: SortDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { ref, isOpen, toggle, close } = useDropdown();

  const currentSort = searchParams ? searchParams.get(sortKey) : null;

  const handleSelect = (value: string) => {
    if (!searchParams) return;
    const params = new URLSearchParams(searchParams.toString());
    if (currentSort === value) {
      params.delete(sortKey);
    } else {
      params.set(sortKey, value);
    }

    if (params.has('page')) {
      params.set('page', '1');
    }

    router.push(`${pathname}?${params.toString()}`);
    close();
  };

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={toggle}
        className={`bg-white-FFF text-black-1B1 textlg-medium flex h-[48px] min-w-[120px] cursor-pointer items-center justify-between gap-[8px] rounded-[15px] border px-[20px] transition-all duration-200 outline-none ${
          isOpen ? 'border-khaki-6B5' : 'border-gray-DDD'
        }`}
      >
        <span>정렬</span>
        {isOpen ? (
          <IconChevronUp size={24} color="#1b1b1b" />
        ) : (
          <IconChevronDown size={24} color="#1b1b1b" />
        )}
      </button>

      {isOpen && (
        <div className="shadow-dropdown border-gray-DDD bg-white-FFF absolute left-0 z-50 mt-[8px] w-[160px] overflow-hidden rounded-[8px] border">
          <ul className="flex flex-col">
            {SORT_OPTIONS.map((option, index) => {
              const isActive = currentSort === option.value;
              const isLast = index === SORT_OPTIONS.length - 1;
              return (
                <li
                  key={option.value}
                  className={isLast ? '' : 'border-gray-EEE border-b'}
                >
                  <button
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`text-black-1B1 hover:bg-gray-FAF textlg-medium block w-full cursor-pointer py-[14px] text-center transition-all duration-150 outline-none ${
                      isActive ? 'text-khaki-6B5 bg-gray-FAF font-semibold' : ''
                    }`}
                  >
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
