import { ComponentPropsWithoutRef } from 'react';

import { twMerge } from 'tailwind-merge';

export interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {
  id: string;
}

export default function Textarea({
  id,
  placeholder,
  className = '',
  rows = 4,
  ...props
}: TextareaProps) {
  return (
    <textarea
      id={id}
      rows={rows}
      className={twMerge(
        'textlg-regular border-gray-A4A focus:border-beige-8B7 w-full resize-none rounded-2xl border bg-white px-3 py-3 transition-colors duration-200 outline-none',
        className,
      )}
      placeholder={placeholder}
      {...props}
    />
  );
}
