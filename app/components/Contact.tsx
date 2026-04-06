'use client';

import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Contact() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: formRef, isVisible: formVisible } = useScrollReveal({ delay: 200 });
  const { ref: infoRef, isVisible: infoVisible } = useScrollReveal({ delay: 400 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Mensaje enviado! Gracias por contactarme.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="contact" id="contact">
      <div className="section-container">
        <div ref={headerRef} className={`section-header scroll-reveal ${headerVisible ? 'visible' : ''}`} style={{ marginBottom: '3rem' }}>
          <h2 className="section-title">Contacto</h2>
          <p className="section-subtitle">¿Tienes un proyecto en mente? Hablemos</p>
        </div>
        
        <div className="contact-grid">
          <form ref={formRef} onSubmit={handleSubmit} className={`contact-form scroll-reveal-left ${formVisible ? 'visible' : ''}`}>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Asunto</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Enviar Mensaje
            </button>
          </form>
          
          <div ref={infoRef} className={`contact-info scroll-reveal-right ${infoVisible ? 'visible' : ''}`}>
            <div className="contact-item">
              <div className="contact-icon">@</div>
              <div className="contact-details">
                <h4>Email</h4>
                <p>elier.rosero@example.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">☎</div>
              <div className="contact-details">
                <h4>Teléfono</h4>
                <p>+57 (310) 123-4567</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">⌘</div>
              <div className="contact-details">
                <h4>Ubicación</h4>
                <p>Pasto, Nariño - Colombia</p>
              </div>
            </div>
            
            <div className="social-links">
              <a href="#" className="social-link">💻</a>
              <a href="#" className="social-link">💼</a>
              <a href="#" className="social-link">🐦</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
