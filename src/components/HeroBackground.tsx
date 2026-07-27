import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Environment, Float } from '@react-three/drei';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
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
      const accent = typeof detail === 'string' ? detail : detail?.accent;
      if (accent) setThemeColor(accent);
    };
    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Base mouse target
      const targetX = (state.pointer.x * Math.PI) / 8;
      const targetY = (state.pointer.y * Math.PI) / 8;
      
      // Scroll offset factor
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollFraction = maxScroll > 0 ? scrollY / maxScroll : 0;
      
      // Morph and move based on scroll
      const scrollOffsetX = Math.sin(scrollFraction * Math.PI * 2) * 2;
      const scrollOffsetY = Math.cos(scrollFraction * Math.PI * 2) * 0.5 - 0.5;

      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetX + scrollOffsetX, delta * 2);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY + scrollOffsetY, delta * 2);
      
      // Scale based on scroll
      const targetScale = 1 + scrollFraction * 0.5;
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta);
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
      
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={0.8} />
        <Noise opacity={0.05} />
      </EffectComposer>
    </>
  );
}

export default function HeroBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-80">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <LiquidBlob />
      </Canvas>
    </div>
  );
}
