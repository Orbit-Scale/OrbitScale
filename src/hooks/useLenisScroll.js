import { useCallback } from 'react';
import { useLenis } from '../contexts/LenisContext';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useLenisScroll() {
  const lenis = useLenis();

  const handleScroll = useCallback((e, targetSelector, onClickCallback = null) => {
    // If it's an external link (doesn't start with #), let it behave natively
    if (!targetSelector || !targetSelector.startsWith('#')) return;
    
    e.preventDefault();

    // Call any extra logic (like setting an active state)
    if (onClickCallback) {
      onClickCallback();
    }

    const targetElement = document.querySelector(targetSelector);
    if (!targetElement) return;

    if (lenis) {
      // Desktop: route through Lenis virtual scroll
      lenis.scrollTo(targetElement, { 
        offset: 0, 
        duration: 1.2,
        onComplete: () => ScrollTrigger.refresh() 
      });
    } else {
      // Mobile: fallback to highly compatible native smooth scroll
      const yOffset = targetElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: yOffset, behavior: 'smooth' });
      // Usually, native scroll doesn't give a callback when it finishes,
      // but ScrollTrigger refresh on mobile can be done after a timeout
      setTimeout(() => ScrollTrigger.refresh(), 800);
    }
  }, [lenis]);

  return handleScroll;
}
