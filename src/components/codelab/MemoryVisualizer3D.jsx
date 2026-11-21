import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

// 3D Stack Frame Box
const StackFrameBox = ({ frame, index, totalFrames }) => {
  const meshRef = useRef();
  const yPos = index * 1.3 - (totalFrames * 1.3) / 2;

  useFrame((state, delta) => {
    if (frame.active && meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group position={[-3.2, yPos, 0]}>
      <mesh ref={meshRef}>
        <boxGeometry args={[3.2, 1.0, 1.5]} />
        <meshStandardMaterial
          color={frame.active ? '#06b6d4' : '#3b82f6'}
          transparent
          opacity={frame.active ? 0.75 : 0.35}
          roughness={0.2}
          metalness={0.7}
          emissive={frame.active ? '#06b6d4' : '#1e3a8a'}
          emissiveIntensity={frame.active ? 0.5 : 0.1}
        />
      </mesh>

      {/* Frame Label */}
      <Text
        position={[0, 0.15, 0.8]}
        fontSize={0.24}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {frame.name}
      </Text>

      {/* Variable String */}
      <Text
        position={[0, -0.2, 0.8]}
        fontSize={0.16}
        color={frame.active ? '#a5f3fc' : '#94a3b8'}
        anchorX="center"
        anchorY="middle"
      >
        {Object.entries(frame.vars || {})
          .map(([k, v]) => `${k}=${v}`)
          .join(', ')}
      </Text>
    </group>
  );
};

// 3D Heap Object Block
const HeapObjectNode = ({ obj, index, totalObjects }) => {
  const meshRef = useRef();
  const xPos = 2.0 + (index % 2) * 2.2;
  const yPos = Math.floor(index / 2) * -1.8 + (totalObjects > 2 ? 1 : 0);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group position={[xPos, yPos, 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh ref={meshRef}>
          <cylinderGeometry args={[0.9, 0.9, 0.9, 6]} />
          <meshStandardMaterial
            color="#a855f7"
            transparent
            opacity={0.8}
            roughness={0.1}
            metalness={0.8}
            emissive="#7e22ce"
            emissiveIntensity={0.4}
            wireframe={false}
          />
        </mesh>

        {/* Address and type label */}
        <Text
          position={[0, 0.8, 0]}
          fontSize={0.22}
          color="#c084fc"
          anchorX="center"
          anchorY="middle"
        >
          {obj.addr} [{obj.type}]
        </Text>

        {/* Object values */}
        <Text
          position={[0, 0, 1.0]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {obj.val !== undefined
            ? `val: ${obj.val}`
            : obj.elements
            ? `[${obj.elements.filter(e => e !== 'empty').join(', ')}]`
            : obj.label || 'Object'}
        </Text>

        {/* Pointer indicator if points to next */}
        {obj.next && obj.next !== 'null' && (
          <Text
            position={[0, -0.6, 0]}
            fontSize={0.16}
            color="#38bdf8"
            anchorX="center"
            anchorY="middle"
          >
            next &rarr; {obj.next}
          </Text>
        )}
      </Float>
    </group>
  );
};

// Connecting Line between Stack pointer and Heap Address
const PointerLine = ({ start = [-1.5, 0, 0], end = [2.0, 0, 0] }) => {
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color="#38bdf8" linewidth={2} transparent opacity={0.6} />
    </line>
  );
};

export const MemoryVisualizer3D = ({ currentStep }) => {
  const stack = currentStep?.stack || [];
  const heap = currentStep?.heap || [];

  return (
    <Canvas
      camera={{ position: [0, 0, 8.5], fov: 48 }}
      className="w-full h-full cursor-grab active:cursor-grabbing"
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#38bdf8" />
      <pointLight position={[-5, -5, 5]} intensity={1.0} color="#a855f7" />

      {/* Stack Area Header Title */}
      <Text position={[-3.2, 3.2, 0]} fontSize={0.32} color="#38bdf8">
        CALL STACK (LIFO)
      </Text>

      {/* Heap Area Header Title */}
      <Text position={[3.0, 3.2, 0]} fontSize={0.32} color="#c084fc">
        DYNAMIC HEAP MEMORY
      </Text>

      {/* Render Stack Frames */}
      {stack.map((frame, idx) => (
        <StackFrameBox
          key={`${frame.name}-${idx}`}
          frame={frame}
          index={idx}
          totalFrames={stack.length}
        />
      ))}

      {/* Render Heap Objects */}
      {heap.map((obj, idx) => (
        <HeapObjectNode
          key={obj.addr || idx}
          obj={obj}
          index={idx}
          totalObjects={heap.length}
        />
      ))}

      {/* Render Pointer Connection if stack holds heap ref */}
      {heap.length > 0 && stack.some((s) => JSON.stringify(s.vars).includes('ref:')) && (
        <PointerLine start={[-1.5, 0, 0]} end={[1.5, 0, 0]} />
      )}

      <OrbitControls enablePan={true} enableZoom={true} maxDistance={15} minDistance={4} />
    </Canvas>
  );
};
