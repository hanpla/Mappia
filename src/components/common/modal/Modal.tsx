'use client';

import { ReactNode, useEffect } from 'react';

import useClickOutside from '@/hooks/useClickOutside';

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
  isGlobal?: boolean;
  onClose: () => void;
}

export default function Modal({
  isOpen,
  children,
  className = '',
  isGlobal = true,
  onClose,
}: ModalProps) {
  const modalRef = useClickOutside<HTMLDivElement>(onClose);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    let prevOverflow = '';
    if (isGlobal) {
      prevOverflow = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);

      if (isGlobal) {
        document.body.style.overflow = prevOverflow;
      }
    };
  }, [isOpen, isGlobal, onClose]);

  if (!isOpen) return null;

  const commonStyle = `flex flex-col rounded-3xl bg-white shadow-[0_4px_16px_rgba(17,34,17,0.05)] md:rounded-[30px] ${className}`;

  if (!isGlobal) {
    return (
      <div
        ref={modalRef}
        role="dialog"
        aria-label="모달"
        className={`absolute z-40 ${commonStyle}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-4">
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="모달"
        className={commonStyle}
      >
        {children}
      </div>
    </div>
  );
}
