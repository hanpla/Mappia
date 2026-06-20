import { useEffect, useRef } from 'react';

interface UseClickOutsideOptions {
  enabled?: boolean;
  swallowEvent?: boolean;
}

export default function useClickOutside<T extends HTMLElement>(
  onClickOutside: () => void,
  { enabled = true, swallowEvent = false }: UseClickOutsideOptions = {},
) {
  const ref = useRef<T>(null);
  const callbackRef = useRef(onClickOutside);

  useEffect(() => {
    callbackRef.current = onClickOutside;
  }, [onClickOutside]);

  useEffect(() => {
    if (!enabled) return;

    function handleClickOutside(e: MouseEvent) {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      if (swallowEvent) {
        e.preventDefault();
        e.stopPropagation();
      }
      callbackRef.current();
    }

    const eventName: 'click' | 'mousedown' = swallowEvent
      ? 'click'
      : 'mousedown';
    const shouldCapture = swallowEvent;

    document.addEventListener(eventName, handleClickOutside, shouldCapture);
    return () =>
      document.removeEventListener(
        eventName,
        handleClickOutside,
        shouldCapture,
      );
  }, [enabled, swallowEvent]);

  return ref;
}
