'use client';

import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 md:bottom-4 md:right-4 w-[50px] h-[50px] md:w-[45px] md:h-[45px] bg-[var(--primary-blue)] text-white border-none rounded-full flex items-center justify-center cursor-pointer z-[999] shadow-[0_4px_12px_rgba(74,111,168,0.3)] transition-all duration-300 ${
        isVisible ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-5'
      } hover:bg-[var(--accent-amber)] hover:-translate-y-[3px] hover:shadow-[0_6px_16px_rgba(245,158,11,0.4)]`}
      aria-label="Volver arriba"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  );
}
