import React, { useState, useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import {
  Sparkles,
  Zap,
  RotateCw,
  Eye,
  Layers,
  Award,
  CheckCircle2,
  TrendingUp,
  Brain
} from 'lucide-react';
import { CanvasFallback } from './Loader';

const SKILL_COLORS = [
  { primary: '#06b6d4', emissive: '#0891b2', glow: 'rgba(6, 182, 212, 0.4)', name: 'Cyan' },
  { primary: '#a855f7', emissive: '#7e22ce', glow: 'rgba(168, 85, 247, 0.4)', name: 'Purple' },
  { primary: '#10b981', emissive: '#059669', glow: 'rgba(16, 185, 129, 0.4)', name: 'Emerald' },
  { primary: '#f59e0b', emissive: '#d97706', glow: 'rgba(245, 158, 11, 0.4)', name: 'Amber' },
  { primary: '#ec4899', emissive: '#be185d', glow: 'rgba(236, 72, 153, 0.4)', name: 'Pink' },
  { primary: '#3b82f6', emissive: '#1d4ed8', glow: 'rgba(59, 130, 246, 0.4)', name: 'Blue' }
];

// Single 3D Pie Slice with smooth hover expansion
const PieSlice3D = ({
  geom,
  midAngle,
  color,
  isHovered,
  isSelected,
  onPointerOver,
  onPointerOut,
  onClick
}) => {
  const meshRef = useRef();
  const matRef = useRef();

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const active = isHovered || isSelected;
    const targetOffset = active ? 0.32 : 0;
    const targetZ = active ? 0.16 : 0;

    const targetX = Math.cos(midAngle) * targetOffset;
    const targetY = Math.sin(midAngle) * targetOffset;

    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, delta * 8);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, delta * 8);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, delta * 8);

    if (matRef.current) {
      const targetEmissive = active ? 1.8 : 0.8;
      matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        matRef.current.emissiveIntensity,
        targetEmissive,
        delta * 6
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geom}
      onPointerOver={(e) => {
        e.stopPropagation();
        onPointerOver();
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onPointerOut();
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <meshStandardMaterial
        ref={matRef}
        color={color.primary}
        emissive={color.emissive}
        emissiveIntensity={0.8}
        roughness={0.2}
        metalness={0.85}
      />
    </mesh>
  );
};

// Holographic Central Core Sphere & Floating Tech Ring
const CenterHolographicCore = ({ totalPoints, activeSkill }) => {
  const coreRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.8;
      coreRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 1.2) * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.6;
    }
  });

  return (
    <group position={[0, 0, 0.28]}>
      {/* Central Pulsing Hologram */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={1.5}
          wireframe
        />
      </mesh>

      {/* Internal Core Glow */}
      <mesh>
        <sphereGeometry args={[0.26, 16, 16]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Orbiting Donut Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.75, 0.02, 16, 48]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.7} />
      </mesh>
    </group>
  );
};

// 3D Scene Controller with smooth auto-rotation
const PieChartScene = ({
  pieData,
  hoveredIndex,
  setHoveredIndex,
  selectedIndex,
  setSelectedIndex,
  autoRotate
}) => {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.z += delta * 0.25;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Tilted orientation so the 3D extrusion is clearly visible from isometric view */}
      <group ref={groupRef} rotation={[-Math.PI / 3.2, 0, 0]}>
        {pieData.map((item) => (
          <PieSlice3D
            key={item.index}
            geom={item.geom}
            midAngle={item.midAngle}
            color={item.color}
            isHovered={hoveredIndex === item.index}
            isSelected={selectedIndex === item.index}
            onPointerOver={() => setHoveredIndex(item.index)}
            onPointerOut={() => setHoveredIndex(null)}
            onClick={() => setSelectedIndex(item.index === selectedIndex ? null : item.index)}
          />
        ))}

        {/* Central Core in Donut Hole */}
        <CenterHolographicCore
          activeSkill={hoveredIndex !== null ? pieData[hoveredIndex] : null}
        />
      </group>
    </group>
  );
};

