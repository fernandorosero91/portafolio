'use client';

import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  const { ref: headerRef, isVisible: hv } = useScrollReveal();
  const { ref: contentRef, isVisible: cv } = useScrollReveal({ threshold: 0.1, delay: 200 });
  const { ref: skillsRef, isVisible: sv } = useScrollReveal({ threshold: 0.1, delay: 400 });

  const categories = [
    { key: 'backend', skills: [
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
    ]},
    { key: 'frontend', skills: [
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    ]},
    { key: 'databases', skills: [
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'SQL Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg' },
    ]},
    { key: 'tools', skills: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'Cloud', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'API REST', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
    ]},
    { key: 'accounting', skills: [
      { name: 'NIIF', icon: '📊' },
      { name: 'Auditoría', icon: '🔍' },
      { name: 'Finanzas', icon: '💼' },
      { name: 'Tributaria', icon: '📈' },
    ]},
  ];

  return (
    <section id="about" className="scroll-mt-20 py-20 px-6 lg:px-8" style={{ backgroundColor: 'var(--bg-dark)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className={`text-center mb-14 scroll-reveal ${hv ? 'visible' : ''}`}>
          <h2 className="text-4xl lg:text-5xl font-bold font-[Cormorant_Garamond,serif] mb-3" style={{ color: 'var(--text-primary)' }}>{t('about.title')}</h2>
          <p className="text-base" style={{ color: 'var(--text-tertiary)' }}>{t('about.subtitle')}</p>
        </div>

        {/* Bio */}
        <div ref={contentRef} className={`mb-16 scroll-reveal ${cv ? 'visible' : ''}`}>
          <h3 className="text-2xl font-bold text-center mb-8" style={{ color: 'var(--text-primary)' }}>{t('about.myJourney')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[t('about.text1'), t('about.text2'), t('about.text3')].map((text, i) => (
              <p key={i} className="text-base leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>{text}</p>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div ref={skillsRef} className={`scroll-reveal ${sv ? 'visible' : ''}`}>
          <h3 className="text-2xl font-bold text-center mb-10" style={{ color: 'var(--text-primary)' }}>{t('about.skills')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(cat => (
              <div key={cat.key} className="rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: 'rgba(74,111,168,0.04)', borderColor: 'var(--border-color)' }}>
                <h4 className="text-base font-bold text-center mb-5 pb-3 border-b-2" style={{ color: 'var(--accent-amber)', borderColor: 'var(--accent-amber)' }}>{t(`about.${cat.key}`)}</h4>
                <div className="grid grid-cols-3 gap-2.5">
                  {cat.skills.map(s => (
                    <div key={s.name} className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border text-center min-h-[80px] transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:shadow-md" style={{ backgroundColor: 'var(--bg-dark)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                      {s.icon.startsWith('http') ? (
                        <img src={s.icon} alt={s.name} className="w-7 h-7 object-contain transition-transform duration-300 group-hover:scale-110" />
                      ) : (
                        <span className="text-2xl transition-transform duration-300 group-hover:scale-110">{s.icon}</span>
                      )}
                      <span className="text-xs font-semibold leading-tight">{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
