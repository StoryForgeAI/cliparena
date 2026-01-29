"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, onSnapshot, updateDoc, increment, query, getDocs } from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';

// --- FIREBASE CONFIG (Environment provided) ---
const firebaseConfig = JSON.parse(__firebase_config);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'clip-arena-v1';

// --- TYPES & INTERFACES ---
interface Video {
  id: string;
  youtubeId: string;
  title: string;
  creator: string;
  votes: number;
  rank: number; // Minél nagyobb, annál többször dobja be (súlyozott sorsolás)
}

interface SidebarNavButtonProps {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
  collapsed: boolean;
  isSpecial?: boolean;
}

// --- ICONS ---
const HomeIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const VideoIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>;
const CreditsIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><line x1="12" y1="18" x2="12" y2="6"/></svg>;
const PlusIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const MenuIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const HeartIcon = ({ filled }: { filled?: boolean }) => <svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // 1. Auth Init
  useEffect(() => {
    signInAnonymously(auth).catch(console.error);
    return onAuthStateChanged(auth, setUser);
  }, []);

  // 2. Data Fetching (Public Video Collection)
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'artifacts', appId, 'public', 'data', 'videos'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const videoData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Video));
      // Súlyozott sorrend: a rang (rank) alapján pörgetjük ki őket később
      setVideos(videoData);
    }, (err) => console.error("Firestore error:", err));
    return () => unsubscribe();
  }, [user]);

  // Súlyozott videóválasztás logika (Minél nagyobb a rank, annál több "jegye" van a sorsoláson)
  const currentVideo = useMemo(() => {
    if (videos.length === 0) return null;
    return videos[currentVideoIndex % videos.length];
  }, [videos, currentVideoIndex]);

  const handleVote = async (videoId: string) => {
    if (!user) return;
    const videoRef = doc(db, 'artifacts', appId, 'public', 'data', 'videos', videoId);
    await updateDoc(videoRef, {
      votes: increment(1),
      rank: increment(0.1) // Lassú növekedés
    });
    // Következő videóra ugrás szavazás után
    setCurrentVideoIndex(prev => prev + 1);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-6 uppercase">CLIP ARENA</h1>
            <p className="text-gray-400 text-xl max-w-xl mb-12">The ultimate content battlefield.</p>
            <button 
                onClick={() => setActiveTab('videos')}
                className="px-12 py-5 bg-[#6C2BFF] rounded-2xl font-black italic tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(108,43,255,0.4)]"
            >
                ENTER THE FEED
            </button>
          </motion.div>
        );
      case 'videos':
        return (
          <motion.div key="videos" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-4xl mx-auto h-[70vh] flex flex-col items-center">
            <div className="w-full aspect-video bg-black rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative group">
              {currentVideo ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1&modestbranding=1`}
                  title={currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 italic">
                  Loading the next hit...
                </div>
              )}
            </div>

            {currentVideo && (
              <div className="w-full mt-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-[#1A1D26] p-8 rounded-[2rem] border border-white/5">
                <div className="text-left flex-1">
                  <h3 className="text-2xl font-black tracking-tight">{currentVideo.title}</h3>
                  <p className="text-[#6C2BFF] font-bold">@{currentVideo.creator}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Votes</p>
                    <p className="text-2xl font-black italic">{currentVideo.votes}</p>
                  </div>
                  <button 
                    onClick={() => handleVote(currentVideo.id)}
                    className="w-16 h-16 bg-[#6C2BFF] hover:bg-red-500 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-90"
                  >
                    <HeartIcon filled />
                  </button>
                  <button 
                    onClick={() => setCurrentVideoIndex(prev => prev + 1)}
                    className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all"
                  >
                    NEXT →
                  </button>
                </div>
              </div>
            )}
            <p className="mt-4 text-[10px] text-gray-500 font-black tracking-[0.3em] uppercase">
              Rank Score: {currentVideo?.rank.toFixed(1) || 0} (Higher rank = more frequent appearances)
            </p>
          </motion.div>
        );
      default:
        return <div className="text-gray-500 italic py-20 uppercase font-black tracking-widest">Coming Soon</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1117] text-white selection:bg-[#6C2BFF] font-sans">
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#6C2BFF]/10 blur-[150px] rounded-full animate-pulse" />
      </div>

      {/* DESKTOP SIDEBAR */}
      <motion.aside 
        animate={{ width: isSidebarOpen ? 280 : 88 }}
        className="fixed top-0 left-0 bottom-0 bg-[#1A1D26]/80 backdrop-blur-xl border-r border-white/5 z-50 hidden md:flex flex-col shadow-2xl transition-all"
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && <div className="text-xl font-black italic tracking-tighter">CLIPARENA</div>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-xl text-gray-400 hover:text-white">
            <MenuIcon />
          </button>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          <SidebarNavButton label="HOME" icon={<HomeIcon />} active={activeTab === 'home'} onClick={() => setActiveTab('home')} collapsed={!isSidebarOpen} />
          <SidebarNavButton label="VIDEOS" icon={<VideoIcon />} active={activeTab === 'videos'} onClick={() => setActiveTab('videos')} collapsed={!isSidebarOpen} />
          <SidebarNavButton label="CREATE" icon={<PlusIcon />} active={activeTab === 'create'} onClick={() => setActiveTab('create')} collapsed={!isSidebarOpen} isSpecial />
          <SidebarNavButton label="CREDITS" icon={<CreditsIcon />} active={activeTab === 'credits'} onClick={() => setActiveTab('credits')} collapsed={!isSidebarOpen} />
        </nav>
      </motion.aside>

      {/* MAIN */}
      <motion.main 
        animate={{ paddingLeft: typeof window !== 'undefined' && window.innerWidth > 768 ? (isSidebarOpen ? 280 : 88) : 0 }}
        className="relative pt-32 px-6 flex flex-col items-center text-center w-full min-h-screen transition-all"
      >
        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
      </motion.main>

      {/* MOBILE NAV */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] z-50">
        <nav className="bg-[#1A1D26]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] px-6 py-3 flex justify-between items-center shadow-2xl">
          <MobileNavButton icon={<HomeIcon />} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <MobileNavButton icon={<VideoIcon />} label="Feed" active={activeTab === 'videos'} onClick={() => setActiveTab('videos')} />
          <div className="relative w-12 h-12">
             <button onClick={() => setActiveTab('create')} className="absolute -top-10 w-14 h-14 bg-[#6C2BFF] rounded-[1.5rem] flex items-center justify-center border-4 border-[#0F1117] shadow-xl"><PlusIcon /></button>
          </div>
          <MobileNavButton icon={<CreditsIcon />} label="Credits" active={activeTab === 'credits'} onClick={() => setActiveTab('credits')} />
          <MobileNavButton icon={<MenuIcon />} label="More" active={activeTab === 'about'} onClick={() => setActiveTab('about')} />
        </nav>
      </div>
    </div>
  );
}

function SidebarNavButton({ label, icon, active, onClick, collapsed, isSpecial }: SidebarNavButtonProps) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group relative ${active ? (isSpecial ? 'bg-[#6C2BFF] text-white' : 'bg-white/5 text-white') : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
      <div className={active ? 'scale-110' : 'group-hover:scale-110'}>{icon}</div>
      {!collapsed && <span className="text-[11px] font-black tracking-widest uppercase">{label}</span>}
      {active && !isSpecial && <div className="absolute left-0 w-1 h-6 bg-[#6C2BFF] rounded-r-full" />}
    </button>
  );
}

function MobileNavButton({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-12 gap-1 ${active ? 'text-[#6C2BFF]' : 'text-gray-500'}`}>
      {icon}<span className="text-[7px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}

function QuickActionButton({ icon, label, color }: any) {
  return (
    <button className="flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl transition-all w-full sm:w-auto hover:bg-white/10">
      <span style={{ color }}>{icon}</span><span className="text-[11px] font-black tracking-widest uppercase">{label}</span>
    </button>
  );
}

function DashboardCard({ title, value, desc, icon }: any) {
  return (
    <div className="bg-[#1A1D26] border border-white/5 p-8 rounded-[2.5rem] text-left relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase mb-4">{title}</h3>
      <div className="text-4xl font-black italic mb-2 tracking-tighter">{value}</div>
      <p className="text-xs text-gray-400 font-light">{desc}</p>
    </div>
  );
}