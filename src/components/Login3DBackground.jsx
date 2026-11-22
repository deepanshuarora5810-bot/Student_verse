import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FloatingEducationalObjects = () => {
  const groupRef = useRef();
  const octahedronRef = useRef();
  const icosahedronRef = useRef();
  const torusRef = useRef();
  const dodecahedronRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const mouseX = state.pointer.x * 0.4;
    const mouseY = state.pointer.y * 0.3;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY, 0.05);
    }

    if (octahedronRef.current) {
      octahedronRef.current.rotation.x += delta * 0.4;
      octahedronRef.current.rotation.y += delta * 0.6;
      octahedronRef.current.position.y = 1.9 + Math.sin(time * 1.4) * 0.2;
    }

    if (icosahedronRef.current) {
      icosahedronRef.current.rotation.y -= delta * 0.5;
      icosahedronRef.current.rotation.z += delta * 0.4;
      icosahedronRef.current.position.y = -1.8 + Math.cos(time * 1.2) * 0.22;
    }

    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.5;
      torusRef.current.rotation.z -= delta * 0.3;
      torusRef.current.position.y = -0.9 + Math.sin(time * 1.6) * 0.18;
    }

    if (dodecahedronRef.current) {
      dodecahedronRef.current.rotation.y += delta * 0.5;
      dodecahedronRef.current.rotation.x += delta * 0.4;
      dodecahedronRef.current.position.y = 1.6 + Math.cos(time * 1.5) * 0.2;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Top Left: Quantum Geometry */}
      <mesh ref={octahedronRef} position={[-4.5, 2.0, -1.5]}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={1.2}
          roughness={0.15}
          metalness={0.8}
          wireframe
        />
      </mesh>

      {/* Bottom Right: Cyber Icosahedron */}
      <mesh ref={icosahedronRef} position={[4.6, -1.8, -1.0]}>
        <icosahedronGeometry args={[0.75, 0]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#7e22ce"
          emissiveIntensity={1.0}
          roughness={0.25}
          metalness={0.75}
        />
      </mesh>

      {/* Bottom Left: Neural Torus Knot */}
      <mesh ref={torusRef} position={[-4.2, -1.4, 0]}>
        <torusKnotGeometry args={[0.45, 0.12, 64, 16]} />
        <meshStandardMaterial
          color="#818cf8"
          emissive="#4338ca"
          emissiveIntensity={0.9}
          roughness={0.2}
          metalness={0.85}
        />
      </mesh>

      {/* Top Right: Hologram Dodecahedron */}
      <mesh ref={dodecahedronRef} position={[4.2, 1.8, -1.8]}>
        <dodecahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#be185d"
          emissiveIntensity={1.1}
          roughness={0.2}
          metalness={0.8}
          wireframe
        />
      </mesh>

      {/* Center Subtle Orbit Ring */}
      <mesh ref={ringRef} position={[0, 0, -2.5]} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.8, 0.02, 16, 100]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.35} />
      </mesh>
    </group>
  );
};

const CosmicParticles = () => {
  const pointsRef = useRef();

  // Generate particle cloud positions
  const count = 500;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
  }

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#38bdf8"
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
};

export const Login3DBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.7} color="#0f172a" />
          <directionalLight position={[5, 5, 4]} intensity={2.0} color="#38bdf8" />
          <directionalLight position={[-5, -4, 2]} intensity={1.8} color="#c084fc" />
          <pointLight position={[0, 3, 2]} intensity={2.5} color="#818cf8" distance={10} />
          <FloatingEducationalObjects />
          <CosmicParticles />
        </Canvas>
      </Suspense>
    </div>
  );
};
