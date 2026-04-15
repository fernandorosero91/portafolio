'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentProgress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
      setProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-9999 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[var(--primary-blue)] via-[var(--accent-amber)] to-[var(--accent-teal)] transition-[width] duration-100 ease-out shadow-[0_0_10px_rgba(74,111,168,0.5)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
