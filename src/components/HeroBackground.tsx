import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function LiquidBlob() {
  const ref = useRef<THREE.Mesh>(null);
  const [themeColor, setThemeColor] = useState('#818cf8'); // default primary-400

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'Rose') setThemeColor('#fb7185');
    else if (saved === 'Emerald') setThemeColor('#34d399');
    else if (saved === 'Amber') setThemeColor('#fbbf24');

    const handleThemeChange = (e: Event) => {
      setThemeColor((e as CustomEvent).detail);
    };
    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Gentle parallax reacting to mouse
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
            distort={0.4} // Level of distortion
            speed={2} // Speed of liquid movement
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
