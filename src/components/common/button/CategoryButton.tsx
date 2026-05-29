import React from 'react';

import { twMerge } from 'tailwind-merge';

interface CategoryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'lg' | 'md' | 'sm';
  isActive?: boolean;
}

const SIZE_STYLES = {
  lg: 'h-[58px] py-[16px] px-[30px]',
  md: 'h-[58px] py-[16px] px-[30px]',
  sm: 'h-[41px] py-[12px] px-[20px]',
};

const FONT_STYLES = {
  lg: 'text2lg-medium',
  md: 'text2lg-medium',
  sm: 'textlg-medium',
};

export default function CategoryButton({
  children,
  size = 'lg',
  className = '',
  isActive = false,
  ...props
}: CategoryButtonProps) {
  return (
    <button
      className={twMerge(
        'inline-flex cursor-pointer items-center justify-center gap-[8px] rounded-[16px] border transition-all duration-200',
        isActive
          ? 'bg-beige-8B7 border-beige-8B7 text-[#FFFFFF]'
          : 'text-beige-8B7 border-beige-8B7 bg-[#ffffff]',
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
