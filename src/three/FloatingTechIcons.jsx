import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const FloatingTechIcons = () => {
  const groupRef = useRef();
  const shape1 = useRef();
  const shape2 = useRef();
  const shape3 = useRef();
  const shape4 = useRef();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Mouse parallax
    const targetX = state.pointer.x * 0.5;
    const targetY = state.pointer.y * 0.4;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.04);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.04);
    }

    if (shape1.current) {
      shape1.current.rotation.x += delta * 0.5;
      shape1.current.rotation.y += delta * 0.4;
      shape1.current.position.y = 1.8 + Math.sin(time * 1.5) * 0.2;
    }
    if (shape2.current) {
      shape2.current.rotation.y -= delta * 0.6;
      shape2.current.rotation.z += delta * 0.3;
      shape2.current.position.y = -1.9 + Math.cos(time * 1.2) * 0.25;
    }
    if (shape3.current) {
      shape3.current.rotation.x += delta * 0.4;
      shape3.current.rotation.z += delta * 0.5;
      shape3.current.position.y = -0.8 + Math.sin(time * 1.8) * 0.2;
    }
    if (shape4.current) {
      shape4.current.rotation.y += delta * 0.7;
      shape4.current.rotation.x -= delta * 0.3;
      shape4.current.position.y = 1.2 + Math.cos(time * 1.4) * 0.18;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Top Left: Glowing Quantum Octahedron */}
      <mesh ref={shape1} position={[-3.6, 1.8, -1]}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={0.9}
          roughness={0.2}
          metalness={0.8}
          wireframe
        />
      </mesh>

      {/* Bottom Right: Cyber Icosahedron */}
      <mesh ref={shape2} position={[3.8, -1.9, -0.5]}>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#7e22ce"
          emissiveIntensity={0.8}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Bottom Left: Neural Torus Knot */}
      <mesh ref={shape3} position={[-3.4, -1.2, 0.5]}>
        <torusKnotGeometry args={[0.35, 0.1, 64, 16]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.7}
          roughness={0.25}
          metalness={0.85}
        />
      </mesh>

      {/* Top Right: Glowing Dodecahedron */}
      <mesh ref={shape4} position={[3.2, 1.5, -1.5]}>
        <dodecahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#db2777"
          emissiveIntensity={0.85}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
};
