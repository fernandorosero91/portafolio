'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import ParticlesBackground from './ParticlesBackground';
import { useLanguage } from '../contexts/LanguageContext';
import { useDownloadCV } from '../hooks/useDownloadCV';

export default function Hero() {
  const { t } = useLanguage();
  const { downloadCV } = useDownloadCV();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadCV = () => {
    downloadCV();
  };

  return (
    <section className="hero" id="inicio">
      <ParticlesBackground />
      <div className="hero-container">
        <div 
          className="hero-content"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <div className="hero-badge">● {t('hero.available')}</div>
          <h1>
            <span className="name-first">{t('hero.name')}</span><br />
            <span className="name-last">{t('hero.lastName')}</span>
          </h1>
          <p className="hero-subtitle">{t('hero.subtitle')}</p>
          <p className="hero-description">
            {t('hero.description')}
          </p>
          
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">8+</span>
              <span className="stat-label">{t('hero.yearsExp')}</span>
            </div>
            <div className="stat">
              <span className="stat-value">5+</span>
              <span className="stat-label">{t('hero.projectsCount')}</span>
            </div>
            <div className="stat">
              <span className="stat-value">7+</span>
              <span className="stat-label">{t('hero.organizations')}</span>
            </div>
          </div>
          
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">{t('hero.viewProjects')}</a>
            <button onClick={handleDownloadCV} className="btn btn-secondary">↓ {t('hero.downloadCV')}</button>
          </div>
        </div>
        
        <div 
          className="hero-avatar"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        >
          <div className="avatar-box">
            <Image 
              src="/profile-photo.jpg" 
              alt="Fernando Rosero - Perfil Profesional"
              width={400}
              height={500}
              priority
              style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '12px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
