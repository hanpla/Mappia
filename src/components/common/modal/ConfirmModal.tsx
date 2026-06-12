/**
 * ConfirmModal
 * 하단에 버튼(확인/취소)이 중심이 되는 알림용 모달 컴포넌트
 * 우측 상단 닫기(X) 버튼이 없으며, 사용자의 선택이나 확인이 필요한 상황에 사용
 */

'use client';

import { ReactNode } from 'react';

import Button from '../button/Button';
import Modal from './Modal';

interface ConfirmModalProps {
  isOpen: boolean;
  icon?: ReactNode;
  message: string;
  cancelText?: string;
  confirmText?: string;
  className?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  isOpen,
  icon,
  message,
  cancelText,
  confirmText = '확인',
  className = '',
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      className={`w-full max-w-100 p-[24px_40px] md:p-[30px_60px] ${className}`}
      onClose={onClose}
    >
      <div className="flex flex-col items-center text-center">
        {icon && <div className="mb-0.5">{icon}</div>}
        <div className="textlg-bold md:text2lg-bold mb-5 whitespace-pre-line md:mb-6">
          {message}
        </div>
        <div className="flex w-full gap-2 md:gap-3">
          {cancelText && (
            <Button
              onClick={onClose}
              hasHover={false}
              variant="outline"
              className="flex-1"
            >
              {cancelText}
            </Button>
          )}
          <Button
            onClick={onConfirm}
            hasHover={false}
            variant="solid"
            className="flex-1"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
