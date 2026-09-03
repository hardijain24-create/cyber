import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import {
  ORG_RISK_SUMMARY, TOP_RISK_ASSETS, BUSINESS_UNITS, RISK_TREND_DATA,
  MODEL_EXPLAINABILITY_FACTORS
} from '../data/mockData';
import { GsapNumber } from '../components/GsapNumber';
import { GsapCard } from '../components/GsapCard';
import { GsapBarChart } from '../components/GsapBarChart';
import { GsapLineChart } from '../components/GsapLineChart';
import { SkeletonDashboard } from '../components/SkeletonLoader';

// Framer Motion section reveal variant
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};

// Radial gauge for score
const RiskGauge: React.FC<{ score: number; max: number }> = ({ score, max }) => {
  const pct = Math.min(score / max, 1);
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct * 0.75); // 270-degree arc
  const arcRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const el = arcRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              el,
              { strokeDashoffset: circ },
              { strokeDashoffset: offset, duration: 2, ease: 'power3.out' }
            );
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [offset, circ]);

  const color = pct > 0.7 ? '#C94B59' : pct > 0.4 ? '#D4862A' : '#3D9B72';

  return (
    <svg viewBox="0 0 128 128" width="128" height="128" className="-rotate-[135deg]">
      <circle cx="64" cy="64" r={r} fill="none" stroke="#EEF0EC" strokeWidth="10" strokeDasharray={`${circ * 0.75} ${circ * 0.25}`} strokeLinecap="round" />
      <circle
        ref={arcRef}
        cx="64"
        cy="64"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeDasharray={`${circ * 0.75} ${circ * 0.25}`}
        strokeDashoffset={circ}
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
      />
    </svg>
  );
};

// Model factor progress bar that animates in
const FactorBar: React.FC<{ factor: string; pct: number; delay?: number }> = ({ factor, pct, delay = 0 }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            gsap.fromTo(
              el,
              { width: '0%' },
              { width: `${pct}%`, duration: 1.3, delay, ease: 'power3.out' }
            );
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [pct, delay]);

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-semibold">
        <span className="text-[#192837]/80">{factor}</span>
        <span className="font-mono text-[#192837] font-bold">{pct}%</span>
      </div>
      <div className="w-full h-2 bg-[#EEF0EC] rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{
            width: 0,
            background: `linear-gradient(90deg, #7342E2, #5a2db8)`,
            boxShadow: '0 0 8px rgba(115,66,226,0.3)',
          }}
        />
      </div>
    </div>
  );
};

