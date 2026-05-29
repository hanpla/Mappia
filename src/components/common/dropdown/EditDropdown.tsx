'use client';

import Link from 'next/link';

export interface EditDropdownProps {
  editUrl: string;
  onDelete: () => void;
  onClose?: () => void;
  className?: string;
}

export default function EditDropdown({
  editUrl,
  onDelete,
  onClose,
  className = '',
}: EditDropdownProps) {
  const handleDelete = () => {
    onDelete();
    if (onClose) onClose();
  };

  return (
    <div
      className={`shadow-dropdown border-gray-DDD bg-white-FFF absolute right-0 z-50 mt-[4px] w-[160px] overflow-hidden rounded-[8px] border ${className}`}
    >
      <ul className="flex flex-col">
        <li className="border-gray-EEE border-b">
          <Link
            href={editUrl}
            onClick={onClose}
            className="text-black-1B1 hover:bg-gray-FAF textlg-medium block w-full py-[14px] text-center transition-all duration-150 outline-none"
          >
            수정하기
          </Link>
        </li>
        <li>
          <button
            type="button"
            onClick={handleDelete}
            className="text-black-1B1 hover:bg-gray-FAF textlg-medium block w-full cursor-pointer py-[14px] text-center transition-all duration-150 outline-none"
          >
            삭제하기
          </button>
        </li>
      </ul>
    </div>
  );
}
