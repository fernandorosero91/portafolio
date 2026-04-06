'use client';

import { useEffect, useRef, useState } from 'react';

interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
}

interface SkillsChartProps {
  skills: Skill[];
  type?: 'bar' | 'radar';
}

export default function SkillsChart({ skills, type = 'bar' }: SkillsChartProps) {
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, []);

  if (type === 'radar') {
    return <RadarChart skills={skills} isVisible={isVisible} chartRef={chartRef} />;
  }

  return (
    <div ref={chartRef} className="skills-chart">
      {skills.map((skill, index) => (
        <div key={skill.name} className="skill-bar-container">
          <div className="skill-bar-header">
            <span className="skill-name">{skill.name}</span>
            <span className="skill-percentage">{skill.level}%</span>
          </div>
          <div className="skill-bar-track">
            <div
              className={`skill-bar-fill ${isVisible ? 'animate' : ''}`}
              style={{
                width: isVisible ? `${skill.level}%` : '0%',
                animationDelay: `${index * 0.1}s`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function RadarChart({ 
  skills, 
  isVisible, 
  chartRef 
}: { 
  skills: Skill[]; 
  isVisible: boolean; 
  chartRef: React.RefObject<HTMLDivElement>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isVisible || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(centerX, centerY) - 40;
    const numSkills = skills.length;
    const angleStep = (Math.PI * 2) / numSkills;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background circles
    ctx.strokeStyle = 'rgba(74, 111, 168, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (maxRadius / 5) * i, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = 'rgba(74, 111, 168, 0.3)';
    ctx.lineWidth = 1;
    skills.forEach((_, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const x = centerX + Math.cos(angle) * maxRadius;
      const y = centerY + Math.sin(angle) * maxRadius;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();
    });

    // Draw skill polygon
    ctx.beginPath();
    ctx.fillStyle = 'rgba(245, 158, 11, 0.2)';
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.8)';
    ctx.lineWidth = 2;

    skills.forEach((skill, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const radius = (skill.level / 100) * maxRadius;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw skill points and labels
    ctx.fillStyle = 'rgba(245, 158, 11, 1)';
    ctx.font = '12px Outfit, sans-serif';
    ctx.textAlign = 'center';

    skills.forEach((skill, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const radius = (skill.level / 100) * maxRadius;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      // Draw point
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Draw label
      const labelRadius = maxRadius + 20;
      const labelX = centerX + Math.cos(angle) * labelRadius;
      const labelY = centerY + Math.sin(angle) * labelRadius;
      
      ctx.fillStyle = 'var(--text-primary)';
      ctx.fillText(skill.name, labelX, labelY);
      ctx.fillStyle = 'rgba(245, 158, 11, 1)';
    });
  }, [isVisible, skills]);

  return (
    <div ref={chartRef} className="skills-radar">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="radar-canvas"
      />
    </div>
  );
}
