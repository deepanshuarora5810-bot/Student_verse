import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

// Teacher Avatar on Stage
const TeacherAvatar3D = ({ isPresenting = true }) => {
  const teacherRef = useRef();

  useFrame((state, delta) => {
    if (teacherRef.current) {
      teacherRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.05 + 0.1;
      teacherRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <group ref={teacherRef} position={[0, 0.2, -3]}>
      {/* Teacher Floating Head/Visor */}
      <mesh position={[0, 1.4, 0]}>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.6} />
      </mesh>

      {/* Teacher Body / Holographic Robe */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.2, 0.45, 1.2, 16]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Presentation Pointer Aura */}
      <Float speed={3} rotationIntensity={0.4} floatIntensity={0.5}>
        <mesh position={[0.7, 1.0, 0.4]}>
          <octahedronGeometry args={[0.12, 0]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </Float>

      <Text position={[0, 2.0, 0]} fontSize={0.22} color="#38bdf8">
        Prof. Elena Rostova [Lead Lecturer]
      </Text>
    </group>
  );
};

// Seated Student Avatars
const StudentDeskGroup = ({ students = [] }) => {
  return (
    <group position={[0, 0, 1]}>
      {students.map((st, idx) => {
        const xPos = (idx - 2) * 1.8;
        const zPos = Math.abs(idx - 2) * 0.5 + 1.2;
        return (
          <group key={st.id} position={[xPos, 0, zPos]}>
            {/* Student Seat / Pod */}
            <mesh position={[0, 0.3, 0]}>
              <cylinderGeometry args={[0.4, 0.4, 0.6, 12]} />
              <meshStandardMaterial color="#1e293b" roughness={0.7} />
            </mesh>

            {/* Student Hologram Sphere */}
            <mesh position={[0, 0.9, 0]}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial
                color={st.handRaised ? '#f59e0b' : '#a855f7'}
                emissive={st.handRaised ? '#f59e0b' : '#a855f7'}
                emissiveIntensity={st.handRaised ? 0.8 : 0.3}
              />
            </mesh>

            {/* Hand Raised Floating Icon */}
            {st.handRaised && (
              <Float speed={4} floatIntensity={0.5}>
                <Text position={[0, 1.35, 0]} fontSize={0.25} color="#f59e0b">
                  ✋ Question!
                </Text>
              </Float>
            )}

            <Text position={[0, -0.15, 0]} fontSize={0.16} color="#94a3b8">
              {st.name}
            </Text>
          </group>
        );
      })}
    </group>
  );
};

// Main Curved Lecture Screen
const LectureScreen3D = ({ currentSlide }) => {
  return (
    <group position={[0, 2.5, -4]}>
      {/* Screen Frame */}
      <mesh>
        <boxGeometry args={[7.2, 3.6, 0.15]} />
        <meshStandardMaterial color="#030712" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Screen Display Face */}
      <mesh position={[0, 0, 0.09]}>
        <planeGeometry args={[7.0, 3.4]} />
        <meshBasicMaterial color="#050a1f" />
      </mesh>

      {/* Slide Title */}
      <Text
        position={[0, 1.2, 0.12]}
        fontSize={0.28}
        color="#38bdf8"
        anchorX="center"
        anchorY="middle"
        maxWidth={6.5}
      >
        {currentSlide.title}
      </Text>

      {/* Slide Bullets */}
      <Text
        position={[-3.1, 0.6, 0.12]}
        fontSize={0.18}
        color="#e2e8f0"
        anchorX="left"
        anchorY="top"
        maxWidth={6.2}
        lineHeight={1.4}
      >
        {currentSlide.bullets?.map((b) => `• ${b}`).join('\n')}
      </Text>

      {/* Diagram footer on screen */}
      {currentSlide.diagram && (
        <Text
          position={[0, -1.25, 0.12]}
          fontSize={0.17}
          color="#a855f7"
          anchorX="center"
          anchorY="middle"
        >
          [{currentSlide.diagram}]
        </Text>
      )}
    </group>
  );
};

export const Classroom3DScene = ({ currentSlide, students = [] }) => {
  return (
    <Canvas
      camera={{ position: [0, 4.5, 6.5], fov: 50 }}
      className="w-full h-full cursor-grab active:cursor-grabbing"
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 6, 0]} intensity={1.5} color="#38bdf8" />
      <pointLight position={[5, 2, -2]} intensity={1.0} color="#a855f7" />
      <pointLight position={[-5, 2, -2]} intensity={1.0} color="#06b6d4" />

      {/* Classroom Floor (Reflective Cyber Grid) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#060919" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Lecture Hall Elements */}
      <LectureScreen3D currentSlide={currentSlide} />
      <TeacherAvatar3D isPresenting={true} />
      <StudentDeskGroup students={students} />

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        maxDistance={14}
        minDistance={4}
        maxPolarAngle={Math.PI / 2.1}
      />
    </Canvas>
  );
};
