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

const RocketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2s-7 10-8.95 12a22 22 0 0 1-1.05 1z"></path><path d="m9 12 2-2"></path></svg>
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
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
        <nav className="bg-[#1A1D26]/80 backdrop-blur-xl border border-white/10 rounded-3xl px-6 md:px-10 py-5 flex justify-between items-center shadow-2xl">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.location.href='/'}>
            {/* LOGO IMAGE REPLACEMENT AREA */}
            <div className="relative w-12 h-12 flex-shrink-0">
               <img 
                 src="https://ibb.co/ynLqwzW0" 
                 alt="ClipArena Logo" 
                 className="w-full h-full object-cover rounded-xl shadow-[0_0_15px_rgba(108,43,255,0.4)] border border-[#6C2BFF]/20"
                 onError={(e) => {
                    // Fallback if image fails to load
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%236C2BFF'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='40' fill='white' font-weight='bold' font-style='italic'%3ECA%3C/text%3E%3C/svg%3E";
                 }}
               />
            </div>
            <span className="font-black tracking-tighter text-2xl hidden sm:block uppercase italic">CLIPARENA</span>
          </div>
          
          <div className="hidden lg:flex gap-12 text-[11px] font-black tracking-[0.4em] text-gray-400">
            <button 
              onClick={() => window.location.href='/plans'} 
              className="hover:text-[#6C2BFF] transition-all uppercase"
            >
              Plans
            </button>
            <button 
              onClick={() => window.location.href='/about-us'}
              className="hover:text-[#6C2BFF] transition-all uppercase"
            >
              About us
            </button>
            <button className="hover:text-[#6C2BFF] transition-all uppercase">Community</button>
          </div>

          <div className="flex gap-5">
            <button className="hidden sm:block text-[11px] font-black tracking-widest hover:text-[#6C2BFF] transition-all px-4 py-2 uppercase">Login</button>
            <button 
              onClick={() => window.location.href='/plans'}
              className="bg-[#6C2BFF] text-white px-8 py-3 rounded-2xl text-[11px] font-black tracking-widest hover:bg-[#7d42ff] transition-all active:scale-95 shadow-[0_10px_30px_rgba(108,43,255,0.3)] uppercase"
            >
              Enter Arena
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative pt-64 pb-24 px-6 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-[#00D1B2]/30 bg-[#00D1B2]/5 text-[#00D1B2] text-[10px] font-black tracking-[0.4em] mb-12 uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D1B2] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D1B2]"></span>
            </span>
            Season 1 is Live
          </div>

          <h1 className="text-6xl md:text-[140px] font-black mb-10 tracking-tighter leading-[0.85] uppercase italic">
            TRUE TALENT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C2BFF] via-[#a47dff] to-[#00D1B2] animate-gradient">
              NO MERCY.
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-gray-400 text-xl md:text-3xl mb-20 leading-relaxed font-light">
            Forget the infinite scroll of mediocrity. ClipArena is where the <span className="text-white font-bold">top 1% of creators</span> battle for dominance, judged solely by a verified human community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <motion.button 
              onClick={() => window.location.href='/plans'}
              whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(108,43,255,0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="px-16 py-8 bg-white text-black text-2xl font-black rounded-[2rem] transition-all shadow-2xl uppercase italic"
            >
              Join the Battle
            </motion.button>
            <button className="group flex items-center gap-5 text-[11px] font-black tracking-[0.3em] hover:text-[#00D1B2] transition-all py-4 px-8 uppercase">
              <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#00D1B2]/10 group-hover:border-[#00D1B2] transition-all duration-300">
                <PlayIcon />
              </div>
              The Manifesto
            </button>
          </div>
        </motion.div>

        {/* Extended Description Section */}
        <section className="mt-60 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center text-left">
          <div className="space-y-10">
            <h2 className="text-5xl font-black tracking-tighter leading-tight uppercase italic">
              A Platform Built for <br />
              <span className="text-[#6C2BFF]">The Creator Class.</span>
            </h2>
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed font-light">
              <p>
                In an era where AI-generated slop and 5-second attention span hooks dominate every feed, ClipArena stands as a sanctuary for those who still believe in the craft of editing, gaming, and visual storytelling.
              </p>
              <p>
                We've replaced shadowy algorithms with a transparent, democratic voting system. On ClipArena, your reach isn't determined by a computer's guess, but by the raw impact your content has on real people.
              </p>
              <ul className="space-y-4 pt-6">
                <li className="flex items-center gap-4 text-white font-bold uppercase tracking-widest text-xs">
                  <div className="w-6 h-0.5 bg-[#00D1B2]" /> $1 Subscription Model
                </li>
                <li className="flex items-center gap-4 text-white font-bold uppercase tracking-widest text-xs">
                  <div className="w-6 h-0.5 bg-[#00D1B2]" /> Zero Ad Interruptions
                </li>
                <li className="flex items-center gap-4 text-white font-bold uppercase tracking-widest text-xs">
                  <div className="w-6 h-0.5 bg-[#00D1B2]" /> Direct Revenue Share
                </li>
              </ul>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#6C2BFF]/20 to-[#00D1B2]/20 blur-3xl group-hover:scale-110 transition-transform duration-700" />
            <div className="relative aspect-video bg-[#1A1D26] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center opacity-40">
                 {/* Visual placeholder for app UI or video */}
                 <div className="w-[80%] h-0.5 bg-white/10" />
                 <div className="absolute w-0.5 h-[60%] bg-white/10" />
                 <RocketIcon />
              </div>
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-white/5">
                 <div className="text-[10px] font-black tracking-[0.3em] text-[#00D1B2] mb-1 uppercase">Live Contest</div>
                 <div className="text-xl font-bold italic uppercase">Weekly Championship Pool</div>
                 <div className="mt-4 flex justify-between items-center font-mono text-sm">
                   <span className="text-white">$14,582.00</span>
                   <span className="text-gray-500">22:15:08 REMAINING</span>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Pillars Section */}
        <section className="mt-60 w-full max-w-6xl">
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 italic">The Three Pillars of CA.</h2>
            <div className="h-1.5 w-40 bg-[#6C2BFF] rounded-full shadow-[0_0_20px_rgba(108,43,255,0.6)]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard 
              icon={<ZapIcon />} 
              title="SKILL-BASED ECONOMY" 
              text="Your subscription fee doesn't go to billionaires. It enters the Prize Pool. The better your clips, the more you earn from the collective fund."
              delay={0.2}
            />
            <FeatureCard 
              icon={<TrophyIcon />} 
              title="WEEKLY ARENA" 
              text="Every 7 days, the leaderboard resets. The winners are celebrated, paid, and immortalized in the Arena Hall of Fame. No legacy bias."
              delay={0.4}
              highlight
            />
            <FeatureCard 
              icon={<ShieldIcon />} 
              title="BOT-PROOF VOTING" 
              text="Our multi-layer verification and 'Limited Vote' system ensures that every point on the leaderboard was earned through genuine human engagement."
              delay={0.6}
            />
          </div>
        </section>

        {/* Manifesto Section */}
        <section className="mt-60 py-40 w-full bg-[#1A1D26]/40 border-y border-white/5 relative overflow-hidden flex flex-col items-center">
          <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
             <span className="text-[300px] font-black tracking-tighter uppercase italic select-none">VALUE</span>
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[#6C2BFF] text-5xl md:text-8xl font-black mb-16 italic tracking-tighter leading-[0.85] uppercase"
            >
              <div>THE ALGORITHM IS DEAD.</div>
              <div className="text-white">LONG LIVE THE CREATOR.</div>
            </motion.div>
            <p className="text-gray-300 text-xl md:text-3xl leading-relaxed font-light mb-12">
              Current platforms reward retention tricks and clickbait hooks. We reward <span className="text-white font-bold italic uppercase tracking-tighter underline decoration-[#6C2BFF] decoration-4 underline-offset-8">Real Creativity</span>. 
            </p>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto font-light">
              We believe attention is a currency. On ClipArena, you are no longer the product being sold to advertisers. You are the judge, the audience, and the owner of the platform.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-60 pb-32 text-center w-full max-w-6xl mx-auto border-t border-white/5 pt-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 text-left mb-32 px-10">
            <div className="space-y-6">
               <div className="flex items-center gap-3">
                  <img src="https://via.placeholder.com/50" alt="CA" className="w-8 h-8 rounded-lg" />
                  <span className="font-black italic text-xl uppercase tracking-tighter">CLIPARENA</span>
               </div>
               <p className="text-gray-500 text-sm font-light leading-relaxed">
                  Building the first decentralized meritocracy for short-form video content. Made for the creators, by the creators.
               </p>
            </div>
            <div className="space-y-6">
               <h4 className="text-[10px] font-black tracking-[0.4em] text-white uppercase">Navigation</h4>
               <ul className="space-y-4 text-gray-500 text-sm font-medium">
                  <li className="hover:text-white transition-colors cursor-pointer" onClick={() => window.location.href='/plans'}>Plans</li>
                  <li className="hover:text-white transition-colors cursor-pointer" onClick={() => window.location.href='/about-us'}>About us</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Privacy</li>
               </ul>
            </div>
            <div className="space-y-6">
               <h4 className="text-[10px] font-black tracking-[0.4em] text-white uppercase">Newsletter</h4>
               <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 overflow-hidden">
                  <input type="text" placeholder="Email address" className="bg-transparent border-none outline-none px-4 py-2 flex-grow text-sm font-light" />
                  <button className="bg-[#6C2BFF] px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-[#7d42ff] transition-all">Join</button>
               </div>
            </div>
          </div>
          <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-12 border border-white/10 group hover:border-[#6C2BFF]/40 transition-all cursor-pointer">
            <div className="w-2 h-2 bg-[#6C2BFF] rounded-full group-hover:scale-[3] transition-transform duration-500" />
          </div>
          <p className="text-gray-600 font-mono text-[10px] tracking-[0.6em] uppercase">
            CLIPARENA // NO ALGORITHMS BEYOND THIS POINT // EST. 2026
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
        ::selection {
          background: #6C2BFF;
          color: white;
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
      className={`relative p-12 rounded-[48px] border transition-all duration-500 group text-left ${
        highlight 
        ? 'bg-[#6C2BFF] border-transparent shadow-[0_40px_80px_rgba(108,43,255,0.4)]' 
        : 'bg-[#1A1D26] border-white/5 hover:border-[#6C2BFF]/40'
      }`}
    >
      <div className={`w-16 h-16 rounded-[20px] flex items-center justify-center mb-10 transition-transform group-hover:rotate-12 ${
        highlight ? 'bg-white text-[#6C2BFF]' : 'bg-[#6C2BFF]/10 text-[#6C2BFF]'
      }`}>
        {icon}
      </div>
      <h3 className={`text-2xl font-black tracking-widest mb-6 uppercase italic ${highlight ? 'text-white' : 'text-gray-100'}`}>
        {title}
      </h3>
      <p className={`text-lg leading-relaxed font-light ${highlight ? 'text-white/80' : 'text-gray-400'}`}>
        {text}
      </p>
      
      {!highlight && (
        <div className="absolute top-12 right-12 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-2 h-2 bg-[#6C2BFF] rounded-full shadow-[0_0_15px_#6C2BFF]" />
        </div>
      )}
    </motion.div>
  );
}