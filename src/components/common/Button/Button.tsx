import React from 'react';

const SIZE_STYLES = {
  lg: 'w-[350px] h-[48px] py-[14px] px-[136px]',
  md: 'w-[144px] h-[48px] py-[8px] px-[12px]',
  sm: 'w-[108px] h-[38px] py-[10px] px-[20px]',
};

const FONT_STYLES = {
  lg: 'textlg-bold',
  md: 'textlg-bold',
  sm: 'textmd-bold',
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'lg' | 'md' | 'sm';
}

export default function Button({
  children,
  size = 'lg',
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-[8px] rounded-[6px] transition-all duration-200 ${SIZE_STYLES[size]} ${FONT_STYLES[size]} bg-black-1B1 text-gray-FAF border-black-1B1 hover:text-black-1B1 disabled:bg-gray-A1A disabled:text-gray-FAF cursor-pointer border hover:bg-white disabled:cursor-not-allowed disabled:border-transparent ${className} `}
      {...props}
    >
      {children}
    </button>
  );
}
