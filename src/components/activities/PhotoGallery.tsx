import Image from 'next/image';

import { ActivityDetailContent } from '@/types/activities';

interface PhotoGalleryProps {
  activity: ActivityDetailContent;
}

export default function PhotoGallery({ activity }: PhotoGalleryProps) {
  const { title, bannerImageUrl, subImages } = activity;

  const displaySubImages = (subImages || [])
    .map((img) => img?.imageUrl)
    .filter((url): url is string => !!url)
    .slice(0, 2);

  const subImageCount = displaySubImages.length;

  return (
    <section className="flex h-61.25 gap-2 overflow-hidden rounded-3xl md:h-100 md:gap-3">
      <div
        className={`bg-gray-FAF relative h-full ${
          subImageCount === 0 ? 'w-full' : 'w-[50%]'
        }`}
      >
        <Image
          src={bannerImageUrl}
          alt={`${title} 배너 이미지`}
          fill
          sizes={
            subImageCount === 0 ? '100vw' : '(max-width: 768px) 50vw, 66vw'
          }
          priority
          className="object-cover"
        />
      </div>

      {subImageCount > 0 && (
        <div className="flex h-full flex-1 flex-col gap-2 md:gap-3">
          {displaySubImages.map((src, index) => (
            <div key={index} className="bg-gray-FAF relative flex-1">
              <Image
                src={src}
                alt={`${title} 서브 이미지 ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
