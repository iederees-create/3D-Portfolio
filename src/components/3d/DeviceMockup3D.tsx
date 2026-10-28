import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

/** Screen plane that shows `image`, cropped "cover"-style to the screen's aspect ratio. */
function Screen({ image, width, height }: { image: string; width: number; height: number }) {
  const texture = useTexture(image);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    const img = texture.image as { width?: number; height?: number } | undefined;
    if (img?.width && img?.height) {
      const imageAspect = img.width / img.height;
      const screenAspect = width / height;
      if (imageAspect > screenAspect) {
        texture.repeat.set(screenAspect / imageAspect, 1);
        texture.offset.set((1 - screenAspect / imageAspect) / 2, 0);
      } else {
        texture.repeat.set(1, imageAspect / screenAspect);
        texture.offset.set(0, 1 - imageAspect / screenAspect);
      }
    }
    texture.needsUpdate = true;
  }, [texture, width, height]);

  return (
    <mesh position={[0, 0, 0.026]}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function Laptop({ image }: { image: string }) {
  const lid = useRef<THREE.Group>(null);
  const opened = useRef(0);

  // The lid swings open once on mount.
  useFrame((_, delta) => {
    if (!lid.current) return;
    opened.current = THREE.MathUtils.damp(opened.current, 1, 2.5, delta);
    lid.current.rotation.x = THREE.MathUtils.lerp(Math.PI / 2.2, -0.1, opened.current);
  });

  const screenW = 3.3;
  const screenH = 2.06;
  return (
    <group position={[0, -0.7, 0]}>
      {/* base */}
      <mesh position={[0, 0, 0.9]}>
        <boxGeometry args={[3.7, 0.08, 2.3]} />
        <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.045, 1.2]}>
        <boxGeometry args={[1.0, 0.01, 0.6]} />
        <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* lid, hinged at the back edge of the base */}
      <group ref={lid} position={[0, 0.04, -0.2]}>
        <group position={[0, screenH / 2 + 0.05, 0]}>
          <mesh>
            <boxGeometry args={[screenW + 0.18, screenH + 0.18, 0.05]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
          </mesh>
          <Screen image={image} width={screenW} height={screenH} />
        </group>
      </group>
    </group>
  );
}

export default function DeviceMockup3D({ image }: { image: string }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.6, 6.2], fov: 38 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 5, 5]} intensity={1.6} />
      <directionalLight position={[-4, 3, 3]} intensity={0.9} color="#93c5fd" />
      <PresentationControls
        global
        rotation={[0.12, -0.25, 0]}
        polar={[-0.25, 0.25]}
        azimuth={[-0.9, 0.9]}
        config={{ mass: 2, tension: 300 }}
        snap={{ mass: 3, tension: 250 }}
      >
        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.5}>
          <Suspense fallback={null}>
            <Laptop image={image} />
          </Suspense>
        </Float>
      </PresentationControls>
    </Canvas>
  );
}

