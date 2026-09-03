import React, { useState } from 'react';
import { AlertTriangle, Search, Filter, ShieldAlert, Zap, ExternalLink, Download } from 'lucide-react';
import { VULNERABILITY_ITEMS } from '../data/mockData';
import type { VulnerabilityItem, RiskSeverity } from '../types/riskforge';

export const VulnerabilitiesView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sevFilter, setSevFilter] = useState('all');

  const filteredVulns = VULNERABILITY_ITEMS.filter((v) => {
    if (sevFilter !== 'all' && v.severity !== sevFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        v.title.toLowerCase().includes(q) ||
        v.cveId.toLowerCase().includes(q) ||
        v.assetName.toLowerCase().includes(q) ||
        v.businessUnit.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getSeverityBadge = (sev: RiskSeverity) => {
    switch (sev) {
      case 'CRITICAL':
        return <span className="bg-[#F9E5E8] text-[#C94B59] font-bold px-2.5 py-1 rounded-full text-[10px]">CRITICAL</span>;
      case 'HIGH':
        return <span className="bg-[#FBEAE7] text-[#D96B5F] font-bold px-2.5 py-1 rounded-full text-[10px]">HIGH</span>;
      case 'MODERATE':
      case 'MEDIUM':
        return <span className="bg-[#FFF4DD] text-[#C58A35] font-bold px-2.5 py-1 rounded-full text-[10px]">MEDIUM</span>;
      default:
        return <span className="bg-[#E7F5EE] text-[#3D9B72] font-bold px-2.5 py-1 rounded-full text-[10px]">LOW</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E6E2] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6E5AE6] bg-[#EEEBFF] px-2.5 py-1 rounded-md inline-block mb-1">
            THREAT & VULNERABILITY RISK RATINGS
          </span>
          <h2 className="text-2xl font-bold text-[#18211D]">Vulnerability Intelligence</h2>
          <p className="text-xs text-[#66716B] mt-1">
            Prioritize vulnerabilities using severity, exploitability, asset criticality, and financial impact.
          </p>
        </div>

        <button className="btn-secondary text-xs">
          <Download className="w-3.5 h-3.5 text-[#66716B]" />
          <span>Export Vuln Scan CSV</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E6E2] shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-[240px]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#929B96]" />
            <input
              type="text"
              placeholder="Search CVE, title, asset name, or business unit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rf-input w-full pl-9"
            />
          </div>

          <select
            value={sevFilter}
            onChange={(e) => setSevFilter(e.target.value)}
            className="rf-input text-xs"
          >
            <option value="all">All Severities</option>
            <option value="CRITICAL">CRITICAL</option>
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
          </select>
        </div>

        <span className="text-xs text-[#66716B] font-semibold">
          303 Critical & High Severity Findings
        </span>
      </div>

      {/* Vulnerabilities Table */}
      <div className="bg-white border border-[#E2E6E2] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#FBFCFA] text-[#929B96] font-semibold border-b border-[#E2E6E2] uppercase text-[11px] tracking-wider">
                <th className="py-3.5 px-4">CVE ID / Description</th>
                <th className="py-3.5 px-4 text-center">Severity</th>
                <th className="py-3.5 px-4 text-center">CVSS Score</th>
                <th className="py-3.5 px-4">Target Asset</th>
                <th className="py-3.5 px-4">Business Unit</th>
                <th className="py-3.5 px-4 text-center">Exploitability</th>
                <th className="py-3.5 px-4 text-right">Financial Exposure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEDEA]">
              {filteredVulns.map((v) => (
                <tr key={v.id} className="hover:bg-[#F8F9F7] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#18211D] flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#D96B5F]" />
                      {v.title}
                    </div>
                    <div className="text-[11px] font-mono text-[#6E5AE6] pl-5">{v.cveId}</div>
                  </td>
                  <td className="py-3.5 px-4 text-center">{getSeverityBadge(v.severity)}</td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-[#18211D]">{v.cvssScore.toFixed(1)}</td>
                  <td className="py-3.5 px-4 font-mono text-[#66716B]">{v.assetName}</td>
                  <td className="py-3.5 px-4 text-[#18211D] font-medium">{v.businessUnit}</td>
                  <td className="py-3.5 px-4 text-center">
                    {v.exploitAvailable ? (
                      <span className="bg-[#FBEAE7] text-[#D96B5F] font-semibold text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        <Zap className="w-3 h-3" /> Wild Exploit Active
                      </span>
                    ) : (
                      <span className="bg-[#EEF0EC] text-[#66716B] text-[10px] px-2 py-0.5 rounded-full">
                        PoC Only
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-[#C94B59]">
                    ₹{v.financialExposureCrore.toFixed(2)} Cr
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
