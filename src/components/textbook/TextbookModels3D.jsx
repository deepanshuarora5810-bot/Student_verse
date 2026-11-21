import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

// 1. NEUROANATOMY 3D MODEL
export const BrainModel3D = ({ params = {}, onSelectPart }) => {
  const groupRef = useRef();
  const signalRate = params.signalRate || 45;

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  const lobes = [
    { name: 'Frontal Cortex', pos: [0, 0.4, 0.7], color: '#38bdf8', size: 0.65 },
    { name: 'Temporal Lobe', pos: [-0.8, -0.2, 0.1], color: '#a855f7', size: 0.55 },
    { name: 'Parietal Lobe', pos: [0, 0.6, -0.3], color: '#10b981', size: 0.6 },
    { name: 'Occipital Lobe', pos: [0, 0.1, -0.9], color: '#f59e0b', size: 0.5 },
    { name: 'Hippocampus', pos: [0.6, -0.3, 0.2], color: '#ec4899', size: 0.45 }
  ];

  return (
    <group ref={groupRef}>
      {lobes.map((lobe) => (
        <group key={lobe.name} position={lobe.pos}>
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                if (onSelectPart) onSelectPart(lobe.name);
              }}
            >
              <dodecahedronGeometry args={[lobe.size, 1]} />
              <meshStandardMaterial
                color={lobe.color}
                wireframe={false}
                roughness={0.3}
                metalness={0.7}
                emissive={lobe.color}
                emissiveIntensity={0.3}
              />
            </mesh>

            {/* Neural Synapse Particle Pulse */}
            <mesh position={[0, lobe.size + 0.15, 0]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>

            <Text
              position={[0, lobe.size + 0.35, 0]}
              fontSize={0.18}
              color="#e2e8f0"
              anchorX="center"
              anchorY="middle"
            >
              {lobe.name}
            </Text>
          </Float>
        </group>
      ))}
    </group>
  );
};

// 2. SOLAR SYSTEM 3D MODEL
export const SolarSystemModel3D = ({ params = {} }) => {
  const sunRef = useRef();
  const speedMult = params.orbitalSpeed || 1.2;

  const planets = [
    { name: 'Mercury', dist: 1.6, size: 0.15, color: '#94a3b8', speed: 1.8 * speedMult },
    { name: 'Venus', dist: 2.3, size: 0.22, color: '#fbbf24', speed: 1.4 * speedMult },
    { name: 'Earth', dist: 3.2, size: 0.26, color: '#38bdf8', speed: 1.0 * speedMult },
    { name: 'Mars', dist: 4.0, size: 0.2, color: '#f87171', speed: 0.8 * speedMult },
    { name: 'Jupiter', dist: 5.2, size: 0.55, color: '#fb923c', speed: 0.5 * speedMult }
  ];

  return (
    <group>
      {/* Central Sun */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshBasicMaterial color="#fef08a" />
      </mesh>
      <pointLight intensity={2.5} color="#fbbf24" distance={20} />

      {/* Orbiting Bodies */}
      {planets.map((p) => (
        <OrbitingPlanet key={p.name} planet={p} />
      ))}
    </group>
  );
};

const OrbitingPlanet = ({ planet }) => {
  const groupRef = useRef();
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * planet.speed * 0.8;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Orbital Path Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[planet.dist - 0.02, planet.dist + 0.02, 64]} />
        <meshBasicMaterial color="#334155" side={THREE.DoubleSide} transparent opacity={0.4} />
      </mesh>

      {/* Planet Mesh */}
      <mesh position={[planet.dist, 0, 0]}>
        <sphereGeometry args={[planet.size, 16, 16]} />
        <meshStandardMaterial color={planet.color} roughness={0.4} metalness={0.6} />
      </mesh>

      <Text position={[planet.dist, planet.size + 0.25, 0]} fontSize={0.18} color="#cbd5e1">
        {planet.name}
      </Text>
    </group>
  );
};

