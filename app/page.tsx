"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, ShieldCheck, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0F1117] text-white selection:bg-[#6C2BFF] selection:text-white overflow-x-hidden">
      
      {/* --- HEADER --- */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
        <nav className="bg-[#1A1D26]/80 backdrop-blur-md border border-white/10 rounded-full px-8 py-3 flex justify-between items-center shadow-2xl">
          <div className="flex gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-[#6C2BFF] transition-colors">CREDITS</a>
            <a href="#" className="hover:text-[#6C2BFF] transition-colors">ABOUT US</a>
          </div>
          <div className="flex gap-6 items-center">
            <button className="text-sm font-semibold hover:text-[#6C2BFF] transition-all">LOGIN</button>
            <button className="bg-[#6C2BFF] hover:bg-[#5a24d6] text-white px-5 py-2 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(108,43,255,0.4)] transition-all">
              REGISTER
            </button>
          </div>
        </nav>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-20 px-6 flex flex-col items-center justify-center min-h-[90vh]">
        {/* Háttér fény effekt */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#6C2BFF]/20 blur-[120px] rounded-full -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-[#00D1B2] font-mono tracking-widest text-sm mb-4 block uppercase font-bold">
            Anti-Algorithm Movement
          </span>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-tight">
            SKILL OVER <br />
            <span className="text-[#6C2BFF] drop-shadow-[0_0_25px_rgba(108,43,255,0.6)]">CLICKBAIT</span>
          </h1>
          <p className="max-w-xl mx-auto text-gray-400 text-lg md:text-xl mb-10 leading-relaxed">
            Felejtsd el az algoritmust. Itt valódi emberek szavaznak, valódi értéket jutalmazunk. 
            Nincs dopamin-csapda, csak tiszta verseny.
          </p>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-5 bg-[#6C2BFF] text-xl font-black rounded-xl overflow-hidden shadow-[0_0_30px_rgba(108,43,255,0.5)]"
          >
            <span className="relative z-10">GET STARTED</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </motion.button>
        </motion.div>
      </section>

      {/* --- MANIFESZTO / MARKETING TEXT --- */}
      <section className="py-24 px-6 border-y border-white/5 bg-[#0A0C11]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold leading-tight">
              A FIGYELEM NEM EGYENLŐ <br />
              <span className="text-[#00D1B2]">AZ ÉRTÉKKEL.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              A ClipArena egy digitális aréna, ahol mindenki havi 1 dollárért válik bíróvá és versenyzővé. 
              Nincs hirdetés, nincs megosztás-kényszer, csak a tartalom ereje számít.
            </p>
            
            <div className="space-y-4">
              {[
                { icon: <Zap size={20}/>, text: "Heti 3 szavazat. Döntsd el, ki érdemli a fődíjat." },
                { icon: <ShieldCheck size={20}/>, text: "Zéró lopott tartalom. YouTube API alapú hitelesítés." },
                { icon: <Trophy size={20}/>, text: "A bevétel 45%-a a győzteseké. Közösségi díjalap." }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-sm font-semibold text-gray-300">
                  <div className="p-2 bg-[#6C2BFF]/10 text-[#6C2BFF] rounded-lg">{item.icon}</div>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Animált "Arena Card" */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#6C2BFF] to-[#00D1B2] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
            <div className="relative bg-[#0F1117] border border-white/10 p-8 rounded-2xl">
              <div className="flex justify-between items-center mb-12">
                <div className="h-2 w-24 bg-white/10 rounded" />
                <div className="h-6 w-6 bg-[#6C2BFF] rounded-full animate-pulse" />
              </div>
              <div className="space-y-4">
                <div className="h-40 w-full bg-white/5 rounded-xl border border-dashed border-white/20 flex items-center justify-center">
                   <p className="text-xs text-gray-500 font-mono italic">NO ALGORITHM. ONLY HUMAN VOICES.</p>
                </div>
                <div className="h-4 w-3/4 bg-white/10 rounded" />
                <div className="h-4 w-1/2 bg-white/10 rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="py-32 text-center">
        <h3 className="text-2xl font-bold mb-8 text-gray-500 uppercase tracking-[0.5em]">Join the Arena</h3>
        <p className="text-[#6C2BFF] font-mono text-xl mb-12 animate-pulse">Waiting for your first vote...</p>
        <div className="text-[10px] text-gray-600 tracking-tighter uppercase">
            Built for creators who refuse to play the game.
        </div>
      </section>
    </div>
  );
}