"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CUSTOM SVG ICONS ---
const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);

const CreditsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><line x1="12" y1="18" x2="12" y2="6"></line></svg>
);

const AffiliateIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);

const PlusIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

const ZapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);

const TrophyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55-.47.98-.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
);

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0F1117] text-white selection:bg-[#6C2BFF] selection:text-white overflow-x-hidden font-sans pb-32 md:pb-0">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#6C2BFF]/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00D1B2]/5 blur-[120px] rounded-full" />
      </div>

      {/* Desktop Header */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl hidden md:block">
        <nav className="bg-[#1A1D26]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] px-8 py-4 flex justify-between items-center shadow-2xl relative">
          <div className="flex items-center gap-12 text-[11px] font-black tracking-[0.3em] text-gray-400">
            <NavButton label="HOME" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
            <NavButton label="CREDITS" active={activeTab === 'credits'} onClick={() => setActiveTab('credits')} />
          </div>

          {/* Large Center Create Button */}
          <motion.button 
            whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(108,43,255,0.5)" }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-1/2 -translate-x-1/2 bg-[#6C2BFF] w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg border border-white/20 z-10"
          >
            <PlusIcon />
          </motion.button>

          <div className="flex items-center gap-12 text-[11px] font-black tracking-[0.3em] text-gray-400">
            <NavButton label="AFFILIATE" active={activeTab === 'affiliate'} onClick={() => setActiveTab('affiliate')} />
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#6C2BFF] to-[#00D1B2] p-[2px]">
              <div className="w-full h-full rounded-full bg-[#1A1D26] flex items-center justify-center overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative pt-32 md:pt-64 pb-24 px-6 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-[#6C2BFF]/30 bg-[#6C2BFF]/5 text-[#6C2BFF] text-[10px] font-black tracking-[0.4em] mb-12 uppercase">
             PRO DASHBOARD ACCESS
          </div>

          <h1 className="text-5xl md:text-[120px] font-black mb-10 tracking-tighter leading-[0.85] uppercase italic">
            YOUR STAGE.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C2BFF] via-[#a47dff] to-[#00D1B2] animate-gradient">
              YOUR RULES.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-2xl mb-16 leading-relaxed font-light">
            Monitor your earnings, manage your credits, and <span className="text-white font-bold">create legendary content</span> that dominates the Arena.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <QuickActionButton icon={<ZapIcon />} label="FAST UPLOAD" color="#6C2BFF" />
            <QuickActionButton icon={<TrophyIcon />} label="VIEW RANK" color="#00D1B2" />
            <QuickActionButton icon={<ShieldIcon />} label="SECURITY" color="#444" />
          </div>
        </motion.div>

        {/* Feature Grid */}
        <section className="mt-32 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
            <DashboardCard 
              title="EARNINGS" 
              value="$1,240.50" 
              desc="This Season" 
              icon={<TrophyIcon />}
            />
            <DashboardCard 
              title="CREDITS" 
              value="450" 
              desc="Available for Votes" 
              icon={<ZapIcon />}
            />
            <DashboardCard 
              title="REACH" 
              value="2.4M" 
              desc="Verified Humans" 
              icon={<ShieldIcon />}
            />
        </section>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-50">
        <nav className="bg-[#1A1D26]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] px-4 py-3 flex justify-between items-center shadow-2xl relative">
          <MobileNavButton icon={<HomeIcon />} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <MobileNavButton icon={<CreditsIcon />} label="Credits" active={activeTab === 'credits'} onClick={() => setActiveTab('credits')} />
          
          {/* Mobile Center Create Button Container to prevent overlap issues */}
          <div className="relative w-16 h-12 flex justify-center">
             <motion.button 
                whileTap={{ scale: 0.9 }}
                className="absolute -top-10 bg-[#6C2BFF] w-16 h-16 rounded-[2rem] flex items-center justify-center shadow-[0_10px_30px_rgba(108,43,255,0.4)] border-4 border-[#0F1117] z-50"
             >
               <PlusIcon />
             </motion.button>
          </div>

          <MobileNavButton icon={<AffiliateIcon />} label="Affiliate" active={activeTab === 'affiliate'} onClick={() => setActiveTab('affiliate')} />
          <div className="flex flex-col items-center justify-center w-12 gap-1 opacity-60">
             <div className="w-7 h-7 rounded-full overflow-hidden border border-white/20">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
             </div>
             <span className="text-[8px] font-black text-white uppercase">Profile</span>
          </div>
        </nav>
      </div>

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

// --- SUBCOMPONENTS ---

function NavButton({ label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`relative py-2 transition-all hover:text-white uppercase ${active ? 'text-white' : 'text-gray-500'}`}
    >
      {label}
      {active && (
        <motion.div 
          layoutId="activeNav"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#6C2BFF]"
        />
      )}
    </button>
  );
}

function MobileNavButton({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-12 gap-1 transition-all ${active ? 'text-[#6C2BFF]' : 'text-gray-500'}`}
    >
      <div className={active ? 'scale-110 transition-transform' : ''}>
        {icon}
      </div>
      <span className="text-[8px] font-black uppercase tracking-wider">{label}</span>
    </button>
  );
}

function QuickActionButton({ icon, label, color }) {
  return (
    <motion.button
      whileHover={{ y: -5, backgroundColor: `${color}20` }}
      className="flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl transition-all w-full sm:w-auto"
    >
      <span style={{ color }}>{icon}</span>
      <span className="text-[11px] font-black tracking-widest uppercase">{label}</span>
    </motion.button>
  );
}

function DashboardCard({ title, value, desc, icon }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-[#1A1D26] border border-white/5 p-8 rounded-[2.5rem] text-left relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase mb-4">{title}</h3>
      <div className="text-4xl font-black italic mb-2 tracking-tighter">{value}</div>
      <p className="text-xs text-gray-400 font-light">{desc}</p>
      <div className="mt-6 w-full h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: '70%' }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-[#6C2BFF]" 
        />
      </div>
    </motion.div>
  );
}