// 3. MOLECULAR DYNAMICS MODEL (Caffeine / Organic Core)
export const MoleculeModel3D = ({ params = {} }) => {
  const groupRef = useRef();
  const thermalEnergy = params.thermalEnergy || 298;

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  // Carbon, Nitrogen, Oxygen atom coordinates
  const atoms = [
    { element: 'C', pos: [0, 0, 0], color: '#334155', size: 0.35 },
    { element: 'N', pos: [0.8, 0.7, 0], color: '#3b82f6', size: 0.32 },
    { element: 'C', pos: [0.3, 1.5, 0], color: '#334155', size: 0.35 },
    { element: 'O', pos: [0.7, 2.3, 0.2], color: '#ef4444', size: 0.38 },
    { element: 'N', pos: [-0.9, 1.2, 0], color: '#3b82f6', size: 0.32 },
    { element: 'C', pos: [-1.2, 0, 0], color: '#334155', size: 0.35 },
    { element: 'O', pos: [-2.1, -0.6, 0.2], color: '#ef4444', size: 0.38 },
    { element: 'C', pos: [-0.8, -1.2, 0], color: '#334155', size: 0.35 },
    { element: 'H', pos: [1.7, 0.5, 0], color: '#f8fafc', size: 0.2 }
  ];

  return (
    <group ref={groupRef}>
      {atoms.map((atom, idx) => (
        <group key={idx} position={atom.pos}>
          <mesh>
            <sphereGeometry args={[atom.size, 24, 24]} />
            <meshStandardMaterial
              color={atom.color}
              roughness={0.2}
              metalness={0.7}
              emissive={atom.color}
              emissiveIntensity={0.2}
            />
          </mesh>
          <Text position={[0, 0, atom.size + 0.1]} fontSize={0.16} color="#ffffff">
            {atom.element}
          </Text>
        </group>
      ))}

      {/* Covalent Bond Sticks */}
      <BondCylinder start={[0, 0, 0]} end={[0.8, 0.7, 0]} />
      <BondCylinder start={[0.8, 0.7, 0]} end={[0.3, 1.5, 0]} />
      <BondCylinder start={[0.3, 1.5, 0]} end={[0.7, 2.3, 0.2]} />
      <BondCylinder start={[0.3, 1.5, 0]} end={[-0.9, 1.2, 0]} />
      <BondCylinder start={[-0.9, 1.2, 0]} end={[-1.2, 0, 0]} />
      <BondCylinder start={[-1.2, 0, 0]} end={[-2.1, -0.6, 0.2]} />
      <BondCylinder start={[-1.2, 0, 0]} end={[-0.8, -1.2, 0]} />
      <BondCylinder start={[0.8, 0.7, 0]} end={[1.7, 0.5, 0]} />
    </group>
  );
};

const BondCylinder = ({ start, end }) => {
  const p1 = new THREE.Vector3(...start);
  const p2 = new THREE.Vector3(...end);
  const distance = p1.distanceTo(p2);
  const position = p1.clone().add(p2).multiplyScalar(0.5);

  const orientation = new THREE.Matrix4();
  const up = new THREE.Vector3(0, 1, 0);
  const dir = p2.clone().sub(p1).normalize();
  orientation.lookAt(p1, p2, up);

  return (
    <mesh position={position}>
      <cylinderGeometry args={[0.06, 0.06, distance, 12]} />
      <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.3} />
    </mesh>
  );
};

// 4. SELF-BALANCING 3D RED-BLACK TREE
export const RedBlackTreeModel3D = () => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  const nodes = [
    { id: '15', pos: [0, 1.5, 0], color: '#1e293b', isBlack: true, label: '15 [Root]' },
    { id: '8', pos: [-1.8, 0.3, 0], color: '#ef4444', isBlack: false, label: '8 [Red]' },
    { id: '24', pos: [1.8, 0.3, 0], color: '#1e293b', isBlack: true, label: '24 [Black]' },
    { id: '4', pos: [-2.6, -1.0, 0], color: '#1e293b', isBlack: true, label: '4 [Black]' },
    { id: '11', pos: [-1.0, -1.0, 0], color: '#1e293b', isBlack: true, label: '11 [Black]' },
    { id: '20', pos: [1.0, -1.0, 0], color: '#ef4444', isBlack: false, label: '20 [Red]' },
    { id: '30', pos: [2.6, -1.0, 0], color: '#ef4444', isBlack: false, label: '30 [Red]' }
  ];

  return (
    <group ref={groupRef}>
      {nodes.map((node) => (
        <group key={node.id} position={node.pos}>
          <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
            <mesh>
              <sphereGeometry args={[0.38, 24, 24]} />
              <meshStandardMaterial
                color={node.color}
                roughness={0.2}
                metalness={0.8}
                emissive={node.isBlack ? '#0f172a' : '#b91c1c'}
                emissiveIntensity={0.5}
              />
            </mesh>
            <Text position={[0, 0, 0.45]} fontSize={0.2} color="#ffffff">
              {node.id}
            </Text>
            <Text position={[0, -0.5, 0]} fontSize={0.14} color="#94a3b8">
              {node.label}
            </Text>
          </Float>
        </group>
      ))}

      {/* Tree Branches */}
      <BondCylinder start={[0, 1.5, 0]} end={[-1.8, 0.3, 0]} />
      <BondCylinder start={[0, 1.5, 0]} end={[1.8, 0.3, 0]} />
      <BondCylinder start={[-1.8, 0.3, 0]} end={[-2.6, -1.0, 0]} />
      <BondCylinder start={[-1.8, 0.3, 0]} end={[-1.0, -1.0, 0]} />
      <BondCylinder start={[1.8, 0.3, 0]} end={[1.0, -1.0, 0]} />
      <BondCylinder start={[1.8, 0.3, 0]} end={[2.6, -1.0, 0]} />
    </group>
  );
};
