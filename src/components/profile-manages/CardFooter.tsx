'use client';

import { useState } from 'react';

import useClickOutside from '@/hooks/useClickOutside';

import IconMeatball from '@/components/common/icon/IconMeatball';

import Dropdown from '../common/dropdown/Dropdown';

interface CardFooterProps {
  price: number;
  activityId?: number;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function CardFooter({
  price,
  activityId,
  onEdit,
  onDelete,
}: CardFooterProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    setIsDropdownOpen(false);
  });

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="mt-auto flex items-center justify-between">
      <div className="text-black-1B1 flex items-baseline gap-0.5">
        <span className="textmd-bold md:textlg-bold">
          ₩{price.toLocaleString()}
        </span>
        <span className="textlg-medium">/ 인</span>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={toggleDropdown}
          className="hover:bg-gray-FAF flex size-8 items-center justify-center rounded-full transition-colors"
          aria-label="메뉴 열기"
        >
          <IconMeatball size={24} className="cursor-pointer" />
        </button>

        {isDropdownOpen && (
          <Dropdown
            type="edit"
            editUrl={activityId ? `/profile/manages/${activityId}/edit` : '#'}
            onEdit={() => {
              if (activityId) {
                onEdit?.(activityId);
              }
            }}
            onDelete={() => {
              if (activityId) {
                onDelete?.(activityId);
              }
            }}
            onClose={() => setIsDropdownOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
