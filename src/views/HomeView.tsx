import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { CyberRiskQuantHero } from '../components/CyberRiskQuantHero';
import { AnimeCounter } from '../components/AnimeCounter';
import { AnimeScrollReveal } from '../components/AnimeScrollReveal';

interface HomeViewProps {
  onNavigate: (route: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="w-full min-h-screen bg-[#F7F8FA] text-[#192837] selection:bg-[#7342E2] selection:text-white">
      {/* Scroll Progress Bar at the top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#7342E2] origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* 1. HERO SECTION */}
      <CyberRiskQuantHero onOpenPlatform={() => onNavigate('/dashboard')} onNavigate={onNavigate} />

      {/* 2. PLATFORM OVERVIEW / HOW IT WORKS (4-LAYER ARCHITECTURE) */}
      <section id="platform" className="py-24 px-5 sm:px-8 bg-white border-t border-[#E2E6E2]">
        <div id="how-it-works" className="max-w-[1280px] mx-auto space-y-16">
          <AnimeScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#7342E2] bg-[#EEEBFF] px-3.5 py-1 rounded-full font-mono">
                ARCHITECTURE
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)' }} className="text-3xl sm:text-5xl font-extrabold text-[#192837] tracking-tight">
                How It Works
              </h2>
              <p className="text-sm sm:text-base text-[#192837]/70 leading-relaxed font-normal">
                Four continuous layers that turn raw vulnerability feeds into board-ready Rupees.
              </p>
            </div>
          </AnimeScrollReveal>

