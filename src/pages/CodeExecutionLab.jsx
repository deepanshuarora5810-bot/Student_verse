import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MemoryVisualizer3D } from '../components/codelab/MemoryVisualizer3D';
import { CODE_LAB_PRESETS } from '../data/demoData';
import {
  Code,
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Zap,
  Cpu,
  Layers,
  Database,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Terminal,
  Activity
} from 'lucide-react';

export const CodeExecutionLab = () => {
  const [selectedPresetId, setSelectedPresetId] = useState(CODE_LAB_PRESETS[0].id);
  const preset = CODE_LAB_PRESETS.find((p) => p.id === selectedPresetId) || CODE_LAB_PRESETS[0];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1500); // ms per step

  const timerRef = useRef(null);

  const currentStep = preset.steps[currentStepIndex] || preset.steps[0];
  const totalSteps = preset.steps.length;

  // Auto-play loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= totalSteps - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, totalSteps, playbackSpeed]);

  const handleNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const codeLines = preset.code.split('\n');

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto w-full flex flex-col gap-6">
      {/* Header & Preset Switcher */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 mb-1">
            <Cpu className="w-3.5 h-3.5" />
            <span>INTERACTIVE COMPUTATIONAL LABORATORY</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            3D Code Execution & Memory Visualizer
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Step through compiled code line-by-line while watching physical 3D Stack frames allocate, pointers resolve, and Heap memory blocks instantiate in real-time.
          </p>
        </div>

        {/* Preset Selector Buttons */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl glass-card border-indigo-500/20 bg-[#070b22]/70">
          {CODE_LAB_PRESETS.map((p) => {
            const isSelected = p.id === selectedPresetId;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPresetId(p.id);
                  handleReset();
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-neon-cyan'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>{p.name.split(':')[0]}</span>
                <span className="text-[10px] font-mono uppercase opacity-70">[{p.language}]</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Execution Arena: Split between Code & 3D Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[580px]">
        {/* Left Column: Code Editor & Execution Controls (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Controls Bar */}
          <div className="p-3.5 rounded-2xl glass-card border-indigo-500/20 bg-[#060a1f]/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all transform active:scale-95 ${
                  isPlaying
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-neon-cyan'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Pause' : 'Run Auto'}</span>
              </button>

              <button
                onClick={handlePrevStep}
                disabled={currentStepIndex === 0}
                className="p-2 rounded-xl border border-indigo-900/40 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                title="Step Backward"
              >
                <RotateCcw className="w-4 h-4 scale-x-[-1]" />
              </button>

              <button
                onClick={handleNextStep}
                disabled={currentStepIndex === totalSteps - 1}
                className="flex items-center gap-1 px-3 py-2 rounded-xl border border-indigo-900/40 bg-white/5 text-slate-200 hover:text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium transition-all"
                title="Step Forward"
              >
                <span>Step</span>
                <SkipForward className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleReset}
                className="p-2 rounded-xl border border-indigo-900/40 bg-white/5 text-slate-400 hover:text-rose-300 hover:bg-white/10 transition-all"
                title="Reset Execution"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Step Progress Pill */}
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 block">STEP</span>
              <span className="text-xs font-mono font-bold text-cyan-400">
                {currentStepIndex + 1} / {totalSteps}
              </span>
            </div>
          </div>

          {/* Code Viewer with Active Line Highlight */}
          <div className="flex-1 rounded-2xl glass-card border-indigo-500/20 bg-[#050819] overflow-hidden flex flex-col font-mono text-xs">
            {/* Editor Top Bar */}
            <div className="px-4 py-2.5 bg-[#030612] border-b border-indigo-900/30 flex items-center justify-between text-slate-400 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-slate-300 ml-2 font-semibold">
                  source.{preset.language === 'python' ? 'py' : 'java'}
                </span>
              </div>
              <span className="text-[10px] text-cyan-400 uppercase font-mono">
                {preset.language} runtime v3
              </span>
            </div>

            {/* Code Lines */}
            <div className="p-4 overflow-x-auto flex-1 flex flex-col gap-1 leading-relaxed">
              {codeLines.map((line, idx) => {
                const lineNum = idx + 1;
                const isCurrentLine = currentStep.line === lineNum;
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 px-2 py-1 rounded transition-colors ${
                      isCurrentLine
                        ? 'bg-cyan-500/20 border-l-2 border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                        : 'text-slate-300 hover:bg-white/[0.02]'
                    }`}
                  >
                    <span className="w-6 text-right select-none text-slate-600 text-[10px] font-mono">
                      {lineNum}
                    </span>
                    <pre className="font-mono text-xs overflow-visible">{line || ' '}</pre>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Step Plain-Language Explanation */}
          <div className="p-4 rounded-2xl glass-card border-cyan-500/30 bg-[#080d26]/90 relative overflow-hidden">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold font-mono mb-1">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>ACTION EXPLANATION</span>
            </div>
            <p className="text-xs text-white font-medium mb-1">{currentStep.action}</p>
            <p className="text-xs text-slate-300 leading-relaxed">{currentStep.explanation}</p>
          </div>
        </div>

        {/* Right Column: 3D Memory Canvas + Variable & Metric HUD (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* 3D Visualizer Viewport */}
          <div className="flex-1 min-h-[420px] rounded-2xl glass-card border-indigo-500/30 bg-[#030612] relative overflow-hidden flex flex-col">
            <div className="absolute top-3 left-4 z-10 flex items-center gap-2 text-[10px] font-mono text-slate-400 pointer-events-none">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>PHYSICAL MEMORY VECTOR SPACE (3D)</span>
            </div>

            <div className="w-full h-full flex-1">
              <MemoryVisualizer3D currentStep={currentStep} />
            </div>
          </div>

          {/* Memory Metrics & Variable Inspector Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl glass-card border-indigo-500/20 bg-[#060a1f] flex flex-col">
              <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-cyan-400" /> Stack Depth
              </span>
              <span className="text-base font-bold text-white mt-1">
                {currentStep.stack?.length || 0} Frames Active
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5">LIFO Execution</span>
            </div>

            <div className="p-3.5 rounded-2xl glass-card border-indigo-500/20 bg-[#060a1f] flex flex-col">
              <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
                <Database className="w-3 h-3 text-purple-400" /> Heap Allocations
              </span>
              <span className="text-base font-bold text-white mt-1">
                {currentStep.heap?.length || 0} Object Nodes
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5">Garbage Collected</span>
            </div>

            <div className="p-3.5 rounded-2xl glass-card border-indigo-500/20 bg-[#060a1f] flex flex-col">
              <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-emerald-400" /> Memory Bandwidth
              </span>
              <span className="text-base font-bold text-emerald-400 mt-1">
                {currentStep.memoryUsage || '48 KB'}
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5">Cache Optimized</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
