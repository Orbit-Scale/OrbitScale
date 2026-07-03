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
import Work from './components/Work/Work';
// Lazy load Footer ("contact section") and HoloGlow to prioritize front-end load
const Footer = React.lazy(() => import('./components/Footer/Footer'));
const HoloGlow = React.lazy(() => import('./components/HoloGlow/HoloGlow'));
import Pricing from './components/Pricing/Pricing';
import { LenisContext } from './contexts/LenisContext';
import React, { Suspense } from 'react';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [lenis, setLenis] = useState(null);
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
      <Navbar />

      {/* Main content sections */}
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Work />
        <Pricing />
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
