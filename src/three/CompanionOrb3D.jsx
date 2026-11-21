import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const OrbMesh = () => {
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.5;
      coreRef.current.rotation.x = Math.sin(t) * 0.2;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.8;
      ring1Ref.current.rotation.x += delta * 0.4;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.9;
      ring2Ref.current.rotation.z -= delta * 0.5;
    }
  });

  return (
    <group>
      {/* Floating Center Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.75, 2]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          wireframe={false}
        />
      </mesh>

      {/* Outer Orbiting Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.15, 0.04, 16, 64]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.35, 0.035, 16, 64]} />
        <meshBasicMaterial color="#a855f7" />
      </mesh>
    </group>
  );
};

export const CompanionOrb3D = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.2], fov: 45 }}
      className="w-full h-full pointer-events-none"
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#38bdf8" />
      <pointLight position={[-5, -5, -5]} intensity={1.0} color="#a855f7" />
      <Float speed={3} rotationIntensity={0.4} floatIntensity={0.6}>
        <OrbMesh />
      </Float>
    </Canvas>
  );
};
