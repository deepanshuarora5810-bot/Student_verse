import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const OrbitalRings = () => {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state, delta) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.18;
      ring1Ref.current.rotation.x += delta * 0.05;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.22;
      ring2Ref.current.rotation.y += delta * 0.08;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y += delta * 0.15;
      ring3Ref.current.rotation.x -= delta * 0.12;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Primary cyan inclined orbital ring */}
      <group ref={ring1Ref} rotation={[Math.PI / 3.2, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[3.2, 0.022, 16, 120]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={1.4}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Glowing orbit beacon */}
        <mesh position={[3.2, 0, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Secondary purple counter-rotating ring */}
      <group ref={ring2Ref} rotation={[-Math.PI / 4, -Math.PI / 5, Math.PI / 8]}>
        <mesh>
          <torusGeometry args={[3.8, 0.018, 16, 120]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={1.2}
            roughness={0.3}
            metalness={0.7}
            transparent
            opacity={0.75}
          />
        </mesh>
        {/* Glowing orbit beacon */}
        <mesh position={[0, 3.8, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#ec4899" />
        </mesh>
      </group>

      {/* Outer subtle blue wide halo ring */}
      <group ref={ring3Ref} rotation={[Math.PI / 6, -Math.PI / 3, 0]}>
        <mesh>
          <torusGeometry args={[4.4, 0.012, 16, 120]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={0.8}
            transparent
            opacity={0.5}
          />
        </mesh>
      </group>
    </group>
  );
};
