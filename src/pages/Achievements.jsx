import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { CyberBadge3D } from '../three/CyberBadge3D';
import {
  Trophy,
  Award,
  Zap,
  Flame,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Gift
} from 'lucide-react';

export const Achievements = () => {
  const { achievements, student, stats, claimAchievement } = useStudent();
  const [selectedRarity, setSelectedRarity] = useState('All');
  const [activeBadge, setActiveBadge] = useState(achievements[0]);

  const rarities = ['All', 'Legendary', 'Epic', 'Rare'];

  const filteredAchievements = achievements.filter((ach) => {
    if (selectedRarity === 'All') return true;
    return ach.rarity === selectedRarity;
  });

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      
      {/* HEADER SECTION */}
      <div className="relative glass-card rounded-3xl p-6 sm:p-8 border-indigo-500/30 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-semibold mb-1">
              <Trophy className="w-4 h-4" />
              <span>Decentralized Recognition</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              Scholastic <span className="text-gradient-gold">Achievements</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Earn cryptographic XP, level up your academic avatar, and collect inspectable 3D orbital badges.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="block text-xl font-bold text-amber-400 font-display">
                {unlockedCount} / {achievements.length}
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                Badges Unlocked
              </span>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="block text-xl font-bold text-purple-400 font-display">
                Level {student.level}
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                Scholar Rank
              </span>
            </div>
          </div>
        </div>

        {/* Level Progression */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Next Milestone: <strong>Level {student.level + 1}</strong></span>
            </span>
            <span className="text-purple-300 font-bold">
              {student.xp} / {student.xpToNextLevel} XP
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden border border-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-purple-500 to-cyan-400 transition-all duration-700"
              style={{ width: `${Math.min(100, (student.xp / student.xpToNextLevel) * 100)}%` }}
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-1">
          {rarities.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRarity(r)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all shrink-0 ${
                selectedRarity === r
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-neon-amber font-bold'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {r} Badges
            </button>
          ))}
        </div>

      </div>

      {/* 3D INTERACTIVE BADGE SHOWCASE */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border-indigo-500/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: 3D Canvas Trophy */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950/40 border border-white/5 relative">
          <div className="absolute top-3 left-3 text-[10px] font-mono text-cyan-400 tracking-widest uppercase">
            3D SPATIAL VIEWER
          </div>
          <CyberBadge3D rarity={activeBadge.rarity} height="240px" />
          <p className="text-[10px] font-mono text-slate-500 mt-2">
            Click & drag to rotate badge
          </p>
        </div>

        {/* Right Column: Selected Badge Details */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                  activeBadge.rarity === 'Legendary'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : activeBadge.rarity === 'Epic'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                }`}
              >
                {activeBadge.rarity} Badge
              </span>
              <span className="text-xs font-mono text-slate-400">
                {activeBadge.category}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-3">
              {activeBadge.title}
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {activeBadge.description}
            </p>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-500 block uppercase text-[10px]">Reward</span>
                <span className="text-purple-300 font-bold">+{activeBadge.xpReward} XP</span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase text-[10px]">Progress</span>
                <span className="text-cyan-400 font-bold">{activeBadge.progress}</span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase text-[10px]">Status</span>
                <span className={activeBadge.unlocked ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                  {activeBadge.unlocked ? 'Unlocked' : 'In Progress'}
                </span>
              </div>
            </div>

            {!activeBadge.unlocked && (
              <button
                onClick={() => claimAchievement(activeBadge.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 shadow-neon-amber transition-all transform active:scale-95"
              >
                <Gift className="w-4 h-4" />
                <span>Claim Milestone (+{activeBadge.xpReward} XP)</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* ALL ACHIEVEMENTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAchievements.map((ach) => {
          const isSelected = activeBadge.id === ach.id;

          return (
            <div
              key={ach.id}
              onClick={() => setActiveBadge(ach)}
              className={`glass-card rounded-2xl p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'border-cyan-400/60 bg-cyan-950/20 shadow-neon-cyan'
                  : ach.unlocked
                  ? 'border-indigo-500/20 hover:border-cyan-500/40'
                  : 'border-white/5 opacity-70 hover:opacity-100'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                      ach.rarity === 'Legendary'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : ach.rarity === 'Epic'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    }`}
                  >
                    {ach.rarity}
                  </span>

                  <span className="text-xs font-mono font-bold text-purple-300">
                    +{ach.xpReward} XP
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      ach.unlocked
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        : 'bg-slate-800 text-slate-500 border border-slate-700'
                    }`}
                  >
                    {ach.unlocked ? <Trophy className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                      {ach.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">
                      {ach.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">{ach.progress}</span>
                {ach.unlocked ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Unlocked</span>
                  </span>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      claimAchievement(ach.id);
                    }}
                    className="text-amber-400 hover:text-amber-300 underline font-semibold"
                  >
                    Claim Badge
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
