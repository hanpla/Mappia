import { useEffect, useState } from 'react';

export default function useHideOnScroll(revealOffset = 80) {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      setIsScrolled(currentY > 0);

      if (currentY < revealOffset) {
        setIsHidden(false);
      } else if (currentY > lastY) {
        setIsHidden(true);
      } else if (currentY < lastY) {
        setIsHidden(false);
      }

      lastY = currentY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [revealOffset]);

  return { isHidden, isScrolled };
}
