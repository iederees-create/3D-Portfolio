import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

function UICard({ position, rotation, scale, color, speed = 1 }: any) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      // Gentle parallax reacting to mouse
      const targetX = (state.pointer.x * Math.PI) / 10;
      const targetY = (state.pointer.y * Math.PI) / 10;
      
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetX + rotation[1], delta * 2);
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetY + rotation[0], delta * 2);
    }
  });

  return (
    <group ref={ref} position={position}>
      <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
        {/* Main Glass Card */}
        <RoundedBox args={[scale[0], scale[1], 0.1]} radius={0.1} smoothness={4}>
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={0.5}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transmission={0.9}
            ior={1.5}
            chromaticAberration={0.03}
            color="#ffffff"
          />
        </RoundedBox>

        {/* Abstract UI Elements inside/on the card */}
        <RoundedBox position={[-scale[0] * 0.3, scale[1] * 0.3, 0.06]} args={[scale[0] * 0.2, scale[0] * 0.2, 0.05]} radius={0.05}>
          <meshStandardMaterial color={color} />
        </RoundedBox>
        
        <RoundedBox position={[0.1, scale[1] * 0.3, 0.06]} args={[scale[0] * 0.5, 0.1, 0.05]} radius={0.05}>
          <meshStandardMaterial color="#334155" />
        </RoundedBox>
        
        <RoundedBox position={[0.1, scale[1] * 0.1, 0.06]} args={[scale[0] * 0.5, 0.1, 0.05]} radius={0.05}>
          <meshStandardMaterial color="#1e293b" />
        </RoundedBox>
      </Float>
    </group>
  );
}

function GlassScene() {
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

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} color={themeColor} />
      <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />
      
      {/* Background Orbs to refract through glass */}
      <mesh position={[2, 2, -5]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color={themeColor} transparent opacity={0.3} />
      </mesh>
      
      <mesh position={[-3, -2, -6]}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.2} />
      </mesh>

      {/* Floating UI Cards */}
      <UICard 
        position={[-2, 1, 0]} 
        rotation={[0, Math.PI / 6, 0]} 
        scale={[2, 3]} 
        color={themeColor}
        speed={1.5}
      />
      <UICard 
        position={[2.5, -0.5, 1]} 
        rotation={[0, -Math.PI / 8, 0]} 
        scale={[1.5, 2]} 
        color="#0ea5e9"
        speed={2}
      />
      <UICard 
        position={[0, -2, -1]} 
        rotation={[-Math.PI / 8, 0, 0]} 
        scale={[2.5, 1.5]} 
        color="#f43f5e"
        speed={1}
      />

      <Environment preset="city" />
    </>
  );
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <GlassScene />
      </Canvas>
    </div>
  );
}
