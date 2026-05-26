import Image from 'next/image';

export default function UserProfile() {
  const profileSrc = null;

  return (
    <div className="flex items-center justify-center gap-2.5">
      <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-gray-100">
        {profileSrc ? (
          <Image
            src={profileSrc}
            alt="프로필 이미지"
            fill
            className="object-cover"
          />
        ) : null}
      </div>
      <span>Nickname</span>
    </div>
  );
}
