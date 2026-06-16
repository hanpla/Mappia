import { useEffect } from 'react';

/**
 * `locked`가 `true`인 동안 body 스크롤을 잠근다.
 *
 * 모달·바텀시트·드롭다운 등 내부에 스크롤 영역이 있는 오버레이에서,
 * 내부 스크롤이 끝에 닿았을 때 배경(페이지)이 이어서 스크롤되는 현상을 막는다.
 * 잠금 직전의 `overflow` 값을 저장해 두었다가 해제 시 그대로 복구하므로,
 * 잠금이 중첩되더라도 안전하게 원래 상태로 돌아간다.
 */
export default function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [locked]);
}
