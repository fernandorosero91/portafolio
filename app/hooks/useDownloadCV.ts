'use client';

import { useLanguage } from '../contexts/LanguageContext';
import { experiencesData } from '../data/experiences';

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

      // ===== FOTO DE PERFIL (Círculo minimalista) =====
      // Círculo con borde índigo
      doc.setFillColor(colors.darkBg[0], colors.darkBg[1], colors.darkBg[2]);
      doc.circle(leftColumnWidth / 2, 28, 16, 'F');
      
      doc.setDrawColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
      doc.setLineWidth(1.5);
      doc.circle(leftColumnWidth / 2, 28, 16, 'S');

      // Iniciales en el círculo
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
      doc.text('FR', leftColumnWidth / 2, 31, { align: 'center' });

      let leftY = 55;
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
        { text: '+57 310 123 4567' },
        { text: 'elier.rosero@example.com' },
        { text: 'Pasto, Nariño' },
        { text: 'Colombia' }
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

      const skillsData = [
        { category: language === 'es' ? 'Contabilidad' : 'Accounting', items: ['NIIF/IFRS', language === 'es' ? 'Auditoria' : 'Auditing', language === 'es' ? 'Tributacion' : 'Taxation', language === 'es' ? 'Estados Financieros' : 'Financial Statements'] },
        { category: 'Backend', items: ['Python', 'Django', 'Java Spring', 'Node.js', 'Flask'] },
        { category: 'Frontend', items: ['React', 'Vue.js', 'Next.js', 'Tailwind CSS'] },
        { category: language === 'es' ? 'Bases de Datos' : 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
        { category: language === 'es' ? 'Herramientas' : 'Tools', items: ['Git', 'Docker', 'API REST', 'DevOps'] }
      ];

      doc.setFontSize(7);
      skillsData.forEach(skillGroup => {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(colors.accent[0], colors.accent[1], colors.accent[2]);
        doc.text(skillGroup.category, leftMargin, leftY);
        leftY += 3.5;
        
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(colors.lightText[0], colors.lightText[1], colors.lightText[2]);
        skillGroup.items.forEach(skill => {
          doc.text('• ' + skill, leftMargin + 1, leftY);
          leftY += 3;
        });
        leftY += 2;
      });

      // ===== COLUMNA DERECHA =====
      
      // NOMBRE Y TÍTULO
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
      doc.text('ELIER FERNANDO ROSERO BRAVO', rightColumnStart + rightMargin, rightY);
      rightY += 6;
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
      const titleText = language === 'es' ? 'Ingeniero de Software & Contador Publico' : 'Software Engineer & Public Accountant';
      doc.text(titleText, rightColumnStart + rightMargin, rightY);
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
      const summary = language === 'es' 
        ? 'Contador Publico con Maestria en Gerencia y Auditoria Tributaria, cursando 5to semestre de Ingenieria de Software. Mas de 8 anos de experiencia combinando conocimientos en NIIF, auditoria tributaria y desarrollo full-stack. Especializado en crear soluciones tecnologicas que optimizan procesos empresariales y financieros.'
        : 'Public Accountant with Master in Tax Management and Auditing, currently in 5th semester of Software Engineering. Over 8 years of experience combining IFRS knowledge, tax auditing, and full-stack development. Specialized in creating technological solutions that optimize business and financial processes.';
      
      const summaryLines = doc.splitTextToSize(summary, rightColumnWidth - (rightMargin * 2));
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

        const projects = [
          {
            title: language === 'es' ? 'Sistema de Gestion de Parqueaderos' : 'Parking Management System',
            desc: language === 'es' ? 'Plataforma completa para administracion de parqueaderos con control de ingresos, tarifas y reportes en tiempo real.' : 'Complete platform for parking lot administration with income control, rates, and real-time reports.',
            tech: 'Django • PostgreSQL • Tailwind CSS'
          },
          {
            title: language === 'es' ? 'Facturacion Electronica DIAN' : 'Electronic Invoicing DIAN',
            desc: language === 'es' ? 'Sistema de facturacion electronica cumpliendo normativa DIAN, con generacion automatica de documentos tributarios.' : 'Electronic invoicing system complying with DIAN regulations, with automatic generation of tax documents.',
            tech: 'Python Flask • MySQL • API REST'
          },
          {
            title: language === 'es' ? 'Gestion de Restaurantes' : 'Restaurant Management',
            desc: language === 'es' ? 'Aplicacion para manejo de pedidos, inventario y facturacion en restaurantes con interfaz intuitiva.' : 'Application for managing orders, inventory, and billing in restaurants with an intuitive interface.',
            tech: 'Node.js • Express.js • React'
          },
          {
            title: language === 'es' ? 'Control de Inventarios y Ventas' : 'Inventory and Sales Control',
            desc: language === 'es' ? 'Sistema integral para gestion de inventarios, ventas y reportes financieros con dashboard interactivo.' : 'Comprehensive system for inventory management, sales, and financial reports with interactive dashboard.',
            tech: 'Vue.js • Python • PostgreSQL'
          }
        ];

        projects.forEach(project => {
          doc.setFontSize(8);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
          const projLines = doc.splitTextToSize(project.title, rightColumnWidth - (rightMargin * 2));
          doc.text(projLines, rightColumnStart + rightMargin, rightY);
          rightY += projLines.length * 3.5;
          
          doc.setFontSize(7);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
          const descLines = doc.splitTextToSize(project.desc, rightColumnWidth - (rightMargin * 2));
          doc.text(descLines, rightColumnStart + rightMargin, rightY);
          rightY += descLines.length * 3;
          
          doc.setFontSize(6.5);
          doc.setFont('helvetica', 'italic');
          doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
          doc.text(project.tech, rightColumnStart + rightMargin, rightY);
          rightY += 5;
        });
      }

      // Footer minimalista
      doc.setFontSize(6.5);
      doc.setTextColor(colors.lightText[0], colors.lightText[1], colors.lightText[2]);
      doc.text(
        `CV - Elier Fernando Rosero Bravo | ${new Date().getFullYear()}`,
        pageWidth / 2,
        pageHeight - 5,
        { align: 'center' }
      );

      // Guardar PDF
      const fileName = `CV_Fernando_Rosero_${new Date().getFullYear()}.pdf`;
      doc.save(fileName);
      
      return true;
    } catch (error) {
      console.error('Error generating CV:', error);
      return false;
    }
  };

  return { downloadCV };
}
