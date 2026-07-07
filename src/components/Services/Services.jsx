import { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'google-reviews-boosting',
    num: '01',
    title: 'Google Reviews Boosting',
    desc: 'Enhance your business reputation and build trust with genuine customer reviews that drive local SEO ranking.',
  },
  {
    id: 'nfcs',
    num: '02',
    title: "NFC's",
    desc: 'Leverage Near Field Communication (NFC) solutions for seamless, contact-free business cards, interactive marketing, and modern customer experiences.',
  },
  {
    id: 'boosting-online-presence',
    num: '03',
    title: 'Boosting Online Presence',
    desc: 'Amplify your digital footprint and reach your target audience through tailored SEO strategy, visibility campaigns, and growth hacking for websites and businesses.',
  },
  {
    id: 'website-designing',
    num: '04',
    title: 'Website Designing',
    desc: 'Modern, responsive, and aesthetically stunning websites designed to capture attention, represent your brand, and convert visitors into clients.',
  },
];

const ServiceCard = memo(function ServiceCard({ id, num, title, desc }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleClick = () => {
    window.location.hash = `#/services/${id}`;
  };

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / (rect.width / 2)) * 8;
    const rotateX = -((y - centerY) / (rect.height / 2)) * 8;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: 'power2.out',
    });

    if (glow) {
      glow.style.left = x + 'px';
      glow.style.top = y + 'px';
    }
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  return (
    <div
      className="service-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="service-card-glow" ref={glowRef} />
      <div className="service-card-num">{num}</div>
      <div>
        <h3 className="service-card-title">{title}</h3>
        <p className="service-card-desc">{desc}</p>
      </div>
      <div className="service-card-arrow">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </div>
  );
});

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current.querySelectorAll('.service-card');

      gsap.set(cards, { y: 80, opacity: 0 });
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current.querySelector('.services-grid'),
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="services-section" id="services" ref={sectionRef}>
      <div className="container">
        <div className="services-label">What We Do</div>
        <h2 className="services-heading">Services</h2>
        <div className="services-grid">
          {services.map((s) => (
            <ServiceCard key={s.num} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
