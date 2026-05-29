import React from 'react';

import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'lg' | 'md' | 'sm';
  hasHover?: boolean;
  variant?: 'solid' | 'outline';
}

const SIZE_STYLES = {
  lg: 'h-[48px] px-[32px]',
  md: 'h-[48px] px-[12px]',
  sm: 'h-[38px] px-[20px]',
};

const FONT_STYLES = {
  lg: 'textlg-bold',
  md: 'textlg-bold',
  sm: 'textmd-bold',
};

export default function Button({
  children,
  size = 'lg',
  className = '',
  disabled,
  hasHover = true,
  variant = 'solid',
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={twMerge(
        'disabled:bg-beige-8B7 inline-flex cursor-pointer items-center justify-center gap-[8px] rounded-[16px] border whitespace-nowrap transition-all duration-200 disabled:cursor-not-allowed disabled:border-transparent disabled:text-white-FFF',
        variant === 'solid'
          ? [
              'bg-brown-2A2 border-brown-2A2 text-white-FFF',
              hasHover ? 'hover:text-brown-2A2 hover:bg-white-FFF' : '',
            ]
          : [
              'border-brown-2A2 text-brown-2A2 bg-white-FFF',
              hasHover ? 'hover:bg-brown-2A2 hover:text-white-FFF' : '',
            ],
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
