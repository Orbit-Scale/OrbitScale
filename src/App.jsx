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
import Footer from './components/Footer/Footer';
import HoloGlow from './components/HoloGlow/HoloGlow';
import Pricing from './components/Pricing/Pricing';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef(null);

  /* ── Init Lenis + GSAP sync ── */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Enable custom cursor on desktop
    if (window.matchMedia('(pointer: fine)').matches) {
      document.documentElement.classList.add('has-custom-cursor');
    }

    return () => {
      lenis.destroy();
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
    <>
      {/* Grain texture overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Holographic Background Light */}
      <HoloGlow />

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Preloader */}
      <Preloader isLoading={isLoading} onComplete={handlePreloaderComplete} />

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

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
