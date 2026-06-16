import { RefObject, useEffect } from 'react';

/**
 * 포인터 위치를 stage 요소의 CSS 변수(--mx, --my)로 반영한다.
 * React state 대신 rAF 스로틀 + style.setProperty 로 갱신해 리렌더 없이 부드럽게 동작한다.
 */
export default function usePointerSpotlight(
  stageRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    const stage = stageRef.current;
    if (!enabled || !stage) return;

    let frame = 0;
    let clientX = 0;
    let clientY = 0;

    const apply = () => {
      frame = 0;
      const rect = stage.getBoundingClientRect();
      stage.style.setProperty('--mx', `${clientX - rect.left}px`);
      stage.style.setProperty('--my', `${clientY - rect.top}px`);
    };

    const handleMove = (event: PointerEvent) => {
      clientX = event.clientX;
      clientY = event.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handleMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [stageRef, enabled]);
}
