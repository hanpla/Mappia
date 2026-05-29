import React from 'react';

import { twMerge } from 'tailwind-merge';

const SIZE_STYLES = {
  lg: 'h-[48px] py-[14px] px-[32px]',
  md: 'h-[48px] py-[8px] px-[12px]',
  sm: 'h-[38px] py-[10px] px-[20px]',
};

const FONT_STYLES = {
  lg: 'textlg-bold',
  md: 'textlg-bold',
  sm: 'textmd-bold',
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'lg' | 'md' | 'sm';
}

export default function CategoryButton({
  children,
  size = 'lg',
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={twMerge(
        'bg-brown-2A2 border-brown-2A2 hover:text-brown-2A2 disabled:bg-beige-8B7 inline-flex cursor-pointer items-center justify-center gap-[8px] rounded-[16px] border text-[#FFFFFF] transition-all duration-200 hover:bg-white disabled:cursor-not-allowed disabled:border-transparent disabled:text-[#FFFFFF]',
        SIZE_STYLES[size],
        FONT_STYLES[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
