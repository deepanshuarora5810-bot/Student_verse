import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { FloatingPlanet } from './FloatingPlanet';
import { OrbitalRings } from './OrbitalRings';
import { Particles } from './Particles';
import { FloatingTechIcons } from './FloatingTechIcons';
import { CanvasFallback } from '../components/Loader';

export const HeroScene = () => {
  return (
    <div className="relative w-full h-full min-h-[520px] lg:min-h-[640px] flex items-center justify-center">
      {/* Background radial gradient spotlight glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-tr from-cyan-500/20 via-purple-600/15 to-blue-500/10 blur-[100px] -z-10 animate-pulse-glow" />
      </div>

      <Suspense fallback={<CanvasFallback />}>
        <Canvas
          camera={{ position: [0, 0, 7.5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          {/* Ambient subtle deep navy light */}
          <ambientLight intensity={0.8} color="#0c1736" />

          {/* Key lights with vivid cyber colors */}
          <directionalLight position={[6, 5, 5]} intensity={2.2} color="#38bdf8" />
          <directionalLight position={[-6, -4, -3]} intensity={1.5} color="#c084fc" />
          <pointLight position={[0, 4, 3]} intensity={2.5} color="#06b6d4" distance={12} />
          <pointLight position={[3, -3, 2]} intensity={2.0} color="#ec4899" distance={10} />

          {/* Floating animated 3D components */}
          <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.6}>
            <FloatingPlanet />
            <OrbitalRings />
          </Float>

          <FloatingTechIcons />
          <Particles count={750} />

          {/* Smooth user drag interaction with auto-return bounds */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.6}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 2.3}
            dampingFactor={0.05}
          />
        </Canvas>
      </Suspense>

      {/* Decorative cyber corner ticks */}
      <div className="absolute top-4 left-4 font-mono text-[10px] text-cyan-400/50 tracking-widest pointer-events-none select-none flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        RENDER: 3D_NEURAL_SPHERE_V8
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[10px] text-purple-400/50 tracking-widest pointer-events-none select-none">
        SYS_STATUS: OPTIMAL [60FPS]
      </div>
    </div>
  );
};
