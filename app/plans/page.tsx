"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- CUSTOM SVG ICONS ---
const CheckIcon = ({ color = "currentColor" }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
);

export default function PlansPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const plans = [
    {
      id: "standard",
      name: "Standard",
      price: "1",
      description: "Entry level for casual creators.",
      features: [
        { text: "1 video every 2nd day", enabled: true },
        { text: "Standard Posting (~1 min)", enabled: true },
        { text: "Basic Video Analytics", enabled: true },
        { text: "Detailed Analytics", enabled: false },
        { text: "Global Leaderboard Rank", enabled: false },
        { text: "View Boosters", enabled: false },
      ],
      buttonText: "Start Basic",
      popular: false
    },
    {
      id: "beta",
      name: "BETA",
      price: "3",
      description: "Early access perks for supporters.",
      features: [
        { text: "1 video per day", enabled: true },
        { text: "Super Posting (~15 sec)", enabled: true },
        { text: "Detailed Analytics", enabled: true },
        { text: "1 Free View Booster / month", enabled: true },
        { text: "Global Leaderboard Rank", enabled: false },
        { text: "Advanced Rank Scaling", enabled: false },
      ],
      buttonText: "Join Beta",
      popular: false
    },
    {
      id: "pro",
      name: "Pro",
      price: "5",
      description: "For serious daily competitors.",
      features: [
        { text: "2 videos per day", enabled: true },
        { text: "Super Posting (~15 sec)", enabled: true },
        { text: "Detailed Analytics", enabled: true },
        { text: "Global Leaderboard (2m update)", enabled: true },
        { text: "View Boosters", enabled: false },
        { text: "Viewer Identity List", enabled: false },
      ],
      buttonText: "Go Pro",
      popular: true
    },
    {
      id: "creator",
      name: "Content Creator",
      price: "8",
      description: "The ultimate tool for influencers.",
      features: [
        { text: "3 videos per day", enabled: true },
        { text: "Ultra Posting (~5 sec)", enabled: true },
        { text: "Pro Analytics & Last 20 Viewer Names", enabled: true },
        { text: "Continuous Leaderboard Update", enabled: true },
        { text: "3 View Boosters (+5 Rank/use)", enabled: true },
        { text: "Detailed Email Feedback", enabled: true },
      ],
      buttonText: "Full Access",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F1117] text-white selection:bg-[#6C2BFF] py-20 px-6 font-sans">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[#6C2BFF]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-[#00D1B2]/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Navigation Back */}
        <motion.a 
          href="/"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 group cursor-pointer"
        >
          <BackIcon />
          <span className="text-xs font-black tracking-widest uppercase">Back to Arena</span>
        </motion.a>

        {/* Header Text */}
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase"
          >
            Select Your <span className="text-[#6C2BFF]">Weapon.</span>
          </motion.h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Every subscription contributes to the weekly Prize Pool. <br />
            Choose the power level that fits your grind.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative p-8 rounded-[32px] border transition-all duration-300 flex flex-col ${
                plan.popular 
                ? 'bg-[#1A1D26] border-[#6C2BFF] shadow-[0_0_40px_rgba(108,43,255,0.15)]' 
                : 'bg-[#1A1D26] border-white/5 hover:border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#6C2BFF] text-white text-[9px] font-black tracking-[0.3em] px-4 py-1.5 rounded-full uppercase z-10 whitespace-nowrap">
                  Most Popular
                </div>
              )}

              <div className="mb-8 relative z-10">
                <h3 className="text-sm font-black tracking-[0.2em] text-[#6C2BFF] uppercase mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black tracking-tighter">${plan.price}</span>
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">/month</span>
                </div>
                <p className="mt-4 text-xs text-gray-400 leading-relaxed font-medium">
                  {plan.description}
                </p>
              </div>

              <div className="space-y-4 mb-10 flex-grow relative z-10">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex gap-3 items-start">
                    <div className="mt-1 flex-shrink-0">
                      {feature.enabled ? (
                        <div className="w-4 h-4 bg-[#6C2BFF]/20 rounded-full flex items-center justify-center">
                          <CheckIcon color="#6C2BFF" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 bg-gray-800/30 rounded-full flex items-center justify-center">
                          <LockIcon />
                        </div>
                      )}
                    </div>
                    <span className={`text-[13px] font-medium leading-tight ${feature.enabled ? 'text-gray-200' : 'text-gray-600 italic'}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-2xl text-[11px] font-black tracking-[0.2em] uppercase transition-all active:scale-95 relative z-10 ${
                plan.popular 
                ? 'bg-[#6C2BFF] text-white shadow-lg shadow-[#6C2BFF]/20 hover:bg-[#7d42ff]' 
                : 'bg-white/5 text-white hover:bg-white/10 border border-white/5'
              }`}>
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Info Footer */}
        <div className="mt-24 text-center border-t border-white/5 pt-12">
          <p className="text-[10px] text-gray-600 font-mono tracking-[0.4em] uppercase leading-relaxed">
            All plans include community voting rights and basic profile access. <br />
            Early supporters receive the legacy badge on their profile.
          </p>
        </div>
      </div>
    </div>
  );
}