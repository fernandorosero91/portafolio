'use client';

import { useLanguage } from '../contexts/LanguageContext';
import { experiencesData } from '../data/experiences';
import { personalInfo } from '../data/personalInfo';
import { projectsData } from '../data/projects';
import { skillsData } from '../data/skills';
import type { Language } from '../types';

// Color palette
const C = {
  primary: [31, 41, 55] as const,
  secondary: [79, 70, 229] as const,
  darkBg: [17, 24, 39] as const,
  text: [55, 65, 81] as const,
  lightText: [156, 163, 175] as const,
  white: [255, 255, 255] as const,
  accent: [99, 102, 241] as const,
};

// Localized labels
const L: Record<string, Record<Language, string>> = {
  contact: { es: 'CONTACTO', en: 'CONTACT' },
  education: { es: 'EDUCACIÓN', en: 'EDUCATION' },
  skills: { es: 'HABILIDADES TÉCNICAS', en: 'TECHNICAL SKILLS' },
  profile: { es: 'PERFIL PROFESIONAL', en: 'PROFESSIONAL PROFILE' },
  experience: { es: 'EXPERIENCIA PROFESIONAL', en: 'PROFESSIONAL EXPERIENCE' },
  projects: { es: 'PROYECTOS DESTACADOS', en: 'FEATURED PROJECTS' },
  languages: { es: 'IDIOMAS', en: 'LANGUAGES' },
  links: { es: 'ENLACES', en: 'LINKS' },
};

type RGB = readonly [number, number, number];

