'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import useFileInput from '@/hooks/useFileInput';
import useUpdateProfileImage from '@/hooks/useUpdateProfileImage';

import IconEdit from '@/components/common/icon/IconEdit';
import Logo404 from '@/components/common/logo/Logo404';

interface ProfileImageUploadProps {
  name: string;
  defaultSrc?: string;
}

export default function ProfileImageUpload({
  name,
  defaultSrc,
}: ProfileImageUploadProps) {
  const blobUrlRef = useRef<string | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const { mutate, isPending } = useUpdateProfileImage();

  useEffect(() => {
    return () => {
      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
    };
  }, []);

  const clearPreview = () => {
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
    setPreviewSrc(null);
  };

  const { trigger, inputProps } = useFileInput({
    name,
    accept: 'image/jpeg,image/png',
    onUpload: (files) => {
      const file = files[0];
      if (!file) return;

      // 선택 즉시 로컬 미리보기로 교체(낙관적 업데이트).
      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
      const url = URL.createObjectURL(file);
      blobUrlRef.current = url;
      setPreviewSrc(url);

      // 업로드 → 받은 url로 내 정보 수정. 실패 시 미리보기 롤백.
      mutate(file, { onError: clearPreview });
    },
  });

  const imageSrc = previewSrc ?? defaultSrc;

  return (
    <div className="relative h-30 w-30">
      <div className="absolute inset-0 overflow-hidden rounded-full bg-[#F2EBDC]">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt="프로필 이미지"
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Logo404 size={60} />
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={trigger}
        disabled={isPending}
        className="absolute right-0 bottom-0 flex h-7.5 w-7.5 cursor-pointer items-center justify-center rounded-full bg-[#8B7355] transition-colors hover:bg-[#7a6449] disabled:cursor-not-allowed disabled:opacity-60"
        aria-label="프로필 이미지 변경"
      >
        <IconEdit size={16} color="white" />
      </button>
      <input {...inputProps} />
    </div>
  );
}
