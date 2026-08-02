import { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Trail, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function CursorMesh({ isHovering }: { isHovering: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const targetScale = isHovering ? 2 : 1;

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Map normalized pointer coordinates to viewport units
      const x = (state.pointer.x * viewport.width) / 2;
      const y = (state.pointer.y * viewport.height) / 2;

      // Lerp position for smooth trailing effect
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x, delta * 15);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y, delta * 15);

      // Lerp scale for hover effect
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 10);
    }
  });

  return (
    <Trail
      width={isHovering ? 1.5 : 0.5}
      color={new THREE.Color(0xffffff)}
      length={isHovering ? 20 : 10}
      decay={1}
      local={false}
      stride={0}
      interval={1}
    >
      <Float speed={5} rotationIntensity={2} floatIntensity={2}>
        <Sphere ref={meshRef} args={[0.15, 32, 32]}>
          <MeshDistortMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={2}
            distort={0.4}
            speed={4}
            toneMapped={false}
          />
        </Sphere>
      </Float>
    </Trail>
  );
}

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" style={{ mixBlendMode: 'difference' }}>
      <Canvas camera={{ position: [0, 0, 5] }} style={{ pointerEvents: 'none' }}>
        <ambientLight intensity={0.5} />
        <CursorMesh isHovering={isHovering} />
      </Canvas>
    </div>
  );
}
