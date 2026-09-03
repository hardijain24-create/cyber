import React from 'react';
import { AlertCircle } from 'lucide-react';

interface RiskScoreGaugeProps {
  score?: number;
  label?: string;
}

export const RiskScoreGauge: React.FC<RiskScoreGaugeProps> = ({ 
  score = 72, 
  label = 'HIGH' 
}) => {
  const radius = 54;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="rf-card p-6 flex flex-col items-center justify-between text-center h-full">
      <div className="w-full flex items-center justify-between border-b border-[#E2E6E2] pb-3 mb-4">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#929B96]">
          ENTERPRISE RISK SCORE
        </span>
        <span className="badge-high text-[10px] font-bold px-2 py-0.5 rounded-full">
          {label}
        </span>
      </div>

      {/* SVG Circular Gauge */}
      <div className="relative w-40 h-40 flex items-center justify-center my-2">
        <svg className="w-full h-full -rotate-90">
          {/* Gauge Track #E7EAE7 */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#E7EAE7"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Gauge Progress #D96B5F */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#D96B5F"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-[#18211D] tracking-tight">{score}</span>
          <span className="text-[11px] text-[#929B96] font-mono font-medium">/ 100</span>
        </div>
      </div>

      {/* Below Label */}
      <div className="mt-4 pt-3 border-t border-[#E2E6E2] w-full flex items-center justify-center gap-1.5 text-xs text-[#66716B]">
        <AlertCircle className="w-4 h-4 text-[#D96B5F]" />
        <span>Enterprise risk remains elevated</span>
      </div>
    </div>
  );
};