          {/* 4 Layers Grid - Pure Clean Cards, No Icon Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Layer 1 */}
            <AnimeScrollReveal delay={100} direction="up">
              <motion.div 
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(115, 66, 226, 0.08)' }}
                className="p-8 rounded-3xl bg-[#F7F8FA] border border-[#E2E6E2] transition-all space-y-4 flex flex-col justify-between h-full"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#7342E2] font-mono">
                    LAYER 01
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-xl font-bold text-[#192837]">
                    Data Ingestion
                  </h3>
                  <p className="text-xs text-[#192837]/75 leading-relaxed">
                    Automated streams for CVE vulnerabilities, threat intel, and security control signals.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E2E6E2] text-[11px] font-mono text-[#192837]/50">
                  Tenable • CrowdStrike • Splunk
                </div>
              </motion.div>
            </AnimeScrollReveal>

            {/* Layer 2 */}
            <AnimeScrollReveal delay={200} direction="up">
              <motion.div 
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(115, 66, 226, 0.08)' }}
                className="p-8 rounded-3xl bg-[#F7F8FA] border border-[#E2E6E2] transition-all space-y-4 flex flex-col justify-between h-full"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#7342E2] font-mono">
                    LAYER 02
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-xl font-bold text-[#192837]">
                    Loss Engine
                  </h3>
                  <p className="text-xs text-[#192837]/75 leading-relaxed">
                    20,000 Monte Carlo FAIR simulations per asset calculating ALE and 95% VaR.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E2E6E2] text-[11px] font-mono text-[#192837]/50">
                  FAIR Loss Model • 95% VaR
                </div>
              </motion.div>
            </AnimeScrollReveal>

            {/* Layer 3 */}
            <AnimeScrollReveal delay={300} direction="up">
              <motion.div 
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(115, 66, 226, 0.08)' }}
                className="p-8 rounded-3xl bg-[#F7F8FA] border border-[#E2E6E2] transition-all space-y-4 flex flex-col justify-between h-full"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#7342E2] font-mono">
                    LAYER 03
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-xl font-bold text-[#192837]">
                    AI Decision Support
                  </h3>
                  <p className="text-xs text-[#192837]/75 leading-relaxed">
                    Natural language querying, SHAP explainability factor analysis, and delay impact tools.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E2E6E2] text-[11px] font-mono text-[#192837]/50">
                  Natural Language • ROC 0.763
                </div>
              </motion.div>
            </AnimeScrollReveal>

            {/* Layer 4 */}
            <AnimeScrollReveal delay={400} direction="up">
              <motion.div 
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(115, 66, 226, 0.08)' }}
                className="p-8 rounded-3xl bg-[#F7F8FA] border border-[#E2E6E2] transition-all space-y-4 flex flex-col justify-between h-full"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#7342E2] font-mono">
                    LAYER 04
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-xl font-bold text-[#192837]">
                    Capital Optimizer
                  </h3>
                  <p className="text-xs text-[#192837]/75 leading-relaxed">
                    0/1 Knapsack solver maximizing risk reduction for your exact fixed budget.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E2E6E2] text-[11px] font-mono text-[#192837]/50">
                  Knapsack Solver • 9.7x ROSI
                </div>
              </motion.div>
            </AnimeScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. MARKET OPPORTUNITY SECTION ("Why Now") */}
      <section className="py-24 px-5 sm:px-8 bg-[#F7F8FA]">
        <div className="max-w-[1280px] mx-auto space-y-16">
          <AnimeScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#7342E2] bg-[#EEEBFF] px-3.5 py-1 rounded-full font-mono">
                THE SHIFT
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)' }} className="text-3xl sm:text-5xl font-extrabold text-[#192837] tracking-tight">
                Why Now
              </h2>
            </div>
          </AnimeScrollReveal>

          {/* 4 Stat Callouts with Anime.js Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimeScrollReveal delay={100} direction="scale">
              <div className="bg-white p-8 rounded-3xl border border-[#E2E6E2] text-center space-y-2 shadow-xs hover:border-[#7342E2]/40 transition-colors">
                <div style={{ fontFamily: 'var(--font-heading)' }} className="text-4xl sm:text-5xl font-extrabold text-[#7342E2] font-mono">
                  $<AnimeCounter to={2.04} decimals={2} />B
                </div>
                <p className="text-xs font-medium text-[#192837]/70">Global CRQ market size, 2026</p>
              </div>
            </AnimeScrollReveal>

            <AnimeScrollReveal delay={200} direction="scale">
              <div className="bg-white p-8 rounded-3xl border border-[#E2E6E2] text-center space-y-2 shadow-xs hover:border-[#7342E2]/40 transition-colors">
                <div style={{ fontFamily: 'var(--font-heading)' }} className="text-4xl sm:text-5xl font-extrabold text-[#7342E2] font-mono">
                  $<AnimeCounter to={5.25} decimals={2} />B
                </div>
                <p className="text-xs font-medium text-[#192837]/70">Projected market size by 2031</p>
              </div>
            </AnimeScrollReveal>

            <AnimeScrollReveal delay={300} direction="scale">
              <div className="bg-white p-8 rounded-3xl border border-[#E2E6E2] text-center space-y-2 shadow-xs hover:border-[#7342E2]/40 transition-colors">
                <div style={{ fontFamily: 'var(--font-heading)' }} className="text-4xl sm:text-5xl font-extrabold text-[#7342E2] font-mono">
                  <AnimeCounter to={20.81} decimals={2} suffix="%" />
                </div>
                <p className="text-xs font-medium text-[#192837]/70">CAGR driving explosive growth</p>
              </div>
            </AnimeScrollReveal>

            <AnimeScrollReveal delay={400} direction="scale">
              <div className="bg-white p-8 rounded-3xl border border-[#E2E6E2] text-center space-y-2 shadow-xs hover:border-[#7342E2]/40 transition-colors">
                <div style={{ fontFamily: 'var(--font-heading)' }} className="text-4xl sm:text-5xl font-extrabold text-[#7342E2] font-mono">
                  <AnimeCounter to={58} decimals={0} suffix="%" />
                </div>
                <p className="text-xs font-medium text-[#192837]/70">Organizations adopting FAIR model</p>
              </div>
            </AnimeScrollReveal>
          </div>

          {/* Supporting Paragraph */}
          <AnimeScrollReveal delay={300} direction="up">
            <div className="max-w-3xl mx-auto bg-white p-8 sm:p-10 rounded-3xl border border-[#E2E6E2] text-center text-sm sm:text-base text-[#192837]/80 leading-relaxed font-normal shadow-xs">
              "Boards demand financial risk language. Regulators require exact exposure data. Cyber insurers demand quantified metrics. The transition to dollar-denominated risk is the new standard."
            </div>
          </AnimeScrollReveal>
        </div>
      </section>

      {/* 4. WHY CYBERRISK QUANT SECTION (COMPETITIVE DIFFERENTIATION) */}
      <section className="py-24 px-5 sm:px-8 bg-white border-t border-[#E2E6E2]">
        <div className="max-w-[1280px] mx-auto space-y-16">
          <AnimeScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#7342E2] bg-[#EEEBFF] px-3.5 py-1 rounded-full font-mono">
                DIFFERENTIATION
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)' }} className="text-3xl sm:text-5xl font-extrabold text-[#192837] tracking-tight">
                Engineered Differently
              </h2>
            </div>
          </AnimeScrollReveal>

          {/* 4-Column Feature Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimeScrollReveal delay={100} direction="up">
              <div className="p-8 rounded-3xl bg-[#F7F8FA] border border-[#E2E6E2] space-y-3 h-full">
                <span className="text-xs font-mono font-bold text-[#7342E2]">01</span>
                <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-lg font-bold text-[#192837]">
                  Actually Continuous
                </h3>
                <p className="text-xs text-[#192837]/70 leading-relaxed">
                  Real-time ingestion and continuous re-scoring instead of stale quarterly reports.
                </p>
              </div>
            </AnimeScrollReveal>

            <AnimeScrollReveal delay={200} direction="up">
              <div className="p-8 rounded-3xl bg-[#F7F8FA] border border-[#E2E6E2] space-y-3 h-full">
                <span className="text-xs font-mono font-bold text-[#7342E2]">02</span>
                <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-lg font-bold text-[#192837]">
                  Budget Optimization
                </h3>
                <p className="text-xs text-[#192837]/70 leading-relaxed">
                  Solves remediation selection as an exact 0/1 knapsack mathematical optimization problem.
                </p>
              </div>
            </AnimeScrollReveal>

            <AnimeScrollReveal delay={300} direction="up">
              <div className="p-8 rounded-3xl bg-[#F7F8FA] border border-[#E2E6E2] space-y-3 h-full">
                <span className="text-xs font-mono font-bold text-[#7342E2]">03</span>
                <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-lg font-bold text-[#192837]">
                  RBI & SEBI Native
                </h3>
                <p className="text-xs text-[#192837]/70 leading-relaxed">
                  Native compliance mapping for RBI Cyber Security Framework and SEBI CSCRF.
                </p>
              </div>
            </AnimeScrollReveal>

            <AnimeScrollReveal delay={400} direction="up">
              <div className="p-8 rounded-3xl bg-[#F7F8FA] border border-[#E2E6E2] space-y-3 h-full">
                <span className="text-xs font-mono font-bold text-[#7342E2]">04</span>
                <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-lg font-bold text-[#192837]">
                  Plain-Language AI
                </h3>
                <p className="text-xs text-[#192837]/70 leading-relaxed">
                  Ask risk questions directly in plain English without hunting through complex dashboards.
                </p>
              </div>
            </AnimeScrollReveal>
          </div>

          {/* Small-print positioning note */}
          <div className="text-center text-xs text-[#192837]/50 font-medium max-w-2xl mx-auto pt-2">
            Positioned for mid-market and enterprise teams seeking full CRQ capability at justifiable value.
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA BAND */}
      <section className="py-24 px-5 sm:px-8 bg-[#192837] text-white">
        <div className="max-w-[1280px] mx-auto text-center space-y-6">
          <h2 style={{ fontFamily: 'var(--font-heading)' }} className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            See Your Cyber Risk Exposure Today.
          </h2>
          <p className="text-sm text-white/70 max-w-xl mx-auto leading-relaxed">
            Convert vulnerability findings into executive-ready financial metrics instantly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('/dashboard')}
              className="bg-[#7342E2] hover:bg-[#6232c9] text-white font-semibold px-8 py-4 rounded-full text-sm transition-all shadow-lg cursor-pointer flex items-center gap-2"
            >
              <span>See Your Risk Score</span>
            </button>
            <button
              onClick={() => onNavigate('/pricing')}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full text-sm transition-all cursor-pointer border border-white/20"
            >
              View Pricing Tiers
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-5 sm:px-8 bg-white border-t border-[#E2E6E2] text-xs text-[#192837]/60">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" fill="none" viewBox="0 0 256 256">
              <path d="M 64 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 L 128 64 L 128 64.5 L 161 32 L 192 0 L 256 0 L 256 64 L 192 128 L 128 128 L 128 192 L 96 223 L 63.5 256 L 0 256 L 0 192 Z M 256 192 L 224 223 L 191.5 256 L 128 256 L 128 192 L 192 128 L 256 128 Z" fill="#192837"/>
            </svg>
            <span style={{ fontFamily: 'var(--font-heading)' }} className="font-bold text-[#192837]">CyberRisk Quant</span>
            <span>© 2026 CyberRisk Quant Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('/frameworks')} className="hover:text-[#7342E2]">Frameworks</button>
            <button onClick={() => onNavigate('/pricing')} className="hover:text-[#7342E2]">Pricing</button>
            <button onClick={() => onNavigate('/resources')} className="hover:text-[#7342E2]">Resources</button>
            <button onClick={() => onNavigate('/dashboard')} className="hover:text-[#7342E2]">Platform Dashboard</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
