'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Navegación: [
      { label: 'Inicio', href: '#inicio' },
      { label: 'Acerca de', href: '#about' },
      { label: 'Proyectos', href: '#projects' },
      { label: 'Experiencia', href: '#experience' },
    ],
    Recursos: [
      { label: 'Blog', href: '#blog' },
      { label: 'Documentación', href: '#docs' },
      { label: 'Tutoriales', href: '#tutorials' },
      { label: 'FAQ', href: '#faq' },
    ],
    Legal: [
      { label: 'Privacidad', href: '#privacy' },
      { label: 'Términos', href: '#terms' },
      { label: 'Cookies', href: '#cookies' },
    ],
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <a href="#" className="navbar-logo" style={{ fontSize: '1.5rem', marginBottom: '1rem', display: 'block' }}>
            FR
          </a>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Desarrollador Full Stack y Contador Público especializado en soluciones financieras innovadoras.
          </p>
        </div>
        
        {Object.entries(footerLinks).map(([key, links]) => (
          <div key={key} className="footer-section">
            <h4>{key}</h4>
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="footer-bottom">
        <p>© {currentYear} Fernando Rosero. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
