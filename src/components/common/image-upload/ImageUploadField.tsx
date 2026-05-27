'use client';

import ImagePreview from './ImagePreview';
import ImageUploadBox from './ImageUploadBox';

interface ImageUploadFieldProps {
  name: string;
  label: string;
  isRequired?: boolean;
  maxCount: number;
  images: File[];
  onChange: (images: File[]) => void;
}

export default function ImageUploadField({
  name,
  label,
  isRequired = false,
  maxCount,
  images,
  onChange,
}: ImageUploadFieldProps) {
  const handleUpload = (newFiles: File[]) => {
    const remainingCount = maxCount - images.length;
    if (remainingCount <= 0) return;

    const filesToUpload = newFiles.slice(0, remainingCount);
    onChange([...images, ...filesToUpload]);
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-1">
        <h3 className="text2xl-bold text-black-1B1">{label}</h3>
        {isRequired && <span className="text-red-FF4">*</span>}
      </div>
      <div className="flex flex-wrap gap-3.5">
        {images.length < maxCount && (
          <ImageUploadBox
            name={name}
            currentCount={images.length}
            maxCount={maxCount}
            onUpload={handleUpload}
          />
        )}
        {images.map((file, index) => (
          <ImagePreview
            key={`${file.name}-${index}`}
            file={file}
            onRemove={() => handleRemove(index)}
          />
        ))}
      </div>
    </div>
  );
}
