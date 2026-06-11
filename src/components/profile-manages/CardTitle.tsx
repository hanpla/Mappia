'use client';

import Image from 'next/image';
import { useState } from 'react';

import logoImg from '@/assets/logo/logo.svg';

interface CardTitleProps {
  bannerImageUrl: string;
  title: string;
}

export default function CardTitle({ bannerImageUrl, title }: CardTitleProps) {
  const [prevUrl, setPrevUrl] = useState(bannerImageUrl);
  const [imgSrc, setImgSrc] = useState(bannerImageUrl);

  if (bannerImageUrl !== prevUrl) {
    setPrevUrl(bannerImageUrl);
    setImgSrc(bannerImageUrl);
  }

  const isFallback = imgSrc === logoImg.src;

  return (
    <div
      className={`relative h-36 w-36 overflow-hidden rounded-l-2xl md:h-39 md:w-39 ${
        isFallback ? 'bg-gray-FAF flex items-center justify-center' : ''
      }`}
    >
      <Image
        src={imgSrc}
        alt={title}
        width={140}
        height={140}
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={
          isFallback
            ? 'h-14 w-14 object-contain opacity-40 md:h-16 md:w-16'
            : 'h-full w-full object-cover'
        }
        onError={() => setImgSrc(logoImg.src)}
      />
    </div>
  );
}
