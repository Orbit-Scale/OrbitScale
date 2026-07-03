import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HoloGlow.css';

gsap.registerPlugin(ScrollTrigger);

export default function HoloGlow() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline that is scrubbed by the main window scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1, // Smooth scrubbing
        },
      });

      // We remove wrapper rotation to dramatically speed up compositor rendering
      // Shift individual orbs slightly

      tl.to(orb1Ref.current, {
        x: '20vw',
        y: '20vh',
        scale: 1.2,
        ease: 'none',
      }, 0);

      tl.to(orb2Ref.current, {
        x: '-20vw',
        y: '-10vh',
        scale: 1.5,
        ease: 'none',
      }, 0);

      tl.to(orb3Ref.current, {
        x: '10vw',
        y: '-30vh',
        scale: 0.8,
        ease: 'none',
      }, 0);
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="holo-glow-container" ref={containerRef} aria-hidden="true">
      <div className="holo-glow-wrapper" ref={wrapperRef}>
        <div className="holo-orb holo-orb--1" ref={orb1Ref} />
        <div className="holo-orb holo-orb--2" ref={orb2Ref} />
        <div className="holo-orb holo-orb--3" ref={orb3Ref} />
      </div>
    </div>
  );
}
