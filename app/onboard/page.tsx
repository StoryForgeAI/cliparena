"use client";

import React, { useState } from 'react';
import { 
  ShoppingBag, 
  TrendingUp, 
  Search, 
  Check, 
  Zap, 
  ArrowRight, 
  PartyPopper,
  Mail,
  Lock,
  ChevronRight
} from 'lucide-react';

// --- Types ---

type Step = 1 | 2 | 3 | 4;
type Interest = 'dropshipping' | 'trading' | 'niche' | null;

// --- Sub-components ---

const GridBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div 
      className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.4]"
      style={{ maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)' }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white" />
  </div>
);

const InterestCard = ({ 
  title, 
  description, 
  icon: Icon, 
  isSelected, 
  onClick 
}: { 
  title: string; 
  description: string; 
  icon: any; 
  isSelected: boolean; 
  onClick: () => void 
}) => (
  <div 
    onClick={onClick}
    className={`cursor-pointer group relative p-6 rounded-2xl border-2 transition-all duration-300 ${
      isSelected 
      ? 'border-blue-600 bg-blue-50 shadow-md transform scale-[1.02]' 
      : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
    }`}
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
      isSelected ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
    }`}>
      <Icon size={24} />
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    
    <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
      isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
    }`}>
      {isSelected && <Check size={14} className="text-white" />}
    </div>
  </div>
);

