import { ComponentPropsWithoutRef, ReactNode } from 'react';

import { twMerge } from 'tailwind-merge';

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  id: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  hasError?: boolean;
  labelType?: 'default' | 'floating';
}

export default function Input({
  id,
  type = 'text',
  placeholder,
  leftIcon,
  rightIcon,
  hasError,
  className = '',
  labelType = 'default',
  ...props
}: InputProps) {
  const isFloating = labelType === 'floating';

  return (
    <div
      className={twMerge(
        'border-gray-A4A flex h-14 items-center rounded-2xl border bg-white transition-colors duration-200',
        hasError ? 'border-red-FF4' : 'focus-within:border-[#8B7355]',
        className,
      )}
    >
      {leftIcon && (
        <span className="text-gray-A1A flex shrink-0 items-center">
          {leftIcon}
        </span>
      )}
      <div className="relative h-full flex-1">
        <input
          id={id}
          type={type}
          className={`textlg-regular peer h-full w-full min-w-0 border-0 px-4 outline-none ${leftIcon && 'pl-2'}`}
          placeholder={isFloating ? ' ' : placeholder}
          {...props}
        />
        {isFloating && (
          <span className="text-gray-A1A pointer-events-none absolute top-0 left-2 -translate-y-1/2 bg-white px-1 text-xs transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:text-xs peer-focus:text-[#8B7355]">
            {placeholder}
          </span>
        )}
      </div>
      {rightIcon && (
        <span className="text-gray-A1A flex shrink-0 items-center">
          {rightIcon}
        </span>
      )}
    </div>
  );
}
