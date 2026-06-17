'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

import { twMerge } from 'tailwind-merge';

interface ImageWithFallbackProps extends ImageProps {
  fallbackClassName?: string;
}

export default function ImageWithFallback({
  fallbackClassName = '',
  alt,
  src,
  ...props
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={twMerge(
          'bg-gray-EEE text-gray-A1A flex h-full w-full items-center justify-center text-sm',
          fallbackClassName,
        )}
        aria-label={alt}
      >
        이미지 없음
      </div>
    );
  }

  return (
    <Image alt={alt} src={src} onError={() => setHasError(true)} {...props} />
  );
}
