import Link from 'next/link';

import ManageList from '@/components/profile-manages/ManageList';
import Title from '@/components/profile-ui/Title';

export default function ManagesPage() {
  return (
    <div>
      <Title
        title="내 체험 관리"
        action={
          <Link
            href="/my-activities/register"
            className="bg-brown-2A2 textlg-bold inline-flex h-12 w-30 items-center justify-center rounded-xl text-center text-white"
          >
            체험 등록하기
          </Link>
        }
      />
      <ManageList />
    </div>
  );
}
