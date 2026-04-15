'use client';

import { useLanguage } from '../contexts/LanguageContext';
import { socialLinks } from '../data/socialLinks';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const navigationColumns: Record<string, FooterLink[]> = {
    [t('footer.navigation')]: [
      { label: t('footer.home'), href: '#inicio' },
      { label: t('footer.about'), href: '#about' },
      { label: t('footer.projects'), href: '#projects' },
      { label: t('footer.experience'), href: '#experience' },
      { label: t('footer.contact'), href: '#contact' },
    ],
    [t('footer.resources')]: [
      { label: t('footer.tutorials'), href: 'https://www.youtube.com/@gestionxpress', external: true },
    ],
  };

  return (
    <footer
      className="border-t pt-12 pb-8 px-6 lg:px-8"
      style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
    >
      <div className="max-w-7xl mx-auto mb-10">
        {/* Brand */}
        <div className="mb-10">
          <a href="#" className="text-2xl font-bold no-underline block mb-3" style={{ color: 'var(--primary-blue)' }}>
            FR
          </a>
          <p className="text-base leading-relaxed mb-5 max-w-xs" style={{ color: 'var(--text-tertiary)' }}>
            {t('footer.description')}
          </p>
          <div className="flex gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="btn-social w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: link.bg }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5">
                  <path d={link.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Navigation columns — side by side on all screens */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
          {Object.entries(navigationColumns).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-bold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>
                {title}
              </h4>
              <ul className="list-none space-y-2.5">
                {items.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-base no-underline transition-colors duration-200 hover:text-(--accent-amber)"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div
        className="border-t pt-6 text-center text-sm"
        style={{ borderColor: 'var(--border-color)', color: 'var(--text-tertiary)' }}
      >
        © {currentYear} Fernando Rosero. {t('footer.rights')}.
      </div>
    </footer>
  );
}
