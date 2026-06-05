'use client';

import useFileInput from '@/hooks/useFileInput';

import IconPlus from '@/components/common/icon/IconPlus';

interface ImageUploadBoxProps {
  name: string;
  currentCount: number;
  maxCount: number;
  onUpload: (files: File[]) => void;
}

export default function ImageUploadBox({
  name,
  currentCount,
  maxCount,
  onUpload,
}: ImageUploadBoxProps) {
  const { trigger, inputProps } = useFileInput({
    name,
    accept: 'image/jpeg,image/png',
    multiple: true,
    onUpload,
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files) {
      const validFiles = Array.from(files).filter((file) =>
        ['image/jpeg', 'image/png'].includes(file.type),
      );
      if (validFiles.length > 0) {
        onUpload(validFiles);
      }
    }
  };

  const labelText =
    currentCount > 0 ? `${currentCount}/${maxCount}` : '이미지 등록';

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="이미지 추가"
      onClick={trigger}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          trigger();
        }
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="border-beige-8B7 focus:border-khaki-6B5 flex h-32 w-32 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border bg-white transition-colors hover:bg-gray-100 focus:outline-none"
    >
      <input {...inputProps} />
      <IconPlus size={32} color="#4b4b4b" />
      <span className="textmd-medium text-gray-4B4">{labelText}</span>
    </div>
  );
}
