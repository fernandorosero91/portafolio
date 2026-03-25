'use client';

export default function Projects() {
  const projects = [
    {
      title: 'Sistema de Gestión de Parqueaderos',
      description: 'Plataforma completa para administración de parqueaderos con control de ingresos, tarifas y reportes en tiempo real.',
      technologies: ['Django', 'Tailwind CSS', 'PostgreSQL'],
      status: 'production',
      icon: 'M12 3L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-4zm0 2.18l8 3.2v8.12c0 4.52-3.13 8.78-8 9.88-4.87-1.1-8-5.36-8-9.88V8.38l8-3.2zM11 11v6h2v-6h-2zm0-4v2h2V7h-2z'
    },
    {
      title: 'Facturación Electrónica Colombia',
      description: 'Sistema de facturación electrónica cumpliendo normativa DIAN, con generación automática de documentos tributarios.',
      technologies: ['Python Flask', 'MySQL'],
      status: 'production',
      icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z'
    },
    {
      title: 'Gestión de Restaurantes',
      description: 'Aplicación para manejo de pedidos, inventario y facturación en restaurantes con interfaz intuitiva.',
      technologies: ['Node.js', 'Express.js', 'EJS'],
      status: 'testing',
      icon: 'M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z'
    },
    {
      title: 'Control de Inventarios y Ventas',
      description: 'Sistema integral para gestión de inventarios, ventas y reportes financieros con dashboard interactivo.',
      technologies: ['Laravel 12', 'Vue.js', 'PostgreSQL'],
      status: 'testing',
      icon: 'M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2zm-5 12H9v-2h6v2zm5-7H4V4h16v3z'
    },
  ];

  return (
    <section className="projects" id="projects">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Proyectos Destacados</h2>
          <p className="section-subtitle">Soluciones tecnológicas que combinan finanzas y desarrollo</p>
        </div>
        
        <div className="testimonials-grid">
          {projects.map((project, index) => (
            <div key={index} className="testimonial-card">
              <div className="project-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d={project.icon} />
                </svg>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="testimonial-text">{project.description}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
              <p className={project.status === 'production' ? 'status-production' : 'status-testing'}>
                {project.status === 'production' ? '✓ En Producción' : '⚡ En Pruebas'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
