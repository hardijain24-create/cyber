import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { ORG_RISK_SUMMARY, OPTIMIZER_SUMMARY } from '../data/mockData';

export const AIConsoleView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; data?: any }>>([
    {
      sender: 'ai',
      text: 'Welcome to RiskForge Executive AI Console. You can ask natural language questions regarding organization exposure, Monte Carlo VaR, compliance gap monetary risk, or budget optimization.'
    }
  ]);

  const sampleQueries = [
    'What is our 95% VaR exposure?',
    'Which business unit has the highest risk?',
    'What is the optimal remediation plan for ₹5 Crore budget?',
    'Which ISO 27001 controls have the biggest compliance gaps?'
  ];

  const handleAsk = (userText: string) => {
    if (!userText.trim()) return;

    const newMessages = [...messages, { sender: 'user' as const, text: userText }];
    setMessages(newMessages);
    setQuery('');

    setTimeout(() => {
      let aiResponse = '';
      const textLower = userText.toLowerCase();

      if (textLower.includes('var') || textLower.includes('exposure') || textLower.includes('expected loss')) {
        aiResponse = `Based on stochastic Monte Carlo simulation across 150 assets:
• Expected Annual Loss (ALE): ₹9,885.26 Crore
• 95% Confidence Value at Risk (VaR): ₹12,928.33 Crore
• 99% Severe Tail Loss (VaR): ₹13,980.28 Crore

The primary driver of risk is unpatched remote code execution vulnerabilities in high-criticality domain controllers.`;
      } else if (textLower.includes('business unit') || textLower.includes('payments') || textLower.includes('highest risk')) {
        aiResponse = `The highest-risk business unit is **Payments** with an Expected Annual Loss of ₹2,490.92 Crore (Risk Score 91/100, Critical).

Payments accounts for 25.2% of total organization cyber loss exposure across 17 primary transaction servers.`;
      } else if (textLower.includes('budget') || textLower.includes('remediation') || textLower.includes('5 crore') || textLower.includes('optimize')) {
        aiResponse = `Solving the 0/1 Knapsack optimal allocation algorithm for a ₹5.0 Crore budget yields:
• **Risk Reduced**: 39.69% (ALE Saved: ₹3,923.72 Crore)
• **Capital Spent**: ₹4.73 Crore (94.6% utilization)
• **Recommended Actions**: 130 prioritized patches (Top priority: Log4Shell RCE on Prod-Svr-077).`;
      } else if (textLower.includes('iso') || textLower.includes('compliance') || textLower.includes('gap')) {
        aiResponse = `ISO/IEC 27001 Compliance Status:
• **Overall Compliance**: 93.2% (19 Fully Implemented, 3 Partial Gaps)
• **Top Monetary Compliance Gap**: Privileged Access Management (A.8.24) on Prod-Svr-071 (Treasury) generating ₹18.00 Crore monetary risk exposure.`;
      } else {
        aiResponse = `RiskForge Analysis Query Result:
Expected Annual Loss remains ₹9,885.26 Cr. High concentration observed in Payments (₹2,490.92 Cr) and Treasury (₹1,953.07 Cr). 130 fixes recommended for budget allocation.`;
      }

      setMessages([...newMessages, { sender: 'ai', text: aiResponse }]);
    }, 500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E6E2] shadow-xs flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6E5AE6] bg-[#EEEBFF] px-2.5 py-1 rounded-md inline-block mb-1">
            NATURAL LANGUAGE QUERY CONSOLE
          </span>
          <h2 className="text-2xl font-bold text-[#18211D] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#6E5AE6]" /> Ask RiskForge AI
          </h2>
          <p className="text-xs text-[#66716B] mt-1">
            Ask complex risk quantification, VaR, compliance gap, or budget optimization questions in plain English.
          </p>
        </div>
      </div>

      {/* Suggested Query Buttons */}
      <div className="flex flex-wrap gap-2">
        {sampleQueries.map((sq, i) => (
          <button
            key={i}
            onClick={() => handleAsk(sq)}
            className="px-3 py-1.5 rounded-xl bg-white border border-[#E2E6E2] hover:border-[#6E5AE6] hover:bg-[#EEEBFF]/50 text-xs text-[#18211D] font-medium transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <span>{sq}</span>
            <ArrowRight className="w-3 h-3 text-[#6E5AE6]" />
          </button>
        ))}
      </div>

      {/* Chat Conversation Box */}
      <div className="rf-card p-6 min-h-[420px] max-h-[550px] flex flex-col justify-between space-y-4 bg-white">
        <div className="space-y-4 overflow-y-auto pr-1 flex-1">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-[#EEEBFF] border border-[#6E5AE6]/30 flex items-center justify-center text-[#6E5AE6] shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-4 rounded-2xl text-xs max-w-xl leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#6E5AE6] text-white font-medium rounded-tr-none'
                    : 'bg-[#FBFCFA] border border-[#E2E6E2] text-[#18211D] rounded-tl-none whitespace-pre-line font-mono'
                }`}
              >
                {m.text}
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-[#18211D] flex items-center justify-center text-white shrink-0 mt-0.5 text-xs font-bold">
                  CR
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(query);
          }}
          className="flex items-center gap-2 pt-3 border-t border-[#E2E6E2]"
        >
          <input
            type="text"
            placeholder="Type your risk question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rf-input flex-1 py-2 text-xs"
          />
          <button type="submit" className="btn-primary py-2">
            <Send className="w-3.5 h-3.5" />
            <span>Ask</span>
          </button>
        </form>
      </div>
    </div>
  );
};
