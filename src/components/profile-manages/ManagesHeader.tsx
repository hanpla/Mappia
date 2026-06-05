'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/common/button/Button';
import Title from '@/components/profile-title/Title';

export default function ManagesHeader() {
  const router = useRouter();

  return (
    <Title
      title="내 체험 관리"
      action={
        <Button
          className="bg-brown-2A2 w-30 rounded-md p-0"
          onClick={() => router.push('/my-activities/register')}
        >
          체험 등록하기
        </Button>
      }
    />
  );
}
