import React from 'react';
import { 
  LayoutDashboard, Activity, ShieldCheck, Server, AlertTriangle, 
  Building2, Sliders, Sparkles, Shield
} from 'lucide-react';
import type { NavigationTab } from '../types/riskforge';

interface SidebarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'executive', label: 'Risk Command Center', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'monte-carlo', label: 'Monte Carlo Simulation', icon: <Activity className="w-4 h-4" /> },
    { id: 'compliance', label: 'Compliance Command', icon: <ShieldCheck className="w-4 h-4" />, badge: '5 Frameworks' },
    { id: 'assets', label: 'Asset Intelligence', icon: <Server className="w-4 h-4" />, badge: '150 Assets' },
    { id: 'vulnerabilities', label: 'Vulnerabilities', icon: <AlertTriangle className="w-4 h-4" />, badge: '303 Open' },
    { id: 'business-units', label: 'Business Units', icon: <Building2 className="w-4 h-4" /> },
    { id: 'remediation', label: 'Remediation Optimizer', icon: <Sliders className="w-4 h-4" />, badge: '₹5 Cr' },
    { id: 'ai-console', label: 'Ask RiskForge AI', icon: <Sparkles className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#FBFCFA] border-r border-[#E2E6E2] flex flex-col justify-between p-4 shrink-0 select-none">
      <div>
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-3 py-3 mb-6 border-b border-[#E2E6E2]">
          <div className="w-8 h-8 rounded-lg bg-[#18211D] flex items-center justify-center text-white shadow-sm">
            <Shield className="w-5 h-5 fill-[#FBFCFA]" />
          </div>
          <div>
            <h1 className="font-extrabold text-sm tracking-widest text-[#18211D]">
              RISKFORGE
            </h1>
            <span className="text-[10px] text-[#929B96] font-semibold uppercase tracking-wider block -mt-0.5">
              Enterprise Risk & GRC
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#929B96] px-3 py-2">
            Navigation
          </p>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full relative flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#EEEBFF] text-[#6E5AE6] font-semibold'
                    : 'text-[#66716B] hover:bg-[#F0F2EF] hover:text-[#18211D]'
                }`}
              >
                {/* Active Indicator bar: 4px x 20px #6E5AE6 */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-[20px] bg-[#6E5AE6] rounded-full" />
                )}

                <div className="flex items-center gap-3 pl-1">
                  <span className={isActive ? 'text-[#6E5AE6]' : 'text-[#66716B]'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                    isActive ? 'bg-[#6E5AE6]/15 text-[#6E5AE6]' : 'bg-[#EEF0EC] text-[#66716B]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile / Version info */}
      <div className="pt-4 border-t border-[#E2E6E2] px-2">
        <div className="bg-[#FFFFFF] border border-[#E2E6E2] p-3 rounded-xl flex items-center gap-3 shadow-xs">
          <div className="w-8 h-8 rounded-full bg-[#EEEBFF] text-[#6E5AE6] font-bold text-xs flex items-center justify-center">
            CR
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-semibold text-[#18211D] truncate">Chief Risk Officer</h4>
            <p className="text-[10px] text-[#929B96] truncate">cro@enterprise.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
