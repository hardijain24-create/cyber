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
  const areaRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<SVGCircleElement[]>([]);
  const hasAnimated = useRef(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const W = 600;
  const H = 160;
  const PAD = 20;

  const minScore = Math.min(...data.map((d) => d.score));
  const maxScore = Math.max(...data.map((d) => d.score));

  const points = data.map((d, i) => ({
    x: PAD + (i / (data.length - 1)) * (W - PAD * 2),
    y: PAD + ((maxScore - d.score) / (maxScore - minScore)) * (H - PAD * 2),
    d,
  }));

  // Smooth bezier path
  const buildPath = () => {
    if (points.length < 2) return '';
    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpX = (prev.x + curr.x) / 2;
      d += ` C ${cpX},${prev.y} ${cpX},${curr.y} ${curr.x},${curr.y}`;
    }
    return d;
  };

  const pathD = buildPath();
  const areaD = `${pathD} L ${points[points.length - 1].x},${H} L ${points[0].x},${H} Z`;

  useEffect(() => {
    const path = pathRef.current;
    const container = containerRef.current;
    if (!path || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            const length = path.getTotalLength();
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
            gsap.to(path, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut' });

            // Area fade in after line draws
            gsap.fromTo(areaRef.current, { opacity: 0 }, { opacity: 1, duration: 1, delay: 1.2 });

            // Dots pop in staggered
            gsap.fromTo(
              dotsRef.current,
              { scale: 0, transformOrigin: 'center', opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.4, stagger: 0.12, delay: 1.5, ease: 'back.out(2)' }
            );

            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [pathD]);

  const handleDotHover = (idx: number, e: React.MouseEvent<SVGCircleElement>) => {
    setHoverIndex(idx);
    const svg = (e.target as SVGCircleElement).closest('svg');
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = ((points[idx].x / W) * rect.width) + rect.left;
    const y = ((points[idx].y / H) * rect.height) + rect.top;
    setTooltipPos({ x, y });

    gsap.to(e.target, { r: 9, duration: 0.2, ease: 'power2.out' });
  };

  const handleDotLeave = (e: React.MouseEvent<SVGCircleElement>) => {
    setHoverIndex(null);
    gsap.to(e.target, { r: 5, duration: 0.3, ease: 'elastic.out(1, 0.5)' });
  };

  return (
    <div ref={containerRef} className="relative w-full space-y-3">
      <div className="relative bg-[#FAFBFD] rounded-2xl p-5 border border-[#E8EAE8]">
        <svg className="w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="lineAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7342E2" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#7342E2" stopOpacity={0.0} />
            </linearGradient>
            <filter id="dotGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          {[0.25, 0.5, 0.75, 1].map((t) => (
            <line
              key={t}
              x1={PAD}
              y1={PAD + t * (H - PAD * 2)}
              x2={W - PAD}
              y2={PAD + t * (H - PAD * 2)}
              stroke="#E8EAE8"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}

          {/* Area fill — fades in */}
          <path ref={areaRef} d={areaD} fill="url(#lineAreaGradient)" opacity={0} />

          {/* Animated line */}
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="#7342E2"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Hover vertical line */}
          {hoverIndex !== null && (
            <line
              x1={points[hoverIndex].x}
              y1={PAD}
              x2={points[hoverIndex].x}
              y2={H - PAD}
              stroke="#7342E2"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity={0.5}
            />
          )}

          {/* Dots — pop in */}
          {points.map((p, idx) => (
            <circle
              key={idx}
              ref={(el) => { if (el) dotsRef.current[idx] = el; }}
              cx={p.x}
              cy={p.y}
              r={5}
              fill={hoverIndex === idx ? '#7342E2' : '#fff'}
              stroke="#7342E2"
              strokeWidth="2.5"
              opacity={0}
              style={{ cursor: 'pointer', filter: hoverIndex === idx ? 'url(#dotGlow)' : 'none' }}
              onMouseEnter={(e) => handleDotHover(idx, e)}
              onMouseLeave={handleDotLeave}
            />
          ))}
        </svg>

        {/* Floating Tooltip */}
        {hoverIndex !== null && (
          <div
            className="fixed z-50 pointer-events-none bg-[#192837] text-white px-3.5 py-2 rounded-xl text-xs shadow-xl border border-[#7342E2]/30"
            style={{ left: tooltipPos.x + 12, top: tooltipPos.y - 40 }}
          >
            <div className="text-[#7342E2] font-bold font-mono">{points[hoverIndex].d.date}</div>
            <div className="font-mono font-semibold">₹{points[hoverIndex].d.score.toLocaleString()} Cr</div>
          </div>
        )}
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between px-5 text-[11px] text-[#192837]/45 font-mono">
        {data.map((d) => (
          <span key={d.date}>{d.date}</span>
        ))}
      </div>
    </div>
  );
};
