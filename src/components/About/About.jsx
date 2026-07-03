import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { revealOnScroll } from '../../utils/animations';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '20+', label: 'Websites Built' },
  { value: 'Coming Soon', label: 'NFC Solutions' },
  { value: '9+', label: 'Growing Brands' },
];

export default function About() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const descRef = useRef(null);
  const statsRef = useRef(null);
  const statValueRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label reveal
      revealOnScroll(labelRef.current, { y: 30 });

      // Heading line reveal
      const lines = sectionRef.current.querySelectorAll('.about-heading-line-inner');
      gsap.to(lines, {
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current.querySelector('.about-heading'),
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Description reveal
      revealOnScroll(descRef.current);

      // Stats stagger in from right
      const statElements = statsRef.current.querySelectorAll('.about-stat');
      gsap.set(statElements, { x: 60, opacity: 0 });
      gsap.to(statElements, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      // Counter animation
      stats.forEach((stat, i) => {
        const numericValue = parseInt(stat.value);
        
        // If it's a non-numeric string like "Coming Soon", just display it
        if (isNaN(numericValue)) {
          if (statValueRefs.current[i]) {
            statValueRefs.current[i].textContent = stat.value;
          }
          return;
        }

        const hasSuffix = stat.value.includes('+');
        const obj = { value: 0 };

        gsap.to(obj, {
          value: numericValue,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            if (statValueRefs.current[i]) {
              statValueRefs.current[i].textContent =
                Math.round(obj.value) + (hasSuffix ? '+' : '');
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about-label" ref={labelRef}>About Us</div>
        <div className="about-grid">
          <div className="about-text">
            <h2 className="about-heading">
              <span className="about-heading-line">
                <span className="about-heading-line-inner">
                  We Build Digital Presence
                </span>
              </span>
              <span className="about-heading-line">
                <span className="about-heading-line-inner">
                  That Drives Growth.
                </span>
              </span>
            </h2>
            <p className="about-description" ref={descRef}>
              At Orbit Scale, we believe every business deserves a powerful digital identity. We're a digital growth partner that creates modern websites, smart NFC cards, and innovative solutions to help you connect with customers, build credibility, and scale with confidence.
            </p>
          </div>
          <div className="about-stats" ref={statsRef}>
            {stats.map((stat, index) => (
              <div className="about-stat" key={stat.label}>
                <span
                  className="about-stat-value"
                  ref={(el) => (statValueRefs.current[index] = el)}
                >
                  0
                </span>
                <span className="about-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
