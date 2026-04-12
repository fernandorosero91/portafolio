'use client';

import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';
import { experiencesData } from '../data/experiences';

type FilterType = 'all' | 'academic' | 'professional';
type ViewMode = 'carousel' | 'timeline';

export default function Experience() {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('carousel');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  const experiences = experiencesData[language];

  const filteredExperiences = activeFilter === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.type === activeFilter);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeFilter]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % filteredExperiences.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + filteredExperiences.length) % filteredExperiences.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (viewMode !== 'carousel') return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, viewMode, filteredExperiences.length]);

  return (
    <section className="experience" id="experience">
      <div className="section-container">
        <div ref={headerRef} className={`section-header scroll-reveal ${headerVisible ? 'visible' : ''}`}>
          <h2 className="section-title">{t('experience.title')}</h2>
          <p className="section-subtitle">{t('experience.subtitle')}</p>
        </div>

        <div className="experience-controls">
          <div className="experience-filters">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              {t('experience.all')}
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'academic' ? 'active' : ''}`}
              onClick={() => setActiveFilter('academic')}
            >
              {t('experience.academic')}
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'professional' ? 'active' : ''}`}
              onClick={() => setActiveFilter('professional')}
            >
              {t('experience.professional')}
            </button>
          </div>

          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'carousel' ? 'active' : ''}`}
              onClick={() => setViewMode('carousel')}
              title="Carousel View"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2"/>
                <path d="M7 15h10M9 11h6"/>
              </svg>
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'timeline' ? 'active' : ''}`}
              onClick={() => setViewMode('timeline')}
              title="Timeline View"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="2" x2="12" y2="22"/>
                <circle cx="12" cy="6" r="2"/>
                <circle cx="12" cy="12" r="2"/>
                <circle cx="12" cy="18" r="2"/>
              </svg>
            </button>
          </div>
        </div>

        {viewMode === 'carousel' ? (
          <div className="experience-carousel">
            <div className="carousel-container">
              <button 
                className="carousel-nav prev" 
                onClick={prevSlide}
                disabled={isAnimating}
                aria-label="Previous experience"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>

              <div className="carousel-track">
                {filteredExperiences.map((exp, index) => (
                  <div
                    key={index}
                    className={`carousel-card ${index === currentIndex ? 'active' : ''} ${
                      index === currentIndex - 1 || (currentIndex === 0 && index === filteredExperiences.length - 1) ? 'prev' : ''
                    } ${
                      index === currentIndex + 1 || (currentIndex === filteredExperiences.length - 1 && index === 0) ? 'next' : ''
                    }`}
                    data-type={exp.type}
                  >
                    <div className="card-badge">
                      {exp.type === 'academic' ? t('experience.academic') : t('experience.professional')}
                    </div>
                    <div className="card-year">{exp.year}</div>
                    <h3 className="card-title">{exp.title}</h3>
                    <p className="card-subtitle">{exp.subtitle}</p>
                    <p className="card-description">{exp.description}</p>
                  </div>
                ))}
              </div>

              <button 
                className="carousel-nav next" 
                onClick={nextSlide}
                disabled={isAnimating}
                aria-label="Next experience"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>

            <div className="carousel-dots">
              {filteredExperiences.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="carousel-counter">
              {currentIndex + 1} / {filteredExperiences.length}
            </div>
          </div>
        ) : (
          <div className="timeline">
            {filteredExperiences.map((exp, index) => (
              <div key={index} className="timeline-item" data-type={exp.type}>
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-year">{exp.year}</div>
                  <h3 className="timeline-title">{exp.title}</h3>
                  <p className="timeline-subtitle">{exp.subtitle}</p>
                  <p className="timeline-description">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
