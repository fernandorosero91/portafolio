'use client';

import { useState, useEffect } from 'react';
import { personalInfo } from '../data/personalInfo';

const SCROLL_THRESHOLD = 300;

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const contactSection = document.getElementById('contact');

      if (contactSection) {
        const hideBeforeContact = scrollPosition < contactSection.offsetTop - window.innerHeight;
        setIsVisible(scrollPosition > SCROLL_THRESHOLD && hideBeforeContact);
      } else {
        setIsVisible(scrollPosition > SCROLL_THRESHOLD);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openWhatsApp = () => {
    window.open(personalInfo.social.whatsapp, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={openWhatsApp}
      className={`fixed bottom-5 right-18 z-999 w-11 h-11 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group ${
        isVisible
          ? 'opacity-100 visible scale-100 translate-y-0'
          : 'opacity-0 invisible scale-0 translate-y-4'
      } hover:bg-[#128C7E] hover:scale-110 hover:-translate-y-0.5 hover:shadow-xl active:scale-95`}
      aria-label="Contact via WhatsApp"
      title="WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-[whatsappPulse_2s_ease-out_infinite] pointer-events-none" />
      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-white relative z-2">
        <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.467a13.42 13.42 0 0 1-7.07-1.87l-.507-.292-5.247 1.408 1.417-5.267-.315-.517A13.39 13.39 0 0 1 2.267 15.667c0-7.44 6.06-13.5 13.5-13.5s13.5 6.06 13.5 13.5-6.06 13.8-13.267 13.8zm5.803-11.325c-.397-.197-2.348-1.158-2.713-1.29-.365-.132-.63-.197-.895.197s-1.027 1.29-1.26 1.555-.463.295-.86.098-1.675-.618-3.19-1.968c-1.18-1.05-1.977-2.348-2.21-2.745s-.025-.607.173-.803c.177-.177.397-.463.595-.693.198-.232.265-.397.397-.662s.067-.495-.033-.693c-.1-.198-.895-2.155-1.227-2.948-.323-.773-.65-.668-.895-.68-.232-.012-.497-.015-.762-.015s-.695.098-1.06.495c-.365.397-1.393 1.36-1.393 3.318s1.425 3.85 1.623 4.115c.198.265 2.795 4.267 6.773 5.983.947.408 1.687.652 2.263.835.952.302 1.817.26 2.502.157.763-.113 2.348-.96 2.68-1.887s.332-1.723.232-1.887c-.1-.165-.365-.265-.762-.463z" />
      </svg>
    </button>
  );
}
