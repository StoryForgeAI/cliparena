"use client";

import React, { useState } from 'react';
import { 
  Home, 
  Wrench, 
  Users, 
  Info, 
  Zap, 
  Search, 
  TrendingUp, 
  ShoppingBag, 
  LayoutDashboard,
  Bell,
  User,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Target
} from 'lucide-react';

// --- Types ---
type PageID = 'home' | 'tools' | 'affiliate' | 'about';

// --- Shared Components ---

const GridBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div 
      className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.3]"
      style={{ maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)' }}
    />
    <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/20 via-white to-indigo-50/30" />
  </div>
);

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: any; 
  label: string; 
  active: boolean; 
  onClick: () => void 
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
      active 
      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
    }`}
  >
    <Icon size={20} className={active ? 'text-white' : 'text-gray-400 group-hover:text-gray-900'} />
    <span className="font-semibold text-sm">{label}</span>
  </button>
);

const ToolCard = ({ title, desc, icon: Icon }: { title: string, desc: string, icon: any }) => (
  <div className="group relative bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
    <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">
      <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-200">
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-6">{desc}</p>
      <button className="w-full py-3 bg-gray-50 text-gray-900 font-bold rounded-xl border border-gray-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
        Open Tool
      </button>
    </div>
  </div>
);

// --- Page Views ---

const HomePage = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
    {/* Hero Section */}
    <div className="relative bg-blue-600 rounded-[2.5rem] p-10 md:p-16 text-white overflow-hidden shadow-2xl shadow-blue-200">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full" />
      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles size={14} />
          AI Engine Active
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-[1.1]">
          Your AI Advantage <br /> Starts Here
        </h1>
        <p className="text-blue-100 text-lg font-medium mb-8 leading-relaxed">
          Discover hidden opportunities, analyze markets with precision, and grow your digital assets smarter with Clipzy's integrated AI ecosystem.
        </p>
        <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-50 transition-all active:scale-95 shadow-lg">
          Explore Insights
          <ArrowRight size={20} />
        </button>
      </div>
    </div>

    {/* Quick Actions */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { title: "Find a Profitable Niche", icon: Search, color: "text-blue-600" },
        { title: "Analyze the Market", icon: TrendingUp, color: "text-indigo-600" },
        { title: "Discover Winning Products", icon: ShoppingBag, color: "text-blue-500" }
      ].map((action, i) => (
        <button key={i} className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-left group">
          <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
            <action.icon size={24} className={action.color} />
          </div>
          <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{action.title}</span>
        </button>
      ))}
    </div>

    {/* Marketing/Info Section */}
    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-10">
      <div className="flex-1 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Modern Strategy for Modern Builders</h2>
        <p className="text-gray-500 leading-relaxed font-medium">
          Clipzy AI doesn't just show you data; it interprets the future. Our proprietary neural networks identify pattern shifts before they become mainstream trends.
        </p>
      </div>
      <div className="w-full md:w-1/3 aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl border border-blue-50 flex items-center justify-center">
         <Target className="text-blue-300 w-16 h-16" />
      </div>
    </div>
  </div>
);

const ToolsPage = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="mb-10">
      <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Platform Tools</h1>
      <p className="text-gray-500 font-medium">Launch your AI-powered business operations</p>
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      <ToolCard 
        title="AI Niche Finder" 
        desc="Find hidden low-competition opportunities across 50+ global markets automatically." 
        icon={Search} 
      />
      <ToolCard 
        title="AI Trade Assistant" 
        desc="Get AI-driven market insights and institutional timing suggestions for smarter trades." 
        icon={TrendingUp} 
      />
      <ToolCard 
        title="Dropshipping Helper" 
        desc="Discover high-margin trending products and optimize your store for conversion." 
        icon={ShoppingBag} 
      />
    </div>
  </div>
);

const AffiliatePage = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500">
    <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-[2rem] flex items-center justify-center mb-8">
      <Users size={40} />
    </div>
    <h1 className="text-3xl font-black text-gray-900 mb-2">Affiliate Program</h1>
    <p className="text-xl font-bold text-blue-600 mb-4">Coming Soon</p>
    <p className="text-gray-500 max-w-sm font-medium leading-relaxed">
      We are building a robust reward system. Soon you will be able to earn recurring commissions by sharing Clipzy AI with your network.
    </p>
  </div>
);

const AboutPage = () => (
  <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="text-center mb-16">
      <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">About Clipzy AI</h1>
      <p className="text-gray-500 text-lg font-medium leading-relaxed">
        We are on a mission to democratize advanced data intelligence for individual entrepreneurs and small teams.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
      <div className="aspect-square bg-blue-600/5 rounded-[3rem] border border-blue-100 flex items-center justify-center relative">
        <div className="absolute inset-10 bg-blue-600/10 blur-3xl rounded-full" />
        <Zap className="text-blue-600 w-32 h-32 relative z-10" />
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900">Innovation First</h3>
          <p className="text-gray-500 font-medium">We constantly update our models to reflect real-world market shifts, ensuring you always have the latest edge.</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
          <p className="text-gray-500 font-medium">To turn complex global data into actionable signals that help users make smarter, more profitable decisions.</p>
        </div>
      </div>
    </div>
  </div>
);

// --- Main Layout ---

export default function App() {
  const [activePage, setActivePage] = useState<PageID>('home');

  return (
    <div className="min-h-screen font-sans bg-gray-50/30 flex selection:bg-blue-100">
      <GridBackground />

      {/* Sidebar */}
      <aside className="w-72 fixed h-full bg-white border-r border-gray-100 flex flex-col p-6 z-20">
        <div className="flex items-center gap-2 mb-12 px-2">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-100">
            <Zap className="text-white w-5 h-5" fill="white" />
          </div>
          <span className="font-black text-xl tracking-tight text-gray-900">Clipzy AI</span>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem icon={Home} label="Home" active={activePage === 'home'} onClick={() => setActivePage('home')} />
          <SidebarItem icon={Wrench} label="Tools" active={activePage === 'tools'} onClick={() => setActivePage('tools')} />
          <SidebarItem icon={Users} label="Affiliate" active={activePage === 'affiliate'} onClick={() => setActivePage('affiliate')} />
          <SidebarItem icon={Info} label="About Us" active={activePage === 'about'} onClick={() => setActivePage('about')} />
        </nav>

        <div className="mt-auto p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">JD</div>
            <div>
              <p className="text-xs font-bold text-gray-900">John Doe</p>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">Pro Member</p>
            </div>
          </div>
          <button className="w-full text-xs font-bold text-gray-400 hover:text-red-500 transition-colors text-left flex items-center gap-2">
            Logout Account
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-72">
        {/* Header */}
        <header className="h-20 bg-white/50 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10 px-10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-400 font-bold text-sm">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
            <span className="mx-1">/</span>
            <span className="text-gray-900 capitalize">{activePage}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full">
              <Sparkles size={14} />
              <span className="text-xs font-bold">10 Credits</span>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="w-8 h-8 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center overflow-hidden">
               <User size={18} className="text-gray-400" />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-10 max-w-7xl mx-auto">
          {activePage === 'home' && <HomePage />}
          {activePage === 'tools' && <ToolsPage />}
          {activePage === 'affiliate' && <AffiliatePage />}
          {activePage === 'about' && <AboutPage />}
        </div>
      </main>
    </div>
  );
}