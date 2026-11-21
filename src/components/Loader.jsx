import React from 'react';

export const Loader = ({ message = "Synthesizing Neural Environment..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] w-full p-8">
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Outer glowing pulsing ring */}
        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-ping opacity-30" />
        {/* Rotating dash ring */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-purple-500 animate-spin" />
        {/* Inner reverse spin ring */}
        <div 
          className="absolute inset-2 rounded-full border-2 border-transparent border-b-purple-400 border-l-cyan-300 animate-spin"
          style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
        />
        {/* Center glowing core */}
        <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 shadow-neon-cyan animate-pulse" />
      </div>
      <p className="mt-6 text-sm font-medium tracking-widest uppercase text-cyan-300/80 font-mono animate-pulse">
        {message}
      </p>
      <div className="flex items-center gap-1.5 mt-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
};

export const CanvasFallback = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#050713]/80 backdrop-blur-md rounded-2xl border border-cyan-500/20 p-6">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-2 border-cyan-400/40 border-t-cyan-400 animate-spin" />
        <div className="absolute inset-3 rounded-full border-2 border-purple-500/40 border-b-purple-400 animate-spin" style={{ animationDirection: 'reverse' }} />
      </div>
      <span className="text-xs uppercase tracking-widest font-mono text-cyan-300">
        Loading 3D Simulation
      </span>
    </div>
  );
};
