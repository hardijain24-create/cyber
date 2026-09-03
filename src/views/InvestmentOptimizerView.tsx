import React, { useState } from 'react';
import { Sliders, Zap, CheckCircle2, RefreshCw, ArrowRight } from 'lucide-react';
import { OPTIMIZER_ACTIONS } from '../data/mockData';
import confetti from 'canvas-confetti';

export const InvestmentOptimizerView: React.FC = () => {
  const [budgetInr, setBudgetInr] = useState(10000000); // 1 Crore default
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string>('mfa');

  const handleRunOptimize = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      confetti({ particleCount: 45, spread: 60, origin: { y: 0.7 } });
    }, 600);
  };

  const getScenarioText = () => {
    switch (selectedScenario) {
      case 'mfa':
        return 'Before: ₹4,264.95 Cr → After: ₹3,890.20 Cr (↓ ₹374.75 Cr reduction)';
      case 'delay':
        return 'Before: ₹4,264.95 Cr → After: ₹4,812.30 Cr (↑ ₹547.35 Cr increase in loss exposure)';
      case 'critical':
        return 'Before: ₹4,264.95 Cr → After: ₹2,105.10 Cr (↓ ₹2,159.85 Cr reduction)';
      default:
        return 'Before: ₹4,264.95 Cr → After: ₹3,890.20 Cr (↓ ₹374.75 Cr reduction)';
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Heading & Subheading */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E2E6E2] shadow-xs">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#18211D] bg-[#EEF0EC] px-2.5 py-1 rounded-md inline-block mb-1.5 font-mono">
          0/1 KNAPSACK CAPITAL ALLOCATION
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18211D] tracking-tight">
          Investment Optimization
        </h2>
        <p className="text-xs sm:text-sm text-[#66716B] mt-1 font-medium">
          Find the combination of fixes that reduces the most risk for your budget
        </p>
      </div>

      {/* Input Control Box */}
      <div className="rf-card p-6 bg-white space-y-4">
        <form onSubmit={handleRunOptimize} className="flex flex-col sm:flex-row items-end gap-4 max-w-xl">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-[#18211D] mb-1.5 uppercase tracking-wider">
              Available Security Budget
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-[#18211D]">
                ₹
              </span>
              <input
                type="number"
                step="500000"
                min="1000000"
                value={budgetInr}
                onChange={(e) => setBudgetInr(Number(e.target.value))}
                className="rf-input w-full pl-8 font-mono font-bold text-sm text-[#18211D]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isOptimizing}
            className="btn-primary py-2.5 px-6 bg-[#18211D] hover:bg-[#28352f] shrink-0"
          >
            {isOptimizing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            <span>{isOptimizing ? 'Optimizing...' : 'Optimize'}</span>
          </button>
        </form>
      </div>

      {/* Results Section */}
      <div className="rf-card p-6 space-y-4">
        <div className="border-b border-[#E2E6E2] pb-3">
          <h3 className="text-lg font-bold text-[#18211D]">
            Recommended Actions for ₹1 Crore Budget
          </h3>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#FBFCFA] text-[#929B96] font-semibold border-b border-[#E2E6E2] uppercase text-[11px] tracking-wider">
                <th className="py-3.5 px-4">Recommended Action</th>
                <th className="py-3.5 px-4">Affected Asset(s)</th>
                <th className="py-3.5 px-4 text-right">Cost (₹)</th>
                <th className="py-3.5 px-4 text-right">Risk Reduction (₹ ALE avoided)</th>
                <th className="py-3.5 px-4 text-right">Return on Investment (ROSI %)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEDEA]">
              {OPTIMIZER_ACTIONS.map((item) => (
                <tr key={item.id} className="hover:bg-[#F8F9F7] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#18211D]">{item.action}</td>
                  <td className="py-3.5 px-4 font-mono text-[#66716B]">{item.affectedAssets}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-semibold text-[#18211D]">
                    ₹{item.costInr.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-[#3D9B72]">
                    ₹{item.riskReductionCrore.toFixed(2)} Cr
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-extrabold text-[#18211D]">
                    {item.rosiPct}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Line */}
        <div className="p-4 rounded-xl bg-[#E7F5EE] border border-[#3D9B72]/30 text-xs font-semibold text-[#3D9B72]">
          "These 6 actions cost ₹98,50,000 and reduce your Expected Annual Loss by ₹412.6 Cr — a 9.7x return on investment."
        </div>
      </div>

      {/* Chart: Investment vs. Risk Reduction Curve */}
      <div className="rf-card p-6 space-y-4">
        <div className="border-b border-[#E2E6E2] pb-3">
          <h3 className="text-lg font-bold text-[#18211D]">Investment vs. Risk Reduction Curve</h3>
          <p className="text-xs text-[#66716B]">Cumulative Investment (₹) vs Cumulative Risk Reduced (₹ Crore)</p>
        </div>

        <div className="h-56 w-full relative pt-2">
          <svg className="w-full h-full" viewBox="0 0 600 160" preserveAspectRatio="none">
            <line x1="0" y1="30" x2="600" y2="30" stroke="#E9ECE9" strokeWidth="1" />
            <line x1="0" y1="70" x2="600" y2="70" stroke="#E9ECE9" strokeWidth="1" />
            <line x1="0" y1="110" x2="600" y2="110" stroke="#E9ECE9" strokeWidth="1" />
            <line x1="0" y1="150" x2="600" y2="150" stroke="#E9ECE9" strokeWidth="1" />

            <path
              d="M 0,150 Q 120,40 240,25 Q 360,20 480,18 L 600,18"
              fill="none"
              stroke="#18211D"
              strokeWidth="3"
            />
            {[[0, 150], [120, 40], [240, 25], [360, 20], [480, 18], [600, 18]].map(([x, y], idx) => (
              <circle key={idx} cx={x} cy={y} r="4" fill="#18211D" stroke="#FFFFFF" strokeWidth="2" />
            ))}
          </svg>

          <div className="flex justify-between text-[11px] text-[#929B96] pt-2 font-mono">
            <span>₹0 (₹0 Cr)</span>
            <span>₹50 Lakhs (₹240 Cr)</span>
            <span>₹1 Crore (₹412.6 Cr)</span>
            <span>₹1.2 Crore (Diminishing Return)</span>
            <span>₹2 Crore (Flat)</span>
          </div>
        </div>

        <p className="text-xs text-[#66716B] font-medium pt-2 italic">
          "Notice diminishing returns beyond ₹1.2 Cr — additional spend yields progressively less risk reduction."
        </p>
      </div>

      {/* Scenario Simulator Sub-section */}
      <div className="rf-card p-6 space-y-4">
        <div className="border-b border-[#E2E6E2] pb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#929B96]">
            SCENARIO SIMULATOR
          </span>
          <h3 className="text-lg font-bold text-[#18211D]">What-If Scenarios</h3>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedScenario('mfa')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
              selectedScenario === 'mfa'
                ? 'bg-[#18211D] text-white border-[#18211D]'
                : 'bg-white text-[#18211D] border-[#E2E6E2] hover:bg-[#EEF0EC]'
            }`}
          >
            What if MFA is implemented on all privileged accounts?
          </button>

          <button
            onClick={() => setSelectedScenario('delay')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
              selectedScenario === 'delay'
                ? 'bg-[#18211D] text-white border-[#18211D]'
                : 'bg-white text-[#18211D] border-[#E2E6E2] hover:bg-[#EEF0EC]'
            }`}
          >
            What if remediation is delayed by 30 days?
          </button>

          <button
            onClick={() => setSelectedScenario('critical')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
              selectedScenario === 'critical'
                ? 'bg-[#18211D] text-white border-[#18211D]'
                : 'bg-white text-[#18211D] border-[#E2E6E2] hover:bg-[#EEF0EC]'
            }`}
          >
            What if we patch all Critical severity vulnerabilities?
          </button>
        </div>

        {/* Output */}
        <div className="p-4 rounded-xl bg-[#FBFCFA] border border-[#E2E6E2] font-mono text-xs font-bold text-[#18211D]">
          {getScenarioText()}
        </div>
      </div>
    </div>
  );
};
