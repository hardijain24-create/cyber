import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

interface AnimeScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
}

export const AnimeScrollReveal: React.FC<AnimeScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let translateY: [number, number] = [40, 0];
            let translateX: [number, number] = [0, 0];
            let scale: [number, number] = [1, 1];

            if (direction === 'down') translateY = [-40, 0];
            if (direction === 'left') translateX = [40, 0];
            if (direction === 'right') translateX = [-40, 0];
            if (direction === 'scale') scale = [0.9, 1];

            animate(el, {
              opacity: [0, 1],
              translateY,
              translateX,
              scale,
              duration: 900,
              delay,
              ease: 'outExpo',
            });
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, direction]);

  return (
    <div ref={ref} className={`opacity-0 ${className}`}>
      {children}
    </div>
  );
};
