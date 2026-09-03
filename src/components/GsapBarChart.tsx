import React, { useEffect, useRef } from 'react';
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
  const maxAle = Math.max(...items.map((i) => i.ale));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const bars = container.querySelectorAll('.bar-fill');
    gsap.fromTo(
      bars,
      { width: 0 },
      {
        width: (i, target) => target.getAttribute('data-target-width') || '0%',
        duration: 1.2,
        stagger: 0.06,
        ease: 'power3.out',
      }
    );
  }, [items]);

  return (
    <div ref={containerRef} className="space-y-3 pt-2">
      {items.map((item, idx) => {
        const pct = (item.ale / maxAle) * 100;
        const isTop = idx === 0;

        return (
          <div key={item.asset} className="space-y-1.5 group">
            <div className="flex justify-between text-xs font-semibold">
              <span className={`font-mono ${isTop ? 'text-[#192837] font-bold' : 'text-[#192837]/70'}`}>
                {item.asset}
              </span>
              <span className="font-mono text-[#192837] font-bold">
                ₹{item.ale.toFixed(2)} Cr
              </span>
            </div>
            <div className="w-full h-3 bg-[#EEF0EC] rounded-full overflow-hidden p-0.5">
              <div
                data-target-width={`${pct}%`}
                className={`bar-fill h-full rounded-full transition-shadow duration-300 ${
                  isTop
                    ? 'bg-[#7342E2] shadow-[0_0_12px_rgba(115,66,226,0.4)]'
                    : 'bg-[#192837]/80 group-hover:bg-[#7342E2]'
                }`}
                style={{ width: 0 }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
