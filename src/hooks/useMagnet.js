import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Hook that makes an element magnetically attract to the cursor.
 * @param {number} strength - Pull strength (0-1). Default 0.3.
 * @returns {React.RefObject} - Attach this ref to the target element.
 */
export function useMagnet(strength = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Only enable on pointer-fine devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: 'power3.out',
      });
    };

    const handleLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [strength]);

  return ref;
}
