import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenisScroll } from '../../hooks/useLenisScroll';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const handleLenisScroll = useLenisScroll();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // CTA heading line reveal
      const ctaLines = footerRef.current.querySelectorAll('.footer-cta-line-inner');
      gsap.to(ctaLines, {
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: footerRef.current.querySelector('.footer-cta'),
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // CTA button reveal
      const btn = footerRef.current.querySelector('.footer-cta-btn');
      gsap.set(btn, { y: 30, opacity: 0 });
      gsap.to(btn, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power4.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: footerRef.current.querySelector('.footer-cta'),
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Footer grid columns stagger
      const gridItems = footerRef.current.querySelectorAll('.footer-grid > div');
      gsap.set(gridItems, { y: 40, opacity: 0 });
      gsap.to(gridItems, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: footerRef.current.querySelector('.footer-grid'),
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Brand logo reveal
      const logo = footerRef.current.querySelector('.footer-brand-logo');
      if (logo) {
        gsap.set(logo, { opacity: 0, y: 20 });
        gsap.to(logo, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: footerRef.current.querySelector('.footer-grid'),
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" id="contact" ref={footerRef}>
      <div className="container">
        {/* ── CTA ── */}
        <div className="footer-cta">
          <h2 className="footer-cta-heading">
            <span className="footer-cta-line">
              <span className="footer-cta-line-inner">
                Let&apos;s Create Something
              </span>
            </span>
            <span className="footer-cta-line">
              <span className="footer-cta-line-inner">
                <em>Extraordinary</em>
              </span>
            </span>
          </h2>
          <a 
            href="mailto:avulakarthiksai@gmail.com?subject=New%20Project%20Inquiry&body=Hi%20OrbitScale,%0D%0A%0D%0AI'm%20interested%20in%20starting%20a%20new%20project%20with%20you." 
            className="footer-cta-btn"
          >
            Start a Project
            <svg
              width="20"
              height="20"
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
          </a>
        </div>

        {/* ── Grid ── */}
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand-logo">OrbitScale</div>
            <p className="footer-brand-desc">
              Award-winning digital studio crafting immersive experiences for
              forward-thinking brands.
            </p>
          </div>

          <div className="footer-nav">
            <h4 className="footer-column-title">Navigation</h4>
            <ul className="footer-links">
              <li><a href="#hero" onClick={(e) => handleLenisScroll(e, '#hero')}>Home</a></li>
              <li><a href="#work" onClick={(e) => handleLenisScroll(e, '#work')}>Work</a></li>
              <li><a href="#about" onClick={(e) => handleLenisScroll(e, '#about')}>About</a></li>
              <li><a href="#services" onClick={(e) => handleLenisScroll(e, '#services')}>Services</a></li>
              <li><a href="#contact" onClick={(e) => handleLenisScroll(e, '#contact')}>Contact</a></li>
            </ul>
          </div>

          <div className="footer-connect">
            <h4 className="footer-column-title">Connect</h4>
            <ul className="footer-links">
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Twitter / X
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Dribbble
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Instagram
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom ── */}
        <div className="footer-bottom">
          <span className="footer-bottom-text">
            © 2024 OrbitScale. All rights reserved.
          </span>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
