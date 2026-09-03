import React, { useState } from 'react';
import { ShieldCheck, Download, Search, FileText } from 'lucide-react';
import { COMPLIANCE_MAPPINGS } from '../data/mockData';
import confetti from 'canvas-confetti';

export const ComplianceView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMappings = COMPLIANCE_MAPPINGS.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.controlName.toLowerCase().includes(q) ||
      item.framework.toLowerCase().includes(q) ||
      item.clause.toLowerCase().includes(q) ||
      item.relatedBusinessUnit.toLowerCase().includes(q)
    );
  });

  const handleExportReport = () => {
    confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Control Name,Framework,Clause,Status,Effectiveness %,Business Unit\n' +
      filteredMappings
        .map(
          (m) =>
            `"${m.controlName}","${m.framework}","${m.clause}","${m.implementationStatus}",${m.effectivenessPct},"${m.relatedBusinessUnit}"`
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'CyberRiskQuant_Compliance_Report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Page Heading & Subheading */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E2E6E2] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#18211D] bg-[#EEF0EC] px-2.5 py-1 rounded-md inline-block mb-1.5 font-mono">
            REGULATORY GOVERNANCE MAPPING
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18211D] tracking-tight">
            Regulatory & Framework Alignment
          </h2>
          <p className="text-xs sm:text-sm text-[#66716B] mt-1 font-medium">
            How your findings map to ISO 27001, NIST CSF, CIS Controls, RBI CSF, and SEBI CSCRF
          </p>
        </div>

        {/* Button: Export Compliance Report */}
        <button
          onClick={handleExportReport}
          className="btn-primary py-2.5 px-5 bg-[#18211D] hover:bg-[#28352f] shrink-0 cursor-pointer"
        >
          <Download className="w-4 h-4 text-white" />
          <span>Export Compliance Report</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E6E2] shadow-xs flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#929B96]" />
          <input
            type="text"
            placeholder="Search control name, framework, clause..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rf-input w-full pl-9 text-xs"
          />
        </div>

        <span className="text-xs font-semibold text-[#66716B]">
          Showing {filteredMappings.length} Governance Controls
        </span>
      </div>

      {/* Compliance Mapping Table */}
      <div className="rf-card p-6 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#FBFCFA] text-[#929B96] font-semibold border-b border-[#E2E6E2] uppercase text-[11px] tracking-wider">
                <th className="py-3.5 px-4">Control Name</th>
                <th className="py-3.5 px-4">Framework</th>
                <th className="py-3.5 px-4">Framework Clause/Reference</th>
                <th className="py-3.5 px-4">Implementation Status</th>
                <th className="py-3.5 px-4 text-right">Effectiveness (%)</th>
                <th className="py-3.5 px-4">Related Business Unit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEDEA]">
              {filteredMappings.map((item) => (
                <tr key={item.controlName + item.clause} className="hover:bg-[#F8F9F7] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#18211D]">{item.controlName}</td>
                  <td className="py-3.5 px-4 text-[#18211D] font-medium">{item.framework}</td>
                  <td className="py-3.5 px-4 font-mono text-[#66716B]">{item.clause}</td>
                  <td className="py-3.5 px-4">
                    {item.implementationStatus === 'Fully Implemented' ? (
                      <span className="bg-[#E7F5EE] text-[#3D9B72] px-2.5 py-1 rounded-full text-[10px] font-bold">
                        Fully Implemented
                      </span>
                    ) : (
                      <span className="bg-[#FFF4DD] text-[#C58A35] px-2.5 py-1 rounded-full text-[10px] font-bold">
                        Partially Implemented
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-[#18211D]">
                    {item.effectivenessPct}%
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#18211D]">{item.relatedBusinessUnit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* One-line Footer Text per prompt */}
      <div className="p-4 rounded-xl bg-white border border-[#E2E6E2] text-xs text-[#66716B] font-medium text-center shadow-xs">
        "This mapping supports regulatory reporting and internal governance review under RBI Cyber Security Framework and SEBI Cybersecurity and Cyber Resilience Framework requirements."
      </div>
    </div>
  );
};
