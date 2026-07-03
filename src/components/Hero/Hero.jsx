import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { EASE, DURATION } from '../../utils/animations';
import HeroCanvas from './HeroCanvas';
import './Hero.css';

export default function Hero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 3.2 });

      /* ── Line reveal ── */
      tl.fromTo(
        '.hero-line-inner',
        { y: '110%', rotateX: -10 },
        {
          y: '0%',
          rotateX: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: 'expo.out',
        }
      );

      /* ── Sub text ── */
      tl.fromTo(
        '.hero-sub',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: EASE.out },
        '-=0.6'
      );

      /* ── CTA buttons ── */
      tl.fromTo(
        '.hero-btn',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: EASE.out,
        },
        '-=0.5'
      );



    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      {/* Three.js background */}
      <HeroCanvas />

      {/* Content */}
      <div className="hero-content container">


        {/* Heading */}
        <h1 className="hero-heading">
          <span className="hero-line">
            <span className="hero-line-inner">We Craft</span>
          </span>
          <span className="hero-line">
            <span className="hero-line-inner">
              Digital <em>Experiences</em>
            </span>
          </span>
        </h1>

        {/* Sub copy */}
        <p className="hero-sub">
          We blend strategy, design, and technology to create digital
          experiences that captivate and convert.
        </p>

        {/* CTA */}
        <div className="hero-cta">
          <a href="#work" className="hero-btn hero-btn--primary">
            Explore Our Work
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="#about" className="hero-btn hero-btn--ghost">Our Story</a>
        </div>
      </div>


      {/* Bottom gradient overlay */}
      <div className="hero-gradient-overlay" />
    </section>
  );
}
