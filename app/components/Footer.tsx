'use client';

import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    [t('footer.navigation')]: [
      { label: t('footer.home'), href: '#inicio' },
      { label: t('footer.about'), href: '#about' },
      { label: t('footer.projects'), href: '#projects' },
      { label: t('footer.experience'), href: '#experience' },
    ],
    [t('footer.resources')]: [
      { label: t('footer.blog'), href: '#blog' },
      { label: t('footer.documentation'), href: '#docs' },
      { label: t('footer.tutorials'), href: '#tutorials' },
      { label: t('footer.faq'), href: '#faq' },
    ],
    [t('footer.legal')]: [
      { label: t('footer.privacy'), href: '#privacy' },
      { label: t('footer.terms'), href: '#terms' },
      { label: t('footer.cookies'), href: '#cookies' },
    ],
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <a href="#" className="navbar-logo footer-logo">
            FR
          </a>
          <p className="footer-description">
            {t('footer.description')}
          </p>
        </div>
        
        {Object.entries(footerLinks).map(([key, links]) => (
          <div key={key} className="footer-section">
            <h4>{key}</h4>
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="footer-bottom">
        <p>© {currentYear} Fernando Rosero. {t('footer.rights')}.</p>
      </div>
    </footer>
  );
}
