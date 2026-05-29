import Link from 'next/link';

import Button from '@/components/common/button/Button';

export default function Home() {
  return (
    <div>
      {/* 임시로 Link 넣어둠 */}
      <Link href="/activities">체험 목록</Link>
      <Button>버튼</Button>
    </div>
  );
}
