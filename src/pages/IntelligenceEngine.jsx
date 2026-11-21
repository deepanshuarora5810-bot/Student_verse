import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { useStudent } from '../context/StudentContext';
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Calendar,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  GitBranch,
  ShieldAlert,
  Zap,
  ArrowRight,
  BookOpen
} from 'lucide-react';

export const IntelligenceEngine = () => {
  const { knowledgeGraph, resolveWeakConcept, addToast } = useStudent();
  const [selectedNode, setSelectedNode] = useState(knowledgeGraph.nodes[0]);
  const [activeTab, setActiveTab] = useState('graph'); // graph, weak, retention, plan

  const handleGeneratePlan = () => {
    addToast('Spaced repetition schedule dynamically optimized via Ebbinghaus retention algorithm.', 'success', 'Revision Plan Synthesized');
  };

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 mb-1">
            <Brain className="w-3.5 h-3.5" />
            <span>NEURAL LEARNING INTELLIGENCE & COGNITIVE RETENTION ENGINE</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            Cognitive Diagnostics & Knowledge Graph
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Detect subtle knowledge gaps before exam deadlines. The intelligence engine maps cross-disciplinary concept dependencies, tracks Ebbinghaus memory decay, and generates optimized revision schedules.
          </p>
        </div>

        {/* Action Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl glass-card border-indigo-500/20 bg-[#070b22]/70">
          <button
            onClick={() => setActiveTab('graph')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'graph'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-neon-cyan'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Knowledge Graph
          </button>
          <button
            onClick={() => setActiveTab('weak')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'weak'
                ? 'bg-gradient-to-r from-rose-500 to-amber-600 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Weak Concepts ({knowledgeGraph.weakConcepts.length})
          </button>
          <button
            onClick={() => setActiveTab('retention')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'retention'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Retention Decay
          </button>
        </div>
      </div>

      {/* Main Content Viewports */}
      {activeTab === 'graph' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[580px]">
          {/* Visual Knowledge Graph Node Matrix (8 cols) */}
          <div className="lg:col-span-8 p-6 rounded-2xl glass-card border-indigo-500/20 bg-[#060a1f] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Cognitive Concept Node Matrix
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Mastered (&ge;80%)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400" /> In Progress
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" /> Needs Revision
                  </span>
                </div>
              </div>

              {/* Node Matrix Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {knowledgeGraph.nodes.map((node) => {
                  const isSelected = selectedNode?.id === node.id;
                  const isMastered = node.mastery >= 80;
                  const isWeak = node.mastery < 70;

                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                        isSelected
                          ? 'bg-cyan-500/15 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                          : 'bg-white/[0.02] border-white/5 hover:border-indigo-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase text-slate-400">
                          {node.category}
                        </span>
                        <span
                          className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                            isMastered
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : isWeak
                              ? 'bg-rose-500/20 text-rose-300'
                              : 'bg-purple-500/20 text-purple-300'
                          }`}
                        >
                          {node.mastery}%
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-white line-clamp-2">{node.name}</h4>

                      {/* Mastery Bar */}
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isMastered
                              ? 'bg-emerald-400'
                              : isWeak
                              ? 'bg-rose-400'
                              : 'bg-purple-400'
                          }`}
                          style={{ width: `${node.mastery}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Graph Stats Bar */}
            <div className="mt-6 pt-4 border-t border-indigo-900/40 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
              <span>Connected Nodes: {knowledgeGraph.nodes.length}</span>
              <span>Dependency Edges: {knowledgeGraph.links.length}</span>
              <span className="text-cyan-400 font-mono font-semibold">
                Average Cross-Disciplinary Mastery: 82.4%
              </span>
            </div>
          </div>

          {/* Node Inspector Sidebar (4 cols) */}
          <div className="lg:col-span-4 p-5 rounded-2xl glass-card border-indigo-500/20 bg-[#060a1f] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-cyan-400 block mb-1">
                INSPECTED COGNITIVE NODE
              </span>
              <h3 className="text-lg font-bold text-white">{selectedNode.name}</h3>
              <p className="text-xs text-slate-400 mt-1">
                Domain Category: <strong className="text-slate-200">{selectedNode.category}</strong>
              </p>

              {/* Status metric badges */}
              <div className="grid grid-cols-2 gap-2 my-4">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] font-mono text-slate-400 block">MASTERY LEVEL</span>
                  <span className="text-lg font-bold text-white">{selectedNode.mastery}%</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] font-mono text-slate-400 block">NEXT REVIEW</span>
                  <span className="text-lg font-bold text-cyan-400">{selectedNode.reviewDays} days</span>
                </div>
              </div>

              {/* Retention status description */}
              <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-slate-300 leading-relaxed mb-4">
                {selectedNode.mastery >= 80
                  ? 'Strong synaptic stability. Concept is securely stored in long-term cognitive memory. Regular spaced repetition will maintain 90%+ retention.'
                  : 'Synaptic decay detected. Concept shows elevated response latency and error probability under timed conditions.'}
              </div>
            </div>

            <button
              onClick={() => resolveWeakConcept(selectedNode.id)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan transition-all transform active:scale-95"
            >
              <Zap className="w-4 h-4" />
              <span>Launch Focused 5-Min Drill</span>
            </button>
          </div>
        </div>
      )}

      {/* Weak Concepts View */}
      {activeTab === 'weak' && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {knowledgeGraph.weakConcepts.map((wc) => (
              <div
                key={wc.id}
                className="p-5 rounded-2xl glass-card border-rose-500/30 bg-[#120710]/90 flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      {wc.urgency} Urgency
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {wc.repeatedMistakes} Detected Errors
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">{wc.name}</h3>
                  <p className="text-xs text-rose-300/80 mb-3 font-mono">
                    Last recurring mistake: "{wc.lastMistake}"
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-cyan-400">Prescription:</strong> {wc.recommendedAction}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-rose-950/40">
                  <span className="text-xs font-mono font-bold text-rose-400">
                    Mastery: {wc.mastery}%
                  </span>
                  <button
                    onClick={() => resolveWeakConcept(wc.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-rose-500 to-amber-600 hover:from-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.4)] transition-all transform active:scale-95"
                  >
                    <span>Practice & Resolve</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Retention Decay Curve View */}
      {activeTab === 'retention' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 p-6 rounded-2xl glass-card border-indigo-500/20 bg-[#060a1f] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Ebbinghaus Memory Retention Decay Curve
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real student retention rate compared to the target 85% long-term recall benchmark.
                </p>
              </div>
              <button
                onClick={handleGeneratePlan}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-600 shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Re-synthesize Plan</span>
              </button>
            </div>

            <div className="h-72 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={knowledgeGraph.retentionCurve}>
                  <defs>
                    <linearGradient id="retentionGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} domain={[70, 105]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#070b22',
                      borderColor: '#4338ca',
                      borderRadius: '0.75rem',
                      fontSize: '12px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="retention"
                    stroke="#a855f7"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#retentionGrad)"
                    name="Retention %"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 7-Day Spaced Repetition Schedule (4 cols) */}
          <div className="lg:col-span-4 p-5 rounded-2xl glass-card border-indigo-500/20 bg-[#060a1f] flex flex-col gap-3">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wide">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>Synthesized Spaced Repetition Queue</span>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
                <div>
                  <h5 className="font-bold text-white">Shor's Factorization</h5>
                  <span className="text-[10px] text-rose-400 font-mono">Today • High Priority</span>
                </div>
                <span className="text-xs text-slate-400">15 min</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
                <div>
                  <h5 className="font-bold text-white">Red-Black Tree Rotations</h5>
                  <span className="text-[10px] text-amber-400 font-mono">Tomorrow • Medium Priority</span>
                </div>
                <span className="text-xs text-slate-400">20 min</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
                <div>
                  <h5 className="font-bold text-white">LoRA Parameter Tuning</h5>
                  <span className="text-[10px] text-purple-400 font-mono">In 3 Days • Low Priority</span>
                </div>
                <span className="text-xs text-slate-400">25 min</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
