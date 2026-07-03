import { useEffect, useRef, useState } from 'react';
import './Cursor.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);
  const [isPointerFine, setIsPointerFine] = useState(false);

  useEffect(() => {
    // Only enable on pointer-fine devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    setIsPointerFine(true);
  }, []);

  useEffect(() => {
    if (!isPointerFine) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let visible = false;

    /* ── Mouse move handler ── */
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Move dot directly
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;

      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
    };

    /* ── RAF lerp loop for ring ── */
    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.15);
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.15);

      const ringW = ring.offsetWidth;
      const ringH = ring.offsetHeight;

      ring.style.transform = `translate(${ringPos.current.x - ringW / 2}px, ${ringPos.current.y - ringH / 2}px)`;

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    /* ── Hover detection ── */
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor]');
      if (!target) return;

      const cursorAttr = target.getAttribute('data-cursor');

      if (cursorAttr === 'view') {
        ring.classList.add('cursor-ring--text');
        ring.classList.remove('cursor-ring--active');
      } else {
        ring.classList.add('cursor-ring--active');
        ring.classList.remove('cursor-ring--text');
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, [data-cursor]');
      if (!target) return;

      ring.classList.remove('cursor-ring--active');
      ring.classList.remove('cursor-ring--text');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isPointerFine]);

  if (!isPointerFine) return null;

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef}>
        <span className="cursor-text">VIEW</span>
      </div>
    </>
  );
}
