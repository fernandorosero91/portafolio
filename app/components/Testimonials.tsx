'use client';

export default function Testimonials() {
  const featuredTestimonial = {
    name: 'Fredy Urbano',
    role: 'Gerente @ Coopcolon',
    avatar: 'FU',
    text: 'Elier Fernando es un profesional excepcional que combina conocimientos contables profundos con habilidades tecnológicas. Su capacidad para entender procesos financieros y traducirlos en soluciones de software es invaluable.'
  };

  const testimonials = [
    {
      name: 'Maria Yadir Palacios',
      role: 'Directora Programa Contaduría Pública AUNAR',
      avatar: 'MY',
      text: 'Excelente docente y profesional. Su experiencia práctica enriquece las clases y motiva a los estudiantes a aplicar conocimientos en proyectos reales.',
      stars: 5
    },
    {
      name: 'German Carlosama',
      role: 'Director Financiero Asociación IntyQuilla',
      avatar: 'GC',
      text: 'Su comprensión de normativas tributarias y capacidad para automatizar procesos contables ha mejorado significativamente nuestra eficiencia operativa.',
      stars: 5
    },
    {
      name: 'Clara Milena',
      role: 'Propietaria El Pan de Bono',
      avatar: 'CM',
      text: 'Profesional comprometido y responsable. Sus soluciones tecnológicas han transformado la manera en que gestionamos nuestros procesos financieros.',
      stars: 5
    },
  ];

  return (
    <section className="testimonials" id="testimonials">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Testimonios</h2>
          <p className="section-subtitle">Opiniones de colegas y clientes sobre mi trabajo</p>
        </div>

        <div className="featured-testimonial">
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
