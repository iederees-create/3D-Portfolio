import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import { THEME_STORAGE_KEY, getTheme } from '../lib/themes';

function LiquidBlob() {
  const ref = useRef<THREE.Mesh>(null);
  const [themeColor, setThemeColor] = useState(() => getTheme(null).tokens.primary400);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    setThemeColor(getTheme(saved).tokens.primary400);

    const handleThemeChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      // Support both new { accent } payload and legacy string accent
      const accent = typeof detail === 'string' ? detail : detail?.accent;
      if (accent) setThemeColor(accent);
    };
    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      const targetX = (state.pointer.x * Math.PI) / 8;
      const targetY = (state.pointer.y * Math.PI) / 8;

      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetX, delta * 2);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, delta * 2);
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color={themeColor} />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#ffffff" />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={ref} args={[1.5, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color={themeColor}
            envMapIntensity={0.8}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.3}
            roughness={0.2}
            distort={0.4}
            speed={2}
          />
        </Sphere>
      </Float>

      <Environment preset="city" />
    </>
  );
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-80">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <LiquidBlob />
      </Canvas>
    </div>
  );
}
