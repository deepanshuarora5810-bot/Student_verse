import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

const BadgeModel = ({ rarity = 'Legendary' }) => {
  const meshRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.8;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.5;
      ringRef.current.rotation.y += delta * 0.3;
    }
  });

  const colors = {
    Legendary: { primary: '#f59e0b', emissive: '#d97706', ring: '#fbbf24' },
    Epic: { primary: '#a855f7', emissive: '#7e22ce', ring: '#c084fc' },
    Rare: { primary: '#06b6d4', emissive: '#0891b2', ring: '#38bdf8' },
    Common: { primary: '#3b82f6', emissive: '#1d4ed8', ring: '#60a5fa' }
  }[rarity] || { primary: '#06b6d4', emissive: '#0891b2', ring: '#38bdf8' };

  return (
    <group position={[0, 0, 0]}>
      {/* Central 3D Trophy Gem */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color={colors.primary}
          emissive={colors.emissive}
          emissiveIntensity={1.2}
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>

      {/* Orbiting Halo Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.8, 0.05, 16, 64]} />
        <meshStandardMaterial
          color={colors.ring}
          emissive={colors.ring}
          emissiveIntensity={1.5}
          metalness={0.8}
        />
      </mesh>

      {/* Sparkling Core Beacons */}
      <mesh position={[1.8, 0, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-1.8, 0, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

export const CyberBadge3D = ({ rarity = 'Legendary', height = "220px" }) => {
  return (
    <div style={{ height }} className="relative w-full flex items-center justify-center cursor-grab active:cursor-grabbing">
      <Suspense fallback={<div className="text-xs font-mono text-cyan-400 animate-pulse">Initializing 3D Badge...</div>}>
        <Canvas
          camera={{ position: [0, 0, 4.2], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[4, 5, 4]} intensity={2.0} color="#ffffff" />
          <pointLight position={[-3, -3, 2]} intensity={1.5} color="#06b6d4" />
          <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
            <BadgeModel rarity={rarity} />
          </Float>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />
        </Canvas>
      </Suspense>
    </div>
  );
};
