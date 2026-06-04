import { Suspense } from 'react';

import ListComponent from '@/components/profile-manages/ListComponent';
import ListSkeleton from '@/components/profile-manages/ListSkeleton';
import ManagesHeader from '@/components/profile-manages/ManagesHeader';

export default function ManagesPage() {
  return (
    <div>
      <ManagesHeader />
      <Suspense fallback={<ListSkeleton />}>
        <ListComponent />
      </Suspense>
    </div>
  );
}
