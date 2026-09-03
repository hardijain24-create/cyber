import React from 'react';
import { Building2, AlertTriangle, ShieldCheck, Server, ChevronRight } from 'lucide-react';
import { BUSINESS_UNITS } from '../data/mockData';

export const BusinessUnitsView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E6E2] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6E5AE6] bg-[#EEEBFF] px-2.5 py-1 rounded-md inline-block mb-1">
            ENTERPRISE RISK CONCENTRATION
          </span>
          <h2 className="text-2xl font-bold text-[#18211D]">Business Unit Risk</h2>
          <p className="text-xs text-[#66716B] mt-1">
            Compare cyber exposure across business functions and identify where risk is concentrated.
          </p>
        </div>
      </div>

      {/* Grid of Business Unit Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {BUSINESS_UNITS.map((bu) => {
          // Highest risk unit gets subtle pale red border per prompt rule
          const isHighestRisk = bu.name === 'Payments';

          return (
            <div
              key={bu.id}
              className={`rf-card p-5 space-y-4 flex flex-col justify-between transition-all ${
                isHighestRisk
                  ? 'border-2 border-[#D96B5F]/40 bg-[#FBFCFA]'
                  : 'bg-white border-[#E2E6E2]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#E2E6E2] pb-3 mb-3">
                  <span className="text-xs font-bold text-[#18211D] flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#6E5AE6]" />
                    {bu.name}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    bu.severity === 'CRITICAL' ? 'badge-critical' :
                    bu.severity === 'HIGH' ? 'badge-high' :
                    bu.severity === 'MODERATE' ? 'badge-moderate' : 'badge-low'
                  }`}>
                    Risk Score {bu.riskScore}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-[11px] text-[#929B96] uppercase font-semibold">EXPECTED LOSS EXPOSURE</p>
                  <p className="text-2xl font-bold text-[#18211D]">₹{bu.expectedAnnualLossCrore.toLocaleString()} Cr</p>
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-[#E2E6E2]">
                <div className="bg-[#FBFCFA] p-2 rounded-lg border border-[#E2E6E2]">
                  <span className="text-[10px] text-[#929B96] block font-sans">Open Findings</span>
                  <span className="font-bold text-[#18211D]">{bu.findingsCount} Vulns</span>
                </div>

                <div className="bg-[#FBFCFA] p-2 rounded-lg border border-[#E2E6E2]">
                  <span className="text-[10px] text-[#929B96] block font-sans">Compliance</span>
                  <span className="font-bold text-[#3D9B72]">{bu.compliancePct}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
