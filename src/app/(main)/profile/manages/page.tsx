import { Suspense } from 'react';

import Button from '@/components/common/button/Button';
import ListComponent from '@/components/profile-manages/ListComponent';
import ListSkeleton from '@/components/profile-manages/ListSkeleton';
import Title from '@/components/profile-title/Title';

export default function ManagesPage() {
  return (
    <div>
      <Title
        title="내 체험 관리"
        action={
          <Button className="bg-brown-2A2 w-30 rounded-md p-0">
            체험 등록하기
          </Button>
        }
      />
      <Suspense fallback={<ListSkeleton />}>
        <ListComponent />
      </Suspense>
    </div>
  );
}
