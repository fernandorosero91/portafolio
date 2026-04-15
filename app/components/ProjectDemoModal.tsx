'use client';

import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  project: {
    titleKey: string;
    descriptionKey: string;
    demoUrl: string | null;
    image: string;
    credentials?: { email: string; password: string };
    features: string[];
  };
}

export default function ProjectDemoModal({ isOpen, onClose, project }: Props) {
  const { t } = useLanguage();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 lg:p-8 backdrop-blur-xl animate-[fadeIn_0.3s]" style={{ backgroundColor: 'var(--modal-bg)' }} onClick={onClose}>
      <div className="rounded-3xl max-w-[880px] w-full max-h-[90vh] overflow-hidden relative animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] shadow-2xl flex flex-col border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }} onClick={e => e.stopPropagation()}>
        {/* Close */}
        <button onClick={onClose} className="absolute top-5 right-5 w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-300 z-10 hover:rotate-90" style={{ backgroundColor: 'rgba(74,111,168,0.1)', borderColor: 'rgba(74,111,168,0.2)', color: 'var(--text-secondary)' }} aria-label="Cerrar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-5 border-b shrink-0" style={{ borderColor: 'rgba(74,111,168,0.15)' }}>
          <h2 className="text-xl lg:text-2xl font-extrabold leading-tight mb-1" style={{ color: 'var(--text-primary)' }}>{t(`projects.${project.titleKey}`)}</h2>
          <p className="text-sm font-semibold flex items-center gap-2" style={{ color: 'var(--accent-teal)' }}>
            <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-[pulse_2s_infinite]" />
            {t('projects.demoPreview')}
          </p>
        </div>

        {/* Body */}
        <div className="px-8 py-6 overflow-y-auto flex-1 space-y-7">
          <div className="rounded-xl overflow-hidden border shadow-md" style={{ borderColor: 'rgba(74,111,168,0.2)' }}>
            <img src={project.image} alt="" className="w-full h-auto block" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>

          <div>
            <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{t('projects.aboutProject')}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t(`projects.${project.descriptionKey}`)}</p>
          </div>

          {project.credentials && (
            <div>
              <h3 className="text-base font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{t('projects.testCredentials')}</h3>
              <div className="grid gap-3">
                {[{ l: t('projects.email'), v: project.credentials.email }, { l: t('projects.password'), v: project.credentials.password }].map(c => (
                  <div key={c.l} className="flex items-center justify-between p-3 rounded-xl border" style={{ backgroundColor: 'rgba(74,111,168,0.06)', borderColor: 'rgba(74,111,168,0.15)' }}>
                    <div>
                      <span className="text-xs font-semibold block mb-0.5" style={{ color: 'var(--text-tertiary)' }}>{c.l}</span>
                      <code className="text-sm font-mono" style={{ color: 'var(--accent-teal)' }}>{c.v}</code>
                    </div>
                    <button onClick={() => navigator.clipboard.writeText(c.v)} className="p-1.5 rounded-lg border transition-all duration-200 hover:bg-[rgba(74,111,168,0.1)]" style={{ borderColor: 'rgba(74,111,168,0.2)', color: 'var(--text-secondary)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-base font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{t('projects.keyFeatures')}</h3>
            <ul className="space-y-2">
              {project.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm p-2.5 rounded-lg border transition-colors duration-200 hover:bg-[rgba(74,111,168,0.05)]" style={{ color: 'var(--text-secondary)', borderColor: 'rgba(74,111,168,0.08)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" strokeWidth="2" className="shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t flex justify-end gap-3 shrink-0 max-md:flex-col" style={{ borderColor: 'rgba(74,111,168,0.15)' }}>
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 max-md:w-full" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)', backgroundColor: 'transparent' }}>{t('projects.cancel')}</button>
          {project.demoUrl && (
            <button onClick={() => { window.open(project.demoUrl!, '_blank'); onClose(); }} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg max-md:w-full" style={{ backgroundColor: 'var(--primary-blue)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              {t('projects.visitDemo')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
