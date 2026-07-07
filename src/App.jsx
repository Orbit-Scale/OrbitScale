import { useState, useEffect, useCallback, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Preloader from './components/Preloader/Preloader';
import CustomCursor from './components/Cursor/CustomCursor';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Marquee from './components/Marquee/Marquee';
import About from './components/About/About';
import Services from './components/Services/Services';
import ServiceDetail from './components/Services/ServiceDetail';
import Work from './components/Work/Work';
import Footer from './components/Footer/Footer';
// Lazy load HoloGlow to prioritize front-end load
const HoloGlow = React.lazy(() => import('./components/HoloGlow/HoloGlow'));
import Pricing from './components/Pricing/Pricing';
import { LenisContext } from './contexts/LenisContext';
import React, { Suspense } from 'react';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [lenis, setLenis] = useState(null);
  const [currentServiceId, setCurrentServiceId] = useState(null);
  const lenisRef = useRef(null);

  /* ── Init Lenis + GSAP sync ── */
  useEffect(() => {
    // Disable Lenis entirely on mobile for native 60FPS scroll performance
    const isMobile = window.innerWidth < 768;
    
    if (!isMobile) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
        infinite: false,
      });

      lenisRef.current = lenis;
      setLenis(lenis);

      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    // Enable custom cursor on desktop
    if (window.matchMedia('(pointer: fine)').matches) {
      document.documentElement.classList.add('has-custom-cursor');
    }

    return () => {
      if (lenisRef.current) lenisRef.current.destroy();
    };
  }, []);

  /* ── Lock scroll during preloader ── */
  useEffect(() => {
    if (isLoading && lenisRef.current) {
      lenisRef.current.stop();
    }
  }, [isLoading]);

  /* ── Hash Routing logic ── */
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const match = hash.match(/^#\/services\/([^/]+)$/);
      
      if (match) {
        setCurrentServiceId(match[1]);
      } else {
        setCurrentServiceId(null);
        
        // If the hash is a landing page section (e.g. #services, #pricing, etc.),
        // scroll to it after rendering updates
        if (hash.startsWith('#') && hash !== '#/' && !hash.startsWith('#/services')) {
          const targetSelector = hash;
          setTimeout(() => {
            const targetElement = document.querySelector(targetSelector);
            if (targetElement) {
              if (lenisRef.current) {
                lenisRef.current.scrollTo(targetElement, { duration: 1.2 });
              } else {
                targetElement.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }, 100);
        }
      }
    };

    // Run once on load to catch initial hash (e.g. if page refreshed on a route)
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  /* ── Preloader exit callback ── */
  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
    if (lenisRef.current) lenisRef.current.start();
    // Allow DOM to settle, then recalculate scroll triggers
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {/* Grain texture overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Preloader */}
      <Preloader isLoading={isLoading} onComplete={handlePreloaderComplete} />

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar currentServiceId={currentServiceId} />

      {/* Main content sections */}
      <main>
        {currentServiceId ? (
          <ServiceDetail id={currentServiceId} onBack={() => { window.location.hash = '#services'; }} />
        ) : (
          <>
            <Hero />
            <Marquee />
            <About />
            <Services />
            <Work />
            <Pricing />
          </>
        )}
      </main>

      {/* Footer & Heavy Background Elements (Lazy Loaded) */}
      <Suspense fallback={null}>
        <Footer />
        <HoloGlow />
      </Suspense>
    </LenisContext.Provider>
  );
}

export default App;
