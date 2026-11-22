import React, { useState, useMemo, Suspense } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Sector
} from 'recharts';
import {
  Brain,
  Sparkles,
  Zap,
  Award,
  Layers,
  RotateCw,
  Eye,
  CheckCircle2,
  PieChart as PieIcon,
  Box
} from 'lucide-react';
import { CanvasFallback } from './Loader';
import { NeuralSkills3DPieChart } from './NeuralSkills3DPieChart';

const SKILL_COLORS = [
  '#06b6d4', // Cyan
  '#a855f7', // Purple
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#3b82f6'  // Blue
];

// Interactive expanded active slice with center telemetry
const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;

  return (
    <g>
      {/* Center Dynamic Readout */}
      <text
        x={cx}
        y={cy - 12}
        textAnchor="middle"
        fill="#ffffff"
        className="font-bold text-xs sm:text-sm font-display tracking-wide"
      >
        {payload.name.length > 18 ? `${payload.name.substring(0, 16)}...` : payload.name}
      </text>
      <text
        x={cx}
        y={cy + 12}
        textAnchor="middle"
        fill="#22d3ee"
        className="font-mono text-xs sm:text-sm font-bold"
      >
        {value}% • {((percent || 0) * 100).toFixed(0)}% Share
      </text>
      <text
        x={cx}
        y={cy + 28}
        textAnchor="middle"
        fill="#94a3b8"
        className="text-[10px] font-mono uppercase"
      >
        {payload.category}
      </text>

      {/* Main Expanded Sector */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 4}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{
          filter: `drop-shadow(0px 0px 10px ${fill}99)`
        }}
      />

      {/* Outer Glowing Cyber Halo */}
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 14}
        outerRadius={outerRadius + 18}
        fill={fill}
        opacity={0.85}
      />
    </g>
  );
};

export const NeuralSkillsPieChart = ({ skills, onBoostSkill, onCalibrate }) => {
  const [viewMode, setViewMode] = useState('2d'); // '2d' (default) | '3d'
  const [activeIndex, setActiveIndex] = useState(0);

  const totalPoints = useMemo(() => {
    return skills.reduce((sum, s) => sum + s.level, 0);
  }, [skills]);

  // Format data for Recharts Pie
  const chartData = useMemo(() => {
    return skills.map((skill, index) => ({
      name: skill.name,
      value: skill.level,
      category: skill.category,
      color: SKILL_COLORS[index % SKILL_COLORS.length],
      percent: Math.round((skill.level / totalPoints) * 100)
    }));
  }, [skills, totalPoints]);

  const topSkill = useMemo(() => {
    return [...skills].sort((a, b) => b.level - a.level)[0];
  }, [skills]);

  // If user switches to 3D mode, render the 3D WebGL component
  if (viewMode === '3d') {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <button
            onClick={() => setViewMode('2d')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-all shadow-neon-cyan"
          >
            <PieIcon className="w-3.5 h-3.5" />
            <span>Switch to 2D Pie Chart</span>
          </button>
        </div>
        <NeuralSkills3DPieChart
          skills={skills}
          onBoostSkill={onBoostSkill}
          onCalibrate={onCalibrate}
        />
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border-indigo-500/30 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER WITH TOGGLES */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 font-semibold mb-1">
            <Brain className="w-4 h-4" />
            <span>Cognitive Capabilities</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Neural Skills <span className="text-gradient-cyan">2D Pie Chart</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Cognitive capacity distribution across 6 skill disciplines. Hover or click slices to inspect.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* 2D / 3D Mode Selector */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setViewMode('2d')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-neon-cyan transition-all"
            >
              <PieIcon className="w-3.5 h-3.5" />
              <span>2D Pie</span>
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition-all"
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D View</span>
            </button>
          </div>

          {/* Calibrate Matrix */}
          {onCalibrate && (
            <button
              onClick={onCalibrate}
              className="px-3.5 py-2 rounded-xl text-xs font-mono text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 hover:border-cyan-400 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Calibrate</span>
            </button>
          )}
        </div>
      </div>

      {/* MAIN 2D PIE CHART & SIDE ROSTER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* LEFT / CENTER: 2D PIE CHART CONTAINER (7 cols) */}
        <div className="lg:col-span-7 h-[360px] sm:h-[400px] w-full rounded-2xl bg-gradient-to-b from-[#060a22]/80 to-[#020514]/90 border border-indigo-500/20 relative overflow-hidden flex flex-col items-center justify-center p-2">
          
          {/* Cyber Grid Background */}
          <div className="absolute inset-0 cyber-grid-pattern opacity-25 pointer-events-none" />
          <div className="absolute w-72 h-72 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none" />

          {/* Floating Instructions Tag */}
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <div className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-white/10 text-[10px] font-mono text-slate-400 flex items-center gap-1.5 backdrop-blur-md">
              <Eye className="w-3 h-3 text-cyan-400" />
              <span>Hover slice to inspect</span>
            </div>
          </div>

          <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
            <span className="text-[10px] font-mono text-slate-400 uppercase bg-black/60 px-2.5 py-1 rounded-lg border border-white/10">
              Total Points: <strong className="text-white">{totalPoints}</strong>
            </span>
          </div>

          {/* Recharts 2D Responsive Pie */}
          <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={78}
                  outerRadius={118}
                  paddingAngle={4}
                  dataKey="value"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onClick={(_, index) => setActiveIndex(index)}
                  cursor="pointer"
                  animationDuration={800}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="#0a0f24"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT: SKILLS ROSTER & PRACTICE DRILLS (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          
          {/* Top Capability Highlight Card */}
          <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                  Top Cognitive Strength
                </span>
                <h5 className="text-xs font-bold text-white">{topSkill?.name}</h5>
              </div>
            </div>
            <span className="text-sm font-mono font-bold text-cyan-300">
              {topSkill?.level}%
            </span>
          </div>

          {/* Interactive Skill Cards matching the 2D Pie Slices */}
          <div className="flex flex-col gap-2 max-h-[320px] overflow-y-auto pr-1">
            {chartData.map((item, index) => {
              const active = activeIndex === index;
              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    active
                      ? 'bg-cyan-500/15 border-cyan-400 shadow-neon-cyan'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-3 h-3 rounded-full shrink-0 shadow-sm transition-transform duration-200"
                      style={{
                        backgroundColor: item.color,
                        transform: active ? 'scale(1.3)' : 'scale(1)'
                      }}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h5 className="text-xs font-semibold text-white truncate">
                          {item.name}
                        </h5>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0">
                          {item.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] font-mono text-slate-400">
                        <span>Proficiency: <strong className="text-cyan-300">{item.value}%</strong></span>
                        <span>•</span>
                        <span>Slice: <strong className="text-slate-200">{item.percent}%</strong></span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onBoostSkill) onBoostSkill(item.name);
                    }}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 transition-colors shrink-0 flex items-center gap-1 shadow-sm cursor-pointer"
                    title="Run practice drill (+5% boost & +50 XP)"
                  >
                    <Zap className="w-3 h-3" />
                    <span>+ Practice</span>
                  </button>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
};
