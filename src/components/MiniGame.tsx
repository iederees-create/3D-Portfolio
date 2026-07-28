import { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics, RigidBody, CuboidCollider, InstancedRigidBodies } from '@react-three/rapier';
import { Environment, Text, useKeyboardControls, KeyboardControls } from '@react-three/drei';
import * as THREE from 'three';
import { X } from 'lucide-react';

function Player() {
  const body = useRef<any>(null);
  const [, get] = useKeyboardControls();

  useFrame(() => {
    if (!body.current) return;
    const { forward, backward, left, right } = get();
    const impulseStrength = 0.5;
    const impulse = { x: 0, y: 0, z: 0 };

    if (forward) impulse.z -= impulseStrength;
    if (backward) impulse.z += impulseStrength;
    if (left) impulse.x -= impulseStrength;
    if (right) impulse.x += impulseStrength;

    body.current.applyImpulse(impulse, true);
  });

  return (
    <RigidBody ref={body} colliders="ball" position={[0, 1, 5]} restitution={0.8} linearDamping={0.5} angularDamping={0.5}>
      <mesh castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="cyan" emissive="cyan" emissiveIntensity={0.5} />
      </mesh>
    </RigidBody>
  );
}

function Blocks() {
  const count = 15;
  const positions = Array.from({ length: count }, (_, i) => {
    const row = Math.floor((-1 + Math.sqrt(1 + 8 * i)) / 2);
    const offset = i - (row * (row + 1)) / 2;
    return [offset * 1.1 - row * 0.55, row * 1.1 + 0.5, -5] as [number, number, number];
  });

  return (
    <InstancedRigidBodies positions={positions} colliders="cuboid" restitution={0.2} friction={0.8}>
      <instancedMesh args={[undefined, undefined, count]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#f59e0b" />
      </instancedMesh>
    </InstancedRigidBodies>
  );
}

export default function MiniGame({ onClose }: { onClose: () => void }) {
  const [score, setScore] = useState(0);

  return (
    <div className="fixed inset-0 z-[10000] bg-slate-900 flex flex-col items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <X size={24} />
      </button>

      <div className="absolute top-6 left-6 z-10">
        <h2 className="text-2xl font-bold text-cyan-400">NextGen Smash</h2>
        <p className="text-slate-400">Use WASD or Arrows to smash the blocks!</p>
      </div>

      <KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
          { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
          { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
          { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
        ]}
      >
        <Canvas shadows camera={{ position: [0, 5, 12], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} castShadow intensity={1.5} shadow-mapSize={1024} />
          
          <Suspense fallback={null}>
            <Physics gravity={[0, -9.81, 0]}>
              <Player />
              <Blocks />
              
              {/* Floor */}
              <RigidBody type="fixed" position={[0, -0.5, 0]} restitution={0.5} friction={1}>
                <mesh receiveShadow>
                  <boxGeometry args={[30, 1, 30]} />
                  <meshStandardMaterial color="#1e293b" />
                </mesh>
              </RigidBody>
              
              {/* Invisible Walls */}
              <RigidBody type="fixed" position={[0, 5, -15]}><CuboidCollider args={[15, 10, 1]} /></RigidBody>
              <RigidBody type="fixed" position={[0, 5, 15]}><CuboidCollider args={[15, 10, 1]} /></RigidBody>
              <RigidBody type="fixed" position={[-15, 5, 0]}><CuboidCollider args={[1, 10, 15]} /></RigidBody>
              <RigidBody type="fixed" position={[15, 5, 0]}><CuboidCollider args={[1, 10, 15]} /></RigidBody>
            </Physics>
          </Suspense>
          
          <Environment preset="city" />
        </Canvas>
      </KeyboardControls>
    </div>
  );
}
