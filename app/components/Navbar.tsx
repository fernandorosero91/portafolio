'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useDownloadCV } from '../hooks/useDownloadCV';
import Image from 'next/image';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { downloadCV } = useDownloadCV();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem('theme') || 'light') as 'light' | 'dark';
    setTheme(saved);
    if (saved === 'light') document.documentElement.classList.add('light-mode');
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
    { href: '#projects', label: t('nav.projects') },
    { href: '#testimonials', label: t('nav.testimonials') },
    { href: '#experience', label: t('nav.experience') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <>
      {/* ─── Navbar ─── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
        style={{ backgroundColor: 'var(--navbar-bg)', borderBottom: '1px solid var(--border-color)' }}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          {/* Logo */}
          <a href="#" className="text-xl font-bold tracking-tight" style={{ color: 'var(--primary-blue)' }}>
            FR
          </a>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-7">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="text-[13px] font-medium transition-colors duration-200"
                style={{ color: 'var(--text-tertiary)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-amber)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            {/* Language */}
            <div className="lang-sel relative">
              <button
                onClick={e => { e.stopPropagation(); setLangOpen(!langOpen); }}
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200"
                style={{ color: 'var(--text-tertiary)' }}
              >
                <Image src="/globe-language.svg" alt="Language" width={18} height={18} className="opacity-60" />
              </button>
              {langOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-40 rounded-xl p-1 shadow-lg border animate-[fadeInDropdown_0.15s_ease]"
                  style={{ backgroundColor: 'var(--bg-dark)', borderColor: 'var(--border-color)' }}
                >
                  {(['es', 'en'] as const).map(lang => (
                    <button
                      key={lang}
                      onClick={e => { e.stopPropagation(); setLanguage(lang); setLangOpen(false); }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150"
                      style={language === lang ? { backgroundColor: 'var(--primary-blue)', color: '#fff' } : { color: 'var(--text-secondary)' }}
                    >
                      {lang === 'es' ? '🇪🇸 Español' : '🇺🇸 English'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme */}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-full text-base"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* CV button */}
            <button
              onClick={() => downloadCV()}
              className="ml-2 hidden h-9 items-center rounded-full border-2 px-5 text-[13px] font-semibold transition-all duration-300 lg:inline-flex"
              style={{ borderColor: 'var(--primary-blue)', color: 'var(--primary-blue)' }}
            >
              {t('nav.downloadCV')}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="ml-1 flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
              aria-label="Menu"
            >
              <span className={`block h-[2px] w-5 rounded-full transition-all duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} style={{ backgroundColor: 'var(--text-primary)' }} />
              <span className={`block h-[2px] w-5 rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: 'var(--text-primary)' }} />
              <span className={`block h-[2px] w-5 rounded-full transition-all duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} style={{ backgroundColor: 'var(--text-primary)' }} />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile menu ─── */}
      <div
        className={`fixed inset-0 z-40 backdrop-blur-lg pt-20 transition-all duration-300 lg:hidden ${menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        style={{ backgroundColor: 'var(--navbar-bg)' }}
      >
        <div className="mx-auto max-w-sm space-y-1 px-6">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3.5 text-base font-medium transition-colors duration-200"
              style={{ color: 'var(--text-primary)' }}
            >
              {l.label}
            </a>
          ))}
          <div className="pt-4">
            <button
              onClick={() => { downloadCV(); setMenuOpen(false); }}
              className="w-full rounded-xl py-3 text-sm font-semibold text-white"
              style={{ backgroundColor: 'var(--primary-blue)' }}
            >
              {t('nav.downloadCV')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
