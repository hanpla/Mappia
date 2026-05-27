import { ReactNode } from 'react';

export interface InputFieldProps {
  label: string;
  error?: string | null;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}

export default function InputField({
  label,
  error,
  htmlFor,
  children,
  className = '',
}: InputFieldProps) {
  return (
    <div className={`flex w-full flex-col gap-2 ${className}`}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="textlg-regular text-black-1B1 flex items-center font-medium"
        >
          {label}
        </label>
      )}
      {children}
      {error && <p className="textxs-regular text-red-FF4">{error}</p>}
    </div>
  );
}
