import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface SiteHeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ currentRoute, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (link: string) => {
    setMobileMenuOpen(false);
    if (link === 'Platform') {
      onNavigate('/');
      setTimeout(() => {
        const el = document.getElementById('platform');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (link === 'How It Works') {
      onNavigate('/');
      setTimeout(() => {
        const el = document.getElementById('how-it-works');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (link === 'Frameworks') {
      onNavigate('/frameworks');
    } else if (link === 'Pricing') {
      onNavigate('/pricing');
    } else if (link === 'Resources') {
      onNavigate('/resources');
    }
  };

  const navLinks = ['Platform', 'How It Works', 'Frameworks', 'Pricing', 'Resources'];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-[#E2E6E2]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo & Wordmark */}
        <div 
          onClick={() => onNavigate('/')}
          className="cursor-pointer flex items-center gap-3"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="32" 
            height="32" 
            fill="none" 
            overflow="visible" 
            viewBox="0 0 256 256"
          >
            <path 
              d="M 64 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 L 128 64 L 128 64.5 L 161 32 L 192 0 L 256 0 L 256 64 L 192 128 L 128 128 L 128 192 L 96 223 L 63.5 256 L 0 256 L 0 192 Z M 256 192 L 224 223 L 191.5 256 L 128 256 L 128 192 L 192 128 L 256 128 Z" 
              fill="#192837"
            />
          </svg>
          <span style={{ fontFamily: 'var(--font-heading)' }} className="text-xl font-bold tracking-tight text-[#192837]">
            CyberRisk Quant
          </span>
        </div>

        {/* Center: Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isCurrent = 
              (link === 'Frameworks' && currentRoute === '/frameworks') ||
              (link === 'Pricing' && currentRoute === '/pricing') ||
              (link === 'Resources' && currentRoute === '/resources');

            return (
              <button
                key={link}
                onClick={() => handleLinkClick(link)}
                className={`hover:text-[#7342E2] transition-colors cursor-pointer bg-transparent border-none p-0 text-sm font-medium ${
                  isCurrent ? 'text-[#7342E2] font-bold' : 'text-[#192837]'
                }`}
              >
                {link}
              </button>
            );
          })}
        </div>

        {/* Right: Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onNavigate('/dashboard')}
            className="rounded-full px-5 py-2 text-sm font-semibold text-white cursor-pointer transition-all duration-200 border-none shadow-sm hover:brightness-110"
            style={{ background: '#7342E2' }}
          >
            Request Demo
          </button>
          <button
            onClick={() => onNavigate('/dashboard')}
            className="rounded-full px-5 py-2 text-sm font-semibold cursor-pointer transition-all duration-200 border-none"
            style={{ background: '#F2F2EE', color: '#192837' }}
          >
            Sign In
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-1 text-[#192837] cursor-pointer bg-transparent border-none"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-[#192837]/35 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 z-50 w-[min(88vw,360px)] h-[100dvh] bg-[#CFC8C5] p-6 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#192837]/20">
                  <div className="flex items-center gap-2">
                    <svg width="24" height="24" fill="none" viewBox="0 0 256 256">
                      <path d="M 64 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 L 128 64 L 128 64.5 L 161 32 L 192 0 L 256 0 L 256 64 L 192 128 L 128 128 L 128 192 L 96 223 L 63.5 256 L 0 256 L 0 192 Z M 256 192 L 224 223 L 191.5 256 L 128 256 L 128 192 L 192 128 L 256 128 Z" fill="#192837"/>
                    </svg>
                    <span style={{ fontFamily: 'var(--font-heading)' }} className="font-bold text-[#192837]">
                      CyberRisk Quant
                    </span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-[#192837]">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex flex-col gap-5 py-6">
                  {navLinks.map((link) => (
                    <button
                      key={link}
                      onClick={() => handleLinkClick(link)}
                      className="text-left text-lg font-medium text-[#192837] hover:text-[#7342E2]"
                    >
                      {link}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-6 border-t border-[#192837]/20">
                <button
                  onClick={() => { setMobileMenuOpen(false); onNavigate('/dashboard'); }}
                  className="w-full rounded-full py-3 font-semibold text-white text-sm"
                  style={{ background: '#7342E2' }}
                >
                  Request Demo
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); onNavigate('/dashboard'); }}
                  className="w-full rounded-full py-3 font-semibold text-[#192837] text-sm"
                  style={{ background: '#F2F2EE' }}
                >
                  Sign In
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