const PlanCard = ({ 
  name, 
  price, 
  badge, 
  features, 
  isFeatured, 
  onSelect 
}: { 
  name: string; 
  price: string; 
  badge?: string; 
  features: string[]; 
  isFeatured?: boolean;
  onSelect: () => void;
}) => (
  <div className={`flex flex-col p-8 rounded-3xl border transition-all ${
    isFeatured 
    ? 'bg-blue-600 text-white border-blue-600 shadow-xl scale-105 z-10' 
    : 'bg-white text-gray-900 border-gray-200 shadow-sm'
  }`}>
    <div className="flex justify-between items-start mb-4">
      <div>
        {badge && (
          <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 inline-block uppercase tracking-wider">
            {badge}
          </span>
        )}
        <h3 className="text-xl font-bold">{name}</h3>
      </div>
      <div className="text-right">
        <span className="text-3xl font-black">{price}</span>
        <p className={`text-[10px] font-medium opacity-70`}>/ month</p>
      </div>
    </div>
    
    <ul className="space-y-4 mb-10 flex-1">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start text-sm font-medium">
          <Check size={16} className={`mr-2 mt-0.5 flex-shrink-0 ${isFeatured ? 'text-blue-200' : 'text-blue-600'}`} />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    
    <button 
      onClick={onSelect}
      className={`w-full py-4 rounded-xl font-bold transition-all active:scale-95 ${
        isFeatured 
        ? 'bg-white text-blue-600 hover:bg-gray-100 shadow-lg' 
        : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      Start for Free
    </button>
  </div>
);

// --- Main App Component ---

export default function App() {
  const [step, setStep] = useState<Step>(1);
  const [interest, setInterest] = useState<Interest>(null);

  const nextStep = () => setStep((prev) => (prev + 1) as Step);

  return (
    <div className="min-h-screen font-sans antialiased text-gray-900 selection:bg-blue-100">
      <GridBackground />

      {/* Header / Progress */}
      <div className="max-w-7xl mx-auto px-6 pt-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-blue-200 shadow-lg">
            <Zap className="text-white w-5 h-5" fill="white" />
          </div>
          <span className="font-black text-xl tracking-tight text-gray-900">Clipzy AI</span>
        </div>
        
        {step < 4 && (
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    step >= s ? 'w-8 bg-blue-600' : 'w-4 bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Step 0{step}</span>
          </div>
        )}
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-16 pb-24 flex flex-col items-center justify-center">
        
        {/* STEP 1: LOGIN */}
        {step === 1 && (
          <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-black mb-2 tracking-tight">Welcome to Clipzy AI</h1>
              <p className="text-gray-500 font-medium">Set up your AI workspace in seconds</p>
            </div>
            
            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100">
              <div className="space-y-4 mb-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      type="email" 
                      placeholder="name@company.com" 
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium"
                    />
                  </div>
                </div>
              </div>
              
              <button 
                onClick={nextStep}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Next
                <ChevronRight size={20} />
              </button>
            </div>
            <p className="text-center mt-6 text-sm text-gray-400">
              By continuing, you agree to our Terms of Service.
            </p>
          </div>
        )}

        {/* STEP 2: INTERESTS */}
        {step === 2 && (
          <div className="w-full max-w-4xl animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-black mb-2 tracking-tight">What are you most interested in?</h1>
              <p className="text-gray-500 font-medium">Choose one to personalize your AI tools</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <InterestCard 
                title="Dropshipping Helper"
                description="Find winning products and optimize your store instantly."
                icon={ShoppingBag}
                isSelected={interest === 'dropshipping'}
                onClick={() => setInterest('dropshipping')}
              />
              <InterestCard 
                title="AI Trade Assistant"
                description="Get AI-powered market insights and high-probability signals."
                icon={TrendingUp}
                isSelected={interest === 'trading'}
                onClick={() => setInterest('trading')}
              />
              <InterestCard 
                title="AI Niche Finder"
                description="Discover profitable, low-competition niches across markets."
                icon={Search}
                isSelected={interest === 'niche'}
                onClick={() => setInterest('niche')}
              />
            </div>

            <div className="flex justify-center">
              <button 
                disabled={!interest}
                onClick={nextStep}
                className={`px-12 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all flex items-center gap-2 ${
                  interest 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200 active:scale-95' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                }`}
              >
                Next
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PRICING */}
        {step === 3 && (
          <div className="w-full max-w-6xl animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-black mb-3 tracking-tight">Choose Your Plan</h1>
              <p className="text-gray-500 font-medium max-w-lg mx-auto">
                Select the power level your business needs. Upgrade or downgrade anytime.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-stretch">
              <PlanCard 
                name="BETA"
                price="$4"
                badge="Limited Offer"
                features={[
                  "Access to all 3 AI tools",
                  "Limited daily AI usage",
                  "Early access to new features",
                  "Community support"
                ]}
                onSelect={nextStep}
              />
              <PlanCard 
                name="PRO"
                price="$19"
                isFeatured
                features={[
                  "Full AI usage",
                  "Faster AI processing",
                  "Advanced trade insights",
                  "Premium niche data",
                  "Priority support"
                ]}
                onSelect={nextStep}
              />
              <PlanCard 
                name="ELITE"
                price="$49"
                features={[
                  "Unlimited AI usage",
                  "Advanced analytics",
                  "Pro trading signals",
                  "Exclusive niche reports",
                  "Dropshipping automation",
                  "VIP support"
                ]}
                onSelect={nextStep}
              />
            </div>
          </div>
        )}

        {/* STEP 4: SUCCESS */}
        {step === 4 && (
          <div className="max-w-md w-full text-center animate-in fade-in zoom-in-90 duration-1000">
            <div className="mb-8 relative inline-block">
              <div className="absolute inset-0 bg-blue-600 blur-2xl opacity-20 rounded-full scale-150 animate-pulse" />
              <div className="relative w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-blue-200">
                <PartyPopper size={48} className="text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl font-black mb-4 tracking-tight">You're Ready!</h1>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed font-medium">
              Welcome to the family. You received <span className="text-blue-600 font-bold">10 free credits</span> to explore Clipzy AI.
            </p>
            
            <button className="w-full py-5 bg-gray-900 text-white rounded-2xl font-bold text-xl hover:bg-black shadow-xl transition-all active:scale-[0.98]">
              Go to Dashboard
            </button>
            
            <p className="mt-8 text-xs font-bold text-gray-400 uppercase tracking-widest">
              Account Activated Successfully
            </p>
          </div>
        )}
      </main>
    </div>
  );
}