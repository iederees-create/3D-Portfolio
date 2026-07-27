import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';
import { Html } from '@react-three/drei';
import { Suspense, useMemo } from 'react';
import * as THREE from 'three';

const skills = [
  'HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'Supabase',
  'API Integration', 'GitHub', 'Responsive Design', 'UI/UX',
  'Digital Marketing', 'CRM Systems', 'AI Automation', 'Data Analysis',
];

function SkillTag({ text, position }: { text: string; position: [number, number, number] }) {
  // Approximate width based on text length (very rough heuristic)
  const width = Math.max(2, text.length * 0.3);
  const height = 1;

  return (
    <RigidBody colliders="cuboid" position={position} restitution={0.6} friction={0.5}>
      <mesh>
        <boxGeometry args={[width, height, 0.5]} />
        <meshBasicMaterial transparent opacity={0} />
        <Html
          transform
          occlude="blending"
          className="pointer-events-none"
          style={{ width: `${width * 40}px` }}
        >
          <div className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-surface border border-white/10 rounded-lg whitespace-nowrap text-center shadow-lg shadow-black/50">
            {text}
          </div>
        </Html>
      </mesh>
    </RigidBody>
  );
}

function Boundaries() {
  return (
    <>
      {/* Floor */}
      <RigidBody type="fixed" position={[0, -4, 0]} restitution={0.2}>
        <mesh>
          <boxGeometry args={[20, 1, 10]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </RigidBody>
      {/* Ceiling */}
      <RigidBody type="fixed" position={[0, 10, 0]}>
        <mesh>
          <boxGeometry args={[20, 1, 10]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </RigidBody>
      {/* Left Wall */}
      <RigidBody type="fixed" position={[-5, 0, 0]}>
        <mesh>
          <boxGeometry args={[1, 20, 10]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </RigidBody>
      {/* Right Wall */}
      <RigidBody type="fixed" position={[5, 0, 0]}>
        <mesh>
          <boxGeometry args={[1, 20, 10]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </RigidBody>
      {/* Back Wall */}
      <RigidBody type="fixed" position={[0, 0, -2]}>
        <mesh>
          <boxGeometry args={[20, 20, 1]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </RigidBody>
      {/* Front Wall */}
      <RigidBody type="fixed" position={[0, 0, 2]}>
        <mesh>
          <boxGeometry args={[20, 20, 1]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </RigidBody>
    </>
  );
}

export default function PhysicsSkills() {
  // Generate random initial positions for the skills so they drop beautifully
  const skillElements = useMemo(() => {
    return skills.map((skill, index) => {
      const x = (Math.random() - 0.5) * 6;
      const y = 3 + Math.random() * 5 + index * 0.5;
      const z = (Math.random() - 0.5) * 2;
      return <SkillTag key={skill} text={skill} position={[x, y, z]} />;
    });
  }, []);

  return (
    <div className="w-full h-80 bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden relative cursor-grab active:cursor-grabbing">
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
          Technical Arsenal
        </h3>
        <p className="text-[10px] text-slate-500 mt-1">Interactive 3D Physics</p>
      </div>
      
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={1} />
        <Suspense fallback={null}>
          <Physics gravity={[0, -9.81, 0]}>
            {skillElements}
            <Boundaries />
          </Physics>
        </Suspense>
      </Canvas>
      
      {/* Gradient fade at bottom to blend with background if needed */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-surface to-transparent pointer-events-none opacity-50" />
    </div>
  );
}
