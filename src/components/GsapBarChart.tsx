import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface BarItem {
  asset: string;
  ale: number;
}

interface GsapBarChartProps {
  items: BarItem[];
}

export const GsapBarChart: React.FC<GsapBarChartProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const maxAle = Math.max(...items.map((i) => i.ale));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            const bars = container.querySelectorAll<HTMLElement>('.bar-fill');
            bars.forEach((bar, i) => {
              const targetW = bar.getAttribute('data-target-width') || '0%';
              gsap.fromTo(
                bar,
                { width: '0%', opacity: 0.4 },
                {
                  width: targetW,
                  opacity: 1,
                  duration: 1.4,
                  delay: i * 0.08,
                  ease: 'power3.out',
                }
              );
            });

            const labels = container.querySelectorAll<HTMLElement>('.bar-label');
            gsap.fromTo(
              labels,
              { opacity: 0, x: -12 },
              { opacity: 1, x: 0, duration: 0.6, stagger: 0.07, ease: 'power2.out' }
            );

            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [items]);

  return (
    <div ref={containerRef} className="space-y-2.5 pt-2">
      {items.map((item, idx) => {
        const pct = (item.ale / maxAle) * 100;
        const isTop = idx === 0;
        const isHovered = hoveredIdx === idx;

        return (
          <div
            key={item.asset}
            className="space-y-1.5 group"
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <div className="bar-label flex justify-between text-xs font-semibold opacity-0">
              <span
                className={`font-mono transition-colors duration-200 ${
                  isTop ? 'text-[#192837] font-bold' : isHovered ? 'text-[#7342E2]' : 'text-[#192837]/65'
                }`}
              >
                {item.asset}
              </span>
              <span
                className={`font-mono font-bold transition-colors duration-200 ${
                  isHovered ? 'text-[#7342E2]' : 'text-[#192837]'
                }`}
              >
                ₹{item.ale.toFixed(2)} Cr
              </span>
            </div>

            <div className="relative w-full h-3 bg-[#EEF0EC] rounded-full overflow-hidden">
              {/* Background pulse for hovered */}
              {isHovered && (
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'rgba(115,66,226,0.07)' }}
                />
              )}
              <div
                data-target-width={`${pct}%`}
                className={`bar-fill h-full rounded-full transition-colors duration-300 ${
                  isTop
                    ? 'bg-gradient-to-r from-[#7342E2] to-[#5a2db8]'
                    : isHovered
                    ? 'bg-[#7342E2]'
                    : 'bg-[#192837]/75'
                }`}
                style={{
                  width: 0,
                  boxShadow: isTop ? '0 0 16px rgba(115,66,226,0.45)' : 'none',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
