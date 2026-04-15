'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useDownloadCV } from '../hooks/useDownloadCV';
import Image from 'next/image';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { downloadCV } = useDownloadCV();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to 'light'
    const currentTheme = (localStorage.getItem('theme') || 'light') as 'light' | 'dark';
    setTheme(currentTheme);
    if (currentTheme === 'light') {
      document.documentElement.classList.add('light-mode');
    }
  }, []);

  useEffect(() => {
    // Close language menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (languageMenuOpen && !target.closest('.language-selector')) {
        setLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [languageMenuOpen]);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('light-mode');
    const isLightMode = document.documentElement.classList.contains('light-mode');
    const newTheme = isLightMode ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const toggleLanguageMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLanguageMenuOpen(!languageMenuOpen);
  };

  const selectLanguage = (lang: 'es' | 'en', e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('Changing language to:', lang); // Debug
    setLanguage(lang);
    setLanguageMenuOpen(false);
  };

  const navLinks = [
    { href: '#inicio', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#testimonials', label: t('nav.testimonials') },
    { href: '#experience', label: t('nav.experience') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <a href="#" className="navbar-logo">FR</a>
          
          {/* Desktop Navigation */}
          <ul className="navbar-nav">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          
          {/* Desktop Actions */}
          <div className="navbar-actions">
            <div className="language-selector">
              <button 
                className="theme-toggle language-toggle" 
                onClick={toggleLanguageMenu}
                aria-label="Select language"
                title="Select language / Seleccionar idioma"
              >
                <Image 
                  src="/globe.svg" 
                  alt="Language" 
                  width={20} 
                  height={20}
                  style={{ filter: 'brightness(0) saturate(100%) invert(70%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(90%)' }}
                />
              </button>
              {languageMenuOpen && (
                <div className="language-dropdown" onClick={(e) => e.stopPropagation()}>
                  <button 
                    className={`language-option ${language === 'es' ? 'active' : ''}`}
                    onClick={(e) => selectLanguage('es', e)}
                  >
                    🇪🇸 Español
                  </button>
                  <button 
                    className={`language-option ${language === 'en' ? 'active' : ''}`}
                    onClick={(e) => selectLanguage('en', e)}
                  >
                    🇬🇧 English
                  </button>
                </div>
              )}
            </div>
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'light' ? '☀' : '☾'}
            </button>
            <button onClick={downloadCV} className="cv-button">{t('nav.downloadCV')}</button>
            
            {/* Mobile Hamburger */}
            <button 
              className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={closeMobileMenu}>{link.label}</a>
            </li>
          ))}
          <li className="mobile-language-selector">
            <button 
              className={`language-option-mobile ${language === 'es' ? 'active' : ''}`}
              onClick={() => {
                setLanguage('es');
                closeMobileMenu();
              }}
              type="button"
            >
              🇪🇸 Español
            </button>
            <button 
              className={`language-option-mobile ${language === 'en' ? 'active' : ''}`}
              onClick={() => {
                setLanguage('en');
                closeMobileMenu();
              }}
              type="button"
            >
              🇬🇧 English
            </button>
          </li>
          <li>
            <button 
              onClick={() => {
                downloadCV();
                closeMobileMenu();
              }} 
              className="cv-button-mobile"
              type="button"
            >
              {t('nav.downloadCV')}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
