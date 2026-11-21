import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sphere, Ring } from '@react-three/drei';
import * as THREE from 'three';

const CyberStudentHead = ({ emotionalState = 'curious' }) => {
  const headRef = useRef();
  const eyeLeftRef = useRef();
  const eyeRightRef = useRef();
  const haloRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (headRef.current) {
      if (emotionalState === 'puzzled') {
        headRef.current.rotation.z = Math.sin(t * 1.5) * 0.12 + 0.1;
        headRef.current.rotation.y = Math.cos(t * 1.2) * 0.15;
      } else if (emotionalState === 'enlightened') {
        headRef.current.position.y = Math.sin(t * 4) * 0.08;
        headRef.current.rotation.y = Math.sin(t * 2) * 0.2;
      } else {
        headRef.current.rotation.y = Math.sin(t * 0.8) * 0.1;
        headRef.current.rotation.x = Math.cos(t * 0.6) * 0.05;
      }
    }
    if (haloRef.current) {
      haloRef.current.rotation.z += delta * 0.5;
    }
  });

  const getVisorColor = () => {
    switch (emotionalState) {
      case 'puzzled':
        return '#f59e0b'; // Amber
      case 'enlightened':
        return '#10b981'; // Emerald
      default:
        return '#06b6d4'; // Electric Cyan
    }
  };

  const visorColor = getVisorColor();

  return (
    <group ref={headRef}>
      {/* Outer Floating Holographic Halo */}
      <mesh ref={haloRef} position={[0, 0.9, 0]} rotation={[-Math.PI / 2.5, 0, 0]}>
        <ringGeometry args={[1.1, 1.15, 32]} />
        <meshBasicMaterial color={visorColor} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Main Head Cranium Sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.2}
          metalness={0.8}
          emissive="#1e1b4b"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Cybernetic Face Visor */}
      <mesh position={[0, 0.1, 0.68]}>
        <boxGeometry args={[1.05, 0.42, 0.4]} />
        <meshStandardMaterial
          color={visorColor}
          roughness={0.1}
          metalness={0.9}
          emissive={visorColor}
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Glowing Neural Eyes inside Visor */}
      <mesh ref={eyeLeftRef} position={[-0.28, 0.12, 0.9]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh ref={eyeRightRef} position={[0.28, 0.12, 0.9]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Audio Comm Earpieces */}
      <mesh position={[-0.95, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.15, 16]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.8} />
      </mesh>
      <mesh position={[0.95, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.15, 16]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.8} />
      </mesh>

      {/* Torso / Cybernetic Floating Collar */}
      <mesh position={[0, -1.2, 0]}>
        <coneGeometry args={[0.7, 0.8, 16]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
};

export const AiStudentAvatar3D = ({ emotionalState = 'curious' }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.8], fov: 45 }}
      className="w-full h-full cursor-grab active:cursor-grabbing"
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#38bdf8" />
      <pointLight position={[-5, -3, 3]} intensity={1.2} color="#a855f7" />

      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <CyberStudentHead emotionalState={emotionalState} />
      </Float>

      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 2.3} />
    </Canvas>
  );
};
