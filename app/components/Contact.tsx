'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';

/* ── Security helpers ── */
const SQL_PATTERNS = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|EXEC|EXECUTE|TRUNCATE|DECLARE|CAST|CONVERT|xp_)\b|--|;|\*|\/\*|\*\/|'|"|\\)/i;
const XSS_PATTERNS = /<[^>]*>|javascript:|on\w+\s*=|eval\s*\(|document\.|window\.|alert\s*\(/i;
const SPAM_PATTERNS = /(viagra|casino|lottery|crypto|bitcoin|click here|free money|make money|buy now|limited offer)/i;

function sanitize(val: string): string {
  return val
    .replace(/[<>]/g, '')           // Strip HTML brackets
    .replace(/&/g, '&amp;')         // Encode ampersand
    .replace(/"/g, '&quot;')        // Encode quotes
    .replace(/'/g, '&#x27;')        // Encode single quotes
    .replace(/\//g, '&#x2F;')       // Encode forward slash
    .replace(/\s{2,}/g, ' ')        // Collapse multiple spaces
    .trim();
}

function noInjection(val: string, ctx: z.RefinementCtx) {
  if (SQL_PATTERNS.test(val)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Contenido no permitido detectado' });
  }
  if (XSS_PATTERNS.test(val)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Contenido no permitido detectado' });
  }
  if (SPAM_PATTERNS.test(val)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Contenido detectado como spam' });
  }
}

/* ── Schema ── */
const schema = z.object({
  name: z.string()
    .transform(v => v.trim())
    .refine(v => v.length >= 2, 'Mínimo 2 caracteres')
    .refine(v => v.length <= 50, 'Máximo 50 caracteres')
    .refine(v => !/^\s*$/.test(v), 'No puede estar vacío')
    .refine(v => /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(v), 'Solo letras y espacios')
    .transform(sanitize)
    .superRefine(noInjection),

  email: z.string()
    .transform(v => v.trim().toLowerCase())
    .refine(v => v.length >= 5, 'Email muy corto')
    .refine(v => v.length <= 100, 'Máximo 100 caracteres')
    .refine(v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Email inválido')
    .refine(v => !/\s/.test(v), 'Sin espacios')
    .superRefine(noInjection),

  subject: z.string()
    .transform(v => v.trim())
    .refine(v => v.length >= 3, 'Mínimo 3 caracteres')
    .refine(v => v.length <= 100, 'Máximo 100 caracteres')
    .refine(v => !/^\s*$/.test(v), 'No puede estar vacío')
    .refine(v => /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s\-.,;:¿?¡!()]+$/.test(v), 'Caracteres no permitidos')
    .transform(sanitize)
    .superRefine(noInjection),

  message: z.string()
    .transform(v => v.trim())
    .refine(v => v.length >= 10, 'Mínimo 10 caracteres')
    .refine(v => v.length <= 1000, 'Máximo 1000 caracteres')
    .refine(v => !/^\s*$/.test(v), 'No puede estar vacío')
    .transform(sanitize)
    .superRefine(noInjection),

  honeypot: z.string().max(0, 'Bot detectado'),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const { t } = useLanguage();
  const { ref: hRef, isVisible: hv } = useScrollReveal();
  const { ref: iRef, isVisible: iv } = useScrollReveal({ threshold: 0.1, delay: 200 });
  const { ref: fRef, isVisible: fv } = useScrollReveal({ threshold: 0.1, delay: 400 });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');
  const [start, setStart] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { honeypot: '' },
    mode: 'onBlur',
  });

  const messageVal = watch('message');
  useEffect(() => { setCharCount((messageVal || '').length); }, [messageVal]);
  useEffect(() => { setStart(Date.now()); }, []);

  /* ── Sanitize on paste ── */
  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const pasted = e.clipboardData.getData('text');
    if (SQL_PATTERNS.test(pasted) || XSS_PATTERNS.test(pasted)) {
      e.preventDefault();
    }
  }, []);

  /* ── Block leading spaces ── */
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    // Block space at start
    if (e.key === ' ' && target.value.length === 0) {
      e.preventDefault();
    }
    // Block multiple consecutive spaces
    if (e.key === ' ' && target.value.endsWith(' ')) {
      e.preventDefault();
    }
  }, []);

  const onSubmit = async (data: FormData) => {
    // Anti-bot: minimum 3 seconds
    if (Date.now() - start < 3000) {
      setStatus('error');
      setMsg('Por favor, tómate un momento antes de enviar.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
      });
      const json = await res.json();
      if (res.ok) {
        setStatus('success');
        setMsg(json.message || '¡Mensaje enviado correctamente!');
        reset();
        setCharCount(0);
      } else {
        setStatus('error');
        setMsg(json.error || 'Error al enviar el mensaje.');
      }
    } catch {
      setStatus('error');
      setMsg('Error de conexión. Intenta de nuevo.');
    } finally {
      setSubmitting(false);
      setTimeout(() => { setStatus('idle'); setMsg(''); }, 5000);
    }
  };

  const inputCls = (hasErr: boolean) =>
    `w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 border ${
      hasErr
        ? 'border-red-500 animate-[shake_0.4s]'
        : 'hover:border-[var(--primary-blue)] focus:border-[var(--primary-blue)] focus:shadow-[0_0_0_3px_rgba(74,111,168,0.1)]'
    }`;

  return (
    <section id="contact" className="scroll-mt-20 py-20 px-6 lg:px-8" style={{ background: 'linear-gradient(135deg, var(--hero-from), var(--hero-to))' }}>
      <div className="max-w-7xl mx-auto">
        <div ref={hRef} className={`text-center mb-14 scroll-reveal ${hv ? 'visible' : ''}`}>
          <h2 className="text-4xl lg:text-5xl font-bold font-[Cormorant_Garamond,serif] mb-3" style={{ color: 'var(--text-primary)' }}>{t('contact.title')}</h2>
          <p className="text-base" style={{ color: 'var(--text-tertiary)' }}>{t('contact.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Info */}
          <div ref={iRef} className={`space-y-4 scroll-reveal ${iv ? 'visible' : ''}`}>
            {[
              { icon: 'mail', title: t('contact.email'), val: 'ferrosero@gmail.com' },
              { icon: 'phone', title: t('contact.phone'), val: '+57 (311) 709-8269' },
              { icon: 'pin', title: t('contact.location'), val: 'Pasto, Nariño - Colombia' },
            ].map(item => (
              <div key={item.title} className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:translate-x-1 group" style={{ backgroundColor: 'rgba(74,111,168,0.04)', borderColor: 'var(--border-color)' }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105" style={{ backgroundColor: 'rgba(74,111,168,0.1)', color: 'var(--primary-blue)' }}>
                  {item.icon === 'mail' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>}
                  {item.icon === 'phone' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>}
                  {item.icon === 'pin' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>}
                </div>
                <div>
                  <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{item.title}</h4>
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{item.val}</p>
                </div>
              </div>
            ))}
            <div className="flex gap-3 pt-4">
              {[
                { href: 'https://www.linkedin.com/in/elier-fernando-rosero-bravo-220858248/', bg: '#0A66C2', d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                { href: 'https://github.com/fernandorosero91', bg: '#181717', d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
              ].map(s => (
                <a key={s.bg} href={s.href} target="_blank" rel="noopener noreferrer" className="btn-social w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: s.bg }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d={s.d} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div ref={fRef} className={`scroll-reveal ${fv ? 'visible' : ''}`}>
            {status !== 'idle' && (
              <div className={`p-4 rounded-xl mb-5 text-sm font-medium flex items-center gap-3 animate-[slideDown_0.3s] border ${status === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' : 'bg-red-500/10 border-red-500/30 text-red-500'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white ${status === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>{status === 'success' ? '✓' : '✕'}</span>
                {msg}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-7 rounded-2xl border" style={{ backgroundColor: 'rgba(74,111,168,0.03)', borderColor: 'var(--border-color)' }} autoComplete="off">
              {/* Honeypot */}
              <input type="text" {...register('honeypot')} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>{t('contact.name')}</label>
                <input
                  type="text"
                  {...register('name')}
                  maxLength={50}
                  onKeyDown={handleKeyDown}
                  onPaste={handlePaste}
                  className={inputCls(!!errors.name)}
                  style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--text-primary)', borderColor: errors.name ? undefined : 'var(--border-color)' }}
                  placeholder="Tu nombre completo"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1 animate-[slideDown_0.3s]">⚠ {errors.name.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>{t('contact.email')}</label>
                <input
                  type="email"
                  {...register('email')}
                  maxLength={100}
                  onKeyDown={e => { if (e.key === ' ') e.preventDefault(); }}
                  onPaste={handlePaste}
                  className={inputCls(!!errors.email)}
                  style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--text-primary)', borderColor: errors.email ? undefined : 'var(--border-color)' }}
                  placeholder="tu@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 animate-[slideDown_0.3s]">⚠ {errors.email.message}</p>}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>{t('contact.subject')}</label>
                <input
                  type="text"
                  {...register('subject')}
                  maxLength={100}
                  onKeyDown={handleKeyDown}
                  onPaste={handlePaste}
                  className={inputCls(!!errors.subject)}
                  style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--text-primary)', borderColor: errors.subject ? undefined : 'var(--border-color)' }}
                  placeholder="Asunto del mensaje"
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1 animate-[slideDown_0.3s]">⚠ {errors.subject.message}</p>}
              </div>

              {/* Message */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{t('contact.message')}</label>
                  <span className={`text-xs font-medium ${charCount > 900 ? 'text-red-500' : charCount > 700 ? 'text-amber-500' : ''}`} style={charCount <= 700 ? { color: 'var(--text-tertiary)' } : {}}>
                    {charCount}/1000
                  </span>
                </div>
                <textarea
                  {...register('message')}
                  rows={5}
                  maxLength={1000}
                  onKeyDown={handleKeyDown}
                  onPaste={handlePaste}
                  className={`${inputCls(!!errors.message)} resize-y min-h-[120px] max-h-[300px]`}
                  style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--text-primary)', borderColor: errors.message ? undefined : 'var(--border-color)' }}
                  placeholder="Escribe tu mensaje aquí..."
                />
                {errors.message && <p className="text-red-500 text-xs mt-1 animate-[slideDown_0.3s]">⚠ {errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-filled w-full py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60 disabled:hover:translate-y-0"
                style={{ backgroundColor: 'var(--primary-blue)' }}
              >
                {submitting ? `${t('contact.send')}...` : t('contact.send')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
