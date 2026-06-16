'use client';

import Image from 'next/image';
import { ReactNode, useState } from 'react';

import DefaultImg from '@/assets/logo/logo.svg';

interface ReservationCardProps {
  imageUrl?: string;
  children: ReactNode;
  className?: string;
}

export default function ReservationCardContainer({
  imageUrl,
  children,
  className = '',
}: ReservationCardProps) {
  const normalizedImageUrl = imageUrl ?? null;
  const [imgSrc, setImgSrc] = useState<string | null>(normalizedImageUrl);
  const [prevImageUrl, setPrevImageUrl] = useState<string | null>(
    normalizedImageUrl,
  );

  if (normalizedImageUrl !== prevImageUrl) {
    setPrevImageUrl(normalizedImageUrl);
    setImgSrc(normalizedImageUrl);
  }

  const fallbackSrc =
    typeof DefaultImg === 'string' ? DefaultImg : DefaultImg.src;
  const isFallback = !imgSrc || imgSrc === fallbackSrc;

  return (
    <div
      className={`hover:shadow-dropdown flex h-36 w-full gap-2 rounded-2xl bg-white shadow-sm transition-all md:h-38 md:gap-6 lg:h-50 ${className ?? ''}`}
    >
      <div
        className={`relative w-36 shrink-0 self-stretch overflow-hidden rounded-l-2xl md:w-38 lg:w-50 ${
          isFallback ? 'bg-gray-FAF flex items-center justify-center' : ''
        }`}
      >
        <Image
          src={imgSrc || fallbackSrc}
          alt="예약 이미지"
          width={140}
          height={140}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={
            isFallback
              ? 'h-14 w-14 object-contain opacity-40 md:h-16 md:w-16'
              : 'h-full w-full object-cover'
          }
          onError={() => setImgSrc(fallbackSrc)}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between py-3 pr-4.5 lg:py-4">
        {children}
      </div>
    </div>
  );
}
