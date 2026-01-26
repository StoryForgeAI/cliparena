"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CUSTOM SVG ICONS ---
const ZapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);

const TrophyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
);

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);

const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0F1117] text-white selection:bg-[#6C2BFF] selection:text-white overflow-x-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#6C2BFF]/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#00D1B2]/5 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl">
        <nav className="bg-[#1A1D26]/90 backdrop-blur-xl border border-white/10 rounded-2xl px-4 md:px-8 py-3 md:py-4 flex justify-between items-center shadow-2xl relative">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer group shrink-0" onClick={() => window.location.href='/'}>
            <div className="w-9 h-9 md:w-10 md:h-10 bg-[#6C2BFF] rounded-xl flex items-center justify-center font-black text-white italic shadow-[0_0_15px_rgba(108,43,255,0.4)] group-hover:scale-105 transition-transform">
              CA
            </div>
            <span className="font-black tracking-tighter text-xl md:text-2xl block">CLIPARENA</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 text-[10px] font-bold tracking-[0.4em] text-gray-400">
            <button onClick={() => window.location.href='/plans'} className="hover:text-[#6C2BFF] transition-all uppercase">Plans</button>
            <button onClick={() => window.location.href='/about-us'} className="hover:text-[#6C2BFF] transition-all uppercase">About us</button>
          </div>

          {/* Action Buttons & Mobile Toggle */}
          <div className="flex items-center gap-2 md:gap-4">
            <button className="hidden sm:block text-[11px] font-bold tracking-widest hover:text-[#6C2BFF] transition-all px-4 py-2 uppercase">Login</button>
            <button 
              onClick={() => window.location.href='/plans'}
              className="bg-white text-black px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-[10px] md:text-[11px] font-black tracking-widest hover:bg-[#6C2BFF] hover:text-white transition-all active:scale-95 shadow-xl uppercase"
            >
              Join
            </button>
            
            {/* Mobile Menu Trigger */}
            <button 
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>

          {/* Mobile Overlay Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-full left-0 right-0 mt-2 p-6 bg-[#1A1D26] border border-white/10 rounded-2xl shadow-3xl flex flex-col gap-6 md:hidden"
              >
                <button onClick={() => window.location.href='/plans'} className="text-left font-black tracking-widest uppercase text-sm border-b border-white/5 pb-2">Plans</button>
                <button onClick={() => window.location.href='/about-us'} className="text-left font-black tracking-widest uppercase text-sm border-b border-white/5 pb-2">About us</button>
                <button className="text-left font-black tracking-widest uppercase text-sm text-[#6C2BFF]">Login</button>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative pt-40 md:pt-52 pb-20 px-6 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl"
        >
          <div className="inline-block px-4 md:px-5 py-2 rounded-full border border-[#6C2BFF]/30 bg-[#6C2BFF]/5 text-[#6C2BFF] text-[8px] md:text-[10px] font-black tracking-[0.4em] mb-8 md:mb-12 uppercase">
            The Attention Economy is Over
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-[110px] lg:text-[130px] font-black mb-8 tracking-tighter leading-[1] md:leading-[0.8] uppercase">
            SKILL. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C2BFF] via-[#a47dff] to-[#00D1B2] animate-gradient block sm:inline">
              NOT ALGORITHM.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-400 text-base md:text-2xl mb-12 md:text-16 leading-relaxed font-light px-4">
            ClipArena is the digital coliseum where the community decides. No bots, no clickbait, just pure <span className="text-white font-bold tracking-tight underline decoration-[#6C2BFF] decoration-2 underline-offset-4">Value Competition</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
            <motion.button 
              onClick={() => window.location.href='/plans'}
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(108,43,255,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-10 md:px-14 py-5 md:py-7 bg-[#6C2BFF] text-white text-lg md:text-xl font-black rounded-2xl transition-all shadow-lg uppercase"
            >
              Get Started
            </motion.button>
            <button className="group flex items-center gap-4 text-[10px] md:text-xs font-black tracking-[0.2em] hover:text-[#00D1B2] transition-all py-4 px-6 uppercase">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#00D1B2] transition-colors">
                <PlayIcon />
              </div>
              Watch Manifesto
            </button>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <section className="mt-32 md:mt-48 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <FeatureCard 
            icon={<ZapIcon />} 
            title="HUMAN VOTE" 
            text="You get 3 votes per week. Use them wisely. Every vote is a conscious decision for real value."
            delay={0.1}
          />
          <FeatureCard 
            icon={<TrophyIcon />} 
            title="PRIZE POOL" 
            text="45% of all subscription revenue goes directly to the weekly top creators. Zero ads."
            delay={0.2}
            highlight
          />
          <FeatureCard 
            icon={<ShieldIcon />} 
            title="VERIFIED CONTENT" 
            text="YouTube API integration ensures content ownership. No stolen clips. Only original skill."
            delay={0.3}
          />
        </section>

        {/* Manifesto Text Section */}
        <section className="mt-32 md:mt-48 py-20 md:py-32 w-full bg-[#1A1D26]/30 border-y border-white/5 relative overflow-hidden flex flex-col items-center px-6">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[#6C2BFF] text-3xl sm:text-4xl md:text-7xl font-black mb-8 md:mb-12 italic tracking-tighter leading-tight uppercase"
            >
              <div>THE ALGORITHM IS DEAD.</div>
              <div className="md:mt-2">LONG LIVE THE CREATOR.</div>
            </motion.div>
            <div className="h-1 w-24 bg-[#00D1B2] mx-auto mb-8 md:mb-12 rounded-full shadow-[0_0_20px_#00D1B2]" />
            <p className="text-gray-300 text-lg md:text-3xl leading-relaxed font-light">
              Current platforms reward retention tricks. We reward <span className="text-white font-bold italic">real creativity</span>. 
              A fair ecosystem where attention does not equal value. Value equals reward.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-32 md:mt-52 pb-16 text-center px-6">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/10">
            <div className="w-2 h-2 bg-[#6C2BFF] rounded-full animate-ping" />
          </div>
          <p className="text-gray-600 font-mono text-[8px] md:text-[10px] tracking-[0.4em] uppercase">
            CLIPARENA // NO ALGORITHMS // 2026
          </p>
        </footer>
      </main>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </div>
  );
}

function FeatureCard({ icon, title, text, delay, highlight = false }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true }}
      className={`relative p-8 md:p-12 rounded-[32px] md:rounded-[40px] border transition-all duration-500 group ${
        highlight 
        ? 'bg-[#6C2BFF] border-transparent shadow-[0_20px_50px_rgba(108,43,255,0.3)]' 
        : 'bg-[#1A1D26] border-white/5'
      }`}
    >
      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:rotate-6 ${
        highlight ? 'bg-white text-[#6C2BFF]' : 'bg-[#6C2BFF]/10 text-[#6C2BFF]'
      }`}>
        {icon}
      </div>
      <h3 className={`text-xl md:text-2xl font-black tracking-widest mb-4 md:mb-6 uppercase ${highlight ? 'text-white' : 'text-gray-100'}`}>
        {title}
      </h3>
      <p className={`text-sm md:text-base leading-relaxed ${highlight ? 'text-white/80' : 'text-gray-400'}`}>
        {text}
      </p>
    </motion.div>
  );
}