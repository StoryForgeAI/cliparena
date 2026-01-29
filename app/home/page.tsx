"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ADATTÁROLÓ (In-Memory Store) ---
const INITIAL_VIDEOS = [
  { id: 1, ytId: "jNQXAC9IVRw", title: "BEST MOMENTS 2024", creator: "MrBeast", likes: 12500, votes: 450, rank: 8 },
  { id: 2, ytId: "dQw4w9WgXcQ", title: "NEVER GONNA GIVE YOU UP", creator: "RickAstley", likes: 998, votes: 120, rank: 5 },
  { id: 3, ytId: "9bZkp7q19f0", title: "UNREAL SKILLS", creator: "ArenaPro", likes: 450, votes: 30, rank: 3 },
  { id: 4, ytId: "C0DPdy98e4c", title: "TOP PLAYS", creator: "ClipKing", likes: 1100, votes: 90, rank: 4 },
  { id: 5, ytId: "L_jWHffIx5E", title: "INSANE LUCK", creator: "Ghost", likes: 2300, votes: 150, rank: 6 },
  { id: 6, ytId: "v2AC41dglnM", title: "PRO GAMING", creator: "EsportsElite", likes: 5600, votes: 210, rank: 7 },
  { id: 7, ytId: "3JZ_D3i301s", title: "CHAMPIONSHIP FINALS", creator: "LeagueOfficial", likes: 8900, votes: 600, rank: 9 },
];

const formatNumber = (num: number) => {
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
};

