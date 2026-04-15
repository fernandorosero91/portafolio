'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const PARTICLE_COUNT = 50;
const MAX_CONNECTION_DISTANCE = 150;
const PARTICLE_COLOR = 'rgba(74, 111, 168, 0.5)';
const CONNECTION_BASE_OPACITY = 0.2;

function createParticle(canvasWidth: number, canvasHeight: number): Particle {
  return {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    radius: Math.random() * 2 + 1,
  };
}

function updateParticle(particle: Particle, width: number, height: number): void {
  particle.x += particle.vx;
  particle.y += particle.vy;

  if (particle.x < 0 || particle.x > width) particle.vx *= -1;
  if (particle.y < 0 || particle.y > height) particle.vy *= -1;
}

function drawParticle(ctx: CanvasRenderingContext2D, particle: Particle): void {
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
  ctx.fillStyle = PARTICLE_COLOR;
  ctx.fill();
}

function drawConnection(ctx: CanvasRenderingContext2D, a: Particle, b: Particle): void {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < MAX_CONNECTION_DISTANCE) {
    const opacity = CONNECTION_BASE_OPACITY * (1 - distance / MAX_CONNECTION_DISTANCE);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = `rgba(74, 111, 168, ${opacity})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Particle[] = Array.from(
      { length: PARTICLE_COUNT },
      () => createParticle(canvas.width, canvas.height),
    );

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        updateParticle(particles[i], canvas.width, canvas.height);
        drawParticle(ctx, particles[i]);

        for (let j = i + 1; j < particles.length; j++) {
          drawConnection(ctx, particles[i], particles[j]);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas" />;
}
