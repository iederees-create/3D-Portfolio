import { Suspense, lazy, useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import ErrorBoundary from './ErrorBoundary';
import { useCan3D, useOnScreen } from '../hooks/useCapabilities';

// Three.js / react-three-fiber live in their own chunk and only download on capable devices.
const HeroScene = lazy(() => import('./3d/HeroScene'));

interface HeroVisualProps {
  imageSrc: string;
  imageAlt: string;
}

/** Static layered fallback: glow + concentric rings. Also the base layer under the 3D scene. */
function StaticLayers() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute inset-[-12%] rounded-full bg-primary-500/20 blur-3xl" />
      <div className="absolute inset-[-6%] rounded-full border border-primary-400/25" />
      <div className="absolute inset-[-16%] rounded-full border border-white/10" />
      <div
        className="absolute inset-[-24%] rounded-full opacity-40"
        style={{ background: 'conic-gradient(from 120deg, transparent, rgb(var(--color-glow-rgb) / 0.35), transparent 40%)' }}
      />
    </div>
  );
}

export default function HeroVisual({ imageSrc, imageAlt }: HeroVisualProps) {
  const can3D = useCan3D(768);
  const reduced = useReducedMotion();
  const { ref, active } = useOnScreen<HTMLDivElement>('200px');
  // Defer mounting the scene until the browser is idle so the headline and CTAs paint first.
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    if (!can3D) {
      setSceneReady(false);
      return;
    }
    const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setSceneReady(true), { timeout: 1500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setSceneReady(true), 400);
    return () => window.clearTimeout(id);
  }, [can3D]);

  // Pointer tilt on the portrait (skipped for reduced motion).
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 18 });
  const sy = useSpring(py, { stiffness: 120, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-7, 7]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced || e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[380px]"
      style={{ perspective: 1000 }}
    >
      <StaticLayers />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative z-10"
      >
        <div className="overflow-hidden rounded-[1.75rem] border border-white/15 shadow-2xl shadow-black/60 ring-1 ring-primary-400/20">
          <img src={imageSrc} alt={imageAlt} className="aspect-[4/5] w-full object-cover" loading="eager" />
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-gradient-to-t from-black/30 via-transparent to-white/5" />
        </div>
      </motion.div>

      {/* Floating fact chips: static content, gently bobbing unless reduced motion is requested. */}
      <motion.div
        aria-hidden
        animate={reduced ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-3 bottom-10 z-30 hidden rounded-xl border border-white/10 bg-surface-elevated/80 px-3 py-2 text-xs font-medium text-slate-200 shadow-lg backdrop-blur sm:block"
      >
        React · TypeScript
      </motion.div>
      <motion.div
        aria-hidden
        animate={reduced ? undefined : { y: [0, 6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-3 top-12 z-30 hidden rounded-xl border border-white/10 bg-surface-elevated/80 px-3 py-2 text-xs font-medium text-slate-200 shadow-lg backdrop-blur sm:block"
      >
        Quote calculators
      </motion.div>

      {/* 3D layer sits behind the portrait so the face is never covered; it never captures pointer events. */}
      {can3D && sceneReady && (
        <div aria-hidden className="pointer-events-none absolute inset-y-[-32%] -inset-x-[55%] z-0">
          <ErrorBoundary fallback={null}>
            <Suspense fallback={null}>
              <HeroSceneGate active={active} />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}
    </div>
  );
}

/** Unmounts the WebGL canvas while the hero is off-screen so it does not burn battery. */
function HeroSceneGate({ active }: { active: boolean }) {
  if (!active) return null;
  return <HeroScene />;
}