export const ExecutiveView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [nlQuery, setNlQuery] = useState('');
  const [nlAnswer, setNlAnswer] = useState<string | null>(
    'Your highest financial risk is Treasury-DomainController-102, contributing ₹1,096.44 Cr/year in expected annual loss, primarily due to 3 unpatched critical vulnerabilities including CVE-2020-1472.'
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  const handleAskQuestion = (questionText: string) => {
    setNlQuery(questionText);
    const q = questionText.toLowerCase();
    if (q.includes('highest financial') || q.includes('today')) {
      setNlAnswer('Your highest financial risk is Treasury-DomainController-102, contributing ₹1,096.44 Cr/year — primarily from CVE-2020-1472 (Zerologon), unpatched for over 180 days.');
    } else if (q.includes('vulnerabilities contribute') || q.includes('expected losses')) {
      setNlAnswer('Unpatched RCE vulnerabilities (CVE-2020-1472 and CVE-2021-44228 Log4Shell) account for 61.4% of total enterprise expected annual loss (₹2,618.54 Cr).');
    } else if (q.includes('delay') || q.includes('30 days')) {
      setNlAnswer('Delaying remediation by 30 days increases expected annual loss from ₹4,264.95 Cr to ₹4,812.30 Cr (+₹547.35 Cr) due to unmitigated exploit availability in the wild.');
    } else {
      setNlAnswer(`Analysis for "${questionText}": Current Expected Annual Loss is ₹4,264.95 Cr with 95% VaR at ₹6,100.16 Cr across 510 open critical findings.`);
    }
  };

  const maxBuAle = Math.max(...BUSINESS_UNITS.map((bu) => bu.expectedAnnualLossCrore));

  if (loading) return <SkeletonDashboard />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-10"
    >
      {/* ── HEADER ── */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="bg-white p-7 rounded-3xl border border-[#E2E6E2]"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#7342E2] bg-[#EEEBFF] px-3 py-1 rounded-full font-mono">
                EXECUTIVE COMMAND DASHBOARD
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#3D9B72] bg-[#E7F5EE] px-3 py-1 rounded-full border border-[#3D9B72]/20 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3D9B72] animate-pulse inline-block" />
                Live Engine Active
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)' }} className="text-3xl font-extrabold text-[#192837] tracking-tight">
              Enterprise Cyber Risk Summary
            </h2>
            <p className="text-sm text-[#192837]/60 mt-1">
              Real-time financial exposure across all business units, updated continuously.
            </p>
          </div>
          {/* Mini Gauge */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="relative flex items-center justify-center">
              <RiskGauge score={ORG_RISK_SUMMARY.total_expected_annual_loss_crore} max={8000} />
              <div className="absolute text-center">
                <div className="text-[10px] font-bold text-[#192837]/50 font-mono uppercase">Risk</div>
                <div style={{ fontFamily: 'var(--font-heading)' }} className="text-base font-extrabold text-[#C94B59]">HIGH</div>
              </div>
            </div>
            <div className="text-xs text-[#192837]/60 max-w-[120px] leading-relaxed">
              Organisation risk rated <span className="text-[#C94B59] font-semibold">HIGH</span> based on 20,000 Monte Carlo simulations.
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── KPI CARDS ── */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {/* Card 1 */}
        <motion.div variants={cardVariant}>
          <GsapCard
            glowColor="rgba(115,66,226,0.12)"
            className="bg-white p-6 rounded-3xl border border-[#E2E6E2] hover:border-[#7342E2]/40 transition-colors h-full"
          >
            <span className="text-[10px] font-bold tracking-widest text-[#192837]/45 uppercase font-mono block">
              EXPECTED ANNUAL LOSS
            </span>
            <div className="flex items-baseline gap-1.5 mt-3 mb-1">
              <span style={{ fontFamily: 'var(--font-heading)' }} className="text-4xl font-extrabold text-[#192837] font-mono tracking-tight leading-none">
                <GsapNumber value={4264.95} prefix="₹" suffix=" Cr" />
              </span>
            </div>
            <span className="text-xs text-[#3D9B72] font-semibold bg-[#E7F5EE] px-2 py-0.5 rounded-full font-mono inline-block mb-2">
              -4.1% this quarter
            </span>
            <p className="text-xs text-[#192837]/55 leading-relaxed">Average financial exposure from cyber risk</p>
          </GsapCard>
        </motion.div>

        {/* Card 2 */}
        <motion.div variants={cardVariant}>
          <GsapCard
            glowColor="rgba(25,40,55,0.08)"
            className="bg-white p-6 rounded-3xl border border-[#E2E6E2] hover:border-[#192837]/30 transition-colors h-full"
          >
            <span className="text-[10px] font-bold tracking-widest text-[#192837]/45 uppercase font-mono block">
              VALUE AT RISK (95%)
            </span>
            <div className="flex items-baseline gap-1.5 mt-3 mb-1">
              <span style={{ fontFamily: 'var(--font-heading)' }} className="text-4xl font-extrabold text-[#192837] font-mono tracking-tight leading-none">
                <GsapNumber value={6100.16} prefix="₹" suffix=" Cr" />
              </span>
            </div>
            <span className="text-[10px] font-bold bg-[#192837] text-white px-2.5 py-0.5 rounded-full font-mono inline-block mb-2">
              95% VaR
            </span>
            <p className="text-xs text-[#192837]/55 leading-relaxed">Max loss in 95% of simulated scenarios</p>
          </GsapCard>
        </motion.div>

        {/* Card 3 */}
        <motion.div variants={cardVariant}>
          <GsapCard
            glowColor="rgba(201,75,89,0.1)"
            className="bg-white p-6 rounded-3xl border border-[#E2E6E2] hover:border-[#C94B59]/30 transition-colors h-full"
          >
            <span className="text-[10px] font-bold tracking-widest text-[#192837]/45 uppercase font-mono block">
              OPEN CRITICAL FINDINGS
            </span>
            <div className="flex items-baseline gap-1.5 mt-3 mb-1">
              <span style={{ fontFamily: 'var(--font-heading)' }} className="text-4xl font-extrabold text-[#C94B59] font-mono tracking-tight leading-none">
                <GsapNumber value={510} decimals={0} />
              </span>
            </div>
            <span className="bg-[#F9E5E8] text-[#C94B59] text-[10px] font-bold px-2.5 py-0.5 rounded-full font-mono inline-block mb-2">
              Unpatched
            </span>
            <p className="text-xs text-[#192837]/55 leading-relaxed">High-severity findings across all assets</p>
          </GsapCard>
        </motion.div>

        {/* Card 4 */}
        <motion.div variants={cardVariant}>
          <GsapCard
            glowColor="rgba(61,155,114,0.1)"
            className="bg-white p-6 rounded-3xl border border-[#E2E6E2] hover:border-[#3D9B72]/30 transition-colors h-full"
          >
            <span className="text-[10px] font-bold tracking-widest text-[#192837]/45 uppercase font-mono block">
              MODEL CONFIDENCE
            </span>
            <div className="flex items-baseline gap-1.5 mt-3 mb-1">
              <span style={{ fontFamily: 'var(--font-heading)' }} className="text-4xl font-extrabold text-[#3D9B72] font-mono tracking-tight leading-none">
                <GsapNumber value={0.763} decimals={3} />
              </span>
            </div>
            <span className="bg-[#E7F5EE] text-[#3D9B72] text-[10px] font-bold px-2.5 py-0.5 rounded-full font-mono inline-block mb-2">
              ROC-AUC
            </span>
            <p className="text-xs text-[#192837]/55 leading-relaxed">Predictive accuracy of the risk model</p>
          </GsapCard>
        </motion.div>
      </motion.div>

      {/* ── TWO COLUMN: BAR CHART + MODEL EXPLAINABILITY ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Top Risk Contributors — GSAP Bar Chart */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="lg:col-span-3 bg-white p-8 rounded-3xl border border-[#E2E6E2] space-y-6"
        >
          <div className="border-b border-[#E2E6E2] pb-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#7342E2] font-mono">
              TOP RISK CONTRIBUTORS
            </span>
            <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-xl font-bold text-[#192837] mt-1.5">
              Which assets drive your risk?
            </h3>
            <p className="text-xs text-[#192837]/55">Top 10 highest-risk assets by Expected Annual Loss</p>
          </div>
          <GsapBarChart items={TOP_RISK_ASSETS} />
          <div className="p-4 rounded-2xl bg-[#FBFCFD] border border-[#E2E6E2] text-xs text-[#192837]/80 leading-relaxed">
            <span className="font-semibold text-[#7342E2]">Key Insight — </span>
            Treasury-DomainController-102 accounts for ₹1,096.44 Cr/year, representing 25.7% of total enterprise exposure.
          </div>
        </motion.div>

        {/* Model Explainability */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="lg:col-span-2 bg-white p-8 rounded-3xl border border-[#E2E6E2] space-y-6"
        >
          <div className="border-b border-[#E2E6E2] pb-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#7342E2] font-mono">
              MODEL EXPLAINABILITY
            </span>
            <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-xl font-bold text-[#192837] mt-1.5">
              What drives the score?
            </h3>
            <p className="text-xs text-[#192837]/55">SHAP feature importance factors</p>
          </div>
          <div className="space-y-4">
            {MODEL_EXPLAINABILITY_FACTORS.map((f, idx) => (
              <FactorBar key={f.factor} factor={f.factor} pct={f.importancePct} delay={idx * 0.07} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── BUSINESS UNIT CONCENTRATION ── */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="bg-white p-8 rounded-3xl border border-[#E2E6E2] space-y-6"
      >
        <div className="border-b border-[#E2E6E2] pb-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#7342E2] font-mono">
            BUSINESS UNIT CONCENTRATION
          </span>
          <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-xl font-bold text-[#192837] mt-1.5">
            Where is exposure concentrated?
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BUSINESS_UNITS.map((bu, idx) => {
            const pct = (bu.expectedAnnualLossCrore / maxBuAle) * 100;
            const severityColor = {
              CRITICAL: '#C94B59',
              HIGH: '#D4862A',
              MODERATE: '#7342E2',
              LOW: '#3D9B72',
            }[bu.severity] || '#192837';

            return (
              <motion.div
                key={bu.id}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.07 }}
                whileHover={{ y: -3 }}
                className="p-5 rounded-2xl bg-[#FAFBFD] border border-[#E2E6E2] space-y-3 transition-colors hover:border-[#7342E2]/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: severityColor }}
                    />
                    <span className="text-sm font-bold text-[#192837]">{bu.name}</span>
                  </div>
                  <span className="text-xs font-bold font-mono text-[#7342E2]">
                    ₹{bu.expectedAnnualLossCrore.toLocaleString()} Cr
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#EEF0EC] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: idx * 0.1, ease: 'circOut' }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${severityColor}, ${severityColor}aa)` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#192837]/50 font-mono">
                  <span>{bu.assetsCount} assets · {bu.findingsCount} findings</span>
                  <span
                    className="font-bold px-2 py-0.5 rounded-full text-[10px]"
                    style={{ color: severityColor, background: `${severityColor}15` }}
                  >
                    {bu.severity}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── 90-DAY TREND LINE CHART ── */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="bg-white p-8 rounded-3xl border border-[#E2E6E2] space-y-6"
      >
        <div className="border-b border-[#E2E6E2] pb-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#7342E2] font-mono">
            90-DAY RISK TREND
          </span>
          <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-xl font-bold text-[#192837] mt-1.5">
            Is our exposure going up or down?
          </h3>
          <p className="text-xs text-[#192837]/55">Daily risk score in ₹ Crore — hover dots to inspect</p>
        </div>
        <GsapLineChart data={RISK_TREND_DATA} />
        <p className="text-xs text-[#192837]/55 italic">
          Risk score is recalculated daily as vulnerabilities are discovered and patched.
        </p>
      </motion.div>

      {/* ── AI QUERY CONSOLE ── */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="bg-white p-8 rounded-3xl border-2 border-[#7342E2]/20 space-y-6"
      >
        <div className="border-b border-[#E2E6E2] pb-4">
          <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-xl font-bold text-[#192837]">
            Ask CyberRisk Quant
          </h3>
          <p className="text-xs text-[#192837]/55 mt-1">
            Query financial exposure, vulnerability drivers, or remediation delay impacts in plain English.
          </p>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); if (nlQuery) handleAskQuestion(nlQuery); }}
          className="flex items-center gap-3"
        >
          <input
            type="text"
            placeholder="e.g. What is our highest financial risk today?"
            value={nlQuery}
            onChange={(e) => setNlQuery(e.target.value)}
            className="w-full bg-[#FAFBFD] border border-[#E2E6E2] rounded-2xl px-5 py-3.5 text-xs font-medium text-[#192837] focus:border-[#7342E2] focus:outline-none focus:ring-1 focus:ring-[#7342E2]/20 transition-all"
          />
          <button
            type="submit"
            className="bg-[#7342E2] hover:bg-[#6232c9] text-white px-6 py-3.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer shrink-0 shadow-[0_4px_16px_rgba(115,66,226,0.25)] hover:shadow-[0_6px_24px_rgba(115,66,226,0.35)]"
          >
            Ask
          </button>
        </form>

        <div className="flex flex-wrap gap-2">
          {[
            'What is our highest financial cyber risk today?',
            'Which vulnerabilities contribute most to our expected losses?',
            'What happens if we delay remediation by 30 days?',
          ].map((chip) => (
            <button
              key={chip}
              onClick={() => handleAskQuestion(chip)}
              className="px-3.5 py-2 rounded-xl bg-[#F7F8FA] hover:bg-[#EEEBFF] text-xs font-medium text-[#192837] hover:text-[#7342E2] transition-colors cursor-pointer border border-[#E2E6E2] hover:border-[#7342E2]/30"
            >
              {chip}
            </button>
          ))}
        </div>

        {nlAnswer && (
          <motion.div
            key={nlAnswer}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="p-5 rounded-2xl bg-[#FAFBFD] border border-[#7342E2]/25 text-xs font-mono text-[#192837] leading-relaxed"
          >
            <span className="font-bold font-sans text-[#7342E2] block mb-1.5">CyberRisk Quant Answer</span>
            {nlAnswer}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};
