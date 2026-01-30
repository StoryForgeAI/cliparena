"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Library, 
  PenTool, 
  Video, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  BarChart3, 
  Globe, 
  ShieldCheck,
  Menu,
  X,
  PlayCircle,
  TrendingUp,
  Cpu,
  Layers,
  ChevronDown
} from 'lucide-react';

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* Background Pattern - Modern Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ 
               backgroundImage: `linear-gradient(#0960FE 1.5px, transparent 1.5px), linear-gradient(90deg, #0960FE 1.5px, transparent 1.5px)`, 
               backgroundSize: '60px 60px' 
             }}>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
      </div>

      {/* Floating Announcement Bar */}
      <div className="relative z-50 bg-[#0960FE] text-white py-2.5 px-4 text-center text-sm font-medium">
        <div className="flex items-center justify-center gap-2">
          <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest">New</span>
          <span>Veo 3 Fast Video generation is now 40% faster. Try the 15s clips today!</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-100 py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-[#0960FE] rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
              <Zap className="text-white size-6 fill-current" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase">Clipzy<span className="text-[#0960FE]">AI</span></span>
          </div>

          <div className="hidden lg:flex items-center gap-10 text-[15px] font-semibold text-slate-600">
            {['Solutions', 'Viral Library', 'Video Engine', 'Pricing', 'FAQ'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-[#0960FE] transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0960FE] transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden sm:block text-[15px] font-bold px-5 py-2.5 hover:text-[#0960FE] transition-colors">Sign In</button>
            <button className="bg-[#0960FE] text-white text-[15px] font-bold px-6 py-3 rounded-xl hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all hover:-translate-y-0.5">
              Start Free Trial
            </button>
            <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full mb-10 animate-fade-in-down">
          <span className="bg-blue-100 p-1 rounded-md"><Sparkles className="size-4 text-blue-600" /></span>
          <span className="text-xs font-bold text-blue-700 uppercase tracking-[0.2em]">Next-Gen Content Ecosystem</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-[950] tracking-tight text-slate-900 mb-8 leading-[0.95] animate-fade-in">
          High-performance creative <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0960FE] to-blue-400">built for scale.</span>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-slate-500 font-medium leading-relaxed mx-auto mb-12 animate-fade-in delay-200">
          Scale your content production from research to final export. Use Niche Finder to spot trends, generate viral scripts, and produce Veo 3 videos in 15 seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-24 animate-fade-in delay-300">
          <button className="group relative w-full sm:w-auto px-10 py-5 bg-[#0960FE] text-white font-black rounded-2xl hover:bg-blue-700 shadow-2xl shadow-blue-200 transition-all hover:-translate-y-1">
            <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
              GET STARTED FOR FREE <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <button className="w-full sm:w-auto px-10 py-5 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all">
            WATCH DEMO
          </button>
        </div>

        {/* Dashboard Preview */}
        <div className="max-w-6xl mx-auto relative group animate-slide-up">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-[2.5rem] blur-2xl opacity-50 transition-opacity"></div>
          <div className="relative bg-white rounded-[2rem] border border-slate-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex gap-2">
                {[1, 2, 3].map((dot) => <div key={dot} className="w-3 h-3 rounded-full bg-slate-200"></div>)}
              </div>
              <div className="flex items-center gap-3 px-6 py-1.5 bg-white rounded-full border border-slate-200 text-[10px] font-black text-slate-400 italic tracking-wider">
                APP.CLIPZY.AI / DASHBOARD
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <Zap className="size-4 text-blue-600" />
              </div>
            </div>
            <div className="p-1 md:p-8 grid grid-cols-12 gap-8 text-left">
              <div className="col-span-12 md:col-span-4 space-y-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                 <div className="flex items-center gap-3"><TrendingUp className="text-blue-600" size={20} /><div className="h-4 w-32 bg-slate-200 rounded"></div></div>
                 <div className="space-y-4">
                    {[1, 2, 3, 4].map((row) => (
                      <div key={row} className="flex justify-between items-center"><div className="h-2 w-24 bg-slate-100 rounded"></div><div className="h-2 w-8 bg-blue-100 rounded"></div></div>
                    ))}
                 </div>
                 <div className="pt-4 border-t border-slate-200">
                    <div className="h-24 w-full bg-blue-600 rounded-xl flex items-center justify-center">
                      <BarChart3 className="text-white opacity-40" />
                    </div>
                 </div>
              </div>
              <div className="col-span-12 md:col-span-8 space-y-6">
                <div className="flex justify-between items-center">
                  <div className="h-6 w-48 bg-slate-100 rounded"></div>
                  <div className="h-10 w-32 bg-slate-900 rounded-xl"></div>
                </div>
                <div className="aspect-video bg-slate-900 rounded-3xl flex items-center justify-center relative overflow-hidden">
                   <PlayCircle className="size-20 text-white opacity-20 hover:opacity-40 transition-opacity cursor-pointer" />
                   <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/20">
                      Veo 3 Engine Active
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Logos Section */}
      <section className="py-20 border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-12">Empowering 2,500+ Top DTC Brands</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale contrast-125">
             {['AMAZON', 'TIKTOK', 'REVOLUT', 'SHOPIFY', 'NIKE'].map((brand) => (
               <span key={brand} className="text-2xl font-black italic tracking-tighter">{brand}</span>
             ))}
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section id="solutions" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
               <div>
                 <h2 className="text-4xl md:text-5xl font-[900] tracking-tight mb-6">Four pillars of <br /><span className="text-[#0960FE]">unmatched creative.</span></h2>
                 <p className="text-slate-500 font-medium">Stop wasting hours on manual research and production. We've automated the entire stack.</p>
               </div>
               
               <div className="space-y-8">
                  {[
                    { icon: <Search />, title: "Niche Finder Request", text: "Find your next high-margin winner with deep competition data." },
                    { icon: <Library />, title: "Viral Angle Library", text: "Browse 5,000+ psychology-backed hooks that actually grab attention." },
                    { icon: <PenTool />, title: "Script Generation", text: "Retention-optimized scripts designed specifically for social platforms." },
                    { icon: <Video />, title: "Veo 3 Fast Video (15s)", text: "Cinematic quality 15-second ads generated in less than a minute." }
                  ].map((feature, featureIdx) => (
                    <div key={featureIdx} className="flex gap-6 group">
                       <div className="w-14 h-14 shrink-0 bg-blue-50 text-[#0960FE] rounded-2xl flex items-center justify-center group-hover:bg-[#0960FE] group-hover:text-white transition-all duration-300">
                          {feature.icon}
                       </div>
                       <div>
                          <h4 className="text-lg font-black uppercase tracking-tight mb-2">{feature.title}</h4>
                          <p className="text-slate-500 text-sm leading-relaxed">{feature.text}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
            
            <div className="relative">
              <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative z-10 shadow-3xl shadow-blue-900/20">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-black">AI</div>
                    <div>
                       <div className="text-sm font-bold uppercase tracking-widest">Active Processing</div>
                       <div className="text-xs text-blue-400 font-medium italic">Model: Veo 3 Engine v1.4</div>
                    </div>
                 </div>
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400"><span>Scripting</span><span>Done</span></div>
                       <div className="h-1.5 w-full bg-white/10 rounded-full"><div className="h-full w-full bg-blue-500 rounded-full"></div></div>
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400"><span>Video Generation</span><span>92%</span></div>
                       <div className="h-1.5 w-full bg-white/10 rounded-full"><div className="h-full w-[92%] bg-blue-500 rounded-full animate-pulse"></div></div>
                    </div>
                 </div>
                 <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
                    <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-4">Final Analysis</div>
                    <p className="text-sm font-medium italic leading-relaxed text-slate-300">
                       "Angle focused on urgency. Predicted CTR increase of 12.4% based on current benchmark data from Viral Library."
                    </p>
                 </div>
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-400/20 blur-[100px] rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-slate-50 relative z-10">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-24">
               <h2 className="text-4xl md:text-5xl font-black mb-6">Simple, <span className="text-[#0960FE]">scalable</span> pricing.</h2>
               <p className="text-slate-500 font-medium">Choose the plan that fits your current production volume.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {[
                 { name: "Starter", price: "$49", features: ["10 Niche Requests/mo", "Basic Library Access", "Veo 3 Standard Speed", "5 Scripts/mo"] },
                 { name: "Professional", price: "$129", popular: true, features: ["Unlimited Niche Requests", "Full Viral Library Access", "Veo 3 Fast Mode (15s)", "50 Scripts/mo", "Priority Support"] },
                 { name: "Enterprise", price: "$499", features: ["Unlimited Everything", "Custom AI Model Training", "API Access", "Dedicated Success Manager", "White-label Options"] }
               ].map((plan, planIdx) => (
                 <div key={planIdx} className={`p-10 rounded-[2.5rem] bg-white border ${plan.popular ? 'border-[#0960FE] shadow-2xl shadow-blue-100 relative' : 'border-slate-100 shadow-xl'}`}>
                    {plan.popular && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0960FE] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                        Most Popular
                      </div>
                    )}
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">{plan.name}</h3>
                    <div className="text-5xl font-black mb-8">{plan.price}<span className="text-lg text-slate-400 font-medium">/mo</span></div>
                    <ul className="space-y-5 mb-10">
                       {plan.features.map((featureItem, featureItemIdx) => (
                         <li key={featureItemIdx} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                           <CheckCircle2 size={18} className="text-blue-500" /> {featureItem}
                         </li>
                       ))}
                    </ul>
                    <button className={`w-full py-4 rounded-xl font-black text-sm tracking-wide transition-all ${plan.popular ? 'bg-[#0960FE] text-white hover:bg-blue-700 shadow-lg shadow-blue-100' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}>
                       CHOOSE {plan.name.toUpperCase()}
                    </button>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-16 uppercase tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "What is Veo 3 Fast Video?", a: "Veo 3 is our proprietary video generation engine optimized for social media ads. 'Fast Mode' specifically generates high-fidelity 15-second clips in under 60 seconds." },
              { q: "Can I cancel my subscription anytime?", a: "Yes, you can cancel your subscription at any time from your dashboard. You will retain access until the end of your billing cycle." },
              { q: "Does Niche Finder support all marketplaces?", a: "Currently, Niche Finder supports Amazon, Shopify trends, TikTok Shop data, and Google Trends aggregation globally." },
              { q: "What's the 'Viral Angle Library'?", a: "It's a curated database of psychological frameworks used by the world's most successful DTC brands, categorized by niche and platform." }
            ].map((faq, faqIdx) => (
              <div key={faqIdx} className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm">
                <button 
                  onClick={() => setActiveFaq(activeFaq === faqIdx ? null : faqIdx)}
                  className="w-full px-8 py-6 flex justify-between items-center text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-800">{faq.q}</span>
                  <ChevronDown className={`transition-transform duration-300 ${activeFaq === faqIdx ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-300 overflow-hidden ${activeFaq === faqIdx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="px-8 pb-8 text-slate-500 text-sm leading-relaxed font-medium">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
             <div className="md:col-span-2 space-y-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-[#0960FE] rounded-xl flex items-center justify-center">
                    <Zap className="text-white size-6 fill-current" />
                  </div>
                  <span className="text-2xl font-black tracking-tighter uppercase">ClipzyAI</span>
                </div>
                <p className="text-slate-400 max-w-sm font-medium leading-relaxed">
                   Providing enterprise-grade AI creative tools for the next generation of performance marketers and founders.
                </p>
             </div>
             <div>
                <h4 className="font-black uppercase tracking-widest text-[10px] text-blue-500 mb-8">Navigation</h4>
                <ul className="space-y-4 text-sm font-bold opacity-60">
                   <li className="hover:opacity-100 cursor-pointer">Solutions</li>
                   <li className="hover:opacity-100 cursor-pointer">Viral Library</li>
                   <li className="hover:opacity-100 cursor-pointer">Pricing</li>
                   <li className="hover:opacity-100 cursor-pointer">Status</li>
                </ul>
             </div>
             <div>
                <h4 className="font-black uppercase tracking-widest text-[10px] text-blue-500 mb-8">Social</h4>
                <ul className="space-y-4 text-sm font-bold opacity-60">
                   <li className="hover:opacity-100 cursor-pointer">Twitter (X)</li>
                   <li className="hover:opacity-100 cursor-pointer">YouTube</li>
                   <li className="hover:opacity-100 cursor-pointer">LinkedIn</li>
                   <li className="hover:opacity-100 cursor-pointer">Discord</li>
                </ul>
             </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
             <p>© 2026 ClipzyAI Technologies Inc. Built in the Cloud.</p>
             <div className="flex gap-8 mt-8 md:mt-0">
                <span className="hover:text-white cursor-pointer">Privacy</span>
                <span className="hover:text-white cursor-pointer">Terms</span>
                <span className="hover:text-white cursor-pointer">Security</span>
             </div>
          </div>
        </div>
      </footer>

      {/* Global Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .animate-fade-in-down { animation: fade-in-down 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .animate-slide-up { animation: slide-up 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .shadow-3xl { box-shadow: 0 40px 100px -20px rgba(0,0,0,0.1); }
      `}</style>
    </div>
  );
}

export default App;