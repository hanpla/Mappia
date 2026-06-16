import { Metadata } from 'next';

import GithubButton from '@/components/about/GithubButton';
import MemberList from '@/components/about/MemberList';

export const metadata: Metadata = {
  title: '팀 소개 - Mappia',
  description:
    'Mappia 서비스를 함께 기획하고 개발한 프론트엔드 기여 팀원들과 프로젝트 저장소를 소개합니다.',
};

export default function AboutPage() {
  return (
    <div className="space-y-6 pt-8 pb-16">
      <h1 className="text3xl-bold text-brown-2A2 text-center">팀 소개</h1>
      <MemberList />
      <GithubButton />
    </div>
  );
}
