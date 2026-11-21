import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IslandBiomes3D } from '../components/world/IslandBiomes3D';
import { useStudent } from '../context/StudentContext';
import {
  Compass,
  Trophy,
  Sparkles,
  Lock,
  Unlock,
  CheckCircle2,
  Flame,
  Sun,
  Moon,
  Zap,
  Target,
  ArrowRight
} from 'lucide-react';

export const LearningWorld = () => {
  const { student, biomes, completeMission } = useStudent();
  const [selectedBiome, setSelectedBiome] = useState(biomes[0]);
  const [skyboxTheme, setSkyboxTheme] = useState('cyberpunk'); // cyberpunk, deepvoid

  return (
    <div className="relative w-full h-[calc(100vh-5rem)] overflow-hidden flex flex-col bg-[#030612]">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <IslandBiomes3D
          biomes={biomes}
          selectedBiome={selectedBiome}
          onSelectBiome={(b) => setSelectedBiome(b)}
          skyboxTheme={skyboxTheme}
        />
      </div>

      {/* Top Floating Header HUD */}
      <div className="relative z-10 p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pointer-events-none">
        <div className="pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 border border-amber-500/30 text-amber-300 mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>PERSONAL 3D SPATIAL ECOSYSTEM // STUDENT DOMAIN</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            {student.name}'s Learning Realm
          </h1>
          <p className="text-xs text-slate-400 mt-0.5 max-w-lg">
            Your real academic progress shapes this 3D archipelago. Unlock new floating biome islands by completing courses, leveling up, and finishing daily missions.
          </p>
        </div>

        {/* Top Right: Skybox & Progression Stats */}
        <div className="pointer-events-auto flex items-center gap-3">
          {/* Atmosphere Toggle */}
          <div className="flex items-center gap-1 p-1 rounded-xl glass-card border-indigo-500/20 bg-[#070b22]/80 backdrop-blur-md">
            <button
              onClick={() => setSkyboxTheme('cyberpunk')}
              className={`p-2 rounded-lg text-xs transition-all ${
                skyboxTheme === 'cyberpunk' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-white'
              }`}
              title="Cyberpunk Sunset Atmosphere"
            >
              <Sun className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSkyboxTheme('deepvoid')}
              className={`p-2 rounded-lg text-xs transition-all ${
                skyboxTheme === 'deepvoid' ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:text-white'
              }`}
              title="Deep Void Atmosphere"
            >
              <Moon className="w-4 h-4" />
            </button>
          </div>

          {/* Level Pill */}
          <div className="px-4 py-2 rounded-xl glass-card border-cyan-500/30 bg-[#070b22]/80 flex items-center gap-2.5 backdrop-blur-md">
            <Flame className="w-4 h-4 text-amber-400" />
            <div className="text-left">
              <span className="text-[10px] text-slate-400 font-mono block">SCHOLAR TIER</span>
              <span className="text-xs font-bold text-white">LVL {student.level} • {student.streak}-Day Streak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Bar: Selected Biome HUD & Missions Drawer */}
      <div className="relative z-10 mt-auto p-4 md:p-6 flex flex-col lg:flex-row justify-between items-end gap-6 pointer-events-none">
        {/* Biome Carousel Switcher (Bottom Left) */}
        <div className="pointer-events-auto flex items-center gap-2 overflow-x-auto max-w-full pb-2">
          {biomes.map((b) => {
            const isSelected = selectedBiome?.id === b.id;
            return (
              <button
                key={b.id}
                onClick={() => setSelectedBiome(b)}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all backdrop-blur-md border ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-white shadow-[0_0_15px_-3px_rgba(245,158,11,0.4)]'
                    : 'bg-[#080d26]/80 border-indigo-900/40 text-slate-400 hover:text-slate-200'
                }`}
              >
                {b.unlocked ? (
                  <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-rose-400" />
                )}
                <span className="font-semibold">{b.name.split(' ')[0]}</span>
                <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">LVL {b.requiredLevel}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Biome & Daily Missions Card (Bottom Right) */}
        <AnimatePresence mode="wait">
          {selectedBiome && (
            <motion.div
              key={selectedBiome.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="pointer-events-auto w-full lg:w-[480px] rounded-2xl glass-card border-indigo-500/30 p-5 bg-[#070b22]/90 backdrop-blur-xl shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border"
                  style={{
                    color: selectedBiome.color,
                    borderColor: `${selectedBiome.color}40`,
                    backgroundColor: `${selectedBiome.color}15`
                  }}
                >
                  {selectedBiome.subject}
                </span>
                <span className="text-xs font-mono font-bold flex items-center gap-1.5">
                  {selectedBiome.unlocked ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Unlock className="w-3.5 h-3.5" /> Biome Unlocked
                    </span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" /> Requires Level {selectedBiome.requiredLevel}
                    </span>
                  )}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight">{selectedBiome.name}</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{selectedBiome.lore}</p>

              {/* Daily Missions Box */}
              <div className="mt-4 pt-3 border-t border-indigo-900/40">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-amber-400" /> Active Biome Quests & Daily Missions
                </span>

                <div className="flex flex-col gap-2">
                  {selectedBiome.dailyMissions?.map((mission) => (
                    <div
                      key={mission.id}
                      className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {mission.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                        )}
                        <span className={`truncate ${mission.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                          {mission.title}
                        </span>
                      </div>

                      {mission.completed ? (
                        <span className="text-[10px] font-mono text-emerald-400 font-bold shrink-0">
                          COMPLETED
                        </span>
                      ) : (
                        <button
                          onClick={() => completeMission(selectedBiome.id, mission.id)}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-neon-amber transition-all transform active:scale-95 shrink-0"
                        >
                          Claim +{mission.xp} XP
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
