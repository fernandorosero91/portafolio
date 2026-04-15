'use client';

import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';
import { skillsData } from '../data/skills';

export default function Skills() {
  const { t, language } = useLanguage();
  const { ref: headerRef, isVisible: hv } = useScrollReveal();
  const { ref: gridRef, isVisible: gv } = useScrollReveal({ threshold: 0.1, delay: 200 });

  const categories = skillsData[language];

  return (
    <section id="skills" className="scroll-mt-20 py-20 px-6 lg:px-8" style={{ backgroundColor: 'var(--bg-card)' }}>
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className={`text-center mb-14 scroll-reveal ${hv ? 'visible' : ''}`}>
          <h2 className="text-4xl lg:text-5xl font-bold font-[Cormorant_Garamond,serif] mb-3" style={{ color: 'var(--text-primary)' }}>{t('skills.title')}</h2>
          <p className="text-base" style={{ color: 'var(--text-tertiary)' }}>{t('skills.subtitle')}</p>
        </div>

        <div ref={gridRef} className={`scroll-reveal ${gv ? 'visible' : ''}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(cat => (
              <div key={cat.translationKey} className="rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: 'rgba(74,111,168,0.04)', borderColor: 'var(--border-color)' }}>
                <h4 className="text-base font-bold text-center mb-5 pb-3 border-b-2" style={{ color: 'var(--accent-amber)', borderColor: 'var(--accent-amber)' }}>{cat.category}</h4>
                <div className="grid grid-cols-3 gap-2.5">
                  {cat.items.map(s => (
                    <div key={s.name} className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border text-center min-h-20 transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:shadow-md" style={{ backgroundColor: 'var(--bg-dark)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                      {s.icon.startsWith('http') ? (
                        <img src={s.icon} alt={s.name} className="w-7 h-7 object-contain transition-transform duration-300 group-hover:scale-110" />
                      ) : (
                        <span className="text-2xl transition-transform duration-300 group-hover:scale-110">{s.icon}</span>
                      )}
                      <span className="text-xs font-semibold leading-tight">{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
