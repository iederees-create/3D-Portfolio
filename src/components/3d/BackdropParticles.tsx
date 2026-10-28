import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useThemeAccent } from '../../hooks/useThemeAccent';

/** Soft drifting particle field behind the page; camera glides with scroll. */
function Field({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const accent = useThemeAccent();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    const p = ref.current;
    if (!p) return;
    const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const progress = window.scrollY / maxScroll;
    p.rotation.y += delta * 0.015;
    p.position.y = THREE.MathUtils.damp(p.position.y, progress * 7, 3, delta);
    p.position.x = THREE.MathUtils.damp(p.position.x, state.pointer.x * 0.4, 2, delta);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={accent} size={0.03} sizeAttenuation transparent opacity={0.45} depthWrite={false} />
    </points>
  );
}

export default function BackdropParticles({ count = 360 }: { count?: number }) {
  return (
    <Canvas dpr={1} camera={{ position: [0, 0, 6], fov: 55 }} gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }} style={{ pointerEvents: 'none' }}>
      <Field count={count} />
    </Canvas>
  );
}
