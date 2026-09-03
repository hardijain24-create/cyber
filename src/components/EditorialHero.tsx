import React from 'react';
import { Play, FileText, ArrowRight } from 'lucide-react';

interface EditorialHeroProps {
  onRunAssessment: () => void;
  onViewSummary: () => void;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({ onRunAssessment, onViewSummary }) => {
  return (
    <div className="bg-white border border-[#E2E6E2] rounded-2xl p-6 sm:p-7 shadow-xs relative overflow-hidden mb-6">
      {/* Editorial Compact Header */}
      <div className="max-w-3xl space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#6E5AE6] bg-[#EEEBFF] px-2.5 py-1 rounded-md inline-block">
          ENTERPRISE RISK INTELLIGENCE
        </span>

        <h2 className="text-xl sm:text-2xl font-semibold text-[#18211D] tracking-tight leading-tight">
          Know your risk. Quantify the exposure. Act with confidence.
        </h2>

        <p className="text-xs sm:text-sm text-[#66716B] leading-relaxed max-w-2xl">
          RiskForge combines quantitative cyber-risk analysis, compliance intelligence, and remediation optimization into one enterprise decision platform.
        </p>

        <div className="flex items-center gap-3 pt-2">
          <button onClick={onRunAssessment} className="btn-primary">
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Run Risk Assessment</span>
          </button>

          <button onClick={onViewSummary} className="btn-secondary">
            <FileText className="w-3.5 h-3.5 text-[#66716B]" />
            <span>View Executive Summary</span>
          </button>
        </div>
      </div>

      {/* Subtle right accent graphic */}
      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-[#EEEBFF]/60 rounded-full blur-2xl pointer-events-none" />
    </div>
  );
};
