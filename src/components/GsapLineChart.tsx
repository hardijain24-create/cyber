import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface DataPoint {
  date: string;
  score: number;
}

interface GsapLineChartProps {
  data: DataPoint[];
}

export const GsapLineChart: React.FC<GsapLineChartProps> = ({ data }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Define 7 points on 600x140 canvas
  const points = [
    { x: 20, y: 30, d: data[0] },
    { x: 110, y: 48, d: data[1] },
    { x: 200, y: 68, d: data[2] },
    { x: 290, y: 85, d: data[3] },
    { x: 380, y: 102, d: data[4] },
    { x: 470, y: 122, d: data[5] },
    { x: 560, y: 135, d: data[6] },
  ];

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'power2.inOut',
    });
  }, []);

  const pathD = `M ${points.map((p) => `${p.x},${p.y}`).join(' L ')}`;

  return (
    <div ref={containerRef} className="w-full space-y-4">
      <div className="h-56 w-full relative pt-2 bg-[#FBFCFD] rounded-2xl p-4 border border-[#E2E6E2]">
        <svg className="w-full h-full" viewBox="0 0 600 160" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7342E2" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#7342E2" stopOpacity={0.0} />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1="30" x2="600" y2="30" stroke="#E9ECE9" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="0" y1="70" x2="600" y2="70" stroke="#E9ECE9" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="0" y1="110" x2="600" y2="110" stroke="#E9ECE9" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="0" y1="150" x2="600" y2="150" stroke="#E9ECE9" strokeWidth="1" strokeDasharray="3 3" />

          {/* Area Fill */}
          <path
            d={`${pathD} L 560,160 L 20,160 Z`}
            fill="url(#chartGlow)"
          />

          {/* Animated Line */}
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="#7342E2"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Points */}
          {points.map((p, idx) => {
            const isHovered = hoverIndex === idx;
            return (
              <g key={idx} className="cursor-pointer">
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 8 : 5}
                  fill="#7342E2"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  className="transition-all duration-200"
                  onMouseEnter={() => setHoverIndex(idx)}
                />
              </g>
            );
          })}
        </svg>

        {/* Dynamic Tooltip on Hover */}
        {hoverIndex !== null && points[hoverIndex] && (
          <div
            className="absolute top-2 bg-[#192837] text-white px-3 py-1.5 rounded-xl text-xs font-mono shadow-lg transition-all"
            style={{ left: `${(points[hoverIndex].x / 600) * 85}%` }}
          >
            <div className="font-bold text-[#7342E2]">{points[hoverIndex].d.date}</div>
            <div>Exposure: ₹{points[hoverIndex].d.score} Cr</div>
          </div>
        )}
      </div>

      <div className="flex justify-between text-[11px] text-[#192837]/60 font-mono">
        {data.map((d) => (
          <span key={d.date}>{d.date} (₹{d.score} Cr)</span>
        ))}
      </div>
    </div>
  );
};
