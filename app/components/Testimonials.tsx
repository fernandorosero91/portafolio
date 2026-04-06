'use client';

import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';
import { testimonialsData } from '../data/testimonials';

export default function Testimonials() {
  const { t, language } = useLanguage();
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: featuredRef, isVisible: featuredVisible } = useScrollReveal({ threshold: 0.1, delay: 200 });

  const featuredTestimonial = testimonialsData[language].featured;
  const testimonials = testimonialsData[language].testimonials;

  return (
    <section className="testimonials" id="testimonials">
      <div className="section-container">
        <div ref={headerRef} className={`section-header scroll-reveal ${headerVisible ? 'visible' : ''}`}>
          <h2 className="section-title">{t('testimonials.title')}</h2>
          <p className="section-subtitle">{t('testimonials.subtitle')}</p>
        </div>

        <div ref={featuredRef} className={`featured-testimonial scroll-reveal-scale ${featuredVisible ? 'visible' : ''}`}>
          <div className="featured-quote">
            "{featuredTestimonial.text}"
          </div>
          <div className="featured-author">
            <div className="author-avatar">{featuredTestimonial.avatar}</div>
            <div className="author-info">
              <h4>{featuredTestimonial.name}</h4>
              <p className="author-title">{featuredTestimonial.role}</p>
            </div>
          </div>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <span key={i} className="star">⭐</span>
                ))}
              </div>
              <p className="testimonial-text">
                "{testimonial.text}"
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{testimonial.avatar}</div>
                <span className="testimonial-author-name">{testimonial.name} - {testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
