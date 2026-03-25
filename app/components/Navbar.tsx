'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to 'light'
    const currentTheme = (localStorage.getItem('theme') || 'light') as 'light' | 'dark';
    setTheme(currentTheme);
    if (currentTheme === 'light') {
      document.documentElement.classList.add('light-mode');
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('light-mode');
    const isLightMode = document.documentElement.classList.contains('light-mode');
    const newTheme = isLightMode ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#about', label: 'Acerca de' },
    { href: '#projects', label: 'Proyectos' },
    { href: '#testimonials', label: 'Testimonios' },
    { href: '#experience', label: 'Experiencia' },
    { href: '#contact', label: 'Contacto' },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <a href="#" className="navbar-logo">FR</a>
          
          {/* Desktop Navigation */}
          <ul className="navbar-nav">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          
          {/* Desktop Actions */}
          <div className="navbar-actions">
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'light' ? '☀' : '☾'}
            </button>
            <button className="cv-button">Descargar CV</button>
            
            {/* Mobile Hamburger */}
            <button 
              className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={closeMobileMenu}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
