import { ComponentPropsWithoutRef, ReactNode } from 'react';

import { twMerge } from 'tailwind-merge';

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  id: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  hasError?: boolean;
  labelType?: 'default' | 'floating';
  labelBgClass?: string;
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
  labelBgClass = 'bg-white peer-focus:bg-white',
  ...props
}: InputProps) {
  const isFloating = labelType === 'floating';

  return (
    <div
      className={twMerge(
        'border-gray-A4A relative flex h-12 items-center rounded-2xl border bg-white transition-colors duration-200 md:h-14',
        hasError ? 'border-red-FF4' : 'focus-within:border-beige-8B7',
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
          className={`textlg-regular peer h-full w-full min-w-0 rounded-2xl border-0 px-4 outline-none ${leftIcon && 'pr-2 pl-0'}`}
          placeholder={isFloating ? ' ' : placeholder}
          {...props}
        />
        {isFloating && (
          <span
            className={twMerge(
              'text-black-1B1 peer-placeholder-shown:text-gray-A1A peer-focus:text-brown-2A2 pointer-events-none absolute top-0 left-2 z-10 max-w-[calc(100%-1rem)] -translate-y-1/2 truncate text-xs whitespace-nowrap transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:bg-none peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs',
              labelBgClass,
            )}
          >
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
