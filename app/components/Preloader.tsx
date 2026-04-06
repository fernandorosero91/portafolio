'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (minimum 1.5s for animation)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="preloader">
      <div className="preloader-content">
        <div className="preloader-logo">
          <span className="logo-letter">F</span>
          <span className="logo-letter">R</span>
        </div>
        <div className="preloader-spinner"></div>
        <p className="preloader-text">Cargando portafolio...</p>
      </div>
    </div>
  );
}
