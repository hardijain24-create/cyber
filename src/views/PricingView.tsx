import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, Zap, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';

interface PricingViewProps {
  onNavigate?: (route: string) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onNavigate }) => {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');

  const tiers = [
    {
      name: 'Starter',
      badge: 'Essential',
      priceAnnual: '₹8.5 Lakhs',
      priceMonthly: '₹85,000',
      period: '/ year',
      description: 'For growing organizations needing baseline Cyber Risk Quantification and standard compliance mapping.',
      features: [
        'Periodic CRQ Risk Scoring (Monthly)',
        'FAIR Loss Event Modeling',
        'ISO 27001 & NIST CSF Mapping',
        'Up to 250 Scanned Assets',
        'Standard Email Support',
        '5 Executive Dashboard Seats',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Growth / Mid-Market',
      badge: 'Most Popular',
      priceAnnual: '₹14.5 Lakhs',
      priceMonthly: '₹1,45,000',
      period: '/ year (~$16.5K/yr)',
      description: 'Designed specifically for Indian mid-market enterprises facing strict RBI & SEBI compliance requirements.',
      features: [
        'Continuous Real-Time CRQ Engine',
        '0/1 Knapsack Capital Optimizer (ROSI ROI Solver)',
        'Native RBI Cyber Security Framework & SEBI CSCRF Mapping',
        'AI Natural Language Query Assistant',
        'Up to 2,500 Scanned Assets & 20,000 Monte Carlo Runs',
        'CSV & Audit PDF Exporting',
        'Priority CISO Support',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      badge: 'Full Suite',
      priceAnnual: 'Custom',
      priceMonthly: 'Custom',
      period: 'Bespoke Pricing ($50K+/yr)',
      description: 'For large financial institutions, banks, and conglomerates requiring full custom loss modeling and API access.',
      features: [
        'Unlimited Assets & Custom Loss Curves',
        'Dedicated Monte Carlo Simulation Clusters',
        'Custom Regulatory Mapping & RBI/SEBI Audits',
        'Full REST API & SIEM Integration',
        '24/7 Dedicated Cyber Risk Engineer',
        'On-Premise / Hybrid Cloud Deployment',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  const faqs = [
    {
      q: 'How does CyberRisk Quant calculate risk in Rupees?',
      a: 'We use the Open FAIR (Factor Analysis of Information Risk) framework combined with Monte Carlo simulation (20,000 runs per asset) to calculate Loss Event Frequency and Threat Capability against Threat Loss Magnitude.',
    },
    {
      q: 'Does it support Indian regulatory frameworks like RBI and SEBI?',
      a: 'Yes! Unlike global platforms that only support NIST or ISO, CyberRisk Quant natively maps controls to the RBI Cyber Security Framework and the SEBI Cybersecurity and Cyber Resilience Framework (CSCRF).',
    },
    {
      q: 'Can we try the platform before purchasing?',
      a: 'Absolutely. You can click "See Your Risk Score" or "Request Demo" to access the live interactive dashboard with your sample data.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F7F4] text-[#192837] py-12 px-5 sm:px-8">
      <div className="max-w-[1280px] mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7342E2] bg-[#EEEBFF] px-3.5 py-1.5 rounded-full inline-block font-mono">
            TRANSPARENT MID-MARKET PRICING
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)' }} className="text-3xl sm:text-5xl font-extrabold text-[#192837] tracking-tight">
            Enterprise-Grade CRQ at Mid-Market Value
          </h1>
          <p className="text-base text-[#192837]/80 leading-relaxed">
            Positioned to serve the gap between SMB tools (~$16.5K/yr) and enterprise platforms ($50K+/yr) — full financial loss modeling at a price Indian companies can justify.
          </p>

          {/* Billing Switcher */}
          <div className="inline-flex items-center gap-2 p-1 bg-[#EEF0EC] rounded-full border border-[#E2E6E2] mt-4">
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                billingCycle === 'annual' ? 'bg-[#7342E2] text-white shadow-xs' : 'text-[#192837]/70 hover:text-[#192837]'
              }`}
            >
              Annual Billing <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-white ml-1">Save 20%</span>
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                billingCycle === 'monthly' ? 'bg-[#7342E2] text-white shadow-xs' : 'text-[#192837]/70 hover:text-[#192837]'
              }`}
            >
              Monthly Billing
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                tier.highlighted
                  ? 'bg-white border-2 border-[#7342E2] shadow-xl scale-105'
                  : 'bg-white border border-[#E2E6E2] hover:shadow-lg'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#7342E2] text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-xs">
                  {tier.badge}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-2xl font-bold text-[#192837]">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-[#192837]/70 mt-1 min-h-[36px]">{tier.description}</p>
                </div>

                <div className="pt-2 border-t border-[#E2E6E2]">
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#192837] font-mono">
                    {billingCycle === 'annual' ? tier.priceAnnual : tier.priceMonthly}
                  </div>
                  <div className="text-xs font-semibold text-[#7342E2] mt-1">{tier.period}</div>
                </div>

                <ul className="space-y-3 pt-4 border-t border-[#E2E6E2]">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-xs text-[#192837] font-medium">
                      <Check className="w-4 h-4 text-[#7342E2] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => onNavigate?.('/dashboard')}
                  className={`w-full py-3.5 px-6 rounded-full text-sm font-semibold cursor-pointer transition-all duration-200 shadow-xs flex items-center justify-center gap-2 ${
                    tier.highlighted
                      ? 'bg-[#7342E2] text-white hover:bg-[#6232c9]'
                      : 'bg-[#F2F2EE] text-[#192837] hover:bg-[#e4e4dd]'
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E2E6E2] space-y-6">
          <div className="flex items-center gap-2 text-[#7342E2] text-xs font-bold uppercase tracking-wider font-mono">
            <HelpCircle className="w-4 h-4" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)' }} className="text-2xl font-bold text-[#192837]">
            Everything you need to know about CyberRisk Quant
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="p-5 rounded-2xl bg-[#FBFCFA] border border-[#E2E6E2] space-y-2">
                <h4 className="text-sm font-bold text-[#192837]">{faq.q}</h4>
                <p className="text-xs text-[#192837]/75 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
