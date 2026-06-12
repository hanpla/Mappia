'use client';

import Image, { type ImageProps } from 'next/image';

import { twMerge } from 'tailwind-merge';

import useDeleteProfileImage from '@/hooks/useDeleteProfileImage';
import useFileInput from '@/hooks/useFileInput';
import useUpdateProfileImage from '@/hooks/useUpdateProfileImage';

import IconEdit from '@/components/common/icon/IconEdit';
import IconX from '@/components/common/icon/IconX';
import Logo404 from '@/components/common/logo/Logo404';

interface ProfileImageUploadProps {
  name: string;
  defaultSrc?: string | null;
  className?: string;
  defaultImage?: ImageProps['src'];
}

export default function ProfileImageUpload({
  name,
  defaultSrc,
  className,
  defaultImage,
}: ProfileImageUploadProps) {
  const { mutate: uploadImage, isPending: isUploading } =
    useUpdateProfileImage();
  const { mutate: deleteImage, isPending: isDeleting } =
    useDeleteProfileImage();
  const isBusy = isUploading || isDeleting;

  const { trigger, inputProps } = useFileInput({
    name,
    accept: 'image/jpeg,image/png',
    onUpload: (files) => {
      const file = files[0];
      if (file) uploadImage(file);
    },
  });

  const handleDelete = () => {
    deleteImage();
  };

  // 미리보기·교체·삭제 모두 ['me'] 캐시(defaultSrc)를 단일 진실원천으로 사용한다.
  const imageSrc = defaultSrc;

  return (
    <div className="relative h-25 w-25 md:h-17.5 md:w-17.5 lg:h-30 lg:w-30">
      <div
        className={twMerge(
          'absolute inset-0 overflow-hidden rounded-full bg-[#F2EBDC]',
          className,
        )}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt="프로필 이미지"
            fill
            className="object-cover"
            unoptimized
          />
        ) : defaultImage ? (
          <Image
            src={defaultImage}
            alt="기본 프로필 이미지"
            fill
            className="object-contain p-[15%] opacity-60"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Logo404 className="h-3/5 w-3/5" />
          </div>
        )}
      </div>
      {imageSrc && (
        <button
          type="button"
          onClick={handleDelete}
          disabled={isBusy}
          className="bg-gray-DDD hover:bg-gray-CBC absolute top-0 left-0 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-60 lg:h-7.5 lg:w-7.5"
          aria-label="프로필 이미지 삭제"
        >
          <IconX size={16} color="#1b1b1b" strokeWidth={5.5} />
        </button>
      )}
      <button
        type="button"
        onClick={trigger}
        disabled={isBusy}
        className="bg-beige-8B7 absolute right-0 bottom-0 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-[#7a6449] disabled:cursor-not-allowed disabled:opacity-60 lg:h-7.5 lg:w-7.5"
        aria-label="프로필 이미지 변경"
      >
        <IconEdit size={16} color="white" />
      </button>
      <input {...inputProps} />
    </div>
  );
}
