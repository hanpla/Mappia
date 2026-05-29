'use client';

import { useEffect } from 'react';

import useClickOutside from '@/hooks/useClickOutside';

interface DropdownEditDeleteProps {
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
  className?: string;
}

const BUTTON_BASE_CLASS =
  'textmd-medium hover:bg-gray-FAF flex h-12 w-full items-center justify-center transition-colors duration-150';

export default function DropdownEditDelete({
  onEdit,
  onDelete,
  onClose,
  className = '',
}: DropdownEditDeleteProps) {
  const ref = useClickOutside<HTMLDivElement>(onClose);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit();
    onClose();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
    onClose();
  };

  return (
    <div
      ref={ref}
      className={`border-gray-EEE shadow-dropdown absolute right-0 z-50 mt-1 w-36 overflow-hidden rounded-2xl border bg-white ${className}`}
    >
      <button
        type="button"
        onClick={handleEditClick}
        className={`${BUTTON_BASE_CLASS} text-black-1B1`}
      >
        수정하기
      </button>
      <div className="bg-gray-EEE h-px w-full" />
      <button
        type="button"
        onClick={handleDeleteClick}
        className={`${BUTTON_BASE_CLASS} text-red-500`}
      >
        삭제하기
      </button>
    </div>
  );
}
