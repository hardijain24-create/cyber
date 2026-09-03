import React, { useState } from 'react';
import { Activity, RefreshCw } from 'lucide-react';
import { MONTE_CARLO_PERCENTILES } from '../data/mockData';

export const MonteCarloView: React.FC = () => {
  const [numIterations, setNumIterations] = useState(100000);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E6E2] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6E5AE6] bg-[#EEEBFF] px-2.5 py-1 rounded-md inline-block mb-1">
            STOCHASTIC LOSS MODELING
          </span>
          <h2 className="text-2xl font-bold text-[#18211D]">Monte Carlo Loss Simulation Engine</h2>
          <p className="text-xs text-[#66716B] mt-1">
            Simulate 100,000+ stochastic cyber incident scenarios using lognormal event frequency and heavy-tailed loss severity distributions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="btn-primary shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Running 100k Trials...' : 'Run Simulation'}</span>
          </button>
        </div>
      </div>

      {/* Main Simulation Card */}
      <div className="rf-card p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E2E6E2] pb-4 gap-4">
          <div>
            <h3 className="text-base font-bold text-[#18211D]">Annualized Loss Distribution Curve</h3>
            <p className="text-xs text-[#66716B]">Probability distribution of annual aggregate loss (₹ Crore)</p>
          </div>

          {/* Prompt Required Legend */}
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#6E5AE6]" />
              <span className="text-[#18211D]">Expected Loss (₹9,885.26 Cr)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#C58A35]" />
              <span className="text-[#18211D]">95% VaR (₹12,928.33 Cr)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#C94B59]" />
              <span className="text-[#18211D]">99% VaR (₹13,980.28 Cr)</span>
            </div>
          </div>
        </div>

        {/* Clean Custom SVG Distribution Chart with exact prompt colors */}
        <div className="h-80 w-full relative pt-2">
          <svg className="w-full h-full" viewBox="0 0 800 240" preserveAspectRatio="none">
            <defs>
              <linearGradient id="distGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6E5AE6" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#EEEBFF" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            {/* Grid lines #E9ECE9 */}
            <line x1="0" y1="50" x2="800" y2="50" stroke="#E9ECE9" strokeWidth="1" />
            <line x1="0" y1="110" x2="800" y2="110" stroke="#E9ECE9" strokeWidth="1" />
            <line x1="0" y1="170" x2="800" y2="170" stroke="#E9ECE9" strokeWidth="1" />
            <line x1="0" y1="230" x2="800" y2="230" stroke="#E9ECE9" strokeWidth="1" />

            {/* Bell Curve Area Fill */}
            <path
              d="M 0,230 Q 150,220 300,140 Q 400,20 480,30 Q 600,120 700,210 Q 750,225 800,230 L 800,230 L 0,230 Z"
              fill="url(#distGradient)"
            />

            {/* Distribution Curve Line #6E5AE6 */}
            <path
              d="M 0,230 Q 150,220 300,140 Q 400,20 480,30 Q 600,120 700,210 Q 750,225 800,230"
              fill="none"
              stroke="#6E5AE6"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Expected Loss Marker (Primary #6E5AE6) */}
            <line x1="440" y1="10" x2="440" y2="230" stroke="#6E5AE6" strokeWidth="2" strokeDasharray="4 4" />
            <text x="445" y="40" fill="#6E5AE6" fontSize="11" fontWeight="bold" fontFamily="monospace">
              Expected Loss: ₹9,885.26 Cr
            </text>

            {/* 95% VaR Marker (#C58A35) */}
            <line x1="620" y1="10" x2="620" y2="230" stroke="#C58A35" strokeWidth="2" strokeDasharray="4 4" />
            <text x="625" y="80" fill="#C58A35" fontSize="11" fontWeight="bold" fontFamily="monospace">
              95% VaR: ₹12,928.33 Cr
            </text>

            {/* 99% VaR Marker (#C94B59) */}
            <line x1="710" y1="10" x2="710" y2="230" stroke="#C94B59" strokeWidth="2.5" />
            <text x="715" y="120" fill="#C94B59" fontSize="11" fontWeight="bold" fontFamily="monospace">
              99% VaR: ₹13,980.28 Cr
            </text>
          </svg>

          <div className="flex justify-between text-[11px] text-[#929B96] pt-2 font-mono">
            <span>₹2,000 Cr</span>
            <span>₹5,000 Cr</span>
            <span>₹8,000 Cr</span>
            <span>₹9,885 Cr (Mean)</span>
            <span>₹12,928 Cr (95% VaR)</span>
            <span>₹13,980 Cr (99% VaR)</span>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="pt-4 border-t border-[#E2E6E2] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div>
            <div className="flex justify-between text-[#66716B] mb-1 font-medium">
              <span>Trial Iterations</span>
              <span className="text-[#18211D] font-mono font-bold">{numIterations.toLocaleString()} Runs</span>
            </div>
            <input
              type="range"
              min="10000"
              max="500000"
              step="10000"
              value={numIterations}
              onChange={(e) => setNumIterations(Number(e.target.value))}
              className="w-full h-2 bg-[#E7EAE7] rounded-lg appearance-none cursor-pointer accent-[#6E5AE6]"
            />
          </div>

          <div className="p-3 bg-[#FBFCFA] border border-[#E2E6E2] rounded-xl flex items-center justify-between">
            <span className="text-[#66716B] font-medium">95% Confidence VaR Limit</span>
            <span className="font-bold font-mono text-[#C58A35] text-sm">₹12,928.33 Cr</span>
          </div>

          <div className="p-3 bg-[#FBFCFA] border border-[#E2E6E2] rounded-xl flex items-center justify-between">
            <span className="text-[#66716B] font-medium">99% Severe Tail VaR Limit</span>
            <span className="font-bold font-mono text-[#C94B59] text-sm">₹13,980.28 Cr</span>
          </div>
        </div>
      </div>

      {/* Percentiles Table */}
      <div className="rf-card p-6 space-y-4">
        <h3 className="text-sm font-bold text-[#18211D] uppercase tracking-wider">
          Monte Carlo Loss Percentiles Summary
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#FBFCFA] text-[#929B96] font-semibold border-b border-[#E2E6E2] uppercase text-[11px] tracking-wider">
                <th className="py-3.5 px-4">Percentile</th>
                <th className="py-3.5 px-4">Description</th>
                <th className="py-3.5 px-4 text-right">Modeled Annual Loss (₹ Crore)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEDEA]">
              {MONTE_CARLO_PERCENTILES.map((row) => (
                <tr key={row.percentile} className="hover:bg-[#F8F9F7] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#18211D]">{row.percentile}</td>
                  <td className="py-3.5 px-4 text-[#66716B]">{row.label}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-[#18211D]">
                    ₹{row.lossCrore.toLocaleString()} Cr
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
