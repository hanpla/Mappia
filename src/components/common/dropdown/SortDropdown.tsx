'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { twMerge } from 'tailwind-merge';

import useDropdown from '@/hooks/useDropdown';

const SORT_OPTIONS = [
  { label: '최신순', value: 'latest' },
  { label: '낮은가격순', value: 'price_asc' },
  { label: '높은가격순', value: 'price_desc' },
];

export interface SortDropdownProps {
  sortKey?: string;
  className?: string;
}

export default function SortDropdown({
  sortKey = 'sort',
  className = '',
}: SortDropdownProps) {
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
        className={twMerge(
          'bg-white-FFF text-khaki-6B5 textlg-medium border-beige-8B7 flex h-[41px] min-w-30 cursor-pointer items-center justify-between gap-2 rounded-[16px] border px-5 transition-all duration-200 outline-none',
          className,
        )}
      >
        <span>정렬</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`text-khaki-6B5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path d="M2 4.5L7 9.5L12 4.5H2Z" fill="currentColor" />
        </svg>
      </button>

      {isOpen && (
        <div className="shadow-dropdown border-beige-8B7 bg-white-FFF absolute right-0 z-50 mt-2 w-full min-w-30 overflow-hidden rounded-[16px] border">
          <ul className="flex flex-col">
            {SORT_OPTIONS.map((option, index) => {
              const isActive = currentSort === option.value;
              const isLast = index === SORT_OPTIONS.length - 1;
              return (
                <li
                  key={option.value}
                  className={isLast ? '' : 'border-beige-8B7 border-b'}
                >
                  <button
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`textlg-medium block w-full cursor-pointer py-3.5 text-center transition-all duration-150 outline-none ${
                      isActive
                        ? 'bg-khaki-6B5 text-white-FFF font-semibold'
                        : 'text-khaki-6B5 hover:bg-khaki-6B5/20'
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
