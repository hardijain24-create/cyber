import React, { useRef } from 'react';
import gsap from 'gsap';

interface GsapCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export const GsapCard: React.FC<GsapCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(115,66,226,0.12)',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1200,
      duration: 0.35,
      ease: 'power2.out',
    });

    // Move glow with mouse
    if (glow) {
      gsap.to(glow, {
        x: x - rect.width / 2,
        y: y - rect.height / 2,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const glow = glowRef.current;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });

    if (glow) {
      gsap.to(glow, {
        opacity: 0,
        duration: 0.4,
      });
    }
  };

  const handleMouseEnter = () => {
    const card = cardRef.current;
    gsap.to(card, {
      scale: 1.015,
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  const handleMouseLeaveScale = () => {
    const card = cardRef.current;
    gsap.to(card, {
      scale: 1,
      duration: 0.4,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={(e) => { handleMouseLeave(); handleMouseLeaveScale(); }}
      onMouseEnter={handleMouseEnter}
      className={`relative overflow-hidden will-change-transform cursor-default ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Moving glow spot */}
      <div
        ref={glowRef}
        className="absolute w-48 h-48 rounded-full pointer-events-none opacity-0 blur-2xl"
        style={{
          background: glowColor,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      {children}
    </div>
  );
};
