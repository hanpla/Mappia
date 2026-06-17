'use client';

export type FaqCategory = 'all' | 'reservation' | 'cancel' | 'host' | 'account';

interface CategoryOption {
  value: FaqCategory;
  label: string;
}

const CATEGORIES: CategoryOption[] = [
  { value: 'all', label: '전체' },
  { value: 'reservation', label: '예약/결제' },
  { value: 'cancel', label: '취소/환불' },
  { value: 'host', label: '호스트 관련' },
  { value: 'account', label: '계정/기타' },
];

interface FaqTabProps {
  activeCategory: FaqCategory;
  onCategoryChange: (category: FaqCategory) => void;
}

export default function FaqTab({
  activeCategory,
  onCategoryChange,
}: FaqTabProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 md:justify-center md:flex-wrap md:pb-0">
      {CATEGORIES.map((category) => {
        const isActive = activeCategory === category.value;
        return (
          <button
            key={category.value}
            onClick={() => onCategoryChange(category.value)}
            className={`textmd-medium cursor-pointer rounded-full px-5 py-2 whitespace-nowrap transition-all duration-200 ${
              isActive
                ? 'bg-khaki-6B5 text-white-FFF scale-102 shadow-sm'
                : 'bg-ivory-F2E/40 text-khaki-6B5 hover:bg-ivory-F2E/80'
            }`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
