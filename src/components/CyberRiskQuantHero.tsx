import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { animate } from 'animejs';
import { Menu, X } from 'lucide-react';

interface HeroProps {
  onOpenPlatform?: (target?: string) => void;
  onNavigate?: (route: string) => void;
}

export const CyberRiskQuantHero: React.FC<HeroProps> = ({ onOpenPlatform, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const navLinks = ['Platform', 'How It Works', 'Frameworks', 'Pricing', 'Resources'];

  useEffect(() => {
    const el = document.querySelector('.hero-ambient-glow');
    if (el) {
      animate(el, {
        scale: [1, 1.15, 1],
        opacity: [0.35, 0.6, 0.35],
        duration: 8000,
        loop: true,
        ease: 'inOutSine'
      });
    }
  }, []);

  const handleNavClick = (link: string) => {
    setMobileMenuOpen(false);
    if (link === 'Platform') {
      const el = document.getElementById('platform');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (link === 'How It Works') {
      const el = document.getElementById('how-it-works');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (link === 'Frameworks') {
      onNavigate?.('/frameworks');
    } else if (link === 'Pricing') {
      onNavigate?.('/pricing');
    } else if (link === 'Resources') {
      onNavigate?.('/resources');
    }
  };

  const handleCtaClick = () => {
    if (onNavigate) {
      onNavigate('/dashboard');
    } else if (onOpenPlatform) {
      onOpenPlatform('executive');
    }
  };

  return (
    <div 
      ref={heroRef}
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between bg-[#F7F8FA] text-[#192837]"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-75 mix-blend-multiply filter brightness-70 contrast-130 pointer-events-none"
      >
        <source 
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_003132_8b7edcb6-c64d-4a52-a9ca-879942e122ad.mp4" 
          type="video/mp4" 
        />
      </video>

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#192837]/20 via-transparent to-[#192837]/30 pointer-events-none z-0" />

      {/* Ambient Glow Aura */}
      <div className="hero-ambient-glow absolute top-1/4 left-1/3 w-96 h-96 bg-[#7342E2]/20 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Top Navbar */}
      <nav className="relative z-10 w-full max-w-[1280px] mx-auto px-5 sm:px-8 py-5 flex items-center justify-between">
        {/* Left: Custom SVG Logo + Wordmark */}
        <div 
          onClick={handleCtaClick}
          className="cursor-pointer flex items-center gap-3 group"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="32" 
            height="32" 
            fill="none" 
            overflow="visible" 
            viewBox="0 0 256 256"
            className="transition-transform group-hover:scale-105"
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
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => handleNavClick(link)}
              className="text-[#192837]/80 hover:text-[#7342E2] transition-colors duration-200 cursor-pointer bg-transparent border-none p-0 text-sm font-medium"
            >
              {link}
            </button>
          ))}
        </div>

        {/* Right: Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={handleCtaClick}
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-white cursor-pointer transition-all duration-200 border-none shadow-sm hover:brightness-110 active:scale-95"
            style={{ background: '#7342E2' }}
          >
            Request Demo
          </button>
          <button
            onClick={handleCtaClick}
            className="rounded-full px-5 py-2.5 text-sm font-semibold cursor-pointer transition-all duration-200 border border-[#192837]/10 hover:bg-white"
            style={{ background: '#F2F2EE', color: '#192837' }}
          >
            Sign In
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-1 text-[#192837] cursor-pointer bg-transparent border-none"
          aria-label="Open menu"
        >
          <Menu className="w-7 h-7" />
        </button>
      </nav>

      {/* Hero Content Block */}
      <div 
        className="relative z-10 w-full max-w-[1280px] mx-auto px-5 sm:px-8 flex-1 flex flex-col justify-center"
        style={{ paddingTop: 'clamp(40px, 8vw, 72px)', paddingBottom: '40px' }}
      >
        <div className="w-full max-w-[580px]">
          {/* Hero Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.85rem, 5vw, 3.25rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#192837',
              marginBottom: '24px',
            }}
            className="font-bold tracking-tight"
          >
            Know Your Cyber Risk in Rupees, Not Guesswork
          </motion.h1>

          {/* Hero Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
              lineHeight: 1.6,
              opacity: 0.85,
              marginBottom: '36px'
            }}
            className="font-normal text-[#192837]"
          >
            CyberRisk Quant continuously converts vulnerabilities, controls, and threat data into a single financial exposure figure — so CISOs, boards, and regulators can speak the same language.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            {/* Primary CTA */}
            <motion.button
              onClick={handleCtaClick}
              whileHover={{ scale: 1.03, filter: 'brightness(1.08)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                backgroundColor: '#7342E2',
                color: '#FFFFFF',
                borderRadius: '50px',
                padding: '16px 28px',
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                boxShadow: '0 8px 32px rgba(115, 66, 226, 0.3)',
                minWidth: '210px',
              }}
              className="font-semibold flex items-center justify-center border-none cursor-pointer"
            >
              <span>See Your Risk Score</span>
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              onClick={handleCtaClick}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                backgroundColor: '#F2F2EE',
                color: '#192837',
                borderRadius: '50px',
                padding: '16px 28px',
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                border: '1px solid rgba(25, 40, 55, 0.12)',
              }}
              className="font-semibold flex items-center justify-center cursor-pointer hover:bg-white"
            >
              <span>Watch 2-Min Demo</span>
            </motion.button>
          </motion.div>
        </div>
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
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: 'min(88vw, 360px)',
                height: '100dvh',
                backgroundColor: '#CFC8C5',
                boxShadow: '-12px 0 48px rgba(25, 40, 55, 0.18)',
              }}
              className="fixed right-0 top-0 z-50 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#192837]/20">
                  <div className="flex items-center gap-2.5">
                    <svg width="28" height="28" fill="none" viewBox="0 0 256 256">
                      <path d="M 64 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 L 128 64 L 128 64.5 L 161 32 L 192 0 L 256 0 L 256 64 L 192 128 L 128 128 L 128 192 L 96 223 L 63.5 256 L 0 256 L 0 192 Z M 256 192 L 224 223 L 191.5 256 L 128 256 L 128 192 L 192 128 L 256 128 Z" fill="#192837"/>
                    </svg>
                    <span style={{ fontFamily: 'var(--font-heading)' }} className="text-lg font-bold tracking-tight text-[#192837]">
                      CyberRisk Quant
                    </span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 text-[#192837]">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex flex-col gap-6 py-6">
                  {navLinks.map((link) => (
                    <button
                      key={link}
                      onClick={() => handleNavClick(link)}
                      className="text-left text-lg font-medium text-[#192837] hover:text-[#7342E2]"
                    >
                      {link}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-6 border-t border-[#192837]/20">
                <button
                  onClick={() => { setMobileMenuOpen(false); handleCtaClick(); }}
                  className="w-full rounded-full py-3.5 font-semibold text-center text-sm text-white"
                  style={{ background: '#7342E2' }}
                >
                  Request Demo
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); handleCtaClick(); }}
                  className="w-full rounded-full py-3.5 font-semibold text-center text-sm text-[#192837]"
                  style={{ background: '#F2F2EE' }}
                >
                  Sign In
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
