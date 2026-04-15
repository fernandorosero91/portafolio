'use client';

import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';
import { testimonialsData } from '../data/testimonials';

export default function Testimonials() {
  const { t, language } = useLanguage();
  const { ref: headerRef, isVisible: hv } = useScrollReveal();
  const { ref: featuredRef, isVisible: fv } = useScrollReveal({ threshold: 0.1, delay: 200 });

  const featured = testimonialsData[language].featured;
  const list = testimonialsData[language].testimonials;

  return (
    <section id="testimonials" className="scroll-mt-20 py-20 px-6 lg:px-8" style={{ backgroundColor: 'var(--bg-card)' }}>
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className={`text-center mb-14 scroll-reveal ${hv ? 'visible' : ''}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[Cormorant_Garamond,serif] mb-3" style={{ color: 'var(--text-primary)' }}>{t('testimonials.title')}</h2>
          <p className="text-base" style={{ color: 'var(--text-tertiary)' }}>{t('testimonials.subtitle')}</p>
        </div>

        {/* Featured */}
        <div ref={featuredRef} className={`rounded-2xl p-8 lg:p-10 border mb-10 scroll-reveal-scale ${fv ? 'visible' : ''}`} style={{ backgroundColor: 'rgba(74,111,168,0.08)', borderColor: 'var(--border-color)' }}>
          <p className="text-lg lg:text-xl italic leading-relaxed mb-6" style={{ color: 'var(--text-primary)' }}>&ldquo;{featured.text}&rdquo;</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ backgroundColor: 'var(--primary-blue)' }}>{featured.avatar}</div>
            <div>
              <h4 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>{featured.name}</h4>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{featured.role}</p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {list.map((t2, i) => (
            <div key={i} className="rounded-xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-md" style={{ backgroundColor: 'var(--bg-dark)', borderColor: 'var(--border-color)' }}>
              <div className="flex gap-0.5 mb-3">{[...Array(t2.stars)].map((_, j) => <span key={j} className="text-base">⭐</span>)}</div>
              <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>&ldquo;{t2.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0" style={{ backgroundColor: 'var(--primary-blue)' }}>{t2.avatar}</div>
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{t2.name} — {t2.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
