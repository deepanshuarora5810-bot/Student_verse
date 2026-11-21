import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const FloatingPlanet = () => {
  const coreRef = useRef();
  const wireRef = useRef();
  const atmosphereRef = useRef();
  const satellitesGroupRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Mouse parallax reaction
    const targetX = state.pointer.x * 0.4;
    const targetY = state.pointer.y * 0.3;

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.25;
      coreRef.current.rotation.x = THREE.MathUtils.lerp(coreRef.current.rotation.x, targetY * 0.5, 0.05);
      coreRef.current.position.y = Math.sin(time * 0.8) * 0.15;
    }

    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.15;
      wireRef.current.rotation.z += delta * 0.1;
      wireRef.current.position.y = Math.sin(time * 0.8) * 0.15;
    }

    if (atmosphereRef.current) {
      atmosphereRef.current.position.y = Math.sin(time * 0.8) * 0.15;
    }

    if (satellitesGroupRef.current) {
      satellitesGroupRef.current.rotation.y += delta * 0.35;
      satellitesGroupRef.current.position.y = Math.sin(time * 0.8) * 0.15;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Internal dense planet core */}
      <mesh ref={coreRef} castShadow receiveShadow>
        <sphereGeometry args={[1.7, 64, 64]} />
        <meshStandardMaterial
          color="#0b132b"
          emissive="#1c2541"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.85}
        />
      </mesh>

      {/* Cyber holographic wireframe cage */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[2.05, 3]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.8}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Glowing outer atmospheric glow sphere */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Orbiting quantum satellites */}
      <group ref={satellitesGroupRef}>
        <mesh position={[2.8, 0.5, 0]}>
          <octahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={1.2}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
        <mesh position={[-2.6, -0.4, 1.2]}>
          <tetrahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#a855f7"
            emissiveIntensity={1.2}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
        <mesh position={[0.5, -2.4, -1.5]}>
          <dodecahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={1.0}
            roughness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
};
