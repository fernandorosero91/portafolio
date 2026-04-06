'use client';

import { useState } from 'react';

interface FlipCardProps {
  front: {
    year: string;
    title: string;
    subtitle: string;
  };
  back: {
    description: string;
    type: 'academic' | 'professional';
  };
  index: number;
}

export default function FlipCard({ front, back, index }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="timeline-item-3d" data-type={back.type}>
      <div className="timeline-dot"></div>
      <div
        className={`flip-card ${isFlipped ? 'flipped' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsFlipped(!isFlipped);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`${front.title} - Click para ver más detalles`}
      >
        <div className="flip-card-inner">
          {/* Front Side */}
          <div className="flip-card-front">
            <div className="timeline-year">{front.year}</div>
            <h3 className="timeline-title">{front.title}</h3>
            <p className="timeline-subtitle">{front.subtitle}</p>
            <div className="flip-hint">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
              </svg>
              <span>Click para ver más</span>
            </div>
          </div>

          {/* Back Side */}
          <div className="flip-card-back">
            <div className="timeline-year">{front.year}</div>
            <h3 className="timeline-title">{front.title}</h3>
            <p className="timeline-description">{back.description}</p>
            <div className="flip-hint">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
              </svg>
              <span>Click para volver</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
