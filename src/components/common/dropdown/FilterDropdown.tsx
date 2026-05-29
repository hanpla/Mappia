'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import useDropdown from '@/hooks/useDropdown';

import IconChevronDown from '@/components/common/icon/IconChevronDown';
import IconChevronUp from '@/components/common/icon/IconChevronUp';

const FILTER_OPTIONS = [
  { label: '예약 신청', value: 'pending' },
  { label: '예약 취소', value: 'canceled' },
  { label: '예약 승인', value: 'approved' },
  { label: '예약 거절', value: 'declined' },
  { label: '체험 완료', value: 'completed' },
];

export interface FilterDropdownProps {
  filterKey?: string;
}

export default function FilterDropdown({
  filterKey = 'filter',
}: FilterDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { ref, isOpen, toggle, close } = useDropdown();

  const currentFilter = searchParams ? searchParams.get(filterKey) : null;

  const handleSelect = (value: string) => {
    if (!searchParams) return;
    const params = new URLSearchParams(searchParams.toString());
    if (currentFilter === value) {
      params.delete(filterKey);
    } else {
      params.set(filterKey, value);
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
        className={`bg-white-FFF text-black-1B1 textlg-medium flex h-12 min-w-30 cursor-pointer items-center justify-between gap-2 rounded-2xl border px-5 transition-all duration-200 outline-none ${
          isOpen ? 'border-khaki-6B5' : 'border-gray-DDD'
        }`}
      >
        <span>필터</span>
        {isOpen ? (
          <IconChevronUp size={24} color="#1b1b1b" />
        ) : (
          <IconChevronDown size={24} color="#1b1b1b" />
        )}
      </button>

      {isOpen && (
        <div className="shadow-dropdown border-gray-DDD bg-white-FFF absolute left-0 z-50 mt-2 w-40 overflow-hidden rounded-lg border">
          <ul className="flex flex-col">
            {FILTER_OPTIONS.map((option, index) => {
              const isActive = currentFilter === option.value;
              const isLast = index === FILTER_OPTIONS.length - 1;
              return (
                <li
                  key={option.value}
                  className={isLast ? '' : 'border-gray-EEE border-b'}
                >
                  <button
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`text-black-1B1 hover:bg-gray-FAF textlg-medium block w-full cursor-pointer py-3.5 text-center transition-all duration-150 outline-none ${
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
