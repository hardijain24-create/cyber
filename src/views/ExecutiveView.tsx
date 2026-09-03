import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ORG_RISK_SUMMARY, TOP_RISK_ASSETS, BUSINESS_UNITS, RISK_TREND_DATA 
} from '../data/mockData';
import { GsapNumber } from '../components/GsapNumber';
import { GsapCard } from '../components/GsapCard';
import { GsapBarChart } from '../components/GsapBarChart';
import { GsapLineChart } from '../components/GsapLineChart';
import { SkeletonDashboard } from '../components/SkeletonLoader';

export const ExecutiveView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [nlQuery, setNlQuery] = useState('');
  const [nlAnswer, setNlAnswer] = useState<string | null>(
    'Your highest financial risk is Treasury-DomainController-102, contributing ₹1,096.44 Cr/year in expected annual loss, primarily due to 3 unpatched critical vulnerabilities including CVE-2020-1472.'
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleAskQuestion = (questionText: string) => {
    setNlQuery(questionText);
    const qLower = questionText.toLowerCase();

    if (qLower.includes('highest financial cyber risk') || qLower.includes('today')) {
      setNlAnswer(
        'Your highest financial risk is Treasury-DomainController-102, contributing ₹1,096.44 Cr/year in expected annual loss, primarily due to 3 unpatched critical vulnerabilities including CVE-2020-1472.'
      );
    } else if (qLower.includes('vulnerabilities contribute') || qLower.includes('expected losses')) {
      setNlAnswer(
        'Unpatched Remote Code Execution vulnerabilities (CVE-2020-1472 Zerologon and CVE-2021-44228 Log4Shell) account for 61.4% of total enterprise expected annual loss (₹2,618.54 Cr).'
      );
    } else if (qLower.includes('delay') || qLower.includes('30 days')) {
      setNlAnswer(
        'Delaying remediation by 30 days increases expected annual loss from ₹4,264.95 Cr to ₹4,812.30 Cr (+₹547.35 Cr risk surge) due to unmitigated exploit availability.'
      );
    } else {
      setNlAnswer(
        `Analysis for "${questionText}": Current Expected Annual Loss is ₹4,264.95 Cr with 95% VaR capped at ₹6,100.16 Cr across 510 open critical findings.`
      );
    }
  };

  const maxBuAle = Math.max(...BUSINESS_UNITS.map((bu) => bu.expectedAnnualLossCrore));

  if (loading) {
    return <SkeletonDashboard />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Executive Command Header */}
      <div className="bg-white p-7 rounded-3xl border border-[#E2E6E2] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#7342E2] bg-[#EEEBFF] px-3 py-1 rounded-full font-mono">
              EXECUTIVE COMMAND DASHBOARD
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7F5EE] border border-[#3D9B72]/20 text-[11px] font-bold text-[#3D9B72] font-mono">
              Live: Continuous Engine Active
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)' }} className="text-3xl font-extrabold text-[#192837] tracking-tight">
            Enterprise Cyber Risk Summary
          </h2>
          <p className="text-sm text-[#192837]/70 mt-1 font-normal">
            Real-time financial exposure across all business units, updated continuously.
          </p>
        </div>
      </div>

      {/* Row of 4 GSAP 3D Tilt KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Expected Annual Loss */}
        <GsapCard className="bg-white p-6 rounded-3xl border border-[#E2E6E2] shadow-xs hover:border-[#7342E2]/50 transition-colors">
          <span className="text-[11px] font-bold tracking-widest text-[#192837]/50 uppercase font-mono">
            TOTAL EXPECTED ANNUAL LOSS
          </span>
          <div className="flex items-baseline justify-between mt-3 mb-1">
            <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-3xl sm:text-4xl font-extrabold text-[#192837] font-mono tracking-tight">
              <GsapNumber value={4264.95} prefix="₹" suffix=" Cr" />
            </h3>
            <span className="text-xs text-[#3D9B72] font-semibold bg-[#E7F5EE] px-2.5 py-1 rounded-full font-mono">
              -4.1%
            </span>
          </div>
          <p className="text-xs text-[#192837]/60">Average annual financial exposure from cyber risk</p>
        </GsapCard>

        {/* Card 2: Value at Risk (95%) */}
        <GsapCard className="bg-white p-6 rounded-3xl border border-[#E2E6E2] shadow-xs hover:border-[#7342E2]/50 transition-colors">
          <span className="text-[11px] font-bold tracking-widest text-[#192837]/50 uppercase font-mono">
            VALUE AT RISK (95%)
          </span>
          <div className="flex items-baseline justify-between mt-3 mb-1">
            <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-3xl sm:text-4xl font-extrabold text-[#192837] font-mono tracking-tight">
              <GsapNumber value={6100.16} prefix="₹" suffix=" Cr" />
            </h3>
            <span className="text-[10px] font-bold bg-[#192837] text-white px-2.5 py-1 rounded-full font-mono">
              95% VaR
            </span>
          </div>
          <p className="text-xs text-[#192837]/60">Maximum loss exposure in 95% of simulated scenarios</p>
        </GsapCard>

        {/* Card 3: Open Critical/High Findings */}
        <GsapCard className="bg-white p-6 rounded-3xl border border-[#E2E6E2] shadow-xs hover:border-[#7342E2]/50 transition-colors">
          <span className="text-[11px] font-bold tracking-widest text-[#192837]/50 uppercase font-mono">
            OPEN CRITICAL FINDINGS
          </span>
          <div className="flex items-baseline justify-between mt-3 mb-1">
            <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-3xl sm:text-4xl font-extrabold text-[#192837] font-mono tracking-tight">
              <GsapNumber value={510} decimals={0} />
            </h3>
            <span className="bg-[#F9E5E8] text-[#C94B59] text-[10px] font-bold px-2.5 py-1 rounded-full font-mono">
              Unpatched
            </span>
          </div>
          <p className="text-xs text-[#192837]/60">Unpatched high-severity findings across enterprise assets</p>
        </GsapCard>

        {/* Card 4: Model Confidence (ROC-AUC) */}
        <GsapCard className="bg-white p-6 rounded-3xl border border-[#E2E6E2] shadow-xs hover:border-[#7342E2]/50 transition-colors">
          <span className="text-[11px] font-bold tracking-widest text-[#192837]/50 uppercase font-mono">
            MODEL CONFIDENCE
          </span>
          <div className="flex items-baseline justify-between mt-3 mb-1">
            <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-3xl sm:text-4xl font-extrabold text-[#192837] font-mono tracking-tight">
              <GsapNumber value={0.763} decimals={3} />
            </h3>
            <span className="bg-[#E7F5EE] text-[#3D9B72] text-[10px] font-bold px-2.5 py-1 rounded-full font-mono">
              High Accuracy
            </span>
          </div>
          <p className="text-xs text-[#192837]/60">ROC-AUC statistical confidence score</p>
        </GsapCard>
      </div>

      {/* Section 1: Top Risk Contributors with GSAP Bar Chart Growth */}
      <div className="bg-white p-8 rounded-3xl border border-[#E2E6E2] shadow-xs space-y-6">
        <div className="border-b border-[#E2E6E2] pb-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#7342E2] font-mono">
            TOP RISK CONTRIBUTORS
          </span>
          <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-xl font-bold text-[#192837] mt-1">
            Which assets drive your risk?
          </h3>
          <p className="text-xs text-[#192837]/60">Top 10 Highest-Risk Assets by Expected Annual Loss</p>
        </div>

        {/* GSAP Staggered Bar Chart */}
        <GsapBarChart items={TOP_RISK_ASSETS} />

        <div className="p-4 rounded-2xl bg-[#FBFCFD] border border-[#E2E6E2] text-xs text-[#192837] font-normal leading-relaxed">
          <span className="font-bold text-[#7342E2]">Key Insight: </span>
          Treasury-DomainController-102 drives ₹1,096.44 Cr/year — 25.7% of total enterprise exposure.
        </div>
      </div>

      {/* Section 2: Risk Concentration by Business Unit */}
      <div className="bg-white p-8 rounded-3xl border border-[#E2E6E2] shadow-xs space-y-6">
        <div className="border-b border-[#E2E6E2] pb-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#7342E2] font-mono">
            BUSINESS UNIT CONCENTRATION
          </span>
          <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-xl font-bold text-[#192837] mt-1">
            Where is exposure concentrated?
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BUSINESS_UNITS.map((bu) => {
            const pct = (bu.expectedAnnualLossCrore / maxBuAle) * 100;
            return (
              <motion.div 
                key={bu.id}
                whileHover={{ scale: 1.01 }}
                className="p-5 rounded-2xl bg-[#FBFCFD] border border-[#E2E6E2] space-y-3 transition-all hover:border-[#7342E2]/40"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#192837]">{bu.name}</span>
                  <span className="text-xs font-bold font-mono text-[#7342E2]">
                    ₹{bu.expectedAnnualLossCrore.toLocaleString()} Cr
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#EEF0EC] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-[#192837] rounded-full"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Section 3: Interactive GSAP Line Chart with Hover Tooltip */}
      <div className="bg-white p-8 rounded-3xl border border-[#E2E6E2] shadow-xs space-y-6">
        <div className="border-b border-[#E2E6E2] pb-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#7342E2] font-mono">
            90-DAY RISK TREND
          </span>
          <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-xl font-bold text-[#192837] mt-1">
            Is our risk exposure going up or down?
          </h3>
        </div>

        {/* GSAP SVG Line Chart */}
        <GsapLineChart data={RISK_TREND_DATA} />

        <p className="text-xs text-[#192837]/60 font-normal">
          Hover over data points to inspect daily exposure figures in ₹ Crore.
        </p>
      </div>

      {/* Section 4: Plain-Language AI Assistant */}
      <div className="bg-white p-8 rounded-3xl border-2 border-[#7342E2]/20 shadow-xs space-y-6">
        <div className="border-b border-[#E2E6E2] pb-4">
          <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-xl font-bold text-[#192837]">
            Ask CyberRisk Quant
          </h3>
          <p className="text-xs text-[#192837]/60 mt-1">
            Query financial exposure, vulnerability drivers, or remediation delay impacts in plain English.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (nlQuery) handleAskQuestion(nlQuery);
          }}
          className="flex items-center gap-3"
        >
          <input
            type="text"
            placeholder="e.g. What is our highest financial risk today?"
            value={nlQuery}
            onChange={(e) => setNlQuery(e.target.value)}
            className="w-full bg-[#FBFCFD] border border-[#E2E6E2] rounded-2xl px-5 py-3.5 text-xs font-medium text-[#192837] focus:border-[#7342E2] focus:outline-none"
          />
          <button 
            type="submit" 
            className="bg-[#7342E2] text-white px-6 py-3.5 rounded-2xl text-xs font-semibold hover:bg-[#6232c9] transition-all cursor-pointer shrink-0"
          >
            Ask
          </button>
        </form>

        <div className="flex flex-wrap gap-2.5">
          {[
            'What is our highest financial cyber risk today?',
            'Which vulnerabilities contribute most to our expected losses?',
            'What happens if we delay remediation by 30 days?'
          ].map((chip) => (
            <button
              key={chip}
              onClick={() => handleAskQuestion(chip)}
              className="px-4 py-2 rounded-xl bg-[#F7F8FA] hover:bg-[#EEEBFF] text-xs font-medium text-[#192837] hover:text-[#7342E2] transition-colors cursor-pointer border border-[#E2E6E2]"
            >
              {chip}
            </button>
          ))}
        </div>

        {nlAnswer && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl bg-[#FBFCFD] border border-[#7342E2]/30 text-xs font-mono text-[#192837] leading-relaxed"
          >
            <span className="font-bold font-sans text-[#7342E2] block mb-1">CyberRisk Quant Answer:</span>
            {nlAnswer}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
