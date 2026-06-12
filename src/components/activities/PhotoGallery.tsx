import Image from 'next/image';

import { ActivityDetailContent } from '@/types/activities';

import Logo from '../common/logo/Logo';

interface PhotoGalleryProps {
  activity: ActivityDetailContent;
}

const MAX_SUB_IMAGES = 2;

export default function PhotoGallery({ activity }: PhotoGalleryProps) {
  const { title, bannerImageUrl, subImages } = activity;

  const displaySubImages = Array.from(
    { length: MAX_SUB_IMAGES },
    (_, index) => {
      return subImages?.[index]?.imageUrl || null;
    },
  );

  return (
    <section className="flex h-61.25 gap-2 overflow-hidden rounded-3xl md:h-100 md:gap-3">
      <div className="bg-gray-FAF relative h-full w-[50%]">
        <Image
          src={bannerImageUrl}
          alt={`${title} 배너 이미지`}
          fill
          sizes="(max-width: 768px) 50vw, 66vw"
          priority
          className="object-cover"
        />
      </div>
      <div className="flex h-full flex-1 flex-col gap-2 md:gap-3">
        {displaySubImages.map((src, index) => (
          <div key={index} className="bg-gray-FAF relative flex-1">
            {src ? (
              <Image
                src={src}
                alt={`${title} 서브 이미지 ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Logo className="h-15 w-15 opacity-40 md:h-30 md:w-30" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
