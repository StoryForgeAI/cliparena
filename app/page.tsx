"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0F1117] text-white selection:bg-[#6C2BFF] selection:text-white overflow-x-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#6C2BFF]/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00D1B2]/5 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
        <nav className="bg-[#1A1D26]/80 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-4 flex justify-between items-center shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#6C2BFF] rounded-xl flex items-center justify-center font-black text-white italic shadow-[0_0_20px_rgba(108,43,255,0.6)]">
              CA
            </div>
            <span className="font-black tracking-tighter text-2xl hidden sm:block">CLIPARENA</span>
          </div>
          
          <div className="hidden lg:flex gap-10 text-[10px] font-bold tracking-[0.4em] text-gray-400">
<button onClick={() => window.location.href='/plans'} className="hover:text-[#6C2BFF] transition-all uppercase">Plans</button>            <button className="hover:text-[#6C2BFF] transition-all">ABOUT US</button>
          </div>

          <div className="flex gap-4">
            <button className="text-[11px] font-bold tracking-widest hover:text-[#6C2BFF] transition-all px-4 py-2 uppercase">Login</button>
            <button className="bg-white text-black px-6 py-2.5 rounded-xl text-[11px] font-black tracking-widest hover:bg-[#6C2BFF] hover:text-white transition-all active:scale-95 shadow-xl uppercase">
              Register
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative pt-52 pb-20 px-6 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl"
        >
          <div className="inline-block px-5 py-2 rounded-full border border-[#6C2BFF]/30 bg-[#6C2BFF]/5 text-[#6C2BFF] text-[10px] font-black tracking-[0.4em] mb-12 uppercase">
            The Attention Economy is Over
          </div>

          <h1 className="text-6xl md:text-[130px] font-black mb-8 tracking-tighter leading-[0.8] uppercase">
            SKILL. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C2BFF] via-[#a47dff] to-[#00D1B2] animate-gradient">
              NOT ALGORITHM.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-2xl mb-16 leading-relaxed font-light">
            ClipArena is the digital coliseum where the community decides. No bots, no clickbait, just pure <span className="text-white font-bold tracking-tight underline decoration-[#6C2BFF] decoration-2 underline-offset-4">Value Competition</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(108,43,255,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-14 py-7 bg-[#6C2BFF] text-white text-xl font-black rounded-2xl transition-all shadow-lg uppercase"
            >
              Get Started
            </motion.button>
            <button className="group flex items-center gap-4 text-xs font-black tracking-[0.2em] hover:text-[#00D1B2] transition-all py-4 px-6 uppercase">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#00D1B2] transition-colors">
                <PlayIcon />
              </div>
              Watch Manifesto
            </button>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <section className="mt-48 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard 
            icon={<ZapIcon />} 
            title="HUMAN VOTE" 
            text="You get 3 votes per week. Use them wisely. Every vote is a conscious decision for real value."
            delay={0.2}
          />
          <FeatureCard 
            icon={<TrophyIcon />} 
            title="PRIZE POOL" 
            text="45% of all subscription revenue goes directly to the weekly top creators. Zero ads."
            delay={0.4}
            highlight
          />
          <FeatureCard 
            icon={<ShieldIcon />} 
            title="VERIFIED CONTENT" 
            text="YouTube API integration ensures content ownership. No stolen clips. Only original skill."
            delay={0.6}
          />
        </section>

        {/* Manifesto Text Section */}
        <section className="mt-48 py-32 w-full bg-[#1A1D26]/30 border-y border-white/5 relative overflow-hidden flex flex-col items-center">
          <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[#6C2BFF] text-4xl md:text-7xl font-black mb-12 italic tracking-tighter leading-none uppercase"
            >
              <div>THE ALGORITHM IS DEAD.</div>
              <div>LONG LIVE THE CREATOR.</div>
            </motion.div>
            <div className="h-1.5 w-32 bg-[#00D1B2] mx-auto mb-12 rounded-full shadow-[0_0_20px_#00D1B2]" />
            <p className="text-gray-300 text-xl md:text-3xl leading-relaxed font-light">
              Current platforms reward retention tricks and clickbait hooks. We reward <span className="text-white font-bold italic">real creativity</span>. 
              $1 a month creates a clean, fair ecosystem where attention does not equal value. Value equals reward.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-52 pb-24 text-center">
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-10 border border-white/10">
            <div className="w-2 h-2 bg-[#6C2BFF] rounded-full animate-ping" />
          </div>
          <p className="text-gray-600 font-mono text-[10px] tracking-[0.6em] uppercase">
            CLIPARENA // NO ALGORITHMS BEYOND THIS POINT // 2026
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -12, scale: 1.02 }}
      className={`relative p-12 rounded-[40px] border transition-all duration-500 group ${
        highlight 
        ? 'bg-[#6C2BFF] border-transparent shadow-[0_30px_60px_rgba(108,43,255,0.4)]' 
        : 'bg-[#1A1D26] border-white/5 hover:border-[#6C2BFF]/40'
      }`}
    >
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-transform group-hover:rotate-12 ${
        highlight ? 'bg-white text-[#6C2BFF]' : 'bg-[#6C2BFF]/10 text-[#6C2BFF]'
      }`}>
        {icon}
      </div>
      <h3 className={`text-2xl font-black tracking-widest mb-6 uppercase ${highlight ? 'text-white' : 'text-gray-100'}`}>
        {title}
      </h3>
      <p className={`text-base leading-relaxed ${highlight ? 'text-white/80' : 'text-gray-400'}`}>
        {text}
      </p>
      
      {!highlight && (
        <div className="absolute top-12 right-12 opacity-10 group-hover:opacity-100 transition-opacity">
          <div className="w-1.5 h-1.5 bg-[#6C2BFF] rounded-full" />
        </div>
      )}
    </motion.div>
  );
}