'use client';

import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';
import ProjectDemoModal from './ProjectDemoModal';
import type { ProjectCardData } from '../types';

const PROJECT_CARDS: ProjectCardData[] = [
  { titleKey: 'project1.title', descriptionKey: 'project1.description', technologies: ['Django', 'Tailwind CSS', 'PostgreSQL'], status: 'production', icon: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z', demoUrl: 'https://solupark.gestionxpress.app/', image: '/projects/solupark-dashboard.jpg', credentials: { email: 'demosolupark@gmail.com', password: 'demo123' }, features: ['Control de vehículos en tiempo real','Gestión de tarifas por categoría','Reportes diarios de ingresos','Dashboard con estadísticas','Sistema de mensualidades','Historial de transacciones'] },
  { titleKey: 'project2.title', descriptionKey: 'project2.description', technologies: ['Python Flask', 'MySQL'], status: 'production', icon: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z', demoUrl: null, image: '/projects/facturacion-dashboard.jpg', features: ['Facturas electrónicas DIAN','Normativa tributaria colombiana','Cálculo automático de impuestos','Documentos PDF y XML','Envío automático por email','Reportes tributarios','Firma digital','Gestión de clientes'] },
  { titleKey: 'project3.title', descriptionKey: 'project3.description', technologies: ['Node.js', 'Express.js', 'EJS'], status: 'testing', icon: 'M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z', demoUrl: 'https://restaurante.gestionxpress.app/', image: '/projects/restaurante-dashboard.jpg', credentials: { email: 'demorestaurante@gmail.com', password: 'admin123' }, features: ['Sistema POS intuitivo','Gestión de menú','Pedidos en tiempo real','Gestión de mesas','Inventario','Reportes de ventas','Múltiples formas de pago','Impresión de facturas'] },
  { titleKey: 'project4.title', descriptionKey: 'project4.description', technologies: ['Laravel 12', 'Vue.js', 'PostgreSQL'], status: 'testing', icon: 'M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2zm0 2v3H4V4h16zM4 20v-9h16v9H4zm8-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z', demoUrl: 'https://pos.gestionxpress.app/', image: '/projects/pos-dashboard.jpg', credentials: { email: 'demopos@gmail.com', password: 'admin123' }, features: ['Control de inventario','Ventas con múltiples pagos','Gestión de proveedores','Reportes financieros','Dashboard interactivo','Control de permisos','Gestión de clientes','Código de barras'] },
];

interface ProjectCardProps {
  project: ProjectCardData;
  index: number;
  onDemo: (project: ProjectCardData) => void;
}

function ProjectCard({ project, index, onDemo }: ProjectCardProps) {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1, delay: index * 100 });

  return (
    <div ref={ref} className={`rounded-2xl p-7 border flex flex-col gap-4 transition-all duration-300 group relative overflow-hidden hover:-translate-y-2 hover:shadow-xl scroll-reveal-scale ${isVisible ? 'visible' : ''}`} style={{ backgroundColor: 'var(--bg-dark)', borderColor: 'var(--border-color)' }}>
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4A6FA8] to-[#2DD4BF] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />

      <div className="flex justify-between items-start">
        <div className="w-14 h-14 rounded-xl flex items-center justify-center border-2 transition-all duration-300 group-hover:scale-105" style={{ background: 'linear-gradient(135deg, rgba(74,111,168,0.15), rgba(45,212,191,0.15))', borderColor: 'rgba(74,111,168,0.3)' }}>
          <svg viewBox="0 0 24 24" className="w-7 h-7 transition-[fill] duration-300" style={{ fill: 'var(--primary-blue)' }}><path d={project.icon} /></svg>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${project.status === 'production' ? 'text-emerald-400 border-emerald-400 bg-emerald-400/10' : 'border-amber-400 bg-amber-400/10'}`} style={project.status !== 'production' ? { color: 'var(--accent-amber)', borderColor: 'var(--accent-amber)' } : {}}>
          {project.status === 'production' ? t('projects.production') : t('projects.testing')}
        </span>
      </div>

      <h3 className="text-xl font-bold leading-snug" style={{ color: 'var(--text-primary)' }}>{t(`projects.${project.titleKey}`)}</h3>
      <p className="text-base leading-relaxed flex-grow" style={{ color: 'var(--text-secondary)' }}>{t(`projects.${project.descriptionKey}`)}</p>

      <div className="flex flex-wrap gap-2">
        {project.technologies.map(tech => (
          <span key={tech} className="px-3 py-1 rounded-lg text-sm font-semibold border" style={{ backgroundColor: 'rgba(74,111,168,0.15)', borderColor: 'rgba(74,111,168,0.25)', color: 'var(--text-primary)' }}>{tech}</span>
        ))}
      </div>

      <button onClick={() => onDemo(project)} className="btn-filled w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 mt-auto" style={{ backgroundColor: 'var(--primary-blue)' }}>
        {project.demoUrl ? (
          <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>{t('projects.viewDemo')}</>
        ) : (
          <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>{t('projects.viewInfo')}</>
        )}
      </button>
    </div>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const { ref: headerRef, isVisible: hv } = useScrollReveal();
  const [selected, setSelected] = useState<ProjectCardData | null>(null);

  return (
    <section id="projects" className="scroll-mt-20 py-20 px-6 lg:px-8" style={{ backgroundColor: 'var(--bg-card)' }}>
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className={`text-center mb-14 scroll-reveal ${hv ? 'visible' : ''}`}>
          <h2 className="text-4xl lg:text-5xl font-bold font-[Cormorant_Garamond,serif] mb-3" style={{ color: 'var(--text-primary)' }}>{t('projects.title')}</h2>
          <p className="text-base" style={{ color: 'var(--text-tertiary)' }}>{t('projects.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {PROJECT_CARDS.map((p, i) => <ProjectCard key={p.titleKey} project={p} index={i} onDemo={setSelected} />)}
        </div>
      </div>
      {selected && <ProjectDemoModal isOpen={!!selected} onClose={() => setSelected(null)} project={selected} />}
    </section>
  );
}
