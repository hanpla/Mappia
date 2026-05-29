'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import IconX from '@/components/common/icon/IconX';

interface ImagePreviewProps {
  file: File;
  onRemove: () => void;
}

export default function ImagePreview({ file, onRemove }: ImagePreviewProps) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUrl(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return (
    <div className="relative h-32 w-32 shrink-0">
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        {url && (
          <Image
            src={url}
            alt="미리보기 이미지"
            fill
            className="object-cover"
            unoptimized
          />
        )}
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="bg-black-1B1/80 absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-black/70"
        aria-label="이미지 삭제"
      >
        <IconX size={16} color="white" />
      </button>
    </div>
  );
}
