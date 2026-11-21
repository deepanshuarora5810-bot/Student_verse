import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { UNIVERSE_PLANETS } from '../data/demoData';

const PlanetMesh = ({ planet, isSelected, isHovered, onSelect, onPointerOver, onPointerOut }) => {
  const meshRef = useRef();
  const ringRef = useRef();
  const satelliteRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * planet.speed;
      meshRef.current.rotation.x += delta * 0.05;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.15;
    }
    if (satelliteRef.current) {
      const t = state.clock.getElapsedTime() * (planet.speed * 1.5);
      satelliteRef.current.position.x = Math.cos(t) * (planet.radius + 1.2);
      satelliteRef.current.position.z = Math.sin(t) * (planet.radius + 1.2);
      satelliteRef.current.position.y = Math.sin(t * 2) * 0.4;
    }
  });

  const getGeometry = (type, radius) => {
    switch (type) {
      case 'fractal':
        return <icosahedronGeometry args={[radius, 3]} />;
      case 'grid':
        return <boxGeometry args={[radius * 1.6, radius * 1.6, radius * 1.6]} />;
      case 'organic':
        return <dodecahedronGeometry args={[radius, 2]} />;
      case 'neural':
        return <sphereGeometry args={[radius, 32, 32]} />;
      case 'strata':
        return <cylinderGeometry args={[radius * 1.1, radius, radius * 1.3, 16]} />;
      default:
        return <sphereGeometry args={[radius, 32, 32]} />;
    }
  };

  const activeScale = isSelected ? 1.35 : isHovered ? 1.2 : 1.0;

  return (
    <group position={planet.position}>
      {/* Planetary Orbit Ring */}
      <mesh rotation={[-Math.PI / 2.3, 0, 0]}>
        <ringGeometry args={[planet.radius + 0.9, planet.radius + 0.96, 64]} />
        <meshBasicMaterial
          color={planet.color}
          transparent
          opacity={isHovered || isSelected ? 0.75 : 0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Main Celestial Body */}
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
        <mesh
          ref={meshRef}
          scale={activeScale}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(planet);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            onPointerOver(planet);
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            onPointerOut();
          }}
        >
          {getGeometry(planet.textureType, planet.radius)}
          <meshStandardMaterial
            color={planet.color}
            wireframe={planet.textureType === 'grid'}
            roughness={0.2}
            metalness={0.8}
            emissive={planet.color}
            emissiveIntensity={isSelected ? 0.6 : isHovered ? 0.4 : 0.15}
          />
        </mesh>

        {/* Orbiting Tech Satellite / Moon */}
        <mesh ref={satelliteRef}>
          <octahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.8}
            wireframe
          />
        </mesh>

        {/* Floating 3D Label */}
        <Text
          position={[0, planet.radius + 1.1, 0]}
          fontSize={0.4}
          color={isSelected ? '#38bdf8' : isHovered ? '#ffffff' : '#94a3b8'}
          anchorX="center"
          anchorY="middle"
        >
          {planet.name}
        </Text>
      </Float>
    </group>
  );
};

export const UniverseScene = ({ selectedPlanet, onSelectPlanet }) => {
  const [hoveredPlanet, setHoveredPlanet] = useState(null);

  return (
    <Canvas
      camera={{ position: [0, 4, 15], fov: 50 }}
      className="w-full h-full cursor-grab active:cursor-grabbing"
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#38bdf8" />
      <pointLight position={[-10, -10, -10]} intensity={1.0} color="#a855f7" />
      <Stars radius={100} depth={50} count={4000} factor={4} saturation={0.5} fade speed={1} />

      {/* Center Galactic Core Light */}
      <mesh position={[0, 0, -1]}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
      </mesh>
      <pointLight position={[0, 0, -1]} intensity={2.5} color="#ffffff" distance={25} />

      {/* Render All 5 Planets */}
      {UNIVERSE_PLANETS.map((planet) => (
        <PlanetMesh
          key={planet.id}
          planet={planet}
          isSelected={selectedPlanet?.id === planet.id}
          isHovered={hoveredPlanet?.id === planet.id}
          onSelect={onSelectPlanet}
          onPointerOver={setHoveredPlanet}
          onPointerOut={() => setHoveredPlanet(null)}
        />
      ))}

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        maxDistance={25}
        minDistance={6}
        autoRotate={!selectedPlanet}
        autoRotateSpeed={0.4}
      />
    </Canvas>
  );
};
