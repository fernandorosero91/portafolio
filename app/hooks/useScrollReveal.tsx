'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  delay?: number;
}

const DEFAULT_OPTIONS: Required<ScrollRevealOptions> = {
  threshold: 0.1,
  delay: 0,
};

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const { threshold, delay } = { ...DEFAULT_OPTIONS, ...options };
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => setIsVisible(true), delay);
          return () => clearTimeout(timer);
        }
      },
      { threshold },
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [threshold, delay]);

  return { ref, isVisible };
}
