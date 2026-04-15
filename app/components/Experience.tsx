'use client';

import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';
import { experiencesData } from '../data/experiences';

type Filter = 'all' | 'academic' | 'professional';

export default function Experience() {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState<Filter>('all');
  const [viewMode, setViewMode] = useState<'carousel' | 'timeline'>('carousel');
  const [idx, setIdx] = useState(0);
  const [anim, setAnim] = useState(false);
  const { ref: headerRef, isVisible: hv } = useScrollReveal();

  const all = experiencesData[language];
  const filtered = filter === 'all' ? all : all.filter(e => e.type === filter);

  useEffect(() => {
    const h = () => { if (window.innerWidth <= 768) setViewMode('timeline'); };
    h(); window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  useEffect(() => { setIdx(0); }, [filter]);

  const go = (dir: 1 | -1) => {
    if (anim) return;
    setAnim(true);
    setIdx(p => (p + dir + filtered.length) % filtered.length);
    setTimeout(() => setAnim(false), 500);
  };

  useEffect(() => {
    if (viewMode !== 'carousel') return;
    const iv = setInterval(() => go(1), 5000);
    return () => clearInterval(iv);
  }, [idx, viewMode, filtered.length]);

  const badgeColor = (type: string) =>
    type === 'academic'
      ? { bg: 'rgba(45,212,191,0.12)', color: '#2DD4BF', border: 'rgba(45,212,191,0.3)' }
      : { bg: 'rgba(245,158,11,0.12)', color: 'var(--accent-amber)', border: 'rgba(245,158,11,0.3)' };

  return (
    <section id="experience" className="scroll-mt-20 py-20 px-6 lg:px-8" style={{ backgroundColor: 'var(--bg-dark)' }}>
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className={`text-center mb-14 scroll-reveal ${hv ? 'visible' : ''}`}>
          <h2 className="text-4xl lg:text-5xl font-bold font-[Cormorant_Garamond,serif] mb-3" style={{ color: 'var(--text-primary)' }}>{t('experience.title')}</h2>
          <p className="text-base" style={{ color: 'var(--text-tertiary)' }}>{t('experience.subtitle')}</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
          <div className="flex gap-2 flex-wrap justify-center">
            {(['all', 'academic', 'professional'] as Filter[]).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${filter === f ? 'text-white' : ''}`}
                style={filter === f ? { backgroundColor: 'var(--primary-blue)', borderColor: 'var(--primary-blue)' } : { borderColor: 'var(--primary-blue)', color: 'var(--text-secondary)', backgroundColor: 'transparent' }}>
                {f === 'all' ? t('experience.all') : f === 'academic' ? t('experience.academic') : t('experience.professional')}
              </button>
            ))}
          </div>
          <div className="hidden md:flex gap-1 p-1 rounded-lg border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
            {(['carousel', 'timeline'] as const).map(m => (
              <button key={m} onClick={() => setViewMode(m)} className={`p-2 px-3 rounded-md transition-all duration-200 ${viewMode === m ? 'text-white' : ''}`} style={viewMode === m ? { backgroundColor: 'var(--primary-blue)' } : { color: 'var(--text-tertiary)' }}>
                {m === 'carousel' ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 15h10M9 11h6"/></svg> : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="2" x2="12" y2="22"/><circle cx="12" cy="6" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="18" r="2"/></svg>}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        {viewMode === 'carousel' && (
          <div className="hidden md:block relative py-4">
            <div className="flex items-center gap-6 min-h-[420px]">
              <button onClick={() => go(-1)} disabled={anim} className="shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-30" style={{ borderColor: 'var(--primary-blue)', color: 'var(--primary-blue)', backgroundColor: 'var(--bg-card)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>

              <div className="relative flex-1 flex items-center justify-center">
                {filtered.map((exp, i) => {
                  const active = i === idx;
                  const prev = i === (idx - 1 + filtered.length) % filtered.length;
                  const next = i === (idx + 1) % filtered.length;
                  const bc = badgeColor(exp.type);
                  return (
                    <div key={i} className={`absolute w-[75%] max-w-[680px] rounded-2xl p-10 border transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-xl ${active ? 'opacity-100 translate-x-0 scale-100 z-[3]' : prev ? 'opacity-20 -translate-x-[105%] scale-[0.85] z-[1]' : next ? 'opacity-20 translate-x-[105%] scale-[0.85] z-[1]' : 'opacity-0 translate-x-full scale-75'}`} style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderLeftWidth: '4px', borderLeftColor: exp.type === 'academic' ? '#2DD4BF' : 'var(--accent-amber)', pointerEvents: active ? 'auto' : 'none' }}>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 border" style={{ backgroundColor: bc.bg, color: bc.color, borderColor: bc.border }}>{exp.type === 'academic' ? t('experience.academic') : t('experience.professional')}</span>
                      <div className="text-sm font-bold mb-3 tracking-wide" style={{ color: 'var(--accent-amber)' }}>{exp.year}</div>
                      <h3 className="text-2xl font-bold mb-2 leading-snug" style={{ color: 'var(--text-primary)' }}>{exp.title}</h3>
                      <p className="text-base font-medium mb-4" style={{ color: 'var(--text-secondary)' }}>{exp.subtitle}</p>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>{exp.description}</p>
                    </div>
                  );
                })}
              </div>

              <button onClick={() => go(1)} disabled={anim} className="shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-30" style={{ borderColor: 'var(--primary-blue)', color: 'var(--primary-blue)', backgroundColor: 'var(--bg-card)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {filtered.map((_, i) => (
                <button key={i} onClick={() => { if (!anim) { setAnim(true); setIdx(i); setTimeout(() => setAnim(false), 500); } }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${i === idx ? 'w-8' : 'w-2.5 hover:scale-125'}`}
                  style={{ backgroundColor: i === idx ? 'var(--accent-amber)' : 'var(--border-color)' }} />
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className={viewMode === 'carousel' ? 'md:hidden' : ''}>
          <div className="space-y-6">
            {filtered.map((exp, i) => {
              const bc = badgeColor(exp.type);
              return (
                <div key={i} className="rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderLeftWidth: '4px', borderLeftColor: exp.type === 'academic' ? '#2DD4BF' : 'var(--accent-amber)' }}>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 border" style={{ backgroundColor: bc.bg, color: bc.color, borderColor: bc.border }}>{exp.type === 'academic' ? t('experience.academic') : t('experience.professional')}</span>
                  <div className="text-sm font-bold mb-2 tracking-wide uppercase" style={{ color: 'var(--accent-amber)' }}>{exp.year}</div>
                  <h3 className="text-xl font-bold mb-2 leading-snug" style={{ color: 'var(--text-primary)' }}>{exp.title}</h3>
                  <p className="text-sm font-semibold mb-3" style={{ color: 'var(--primary-blue)' }}>{exp.subtitle}</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{exp.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
