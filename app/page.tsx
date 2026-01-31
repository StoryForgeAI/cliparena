"use client";

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Search, 
  ShoppingBag, 
  Zap, 
  ShieldCheck, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  Menu, 
  X,
  Cpu,
  BarChart3,
  Layers
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
            <Zap className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 tracking-tight">
            Clipzy AI
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
          <a href="#features" className="hover:text-white transition-colors">Systems</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">Logic</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <button className="bg-white text-black px-5 py-2.5 rounded-full hover:bg-gray-200 transition-all font-semibold">
            Launch Platform
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black border-b border-white/10 p-6 flex flex-col space-y-4 text-white animate-in fade-in slide-in-from-top-4">
          <a href="#features" onClick={() => setMobileMenuOpen(false)}>Systems</a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>Logic</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <button className="bg-blue-600 w-full py-3 rounded-xl font-bold">Get Started</button>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-blue-400 text-sm font-medium mb-8 animate-bounce">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span>v2.5 Intelligence Engine Now Live</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
          The Intelligence Layer <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
            For Modern Wealth.
          </span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Clipzy AI is an all-in-one ecosystem that automates data analysis, niche identification, and market execution. Built for the next generation of digital entrepreneurs.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold text-lg flex items-center justify-center group hover:scale-105 transition-transform">
            Start Generating Free
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
            View Live Demo
          </button>
        </div>

        {/* Hero Visual Mockup */}
        <div className="mt-20 relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
          <div className="p-[1px] bg-gradient-to-b from-white/20 to-transparent rounded-2xl">
            <div className="bg-black/40 backdrop-blur-3xl rounded-2xl overflow-hidden aspect-video border border-white/5 shadow-2xl flex flex-col">
              <div className="h-8 bg-white/5 border-b border-white/5 flex items-center px-4 space-x-2">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
                <div className="flex-1 text-[10px] text-gray-500 text-center font-mono">clipzy.ai/dashboard/intelligence_matrix</div>
              </div>
              <div className="flex-1 p-8 grid grid-cols-3 gap-6 opacity-60">
                <div className="col-span-2 space-y-6">
                  <div className="h-32 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                    <BarChart3 className="text-blue-500/50 w-12 h-12" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-20 bg-white/5 rounded-xl border border-white/10" />
                    <div className="h-20 bg-white/5 rounded-xl border border-white/10" />
                  </div>
                </div>
                <div className="space-y-4">
                    {[1,2,3,4].map(i => <div key={i} className="h-10 bg-white/5 rounded-lg border border-white/10" />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description, benefits, colorClass }: any) => (
  <div className="relative group p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent hover:from-blue-500/50 transition-all duration-500">
    <div className="bg-[#0A0A0A] p-8 rounded-[23px] h-full flex flex-col">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${colorClass}`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-400 mb-8 font-light leading-relaxed">
        {description}
      </p>
      <ul className="mt-auto space-y-3">
        {benefits.map((b: string, i: number) => (
          <li key={i} className="flex items-center text-sm text-gray-300">
            <CheckCircle2 className="w-4 h-4 mr-2 text-blue-500" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const FeatureSection = () => {
  const features = [
    {
      icon: Search,
      title: "AI Niche Finder",
      description: "Stop guessing. Our neural networks scan billions of data points to find micro-niches with high demand and zero competition.",
      colorClass: "bg-blue-600",
      benefits: ["Automated trend detection", "Competition density maps", "Monetization probability scores"]
    },
    {
      icon: TrendingUp,
      title: "AI Trade Assistant",
      description: "Professional-grade momentum analysis. Clipzy identifies high-probability trade setups across Crypto and Forex using volume-cluster logic.",
      colorClass: "bg-purple-600",
      benefits: ["Real-time chart pattern recognition", "Risk-to-reward optimization", "24/7 market monitoring"]
    },
    {
      icon: ShoppingBag,
      title: "AI Dropshipping Helper",
      description: "Scale your e-commerce business with data-driven product selection. Find winners before they go viral on social media.",
      colorClass: "bg-indigo-600",
      benefits: ["Winning product sourcing", "Supplier reliability audits", "Ad creative angle analysis"]
    }
  ];

  return (
    <section id="features" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-blue-500 font-mono text-sm tracking-widest uppercase mb-4 font-bold">The Core Systems</h2>
          <p className="text-4xl md:text-5xl font-bold text-white tracking-tight">One Platform. Three Pillars of Wealth.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => <FeatureCard key={i} {...f} />)}
        </div>
      </div>
    </section>
  );
};

const TrustSection = () => (
  <div className="py-12 border-y border-white/5 bg-white/[0.02]">
    <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
      <div className="flex items-center space-x-2"><ShieldCheck className="w-6 h-6" /><span className="font-bold text-xl text-white">SECURE-AI</span></div>
      <div className="flex items-center space-x-2"><Layers className="w-6 h-6" /><span className="font-bold text-xl text-white">INFRA-NETWORK</span></div>
      <div className="flex items-center space-x-2"><Cpu className="w-6 h-6" /><span className="font-bold text-xl text-white">NEURAL-NODE</span></div>
      <div className="flex items-center space-x-2"><Globe className="w-6 h-6" /><span className="font-bold text-xl text-white">GLOBAL-FLOW</span></div>
    </div>
  </div>
);

const CTASection = () => (
  <section className="py-24 px-6">
    <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 to-indigo-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl -translate-y-1/2 translate-x-1/2 rounded-full" />
      <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">Ready to Automate Your Success?</h2>
      <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-80">
        Join over 12,000+ entrepreneurs using Clipzy AI to identify niches, trade smarter, and build automated stores.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="px-10 py-5 bg-white text-blue-900 rounded-full font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all">
          Create Account Now
        </button>
        <button className="px-10 py-5 bg-blue-800/40 backdrop-blur text-white border border-white/20 rounded-full font-bold text-lg hover:bg-blue-800 transition-all">
          Schedule Expert Demo
        </button>
      </div>
      <p className="mt-8 text-blue-200/60 text-sm font-medium">No credit card required to start • Instant platform access</p>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-black pt-20 pb-10 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
      <div className="col-span-2">
        <div className="flex items-center space-x-2 mb-6">
          <Zap className="text-blue-500 w-8 h-8" />
          <span className="text-2xl font-bold text-white tracking-tighter">Clipzy AI</span>
        </div>
        <p className="text-gray-500 max-w-sm leading-relaxed">
          The all-in-one AI platform designed to transform raw data into profitable business opportunities. Built for the modern builder.
        </p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6">Product</h4>
        <ul className="space-y-4 text-gray-500 text-sm">
          <li><a href="#" className="hover:text-blue-400">Features</a></li>
          <li><a href="#" className="hover:text-blue-400">Roadmap</a></li>
          <li><a href="#" className="hover:text-blue-400">Integrations</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6">Company</h4>
        <ul className="space-y-4 text-gray-500 text-sm">
          <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
          <li><a href="#" className="hover:text-blue-400">Support</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/5 text-center text-gray-600 text-xs">
      &copy; {new Date().getFullYear()} Clipzy AI Intelligence Platforms Inc. All rights reserved.
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans selection:bg-blue-500 selection:text-white">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />
      
      <Navbar />
      <Hero />
      <TrustSection />
      <FeatureSection />
      
      {/* Social Proof Stats */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Data Points Processed", value: "4.2B+" },
            { label: "Profitable Niches Found", value: "12,400+" },
            { label: "Trade Accuracy (Backtested)", value: "84.2%" },
            { label: "User Daily Activity", value: "98.5k+" }
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 bg-white/5 rounded-3xl border border-white/5">
              <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}