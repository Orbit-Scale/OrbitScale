import { useEffect, useRef } from 'react';
import { revealOnScroll } from '../../utils/animations';
import './Marquee.css';

const ITEMS = [
  'Strategy',  '✦',
  'Design',    '✦',
  'Development','✦',
  'Branding',  '✦',
  'Innovation','✦',
  'Experience','✦',
];

function MarqueeContent() {
  let textIndex = 0;

  return (
    <div className="marquee-content">
      {ITEMS.map((item, i) => {
        if (item === '✦') {
          return (
            <span className="marquee-dot" key={`dot-${i}`}>
              ✦
            </span>
          );
        }

        const isOutline = textIndex % 2 === 1;
        textIndex++;

        return (
          <span
            className={`marquee-item${isOutline ? ' marquee-item--outline' : ''}`}
            key={`item-${i}`}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
}

export default function Marquee() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const anim = revealOnScroll(el);

    return () => {
      if (anim && anim.scrollTrigger) anim.scrollTrigger.kill();
      if (anim) anim.kill();
    };
  }, []);

  return (
    <section className="marquee-section" ref={sectionRef}>
      <div className="marquee-track">
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </section>
  );
}
