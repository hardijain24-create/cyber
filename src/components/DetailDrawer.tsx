import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Server, ShieldCheck, AlertTriangle, Globe, Lock, Cpu } from 'lucide-react';
import type { AssetRiskItem } from '../types/riskforge';

interface DetailDrawerProps {
  asset: AssetRiskItem | null;
  onClose: () => void;
}

export const DetailDrawer: React.FC<DetailDrawerProps> = ({ asset, onClose }) => {
  if (!asset) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Soft Backdrop: rgba(24,33,29,0.18) per prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#18211D]/18 backdrop-blur-xs"
        />

        {/* Drawer per prompt specs */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-md h-full bg-white border-l border-[#E2E6E2] shadow-[-12px_0_40px_rgba(24,33,29,0.08)] p-6 overflow-y-auto flex flex-col justify-between"
        >
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#E2E6E2]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EEEBFF] border border-[#6E5AE6]/30 flex items-center justify-center text-[#6E5AE6]">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#18211D]">{asset.name}</h3>
                  <p className="text-xs text-[#929B96] font-mono">{asset.id} • {asset.type}</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1 text-[#66716B] hover:text-[#18211D] hover:bg-[#F0F2EF] rounded-lg cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Section 1: Quantitative Loss Metrics */}
            <div className="space-y-3 pb-5 border-b border-[#E2E6E2]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#929B96]">
                Quantitative Risk Exposure
              </h4>

              <div className="p-4 rounded-xl bg-[#FBFCFA] border border-[#E2E6E2] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#929B96] font-medium block">EXPECTED ANNUAL LOSS</span>
                  <span className="text-2xl font-bold font-mono text-[#C94B59]">
                    ₹{asset.expectedAnnualLossCrore.toFixed(2)} Cr
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#929B96] font-medium block">RISK RATING</span>
                  <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${
                    asset.severity === 'CRITICAL' ? 'badge-critical' : 'badge-high'
                  }`}>
                    Score {asset.riskScore} ({asset.severity})
                  </span>
                </div>
              </div>
            </div>

            {/* Section 2: Technical Specifications */}
            <div className="space-y-3 pb-5 border-b border-[#E2E6E2]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#929B96]">
                Asset Attributes & Governance
              </h4>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#FBFCFA] border border-[#E2E6E2]">
                  <span className="text-[#929B96] text-[10px] block font-medium">Business Unit</span>
                  <span className="font-semibold text-[#18211D]">{asset.businessUnit}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#FBFCFA] border border-[#E2E6E2]">
                  <span className="text-[#929B96] text-[10px] block font-medium">Data Sensitivity</span>
                  <span className="font-semibold text-[#18211D]">{asset.dataSensitivity}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#FBFCFA] border border-[#E2E6E2]">
                  <span className="text-[#929B96] text-[10px] block font-medium">Network Perimeter</span>
                  <span className="font-semibold text-[#18211D]">
                    {asset.internetFacing ? 'Internet-Facing' : 'Internal Airgap'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#FBFCFA] border border-[#E2E6E2]">
                  <span className="text-[#929B96] text-[10px] block font-medium">Stored Records</span>
                  <span className="font-mono font-semibold text-[#18211D]">
                    {asset.recordsStored.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Section 3: Control Effectiveness */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#929B96]">
                Security Control Posture
              </h4>

              <div className="p-4 rounded-xl bg-[#FBFCFA] border border-[#E2E6E2] space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-[#66716B]">Mitigating Control Effectiveness</span>
                  <span className="font-bold text-[#6E5AE6]">{asset.controlEffectivenessPct}%</span>
                </div>
                <div className="w-full h-2 bg-[#E7EAE7] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#6E5AE6] rounded-full"
                    style={{ width: `${asset.controlEffectivenessPct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#E2E6E2] flex items-center gap-3">
            <button onClick={onClose} className="btn-secondary w-full justify-center text-xs">
              Close Inspection
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