export const NeuralSkills3DPieChart = ({ skills, onBoostSkill, onCalibrate }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [autoRotate, setAutoRotate] = useState(true);

  // Generate 3D Extruded Pie Slice Geometries
  const pieData = useMemo(() => {
    const total = skills.reduce((sum, s) => sum + s.level, 0) || 1;
    let currentAngle = 0;

    return skills.map((skill, index) => {
      const angleSlice = (skill.level / total) * Math.PI * 2;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angleSlice;
      const midAngle = startAngle + angleSlice / 2;
      currentAngle += angleSlice;

      const shape = new THREE.Shape();
      const innerRadius = 1.0;
      const outerRadius = 2.45;

      shape.moveTo(Math.cos(startAngle) * innerRadius, Math.sin(startAngle) * innerRadius);
      shape.lineTo(Math.cos(startAngle) * outerRadius, Math.sin(startAngle) * outerRadius);
      shape.absarc(0, 0, outerRadius, startAngle, endAngle, false);
      shape.lineTo(Math.cos(endAngle) * innerRadius, Math.sin(endAngle) * innerRadius);
      shape.absarc(0, 0, innerRadius, endAngle, startAngle, true);

      const geom = new THREE.ExtrudeGeometry(shape, {
        depth: 0.55,
        bevelEnabled: true,
        bevelSegments: 2,
        bevelSize: 0.035,
        bevelThickness: 0.035,
      });

      const percent = Math.round((skill.level / total) * 100);
      const color = SKILL_COLORS[index % SKILL_COLORS.length];

      return {
        skill,
        geom,
        startAngle,
        endAngle,
        midAngle,
        percent,
        color,
        index
      };
    });
  }, [skills]);

  const activeFocusIndex = hoveredIndex !== null ? hoveredIndex : selectedIndex;
  const focusedItem = activeFocusIndex !== null ? pieData[activeFocusIndex] : null;

  const totalPoints = skills.reduce((sum, s) => sum + s.level, 0);
  const topSkill = [...skills].sort((a, b) => b.level - a.level)[0];

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border-indigo-500/30 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER WITH CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 font-semibold mb-1">
            <Brain className="w-4 h-4" />
            <span>Interactive Spatial Telemetry</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Neural Skills <span className="text-gradient-cyan">3D Pie Matrix</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Volumetric cognitive load distribution rendered in WebGL 3D space. Drag to rotate, hover slices to inspect.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* 3D Spin Toggle */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
              autoRotate
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-neon-cyan'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
            }`}
            title="Toggle 3D auto-spin"
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
            <span>{autoRotate ? 'Spinning' : 'Paused'}</span>
          </button>

          {/* Calibrate Matrix */}
          {onCalibrate && (
            <button
              onClick={onCalibrate}
              className="px-3 py-1.5 rounded-xl text-xs font-mono text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 hover:border-cyan-400 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Calibrate</span>
            </button>
          )}
        </div>
      </div>

      {/* MAIN 3D CANVAS & HUD OVERLAY CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* LEFT / CENTER: 3D WEBGL PIE CHART CANVAS (7 cols) */}
        <div className="lg:col-span-7 h-[360px] sm:h-[420px] w-full rounded-2xl bg-gradient-to-b from-[#060a22]/80 to-[#020514]/90 border border-indigo-500/20 relative overflow-hidden flex items-center justify-center">
          
          {/* Cyber Background Glow Elements */}
          <div className="absolute inset-0 cyber-grid-pattern opacity-30 pointer-events-none" />
          <div className="absolute w-72 h-72 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none" />

          {/* Floating Reticle Badge on Active Slice */}
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            {focusedItem ? (
              <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 backdrop-blur-md flex items-center gap-2 animate-in fade-in">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: focusedItem.color.primary }}
                />
                <span className="text-xs font-bold text-white">
                  {focusedItem.skill.name}
                </span>
                <span className="text-xs font-mono font-bold text-cyan-300">
                  {focusedItem.skill.level}% ({focusedItem.percent}% Share)
                </span>
              </div>
            ) : (
              <div className="px-3 py-1.5 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>Hover or click slices to inspect</span>
              </div>
            )}
          </div>

          {/* Quick Metrics Tag bottom right */}
          <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
            <span className="text-[10px] font-mono text-slate-400 uppercase bg-black/60 px-2.5 py-1 rounded-lg border border-white/10">
              Total Points: <strong className="text-white">{totalPoints}</strong> • 6 Dimensions
            </span>
          </div>

          {/* 3D Canvas */}
          <Suspense fallback={<CanvasFallback />}>
            <Canvas
              camera={{ position: [0, 5.2, 5.8], fov: 42 }}
              className="w-full h-full cursor-grab active:cursor-grabbing"
            >
              {/* Scene Lighting */}
              <ambientLight intensity={0.8} />
              <directionalLight position={[6, 8, 5]} intensity={1.5} color="#e0f2fe" />
              <pointLight position={[-6, -4, 4]} intensity={1.2} color="#c084fc" />
              <pointLight position={[0, 4, 2]} intensity={1.0} color="#22d3ee" />

              {/* 3D Pie Chart Model */}
              <PieChartScene
                pieData={pieData}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                autoRotate={autoRotate}
              />

              {/* Orbit Controls for Free 3D Drag */}
              <OrbitControls
                enableZoom={true}
                minDistance={4}
                maxDistance={12}
                enablePan={false}
                maxPolarAngle={Math.PI / 2.1}
                minPolarAngle={Math.PI / 6}
              />
            </Canvas>
          </Suspense>
        </div>

        {/* RIGHT: SKILLS ROSTER & DIRECT INTERACTION DRILLS (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          
          {/* Quick Top Capability Card */}
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

          {/* Interactive Skill Cards with Slices Mapping */}
          <div className="flex flex-col gap-2 max-h-[340px] overflow-y-auto pr-1">
            {pieData.map((item) => {
              const active = hoveredIndex === item.index || selectedIndex === item.index;
              return (
                <div
                  key={item.index}
                  onMouseEnter={() => setHoveredIndex(item.index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedIndex(selectedIndex === item.index ? null : item.index)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    active
                      ? 'bg-cyan-500/15 border-cyan-400 shadow-neon-cyan'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-3 h-3 rounded-full shrink-0 shadow-sm transition-transform duration-300"
                      style={{
                        backgroundColor: item.color.primary,
                        transform: active ? 'scale(1.3)' : 'scale(1)'
                      }}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h5 className="text-xs font-semibold text-white truncate">
                          {item.skill.name}
                        </h5>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0">
                          {item.skill.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] font-mono text-slate-400">
                        <span>Proficiency: <strong className="text-cyan-300">{item.skill.level}%</strong></span>
                        <span>•</span>
                        <span>Slice: <strong className="text-slate-200">{item.percent}%</strong></span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onBoostSkill) onBoostSkill(item.skill.name);
                    }}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 transition-colors shrink-0 flex items-center gap-1 shadow-sm"
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
