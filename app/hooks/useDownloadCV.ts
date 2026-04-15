'use client';

import { useLanguage } from '../contexts/LanguageContext';
import { experiencesData } from '../data/experiences';
import { personalInfo } from '../data/personalInfo';
import { projectsData } from '../data/projects';
import { skillsData } from '../data/skills';

export function useDownloadCV() {
  const { language } = useLanguage();

  const downloadCV = async () => {
    try {
      // Importar jsPDF dinámicamente
      const { jsPDF } = await import('jspdf');

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      
      // Colores minimalistas elegantes
      const colors = {
        primary: [31, 41, 55], // #1F2937 - Gris oscuro elegante
        secondary: [79, 70, 229], // #4F46E5 - Índigo moderno
        darkBg: [17, 24, 39], // #111827 - Fondo oscuro sutil
        text: [55, 65, 81], // #374151 - Texto gris medio
        lightText: [156, 163, 175], // #9CA3AF - Texto gris claro
        lightBg: [249, 250, 251], // #F9FAFB - Fondo muy claro
        white: [255, 255, 255],
        accent: [99, 102, 241] // #6366F1 - Índigo claro
      };

      // Dimensiones de columnas
      const leftColumnWidth = 70;
      const rightColumnStart = leftColumnWidth;
      const rightColumnWidth = pageWidth - leftColumnWidth;
      const leftMargin = 12;
      const rightMargin = 12;

      // ===== FONDO MINIMALISTA =====
      // Columna izquierda - Gris muy oscuro
      doc.setFillColor(colors.darkBg[0], colors.darkBg[1], colors.darkBg[2]);
      doc.rect(0, 0, leftColumnWidth, pageHeight, 'F');
      
      // Línea vertical sutil índigo
      doc.setFillColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
      doc.rect(leftColumnWidth - 1, 0, 1, pageHeight, 'F');

      // Fondo blanco columna derecha
      doc.setFillColor(colors.white[0], colors.white[1], colors.white[2]);
      doc.rect(leftColumnWidth, 0, rightColumnWidth, pageHeight, 'F');

      // ===== FOTO DE PERFIL =====
      try {
        const response = await fetch(personalInfo.photo);
        const blob = await response.blob();
        const base64data = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });

        // Load into an Image to get real dimensions
        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
          const i = new window.Image();
          i.onload = () => resolve(i);
          i.onerror = reject;
          i.src = base64data;
        });

        const maxW = 36; // max width in mm
        const maxH = 42; // max height in mm
        const ratio = img.width / img.height;
        let drawW = maxW;
        let drawH = maxW / ratio;
        if (drawH > maxH) {
          drawH = maxH;
          drawW = maxH * ratio;
        }

        const centerX = leftColumnWidth / 2;
        const centerY = 30;

        // Rounded border behind photo
        const borderPad = 1.5;
        doc.setFillColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
        doc.roundedRect(
          centerX - drawW / 2 - borderPad,
          centerY - drawH / 2 - borderPad,
          drawW + borderPad * 2,
          drawH + borderPad * 2,
          3, 3, 'F'
        );

        doc.addImage(
          base64data,
          'JPEG',
          centerX - drawW / 2,
          centerY - drawH / 2,
          drawW,
          drawH,
          undefined,
          'FAST'
        );
      } catch (error) {
        // Fallback a iniciales si hay error
        doc.setFillColor(colors.darkBg[0], colors.darkBg[1], colors.darkBg[2]);
        doc.circle(leftColumnWidth / 2, 28, 16, 'F');
        
        doc.setDrawColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
        doc.setLineWidth(1.5);
        doc.circle(leftColumnWidth / 2, 28, 16, 'S');

        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
        const initials = personalInfo.name.charAt(0) + personalInfo.lastName.split(' ')[0].charAt(0);
        doc.text(initials, leftColumnWidth / 2, 31, { align: 'center' });
      }

      let leftY = 62;
      let rightY = 20;

      // ===== COLUMNA IZQUIERDA =====
      
      // CONTACTO
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
      doc.text((language === 'es' ? 'CONTACTO' : 'CONTACT'), leftMargin, leftY);
      
      leftY += 6;
      
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(colors.lightText[0], colors.lightText[1], colors.lightText[2]);
      
      const contactInfo = [
        { text: personalInfo.phone },
        { text: personalInfo.email },
        { text: personalInfo.location.city + ', ' + personalInfo.location.region },
        { text: personalInfo.location.country }
      ];

      contactInfo.forEach(item => {
        doc.text(item.text, leftMargin, leftY);
        leftY += 3.5;
      });

      leftY += 5;

      // EDUCACIÓN
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
      doc.text((language === 'es' ? 'EDUCACION' : 'EDUCATION'), leftMargin, leftY);
      
      leftY += 6;

      const experiences = experiencesData[language];
      const academicExp = experiences.filter(exp => exp.type === 'academic');
      
      doc.setFontSize(7);
      
      academicExp.forEach((exp) => {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(colors.accent[0], colors.accent[1], colors.accent[2]);
        doc.text(exp.year, leftMargin, leftY);
        leftY += 3.5;
        
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
        const titleLines = doc.splitTextToSize(exp.title, leftColumnWidth - (leftMargin * 2) - 1);
        doc.text(titleLines, leftMargin, leftY);
        leftY += titleLines.length * 3.5;
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6.5);
        doc.setTextColor(colors.lightText[0], colors.lightText[1], colors.lightText[2]);
        const subtitleLines = doc.splitTextToSize(exp.subtitle, leftColumnWidth - (leftMargin * 2) - 1);
        doc.text(subtitleLines, leftMargin, leftY);
        leftY += subtitleLines.length * 3 + 4;
        doc.setFontSize(7);
      });

      leftY += 3;

      // HABILIDADES
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
      doc.text((language === 'es' ? 'HABILIDADES' : 'SKILLS'), leftMargin, leftY);
      
      leftY += 6;

      const currentSkills = skillsData[language];

      doc.setFontSize(7);
      currentSkills.forEach(skillGroup => {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(colors.accent[0], colors.accent[1], colors.accent[2]);
        doc.text(skillGroup.category, leftMargin, leftY);
        leftY += 3.5;
        
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(colors.lightText[0], colors.lightText[1], colors.lightText[2]);
        skillGroup.items.forEach(skill => {
          doc.text('• ' + skill.name, leftMargin + 1, leftY);
          leftY += 3;
        });
        leftY += 2;
      });

      // ===== COLUMNA DERECHA =====
      
      // NOMBRE Y TÍTULO
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
      doc.text(personalInfo.fullName.toUpperCase(), rightColumnStart + rightMargin, rightY);
      rightY += 6;
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
      doc.text(personalInfo.title[language], rightColumnStart + rightMargin, rightY);
      rightY += 10;

      // PERFIL
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
      doc.text((language === 'es' ? 'PERFIL PROFESIONAL' : 'PROFESSIONAL PROFILE'), rightColumnStart + rightMargin, rightY);
      rightY += 6;

      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
      
      const summaryLines = doc.splitTextToSize(personalInfo.summary[language], rightColumnWidth - (rightMargin * 2));
      doc.text(summaryLines, rightColumnStart + rightMargin, rightY);
      rightY += summaryLines.length * 4 + 8;

      // EXPERIENCIA PROFESIONAL
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
      doc.text((language === 'es' ? 'EXPERIENCIA PROFESIONAL' : 'PROFESSIONAL EXPERIENCE'), rightColumnStart + rightMargin, rightY);
      rightY += 6;

      const professionalExp = experiences.filter(exp => exp.type === 'professional');
      
      professionalExp.forEach((exp) => {
        doc.setFontSize(7);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
        doc.text(exp.year, rightColumnStart + rightMargin, rightY);
        rightY += 4;
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
        const titleLines = doc.splitTextToSize(exp.title, rightColumnWidth - (rightMargin * 2));
        doc.text(titleLines, rightColumnStart + rightMargin, rightY);
        rightY += titleLines.length * 4;
        
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
        doc.text(exp.subtitle, rightColumnStart + rightMargin, rightY);
        rightY += 3.5;
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
        const descLines = doc.splitTextToSize(exp.description, rightColumnWidth - (rightMargin * 2));
        doc.text(descLines, rightColumnStart + rightMargin, rightY);
        rightY += descLines.length * 3 + 5;
      });

      rightY += 5;

      // PROYECTOS DESTACADOS
      if (rightY < pageHeight - 50) {
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
        doc.text((language === 'es' ? 'PROYECTOS DESTACADOS' : 'FEATURED PROJECTS'), rightColumnStart + rightMargin, rightY);
        rightY += 6;

        const currentProjects = projectsData[language];

        currentProjects.forEach(project => {
          doc.setFontSize(8);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
          const projLines = doc.splitTextToSize(project.title, rightColumnWidth - (rightMargin * 2));
          doc.text(projLines, rightColumnStart + rightMargin, rightY);
          rightY += projLines.length * 3.5;
          
          doc.setFontSize(7);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
          const descLines = doc.splitTextToSize(project.description, rightColumnWidth - (rightMargin * 2));
          doc.text(descLines, rightColumnStart + rightMargin, rightY);
          rightY += descLines.length * 3;
          
          doc.setFontSize(6.5);
          doc.setFont('helvetica', 'italic');
          doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
          doc.text(project.technologies.join(' • '), rightColumnStart + rightMargin, rightY);
          rightY += 5;
        });
      }

      // Footer minimalista
      doc.setFontSize(6.5);
      doc.setTextColor(colors.lightText[0], colors.lightText[1], colors.lightText[2]);
      doc.text(
        `CV - ${personalInfo.fullName} | ${new Date().getFullYear()}`,
        pageWidth / 2,
        pageHeight - 5,
        { align: 'center' }
      );

      // Guardar PDF
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
