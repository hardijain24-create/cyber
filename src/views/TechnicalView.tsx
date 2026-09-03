import React, { useState } from 'react';
import { Cpu, Search, Filter, AlertTriangle, ShieldCheck, BarChart2 } from 'lucide-react';
import { 
  ASSET_RISK_REGISTER, VULNERABILITY_FINDINGS, MODEL_EXPLAINABILITY_FACTORS 
} from '../data/mockData';
import type { RiskSeverity } from '../types/riskforge';

export const TechnicalView: React.FC = () => {
  const [buFilter, setBuFilter] = useState('all');
  const [sevFilter, setSevFilter] = useState('all');
  const [patchFilter, setPatchFilter] = useState('all');

  const filteredAssets = ASSET_RISK_REGISTER.filter((a) => {
    if (buFilter !== 'all' && a.businessUnit !== buFilter) return false;
    return true;
  });

  const filteredVulns = VULNERABILITY_FINDINGS.filter((v) => {
    if (sevFilter !== 'all' && v.severity !== sevFilter) return false;
    if (patchFilter === 'patched' && v.patched !== 'Yes') return false;
    if (patchFilter === 'unpatched' && v.patched !== 'No') return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Page Heading & Subheading */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E2E6E2] shadow-xs">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#18211D] bg-[#EEF0EC] px-2.5 py-1 rounded-md inline-block mb-1.5 font-mono">
          DEEP-DIVE SECURITY ANALYTICS
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18211D] tracking-tight">
          Technical Risk Detail
        </h2>
        <p className="text-xs sm:text-sm text-[#66716B] mt-1 font-medium">
          Asset-level and vulnerability-level findings
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E6E2] shadow-xs flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#18211D]">
          <Filter className="w-4 h-4 text-[#6E5AE6]" />
          <span>Filters:</span>
        </div>

        {/* Business Unit Dropdown */}
        <select
          value={buFilter}
          onChange={(e) => setBuFilter(e.target.value)}
          className="rf-input text-xs"
        >
          <option value="all">Business Unit: All</option>
          <option value="Treasury">Treasury</option>
          <option value="Payments">Payments</option>
          <option value="Digital Banking">Digital Banking</option>
          <option value="Cards & Loans">Cards & Loans</option>
        </select>

        {/* Severity Dropdown */}
        <select
          value={sevFilter}
          onChange={(e) => setSevFilter(e.target.value)}
          className="rf-input text-xs"
        >
          <option value="all">Severity: All</option>
          <option value="CRITICAL">Critical</option>
          <option value="HIGH">High</option>
          <option value="MODERATE">Medium</option>
          <option value="LOW">Low</option>
        </select>

        {/* Patch Status Dropdown */}
        <select
          value={patchFilter}
          onChange={(e) => setPatchFilter(e.target.value)}
          className="rf-input text-xs"
        >
          <option value="all">Patch Status: All</option>
          <option value="unpatched">Unpatched</option>
          <option value="patched">Patched</option>
        </select>
      </div>

      {/* Table 1: Asset Risk Register */}
      <div className="rf-card p-6 space-y-4">
        <h3 className="text-base font-bold text-[#18211D]">Table 1: Asset Risk Register</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#FBFCFA] text-[#929B96] font-semibold border-b border-[#E2E6E2] uppercase text-[11px] tracking-wider">
                <th className="py-3.5 px-4">Asset Name</th>
                <th className="py-3.5 px-4">Business Unit</th>
                <th className="py-3.5 px-4">Asset Type</th>
                <th className="py-3.5 px-4 text-center">Criticality (1-5)</th>
                <th className="py-3.5 px-4 text-right">Likelihood (%)</th>
                <th className="py-3.5 px-4 text-right">Financial Impact (₹)</th>
                <th className="py-3.5 px-4 text-right">Expected Annual Loss (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEDEA]">
              {filteredAssets.map((asset) => (
                <tr key={asset.assetName} className="hover:bg-[#F8F9F7] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#18211D] font-mono">{asset.assetName}</td>
                  <td className="py-3.5 px-4 text-[#66716B] font-medium">{asset.businessUnit}</td>
                  <td className="py-3.5 px-4 text-[#18211D]">{asset.assetType}</td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold">{asset.criticality} / 5</td>
                  <td className="py-3.5 px-4 text-right font-mono font-semibold text-[#6E5AE6]">{asset.likelihoodPct}%</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-[#18211D]">
                    ₹{asset.financialImpactCrore.toFixed(2)} Cr
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-extrabold text-[#18211D]">
                    ₹{asset.expectedAnnualLossCrore.toFixed(2)} Cr
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 2: Vulnerability Findings */}
      <div className="rf-card p-6 space-y-4">
        <h3 className="text-base font-bold text-[#18211D]">Table 2: Vulnerability Findings</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#FBFCFA] text-[#929B96] font-semibold border-b border-[#E2E6E2] uppercase text-[11px] tracking-wider">
                <th className="py-3.5 px-4">CVE ID</th>
                <th className="py-3.5 px-4">Affected Asset</th>
                <th className="py-3.5 px-4 text-center">CVSS Score</th>
                <th className="py-3.5 px-4 text-center">Severity</th>
                <th className="py-3.5 px-4 text-center">Patched?</th>
                <th className="py-3.5 px-4 text-right">Predicted Likelihood (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEDEA]">
              {filteredVulns.map((v) => (
                <tr key={v.cveId + v.affectedAsset} className="hover:bg-[#F8F9F7] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#18211D]">{v.cveId}</td>
                  <td className="py-3.5 px-4 font-mono text-[#66716B]">{v.affectedAsset}</td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold">{v.cvssScore.toFixed(1)}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      v.severity === 'CRITICAL' ? 'badge-critical' : 'badge-high'
                    }`}>
                      {v.severity}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {v.patched === 'Yes' ? (
                      <span className="bg-[#E7F5EE] text-[#3D9B72] px-2 py-0.5 rounded text-[11px] font-bold">Yes</span>
                    ) : (
                      <span className="bg-[#F9E5E8] text-[#C94B59] px-2 py-0.5 rounded text-[11px] font-bold">No</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-[#18211D]">
                    {v.predictedLikelihoodPct}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section: What's Driving the Model? (Model Explainability) */}
      <div className="rf-card p-6 space-y-4">
        <div className="border-b border-[#E2E6E2] pb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#929B96]">
            MODEL EXPLAINABILITY
          </span>
          <h3 className="text-lg font-bold text-[#18211D]">What's Driving the Model?</h3>
          <p className="text-xs text-[#66716B]">Factors Most Influencing Incident Likelihood</p>
        </div>

        <div className="space-y-3">
          {MODEL_EXPLAINABILITY_FACTORS.map((f) => (
            <div key={f.factor} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#18211D]">{f.factor}</span>
                <span className="font-mono text-[#18211D] font-bold">{f.importancePct}%</span>
              </div>
              <div className="w-full h-2.5 bg-[#EEF0EC] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#18211D] rounded-full"
                  style={{ width: `${f.importancePct}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-[#66716B] font-medium pt-2 italic">
          "The model has learned that unpatched, long-exposed, high-severity vulnerabilities on internet-facing assets are the strongest predictors of an incident."
        </p>
      </div>

      {/* Section: Loss Distribution (Monte Carlo Simulation) */}
      <div className="rf-card p-6 space-y-4">
        <div className="border-b border-[#E2E6E2] pb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#929B96]">
            MONTE CARLO LOSS SIMULATION
          </span>
          <h3 className="text-lg font-bold text-[#18211D]">How confident are we in this number?</h3>
          <p className="text-xs text-[#66716B]">Simulated Annual Loss Distribution (20,000 scenarios)</p>
        </div>

        {/* SVG Histogram Curve */}
        <div className="h-64 w-full relative pt-2">
          <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="techDistFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#18211D" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#EEF0EC" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <line x1="0" y1="50" x2="800" y2="50" stroke="#E9ECE9" strokeWidth="1" />
            <line x1="0" y1="100" x2="800" y2="100" stroke="#E9ECE9" strokeWidth="1" />
            <line x1="0" y1="150" x2="800" y2="150" stroke="#E9ECE9" strokeWidth="1" />

            <path
              d="M 0,190 Q 150,180 300,110 Q 400,20 480,30 Q 600,100 700,180 Q 750,185 800,190 L 800,190 L 0,190 Z"
              fill="url(#techDistFill)"
            />
            <path
              d="M 0,190 Q 150,180 300,110 Q 400,20 480,30 Q 600,100 700,180 Q 750,185 800,190"
              fill="none"
              stroke="#18211D"
              strokeWidth="2.5"
            />

            {/* Expected (Average) Marker */}
            <line x1="440" y1="10" x2="440" y2="190" stroke="#18211D" strokeWidth="2" strokeDasharray="4 4" />
            <text x="445" y="40" fill="#18211D" fontSize="11" fontWeight="bold" fontFamily="monospace">
              Expected (Average): ₹4,264.95 Cr
            </text>

            {/* 95% Value at Risk Marker */}
            <line x1="620" y1="10" x2="620" y2="190" stroke="#C58A35" strokeWidth="2" strokeDasharray="4 4" />
            <text x="625" y="80" fill="#C58A35" fontSize="11" fontWeight="bold" fontFamily="monospace">
              95% Value at Risk: ₹6,100.16 Cr
            </text>
          </svg>

          <div className="flex justify-between text-[11px] text-[#929B96] pt-2 font-mono">
            <span>₹1,500 Cr</span>
            <span>₹3,000 Cr</span>
            <span>Expected (Average): ₹4,264.95 Cr</span>
            <span>95% VaR: ₹6,100.16 Cr</span>
            <span>₹8,500 Cr</span>
          </div>
        </div>
      </div>
    </div>
  );
};
