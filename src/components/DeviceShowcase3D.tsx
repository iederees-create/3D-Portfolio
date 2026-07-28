import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float, ContactShadows, PresentationControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

export default function DeviceShowcase3D({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing bg-black/50">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" />

        <PresentationControls
          global
          rotation={[0.13, 0.1, 0]}
          polar={[-0.4, 0.2]}
          azimuth={[-1, 0.75]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 400 }}
        >
          <Float rotationIntensity={0.4} floatIntensity={2} speed={1.5}>
            {/* Laptop Frame */}
            <mesh position={[0, -0.5, 0]}>
              <boxGeometry args={[4.2, 2.8, 0.1]} />
              <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
              
              {/* Screen Content Wrapper using Html */}
              <Html
                transform
                wrapperClass="htmlScreen"
                distanceFactor={1.17}
                position={[0, 0, 0.06]}
                className="w-[1024px] h-[640px] bg-black overflow-hidden rounded-md pointer-events-none"
              >
                {children}
              </Html>
            </mesh>
            
            {/* Laptop Base (Keyboard area) */}
            <mesh position={[0, -1.9, 1.2]} rotation={[-Math.PI / 2, 0, 0]}>
              <boxGeometry args={[4.2, 2.5, 0.1]} />
              <meshStandardMaterial color="#222" metalness={0.8} roughness={0.5} />
            </mesh>
          </Float>
        </PresentationControls>

        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
      </Canvas>
    </div>
  );
}
