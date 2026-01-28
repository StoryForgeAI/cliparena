"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0F1117] text-white p-6 md:p-20 font-sans selection:bg-[#6C2BFF]/30">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">Privacy Policy</h1>
          <div className="h-1 w-20 bg-[#6C2BFF] mb-8" />
          <p className="text-gray-500 text-sm uppercase tracking-widest font-bold">Last Updated: January 2024</p>
        </motion.div>

        <div className="space-y-12 text-gray-400 leading-relaxed text-sm md:text-base">
          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4 italic">1. Information We Collect</h2>
            <p>
              At Clip Arena, we collect information to provide a better experience. This includes:
            </p>
            <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-500">
              <li>Account information (Email, Username, Profile Picture)</li>
              <li>Authentication data provided via Google or Email login</li>
              <li>Usage data related to video processing and credit consumption</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4 italic">2. How We Use Data</h2>
            <p>
              Your data is used solely to manage your account, provide technical support, and process your requests within the Clip Arena ecosystem. We do not sell your personal information to third parties.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <h2 className="text-xl font-bold text-[#6C2BFF] uppercase tracking-tight mb-4 italic">3. Safe Environment Commitment</h2>
            <p className="text-white font-medium">
              Your data security is paramount. Furthermore, we maintain a clean platform environment. As stated in our Terms, Clip Arena does not involve any gambling activities. We do not track or collect any data related to betting or wagering, as these features do not exist on our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4 italic">4. Data Storage</h2>
            <p>
              We use industry-standard security measures and reputable services like Google Firebase to store and protect your information. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4 italic">5. Cookies and Tracking</h2>
            <p>
              We use essential cookies to maintain your session and remember your preferences. You can manage cookie settings through your browser, though some features of the Arena may become unavailable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4 italic">6. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal data. To exercise these rights or if you have questions regarding this policy, please contact us through the official support channels.
            </p>
          </section>
        </div>

        <footer className="mt-20 pt-10 border-t border-white/5 text-center">
          <button 
            onClick={() => window.history.back()}
            className="text-xs font-bold text-gray-600 hover:text-[#6C2BFF] transition-colors uppercase tracking-[0.3em]"
          >
            Back to Dashboard
          </button>
        </footer>
      </div>
    </div>
  );
}