'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'A' || target.tagName === 'BUTTON' ||
        target.closest('a') !== null || target.closest('button') !== null;
      setIsHovering(isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--primary-blue)] mix-blend-difference transition-all duration-300 hidden md:block ${
          isHovering ? 'w-[60px] h-[60px] border-[var(--accent-amber)] bg-[rgba(245,158,11,0.1)]' :
          isClicking ? 'w-[30px] h-[30px] bg-[rgba(74,111,168,0.2)]' : 'w-10 h-10'
        }`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div
        className={`fixed pointer-events-none z-[10001] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary-blue)] transition-all duration-200 hidden md:block ${
          isHovering ? 'w-3 h-3 bg-[var(--accent-amber)]' :
          isClicking ? 'w-1.5 h-1.5' : 'w-2 h-2'
        }`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
}
