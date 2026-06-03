import Image from 'next/image';

export default function PhotoGallery() {
  const SUB_IMAGES = [
    { src: '/img/activity-sub-image-01.png', alt: '체험 서브 이미지 1' },
    { src: '/img/activity-sub-image-02.png', alt: '체험 서브 이미지 2' },
  ];

  return (
    <section className="flex h-[245px] gap-2 overflow-hidden rounded-3xl md:h-[400px] md:gap-3">
      <div className="relative h-full w-[50%]">
        <Image
          src="/img/activity-banner-image.png"
          alt="체험 배너 이미지"
          fill
          sizes="(max-width: 768px) 50vw, 66vw"
          priority
          className="object-cover"
        />
      </div>
      <div className="flex h-full flex-1 flex-col gap-2 md:gap-3">
        {SUB_IMAGES.map((img, index) => (
          <div key={index} className="relative flex-1">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
