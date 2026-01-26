"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ShieldCheck, Zap, ArrowRight, Play } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0F1117] text-white selection:bg-[#6C2BFF] selection:text-white overflow-x-hidden font-sans">
      
      {/* --- LEBEGŐ HEADER --- */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">
        <nav className="bg-[#1A1D26]/80 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 flex justify-between items-center shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#6C2BFF] rounded-lg flex items-center justify-center font-black text-white italic shadow-[0_0_15px_rgba(108,43,255,0.5)]">CA</div>
            <span className="font-black tracking-tighter text-xl">CLIPARENA</span>
          </div>
          <div className="hidden md:flex gap-8 text-[11px] font-bold tracking-[0.2em] text-gray-400">
            <button className="hover:text-[#6C2BFF] transition-colors">CREDITS</button>
            <button className="hover:text-[#6C2BFF] transition-colors">ABOUT US</button>
          </div>
          <div className="flex gap-4">
            <button className="text-[11px] font-bold tracking-widest hover:text-[#6C2BFF] transition-all px-4 py-2">LOGIN</button>
            <button className="bg-white text-black px-5 py-2 rounded-xl text-[11px] font-black tracking-widest hover:bg-[#6C2BFF] hover:text-white transition-all">
              REGISTER
            </button>
          </div>
        </nav>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-52 pb-20 px-6 flex flex-col items-center justify-center min-h-screen text-center">
        {/* Háttér fények */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#6C2BFF]/20 blur-[150px] rounded-full -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#00D1B2]/10 blur-[100px] rounded-full -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#6C2BFF]/30 bg-[#6C2BFF]/5 text-[#6C2BFF] text-[10px] font-black tracking-[0.3em] mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6C2BFF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6C2BFF]"></span>
            </span>
            THE ANTI-ALGORITHM REVOLUTION
          </div>

          <h1 className="text-6xl md:text-[100px] font-black mb-8 tracking-[ -0.05em] leading-[0.9]">
            A TE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C2BFF] to-[#a47dff]">TEHETSÉGED</span><br />
            NEM EGY <span className="italic">ADAT.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-12 leading-relaxed font-light">
            Eleged van a clickbaitből? Itt nem az algoritmus dönt, hanem a közösség. 
            Mindenki bíró, mindenki versenyző. <span className="text-white font-medium">Érték = Pénz.</span>
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(108,43,255,0.4)" }}
              className="px-12 py-6 bg-[#6C2BFF] text-white text-lg font-black rounded-2xl flex items-center gap-3 transition-all"
            >
              LÉPJ BE AZ ARÉNÁBA <ArrowRight size={20} />
            </motion.button>
            <button className="flex items-center gap-3 text-sm font-bold tracking-widest hover:text-[#6C2BFF] transition-all">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center"><Play size={14} fill="white" /></div>
             HOGYAN MŰKÖDIK?
            </button>
          </div>
        </motion.div>
      </section>

      {/* --- MANIFESZTO SECTION (ELEKTROMOS LILA) --- */}
      <section className="py-32 px-6 bg-[#0A0C11] relative overflow-hidden">
         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
               <motion.h2 
                 initial={{ x: -50, opacity: 0 }}
                 whileInView={{ x: 0, opacity: 1 }}
                 className="text-5xl font-black leading-tight"
               >
                 A FIGYELEM <br />
                 <span className="text-[#00D1B2]">NEM JUTALOM.</span>
               </motion.h2>
               
               <div className="space-y-8">
                  <FeatureRow 
                    icon={<Zap className="text-[#6C2BFF]" />} 
                    title="VALÓDI DÖNTÉS" 
                    desc="Heti 3 szavazatod van. Ne szórd el. Olyan tartalomra add, ami tényleg értékes."
                  />
                  <FeatureRow 
                    icon={<ShieldCheck className="text-[#6C2BFF]" />} 
                    title="ZÉRÓ CSALÁS" 
                    desc="YouTube API hitelesítés. Csak a saját, eredeti videóiddal versenyezhetsz."
                  />
                  <FeatureRow 
                    icon={<Trophy className="text-[#6C2BFF]" />} 
                    title="KÖZÖSSÉGI DÍJALAP" 
                    desc="Minden $1 előfizetés 45%-a a hét legjobb alkotóinak zsebébe megy."
                  />
               </div>
            </div>

            <div className="relative">
               <div className="absolute -inset-4 bg-[#6C2BFF]/20 rounded-[30px] blur-2xl animate-pulse" />
               <div className="relative bg-[#1A1D26] border border-white/10 p-10 rounded-[30px] shadow-3xl">
                  <div className="flex justify-between mb-12">
                    <div className="space-y-2">
                       <div className="h-2 w-32 bg-[#6C2BFF] rounded-full" />
                       <div className="h-2 w-20 bg-white/10 rounded-full" />
                    </div>
                    <div className="text-[#00D1B2] font-mono text-xl font-bold">#TOP_1</div>
                  </div>
                  <div className="aspect-video w-full bg-[#0F1117] rounded-2xl flex items-center justify-center border border-white/5 mb-8">
                     <span className="text-[10px] text-gray-600 font-mono">ENCRYPTED VIDEO FEED</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#6C2BFF] to-[#00D1B2]" />
                    <div className="text-right">
                       <div className="text-xs text-gray-500">CURRENT VOTES</div>
                       <div className="text-2xl font-black text-white">2,842</div>
                    </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <footer className="py-40 text-center px-6">
        <h3 className="text-3xl md:text-5xl font-black mb-12 italic tracking-tighter">
          KÉSZ VAGY KILÉPNI A MÁTRIXBÓL?
        </h3>
        <button className="px-16 py-8 border border-white/10 hover:border-[#6C2BFF] rounded-full text-sm font-black tracking-[0.4em] transition-all hover:bg-[#6C2BFF]/10">
          JOIN THE REVOLUTION
        </button>
        <div className="mt-32 text-gray-600 text-[10px] font-mono tracking-widest">
          CLIPARENA © 2026 // NO ALGORITHMS BEYOND THIS POINT
        </div>
      </footer>
    </div>
  );
}

function FeatureRow({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex gap-6 group">
      <div className="mt-1 w-12 h-12 shrink-0 rounded-2xl bg-[#6C2BFF]/10 flex items-center justify-center border border-[#6C2BFF]/20 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h4 className="font-black text-sm tracking-widest mb-2">{title}</h4>
        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}