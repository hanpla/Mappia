import Link from 'next/link';
import { Suspense } from 'react';

import ListComponent from '@/components/profile-manages/ListComponent';
import ListSkeleton from '@/components/profile-manages/ListSkeleton';
import Title from '@/components/profile-title/Title';

export default function ManagesPage() {
  return (
    <div>
      <Title
        title="내 체험 관리"
        action={
          <Link
            href="/my-activities/register"
            className="bg-brown-2A2 textlg-bold inline-flex h-12 w-30 items-center justify-center rounded-sm text-center text-white"
          >
            체험 등록하기
          </Link>
        }
      />
      <Suspense fallback={<ListSkeleton />}>
        <ListComponent />
      </Suspense>
    </div>
  );
}
