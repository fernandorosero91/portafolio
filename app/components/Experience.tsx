'use client';

import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';
import { experiencesData } from '../data/experiences';

type FilterType = 'all' | 'academic' | 'professional';

export default function Experience() {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  const experiences = experiencesData[language];

  const filteredExperiences = activeFilter === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.type === activeFilter);

  return (
    <section className="experience" id="experience">
      <div className="section-container">
        <div ref={headerRef} className={`section-header scroll-reveal ${headerVisible ? 'visible' : ''}`}>
          <h2 className="section-title">{t('experience.title')}</h2>
          <p className="section-subtitle">{t('experience.subtitle')}</p>
        </div>

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
      </div>
    </section>
  );
}
