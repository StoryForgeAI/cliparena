"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- INITIAL DATA STORE ---
// Itt tároljuk a videókat. Mivel nincs Firebase, ez a böngésző memóriájában él.
const INITIAL_VIDEOS = [
  { id: 1, ytId: "dQw4w9WgXcQ", title: "EPIC CLUTCH #1", creator: "Ninja", likes: 998, votes: 120, rank: 5 },
  { id: 2, ytId: "jNQXAC9IVRw", title: "BEST MOMENTS", creator: "MrBeast", likes: 12500, votes: 450, rank: 8 },
  { id: 3, ytId: "9bZkp7q19f0", title: "UNREAL SKILLS", creator: "ArenaPro", likes: 450, votes: 30, rank: 3 },
  { id: 4, ytId: "C0DPdy98e4c", title: "TOP PLAYS", creator: "ClipKing", likes: 890, votes: 90, rank: 4 },
  { id: 5, ytId: "L_jWHffIx5E", title: "INSANE LUCK", creator: "Ghost", likes: 2300, votes: 150, rank: 6 },
];

// Segédfüggvény a számok formázásához (pl. 1000 -> 1K)
const formatNumber = (num: number) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

export default function App() {
  const [view, setView] = useState<'home' | 'videos'>('home');
  const [videoList, setVideoList] = useState(INITIAL_VIDEOS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHeart, setShowHeart] = useState(false);

  // Súlyozott válogatás a Rank alapján (Minél nagyobb a rank, annál többször kerül előre)
  const sortedVideos = useMemo(() => {
    return [...videoList].sort((a, b) => b.rank - a.rank);
  }, [videoList]);

  const currentVideo = sortedVideos[currentIndex % sortedVideos.length];

  const handleLike = () => {
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 800);

    setVideoList(prev => prev.map(v => {
      if (v.id === currentVideo.id) {
        return { 
          ...v, 
          likes: v.likes + 1, 
          rank: v.rank + 0.1 // A rank szép lassan nő minden lájk után
        };
      }
      return v;
    }));
  };

  const handleVote = () => {
    setVideoList(prev => prev.map(v => {
      if (v.id === currentVideo.id) {
        return { 
          ...v, 
          votes: v.votes + 1,
          rank: v.rank + 0.2 // A szavazat többet ér a ranknál
        };
      }
      return v;
    }));
  };

  return (
    <div className="min-h-screen bg-[#0F1117] text-white font-sans overflow-hidden">
      <AnimatePresence mode="wait">
        
        {/* --- HOME KÓD --- */}
        {view === 'home' && (
          <motion.div 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-screen flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#6C2BFF]/10 blur-[150px] rounded-full" />
            
            <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter mb-8 leading-none">
              CLIP<br /><span className="text-[#6C2BFF]">ARENA</span>
            </h1>
            
            <p className="text-gray-400 text-xl max-w-lg mb-12 font-light">
              Nézd a legmenőbb klipeket, szavazz a kedvenceidre és pörgesd fel a rangsorukat!
            </p>

            <button 
              onClick={() => setView('videos')}
              className="group relative px-12 py-6 bg-[#6C2BFF] rounded-2xl font-black italic tracking-[0.2em] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(108,43,255,0.3)]"
            >
              <span className="relative z-10">FEED MEGNYITÁSA</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </motion.div>
        )}

        {/* --- VIDEOS KÓD --- */}
        {view === 'videos' && (
          <motion.div 
            key="videos"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="h-screen flex flex-col items-center justify-center p-4 md:p-12 relative"
          >
            {/* Vissza gomb */}
            <button 
              onClick={() => setView('home')}
              className="absolute top-8 left-8 text-gray-500 hover:text-white font-bold tracking-widest text-xs uppercase"
            >
              ← Vissza a főoldalra
            </button>

            <div className="w-full max-w-[1000px] flex flex-col md:flex-row gap-8 items-center">
              
              {/* YouTube Player Container */}
              <div className="relative w-full max-w-[400px] aspect-[9/16] bg-black rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 group">
                <iframe
                  className="w-full h-full pointer-events-none"
                  src={`https://www.youtube.com/embed/${currentVideo.ytId}?autoplay=1&controls=0&modestbranding=1&loop=1&playlist=${currentVideo.ytId}`}
                  allow="autoplay"
                ></iframe>

                {/* Like Animáció (Szív robbanás) */}
                <AnimatePresence>
                  {showHeart && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 3, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
                    >
                      <svg width="100" height="100" viewBox="0 0 24 24" fill="#ff2b6d"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 p-8 flex flex-col justify-end text-left">
                  <h2 className="text-2xl font-black italic uppercase tracking-tighter leading-none mb-2">{currentVideo.title}</h2>
                  <p className="text-[#6C2BFF] font-bold text-sm">@{currentVideo.creator}</p>
                </div>
              </div>

              {/* Interaction Sidebar */}
              <div className="flex md:flex-col gap-6 items-center">
                
                {/* Like Gomb */}
                <div className="flex flex-col items-center gap-2">
                  <button 
                    onClick={handleLike}
                    className="w-16 h-16 bg-[#1A1D26] hover:bg-red-500/20 rounded-full flex items-center justify-center transition-all group active:scale-90 border border-white/5"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:fill-red-500 group-hover:stroke-red-500 transition-colors"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  </button>
                  <span className="text-xs font-black text-gray-400">{formatNumber(currentVideo.likes)}</span>
                </div>

                {/* Szavazás Gomb */}
                <div className="flex flex-col items-center gap-2">
                  <button 
                    onClick={handleVote}
                    className="w-16 h-16 bg-[#6C2BFF] hover:bg-[#8247FF] rounded-full flex items-center justify-center transition-all active:scale-90 shadow-lg shadow-[#6C2BFF]/20"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                  </button>
                  <span className="text-xs font-black text-[#6C2BFF] uppercase tracking-widest">{currentVideo.votes} SZAVAZAT</span>
                </div>

                {/* Következő videó */}
                <button 
                  onClick={() => setCurrentIndex(prev => prev + 1)}
                  className="mt-8 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black tracking-[0.3em] uppercase transition-all"
                >
                  KÖVETKEZŐ →
                </button>

                <div className="mt-4 text-[9px] text-gray-600 font-mono">
                  RANK SCORE: {currentVideo.rank.toFixed(1)}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}