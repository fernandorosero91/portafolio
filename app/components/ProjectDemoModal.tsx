'use client';

import { useLanguage } from '../contexts/LanguageContext';

interface ProjectDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    titleKey: string;
    descriptionKey: string;
    demoUrl: string;
    image: string;
    credentials?: {
      email: string;
      password: string;
    };
    features: string[];
  };
}

export default function ProjectDemoModal({ isOpen, onClose, project }: ProjectDemoModalProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const handleVisitDemo = () => {
    window.open(project.demoUrl, '_blank');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="modal-header">
          <h2 className="modal-title">{t(`projects.${project.titleKey}`)}</h2>
          <p className="modal-subtitle">{t('projects.demoPreview')}</p>
        </div>

        <div className="modal-body">
          {/* Imagen primero en móviles */}
          <div className="modal-image">
            <img 
              src={project.image} 
              alt={t(`projects.${project.titleKey}`)}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = '<div class="image-placeholder"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg><p>Imagen no disponible</p></div>';
                }
              }}
            />
          </div>

          <div className="modal-description">
            <h3>{t('projects.aboutProject')}</h3>
            <p>{t(`projects.${project.descriptionKey}`)}</p>
          </div>

          {project.credentials && (
            <div className="modal-credentials">
              <h3>{t('projects.testCredentials')}</h3>
              <div className="credentials-grid">
                <div className="credential-item">
                  <label>{t('projects.email')}:</label>
                  <div className="credential-value">
                    <code>{project.credentials.email}</code>
                    <button 
                      className="btn-copy"
                      onClick={() => navigator.clipboard.writeText(project.credentials!.email)}
                      aria-label="Copiar email"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="credential-item">
                  <label>{t('projects.password')}:</label>
                  <div className="credential-value">
                    <code>{project.credentials.password}</code>
                    <button 
                      className="btn-copy"
                      onClick={() => navigator.clipboard.writeText(project.credentials!.password)}
                      aria-label="Copiar contraseña"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="modal-features">
            <h3>{t('projects.keyFeatures')}</h3>
            <ul>
              {project.features.map((feature, index) => (
                <li key={index}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary-modal" onClick={onClose}>
            {t('projects.cancel')}
          </button>
          {project.demoUrl && (
            <button className="btn-primary-modal" onClick={handleVisitDemo}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              {t('projects.visitDemo')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
