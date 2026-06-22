'use client';

import Link from 'next/link';

export interface EditDropdownProps {
  editUrl: string;
  onDelete: () => void;
  onEdit?: () => void;
  onClose?: () => void;
  className?: string;
}

const ITEM_CLASS =
  'text-black-1B1 hover:bg-gray-FAF textlg-medium block w-full cursor-pointer py-3.5 text-center transition-all duration-150 outline-none';

export default function EditDropdown({
  editUrl,
  onDelete,
  onEdit,
  onClose,
  className = '',
}: EditDropdownProps) {
  const handleDelete = () => {
    onDelete();
    if (onClose) onClose();
  };

  const handleEdit = () => {
    onEdit?.();
    if (onClose) onClose();
  };

  return (
    <div
      className={`shadow-dropdown border-gray-DDD bg-white-FFF absolute right-0 z-50 mt-1 w-36 overflow-hidden rounded-lg border ${className}`}
    >
      <ul className="flex flex-col">
        <li className="border-gray-EEE border-b">
          <Link href={editUrl} onClick={handleEdit} className={ITEM_CLASS}>
            수정하기
          </Link>
        </li>
        <li>
          <button
            type="button"
            onClick={handleDelete}
            className={`${ITEM_CLASS} text-red-FF4`}
          >
            삭제하기
          </button>
        </li>
      </ul>
    </div>
  );
}
