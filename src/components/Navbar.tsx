import React from 'react';
import { Shield, BarChart2, Cpu, Sliders, ShieldCheck, Key, ArrowLeft } from 'lucide-react';
import type { NavigationTab } from '../types/riskforge';

interface NavbarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  onReturnToHero?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange, onReturnToHero }) => {
  const tabs: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { id: 'executive', label: 'Executive View', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'technical', label: 'Technical View', icon: <Cpu className="w-4 h-4" /> },
    { id: 'optimizer', label: 'Investment Optimizer', icon: <Sliders className="w-4 h-4" /> },
    { id: 'compliance', label: 'Compliance Mapping', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'vault', label: 'Secrets Vault', icon: <Key className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-[#E2E6E2] shadow-xs">
      <div className="max-w-[1600px] mx-auto px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Title, Back to Hero Button, & Tagline */}
        <div className="flex items-center gap-3">
          {onReturnToHero && (
            <button
              onClick={onReturnToHero}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#192837]/5 hover:bg-[#192837]/10 border border-[#192837]/15 text-xs font-semibold text-[#192837] transition-all cursor-pointer mr-1"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#7342E2]" />
              <span>Back to Landing</span>
            </button>
          )}

          {/* Geometric Angular Logo SVG per prompt */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={onReturnToHero}>
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
            <div>
              <div className="flex items-center gap-2">
                <h1 style={{ fontFamily: 'var(--font-heading)' }} className="text-base font-bold text-[#192837] tracking-tight">
                  CyberRisk Quant
                </h1>
                <span className="text-[10px] font-bold bg-[#7342E2] text-white px-2 py-0.5 rounded-full font-mono">
                  ENTERPRISE
                </span>
              </div>
              <p className="text-xs text-[#66716B] font-medium hidden sm:block">
                AI-Powered Cyber Risk Quantification & Credentials Vault
              </p>
            </div>
          </div>
        </div>

        {/* 5 Tabs Bar */}
        <div className="flex items-center gap-1 bg-[#EEF0EC] p-1 rounded-full border border-[#E2E6E2] overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#7342E2] text-white shadow-md shadow-[#7342E2]/25'
                    : 'text-[#66716B] hover:text-[#192837] hover:bg-white/60'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
