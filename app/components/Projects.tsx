'use client';

import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';
import ProjectDemoModal from './ProjectDemoModal';

export default function Projects() {
  const { t } = useLanguage();
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      titleKey: 'project1.title',
      descriptionKey: 'project1.description',
      technologies: ['Django', 'Tailwind CSS', 'PostgreSQL'],
      status: 'production',
      icon: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z',
      demoUrl: 'https://solupark.gestionxpress.app/',
      image: '/projects/solupark-dashboard.jpg',
      credentials: {
        email: 'demosolupark@gmail.com',
        password: 'demo123'
      },
      features: [
        'Control de entrada y salida de vehículos en tiempo real',
        'Gestión de tarifas por categoría (motos, carros, camionetas)',
        'Reportes diarios de ingresos y ocupación',
        'Dashboard con estadísticas visuales y métricas clave',
        'Sistema de mensualidades para clientes frecuentes',
        'Historial completo de transacciones y pagos'
      ]
    },
    {
      titleKey: 'project2.title',
      descriptionKey: 'project2.description',
      technologies: ['Python Flask', 'MySQL'],
      status: 'production',
      icon: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z',
      demoUrl: null,
      image: '/projects/facturacion-dashboard.jpg',
      features: [
        'Generación automática de facturas electrónicas DIAN',
        'Cumplimiento total con normativa tributaria colombiana',
        'Cálculo automático de impuestos (IVA, INC, retenciones)',
        'Generación de documentos PDF y XML',
        'Envío automático de facturas por email',
        'Reportes de ventas y obligaciones tributarias',
        'Integración con firma digital',
        'Gestión de clientes y productos'
      ]
    },
    {
      titleKey: 'project3.title',
      descriptionKey: 'project3.description',
      technologies: ['Node.js', 'Express.js', 'EJS'],
      status: 'testing',
      icon: 'M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z',
      demoUrl: 'https://restaurante.gestionxpress.app/',
      image: '/projects/restaurante-dashboard.jpg',
      credentials: {
        email: 'demorestaurante@gmail.com',
        password: 'admin123'
      },
      features: [
        'Sistema de punto de venta (POS) intuitivo y rápido',
        'Gestión de menú con categorías y precios',
        'Control de pedidos en tiempo real',
        'Gestión de mesas y comandas',
        'Inventario de productos e ingredientes',
        'Reportes de ventas diarias y mensuales',
        'Múltiples formas de pago (efectivo, tarjeta, transferencia)',
        'Impresión de facturas y comandas de cocina'
      ]
    },
    {
      titleKey: 'project4.title',
      descriptionKey: 'project4.description',
      technologies: ['Laravel 12', 'Vue.js', 'PostgreSQL'],
      status: 'testing',
      icon: 'M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2zm0 2v3H4V4h16zM4 20v-9h16v9H4zm8-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z',
      demoUrl: 'https://pos.gestionxpress.app/',
      image: '/projects/pos-dashboard.jpg',
      credentials: {
        email: 'demopos@gmail.com',
        password: 'admin123'
      },
      features: [
        'Control completo de inventario con alertas de stock mínimo',
        'Sistema de ventas con múltiples métodos de pago',
        'Gestión de proveedores y compras',
        'Reportes financieros detallados (ventas, gastos, utilidades)',
        'Dashboard interactivo con gráficos y estadísticas',
        'Control de usuarios y permisos por rol',
        'Gestión de clientes y historial de compras',
        'Código de barras y búsqueda rápida de productos'
      ]
    },
  ];

  const handleDemoClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section className="projects" id="projects">
      <div className="section-container">
        <div ref={headerRef} className={`section-header scroll-reveal ${headerVisible ? 'visible' : ''}`}>
          <h2 className="section-title">{t('projects.title')}</h2>
          <p className="section-subtitle">{t('projects.subtitle')}</p>
        </div>
        
        <div className="projects-grid">
          {projects.map((project, index) => {
            const { ref, isVisible } = useScrollReveal({ threshold: 0.1, delay: index * 100 });
            return (
              <div key={index} ref={ref} className={`project-card scroll-reveal-scale ${isVisible ? 'visible' : ''}`}>
                <div className="project-card-header">
                  <div className="project-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d={project.icon} />
                    </svg>
                  </div>
                  <span className={`project-status ${project.status === 'production' ? 'status-production' : 'status-testing'}`}>
                    {project.status === 'production' ? t('projects.production') : t('projects.testing')}
                  </span>
                </div>

                <h3 className="project-title">{t(`projects.${project.titleKey}`)}</h3>
                <p className="project-description">{t(`projects.${project.descriptionKey}`)}</p>
                
                <div className="project-tech-stack">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>

                <div className="project-actions">
                  <button
                    onClick={() => handleDemoClick(project)}
                    className="btn-project btn-demo btn-demo-full"
                  >
                    {project.demoUrl ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        {t('projects.viewDemo')}
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                        {t('projects.viewInfo')}
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedProject && (
        <ProjectDemoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          project={selectedProject}
        />
      )}
    </section>
  );
}
