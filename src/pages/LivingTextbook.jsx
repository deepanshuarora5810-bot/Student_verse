import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BrainModel3D,
  SolarSystemModel3D,
  MoleculeModel3D,
  RedBlackTreeModel3D
} from '../components/textbook/TextbookModels3D';
import { LIVING_TEXTBOOK_TOPICS } from '../data/demoData';
import {
  BookOpen,
  Sliders,
  Sparkles,
  Info,
  Maximize2,
  Atom,
  Globe,
  Brain,
  GitBranch,
  Layers,
  ChevronRight
} from 'lucide-react';

export const LivingTextbook = () => {
  const [selectedTopicId, setSelectedTopicId] = useState(LIVING_TEXTBOOK_TOPICS[0].id);
  const topic = LIVING_TEXTBOOK_TOPICS.find((t) => t.id === selectedTopicId) || LIVING_TEXTBOOK_TOPICS[0];

  const [activeParams, setActiveParams] = useState({
    signalRate: 45,
    myelinGlow: 1.0,
    gravityConstant: 1.0,
    orbitalSpeed: 1.2,
    thermalEnergy: 298,
    bondStiffness: 1.0,
    nodeCount: 7,
    rotationSpeed: 1.5
  });

  const [highlightedPart, setHighlightedPart] = useState(null);

  const handleParamChange = (id, val) => {
    setActiveParams((prev) => ({ ...prev, [id]: parseFloat(val) }));
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Brain':
        return <Brain className="w-4 h-4" />;
      case 'Globe':
        return <Globe className="w-4 h-4" />;
      case 'Atom':
        return <Atom className="w-4 h-4" />;
      default:
        return <GitBranch className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>INTERACTIVE DIGITAL LABORATORY // LIVING TEXTBOOK</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            Living 3D Scientific Textbook
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Static 2D textbook diagrams are obsolete. Manipulate 3D physical models, adjust real-time thermodynamic/gravitational parameters, and observe scientific phenomena in dynamic simulation.
          </p>
        </div>

        {/* Topic Switcher */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl glass-card border-indigo-500/20 bg-[#070b22]/70">
          {LIVING_TEXTBOOK_TOPICS.map((t) => {
            const isSelected = t.id === selectedTopicId;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setSelectedTopicId(t.id);
                  setHighlightedPart(null);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {getIcon(t.icon)}
                <span>{t.title.split(':')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Simulation Viewport & Controls Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[580px]">
        {/* Left Column: 3D Scientific Model Canvas (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex-1 min-h-[480px] rounded-2xl glass-card border-emerald-500/30 bg-[#030612] relative overflow-hidden flex flex-col">
            <div className="absolute top-4 left-5 z-10 pointer-events-none">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block">
                {topic.category}
              </span>
              <h2 className="text-lg font-bold text-white">{topic.title}</h2>
            </div>

            {/* Canvas */}
            <div className="w-full h-full flex-1">
              <Canvas camera={{ position: [0, 0, 7], fov: 45 }} className="w-full h-full cursor-grab active:cursor-grabbing">
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#38bdf8" />
                <pointLight position={[-10, -10, -5]} intensity={1.0} color="#10b981" />
                <Stars radius={60} depth={40} count={1500} factor={3} fade />

                {topic.id === 'anatomy-brain' && (
                  <BrainModel3D params={activeParams} onSelectPart={setHighlightedPart} />
                )}
                {topic.id === 'solar-system' && <SolarSystemModel3D params={activeParams} />}
                {topic.id === 'molecular-chemistry' && <MoleculeModel3D params={activeParams} />}
                {topic.id === 'data-structures' && <RedBlackTreeModel3D params={activeParams} />}

                <OrbitControls enablePan={true} enableZoom={true} maxDistance={15} minDistance={3} />
              </Canvas>
            </div>

            {/* Instruction tooltip */}
            <div className="absolute bottom-3 left-4 z-10 text-[10px] font-mono text-slate-500 pointer-events-none">
              Click & drag to rotate in 3D • Scroll to zoom • Select nodes
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Parameter Sliders & Glossary (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Parameter Sliders Box */}
          <div className="p-5 rounded-2xl glass-card border-indigo-500/20 bg-[#060a1f] flex flex-col gap-4">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wide">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>Physics & Simulation Variables</span>
            </div>

            <div className="flex flex-col gap-3.5">
              {topic.interactiveParams.map((param) => (
                <div key={param.id} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{param.label}</span>
                    <span className="text-emerald-400 font-mono font-bold">
                      {activeParams[param.id] !== undefined ? activeParams[param.id] : param.default}{' '}
                      {param.unit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={param.min}
                    max={param.max}
                    step={(param.max - param.min) / 40}
                    value={activeParams[param.id] !== undefined ? activeParams[param.id] : param.default}
                    onChange={(e) => handleParamChange(param.id, e.target.value)}
                    className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Anatomical / Mathematical Elements Glossary */}
          <div className="flex-1 p-5 rounded-2xl glass-card border-indigo-500/20 bg-[#060a1f] flex flex-col">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wide mb-3">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Anatomical & Scientific Structures</span>
            </div>

            <div className="flex flex-col gap-2 overflow-y-auto max-h-72 pr-1">
              {topic.features.map((feat, idx) => {
                const isSelected = highlightedPart === feat.name;
                return (
                  <div
                    key={idx}
                    onClick={() => setHighlightedPart(feat.name)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                        : 'bg-white/[0.02] border-white/5 hover:border-indigo-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">{feat.name}</h4>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{feat.function}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
