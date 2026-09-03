import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Search, ShieldCheck, Cpu, ArrowRight, ExternalLink, HelpCircle, Code } from 'lucide-react';

interface ResourcesViewProps {
  onNavigate?: (route: string) => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const docs = [
    {
      title: 'Open FAIR Methodology Guide',
      category: 'Loss Modeling',
      desc: 'How CyberRisk Quant calculates Loss Event Frequency (LEF) and Threat Loss Magnitude (LM) in Rupees.',
      readTime: '8 min read',
      icon: ShieldCheck,
    },
    {
      title: '0/1 Knapsack Remediation Algorithm',
      category: 'Capital Optimization',
      desc: 'Mathematical formulation of optimal control selection given a fixed capital budget constraint.',
      readTime: '12 min read',
      icon: Cpu,
    },
    {
      title: 'RBI Cyber Security Framework Integration',
      category: 'Compliance',
      desc: 'Step-by-step audit guide for automated compliance mapping against RBI Annexure 1 controls.',
      readTime: '6 min read',
      icon: FileText,
    },
    {
      title: 'SEBI CSCRF Alignment Matrix',
      category: 'Regulatory',
      desc: 'Automating reporting for SEBI Cybersecurity & Cyber Resilience Framework compliance.',
      readTime: '10 min read',
      icon: BookOpen,
    },
    {
      title: 'REST API & SIEM Ingestion Specs',
      category: 'Developer API',
      desc: 'Connect Tenable, CrowdStrike, and Splunk directly into the real-time CRQ quantification engine.',
      readTime: '15 min read',
      icon: Code,
    },
    {
      title: 'CISO Board Presentation Templates',
      category: 'Executive Reports',
      desc: 'Downloadable PDF & CSV export templates for board meetings and risk committees.',
      readTime: '5 min read',
      icon: FileText,
    },
  ];

  const filteredDocs = docs.filter(
    (d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F6F7F4] text-[#192837] py-12 px-5 sm:px-8">
      <div className="max-w-[1280px] mx-auto space-y-10">
        {/* Header & Search */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7342E2] bg-[#EEEBFF] px-3.5 py-1.5 rounded-full inline-block font-mono">
            CYBERRISK QUANT KNOWLEDGE BASE
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)' }} className="text-3xl sm:text-5xl font-extrabold text-[#192837] tracking-tight">
            Documentation, Guides & Resources
          </h1>
          <p className="text-base text-[#192837]/80 leading-relaxed">
            Everything you need to master FAIR-based risk quantification, RBI/SEBI compliance mapping, and capital optimization algorithms.
          </p>

          {/* Search Box */}
          <div className="relative max-w-xl mx-auto mt-6">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#192837]/40" />
            <input
              type="text"
              placeholder="Search documentation, algorithms, RBI/SEBI guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E2E6E2] rounded-full pl-12 pr-4 py-3.5 text-sm text-[#192837] focus:border-[#7342E2] focus:outline-none shadow-xs"
            />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {filteredDocs.map((doc, idx) => {
            const Icon = doc.icon;
            return (
              <motion.div
                key={doc.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                onClick={() => onNavigate?.('/dashboard')}
                className="bg-white p-6 rounded-2xl border border-[#E2E6E2] hover:border-[#7342E2] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#EEEBFF] text-[#7342E2] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-[#EEF0EC] text-[#192837]/70 px-2.5 py-1 rounded-full">
                      {doc.category}
                    </span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-lg font-bold text-[#192837] group-hover:text-[#7342E2] transition-colors">
                    {doc.title}
                  </h3>

                  <p className="text-xs text-[#192837]/75 leading-relaxed">
                    {doc.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E2E6E2] flex items-center justify-between text-xs text-[#192837]/60">
                  <span>{doc.readTime}</span>
                  <span className="font-semibold text-[#7342E2] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Live Support Banner */}
        <div className="bg-white p-8 rounded-3xl border border-[#E2E6E2] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-xl font-bold text-[#192837]">
              Need custom loss modeling assistance?
            </h3>
            <p className="text-xs text-[#192837]/70">
              Our team of risk quantification engineers and former CISOs are ready to assist with your RBI & SEBI audit setup.
            </p>
          </div>
          <button
            onClick={() => onNavigate?.('/dashboard')}
            className="bg-[#7342E2] text-white px-6 py-3 rounded-full text-xs font-semibold hover:bg-[#6232c9] transition-all shrink-0 cursor-pointer shadow-xs"
          >
            Connect With A Risk Engineer
          </button>
        </div>
      </div>
    </div>
  );
};