export default function App() {
  const [view, setView] = useState<'home' | 'videos'>('home');
  const [videoList, setVideoList] = useState(INITIAL_VIDEOS);
  const [currentVideoId, setCurrentVideoId] = useState<number | null>(null);
  const [showHeart, setShowHeart] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Súlyozott véletlenszerű választás (Weighted Random Selection)
  // Minél nagyobb a rank, annál nagyobb eséllyel kerül be a sorba
  const getRandomWeightedVideo = useCallback(() => {
    const totalRank = videoList.reduce((sum, v) => sum + v.rank, 0);
    let random = Math.random() * totalRank;
    for (const video of videoList) {
      if (random < video.rank) return video.id;
      random -= video.rank;
    }
    return videoList[0].id;
  }, [videoList]);

  // Első videó beállítása
  useEffect(() => {
    if (view === 'videos' && currentVideoId === null) {
      setCurrentVideoId(getRandomWeightedVideo());
    }
  }, [view, currentVideoId, getRandomWeightedVideo]);

  const currentVideo = useMemo(() => 
    videoList.find(v => v.id === currentVideoId) || videoList[0], 
    [videoList, currentVideoId]
  );

  const nextVideo = useCallback(() => {
    setCurrentVideoId(getRandomWeightedVideo());
  }, [getRandomWeightedVideo]);

  // Görgetés érzékelése (Egér és Érintés)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (view !== 'videos') return;
      if (e.deltaY > 50) nextVideo();
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      if (touchStartY - touchEndY > 70) nextVideo(); // Felfelé húzás -> Következő
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [view, nextVideo]);

  const handleLike = () => {
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 800);
    setVideoList(prev => prev.map(v => 
      v.id === currentVideo.id ? { ...v, likes: v.likes + 1, rank: v.rank + 0.1 } : v
    ));
  };

  const handleVote = () => {
    setVideoList(prev => prev.map(v => 
      v.id === currentVideo.id ? { ...v, votes: v.votes + 1, rank: v.rank + 0.3 } : v
    ));
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-white font-sans selection:bg-[#6C2BFF]">
      <AnimatePresence mode="wait">
        
        {/* --- HOME KÉPERNYŐ --- */}
        {view === 'home' && (
          <motion.div 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden"
          >
            <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-[#6C2BFF]/20 blur-[180px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] bg-[#00D1B2]/10 blur-[150px] rounded-full" />
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-8xl md:text-[12rem] font-black italic tracking-tighter leading-none mb-4 uppercase">
                CLIP<span className="text-[#6C2BFF]">ARENA</span>
              </h1>
              <p className="text-gray-400 text-xl md:text-2xl max-w-2xl mx-auto mb-16 font-light tracking-wide px-4">
                Pörgesd a legmenőbb klipeket. Szavazz. Dominálj a ranglistán.
              </p>

              <button 
                onClick={() => setView('videos')}
                className="group relative px-16 py-8 bg-[#6C2BFF] rounded-full font-black italic tracking-[0.3em] overflow-hidden transition-all hover:scale-110 active:scale-95 shadow-[0_20px_60px_rgba(108,43,255,0.4)]"
              >
                <span className="relative z-10 text-xl">FEED INDÍTÁSA</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* --- VIDEOS (FEED) KÉPERNYŐ --- */}
        {view === 'videos' && (
          <motion.div 
            key="videos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden relative"
          >
            {/* Navigációs gombok */}
            <button 
              onClick={() => setView('home')}
              className="absolute top-8 left-8 z-50 p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all group"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>

            <div className="w-full h-full max-w-[500px] relative flex flex-col">
              
              {/* Videó Lejátszó (YT 1080p fókusz) */}
              <div className="flex-1 bg-black relative group shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden md:rounded-[3rem] my-0 md:my-4 border border-white/5">
                <iframe
                  key={currentVideo.ytId}
                  className="w-full h-full pointer-events-auto"
                  src={`https://www.youtube.com/embed/${currentVideo.ytId}?autoplay=1&controls=1&modestbranding=1&rel=0&iv_load_policy=3&vq=hd1080`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>

                {/* Like Animáció */}
                <AnimatePresence>
                  {showHeart && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 4, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 text-red-500"
                    >
                      <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Alsó Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 pt-20 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex flex-col gap-2"
                  >
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-none">{currentVideo.title}</h2>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#6C2BFF] flex items-center justify-center text-[10px] font-bold">CA</div>
                      <p className="text-white font-bold text-sm tracking-wide">@{currentVideo.creator.toLowerCase()}</p>
                    </div>
                  </motion.div>
                </div>

                {/* Jobb oldali Interakciós Sáv */}
                <div className="absolute right-4 bottom-24 flex flex-col gap-8 items-center z-40">
                  
                  {/* Like Gomb */}
                  <div className="flex flex-col items-center gap-1">
                    <motion.button 
                      whileTap={{ scale: 0.8 }}
                      onClick={handleLike}
                      className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 border border-white/10 transition-colors group"
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="group-active:fill-red-500 group-active:stroke-red-500 transition-all"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </motion.button>
                    <span className="text-[10px] font-black tracking-widest">{formatNumber(currentVideo.likes)}</span>
                  </div>

                  {/* Szavazat Gomb */}
                  <div className="flex flex-col items-center gap-1">
                    <motion.button 
                      whileTap={{ scale: 0.8 }}
                      onClick={handleVote}
                      className="w-14 h-14 bg-[#6C2BFF] rounded-full flex items-center justify-center shadow-lg shadow-[#6C2BFF]/40 border border-[#6C2BFF]/20"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                    </motion.button>
                    <span className="text-[10px] font-black text-[#6C2BFF] tracking-widest">{currentVideo.votes}</span>
                  </div>

                  {/* Következő Gomb (Asztali segítség) */}
                  <button 
                    onClick={nextVideo}
                    className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center text-xs font-black hover:bg-white/10 border border-white/5"
                  >
                    ↓
                  </button>
                </div>
              </div>

              {/* Tanács az irányításhoz */}
              <p className="hidden md:block py-4 text-[9px] text-gray-600 font-black tracking-[0.4em] uppercase text-center">
                Görgess lefelé a következő videóért • Rank: {currentVideo.rank.toFixed(1)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}