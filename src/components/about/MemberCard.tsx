import Image from 'next/image';

import IconGithub from '@/components/common/icon/IconGithub';

interface MemberCardProps {
  name: string;
  githubId: string;
  role: string;
}

export default function MemberCard({ name, githubId, role }: MemberCardProps) {
  return (
    <div className="group bg-white-FFF border-gray-EEE relative flex flex-col items-center rounded-3xl border p-6 shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md">
      <div className="border-ivory-F2E bg-gray-FAF relative h-24 w-24 overflow-hidden rounded-full border-2">
        <Image
          src={`https://avatars.githubusercontent.com/${githubId}`}
          alt={`${name} 프로필 이미지`}
          fill
          sizes="96px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <h3 className="text-xl-bold text-brown-2A2 mt-4">{name}</h3>
      <span className="bg-ivory-F2E/60 text-xs-semibold text-khaki-6B5 mt-1.5 rounded-full px-3 py-0.5">
        {role}
      </span>

      <a
        href={`https://github.com/${githubId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="border-gray-DDD bg-white-FFF text-md-medium text-khaki-6B5 hover:bg-ivory-F2E/30 hover:border-khaki-6B5 hover:text-brown-2A2 mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border py-3 transition-all duration-300"
      >
        <IconGithub size={16} color="currentColor" />
        GitHub 프로필
      </a>
    </div>
  );
}
