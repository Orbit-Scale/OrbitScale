import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Ease Presets ── */
export const EASE = {
  out: 'power4.out',
  in: 'power4.in',
  inOut: 'power3.inOut',
  smooth: 'power2.inOut',
  spring: 'elastic.out(1, 0.5)',
  bounce: 'back.out(1.7)',
  cinematic: 'expo.out',
};

/* ── Duration Presets ── */
export const DURATION = {
  fast: 0.4,
  normal: 0.8,
  slow: 1.2,
  hero: 1.6,
  preloader: 2.0,
};

/* ── Stagger Presets ── */
export const STAGGER = {
  char: 0.03,
  word: 0.08,
  line: 0.12,
  element: 0.15,
  section: 0.2,
};

/**
 * Reveal elements on scroll with y-translate + fade.
 */
export function revealOnScroll(elements, options = {}) {
  const {
    y = 60,
    duration = DURATION.normal,
    stagger = STAGGER.element,
    ease = EASE.out,
    start = 'top 85%',
    delay = 0,
  } = options;

  gsap.set(elements, { y, opacity: 0 });

  return gsap.to(elements, {
    y: 0,
    opacity: 1,
    duration,
    stagger,
    ease,
    delay,
    scrollTrigger: {
      trigger: Array.isArray(elements) ? elements[0] : elements,
      start,
      toggleActions: 'play none none none',
    },
  });
}

/**
 * Reveal split-line-inner elements with mask slide.
 */
export function revealLines(container, options = {}) {
  const {
    duration = DURATION.normal,
    stagger = STAGGER.line,
    ease = EASE.out,
    start = 'top 80%',
  } = options;

  const lines = container.querySelectorAll('.split-line-inner');

  return gsap.to(lines, {
    y: 0,
    duration,
    stagger,
    ease,
    scrollTrigger: {
      trigger: container,
      start,
      toggleActions: 'play none none none',
    },
  });
}

/**
 * Parallax scrub effect on an element.
 */
export function parallax(element, speed = 0.3, options = {}) {
  const { start = 'top bottom', end = 'bottom top' } = options;

  return gsap.to(element, {
    y: () => speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub: true,
    },
  });
}
