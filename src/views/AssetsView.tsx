import React, { useState } from 'react';
import { Server, Search, Filter, ShieldAlert, Globe, Database, HardDrive, Lock } from 'lucide-react';
import { ASSET_ITEMS } from '../data/mockData';
import type { AssetRiskItem, RiskSeverity } from '../types/riskforge';

interface AssetsViewProps {
  onSelectAsset?: (asset: AssetRiskItem) => void;
}

export const AssetsView: React.FC<AssetsViewProps> = ({ onSelectAsset }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [buFilter, setBuFilter] = useState('all');

  const filteredAssets = ASSET_ITEMS.filter((asset) => {
    if (buFilter !== 'all' && asset.businessUnit !== buFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        asset.name.toLowerCase().includes(q) ||
        asset.id.toLowerCase().includes(q) ||
        asset.type.toLowerCase().includes(q) ||
        asset.businessUnit.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getSeverityBadge = (sev: RiskSeverity) => {
    switch (sev) {
      case 'CRITICAL':
        return <span className="badge-critical font-bold px-2.5 py-1 rounded-full text-[10px]">CRITICAL</span>;
      case 'HIGH':
        return <span className="badge-high font-bold px-2.5 py-1 rounded-full text-[10px]">HIGH</span>;
      case 'MODERATE':
        return <span className="badge-moderate font-bold px-2.5 py-1 rounded-full text-[10px]">MODERATE</span>;
      default:
        return <span className="badge-low font-bold px-2.5 py-1 rounded-full text-[10px]">LOW</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E6E2] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6E5AE6] bg-[#EEEBFF] px-2.5 py-1 rounded-md inline-block mb-1">
            CYBER INFRASTRUCTURE INVENTORY
          </span>
          <h2 className="text-2xl font-bold text-[#18211D]">Asset Risk Intelligence</h2>
          <p className="text-xs text-[#66716B] mt-1">
            See which systems contribute most to your organization's cyber exposure.
          </p>
        </div>

        {/* Summary Pills per prompt */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-[#FBFCFA] border border-[#E2E6E2] text-xs font-bold text-[#18211D]">
            150 Assets
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-[#F9E5E8] text-[#C94B59] text-xs font-bold">
            24 Critical
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-[#FBEAE7] text-[#D96B5F] text-xs font-bold">
            47 High Risk
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-[#EEF0EC] text-[#66716B] text-xs font-bold">
            12 Unassessed
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E6E2] shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-[240px]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#929B96]" />
            <input
              type="text"
              placeholder="Search assets by hostname, type, ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rf-input w-full pl-9"
            />
          </div>

          <select
            value={buFilter}
            onChange={(e) => setBuFilter(e.target.value)}
            className="rf-input text-xs"
          >
            <option value="all">All Business Units</option>
            <option value="Payments">Payments</option>
            <option value="Digital Banking">Digital Banking</option>
            <option value="Cards & Loans">Cards & Loans</option>
            <option value="Treasury">Treasury</option>
            <option value="Retail Banking">Retail Banking</option>
          </select>
        </div>

        <span className="text-xs text-[#66716B] font-semibold">
          Showing {filteredAssets.length} System Records
        </span>
      </div>

      {/* Clean Asset Table */}
      <div className="bg-white border border-[#E2E6E2] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#FBFCFA] text-[#929B96] font-semibold border-b border-[#E2E6E2] uppercase text-[11px] tracking-wider">
                <th className="py-3.5 px-4">Asset ID / Hostname</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Business Unit</th>
                <th className="py-3.5 px-4">Data Sensitivity</th>
                <th className="py-3.5 px-4 text-center">Exposure</th>
                <th className="py-3.5 px-4 text-center">Risk Score</th>
                <th className="py-3.5 px-4 text-right">Expected Annual Loss</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEDEA]">
              {filteredAssets.map((asset) => (
                <tr 
                  key={asset.id} 
                  onClick={() => onSelectAsset?.(asset)}
                  className="hover:bg-[#F8F9F7] transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#18211D] flex items-center gap-2">
                      <Server className="w-4 h-4 text-[#6E5AE6]" />
                      {asset.name}
                    </div>
                    <div className="text-[11px] font-mono text-[#929B96] pl-6">{asset.id}</div>
                  </td>
                  <td className="py-3.5 px-4 text-[#66716B] font-medium">{asset.type}</td>
                  <td className="py-3.5 px-4 text-[#18211D] font-medium">{asset.businessUnit}</td>
                  <td className="py-3.5 px-4 text-[#66716B]">
                    <span className="bg-[#EEF0EC] text-[#18211D] px-2 py-0.5 rounded text-[11px] font-mono">
                      {asset.dataSensitivity}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {asset.internetFacing ? (
                      <span className="text-[#D96B5F] font-bold text-[10px] bg-[#FBEAE7] px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        <Globe className="w-3 h-3" /> Internet
                      </span>
                    ) : (
                      <span className="text-[#66716B] text-[10px] bg-[#EEF0EC] px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Internal
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-bold font-mono text-[#18211D]">{asset.riskScore}</span>
                      {getSeverityBadge(asset.severity)}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-[#18211D]">
                    ₹{asset.expectedAnnualLossCrore.toFixed(2)} Cr
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
