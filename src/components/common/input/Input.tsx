import { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  id: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  hasError?: boolean;
}

export default function Input({
  id,
  type = 'text',
  placeholder,
  leftIcon,
  rightIcon,
  hasError,
  className = '',
  ...props
}: InputProps) {
  return (
    <div
      className={`border-gray-A4A flex h-14 items-center rounded-sm border bg-white transition-colors duration-200 ${
        hasError ? 'border-red-FF4' : 'focus-within:border-[#8B7355]'
      } ${className}`}
    >
      {leftIcon && (
        <span className="text-gray-A1A flex shrink-0 items-center">
          {leftIcon}
        </span>
      )}
      <input
        id={id}
        type={type}
        className="textlg-regular h-full min-w-0 flex-1 border-0 px-2 outline-none"
        placeholder={placeholder}
        {...props}
      />
      {rightIcon && (
        <span className="text-gray-A1A flex shrink-0 items-center">
          {rightIcon}
        </span>
      )}
    </div>
  );
}
