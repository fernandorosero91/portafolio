'use client';

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">● Disponible para proyectos</div>
          <h1>
            <span className="name-first">Elier Fernando</span><br />
            <span className="name-last">Rosero Bravo</span>
          </h1>
          <p className="hero-subtitle">Estudiante de Ingeniería de Software & Contador Público</p>
          <p className="hero-description">
            Profesional con experiencia en contabilidad y finanzas, actualmente especializándome en desarrollo de software. Combino conocimientos financieros con habilidades tecnológicas para crear soluciones innovadoras que optimizan procesos empresariales.
          </p>
          
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">8+</span>
              <span className="stat-label">Años Experiencia</span>
            </div>
            <div className="stat">
              <span className="stat-value">5+</span>
              <span className="stat-label">Proyectos</span>
            </div>
            <div className="stat">
              <span className="stat-value">7+</span>
              <span className="stat-label">Organizaciones</span>
            </div>
          </div>
          
          <div className="hero-buttons">
            <button className="btn btn-primary">Ver Proyectos</button>
            <button className="btn btn-secondary">↓ Descargar CV</button>
          </div>
        </div>
        
        <div className="hero-avatar">
          <div className="avatar-box">
            <div className="avatar-placeholder">👤</div>
          </div>
        </div>
      </div>
    </section>
  );
}
