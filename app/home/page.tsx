"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- TYPES & INTERFACES ---
interface NavButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  collapsed: boolean;
}

interface MobileNavButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  color: string;
}

interface DashboardCardProps {
  title: string;
  value: string;
  desc: string;
  icon: React.ReactNode;
}

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

const InfoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="12" x2="12.01" y2="12"></line></svg>
);

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
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

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <motion.div 
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center w-full"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-[#6C2BFF]/30 bg-[#6C2BFF]/5 text-[#6C2BFF] text-[10px] font-black tracking-[0.4em] mb-12 uppercase">
               PRO DASHBOARD ACCESS
            </div>

            <h1 className="text-5xl md:text-[100px] lg:text-[120px] font-black mb-10 tracking-tighter leading-[0.85] uppercase italic">
              YOUR STAGE.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C2BFF] via-[#a47dff] to-[#00D1B2] animate-gradient">
                YOUR RULES.
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-2xl mb-16 leading-relaxed font-light">
              Track your earnings, manage your credits, and <span className="text-white font-bold">create legendary content</span> that dominates the arena.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <QuickActionButton icon={<ZapIcon />} label="FAST UPLOAD" color="#6C2BFF" />
              <QuickActionButton icon={<TrophyIcon />} label="VIEW RANK" color="#00D1B2" />
              <QuickActionButton icon={<ShieldIcon />} label="SECURITY" color="#444" />
            </div>

            <section className="mt-32 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
              <DashboardCard 
                title="EARNINGS" 
                value="$1,240.50" 
                desc="Current Season" 
                icon={<TrophyIcon />}
              />
              <DashboardCard 
                title="CREDITS" 
                value="450" 
                desc="Pending for Votes" 
                icon={<ZapIcon />}
              />
              <DashboardCard 
                title="REACH" 
                value="2.4M" 
                desc="Verified Views" 
                icon={<ShieldIcon />}
              />
            </section>
          </motion.div>
        );
      case 'credits':
        return (
            <motion.div 
              key="credits"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[50vh]"
            >
              <h2 className="text-6xl font-black italic tracking-tighter mb-4 uppercase">CREDITS</h2>
              <div className="h-1 w-24 bg-[#6C2BFF] mb-8"></div>
              <p className="text-gray-400 text-xl font-light tracking-widest uppercase">Management system coming soon.</p>
            </motion.div>
        );
      case 'create':
        return (
            <motion.div 
              key="create"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center min-h-[50vh]"
            >
              <div className="w-24 h-24 bg-[#6C2BFF]/20 rounded-3xl flex items-center justify-center text-[#6C2BFF] mb-8 border border-[#6C2BFF]/30">
                <PlusIcon />
              </div>
              <h2 className="text-6xl font-black italic tracking-tighter mb-4 uppercase">CREATE</h2>
              <div className="h-1 w-24 bg-[#6C2BFF] mb-8"></div>
              <p className="text-gray-400 text-xl font-light tracking-widest uppercase text-center max-w-md px-6">
                Arena submission studio is currently under maintenance. Stay tuned!
              </p>
            </motion.div>
        );
      case 'affiliate':
        return (
          <motion.div 
            key="affiliate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-[50vh]"
          >
            <h2 className="text-6xl font-black italic tracking-tighter mb-4 uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#00D1B2] to-[#6C2BFF]">AFFILIATE</h2>
            <div className="h-1 w-24 bg-[#00D1B2] mb-8"></div>
            <p className="text-gray-400 text-xl font-light tracking-widest uppercase">Partnership program coming soon</p>
          </motion.div>
        );
      case 'about':
        return (
          <motion.div 
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-[50vh] max-w-3xl mx-auto px-6"
          >
            <h2 className="text-6xl font-black italic tracking-tighter mb-4 uppercase">ABOUT US</h2>
            <div className="h-1 w-24 bg-white/20 mb-8"></div>
            <p className="text-gray-400 text-xl leading-relaxed text-center font-light">
              ClipArena is the premier platform for creators to showcase their talent and battle for the spotlight. Our mission is to democratize content discovery through community-driven voting and rewards.
            </p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1117] text-white selection:bg-[#6C2BFF] selection:text-white font-sans overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#6C2BFF]/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00D1B2]/5 blur-[120px] rounded-full" />
      </div>

      {/* Desktop Left Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 88 }}
        className="fixed top-0 left-0 bottom-0 bg-[#1A1D26]/80 backdrop-blur-xl border-r border-white/5 z-50 hidden md:flex flex-col shadow-2xl transition-all duration-300"
      >
        <div className="p-6 flex items-center justify-between">
          <AnimatePresence mode="wait">
            {isSidebarOpen && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50"
              >
                CLIPARENA
              </motion.div>
            )}
          </AnimatePresence>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400 hover:text-white"
          >
            <MenuIcon />
          </button>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          <SidebarNavButton 
            label="HOME" 
            icon={<HomeIcon />}
            active={activeTab === 'home'} 
            onClick={() => setActiveTab('home')} 
            collapsed={!isSidebarOpen}
          />
          <SidebarNavButton 
            label="CREDITS" 
            icon={<CreditsIcon />}
            active={activeTab === 'credits'} 
            onClick={() => setActiveTab('credits')} 
            collapsed={!isSidebarOpen}
          />
          <SidebarNavButton 
            label="CREATE" 
            icon={<PlusIcon />}
            active={activeTab === 'create'} 
            onClick={() => setActiveTab('create')} 
            collapsed={!isSidebarOpen}
            isSpecial
          />
          <SidebarNavButton 
            label="AFFILIATE" 
            icon={<AffiliateIcon />}
            active={activeTab === 'affiliate'} 
            onClick={() => setActiveTab('affiliate')} 
            collapsed={!isSidebarOpen}
          />
          <SidebarNavButton 
            label="ABOUT" 
            icon={<InfoIcon />}
            active={activeTab === 'about'} 
            onClick={() => setActiveTab('about')} 
            collapsed={!isSidebarOpen}
          />
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#6C2BFF] to-[#00D1B2] p-[2px]">
              <div className="w-full h-full rounded-full bg-[#1A1D26] overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
              </div>
            </div>
            {isSidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-black truncate">FELIX THE DEV</p>
                <p className="text-[10px] text-gray-500 truncate">PRO MEMBER</p>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <motion.main 
        animate={{ paddingLeft: typeof window !== 'undefined' && window.innerWidth > 768 ? (isSidebarOpen ? 280 : 88) : 0 }}
        className="relative pt-24 md:pt-32 pb-32 px-6 flex flex-col items-center text-center w-full min-h-screen transition-all duration-300"
      >
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </motion.main>

      {/* Mobile Bottom Navigation (Kept as requested) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] z-50">
        <nav className="bg-[#1A1D26]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] px-6 py-3 flex justify-between items-center shadow-2xl relative">
          <MobileNavButton icon={<HomeIcon />} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <MobileNavButton icon={<CreditsIcon />} label="Credits" active={activeTab === 'credits'} onClick={() => setActiveTab('credits')} />
          
          <div className="relative w-12 h-12 flex justify-center">
             <motion.button 
                onClick={() => setActiveTab('create')}
                whileTap={{ scale: 0.9 }}
                className={`absolute -top-10 w-14 h-14 rounded-[1.5rem] flex items-center justify-center shadow-[0_10px_30px_rgba(108,43,255,0.4)] border-4 border-[#0F1117] z-50 transition-all ${activeTab === 'create' ? 'bg-[#00D1B2]' : 'bg-[#6C2BFF]'}`}
             >
               <PlusIcon />
             </motion.button>
          </div>

          <MobileNavButton icon={<AffiliateIcon />} label="Partner" active={activeTab === 'affiliate'} onClick={() => setActiveTab('affiliate')} />
          <MobileNavButton icon={<InfoIcon />} label="About" active={activeTab === 'about'} onClick={() => setActiveTab('about')} />
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

function SidebarNavButton({ label, icon, active, onClick, collapsed, isSpecial = false }: NavButtonProps & { isSpecial?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`
        w-full flex items-center gap-4 p-4 rounded-2xl transition-all group relative
        ${active 
          ? (isSpecial ? 'bg-[#6C2BFF] text-white shadow-[0_0_20px_rgba(108,43,255,0.3)]' : 'bg-white/5 text-white') 
          : 'text-gray-500 hover:text-white hover:bg-white/5'}
      `}
    >
      <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
        {icon}
      </div>
      
      {!collapsed && (
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[11px] font-black tracking-widest uppercase"
        >
          {label}
        </motion.span>
      )}

      {active && !isSpecial && (
        <motion.div 
          layoutId="sidebarActive"
          className="absolute left-0 w-1 h-6 bg-[#6C2BFF] rounded-r-full"
        />
      )}
    </button>
  );
}

function MobileNavButton({ icon, label, active, onClick }: MobileNavButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-12 gap-1 transition-all ${active ? 'text-[#6C2BFF]' : 'text-gray-500'}`}
    >
      <div className={active ? 'scale-110' : ''}>
        {icon}
      </div>
      <span className="text-[7px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}

function QuickActionButton({ icon, label, color }: QuickActionButtonProps) {
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

function DashboardCard({ title, value, desc, icon }: DashboardCardProps) {
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