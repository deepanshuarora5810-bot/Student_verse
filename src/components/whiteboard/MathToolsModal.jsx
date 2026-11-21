import React, { useState } from 'react';
import { Modal } from '../Modal';
import {
  Calculator,
  Sigma,
  Grid,
  Box,
  Compass,
  Sparkles,
  Plus,
  Equal,
  Delete,
  Check
} from 'lucide-react';

export const MathToolsModal = ({ isOpen, onClose, onInsertElement }) => {
  const [activeTab, setActiveTab] = useState('formulas'); // 'formulas', 'calculator', 'axes', 'shapes'

  // Calculator State
  const [calcInput, setCalcInput] = useState('');
  const [calcResult, setCalcResult] = useState('');

  const formulaTemplates = [
    {
      category: 'Quantum Physics',
      title: 'Quantum State Superposition',
      latex: '|ψ⟩ = α|0⟩ + β|1⟩  (|α|² + |β|² = 1)',
      color: '#06b6d4'
    },
    {
      category: 'Quantum Computing',
      title: 'Hadamard Quantum Gate Matrix',
      latex: 'H = 1/√2 · [[1, 1], [1, -1]]',
      color: '#a855f7'
    },
    {
      category: 'Calculus',
      title: 'Definite Integral & Fundamental Theorem',
      latex: '∫[a to b] f(x) dx = F(b) - F(a)',
      color: '#38bdf8'
    },
    {
      category: 'Physics',
      title: 'Time-Dependent Schrödinger Equation',
      latex: 'iℏ ∂/∂t |Ψ(t)⟩ = Ĥ |Ψ(t)⟩',
      color: '#ec4899'
    },
    {
      category: 'Complex Analysis',
      title: "Euler's Beautiful Identity",
      latex: 'e^(iπ) + 1 = 0',
      color: '#10b981'
    },
    {
      category: 'Algebra',
      title: 'Quadratic Equation Solution',
      latex: 'x = (-b ± √(b² - 4ac)) / (2a)',
      color: '#f59e0b'
    },
    {
      category: 'Linear Algebra',
      title: 'Eigenvalue Characteristic Equation',
      latex: 'det(A - λI) = 0   (A·v = λ·v)',
      color: '#c084fc'
    },
    {
      category: 'Statistics & AI',
      title: 'Softmax Activation Probability',
      latex: 'P(y=i | x) = exp(z_i) / Σ exp(z_j)',
      color: '#06b6d4'
    }
  ];

  // Calculator logic
  const handleCalcBtn = (val) => {
    if (val === 'C') {
      setCalcInput('');
      setCalcResult('');
    } else if (val === 'DEL') {
      setCalcInput((prev) => prev.slice(0, -1));
    } else if (val === '=') {
      try {
        // Safe evaluation for basic math expressions
        const sanitized = calcInput
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/π/g, 'Math.PI')
          .replace(/sin\(/g, 'Math.sin(')
          .replace(/cos\(/g, 'Math.cos(')
          .replace(/tan\(/g, 'Math.tan(')
          .replace(/sqrt\(/g, 'Math.sqrt(');
        // eslint-disable-next-line no-eval
        const res = Function(`"use strict"; return (${sanitized})`)();
        const rounded = Number(res.toFixed(6)).toString();
        setCalcResult(rounded);
      } catch (err) {
        setCalcResult('Error');
      }
    } else {
      setCalcInput((prev) => prev + val);
    }
  };

  const handleInsertFormula = (item) => {
    onInsertElement({
      type: 'text',
      text: item.latex,
      color: item.color,
      fontSize: 18,
      fontFamily: 'JetBrains Mono'
    });
    onClose();
  };

  const handleStampCalculatorResult = () => {
    if (!calcResult && !calcInput) return;
    const textToStamp = calcResult ? `${calcInput} = ${calcResult}` : calcInput;
    onInsertElement({
      type: 'text',
      text: textToStamp,
      color: '#06b6d4',
      fontSize: 20,
      fontFamily: 'JetBrains Mono'
    });
    onClose();
  };

  const handleInsertAxes = () => {
    // Stamps Cartesian coordinate axes on the board
    onInsertElement({
      type: 'coordinate_axes',
      centerX: 450,
      centerY: 350,
      size: 260
    });
    onClose();
  };

  const handleInsertShapeTemplate = (shapeType) => {
    onInsertElement({
      type: 'shape_template',
      template: shapeType,
      startX: 300,
      startY: 200,
      size: 180
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Classroom Mathematical & Geometry Toolkit"
      subtitle="Insert equations, plot coordinate axes, or compute values directly on the whiteboard"
      maxWidth="max-w-2xl"
    >
      {/* Navigation tabs */}
      <div className="flex items-center gap-1.5 border-b border-indigo-900/40 pb-3 mb-5">
        <button
          onClick={() => setActiveTab('formulas')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
            activeTab === 'formulas'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sigma className="w-3.5 h-3.5" />
          <span>Formula Vault</span>
        </button>

        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
            activeTab === 'calculator'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Scientific Calculator</span>
        </button>

        <button
          onClick={() => setActiveTab('axes')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
            activeTab === 'axes'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          <span>Coordinate Grid</span>
        </button>

        <button
          onClick={() => setActiveTab('shapes')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
            activeTab === 'shapes'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Box className="w-3.5 h-3.5" />
          <span>Geometric Templates</span>
        </button>
      </div>

      {/* TAB 1: FORMULAS */}
      {activeTab === 'formulas' && (
        <div className="flex flex-col gap-3 max-h-[380px] overflow-y-auto pr-1">
          {formulaTemplates.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/40 transition-all flex items-center justify-between gap-4 group"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400">
                    {item.category}
                  </span>
                  <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </span>
                </div>
                <code className="text-xs font-mono text-cyan-300 bg-slate-900/80 px-2.5 py-1 rounded-lg block border border-slate-800">
                  {item.latex}
                </code>
              </div>

              <button
                onClick={() => handleInsertFormula(item)}
                className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-all flex items-center gap-1.5 shadow-neon-cyan"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Stamp</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: CALCULATOR */}
      {activeTab === 'calculator' && (
        <div className="flex flex-col items-center">
          <div className="w-full max-w-sm rounded-2xl bg-slate-950 p-4 border border-slate-800 shadow-2xl">
            {/* Display screen */}
            <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 mb-4 text-right">
              <div className="text-xs font-mono text-slate-400 h-5 overflow-hidden">
                {calcInput || '0'}
              </div>
              <div className="text-xl font-mono font-bold text-cyan-400 h-7 overflow-hidden">
                {calcResult || '= 0'}
              </div>
            </div>

            {/* Buttons grid */}
            <div className="grid grid-cols-4 gap-2 text-xs font-mono">
              {['C', 'DEL', '(', ')'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => handleCalcBtn(btn)}
                  className="py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 font-bold transition-all"
                >
                  {btn}
                </button>
              ))}

              {['sin(', 'cos(', 'tan(', 'sqrt('].map((btn) => (
                <button
                  key={btn}
                  onClick={() => handleCalcBtn(btn)}
                  className="py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-bold transition-all"
                >
                  {btn.replace('(', '')}
                </button>
              ))}

              {['7', '8', '9', '÷'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => handleCalcBtn(btn)}
                  className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all"
                >
                  {btn}
                </button>
              ))}

              {['4', '5', '6', '×'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => handleCalcBtn(btn)}
                  className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all"
                >
                  {btn}
                </button>
              ))}

              {['1', '2', '3', '-'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => handleCalcBtn(btn)}
                  className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all"
                >
                  {btn}
                </button>
              ))}

              {['0', '.', '=', '+'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => handleCalcBtn(btn)}
                  className={`py-2.5 rounded-xl font-bold transition-all ${
                    btn === '='
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-neon-cyan'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  {btn}
                </button>
              ))}
            </div>

            <button
              onClick={handleStampCalculatorResult}
              className="w-full mt-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all shadow-neon-cyan flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Stamp Calculation on Whiteboard</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: COORDINATE GRID */}
      {activeTab === 'axes' && (
        <div className="flex flex-col gap-4 text-center p-4">
          <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
            <Grid className="w-10 h-10" />
          </div>
          <h3 className="text-base font-bold text-white font-display">
            Cartesian Coordinate Grid Generator
          </h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            Quickly render calibrated X and Y coordinate axes with origin $(0, 0)$, directional arrowheads, and scale tick markings on the whiteboard.
          </p>

          <button
            onClick={handleInsertAxes}
            className="w-fit mx-auto px-6 py-2.5 rounded-xl text-xs font-bold text-black bg-emerald-400 hover:bg-emerald-300 transition-all flex items-center gap-2 shadow-neon-cyan"
          >
            <Plus className="w-4 h-4" />
            <span>Generate & Place Coordinate Grid</span>
          </button>
        </div>
      )}

      {/* TAB 4: GEOMETRIC SHAPES */}
      {activeTab === 'shapes' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: 'right_triangle', label: 'Right Triangle', icon: '📐' },
            { id: 'equilateral_triangle', label: 'Equilateral Triangle', icon: '🔺' },
            { id: 'cylinder', label: '3D Cylinder', icon: '🥫' },
            { id: 'cube', label: '3D Wireframe Cube', icon: '🧊' }
          ].map((shape) => (
            <button
              key={shape.id}
              onClick={() => handleInsertShapeTemplate(shape.id)}
              className="p-4 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/40 text-center flex flex-col items-center justify-center gap-2 group transition-all"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">
                {shape.icon}
              </span>
              <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300">
                {shape.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </Modal>
  );
};
