'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const PRELOADER_DURATION_MS = 1500;

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), PRELOADER_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[10000] animate-[fadeOut_0.5s_ease-out_1.2s_forwards]"
      style={{ background: 'linear-gradient(135deg, var(--hero-from), var(--hero-to))' }}
    >
      <div className="text-center">
        <div className="flex gap-4 justify-center mb-8">
          <span
            className="text-7xl font-black font-[Cormorant_Garamond,serif] animate-[letterBounce_0.6s_ease-in-out_infinite_alternate]"
            style={{ color: 'var(--primary-blue)' }}
          >
            F
          </span>
          <span
            className="text-7xl font-black font-[Cormorant_Garamond,serif] animate-[letterBounce_0.6s_ease-in-out_infinite_alternate_0.2s]"
            style={{ color: 'var(--primary-blue)' }}
          >
            R
          </span>
        </div>
        <div
          className="w-12 h-12 border-4 rounded-full mx-auto mb-4 animate-spin"
          style={{ borderColor: 'rgba(74,111,168,0.2)', borderTopColor: 'var(--accent-amber)' }}
        />
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {t('preloader.loading')}
        </p>
      </div>
    </div>
  );
}