export function useDownloadCV() {
  const { language } = useLanguage();

  const downloadCV = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pw = doc.internal.pageSize.getWidth();
      const ph = doc.internal.pageSize.getHeight();

      const leftW = 70;
      const rightStart = leftW;
      const rightW = pw - leftW;
      const lm = 12; // left margin inside left column
      const rm = 12; // right margin inside right column
      const rcw = rightW - rm * 2; // right content width
      const lcw = leftW - lm * 2 - 1; // left content width
      const bottomLimit = ph - 18;

      let leftY = 0;
      let rightY = 0;

      // ── Helpers ──
      const setFont = (size: number, weight: 'bold' | 'normal' | 'italic', color: RGB) => {
        doc.setFontSize(size);
        doc.setFont('helvetica', weight);
        doc.setTextColor(color[0], color[1], color[2]);
      };

      const drawBg = () => {
        doc.setFillColor(...C.darkBg);
        doc.rect(0, 0, leftW, ph, 'F');
        doc.setFillColor(...C.secondary);
        doc.rect(leftW - 1, 0, 1, ph, 'F');
        doc.setFillColor(...C.white);
        doc.rect(leftW, 0, rightW, ph, 'F');
      };

      const rightBreak = (need: number) => {
        if (rightY + need > bottomLimit) {
          doc.addPage();
          drawBg();
          rightY = 20;
          // Draw left column content for page 2
          drawLeftPage2();
          return true;
        }
        return false;
      };

      const rightTitle = (label: string) => {
        rightBreak(14);
        setFont(12, 'bold', C.primary);
        doc.text(label, rightStart + rm, rightY);
        rightY += 2.5;
        doc.setDrawColor(...C.secondary);
        doc.setLineWidth(0.5);
        doc.line(rightStart + rm, rightY, rightStart + rm + rcw, rightY);
        rightY += 6;
      };

      const leftTitle = (label: string) => {
        setFont(10.5, 'bold', C.white);
        doc.text(label, lm, leftY);
        leftY += 7;
      };

      // ── Left column page 2: languages + links ──
      let leftPage2Drawn = false;
      const drawLeftPage2 = () => {
        if (leftPage2Drawn) return;
        leftPage2Drawn = true;

        let y2 = 25;

        // Languages
        setFont(10.5, 'bold', C.white);
        doc.text(L.languages[language], lm, y2);
        y2 += 8;

        setFont(8.5, 'normal', C.lightText);
        const langs = language === 'es'
          ? [{ name: 'Español', level: 'Nativo' }, { name: 'Inglés', level: 'Básico' }]
          : [{ name: 'Spanish', level: 'Native' }, { name: 'English', level: 'Basic' }];

        langs.forEach(l => {
          setFont(8.5, 'bold', C.white);
          doc.text(l.name, lm, y2);
          setFont(8, 'normal', C.lightText);
          doc.text(l.level, lm, y2 + 4.5);
          y2 += 12;
        });

        y2 += 6;

        // Links
        setFont(10.5, 'bold', C.white);
        doc.text(L.links[language], lm, y2);
        y2 += 8;

        setFont(7.5, 'normal', C.accent);
        const links = [
          { label: 'LinkedIn', url: 'linkedin.com/in/elier-fernando' },
          { label: 'GitHub', url: 'github.com/fernandorosero91' },
          { label: 'YouTube', url: 'youtube.com/@gestionxpress' },
        ];
        links.forEach(link => {
          setFont(8, 'bold', C.white);
          doc.text(link.label, lm, y2);
          y2 += 4;
          setFont(7, 'normal', C.accent);
          doc.text(link.url, lm, y2);
          y2 += 8;
        });
      };

      // ===== PAGE 1 =====
      drawBg();

      // ── Photo ──
      try {
        const response = await fetch(personalInfo.photo);
        const blob = await response.blob();
        const base64 = await new Promise<string>((res, rej) => {
          const r = new FileReader();
          r.onloadend = () => res(r.result as string);
          r.onerror = rej;
          r.readAsDataURL(blob);
        });
        const img = await new Promise<HTMLImageElement>((res, rej) => {
          const i = new window.Image();
          i.onload = () => res(i);
          i.onerror = rej;
          i.src = base64;
        });

        const maxW = 38, maxH = 44;
        const ratio = img.width / img.height;
        let dw = maxW, dh = maxW / ratio;
        if (dh > maxH) { dh = maxH; dw = maxH * ratio; }

        const cx = leftW / 2, cy = 32, pad = 1.5;
        doc.setFillColor(...C.secondary);
        doc.roundedRect(cx - dw / 2 - pad, cy - dh / 2 - pad, dw + pad * 2, dh + pad * 2, 3, 3, 'F');
        doc.addImage(base64, 'JPEG', cx - dw / 2, cy - dh / 2, dw, dh, undefined, 'FAST');
      } catch {
        doc.setFillColor(...C.darkBg);
        doc.circle(leftW / 2, 30, 18, 'F');
        doc.setDrawColor(...C.secondary);
        doc.setLineWidth(1.5);
        doc.circle(leftW / 2, 30, 18, 'S');
        setFont(20, 'bold', C.white);
        const initials = personalInfo.name.charAt(0) + personalInfo.lastName.split(' ')[0].charAt(0);
        doc.text(initials, leftW / 2, 34, { align: 'center' });
      }

      // ===== LEFT COLUMN PAGE 1 =====
      leftY = 64;

      // Contact
      leftTitle(L.contact[language]);
      setFont(7.5, 'normal', C.lightText);
      [personalInfo.phone, personalInfo.email, `${personalInfo.location.city}, ${personalInfo.location.region}`, personalInfo.location.country].forEach(t => {
        doc.text(t, lm, leftY);
        leftY += 4;
      });
      leftY += 5;

      // Education
      leftTitle(L.education[language]);
      const academics = experiencesData[language].filter(e => e.type === 'academic');
      academics.forEach(exp => {
        setFont(7, 'bold', C.accent);
        doc.text(exp.year, lm, leftY);
        leftY += 3.5;

        setFont(7, 'bold', C.white);
        const tl = doc.splitTextToSize(exp.title, lcw);
        doc.text(tl, lm, leftY);
        leftY += tl.length * 3.5;

        setFont(6.5, 'normal', C.lightText);
        const sl = doc.splitTextToSize(exp.subtitle, lcw);
        doc.text(sl, lm, leftY);
        leftY += sl.length * 3 + 3.5;
      });
      leftY += 3;

      // Skills
      leftTitle(L.skills[language]);
      skillsData[language].forEach(group => {
        setFont(7, 'bold', C.accent);
        doc.text(group.category, lm, leftY);
        leftY += 3.5;

        setFont(7, 'normal', C.lightText);
        group.items.forEach(skill => {
          doc.text(`• ${skill.name}`, lm + 1, leftY);
          leftY += 3;
        });
        leftY += 2;
      });

      // ===== RIGHT COLUMN =====
      rightY = 22;

      // Name
      setFont(22, 'bold', C.primary);
      doc.text(personalInfo.fullName.toUpperCase(), rightStart + rm, rightY);
      rightY += 7;

      setFont(10, 'normal', C.secondary);
      doc.text(personalInfo.title[language], rightStart + rm, rightY);
      rightY += 12;

      // Profile
      rightTitle(L.profile[language]);
      setFont(8.5, 'normal', C.text);
      const sumLines = doc.splitTextToSize(personalInfo.summary[language], rcw);
      doc.text(sumLines, rightStart + rm, rightY);
      rightY += sumLines.length * 4.5 + 10;

      // Experience
      rightTitle(L.experience[language]);
      const professionals = experiencesData[language].filter(e => e.type === 'professional');

      professionals.forEach(exp => {
        const tl = doc.splitTextToSize(exp.title, rcw);
        const dl = doc.splitTextToSize(exp.description, rcw);
        const need = 5 + tl.length * 4.5 + 4.5 + dl.length * 3.5 + 7;
        rightBreak(need);

        setFont(8, 'bold', C.secondary);
        doc.text(exp.year, rightStart + rm, rightY);
        rightY += 5;

        setFont(10, 'bold', C.primary);
        doc.text(tl, rightStart + rm, rightY);
        rightY += tl.length * 4.5;

        setFont(8, 'italic', C.text);
        doc.text(exp.subtitle, rightStart + rm, rightY);
        rightY += 4.5;

        setFont(7.5, 'normal', C.text);
        doc.text(dl, rightStart + rm, rightY);
        rightY += dl.length * 3.5 + 7;
      });

      rightY += 6;

      // Projects
      rightTitle(L.projects[language]);
      projectsData[language].forEach(project => {
        const tl = doc.splitTextToSize(project.title, rcw);
        const dl = doc.splitTextToSize(project.description, rcw);
        const need = tl.length * 4.5 + dl.length * 3.5 + 10;
        rightBreak(need);

        setFont(9, 'bold', C.primary);
        doc.text(tl, rightStart + rm, rightY);
        rightY += tl.length * 4.5;

        setFont(8, 'normal', C.text);
        doc.text(dl, rightStart + rm, rightY);
        rightY += dl.length * 3.5 + 1;

        setFont(7, 'italic', C.secondary);
        doc.text(project.technologies.join(' • '), rightStart + rm, rightY);
        rightY += 7;
      });

      // ===== FOOTER on all pages =====
      const total = doc.getNumberOfPages();
      for (let i = 1; i <= total; i++) {
        doc.setPage(i);
        setFont(7, 'normal', C.lightText);
        doc.text(
          `CV - ${personalInfo.fullName} | ${new Date().getFullYear()}`,
          pw / 2, ph - 6, { align: 'center' },
        );
      }

      const fileName = `CV_${personalInfo.fullName.replace(/\s+/g, '_')}_${new Date().getFullYear()}.pdf`;
      doc.save(fileName);
      return true;
    } catch (error) {
      console.error('Error generating CV:', error);
      return false;
    }
  };

  return { downloadCV };
}
