'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

const translations = {
  es: {
    nav: {
      home: 'Inicio',
      about: 'Acerca de',
      projects: 'Proyectos',
      testimonials: 'Testimonios',
      experience: 'Experiencia',
      contact: 'Contacto',
      downloadCV: 'Descargar CV'
    },
    hero: {
      available: 'Disponible para proyectos',
      name: 'Elier Fernando',
      lastName: 'Rosero Bravo',
      subtitle: 'Estudiante de Ingeniería de Software & Contador Público',
      description: 'Profesional con experiencia en contabilidad y finanzas, actualmente especializándome en desarrollo de software. Combino conocimientos financieros con habilidades tecnológicas para crear soluciones innovadoras que optimizan procesos empresariales.',
      yearsExp: 'Años Experiencia',
      projectsCount: 'Proyectos',
      organizations: 'Organizaciones',
      viewProjects: 'Ver Proyectos',
      downloadCV: 'Descargar CV'
    },
    about: {
      title: 'Acerca de Mí',
      subtitle: 'Conoce mi trayectoria profesional y habilidades',
      myJourney: 'Mi Trayectoria',
      text1: 'Soy Contador Público con Maestría en Gerencia y Auditoría Tributaria, actualmente cursando 5to semestre de Ingeniería de Software. Mi trayectoria profesional combina más de 8 años de experiencia en el sector contable y financiero con una creciente pasión por el desarrollo de software.',
      text2: 'He trabajado en instituciones como la Universidad de Nariño, Corponariño y actualmente me desempeño como Contador Público en Coopcolon y Docente en la Universidad Autónoma. Paralelamente, desarrollo soluciones tecnológicas que integran mis conocimientos contables con programación, creando herramientas que automatizan y optimizan procesos empresariales.',
      text3: 'Más allá del ámbito profesional, encuentro equilibrio en mis pasiones personales. La música es parte fundamental de mi vida, especialmente el canto, que me permite expresar creatividad de una forma diferente. También soy un apasionado del fútbol, deporte que practico regularmente y que me ha enseñado el valor del trabajo en equipo, la disciplina y la perseverancia, valores que aplico tanto en mi vida personal como profesional.',
      skills: 'Habilidades Técnicas',
      accounting: 'Contabilidad & Finanzas',
      backend: 'Desarrollo Backend',
      frontend: 'Desarrollo Frontend',
      databases: 'Bases de Datos',
      tools: 'Herramientas & Otros'
    },
    projects: {
      title: 'Proyectos Destacados',
      subtitle: 'Soluciones tecnológicas que combinan finanzas y desarrollo',
      production: '✓ En Producción',
      testing: '⚡ En Pruebas',
      project1: {
        title: 'Sistema de Gestión de Parqueaderos',
        description: 'Plataforma completa para administración de parqueaderos con control de ingresos, tarifas y reportes en tiempo real.'
      },
      project2: {
        title: 'Facturación Electrónica Colombia',
        description: 'Sistema de facturación electrónica cumpliendo normativa DIAN, con generación automática de documentos tributarios.'
      },
      project3: {
        title: 'Gestión de Restaurantes',
        description: 'Aplicación para manejo de pedidos, inventario y facturación en restaurantes con interfaz intuitiva.'
      },
      project4: {
        title: 'Control de Inventarios y Ventas',
        description: 'Sistema integral para gestión de inventarios, ventas y reportes financieros con dashboard interactivo.'
      }
    },
    testimonials: {
      title: 'Testimonios',
      subtitle: 'Opiniones de colegas y clientes sobre mi trabajo'
    },
    experience: {
      title: 'Experiencia & Educación',
      subtitle: 'Mi recorrido profesional y académico',
      present: 'Presente',
      all: 'Todos',
      academic: 'Académica',
      professional: 'Profesional'
    },
    contact: {
      title: 'Contacto',
      subtitle: '¿Tienes un proyecto en mente? ¡Hablemos!',
      name: 'Nombre',
      email: 'Email',
      subject: 'Asunto',
      message: 'Mensaje',
      send: 'Enviar Mensaje',
      phone: 'Teléfono',
      location: 'Ubicación'
    },
    footer: {
      rights: 'Todos los derechos reservados',
      description: 'Desarrollador Full Stack y Contador Público especializado en soluciones financieras innovadoras.',
      navigation: 'Navegación',
      resources: 'Recursos',
      legal: 'Legal',
      home: 'Inicio',
      about: 'Acerca de',
      projects: 'Proyectos',
      experience: 'Experiencia',
      blog: 'Blog',
      documentation: 'Documentación',
      tutorials: 'Tutoriales',
      faq: 'FAQ',
      privacy: 'Privacidad',
      terms: 'Términos',
      cookies: 'Cookies'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      testimonials: 'Testimonials',
      experience: 'Experience',
      contact: 'Contact',
      downloadCV: 'Download CV'
    },
    hero: {
      available: 'Available for projects',
      name: 'Elier Fernando',
      lastName: 'Rosero Bravo',
      subtitle: 'Software Engineering Student & Public Accountant',
      description: 'Professional with experience in accounting and finance, currently specializing in software development. I combine financial knowledge with technological skills to create innovative solutions that optimize business processes.',
      yearsExp: 'Years Experience',
      projectsCount: 'Projects',
      organizations: 'Organizations',
      viewProjects: 'View Projects',
      downloadCV: 'Download CV'
    },
    about: {
      title: 'About Me',
      subtitle: 'Learn about my professional journey and skills',
      myJourney: 'My Journey',
      text1: 'I am a Public Accountant with a Master\'s degree in Tax Management and Auditing, currently in my 5th semester of Software Engineering. My professional career combines over 8 years of experience in the accounting and financial sector with a growing passion for software development.',
      text2: 'I have worked in institutions such as Universidad de Nariño, Corponariño, and currently work as a Public Accountant at Coopcolon and Professor at Universidad Autónoma. In parallel, I develop technological solutions that integrate my accounting knowledge with programming, creating tools that automate and optimize business processes.',
      text3: 'Beyond the professional realm, I find balance in my personal passions. Music is a fundamental part of my life, especially singing, which allows me to express creativity in a different way. I am also passionate about soccer, a sport I practice regularly and that has taught me the value of teamwork, discipline, and perseverance, values that I apply in both my personal and professional life.',
      skills: 'Technical Skills',
      accounting: 'Accounting & Finance',
      backend: 'Backend Development',
      frontend: 'Frontend Development',
      databases: 'Databases',
      tools: 'Tools & Others'
    },
    projects: {
      title: 'Featured Projects',
      subtitle: 'Technological solutions combining finance and development',
      production: '✓ In Production',
      testing: '⚡ In Testing',
      project1: {
        title: 'Parking Management System',
        description: 'Complete platform for parking lot administration with income control, rates, and real-time reports.'
      },
      project2: {
        title: 'Electronic Invoicing Colombia',
        description: 'Electronic invoicing system complying with DIAN regulations, with automatic generation of tax documents.'
      },
      project3: {
        title: 'Restaurant Management',
        description: 'Application for managing orders, inventory, and billing in restaurants with an intuitive interface.'
      },
      project4: {
        title: 'Inventory and Sales Control',
        description: 'Comprehensive system for inventory management, sales, and financial reports with interactive dashboard.'
      }
    },
    testimonials: {
      title: 'Testimonials',
      subtitle: 'Opinions from colleagues and clients about my work'
    },
    experience: {
      title: 'Experience & Education',
      subtitle: 'My professional and academic journey',
      present: 'Present',
      all: 'All',
      academic: 'Academic',
      professional: 'Professional'
    },
    contact: {
      title: 'Contact',
      subtitle: 'Have a project in mind? Let\'s talk!',
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      send: 'Send Message',
      phone: 'Phone',
      location: 'Location'
    },
    footer: {
      rights: 'All rights reserved',
      description: 'Full Stack Developer and Public Accountant specialized in innovative financial solutions.',
      navigation: 'Navigation',
      resources: 'Resources',
      legal: 'Legal',
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      experience: 'Experience',
      blog: 'Blog',
      documentation: 'Documentation',
      tutorials: 'Tutorials',
      faq: 'FAQ',
      privacy: 'Privacy',
      terms: 'Terms',
      cookies: 'Cookies'
    }
  }
};
