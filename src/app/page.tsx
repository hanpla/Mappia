'use client';

import Link from 'next/link';
import { useState } from 'react';

import Button from '@/components/common/button/Button';
import CategoryButton from '@/components/common/button/CategoryButton';

export default function Home() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    console.log('카테고리 버튼 클릭 인식됨! 현재 상태:', !isActive);
  };

  return (
    <>
      <div className="flex items-center gap-4 p-4">
        <Link href="/activities" className="text-blue-500 underline">
          체험 목록
        </Link>
        <Button>일반 버튼</Button>
      </div>

      <div className="px-4 py-2">
        <CategoryButton size="sm" isActive={isActive} onClick={handleClick}>
          카테고리 버튼
        </CategoryButton>
      </div>
    </>
  );
}
