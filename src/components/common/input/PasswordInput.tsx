'use client';

import { useState } from 'react';

import IconVisibilityOff from '@/components/common/icon/IconVisibilityOff';
import IconVisibilityOn from '@/components/common/icon/IconVisibilityOn';

import Input, { InputProps } from './Input';

export type PasswordInputProps = Omit<InputProps, 'type' | 'rightIcon'>;

const ICON_PROPS = { size: 24, color: '#A1A1A1' };

export default function PasswordInput({
  hasError,
  ...props
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisible = () => setIsVisible((prev) => !prev);

  return (
    <Input
      type={isVisible ? 'text' : 'password'}
      hasError={hasError}
      rightIcon={
        <button
          type="button"
          onClick={toggleVisible}
          className="mr-2 flex items-center justify-center focus:outline-none"
          aria-label={isVisible ? '비밀번호 숨기기' : '비밀번호 표시'}
        >
          {isVisible ? (
            <IconVisibilityOn {...ICON_PROPS} />
          ) : (
            <IconVisibilityOff {...ICON_PROPS} />
          )}
        </button>
      }
      {...props}
    />
  );
}
