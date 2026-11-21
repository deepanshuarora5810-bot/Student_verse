import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import { Sparkles, Terminal, Shield, Globe2, ArrowRight, Github, Twitter, Linkedin, Check } from 'lucide-react';

export const Footer = () => {
  const { addToast } = useStudent();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid neural transmission email address.', 'warning');
      return;
    }
    setSubscribed(true);
    addToast('Subscribed to StudentVerse Weekly Quantum Dispatch!', 'success', 'Transmission Active');
    setEmail('');
  };

  return (
    <footer className="border-t border-indigo-900/30 bg-[#030612]/90 backdrop-blur-xl relative overflow-hidden">
      {/* Background glow lines */}
      <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-[1px]">
                <div className="w-full h-full bg-[#050818] rounded-[11px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="font-display font-bold text-xl tracking-wider text-white">
                STUDENT<span className="text-gradient-cyan">VERSE</span>
              </span>
            </Link>
            
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              A next-generation 3D student learning cosmos. Empowering inquisitive minds with interactive simulations, neural dashboards, and decentralized study telemetry.
            </p>

            {/* Telemetry status badge */}
            <div className="flex items-center gap-2 mt-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>NEURAL GRID: OPTIMAL • 99.98% UPTIME</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-300 mb-4">
              Cosmos Portal
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-400">
              <li><Link to="/dashboard" className="hover:text-cyan-400 transition-colors">Neural Dashboard</Link></li>
              <li><Link to="/courses" className="hover:text-cyan-400 transition-colors">Course Catalog</Link></li>
              <li><Link to="/planner" className="hover:text-cyan-400 transition-colors">Weekly Planner</Link></li>
              <li><Link to="/assignments" className="hover:text-cyan-400 transition-colors">Assignment Vault</Link></li>
              <li><Link to="/achievements" className="hover:text-cyan-400 transition-colors">Badges & XP</Link></li>
            </ul>
          </div>

          {/* Curriculum */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-300 mb-4">
              Disciplines
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-400">
              <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">Quantum Computing</span></li>
              <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">Deep Transformers</span></li>
              <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">WebGL & GLSL Shaders</span></li>
              <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">Brain-Computer Interfaces</span></li>
              <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">Zero-Knowledge Cryptography</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-300 mb-1">
              Neural Dispatch
            </h4>
            <p className="text-xs text-slate-400">
              Subscribe to weekly breakthroughs, algorithmic challenges, and platform updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@domain.edu"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono"
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 transition-all shadow-neon-cyan"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Synchronized!</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright and legal */}
        <div className="mt-12 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <p>© 2026 STUDENTVERSE. Built for next-generation learners. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hover:text-cyan-400 cursor-pointer transition-colors flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5" /> CLI v3.2
            </span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> Privacy Matrix
            </span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors flex items-center gap-1">
              <Globe2 className="w-3.5 h-3.5" /> Global CDN
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
