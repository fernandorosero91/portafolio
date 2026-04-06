import { jsPDF } from 'jspdf';

interface CVData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  skills: {
    category: string;
    items: string[];
  }[];
  experience: {
    year: string;
    title: string;
    company: string;
    description: string;
    type: 'academic' | 'professional';
  }[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
  }[];
}

export async function generateCV(data: CVData, language: 'es' | 'en' = 'es') {
  // Cargar jsPDF desde CDN
  const jsPDF = (await import('jspdf')).jsPDF;
  
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);
  let yPosition = margin;

  // Colores ATS-friendly (escala de grises y azul suave)
  const colors = {
    primary: [74, 111, 168], // #4A6FA8
    dark: [15, 26, 46], // #0F1A2E
    gray: [107, 114, 128], // #6B7280
    lightGray: [229, 231, 235] // #E5E7EB
  };

  // Helper function para agregar nueva página si es necesario
  const checkPageBreak = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Helper para texto con wrap
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number, color: number[]) => {
    doc.setFontSize(fontSize);
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return lines.length * (fontSize * 0.35); // Retorna altura usada
  };

  // ===== HEADER =====
  doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.rect(0, 0, pageWidth, 45, 'F');

  // Nombre
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text(data.personalInfo.name.toUpperCase(), margin, 20);

  // Título
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(data.personalInfo.title, margin, 28);

  // Información de contacto
  doc.setFontSize(9);
  const contactInfo = [
    `📧 ${data.personalInfo.email}`,
    `📱 ${data.personalInfo.phone}`,
    `📍 ${data.personalInfo.location}`
  ];
  doc.text(contactInfo.join('  |  '), margin, 36);

  yPosition = 55;

  // ===== RESUMEN PROFESIONAL =====
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text(language === 'es' ? 'PERFIL PROFESIONAL' : 'PROFESSIONAL SUMMARY', margin, yPosition);
  
  yPosition += 2;
  doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setLineWidth(0.5);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  
  yPosition += 6;
  const summaryHeight = addWrappedText(
    data.personalInfo.summary,
    margin,
    yPosition,
    contentWidth,
    10,
    colors.dark
  );
  yPosition += summaryHeight + 8;

  // ===== HABILIDADES =====
  checkPageBreak(30);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text(language === 'es' ? 'HABILIDADES TÉCNICAS' : 'TECHNICAL SKILLS', margin, yPosition);
  
  yPosition += 2;
  doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 6;

  data.skills.forEach((skillGroup) => {
    checkPageBreak(15);
    
    // Categoría
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    doc.text(skillGroup.category + ':', margin, yPosition);
    
    // Skills
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
    const skillsText = skillGroup.items.join(' • ');
    const skillsHeight = addWrappedText(
      skillsText,
      margin + 50,
      yPosition,
      contentWidth - 50,
      9,
      colors.gray
    );
    yPosition += Math.max(5, skillsHeight + 2);
  });

  yPosition += 5;

  // ===== EXPERIENCIA PROFESIONAL =====
  checkPageBreak(30);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text(language === 'es' ? 'EXPERIENCIA PROFESIONAL' : 'PROFESSIONAL EXPERIENCE', margin, yPosition);
  
  yPosition += 2;
  doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 6;

  // Filtrar solo experiencia profesional y académica relevante
  const professionalExp = data.experience.filter(exp => exp.type === 'professional').slice(0, 5);
  
  professionalExp.forEach((exp, index) => {
    checkPageBreak(25);
    
    // Título y Empresa
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    doc.text(exp.title, margin, yPosition);
    
    // Año
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.text(exp.year, pageWidth - margin - 30, yPosition);
    
    yPosition += 5;
    
    // Empresa
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
    doc.text(exp.company, margin, yPosition);
    
    yPosition += 5;
    
    // Descripción
    doc.setFont('helvetica', 'normal');
    const descHeight = addWrappedText(
      '• ' + exp.description,
      margin + 3,
      yPosition,
      contentWidth - 3,
      9,
      colors.gray
    );
    yPosition += descHeight + 6;
  });

  // ===== EDUCACIÓN =====
  checkPageBreak(30);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text(language === 'es' ? 'EDUCACIÓN' : 'EDUCATION', margin, yPosition);
  
  yPosition += 2;
  doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 6;

  const academicExp = data.experience.filter(exp => exp.type === 'academic').slice(0, 3);
  
  academicExp.forEach((exp) => {
    checkPageBreak(20);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    doc.text(exp.title, margin, yPosition);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.text(exp.year, pageWidth - margin - 30, yPosition);
    
    yPosition += 5;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
    doc.text(exp.company, margin, yPosition);
    
    yPosition += 8;
  });

  // ===== PROYECTOS DESTACADOS =====
  if (data.projects.length > 0) {
    checkPageBreak(30);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.text(language === 'es' ? 'PROYECTOS DESTACADOS' : 'FEATURED PROJECTS', margin, yPosition);
    
    yPosition += 2;
    doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 6;

    data.projects.slice(0, 3).forEach((project) => {
      checkPageBreak(20);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
      doc.text(project.title, margin, yPosition);
      
      yPosition += 5;
      
      doc.setFont('helvetica', 'normal');
      const projDescHeight = addWrappedText(
        project.description,
        margin + 3,
        yPosition,
        contentWidth - 3,
        9,
        colors.gray
      );
      yPosition += projDescHeight + 3;
      
      doc.setFontSize(8);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
      doc.text('Tecnologías: ' + project.technologies.join(', '), margin + 3, yPosition);
      
      yPosition += 8;
    });
  }

  // Footer en todas las páginas
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
    doc.text(
      `${data.personalInfo.name} - CV | ${language === 'es' ? 'Página' : 'Page'} ${i} ${language === 'es' ? 'de' : 'of'} ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  // Guardar PDF
  const fileName = `CV_${data.personalInfo.name.replace(/\s+/g, '_')}_${new Date().getFullYear()}.pdf`;
  doc.save(fileName);
}
