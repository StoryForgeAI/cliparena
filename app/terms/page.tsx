"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#0F1117] text-white p-6 md:p-20 font-sans selection:bg-[#6C2BFF]/30">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">Terms of Service</h1>
          <div className="h-1 w-20 bg-[#6C2BFF] mb-8" />
          <p className="text-gray-500 text-sm uppercase tracking-widest font-bold">Last Updated: January 2024</p>
        </motion.div>

        <div className="space-y-12 text-gray-400 leading-relaxed text-sm md:text-base">
          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4 italic">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Clip Arena, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services. Our platform is designed for creative video processing and management.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <h2 className="text-xl font-bold text-[#6C2BFF] uppercase tracking-tight mb-4 italic">2. No Gambling Policy</h2>
            <p className="text-white font-medium">
              Clip Arena is strictly a video utility and social entertainment platform. We want to emphasize that our system does not feature, support, or facilitate any form of gambling, betting, or games of chance. No real money or items of value can be wagered or won through the use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4 italic">3. User Accounts</h2>
            <p>
              To access certain features, you must register for an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information during registration.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4 italic">4. Use of Service & Credits</h2>
            <p>
              Clip Arena provides credits for specific video-related tasks. These credits have no monetary value and are non-transferable. Misuse of the system, including automated scraping or attempts to bypass service limits, will result in immediate termination of access.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4 italic">5. Content Ownership</h2>
            <p>
              Users retain ownership of the content they upload. However, by using the service, you grant Clip Arena a license to process and display your content as necessary to provide the service. You represent that you have all necessary rights to any content you upload.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4 italic">6. Limitation of Liability</h2>
            <p>
              Clip Arena is provided "as is" without any warranties. We shall not be liable for any indirect, incidental, or consequential damages resulting from your use of the service.
            </p>
          </section>
        </div>

        <footer className="mt-20 pt-10 border-t border-white/5 text-center">
          <button 
            onClick={() => window.history.back()}
            className="text-xs font-bold text-gray-600 hover:text-[#6C2BFF] transition-colors uppercase tracking-[0.3em]"
          >
            Return to the Arena
          </button>
        </footer>
      </div>
    </div>
  );
}