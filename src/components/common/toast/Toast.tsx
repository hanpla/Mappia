import Image from 'next/image';

import { ToastType } from '@/types/toast';

import informationIcon from '@/assets/icons/Icon_info.svg';
import errorIcon from '@/assets/icons/Icon_rejection.svg';
import successIcon from '@/assets/icons/Icon_success.svg';

interface ToastProps {
  type: ToastType;
  message: string;
}

const TOAST_STYLES: Record<ToastType, string> = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  information: 'bg-khaki-6B5',
};

const TOAST_ICONS = {
  success: successIcon,
  error: errorIcon,
  information: informationIcon,
};

export default function Toast({ type, message }: ToastProps) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-4 py-3 text-white shadow-md ${TOAST_STYLES[type]}`}
    >
      <Image src={TOAST_ICONS[type]} alt="" width={20} height={20} />
      <span className="textsm-medium">{message}</span>
    </div>
  );
}
