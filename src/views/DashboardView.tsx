import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExecutiveView } from './ExecutiveView';
import { TechnicalView } from './TechnicalView';
import { InvestmentOptimizerView } from './InvestmentOptimizerView';
import { ComplianceView } from './ComplianceView';
import { VaultTab } from './VaultTab';
import type { NavigationTab } from '../types/riskforge';
import { BarChart2, Cpu, Sliders, ShieldCheck, Key, Shield } from 'lucide-react';

interface DashboardViewProps {
  initialTab?: NavigationTab;
  onReturnToHome?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ 
  initialTab = 'executive',
  onReturnToHome 
}) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>(initialTab);

  const tabs = [
    { id: 'executive', label: 'Executive View', icon: BarChart2 },
    { id: 'technical', label: 'Technical View', icon: Cpu },
    { id: 'optimizer', label: 'Investment Optimizer', icon: Sliders },
    { id: 'compliance', label: 'Compliance Mapping', icon: ShieldCheck },
    { id: 'vault', label: 'Secrets Vault', icon: Key },
  ];

  return (
    <div className="min-h-screen bg-[#F6F7F4] text-[#18211D] flex flex-col font-sans antialiased">
      {/* Platform Dashboard Navbar */}
      <header className="bg-white border-b border-[#E2E6E2] sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div 
              onClick={onReturnToHome}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="28" 
                height="28" 
                fill="none" 
                overflow="visible" 
                viewBox="0 0 256 256"
              >
                <path 
                  d="M 64 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 L 128 64 L 128 64.5 L 161 32 L 192 0 L 256 0 L 256 64 L 192 128 L 128 128 L 128 192 L 96 223 L 63.5 256 L 0 256 L 0 192 Z M 256 192 L 224 223 L 191.5 256 L 128 256 L 128 192 L 192 128 L 256 128 Z" 
                  fill="#192837"
                />
              </svg>
              <span style={{ fontFamily: 'var(--font-heading)' }} className="text-lg font-bold tracking-tight text-[#192837]">
                CyberRisk Quant
              </span>
            </div>

            {/* Live Indicator Chip */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7F5EE] border border-[#3D9B72]/20 text-xs font-bold text-[#3D9B72]">
              <span className="w-2 h-2 rounded-full bg-[#3D9B72] animate-pulse" />
              <span>Engine Active • ₹4,264.95 Cr Live Exposure</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 bg-[#EEF0EC] p-1 rounded-xl border border-[#E2E6E2]">
            {tabs.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as NavigationTab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#7342E2] shadow-xs'
                      : 'text-[#18211D]/70 hover:text-[#18211D]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Return Home */}
          <button
            onClick={onReturnToHome}
            className="text-xs font-semibold text-[#18211D]/70 hover:text-[#7342E2] cursor-pointer"
          >
            ← Return to Home
          </button>
        </div>
      </header>

      {/* Main Content Area with AnimatePresence Tab Transitions */}
      <main className="flex-1 p-6 sm:p-8 max-w-[1600px] w-full mx-auto space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === 'executive' && <ExecutiveView />}
            {activeTab === 'technical' && <TechnicalView />}
            {activeTab === 'optimizer' && <InvestmentOptimizerView />}
            {activeTab === 'compliance' && <ComplianceView />}
            {activeTab === 'vault' && <VaultTab />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Governance Footer */}
      <footer className="py-4 border-t border-[#E2E6E2] text-center text-xs text-[#929B96] bg-white">
        CyberRisk Quant Platform • FAIR Loss Engine • ISO 27001 / NIST / RBI / SEBI Aligned
      </footer>
    </div>
  );
};
