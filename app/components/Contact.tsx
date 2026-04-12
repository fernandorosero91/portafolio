'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';

// Esquema de validación con Zod
const contactSchema = z.object({
  name: z.string()
    .min(1, 'El nombre es requerido')
    .transform(val => val.trim()) // Eliminar espacios al inicio y final
    .refine(val => val.length >= 2, 'El nombre debe tener al menos 2 caracteres')
    .refine(val => val.length <= 50, 'El nombre no puede exceder 50 caracteres')
    .refine(val => /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(val), 'El nombre solo puede contener letras')
    .refine(val => !/^\s+$/.test(val), 'El nombre no puede contener solo espacios')
    .refine(val => !/\s{2,}/.test(val), 'El nombre no puede contener espacios múltiples'),
  email: z.string()
    .min(1, 'El email es requerido')
    .transform(val => val.trim().toLowerCase()) // Normalizar email
    .refine(val => val.length >= 5, 'El email debe tener al menos 5 caracteres')
    .refine(val => val.length <= 100, 'El email no puede exceder 100 caracteres')
    .refine(val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), 'Email inválido')
    .refine(val => !/\s/.test(val), 'El email no puede contener espacios'),
  subject: z.string()
    .min(1, 'El asunto es requerido')
    .transform(val => val.trim())
    .refine(val => val.length >= 3, 'El asunto debe tener al menos 3 caracteres')
    .refine(val => val.length <= 100, 'El asunto no puede exceder 100 caracteres')
    .refine(val => !/^\s+$/.test(val), 'El asunto no puede contener solo espacios')
    .refine(val => /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s\-.,;:¿?¡!()]+$/.test(val), 'El asunto contiene caracteres no permitidos'),
  message: z.string()
    .min(1, 'El mensaje es requerido')
    .transform(val => val.trim())
    .refine(val => val.length >= 10, 'El mensaje debe tener al menos 10 caracteres')
    .refine(val => val.length <= 1000, 'El mensaje no puede exceder 1000 caracteres')
    .refine(val => !/^\s+$/.test(val), 'El mensaje no puede contener solo espacios')
    .refine(val => /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s\-.,;:¿?¡!()\n\r@#$%&*+=/"']+$/.test(val), 'El mensaje contiene caracteres no permitidos'),
  honeypot: z.string().max(0, 'Bot detectado') // Campo honeypot para detectar bots
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { t } = useLanguage();
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: infoRef, isVisible: infoVisible } = useScrollReveal({ threshold: 0.1, delay: 200 });
  const { ref: formRef, isVisible: formVisible } = useScrollReveal({ threshold: 0.1, delay: 400 });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [startTime, setStartTime] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      honeypot: '' // Campo oculto para detectar bots
    },
    mode: 'onBlur' // Validar al perder el foco
  });

  // Función para sanitizar inputs en tiempo real
  const sanitizeInput = (value: string, type: 'name' | 'email' | 'subject' | 'message') => {
    let sanitized = value;

    switch (type) {
      case 'name':
        // Solo letras y espacios simples
        sanitized = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '');
        // Reemplazar múltiples espacios por uno solo
        sanitized = sanitized.replace(/\s{2,}/g, ' ');
        break;
      
      case 'email':
        // Remover espacios y caracteres no permitidos en emails
        sanitized = value.replace(/\s/g, '').toLowerCase();
        break;
      
      case 'subject':
        // Permitir letras, números y puntuación básica
        sanitized = value.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s\-.,;:¿?¡!()]/g, '');
        break;
      
      case 'message':
        // Permitir más caracteres en el mensaje
        sanitized = value.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s\-.,;:¿?¡!()\n\r@#$%&*+=/"']/g, '');
        break;
    }

    return sanitized;
  };

  // Registrar tiempo de carga del formulario (protección anti-bot)
  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    // Protección 1: Verificar tiempo mínimo de llenado (bots llenan formularios muy rápido)
    const timeSpent = Date.now() - startTime;
    if (timeSpent < 3000) { // Menos de 3 segundos es sospechoso
      setSubmitStatus('error');
      setSubmitMessage('Por favor, tómate tu tiempo para llenar el formulario.');
      return;
    }

    // Protección 2: Verificar honeypot
    if (data.honeypot) {
      setSubmitStatus('error');
      setSubmitMessage('Envío no permitido.');
      return;
    }

    // Protección 3: Validar que los campos no estén vacíos después del trim
    if (!data.name.trim() || !data.email.trim() || !data.subject.trim() || !data.message.trim()) {
      setSubmitStatus('error');
      setSubmitMessage('Por favor, completa todos los campos correctamente.');
      return;
    }

    // Protección 4: Validar longitud mínima después del trim
    if (data.name.trim().length < 2) {
      setSubmitStatus('error');
      setSubmitMessage('El nombre debe tener al menos 2 caracteres.');
      return;
    }

    if (data.message.trim().length < 10) {
      setSubmitStatus('error');
      setSubmitMessage('El mensaje debe tener al menos 10 caracteres.');
      return;
    }

    // Protección 5: Detectar spam patterns
    const spamPatterns = [
      /viagra/i,
      /casino/i,
      /lottery/i,
      /click here/i,
      /buy now/i,
      /(http|https):\/\/.*\.(ru|cn)/i, // URLs sospechosas
      /\$\$\$/,
      /!!!{3,}/
    ];

    const fullText = `${data.name} ${data.email} ${data.subject} ${data.message}`;
    if (spamPatterns.some(pattern => pattern.test(fullText))) {
      setSubmitStatus('error');
      setSubmitMessage('El mensaje contiene contenido no permitido.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Preparar los datos para enviar
      const emailData = {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        subject: data.subject.trim(),
        message: data.message.trim(),
        timestamp: new Date().toLocaleString('es-CO', { 
          timeZone: 'America/Bogota',
          dateStyle: 'full',
          timeStyle: 'short'
        })
      };

      // Enviar a la API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al enviar el mensaje');
      }

      console.log('Email enviado exitosamente:', result);

      setSubmitStatus('success');
      setSubmitMessage('¡Mensaje enviado exitosamente! Recibirás una confirmación en tu email.');
      reset();
      
      // Limpiar mensaje después de 5 segundos
      setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 5000);

    } catch (error: any) {
      console.error('Error al enviar el email:', error);
      
      let errorMessage = 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.';
      
      if (error.message) {
        errorMessage = error.message;
      }
      
      setSubmitStatus('error');
      setSubmitMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="section-container">
        <div ref={headerRef} className={`section-header scroll-reveal ${headerVisible ? 'visible' : ''}`} style={{ marginBottom: '3rem' }}>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="section-subtitle">{t('contact.subtitle')}</p>
        </div>
        
        <div className="contact-grid">
          {/* INFORMACIÓN DE CONTACTO - IZQUIERDA */}
          <div ref={infoRef} className={`contact-info scroll-reveal-left ${infoVisible ? 'visible' : ''}`}>
            <div className="contact-item">
              <div className="contact-icon">@</div>
              <div className="contact-details">
                <h4>{t('contact.email')}</h4>
                <p>ferrosero@gmail.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">☎</div>
              <div className="contact-details">
                <h4>{t('contact.phone')}</h4>
                <p>+57 (311) 709-8269</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">⌘</div>
              <div className="contact-details">
                <h4>{t('contact.location')}</h4>
                <p>Pasto, Nariño - Colombia</p>
              </div>
            </div>
            
            <div className="social-links">
              <a href="#" className="social-link" aria-label="GitHub">💻</a>
              <a href="#" className="social-link" aria-label="LinkedIn">💼</a>
              <a href="#" className="social-link" aria-label="Twitter">🐦</a>
            </div>
          </div>

          {/* FORMULARIO - DERECHA */}
          <div ref={formRef} className={`scroll-reveal-right ${formVisible ? 'visible' : ''}`}>
            <form onSubmit={handleSubmit(onSubmit)} className="contact-form" noValidate>
              {/* Campo Honeypot (oculto para humanos, visible para bots) */}
              <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
                <label htmlFor="honeypot">No llenar este campo</label>
                <input
                  type="text"
                  id="honeypot"
                  {...register('honeypot')}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">{t('contact.name')} *</label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className={errors.name ? 'error' : ''}
                  placeholder="Juan Pérez"
                  disabled={isSubmitting}
                  onChange={(e) => {
                    const sanitized = sanitizeInput(e.target.value, 'name');
                    setValue('name', sanitized, { shouldValidate: false });
                  }}
                  maxLength={50}
                />
                {errors.name && (
                  <span className="error-message">{errors.name.message}</span>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">{t('contact.email')} *</label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className={errors.email ? 'error' : ''}
                  placeholder="juan@ejemplo.com"
                  disabled={isSubmitting}
                  onChange={(e) => {
                    const sanitized = sanitizeInput(e.target.value, 'email');
                    setValue('email', sanitized, { shouldValidate: false });
                  }}
                  maxLength={100}
                />
                {errors.email && (
                  <span className="error-message">{errors.email.message}</span>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">{t('contact.subject')} *</label>
                <input
                  type="text"
                  id="subject"
                  {...register('subject')}
                  className={errors.subject ? 'error' : ''}
                  placeholder="Consulta sobre proyecto"
                  disabled={isSubmitting}
                  onChange={(e) => {
                    const sanitized = sanitizeInput(e.target.value, 'subject');
                    setValue('subject', sanitized, { shouldValidate: false });
                  }}
                  maxLength={100}
                />
                {errors.subject && (
                  <span className="error-message">{errors.subject.message}</span>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="message">{t('contact.message')} *</label>
                <textarea
                  id="message"
                  {...register('message')}
                  className={errors.message ? 'error' : ''}
                  placeholder="Escribe tu mensaje aquí..."
                  disabled={isSubmitting}
                  onChange={(e) => {
                    const sanitized = sanitizeInput(e.target.value, 'message');
                    setValue('message', sanitized, { shouldValidate: false });
                  }}
                  rows={5}
                  maxLength={1000}
                />
                {errors.message && (
                  <span className="error-message">{errors.message.message}</span>
                )}
                <div className="char-counter">
                  {watch('message')?.length || 0} / 1000
                </div>
              </div>

              {/* Mensaje de estado */}
              {submitStatus !== 'idle' && (
                <div className={`submit-message ${submitStatus}`}>
                  {submitMessage}
                </div>
              )}
              
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : t('contact.send')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
