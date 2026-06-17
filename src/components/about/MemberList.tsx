import MEMBERS_JSON from '@/constants/about.json';

import MemberCard from './MemberCard';

interface Member {
  name: string;
  githubId: string;
  role: string;
}

const MEMBERS = MEMBERS_JSON as Member[];

export default function MemberList() {
  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text2xl-bold text-brown-2A2">Mappia 개발 팀원</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MEMBERS.map((member) => (
          <MemberCard
            key={member.githubId}
            name={member.name}
            githubId={member.githubId}
            role={member.role}
          />
        ))}
      </div>
    </div>
  );
}
