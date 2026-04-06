'use client';

import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal({ threshold: 0.1, delay: 200 });
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollReveal({ threshold: 0.1, delay: 400 });

  const skillCategories = [
    {
      category: 'Contabilidad & Finanzas',
      translationKey: 'accounting',
      skills: ['NIIF', 'Auditoría Tributaria', 'Gestión Financiera', 'Planeación Tributaria']
    },
    {
      category: 'Desarrollo Backend',
      translationKey: 'backend',
      skills: ['Python', 'Django', 'Java', 'Spring Boot', 'Node.js', 'Laravel']
    },
    {
      category: 'Desarrollo Frontend',
      translationKey: 'frontend',
      skills: ['JavaScript', 'React', 'Vue.js', 'HTML5', 'CSS3', 'Tailwind CSS']
    },
    {
      category: 'Bases de Datos',
      translationKey: 'databases',
      skills: ['PostgreSQL', 'MySQL', 'SQL Server']
    },
    {
      category: 'Herramientas',
      translationKey: 'tools',
      skills: ['Git', 'Cloud Computing', 'DevOps', 'API REST']
    }
  ];

  return (
    <section className="about" id="about">
      <div className="section-container">
        <div ref={headerRef} className={`section-header scroll-reveal ${headerVisible ? 'visible' : ''}`}>
          <h2 className="section-title">{t('about.title')}</h2>
          <p className="section-subtitle">{t('about.subtitle')}</p>
        </div>
        
        <div className="about-grid">
          <div ref={contentRef} className={`about-content scroll-reveal-left ${contentVisible ? 'visible' : ''}`}>
            <h3>{t('about.myJourney')}</h3>
            <p className="about-text">
              {t('about.text1')}
            </p>
            <p className="about-text">
              {t('about.text2')}
            </p>
            <p className="about-text">
              {t('about.text3')}
            </p>
          </div>
          
          <div ref={skillsRef} className={`skills-section scroll-reveal-right ${skillsVisible ? 'visible' : ''}`}>
            <h4>{t('about.skills')}</h4>
            <div className="skills-categories">
              {skillCategories.map((category) => (
                <div key={category.category} className="skill-category">
                  <h5 className="category-title">{t(`about.${category.translationKey}`)}</h5>
                  <div className="skills-tags">
                    {category.skills.map((skill) => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
