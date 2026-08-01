import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics, RigidBody, CuboidCollider, InstancedRigidBodies } from '@react-three/rapier';
import { Environment, useKeyboardControls, KeyboardControls } from '@react-three/drei';
import { X, Trophy } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useMember } from '../contexts/MemberContext';

import { sendPersonaEmail } from '../lib/email';

function Player({ onImpulse }: { onImpulse: () => void }) {
  const body = useRef<any>(null);
  const [, get] = useKeyboardControls();

  useFrame(() => {
    if (!body.current) return;
    const { forward, backward, left, right } = get() as any;
    const impulseStrength = 0.5;
    const impulse = { x: 0, y: 0, z: 0 };
    let moved = false;

    if (forward) { impulse.z -= impulseStrength; moved = true; }
    if (backward) { impulse.z += impulseStrength; moved = true; }
    if (left) { impulse.x -= impulseStrength; moved = true; }
    if (right) { impulse.x += impulseStrength; moved = true; }

    if (moved) {
      body.current.applyImpulse(impulse, true);
      onImpulse();
    }
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

function Blocks({ onBlockHit }: { onBlockHit: () => void }) {
  const count = 15;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const row = Math.floor((-1 + Math.sqrt(1 + 8 * i)) / 2);
    const offset = i - (row * (row + 1)) / 2;
    positions[i * 3] = offset * 1.1 - row * 0.55;
    positions[i * 3 + 1] = row * 1.1 + 0.5;
    positions[i * 3 + 2] = -5;
  }

  return (
    <InstancedRigidBodies 
      positions={positions} 
      colliders="cuboid" 
      restitution={0.2} 
      friction={0.8}
      onCollisionEnter={onBlockHit}
    >
      <instancedMesh args={[undefined, undefined, count]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#f59e0b" />
      </instancedMesh>
    </InstancedRigidBodies>
  );
}

export default function MiniGame({ onClose }: { onClose: () => void }) {
  const { memberId, memberEmail, memberName } = useMember();
  const [gameState, setGameState] = useState<'playing' | 'calculating' | 'finished'>('playing');
  
  // Metrics
  const startTime = useRef(Date.now());
  const impulseCount = useRef(0);
  const blockHits = useRef(0);

  const finishGame = async () => {
    if (gameState !== 'playing') return;
    setGameState('calculating');
    
    const timeSpent = (Date.now() - startTime.current) / 1000;
    const ips = impulseCount.current / timeSpent; // impulses per second (aggressiveness)

    let calculatedPersona = 'The Apex Strategist';
    let personaDesc = 'You have an innate ability to process variables and execute with sniper-like precision. You thrive in high-stakes environments where calculation beats brute force.';
    
    if (ips > 15) {
      calculatedPersona = 'The Unstoppable Force';
      personaDesc = 'You possess a rare, aggressive problem-solving trait. When faced with an obstacle, you apply overwhelming force to break through. This is the hallmark of a high-risk, high-reward executor.';
    } else if (ips > 5 && timeSpent < 30) {
      calculatedPersona = 'The Kinetic Visionary';
      personaDesc = 'Your brain processes spatial relationships at lightning speed. You trust your instincts and can adapt to rapidly changing scenarios faster than 90% of the population.';
    }
    
    if (memberId) {
      await supabase.from('members').update({
        tech_persona: calculatedPersona,
        game_stats: {
          time_seconds: timeSpent,
          total_impulses: impulseCount.current,
          block_hits: blockHits.current,
          impulses_per_second: ips
        }
      }).eq('id', memberId);
    }

    if (memberName && memberEmail) {
      await sendPersonaEmail(memberName, memberEmail, calculatedPersona, personaDesc);
    }

    setGameState('finished');
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-slate-900 flex flex-col items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <X size={24} />
      </button>

      {gameState === 'playing' && (
        <div className="absolute top-6 left-6 z-10">
          <h2 className="text-2xl font-bold text-cyan-400">Cognitive Assessment</h2>
          <p className="text-slate-400">Use WASD to navigate and interact. We are mapping your cognitive profile.</p>
          <button 
            onClick={finishGame}
            className="mt-4 px-4 py-2 bg-amber-500 text-black text-sm font-bold rounded-lg hover:bg-amber-400"
          >
            Finish Assessment
          </button>
        </div>
      )}

      {gameState === 'calculating' && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-sm">
           <div className="text-center text-white">
             <div className="mx-auto w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
             <h2 className="text-xl font-bold">Analyzing Cognitive Patterns...</h2>
           </div>
        </div>
      )}

      {gameState === 'finished' && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 p-8 rounded-3xl border border-white/10 text-center max-w-sm">
            <div className="mx-auto w-16 h-16 bg-cyan-500/20 text-cyan-400 flex items-center justify-center rounded-2xl mb-4">
              <Trophy size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Analysis Complete</h2>
            <p className="text-slate-400 mb-6">We have processed your spatial decision-making data and identified your innate Cognitive Profile.</p>
            <div className="text-lg font-bold text-emerald-400 mb-8 p-4 bg-emerald-400/10 rounded-xl border border-emerald-400/20">
              Check your email for your official results!
            </div>
            <button 
              onClick={onClose}
              className="w-full px-4 py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200"
            >
              Return to Portfolio
            </button>
          </div>
        </div>
      )}

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
              <Player onImpulse={() => impulseCount.current++} />
              <Blocks onBlockHit={() => blockHits.current++} />
              
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
