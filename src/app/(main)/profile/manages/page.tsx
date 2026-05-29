import { Suspense } from 'react';

import ListComponent from '@/components/profile-manages/ListComponent';
import ListSkeleton from '@/components/profile-manages/ListSkeleton';
import Title from '@/components/profile-manages/Title';

export default function ManagesPage() {
  return (
    <div>
      <Title />
      <Suspense fallback={<ListSkeleton />}>
        <ListComponent />
      </Suspense>
    </div>
  );
}
