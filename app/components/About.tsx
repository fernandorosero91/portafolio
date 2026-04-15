'use client';

import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  const { ref: headerRef, isVisible: hv } = useScrollReveal();
  const { ref: contentRef, isVisible: cv } = useScrollReveal({ threshold: 0.1, delay: 200 });

  return (
    <section id="about" className="scroll-mt-20 py-20 px-6 lg:px-8" style={{ backgroundColor: 'var(--bg-dark)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className={`text-center mb-14 scroll-reveal ${hv ? 'visible' : ''}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[Cormorant_Garamond,serif] mb-3" style={{ color: 'var(--text-primary)' }}>{t('about.title')}</h2>
          <p className="text-base" style={{ color: 'var(--text-tertiary)' }}>{t('about.subtitle')}</p>
        </div>

        {/* Bio */}
        <div ref={contentRef} className={`scroll-reveal ${cv ? 'visible' : ''}`}>
          <h3 className="text-2xl font-bold text-center mb-8" style={{ color: 'var(--text-primary)' }}>{t('about.myJourney')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[t('about.text1'), t('about.text2'), t('about.text3')].map((text, i) => (
              <p key={i} className="text-base leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>{text}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
