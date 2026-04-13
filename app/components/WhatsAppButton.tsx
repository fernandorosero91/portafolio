'use client';

import { useState, useEffect } from 'react';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const phoneNumber = '573117098269';
  const message = '¡Hola Fernando! Me gustaría contactarte.';

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar el botón después de hacer scroll de 300px
      // Ocultar cuando llegue a la sección de contacto (para no duplicar)
      const scrollPosition = window.scrollY;
      const contactSection = document.getElementById('contact');
      
      if (contactSection) {
        const contactPosition = contactSection.offsetTop - window.innerHeight;
        
        // Mostrar si: scroll > 300px Y no está en la sección de contacto
        if (scrollPosition > 300 && scrollPosition < contactPosition) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        // Si no encuentra la sección, mostrar después de 300px
        setIsVisible(scrollPosition > 300);
      }
    };

    // Ejecutar al cargar
    handleScroll();

    // Escuchar scroll
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className={`whatsapp-float ${isVisible ? 'show' : ''}`}
      aria-label="Contactar por WhatsApp"
      title="¡Chatea conmigo por WhatsApp!"
    >
      {/* Efecto de pulso */}
      <span className="whatsapp-pulse"></span>
      
      {/* Icono de WhatsApp */}
      <svg viewBox="0 0 32 32" className="whatsapp-svg">
        <path fill="currentColor" d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-5.247 1.408 1.417-5.267-0.315-0.517c-1.318-2.17-2.011-4.652-2.011-7.262 0-7.44 6.060-13.5 13.5-13.5s13.5 6.060 13.5 13.5-6.060 13.5-13.5 13.5zM21.803 18.142c-0.397-0.197-2.348-1.158-2.713-1.29-0.365-0.132-0.63-0.197-0.895 0.197s-1.027 1.29-1.26 1.555-0.463 0.295-0.86 0.098-1.675-0.618-3.19-1.968c-1.18-1.050-1.977-2.348-2.21-2.745s-0.025-0.607 0.173-0.803c0.177-0.177 0.397-0.463 0.595-0.693 0.198-0.232 0.265-0.397 0.397-0.662s0.067-0.495-0.033-0.693c-0.1-0.198-0.895-2.155-1.227-2.948-0.323-0.773-0.65-0.668-0.895-0.68-0.232-0.012-0.497-0.015-0.762-0.015s-0.695 0.098-1.060 0.495c-0.365 0.397-1.393 1.36-1.393 3.318s1.425 3.85 1.623 4.115c0.198 0.265 2.795 4.267 6.773 5.983 0.947 0.408 1.687 0.652 2.263 0.835 0.952 0.302 1.817 0.26 2.502 0.157 0.763-0.113 2.348-0.96 2.68-1.887s0.332-1.723 0.232-1.887c-0.1-0.165-0.365-0.265-0.762-0.463z"/>
      </svg>
      
      {/* Tooltip */}
      <span className="whatsapp-tooltip">¡Chatea conmigo!</span>
    </button>
  );
}
