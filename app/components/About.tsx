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
      category: 'Desarrollo Backend',
      translationKey: 'backend',
      skills: [
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
        { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
        { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' }
      ]
    },
    {
      category: 'Desarrollo Frontend',
      translationKey: 'frontend',
      skills: [
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
        { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' }
      ]
    },
    {
      category: 'Bases de Datos',
      translationKey: 'databases',
      skills: [
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        { name: 'SQL Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg' }
      ]
    },
    {
      category: 'Herramientas',
      translationKey: 'tools',
      skills: [
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'Cloud Computing', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
        { name: 'DevOps', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
        { name: 'API REST', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' }
      ]
    },
    {
      category: 'Contabilidad & Finanzas',
      translationKey: 'accounting',
      skills: [
        { name: 'NIIF', icon: '📊' },
        { name: 'Auditoría Tributaria', icon: '🔍' },
        { name: 'Gestión Financiera', icon: '💼' },
        { name: 'Planeación Tributaria', icon: '📈' }
      ]
    }
  ];

  return (
    <section className="about" id="about">
      <div className="section-container">
        <div ref={headerRef} className={`section-header scroll-reveal ${headerVisible ? 'visible' : ''}`}>
          <h2 className="section-title">{t('about.title')}</h2>
          <p className="section-subtitle">{t('about.subtitle')}</p>
        </div>
        
        {/* Biografía en ancho completo */}
        <div ref={contentRef} className={`about-intro scroll-reveal ${contentVisible ? 'visible' : ''}`}>
          <h3>{t('about.myJourney')}</h3>
          <div className="about-text-grid">
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
        </div>

        {/* Habilidades Técnicas */}
        <div ref={skillsRef} className={`skills-section-full scroll-reveal ${skillsVisible ? 'visible' : ''}`}>
          <h3 className="skills-main-title">{t('about.skills')}</h3>
          <div className="skills-categories-grid">
            {skillCategories.map((category) => (
              <div key={category.category} className="skill-category-card">
                <h4 className="category-title">{t(`about.${category.translationKey}`)}</h4>
                <div className="skills-tags">
                  {category.skills.map((skill) => (
                    <span key={skill.name} className="skill-tag">
                      {typeof skill.icon === 'string' && skill.icon.startsWith('http') ? (
                        <img 
                          src={skill.icon} 
                          alt={skill.name}
                          className="skill-icon"
                        />
                      ) : (
                        <span className="skill-emoji">{skill.icon}</span>
                      )}
                      <span className="skill-name">{skill.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
