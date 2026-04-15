'use client';

import { useState, useEffect } from 'react';
import { personalInfo } from '../data/personalInfo';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const contactPosition = contactSection.offsetTop - window.innerHeight;
        setIsVisible(scrollPosition > 300 && scrollPosition < contactPosition);
      } else {
        setIsVisible(scrollPosition > 300);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.open(personalInfo.social.whatsapp, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-[90px] right-5 md:bottom-20 md:right-[15px] w-[60px] h-[60px] md:w-14 md:h-14 bg-[#25D366] text-white rounded-full border-none flex items-center justify-center shadow-[0_4px_12px_rgba(37,211,102,0.4)] z-[9998] transition-all duration-300 group focus:outline-[3px] focus:outline-[rgba(37,211,102,0.5)] focus:outline-offset-[3px] ${
        isVisible
          ? 'opacity-100 visible scale-100 translate-y-0 animate-[whatsappEnter_0.5s_cubic-bezier(0.68,-0.55,0.265,1.55)]'
          : 'opacity-0 invisible scale-0 translate-y-5'
      } hover:bg-[#128C7E] hover:scale-110 hover:-translate-y-[3px] hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] active:scale-95`}
      aria-label="Contactar por WhatsApp"
      title="¡Chatea conmigo por WhatsApp!"
    >
      <span className="absolute w-full h-full rounded-full bg-[rgba(37,211,102,0.4)] animate-[whatsappPulseAnimation_2s_ease-out_infinite] pointer-events-none" />
      <svg viewBox="0 0 32 32" className="w-[34px] h-[34px] md:w-[30px] md:h-[30px] fill-white relative z-[2] transition-transform duration-300 group-hover:scale-110">
        <path fill="currentColor" d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-5.247 1.408 1.417-5.267-0.315-0.517c-1.318-2.17-2.011-4.652-2.011-7.262 0-7.44 6.060-13.5 13.5-13.5s13.5 6.060 13.5 13.5-6.060 13.5-13.5 13.5zM21.803 18.142c-0.397-0.197-2.348-1.158-2.713-1.29-0.365-0.132-0.63-0.197-0.895 0.197s-1.027 1.29-1.26 1.555-0.463 0.295-0.86 0.098-1.675-0.618-3.19-1.968c-1.18-1.050-1.977-2.348-2.21-2.745s-0.025-0.607 0.173-0.803c0.177-0.177 0.397-0.463 0.595-0.693 0.198-0.232 0.265-0.397 0.397-0.662s0.067-0.495-0.033-0.693c-0.1-0.198-0.895-2.155-1.227-2.948-0.323-0.773-0.65-0.668-0.895-0.68-0.232-0.012-0.497-0.015-0.762-0.015s-0.695 0.098-1.060 0.495c-0.365 0.397-1.393 1.36-1.393 3.318s1.425 3.85 1.623 4.115c0.198 0.265 2.795 4.267 6.773 5.983 0.947 0.408 1.687 0.652 2.263 0.835 0.952 0.302 1.817 0.26 2.502 0.157 0.763-0.113 2.348-0.96 2.68-1.887s0.332-1.723 0.232-1.887c-0.1-0.165-0.365-0.265-0.762-0.463z"/>
      </svg>
      <span className="absolute right-[70px] top-1/2 -translate-y-1/2 translate-x-[10px] bg-gray-800 text-white py-2.5 px-4 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 invisible transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.2)] pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-x-0 hidden md:block">
        ¡Chatea conmigo!
      </span>
    </button>
  );
}
