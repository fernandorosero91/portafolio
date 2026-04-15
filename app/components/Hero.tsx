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
    const h = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, var(--hero-from) 0%, var(--hero-to) 100%)' }}
    >
      <ParticlesBackground />

      {/* Content wrapper — centered */}
      <div
        className="relative z-2 mx-auto w-full max-w-6xl px-5 pb-20 pt-28 sm:pt-32 lg:pb-28 lg:pt-40"
      >
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16 xl:gap-20">

          {/* Left column: text */}
          <div
            className="order-2 mx-auto max-w-xl text-center lg:order-1 lg:mx-0 lg:text-left"
            style={{ transform: `translateY(${scrollY * 0.05}px)` }}
          >
            {/* Badge */}
            <span
              className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {t('hero.available')}
            </span>

            {/* Name */}
            <h1 className="mb-4 sm:mb-5 font-[Cormorant_Garamond,serif] font-black leading-[1.05] tracking-tight">
              <span className="block text-4xl sm:text-5xl md:text-6xl xl:text-7xl" style={{ color: 'var(--text-primary)' }}>
                {t('hero.name')}
              </span>
              <span className="block text-4xl sm:text-5xl md:text-6xl xl:text-7xl" style={{ color: 'var(--accent-amber)' }}>
                {t('hero.lastName')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mb-5 text-base font-semibold tracking-wide lg:text-lg" style={{ color: 'var(--text-primary)' }}>
              {t('hero.subtitle')}
            </p>

            {/* Description */}
            <p className="mx-auto mb-10 max-w-md text-base leading-relaxed lg:mx-0" style={{ color: 'var(--text-tertiary)' }}>
              {t('hero.description')}
            </p>

            {/* Stats */}
            <div className="mb-8 sm:mb-10 flex justify-center gap-6 sm:gap-10 lg:justify-start">
              {[
                { v: '8+', l: t('hero.yearsExp') },
                { v: '5+', l: t('hero.projectsCount') },
                { v: '7+', l: t('hero.organizations') },
              ].map(s => (
                <div key={s.l} className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold leading-none lg:text-4xl" style={{ color: 'var(--accent-amber)' }}>{s.v}</div>
                  <div className="mt-1.5 text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
              <a
                href="#projects"
                className="btn-filled inline-flex h-11 items-center justify-center rounded-lg px-7 text-sm font-semibold text-white shadow-md"
                style={{ backgroundColor: 'var(--primary-blue)' }}
              >
                {t('hero.viewProjects')}
              </a>
              <button
                onClick={() => downloadCV()}
                className="btn-outline inline-flex h-11 items-center justify-center rounded-lg border-2 bg-transparent px-7 text-sm font-semibold"
                style={{ borderColor: 'var(--primary-blue)', color: 'var(--primary-blue)' }}
              >
                {t('hero.downloadCV')}
              </button>
            </div>
          </div>

          {/* Right column: photo */}
          <div
            className="order-1 flex justify-center lg:order-2"
            style={{ transform: `translateY(${scrollY * 0.03}px)` }}
          >
            <div
              className="relative h-64 w-56 overflow-hidden rounded-2xl shadow-xl sm:h-72 sm:w-64 md:h-80 md:w-72 lg:h-96 lg:w-80 xl:h-110 xl:w-85 2xl:h-120 2xl:w-92.5"
              style={{ border: '1px solid var(--border-color)', background: 'linear-gradient(135deg, var(--avatar-from), var(--avatar-to))' }}
            >
              <Image
                src="/profile-photo.jpg"
                alt="Fernando Rosero"
                fill
                sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, (max-width: 1280px) 320px, 370px"
                className="object-cover"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
