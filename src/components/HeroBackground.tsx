import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleSwarm() {
  const ref = useRef<THREE.Points>(null);
  const [color, setColor] = useState('#818cf8'); // default primary-400

  useEffect(() => {
    // Check initial local storage if needed, or wait for event
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'Rose') setColor('#fb7185');
    else if (saved === 'Emerald') setColor('#34d399');
    else if (saved === 'Amber') setColor('#fbbf24');

    const handleThemeChange = (e: Event) => {
      setColor((e as CustomEvent).detail);
    };
    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  const sphere = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 4000; i++) {
      const r = 5 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
      
      // Smooth, gentle reaction to mouse without initial jump
      const targetX = (state.pointer.x * Math.PI) / 8;
      const targetY = (state.pointer.y * Math.PI) / 8;
      
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetX, delta * 0.5);
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetY, delta * 0.5);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ParticleSwarm />
      </Canvas>
    </div>
  );
}

