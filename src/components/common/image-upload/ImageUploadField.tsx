'use client';

import ImagePreview from './ImagePreview';
import ImageUploadBox from './ImageUploadBox';

export type UploadImage = File | string;

interface ImageUploadFieldProps {
  name: string;
  label: string;
  maxCount: number;
  images: UploadImage[];
  onChange: (images: UploadImage[]) => void;
}

export default function ImageUploadField({
  name,
  label,
  maxCount,
  images,
  onChange,
}: ImageUploadFieldProps) {
  const handleUpload = (newFiles: File[]) => {
    const remainingCount = maxCount - images.length;
    if (remainingCount <= 0) return;

    const existingFiles = images.filter(
      (img): img is File => img instanceof File,
    );
    const filesToUpload = newFiles
      .filter(
        (f) =>
          !existingFiles.some(
            (img) =>
              img.name === f.name &&
              img.size === f.size &&
              img.lastModified === f.lastModified,
          ),
      )
      .slice(0, remainingCount);
    onChange([...images, ...filesToUpload]);
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const getKey = (image: UploadImage, index: number) =>
    typeof image === 'string'
      ? `${image}-${index}`
      : `${image.name}-${image.size}-${image.lastModified}`;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-1">
        <h3 className="textlg-bold text-black-1B1">{label}</h3>
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
        {images.map((image, index) => (
          <ImagePreview
            key={getKey(image, index)}
            image={image}
            onRemove={() => handleRemove(index)}
          />
        ))}
      </div>
    </div>
  );
}
