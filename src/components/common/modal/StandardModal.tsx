/**
 * StandardModal
 * 우측 상단에 닫기(X) 버튼이 포함된 모달 컴포넌트
 * 후기 작성, 캘린더 등 사용
 */

'use client';

import { ReactNode } from 'react';

import IconX from '../icon/IconX';
import Modal from './Modal';

interface StandardModalProps {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
  isGlobal?: boolean;
  onClose: () => void;
}

export default function StandardModal({
  isOpen,
  children,
  className = '',
  isGlobal = true,
  onClose,
}: StandardModalProps) {
  const hasCustomWidth = /(?:^|\s)(?:[a-z]+:)?(?:min-|max-)?w-/.test(className);
  const widthStyle = hasCustomWidth ? '' : 'w-full max-w-[385px]';

  return (
    <Modal
      isOpen={isOpen}
      className={`${widthStyle} ${className}`}
      isGlobal={isGlobal}
      onClose={onClose}
    >
      <div className="relative w-full p-[40px_24px_30px] md:p-[50px_30px_40px]">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          type="button"
          className="absolute top-4 right-6 z-50 cursor-pointer md:top-[26px] md:right-[30px]"
          aria-label="모달 닫기"
        >
          <IconX size={24} />
        </button>
        <div className="w-full">{children}</div>
      </div>
    </Modal>
  );
}
