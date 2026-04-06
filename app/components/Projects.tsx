'use client';

import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';

export default function Projects() {
  const { t } = useLanguage();
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  const projects = [
    {
      titleKey: 'project1.title',
      descriptionKey: 'project1.description',
      technologies: ['Django', 'Tailwind CSS', 'PostgreSQL'],
      status: 'production',
      icon: 'M12 3L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-4zm0 2.18l8 3.2v8.12c0 4.52-3.13 8.78-8 9.88-4.87-1.1-8-5.36-8-9.88V8.38l8-3.2zM11 11v6h2v-6h-2zm0-4v2h2V7h-2z'
    },
    {
      titleKey: 'project2.title',
      descriptionKey: 'project2.description',
      technologies: ['Python Flask', 'MySQL'],
      status: 'production',
      icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z'
    },
    {
      titleKey: 'project3.title',
      descriptionKey: 'project3.description',
      technologies: ['Node.js', 'Express.js', 'EJS'],
      status: 'testing',
      icon: 'M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z'
    },
    {
      titleKey: 'project4.title',
      descriptionKey: 'project4.description',
      technologies: ['Laravel 12', 'Vue.js', 'PostgreSQL'],
      status: 'testing',
      icon: 'M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2zm-5 12H9v-2h6v2zm5-7H4V4h16v3z'
    },
  ];

  return (
    <section className="projects" id="projects">
      <div className="section-container">
        <div ref={headerRef} className={`section-header scroll-reveal ${headerVisible ? 'visible' : ''}`}>
          <h2 className="section-title">{t('projects.title')}</h2>
          <p className="section-subtitle">{t('projects.subtitle')}</p>
        </div>
        
        <div className="testimonials-grid">
          {projects.map((project, index) => {
            const { ref, isVisible } = useScrollReveal({ threshold: 0.1, delay: index * 100 });
            return (
              <div key={index} ref={ref} className={`testimonial-card scroll-reveal-scale ${isVisible ? 'visible' : ''}`}>
              <div className="project-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d={project.icon} />
                </svg>
              </div>
              <h3 className="project-title">{t(`projects.${project.titleKey}`)}</h3>
              <p className="testimonial-text">{t(`projects.${project.descriptionKey}`)}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
              <p className={project.status === 'production' ? 'status-production' : 'status-testing'}>
                {project.status === 'production' ? t('projects.production') : t('projects.testing')}
              </p>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
