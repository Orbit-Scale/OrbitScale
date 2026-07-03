import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useMagnet } from '../../hooks/useMagnet';
import './Navbar.css';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

const mobileTabs = [
  {
    id: 'hero',
    label: 'Home',
    href: '#hero',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v6H4a1 1 0 0 1-1-1V9.5z" />
      </svg>
    ),
  },
  {
    id: 'about',
    label: 'About',
    href: '#about',
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <line x1="6" y1="15" x2="10" y2="15" />
      </svg>
    ),
  },
  {
    id: 'services',
    label: 'Services',
    href: '#services',
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="9" y1="3" x2="9" y2="21" />
        <line x1="15" y1="3" x2="15" y2="21" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
      </svg>
    ),
  },
  {
    id: 'work',
    label: 'Work',
    href: '#work',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    id: 'pricing',
    label: 'Pricing',
    href: '#pricing',
    icon: (
      <svg viewBox="0 0 24 24">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '#contact',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const navRef = useRef(null);
  const ctaMagnetRef = useMagnet(0.25);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const lastScrollY = useRef(0);

  /* ── GSAP entrance animation for top bar ── */
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          delay: 3.5,
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  /* ── Scroll tracking for top navbar ──
     Native scroll events can fire many times per frame. Without throttling,
     every one of those triggers a React state update + re-render, and each
     re-render can toggle the --scrolled class, which transitions
     backdrop-filter/box-shadow — both expensive to recompute. Coalescing
     to one check per animation frame keeps this to at most 60 updates/sec,
     and only when the derived state actually changes. */
  const tickingRef = useRef(false);

  const handleScroll = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;

    requestAnimationFrame(() => {
      const currentY = window.scrollY;
      const threshold = 50;

      setIsScrolled((prev) => {
        const next = currentY > threshold;
        return prev === next ? prev : next;
      });

      setIsHidden((prev) => {
        const next = currentY > lastScrollY.current && currentY > 100;
        return prev === next ? prev : next;
      });

      lastScrollY.current = currentY;
      tickingRef.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* ── Intersection Observer for Mobile Tab Bar ── */
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Triggers when section occupies the center area
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    mobileTabs.forEach((tab) => {
      const el = document.getElementById(tab.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleTabClick = (id) => {
    setActiveSection(id);
  };

  const getIndicatorStyle = () => {
    const activeIndex = mobileTabs.findIndex((tab) => tab.id === activeSection);
    if (activeIndex === -1) return { opacity: 0 };
    // 6 tabs: 5 inactive at flex:1, 1 active at flex:2 = 7 total
    const totalFlex = mobileTabs.length - 1 + 2;
    const w_inactive = 100 / totalFlex;
    const w_active = 2 * w_inactive;
    const left = activeIndex * w_inactive;
    return {
      left: `${left}%`,
      width: `${w_active}%`,
      opacity: 1,
    };
  };

  /* ── Build desktop classes ── */
  const navClasses = [
    'navbar',
    isHidden ? 'navbar--hidden' : '',
    isScrolled ? 'navbar--scrolled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      {/* Desktop / Tablet Top Navbar */}
      <nav className={navClasses} ref={navRef}>
        <div className="navbar-inner">
          {/* Logo */}
          <a href="#" className="navbar-logo">
            OrbitScale
          </a>

          {/* Desktop Links */}
          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="navbar-link">
                  {link.label}
                  <span className="navbar-link-line" />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a href="https://wa.me/919000730352" target="_blank" rel="noopener noreferrer" className="navbar-cta" ref={ctaMagnetRef}>
            Let's Talk
            <svg
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
      </nav>

      {/* Mobile Floating Bottom Tab Bar */}
      <nav className="mobile-tab-bar" aria-label="Mobile Navigation">
        <div className="mobile-tab-track">
          <div className="mobile-tab-indicator" style={getIndicatorStyle()} />
          {mobileTabs.map((tab) => {
            const isActive = activeSection === tab.id;
            return (
              <a
                key={tab.id}
                href={tab.href}
                className={`mobile-tab-item ${isActive ? 'mobile-tab-item--active' : ''}`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.icon}
                <span className="mobile-tab-label">{tab.label}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
