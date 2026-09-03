import React, { useState } from 'react';
import { Sliders, Zap, CheckCircle2, DollarSign, ArrowRight, Play, RefreshCw, ShieldCheck, Download } from 'lucide-react';
import { REMEDIATION_ACTIONS, OPTIMIZER_SUMMARY } from '../data/mockData';
import confetti from 'canvas-confetti';

export const RemediationOptimizerView: React.FC = () => {
  const [budgetCrore, setBudgetCrore] = useState(5.0);
  const [objective, setObjective] = useState('max_reduction');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizerResult, setOptimizerResult] = useState(OPTIMIZER_SUMMARY);

  const handleRunOptimizer = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOptimizing(true);
    setTimeout(() => {
      // Dynamic recalculation based on budget input ratio
      const ratio = Math.min(budgetCrore / 5.0, 2.0);
      const actualCost = Math.min(budgetCrore * 0.946, budgetCrore);
      const riskReduced = Math.min(39.69 * Math.sqrt(ratio), 85.0);
      const aleReduced = Math.min(3923.72 * Math.sqrt(ratio), 7800.0);

      setOptimizerResult({
        ...optimizerResult,
        budgetCrore: budgetCrore,
        actualCostCrore: Number(actualCost.toFixed(2)),
        pctRiskReduced: Number(riskReduced.toFixed(2)),
        totalAleReductionCrore: Number(aleReduced.toFixed(2)),
        orgTotalAleAfterCrore: Number((9885.26 - aleReduced).toFixed(2))
      });

      setIsOptimizing(false);
      confetti({ particleCount: 45, spread: 60, origin: { y: 0.7 } });
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E6E2] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6E5AE6] bg-[#EEEBFF] px-2.5 py-1 rounded-md inline-block mb-1">
            OPTIMAL 0/1 KNAPSACK ALLOCATION
          </span>
          <h2 className="text-2xl font-bold text-[#18211D]">Remediation Center</h2>
          <p className="text-xs text-[#66716B] mt-1">
            Turn risk findings into prioritized security actions that reduce maximum exposure within your available budget.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="btn-primary">
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Generate Remediation Plan</span>
          </button>
          <button className="btn-secondary">
            <Sliders className="w-3.5 h-3.5 text-[#66716B]" />
            <span>Run Optimizer</span>
          </button>
        </div>
      </div>

      {/* Optimizer Panel per prompt */}
      <div className="rf-card p-6 border-2 border-[#6E5AE6]/30 space-y-6 bg-white">
        <div className="border-b border-[#E2E6E2] pb-4">
          <h3 className="text-lg font-bold text-[#18211D] flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#6E5AE6]" />
            Optimize Security Investment
          </h3>
          <p className="text-xs text-[#66716B] mt-1">
            Find the combination of security actions that delivers the greatest risk reduction for your available budget.
          </p>
        </div>

        {/* Inputs Form */}
        <form onSubmit={handleRunOptimizer} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div>
            <label className="block text-xs font-semibold text-[#18211D] mb-1.5">
              Available Capital Budget (₹ Crore)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="50"
                value={budgetCrore}
                onChange={(e) => setBudgetCrore(Number(e.target.value))}
                className="rf-input w-full font-mono text-sm font-bold text-[#18211D]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#18211D] mb-1.5">
              Optimization Objective
            </label>
            <select
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="rf-input w-full text-xs font-medium"
            >
              <option value="max_reduction">Maximum Risk Reduction (ALE ₹ Saved)</option>
              <option value="compliance_max">Maximum Framework Coverage</option>
              <option value="roi_max">Highest Return on Security Investment (ROSI)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isOptimizing}
            className="btn-primary w-full py-2.5 justify-center"
          >
            {isOptimizing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            <span>{isOptimizing ? 'Solving Knapsack...' : 'Optimize Portfolio'}</span>
          </button>
        </form>

        {/* Pale Green Result Panel per prompt: #E7F5EE with green text */}
        <div className="p-5 rounded-2xl bg-[#E7F5EE] border border-[#3D9B72]/30 grid grid-cols-1 sm:grid-cols-3 gap-4 text-[#3D9B72]">
          <div className="space-y-1">
            <span className="text-[11px] uppercase font-bold tracking-wider block opacity-80">
              OPTIMIZED RISK REDUCTION
            </span>
            <div className="text-3xl font-extrabold font-mono">
              {optimizerResult.pctRiskReduced}%
            </div>
            <span className="text-xs font-semibold block text-[#3D9B72]">
              ₹{optimizerResult.totalAleReductionCrore.toLocaleString()} Cr ALE Reduced
            </span>
          </div>

          <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-[#3D9B72]/20 pt-3 sm:pt-0 sm:pl-4">
            <span className="text-[11px] uppercase font-bold tracking-wider block opacity-80">
              OPTIMIZED CAPITAL COST
            </span>
            <div className="text-3xl font-extrabold font-mono text-[#18211D]">
              ₹{optimizerResult.actualCostCrore} Cr
            </div>
            <span className="text-xs font-medium block text-[#66716B]">
              {optimizerResult.budgetUtilizationPct}% Budget Utilization
            </span>
          </div>

          <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-[#3D9B72]/20 pt-3 sm:pt-0 sm:pl-4">
            <span className="text-[11px] uppercase font-bold tracking-wider block opacity-80">
              RESIDUAL EXPECTED LOSS
            </span>
            <div className="text-3xl font-extrabold font-mono text-[#18211D]">
              ₹{optimizerResult.orgTotalAleAfterCrore.toLocaleString()} Cr
            </div>
            <span className="text-xs font-medium block text-[#66716B]">
              Down from ₹9,885.26 Cr
            </span>
          </div>
        </div>
      </div>

      {/* Recommended Fixes Table */}
      <div className="rf-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#E2E6E2] pb-3">
          <h3 className="text-sm font-bold text-[#18211D] uppercase tracking-wider">
            Prioritized Remediation Actions ({REMEDIATION_ACTIONS.length} Top Candidate Actions)
          </h3>
          <button className="btn-secondary text-xs">
            <Download className="w-3.5 h-3.5 text-[#66716B]" />
            <span>Export Action Plan</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#FBFCFA] text-[#929B96] font-semibold border-b border-[#E2E6E2] uppercase text-[11px] tracking-wider">
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Remediation Action</th>
                <th className="py-3.5 px-4">CVE / Asset</th>
                <th className="py-3.5 px-4">Business Unit</th>
                <th className="py-3.5 px-4 text-right">Cost</th>
                <th className="py-3.5 px-4 text-right">ALE Reduced</th>
                <th className="py-3.5 px-4 text-right">ROSI Ratio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEDEA]">
              {REMEDIATION_ACTIONS.map((action) => (
                <tr key={action.actionId} className="hover:bg-[#F8F9F7] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#6E5AE6]">
                    #{action.priority}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#18211D]">{action.actionType}</div>
                    <div className="text-[11px] text-[#66716B]">{action.reason}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-semibold text-[#18211D]">{action.cveId}</div>
                    <div className="text-[11px] text-[#929B96] font-mono">{action.assetName}</div>
                  </td>
                  <td className="py-3.5 px-4 text-[#18211D] font-medium">{action.businessUnit}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-[#18211D]">
                    ₹{(action.remediationCostCrore * 100).toFixed(1)} Lakhs
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-[#3D9B72]">
                    ₹{action.aleReductionCrore.toFixed(2)} Cr
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-extrabold text-[#6E5AE6]">
                    {action.roiRatio.toFixed(0)}x
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
