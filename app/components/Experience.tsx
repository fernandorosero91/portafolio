'use client';

import { useState } from 'react';

type FilterType = 'all' | 'academic' | 'professional';

export default function Experience() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const experiences = [
    {
      type: 'academic' as const,
      year: '2024 - Actual',
      title: 'Ingeniería de Software',
      subtitle: 'Universidad Cooperativa de Colombia',
      description: 'Actualmente cursando 5to semestre. Enfoque en desarrollo full-stack, arquitectura de software y metodologías ágiles. Proyectos con Python, Java Spring Boot, JavaScript y React.'
    },
    {
      type: 'professional' as const,
      year: '2023 - Actual',
      title: 'Docente de Contaduría Pública',
      subtitle: 'Universidad Autónoma',
      description: 'Docente de cátedra en programas de Contaduría Pública. Enseñanza de materias relacionadas con contabilidad, tributación y sistemas de información contable.'
    },
    {
      type: 'professional' as const,
      year: '2019 - Actual',
      title: 'Contador Público',
      subtitle: 'Coopcolon',
      description: 'Responsable de la gestión contable y financiera. Preparación de estados financieros, declaraciones tributarias y auditorías internas bajo normativa NIIF.'
    },
    {
      type: 'academic' as const,
      year: '2021 - 2023',
      title: 'Magíster en Gerencia y Auditoría Tributaria',
      subtitle: 'Universidad Mariana',
      description: 'Especialización en gestión tributaria, auditoría fiscal y planeación tributaria estratégica para organizaciones.'
    },
    {
      type: 'professional' as const,
      year: '2022 - 2024',
      title: 'Asistente Vicerrectoría Administrativa y Financiera',
      subtitle: 'Universidad de Nariño',
      description: 'Apoyo en gestión administrativa y financiera de la vicerrectoría. Análisis de presupuesto, seguimiento de proyectos y elaboración de informes ejecutivos.'
    },
    {
      type: 'professional' as const,
      year: '2021 - 2024',
      title: 'Contador Público',
      subtitle: 'Asociación de Cabildos Indígenas IntyQuilla',
      description: 'Gestión contable y financiera de la asociación. Manejo de recursos de proyectos comunitarios y cumplimiento de normativas para entidades sin ánimo de lucro.'
    },
    {
      type: 'professional' as const,
      year: '2021 - 2022',
      title: 'Profesional de Ingresos',
      subtitle: 'Corponariño',
      description: 'Gestión y control de ingresos institucionales. Análisis financiero, proyecciones presupuestales y reportes de ejecución.'
    },
    {
      type: 'professional' as const,
      year: '2019 - 2020',
      title: 'Auxiliar Contable',
      subtitle: 'Supermercado Metrópolis 21',
      description: 'Registro de operaciones contables, conciliaciones bancarias, manejo de cuentas por pagar y cobrar, y apoyo en cierre contable mensual.'
    },
    {
      type: 'academic' as const,
      year: '2014 - 2019',
      title: 'Contador Público',
      subtitle: 'Universidad de Nariño',
      description: 'Formación integral en contabilidad, finanzas, auditoría y tributación. Desarrollo de habilidades en análisis financiero y sistemas de información contable.'
    },
    {
      type: 'professional' as const,
      year: '2016 - 2019',
      title: 'Auxiliar de Presupuesto',
      subtitle: 'Universidad de Nariño',
      description: 'Apoyo en elaboración y seguimiento del presupuesto institucional. Registro de compromisos, obligaciones y pagos en el sistema financiero.'
    },
    {
      type: 'academic' as const,
      year: '2008 - 2010',
      title: 'Técnico en Mecánica Diesel',
      subtitle: 'SENA',
      description: 'Formación técnica en mantenimiento y reparación de motores diesel. Desarrollo de habilidades prácticas y pensamiento analítico para resolución de problemas.'
    },
  ];

  const filteredExperiences = activeFilter === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.type === activeFilter);

  return (
    <section className="experience" id="experience">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Experiencia & Educación</h2>
          <p className="section-subtitle">Mi recorrido profesional y académico</p>
        </div>

        <div className="experience-filters">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            Todos
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'academic' ? 'active' : ''}`}
            onClick={() => setActiveFilter('academic')}
          >
            Académica
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'professional' ? 'active' : ''}`}
            onClick={() => setActiveFilter('professional')}
          >
            Profesional
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
