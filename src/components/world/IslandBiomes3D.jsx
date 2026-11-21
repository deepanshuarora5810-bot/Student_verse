import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text, Sky } from '@react-three/drei';
import * as THREE from 'three';

const BiomeIsland = ({ biome, isSelected, onSelect }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        biome.floatingHeight + Math.sin(state.clock.elapsedTime * 0.8 + biome.floatingHeight) * 0.15;
    }
  });

  const getIslandCoords = (id) => {
    switch (id) {
      case 'isle-logic':
        return [-3.5, 0, -2];
      case 'cyber-citadel':
        return [3.5, 0, -1.5];
      case 'synapse-sanctuary':
        return [-2, 0, 3];
      case 'quantum-spire':
        return [2.5, 0, 3];
      default:
        return [0, 0, 0];
    }
  };

  const coords = getIslandCoords(biome.id);

  return (
    <group ref={groupRef} position={coords}>
      {/* Floating Island Ground Rock (Inverted Cone) */}
      <mesh
        position={[0, -0.6, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(biome);
        }}
      >
        <cylinderGeometry args={[1.8, 0.2, 1.2, 7]} />
        <meshStandardMaterial
          color={biome.unlocked ? '#1e293b' : '#0f172a'}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Surface Biome Plate */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[1.82, 1.82, 0.1, 7]} />
        <meshStandardMaterial
          color={biome.color}
          roughness={0.3}
          metalness={0.6}
          emissive={biome.color}
          emissiveIntensity={biome.unlocked ? 0.35 : 0.05}
        />
      </mesh>

      {/* Biome Buildings/Structures */}
      {biome.unlocked ? (
        <group>
          {/* Main Landmark Obelisk / Crystal */}
          <mesh position={[0, 0.9, 0]}>
            <octahedronGeometry args={[0.7, 0]} />
            <meshStandardMaterial
              color={biome.color}
              emissive={biome.color}
              emissiveIntensity={0.8}
              wireframe={biome.biomeType === 'cyber'}
            />
          </mesh>

          {/* Floating Energy Beacon */}
          <Float speed={3} rotationIntensity={0.5} floatIntensity={0.6}>
            <mesh position={[0, 2.2, 0]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            <pointLight position={[0, 2.2, 0]} color={biome.color} intensity={1.5} distance={6} />
          </Float>
        </group>
      ) : (
        /* Locked Forcefield Shield */
        <group position={[0, 0.8, 0]}>
          <mesh>
            <sphereGeometry args={[1.8, 16, 16]} />
            <meshBasicMaterial color="#ef4444" wireframe transparent opacity={0.35} />
          </mesh>
          <Text position={[0, 0.3, 0]} fontSize={0.28} color="#fca5a5">
            LOCKED [LVL {biome.requiredLevel}]
          </Text>
        </group>
      )}

      {/* Floating Island Label */}
      <Text
        position={[0, -1.6, 0]}
        fontSize={0.24}
        color={isSelected ? '#38bdf8' : '#ffffff'}
        anchorX="center"
        anchorY="middle"
      >
        {biome.name}
      </Text>
    </group>
  );
};

export const IslandBiomes3D = ({ biomes = [], selectedBiome, onSelectBiome, skyboxTheme }) => {
  return (
    <Canvas
      camera={{ position: [0, 8, 12], fov: 45 }}
      className="w-full h-full cursor-grab active:cursor-grabbing"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 15, 10]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-10, 5, -10]} intensity={1.0} color="#a855f7" />

      {/* Skybox simulation */}
      {skyboxTheme === 'cyberpunk' && (
        <Sky distance={450000} sunPosition={[0, 0.05, -1]} inclination={0.2} azimuth={0.25} />
      )}

      {/* Render all 4 Islands */}
      {biomes.map((b) => (
        <BiomeIsland
          key={b.id}
          biome={b}
          isSelected={selectedBiome?.id === b.id}
          onSelect={onSelectBiome}
        />
      ))}

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        maxDistance={22}
        minDistance={6}
        maxPolarAngle={Math.PI / 2.1}
      />
    </Canvas>
  );
};
