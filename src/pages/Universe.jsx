import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UniverseScene } from '../three/UniverseScene';
import { UNIVERSE_PLANETS } from '../data/demoData';
import {
  Globe,
  Sparkles,
  BookOpen,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  Zap,
  RotateCcw,
  Layers
} from 'lucide-react';

export const Universe = () => {
  const navigate = useNavigate();
  const [selectedPlanet, setSelectedPlanet] = useState(UNIVERSE_PLANETS[0]);
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'Quantum', 'Systems', 'Science', 'AI & Data', 'Data'];

  const filteredPlanets = filterCategory === 'All'
    ? UNIVERSE_PLANETS
    : UNIVERSE_PLANETS.filter((p) => p.category === filterCategory);

  const handleLaunchCourse = (planet) => {
    navigate('/courses');
  };

  return (
    <div className="relative w-full h-[calc(100vh-5rem)] overflow-hidden flex flex-col bg-[#030612]">
      {/* 3D Cosmos Canvas Background */}
      <div className="absolute inset-0 z-0">
        <UniverseScene
          selectedPlanet={selectedPlanet}
          onSelectPlanet={(planet) => setSelectedPlanet(planet)}
        />
      </div>

      {/* Top Floating Glass HUD Bar */}
      <div className="relative z-10 p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pointer-events-none">
        <div className="pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 mb-1">
            <Globe className="w-3.5 h-3.5 animate-pulse" />
            <span>GALACTIC LEARNING UNIVERSE // SECTOR-07</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            Subject Celestial Spheres
          </h1>
          <p className="text-xs text-slate-400 max-w-lg mt-0.5">
            Rotate & zoom to navigate the planetary learning spheres. Click any celestial body to inspect curriculum, mastery requirements, and launch orbital modules.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="pointer-events-auto flex flex-wrap gap-1.5 p-1.5 rounded-2xl glass-card border-indigo-500/20 bg-[#070b22]/70 backdrop-blur-md">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilterCategory(cat);
                const match = UNIVERSE_PLANETS.find((p) => cat === 'All' || p.category === cat);
                if (match) setSelectedPlanet(match);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                filterCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-neon-cyan'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Planetary Carousel / Selection Bar (Bottom Left) */}
      <div className="relative z-10 mt-auto p-4 md:p-6 flex flex-col md:flex-row justify-between items-end gap-6 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 overflow-x-auto max-w-full pb-2">
          {filteredPlanets.map((p) => {
            const isSelected = selectedPlanet?.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPlanet(p)}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all backdrop-blur-md border ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_-3px_rgba(6,182,212,0.4)]'
                    : 'bg-[#080d26]/80 border-indigo-900/40 text-slate-400 hover:text-slate-200 hover:border-indigo-500/40'
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: p.color, boxShadow: `0 0 10px ${p.color}` }}
                />
                <span className="font-semibold">{p.name}</span>
                <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">{p.stats.mastery}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Planet Detailed Holographic HUD (Bottom Right / Side) */}
        <AnimatePresence mode="wait">
          {selectedPlanet && (
            <motion.div
              key={selectedPlanet.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-auto w-full md:w-96 rounded-2xl glass-card border-indigo-500/30 p-5 bg-[#070b22]/90 backdrop-blur-xl shadow-2xl relative overflow-hidden"
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-30 pointer-events-none"
                style={{ backgroundColor: selectedPlanet.color }}
              />

              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border"
                  style={{
                    color: selectedPlanet.color,
                    borderColor: `${selectedPlanet.color}40`,
                    backgroundColor: `${selectedPlanet.color}15`
                  }}
                >
                  {selectedPlanet.subject}
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400" />
                  {selectedPlanet.stats.difficulty}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                {selectedPlanet.name}
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {selectedPlanet.tagline}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 my-4 pt-3 border-t border-indigo-900/40">
                <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                  <span className="text-[10px] text-slate-400 block font-mono">Courses</span>
                  <span className="text-sm font-bold text-white">{selectedPlanet.stats.courses}</span>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                  <span className="text-[10px] text-slate-400 block font-mono">Scholars</span>
                  <span className="text-sm font-bold text-cyan-400">{selectedPlanet.stats.students.toLocaleString()}</span>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                  <span className="text-[10px] text-slate-400 block font-mono">Mastery</span>
                  <span className="text-sm font-bold text-emerald-400">{selectedPlanet.stats.mastery}</span>
                </div>
              </div>

              {/* Modules list */}
              <div className="mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-cyan-400" /> Core Syllabus Modules
                </span>
                <div className="flex flex-col gap-1">
                  {selectedPlanet.modules.slice(0, 3).map((mod, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-[11px] text-slate-300 bg-white/[0.02] px-2.5 py-1 rounded-lg border border-white/5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span className="truncate">{mod}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleLaunchCourse(selectedPlanet)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan transition-all transform active:scale-95"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Enter Orbit & Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
