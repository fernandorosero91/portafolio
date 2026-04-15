'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useDownloadCV } from '../hooks/useDownloadCV';

const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <circle cx="12" cy="12" r="5" />
    <rect x="11" y="1" width="2" height="3" rx="1" />
    <rect x="11" y="20" width="2" height="3" rx="1" />
    <rect x="20" y="11" width="3" height="2" rx="1" />
    <rect x="1" y="11" width="3" height="2" rx="1" />
    <rect x="17.66" y="3.93" width="2" height="3" rx="1" transform="rotate(45 18.66 5.43)" />
    <rect x="4.34" y="17.07" width="2" height="3" rx="1" transform="rotate(45 5.34 18.57)" />
    <rect x="17.66" y="17.07" width="2" height="3" rx="1" transform="rotate(-45 18.66 18.57)" />
    <rect x="4.34" y="3.93" width="2" height="3" rx="1" transform="rotate(-45 5.34 5.43)" />
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
);

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { downloadCV } = useDownloadCV();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.remove('light-mode');
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (langOpen && !(e.target as HTMLElement).closest('.lang-sel')) setLangOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [langOpen]);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('light-mode');
    const isLight = document.documentElement.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    setTheme(isLight ? 'light' : 'dark');
  };

  const links = [
    { href: '#inicio', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#testimonials', label: t('nav.testimonials') },
    { href: '#experience', label: t('nav.experience') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
        style={{ backgroundColor: 'var(--navbar-bg)', borderBottom: '1px solid var(--border-color)' }}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#" className="text-xl font-bold tracking-tight" style={{ color: 'var(--primary-blue)' }}>FR</a>

          <nav className="hidden lg:flex items-center gap-4 xl:gap-7">
            {links.map(l => (
              <a key={l.href} href={l.href} className="text-xs lg:text-sm font-medium whitespace-nowrap" style={{ color: 'var(--text-tertiary)' }}>{l.label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <div className="lang-sel relative">
              <button onClick={e => { e.stopPropagation(); setLangOpen(!langOpen); }} className="flex h-9 w-9 items-center justify-center rounded-full" style={{ color: 'var(--text-tertiary)' }} aria-label="Language">
                <GlobeIcon />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-40 rounded-xl p-1 shadow-lg border animate-[fadeInDropdown_0.15s_ease]" style={{ backgroundColor: 'var(--bg-dark)', borderColor: 'var(--border-color)' }}>
                  {(['es', 'en'] as const).map(lang => (
                    <button key={lang} onClick={e => { e.stopPropagation(); setLanguage(lang); setLangOpen(false); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium" style={language === lang ? { backgroundColor: 'var(--primary-blue)', color: '#fff' } : { color: 'var(--text-secondary)' }}>
                      {lang === 'es' ? '🇪🇸 Español' : '🇺🇸 English'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={toggleTheme} className="flex h-9 w-9 items-center justify-center rounded-full" style={{ color: 'var(--text-tertiary)' }} aria-label="Toggle theme">
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            <button onClick={() => downloadCV()} className="btn-outline ml-2 hidden h-10 items-center rounded-full border-2 px-6 text-sm font-semibold lg:inline-flex" style={{ borderColor: 'var(--primary-blue)', color: 'var(--primary-blue)' }}>
              {t('nav.downloadCV')}
            </button>

            <button onClick={() => setMenuOpen(!menuOpen)} className="ml-1 flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden" aria-label="Menu">
              <span className={`block h-[2px] w-5 rounded-full transition-all duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} style={{ backgroundColor: 'var(--text-primary)' }} />
              <span className={`block h-[2px] w-5 rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: 'var(--text-primary)' }} />
              <span className={`block h-[2px] w-5 rounded-full transition-all duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} style={{ backgroundColor: 'var(--text-primary)' }} />
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 backdrop-blur-lg pt-20 transition-all duration-300 lg:hidden ${menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`} style={{ backgroundColor: 'var(--navbar-bg)' }}>
        <div className="mx-auto max-w-sm space-y-1 px-6">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-3.5 text-base font-medium" style={{ color: 'var(--text-primary)' }}>{l.label}</a>
          ))}
          <div className="pt-4">
            <button onClick={() => { downloadCV(); setMenuOpen(false); }} className="btn-filled w-full rounded-xl py-3 text-sm font-semibold text-white" style={{ backgroundColor: 'var(--primary-blue)' }}>{t('nav.downloadCV')}</button>
          </div>
        </div>
      </div>
    </>
  );
}
