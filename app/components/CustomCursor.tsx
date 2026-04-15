'use client';

import { useEffect, useRef, useCallback } from 'react';

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);
  const clicking = useRef(false);
  const visible = useRef(false);

  const updateStyles = useCallback(() => {
    const outer = outerRef.current;
    const dot = dotRef.current;
    if (!outer || !dot) return;

    const size = clicking.current ? 26 : hovering.current ? 44 : 34;
    const color = hovering.current ? 'var(--accent-amber)' : 'var(--primary-blue)';
    const dotS = clicking.current ? 3 : hovering.current ? 5 : 4;
    const op = visible.current ? 1 : 0;

    outer.style.width = `${size}px`;
    outer.style.height = `${size}px`;
    outer.style.borderColor = color;
    outer.style.opacity = String(op * 0.6);

    dot.style.width = `${dotS}px`;
    dot.style.height = `${dotS}px`;
    dot.style.backgroundColor = color;
    dot.style.opacity = String(op);
  }, []);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    mounted.current = true;

    const outer = outerRef.current;
    const dot = dotRef.current;
    if (!outer || !dot) return;

    // Show elements
    outer.style.display = 'block';
    dot.style.display = 'block';

    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      visible.current = true;

      // Dot follows mouse exactly — no delay
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    const loop = () => {
      // Ring follows with smooth easing
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18;
      outer.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;

      updateStyles();
      raf = requestAnimationFrame(loop);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      hovering.current =
        t.tagName === 'A' || t.tagName === 'BUTTON' ||
        t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' ||
        t.tagName === 'SELECT' ||
        !!t.closest('a') || !!t.closest('button') ||
        !!t.closest('[role="button"]') ||
        t.style.cursor === 'pointer' ||
        getComputedStyle(t).cursor === 'pointer';
    };

    const onDown = () => { clicking.current = true; };
    const onUp = () => { clicking.current = false; };
    const onLeave = () => { visible.current = false; };
    const onEnter = () => { visible.current = true; };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, [updateStyles]);

  return (
    <>
      <div
        ref={outerRef}
        className="pointer-events-none fixed top-0 left-0 z-[10000] hidden rounded-full border-2 will-change-transform"
        style={{ transition: 'width 0.15s ease-out, height 0.15s ease-out, border-color 0.15s ease-out, opacity 0.15s ease-out' }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[10001] hidden rounded-full will-change-transform"
        style={{ transition: 'width 0.08s ease-out, height 0.08s ease-out, background-color 0.08s ease-out, opacity 0.08s ease-out' }}
      />
    </>
  );
}
