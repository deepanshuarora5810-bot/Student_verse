import React, { useState } from 'react';
import {
  MousePointer,
  PenTool,
  Highlighter,
  Eraser,
  Minus,
  MoveRight,
  Square,
  Circle,
  Type,
  Flame,
  Undo2,
  Redo2,
  Trash2,
  Grid,
  Sigma,
  Palette,
  ChevronDown,
  Layers,
  Sparkles
} from 'lucide-react';

export const WhiteboardToolbar = ({
  activeTool,
  onChangeTool,
  strokeColor,
  onChangeColor,
  strokeWidth,
  onChangeWidth,
  backgroundType,
  onChangeBackground,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onClearCanvas,
  onOpenMathTools,
  isStudentViewOnly = false
}) => {
  const [colorMenuOpen, setColorMenuOpen] = useState(false);
  const [sizeMenuOpen, setSizeMenuOpen] = useState(false);
  const [bgMenuOpen, setBgMenuOpen] = useState(false);

  const colors = [
    { label: 'Cyan', hex: '#06b6d4' },
    { label: 'Purple', hex: '#a855f7' },
    { label: 'Blue', hex: '#3b82f6' },
    { label: 'Emerald', hex: '#10b981' },
    { label: 'Amber', hex: '#f59e0b' },
    { label: 'Rose', hex: '#f43f5e' },
    { label: 'White', hex: '#ffffff' },
    { label: 'Slate Dark', hex: '#0f172a' }
  ];

  const strokeSizes = [
    { label: 'Fine', size: 2 },
    { label: 'Medium', size: 4 },
    { label: 'Thick', size: 8 },
    { label: 'Heavy', size: 14 },
    { label: 'Extra', size: 24 }
  ];

  const backgroundOptions = [
    { id: 'grid', label: 'Engineering Grid' },
    { id: 'dots', label: 'Math Dots Matrix' },
    { id: 'ruled', label: 'Notebook Ruled' },
    { id: 'blank', label: 'Clean Whiteboard' },
    { id: 'cyber', label: 'Cyber Blueprint' }
  ];

  const tools = [
    { id: 'select', label: 'Select & Move (V)', icon: MousePointer },
    { id: 'pen', label: 'Pen Tool (P)', icon: PenTool },
    { id: 'highlighter', label: 'Highlighter (H)', icon: Highlighter },
    { id: 'eraser', label: 'Eraser (E)', icon: Eraser },
    { id: 'line', label: 'Line Tool (L)', icon: Minus },
    { id: 'arrow', label: 'Vector Arrow (A)', icon: MoveRight },
    { id: 'rectangle', label: 'Rectangle (R)', icon: Square },
    { id: 'circle', label: 'Circle (C)', icon: Circle },
    { id: 'text', label: 'Text Note (T)', icon: Type },
    { id: 'laser', label: 'Presentation Laser Pointer', icon: Sparkles }
  ];

  if (isStudentViewOnly) {
    return (
      <div className="absolute top-20 left-4 z-30 p-3 rounded-2xl bg-[#090e24]/90 backdrop-blur-xl border border-indigo-900/40 text-xs font-mono text-slate-400">
        <span className="flex items-center gap-1.5 text-cyan-300">
          <MousePointer className="w-4 h-4" />
          <span>Student View-Only Mode</span>
        </span>
      </div>
    );
  }

  return (
    <div className="absolute top-20 left-4 z-30 flex flex-col gap-2">
      {/* Primary Tool Palette */}
      <div className="flex flex-col gap-1.5 p-2 rounded-2xl bg-[#080d24]/90 backdrop-blur-2xl border border-indigo-900/40 shadow-2xl">
        {tools.map((t) => {
          const Icon = t.icon;
          const isActive = activeTool === t.id;

          return (
            <button
              key={t.id}
              onClick={() => onChangeTool(t.id)}
              className={`p-2.5 rounded-xl transition-all relative group flex items-center justify-center ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-neon-cyan'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
              title={t.label}
            >
              <Icon className="w-5 h-5" />

              {/* Tooltip on hover */}
              <div className="absolute left-full ml-3 px-2.5 py-1 rounded-lg bg-slate-900/95 border border-slate-700 text-white text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-xl z-50">
                {t.label}
              </div>
            </button>
          );
        })}

        <div className="h-[1px] bg-slate-800 my-1 mx-1" />

        {/* Color Picker Toggle */}
        <div className="relative">
          <button
            onClick={() => setColorMenuOpen(!colorMenuOpen)}
            className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center w-full group"
            title="Stroke Color"
          >
            <div
              className="w-5 h-5 rounded-full border-2 border-white/80 shadow-sm"
              style={{ backgroundColor: strokeColor }}
            />
            {/* Tooltip */}
            <div className="absolute left-full ml-3 px-2 py-1 rounded-lg bg-slate-900 text-white text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
              Stroke Color
            </div>
          </button>

          {/* Color dropdown popover */}
          {colorMenuOpen && (
            <div className="absolute left-full top-0 ml-3 p-3 rounded-2xl bg-[#0a0f26] border border-cyan-500/30 shadow-2xl flex flex-col gap-2 z-50 animate-in fade-in zoom-in-95 w-44">
              <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                Preset Palette
              </span>
              <div className="grid grid-cols-4 gap-2">
                {colors.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => {
                      onChangeColor(c.hex);
                      setColorMenuOpen(false);
                    }}
                    className="w-7 h-7 rounded-lg border border-white/20 hover:scale-110 transition-transform relative"
                    style={{ backgroundColor: c.hex }}
                    title={c.label}
                  />
                ))}
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                <input
                  type="color"
                  value={strokeColor}
                  onChange={(e) => onChangeColor(e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                />
                <span className="text-[10px] font-mono text-slate-300">Custom Hex</span>
              </div>
            </div>
          )}
        </div>

        {/* Brush Size Toggle */}
        <div className="relative">
          <button
            onClick={() => setSizeMenuOpen(!sizeMenuOpen)}
            className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center w-full group"
            title="Stroke Size"
          >
            <div
              className="rounded-full bg-cyan-400"
              style={{
                width: Math.min(18, Math.max(4, strokeWidth)),
                height: Math.min(18, Math.max(4, strokeWidth))
              }}
            />
            <div className="absolute left-full ml-3 px-2 py-1 rounded-lg bg-slate-900 text-white text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
              Width ({strokeWidth}px)
            </div>
          </button>

          {/* Size dropdown */}
          {sizeMenuOpen && (
            <div className="absolute left-full top-0 ml-3 p-3 rounded-2xl bg-[#0a0f26] border border-cyan-500/30 shadow-2xl flex flex-col gap-2 z-50 animate-in fade-in zoom-in-95 w-40">
              <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                Stroke Thickness
              </span>
              {strokeSizes.map((s) => (
                <button
                  key={s.size}
                  onClick={() => {
                    onChangeWidth(s.size);
                    setSizeMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    strokeWidth === s.size
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{s.label}</span>
                  <span className="text-[10px]">{s.size}px</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Background Grid Style */}
        <div className="relative">
          <button
            onClick={() => setBgMenuOpen(!bgMenuOpen)}
            className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center w-full group"
            title="Canvas Pattern & Grid"
          >
            <Grid className="w-5 h-5" />
            <div className="absolute left-full ml-3 px-2 py-1 rounded-lg bg-slate-900 text-white text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
              Grid Style
            </div>
          </button>

          {/* Background options dropdown */}
          {bgMenuOpen && (
            <div className="absolute left-full top-0 ml-3 p-3 rounded-2xl bg-[#0a0f26] border border-cyan-500/30 shadow-2xl flex flex-col gap-1.5 z-50 animate-in fade-in zoom-in-95 w-48">
              <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-1">
                Board Background
              </span>
              {backgroundOptions.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => {
                    onChangeBackground(bg.id);
                    setBgMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    backgroundType === bg.id
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{bg.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Math & Geometry Tools Trigger */}
        <button
          onClick={onOpenMathTools}
          className="p-2.5 rounded-xl text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 transition-all flex items-center justify-center w-full group"
          title="Math & Geometry Vault"
        >
          <Sigma className="w-5 h-5" />
          <div className="absolute left-full ml-3 px-2 py-1 rounded-lg bg-slate-900 text-white text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
            Math Toolkit
          </div>
        </button>

        <div className="h-[1px] bg-slate-800 my-1 mx-1" />

        {/* Undo */}
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all relative group flex items-center justify-center"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 className="w-5 h-5" />
          <div className="absolute left-full ml-3 px-2 py-1 rounded-lg bg-slate-900 text-white text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
            Undo (⌘Z)
          </div>
        </button>

        {/* Redo */}
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all relative group flex items-center justify-center"
          title="Redo (Ctrl+Shift+Z)"
        >
          <Redo2 className="w-5 h-5" />
          <div className="absolute left-full ml-3 px-2 py-1 rounded-lg bg-slate-900 text-white text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
            Redo (⌘⇧Z)
          </div>
        </button>

        {/* Clear Canvas */}
        <button
          onClick={onClearCanvas}
          className="p-2.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all relative group flex items-center justify-center"
          title="Clear Current Canvas"
        >
          <Trash2 className="w-5 h-5" />
          <div className="absolute left-full ml-3 px-2 py-1 rounded-lg bg-slate-900 text-white text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
            Clear Page
          </div>
        </button>
      </div>
    </div>
  );
};
