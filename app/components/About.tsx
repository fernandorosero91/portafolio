'use client';

import { useScrollReveal } from '../hooks/useScrollReveal';

export default function About() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal({ delay: 200 });
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollReveal({ delay: 400 });

  const skillCategories = [
    {
      category: 'Contabilidad & Finanzas',
      skills: ['Contabilidad & NIIF', 'Auditoría Tributaria', 'Gestión Financiera', 'Estados Financieros', 'Planeación Tributaria']
    },
    {
      category: 'Desarrollo Backend',
      skills: ['Python', 'Django', 'Java', 'Spring Boot', 'Node.js', 'Express.js', 'Laravel', 'Flask']
    },
    {
      category: 'Desarrollo Frontend',
      skills: ['JavaScript', 'React', 'Vue.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'EJS']
    },
    {
      category: 'Bases de Datos',
      skills: ['PostgreSQL', 'MySQL', 'SQL Server']
    },
    {
      category: 'Herramientas & Otros',
      skills: ['Git', 'Cloud Computing', 'DevOps', 'API REST', 'Metodologías Ágiles']
    }
  ];

  return (
    <section className="about" id="about">
      <div className="section-container">
        <div ref={headerRef} className={`section-header scroll-reveal ${headerVisible ? 'visible' : ''}`}>
          <h2 className="section-title">Acerca de Mí</h2>
          <p className="section-subtitle">Conoce mi trayectoria profesional y habilidades</p>
        </div>
        
        <div className="about-grid">
          <div ref={contentRef} className={`about-content scroll-reveal-left ${contentVisible ? 'visible' : ''}`}>
            <h3>Mi Trayectoria</h3>
            <p className="about-text">
              Soy Contador Público con Maestría en Gerencia y Auditoría Tributaria, actualmente cursando 5to semestre de Ingeniería de Software. Mi trayectoria profesional combina más de 8 años de experiencia en el sector contable y financiero con una creciente pasión por el desarrollo de software.
            </p>
            <p className="about-text">
              He trabajado en instituciones como la Universidad de Nariño, Corponariño y actualmente me desempeño como Contador Público en Coopcolon y Docente en la Universidad Autónoma. Paralelamente, desarrollo soluciones tecnológicas que integran mis conocimientos contables con programación, creando herramientas que automatizan y optimizan procesos empresariales.
            </p>
            <p className="about-text">
              Más allá del ámbito profesional, encuentro equilibrio en mis pasiones personales. La música es parte fundamental de mi vida, especialmente el canto, que me permite expresar creatividad de una forma diferente. También soy un apasionado del fútbol, deporte que practico regularmente y que me ha enseñado el valor del trabajo en equipo, la disciplina y la perseverancia, valores que aplico tanto en mi vida personal como profesional.
            </p>
          </div>
          
          <div ref={skillsRef} className={`skills-section scroll-reveal-right ${skillsVisible ? 'visible' : ''}`}>
            <h4>Habilidades Técnicas</h4>
            <div className="skills-categories">
              {skillCategories.map((category) => (
                <div key={category.category} className="skill-category">
                  <h5 className="category-title">{category.category}</h5>
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
