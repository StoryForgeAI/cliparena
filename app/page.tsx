"use client";

import { motion } from "framer-motion";
import { Sparkles, Video, Library, Search, Wand2 } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-blue-50 to-white text-slate-800">
      {/* NAV */}
      <header className="w-full flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <Sparkles className="w-6 h-6" /> VisionSuite
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-2xl shadow-md transition">Get Started</button>
      </header>

      {/* HERO */}
      <section className="text-center px-6 pt-16 pb-24 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
            AI Tools for Modern Content Creation
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            Discover ideas, generate scripts, and produce scroll‑stopping videos — all in one streamlined workspace.
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl shadow-md transition">Start Free</button>
            <button className="border border-blue-200 hover:bg-blue-50 px-8 py-3 rounded-2xl transition">See Demo</button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <div className="bg-white shadow-xl rounded-2xl p-6 border border-blue-100">
            <div className="h-64 rounded-xl bg-gradient-to-br from-blue-100 to-sky-50 flex items-center justify-center text-blue-400 text-lg font-medium">
              Dashboard Preview UI
            </div>
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 py-24 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Everything You Need to Go Viral</h2>
          <p className="text-slate-600 mb-16">Powerful AI modules designed for fast creators.</p>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard icon={<Search />} title="Niche Finder Request" desc="Instantly uncover profitable niches and trending directions tailored to your market." />
            <FeatureCard icon={<Library />} title="Viral Angle Library" desc="Browse high-performing creative angles and hook structures that capture attention." />
            <FeatureCard icon={<Wand2 />} title="Script Generation" desc="Turn ideas into ready-to-record scripts optimized for engagement and retention." />
            <FeatureCard icon={<Video />} title="Veo 3 Fast Video (15 sec)" desc="Generate short AI videos fast — perfect for ads, reels, and viral content." />
            <FeatureCard icon={<Sparkles />} title="Total with Veo 3 Fast" desc="Full workflow: idea → script → video. Everything connected seamlessly." />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="px-6 py-24 bg-gradient-to-b from-white to-sky-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold mb-6">Simple Workflow</h2>
            <ul className="space-y-4 text-slate-600">
              <li>1. Submit your niche or idea direction</li>
              <li>2. Get viral angles and scripts instantly</li>
              <li>3. Generate ready-to-post short videos</li>
              <li>4. Launch content faster than ever</li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="bg-white shadow-lg rounded-2xl p-6 border border-blue-100">
              <div className="h-72 bg-gradient-to-br from-sky-100 to-blue-50 rounded-xl flex items-center justify-center text-blue-300">
                Process Illustration
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6">
        <h2 className="text-4xl font-bold mb-6">Start Creating Smarter</h2>
        <p className="text-slate-600 mb-8">Join creators using AI to speed up their workflow.</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl shadow-lg transition">Try It Now</button>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-sm text-slate-500 border-t border-blue-100">
        © {new Date().getFullYear()} VisionSuite. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="bg-gradient-to-b from-white to-sky-50 border border-blue-100 shadow-md rounded-2xl p-6 text-left">
      <div className="text-blue-500 mb-4">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-slate-600">{desc}</p>
    </motion.div>
  );
}