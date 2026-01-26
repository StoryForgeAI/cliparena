"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- CUSTOM SVG ICONS ---
const UsersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);

const EyeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

const TargetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
);

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
);

export default function AboutUs() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0F1117] text-white selection:bg-[#6C2BFF] py-20 px-6 font-sans overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-[40%] h-[40%] bg-[#6C2BFF]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-[30%] h-[30%] bg-[#00D1B2]/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Navigation Back */}
        <motion.a 
          href="/"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-16 group cursor-pointer"
        >
          <BackIcon />
          <span className="text-xs font-black tracking-widest uppercase">Back to Arena</span>
        </motion.a>

        {/* Hero Section */}
        <section className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full border border-[#6C2BFF]/30 bg-[#6C2BFF]/10 text-[#6C2BFF] text-[10px] font-black tracking-[0.4em] mb-8 uppercase"
          >
            Behind the Scenes
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black mb-10 tracking-tighter uppercase leading-none"
          >
            We are <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C2BFF] to-[#00D1B2]">ClipArena.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-xl md:text-2xl font-light leading-relaxed max-w-3xl"
          >
            We started with a single, radical idea: creators should be rewarded for their <span className="text-white font-bold italic">actual skill</span>, not their ability to manipulate an invisible algorithm.
          </motion.p>
        </section>

        {/* Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <div className="p-10 rounded-[40px] bg-[#1A1D26] border border-white/5">
            <div className="w-14 h-14 bg-[#6C2BFF]/10 text-[#6C2BFF] rounded-2xl flex items-center justify-center mb-8">
              <EyeIcon />
            </div>
            <h3 className="text-2xl font-black tracking-widest mb-4 uppercase">The Problem</h3>
            <p className="text-gray-400 leading-relaxed font-light">
              Mainstream platforms are broken. They prioritize retention over quality, leading to a world of clickbait and burnt-out creators chasing ghost metrics.
            </p>
          </div>
          <div className="p-10 rounded-[40px] bg-[#6C2BFF] text-white">
            <div className="w-14 h-14 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-8">
              <TargetIcon />
            </div>
            <h3 className="text-2xl font-black tracking-widest mb-4 uppercase">Our Solution</h3>
            <p className="text-white/80 leading-relaxed font-light">
              ClipArena removes the middleman. We provide a clean coliseum where real humans vote for real talent. Our model funds a weekly prize pool for creators.
            </p>
          </div>
        </div>

        {/* Culture Section */}
        <motion.div 
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          className="text-center bg-white/5 p-16 rounded-[48px] border border-white/5"
        >
          <div className="flex justify-center mb-6">
            <UsersIcon />
          </div>
          <h2 className="text-3xl md:text-5xl font-black mt-2 mb-8 uppercase tracking-tighter">Community Driven.</h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light mb-10">
            ClipArena isn't just a platform; it's a social experiment for the next generation of editors and gamers.
          </p>
          <div className="flex flex-wrap justify-center gap-12">
            <div>
              <div className="text-3xl font-black text-[#00D1B2]">100%</div>
              <div className="text-[10px] font-bold text-gray-500 tracking-[0.3em] uppercase">Human Votes</div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#6C2BFF]">45%</div>
              <div className="text-[10px] font-bold text-gray-500 tracking-[0.3em] uppercase">Revenue Share</div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="mt-40 pb-20 text-center border-t border-white/5 pt-20">
          <p className="text-gray-600 font-mono text-[10px] tracking-[0.5em] uppercase leading-relaxed">
            ClipArena Inc. // No Algorithm. No Bullshit. // Established 2026
          </p>
        </footer>
      </div>
    </div>
  );
}