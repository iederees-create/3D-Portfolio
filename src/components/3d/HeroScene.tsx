import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useThemeAccent } from '../../hooks/useThemeAccent';

const damp = THREE.MathUtils.damp;

/** Scroll progress through the first viewport, clamped 0..1. */
function scrollProgress() {
  return Math.min(1, Math.max(0, window.scrollY / Math.max(1, window.innerHeight)));
}

function Ring({ radius, tilt, speed, color }: { radius: number; tilt: [number, number, number]; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });
  return (
    <group rotation={tilt}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, 0.012, 8, 120]} />
        <meshBasicMaterial color={color} transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

/** A small floating "UI card": glass slab with a header bar and two content lines. */
function UiPanel({ position, rotation, scale = 1, color, depth }: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  color: string;
  depth: number;
}) {
  const group = useRef<THREE.Group>(null);
  const basePosition = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const s = scrollProgress();
    // Parallax: panels at different depths drift at different speeds as the page scrolls.
    g.position.y = damp(g.position.y, basePosition.y + s * depth * 1.6, 4, delta);
    g.position.x = damp(g.position.x, basePosition.x + state.pointer.x * depth * 0.35, 4, delta);
    g.rotation.y = damp(g.rotation.y, rotation[1] + state.pointer.x * 0.25 + s * 0.5, 4, delta);
    g.rotation.x = damp(g.rotation.x, rotation[0] - state.pointer.y * 0.2, 4, delta);
  });

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.6}>
        <mesh>
          <boxGeometry args={[1.5, 0.95, 0.04]} />
          <meshStandardMaterial color="#0b1220" transparent opacity={0.55} roughness={0.35} metalness={0.4} />
          <Edges color={color} threshold={15} />
        </mesh>
        <mesh position={[-0.38, 0.28, 0.03]}>
          <boxGeometry args={[0.6, 0.08, 0.01]} />
          <meshBasicMaterial color={color} />
        </mesh>
        <mesh position={[-0.2, 0.02, 0.03]}>
          <boxGeometry args={[0.95, 0.05, 0.01]} />
          <meshBasicMaterial color="#94a3b8" transparent opacity={0.7} />
        </mesh>
        <mesh position={[-0.28, -0.12, 0.03]}>
          <boxGeometry args={[0.8, 0.05, 0.01]} />
          <meshBasicMaterial color="#94a3b8" transparent opacity={0.45} />
        </mesh>
        <mesh position={[0.45, -0.3, 0.03]}>
          <boxGeometry args={[0.4, 0.14, 0.01]} />
          <meshBasicMaterial color={color} transparent opacity={0.85} />
        </mesh>
      </Float>
    </group>
  );
}

function Particles({ color, count }: { color: string; count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Points on a thick spherical shell so the portrait stays clear.
      const r = 2.6 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.8;
      arr[i * 3 + 2] = r * Math.cos(phi) * 0.6;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    const p = ref.current;
    if (!p) return;
    const s = scrollProgress();
    p.rotation.y += delta * 0.05;
    p.rotation.x = damp(p.rotation.x, s * 0.6 - state.pointer.y * 0.1, 3, delta);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.035} sizeAttenuation transparent opacity={0.75} depthWrite={false} />
    </points>
  );
}

function Scene({ particleCount }: { particleCount: number }) {
  const accent = useThemeAccent();
  const rig = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const g = rig.current;
    if (!g) return;
    const s = scrollProgress();
    g.rotation.y = damp(g.rotation.y, state.pointer.x * 0.18, 3, delta);
    g.rotation.x = damp(g.rotation.x, -state.pointer.y * 0.12 + s * 0.3, 3, delta);
    const scale = 1 - s * 0.18;
    g.scale.setScalar(damp(g.scale.x, scale, 4, delta));
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[3, 3, 4]} intensity={18} color={accent} />
      <group ref={rig}>
        <Ring radius={2.35} tilt={[1.15, 0.2, 0]} speed={0.18} color={accent} />
        <Ring radius={2.9} tilt={[1.4, -0.35, 0.4]} speed={-0.12} color="#94a3b8" />
        <UiPanel position={[-1.7, 1.5, 0.6]} rotation={[0.05, 0.45, -0.05]} scale={0.85} color={accent} depth={1.2} />
        <UiPanel position={[1.7, 0.1, 0.9]} rotation={[-0.05, -0.5, 0.05]} scale={0.8} color="#e2e8f0" depth={0.8} />
        <UiPanel position={[-1.6, -1.6, 0.8]} rotation={[0.1, 0.35, 0.04]} scale={0.6} color={accent} depth={1.6} />
        <Particles color={accent} count={particleCount} />
      </group>
    </>
  );
}

export default function HeroScene({ particleCount = 420 }: { particleCount?: number }) {
  return (
    <Canvas
      // DPR is capped so high-density screens do not render 3-4x the pixels.
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6.4], fov: 40 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
    >
      <Scene particleCount={particleCount} />
    </Canvas>
  );
}
