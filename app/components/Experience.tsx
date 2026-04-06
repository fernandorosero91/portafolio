'use client';

import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';
import { experiencesData } from '../data/experiences';
import FlipCard from './FlipCard';

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
            <FlipCard
              key={index}
              front={{
                year: exp.year,
                title: exp.title,
                subtitle: exp.subtitle,
              }}
              back={{
                description: exp.description,
                type: exp.type,
              }}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
