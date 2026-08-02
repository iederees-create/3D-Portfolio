import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uProgress;
uniform vec3 uColor;
varying vec2 vUv;

void main() {
  // Simple liquid/wipe effect
  float distortion = sin(vUv.y * 10.0 + uProgress * 5.0) * 0.1;
  float mask = step(vUv.x + distortion, uProgress * 1.2 - 0.1);
  
  if (mask < 0.5) discard;
  
  gl_FragColor = vec4(uColor, 1.0);
}
`;

function TransitionMaterial() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const location = useLocation();
  const prevLocation = useRef(location.pathname);
  const progress = useRef(0);
  const isTransitioning = useRef(false);

  useEffect(() => {
    if (location.pathname !== prevLocation.current) {
      prevLocation.current = location.pathname;
      isTransitioning.current = true;
      progress.current = 1.0; // Start fully covered and wipe away
    }
  }, [location.pathname]);

  useFrame((_, delta) => {
    if (materialRef.current) {
      if (isTransitioning.current) {
        progress.current -= delta * 1.5;
        if (progress.current <= 0) {
          progress.current = 0;
          isTransitioning.current = false;
        }
      }
      materialRef.current.uniforms.uProgress.value = progress.current;
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={{
        uProgress: { value: 0 },
        uColor: { value: new THREE.Color('#06b6d4') } // Cyan-400
      }}
      transparent
      depthWrite={false}
    />
  );
}

export default function WebGLTransitionOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 1 }} style={{ pointerEvents: 'none' }}>
        <mesh>
          <planeGeometry args={[window.innerWidth, window.innerHeight]} />
          <TransitionMaterial />
        </mesh>
      </Canvas>
    </div>
  );
}
