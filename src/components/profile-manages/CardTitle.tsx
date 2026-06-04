'use client';

import Image from 'next/image';
import { useState } from 'react';

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

  return (
    <div className="relative h-36 w-36 rounded-2xl md:h-39 md:w-39">
      <Image
        src={imgSrc}
        alt={title}
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="rounded-tl-2xl rounded-bl-2xl object-cover"
        onError={() => setImgSrc('/img/Card_curation.png')}
      />
    </div>
  );
}
