import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Preloader.css';

const TITLE = 'OrbitScale';

export default function Preloader({ isLoading, onComplete }) {
  const preloaderRef = useRef(null);
  const charsRef = useRef([]);
  const counterRef = useRef(null);
  const barFillRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    if (!isLoading) return;

    const chars = charsRef.current;
    const counter = counterRef.current;
    const barFill = barFillRef.current;
    const preloader = preloaderRef.current;

    if (!preloader || !counter || !barFill || chars.length === 0) return;

    const ctx = gsap.context(() => {
      /* ── Intro timeline ── */
      const tl = gsap.timeline({
        onComplete: playExit,
      });

      tlRef.current = tl;

      // Character reveal
      tl.fromTo(
        chars,
        { y: 80, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.06,
          duration: 0.8,
          ease: 'power4.out',
          delay: 0.3,
        },
        0
      );

      // Counter 0 → 100
      const counterObj = { value: 0 };
      tl.to(
        counterObj,
        {
          value: 100,
          duration: 2,
          ease: 'power2.inOut',
          onUpdate: () => {
            counter.textContent = `${Math.round(counterObj.value)}%`;
          },
        },
        0.3
      );

      // Progress bar fill
      tl.to(
        barFill,
        {
          scaleX: 1,
          duration: 2,
          ease: 'power2.inOut',
        },
        0.3
      );

      /* ── Exit animation ── */
      function playExit() {
        const exitTl = gsap.timeline({
          onComplete: () => {
            if (onComplete) onComplete();
          },
        });

        // Counter fades up and out
        exitTl.to(counter, {
          y: -30,
          opacity: 0,
          duration: 0.4,
          ease: 'power3.in',
        }, 0);

        // Progress bar collapses from right
        exitTl.to(barFill, {
          scaleX: 0,
          transformOrigin: 'right',
          duration: 0.4,
          ease: 'power3.in',
        }, 0);

        // Chars fly up and out
        exitTl.to(chars, {
          y: -100,
          opacity: 0,
          rotateX: 90,
          stagger: 0.03,
          duration: 0.5,
          ease: 'power3.in',
        }, 0.1);

        // Entire preloader slides up
        exitTl.to(preloader, {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
        }, 0.4);
      }
    }, preloaderRef);

    return () => ctx.revert();
  }, [isLoading, onComplete]);

  if (!isLoading) return null;

  return (
    <div className="preloader" ref={preloaderRef}>
      <div className="preloader-content">
        <div className="preloader-title">
          {TITLE.split('').map((char, i) => (
            <span
              key={i}
              className="preloader-char"
              ref={(el) => { charsRef.current[i] = el; }}
            >
              {char}
            </span>
          ))}
        </div>

        <div className="preloader-progress">
          <span className="preloader-counter" ref={counterRef}>
            0%
          </span>
          <div className="preloader-bar">
            <div className="preloader-bar-fill" ref={barFillRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
