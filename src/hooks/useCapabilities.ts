import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/** True when the browser can create a WebGL context. Result is cached. */
let webglCache: boolean | null = null;
export function webglSupported(): boolean {
  if (webglCache !== null) return webglCache;
  try {
    const canvas = document.createElement('canvas');
    webglCache = Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    webglCache = false;
  }
  return webglCache;
}

interface NavigatorHints {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
  hardwareConcurrency?: number;
}

/**
 * Decides whether heavy 3D should render at all. 3D is skipped for visitors who
 * prefer reduced motion, have Data Saver on, a small screen, a low-core / low-memory
 * device, or no WebGL. Callers must always provide a static fallback.
 */
export function useCan3D(minWidth = 768): boolean {
  const reduced = useReducedMotion();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const check = () => {
      const nav = navigator as Navigator & NavigatorHints;
      const saveData = Boolean(nav.connection?.saveData);
      const lowCpu = (nav.hardwareConcurrency ?? 8) < 4;
      const lowMemory = (nav.deviceMemory ?? 8) < 4;
      setOk(!reduced && !saveData && !lowCpu && !lowMemory && window.innerWidth >= minWidth && webglSupported());
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [reduced, minWidth]);

  return ok;
}

/** True only for mouse-like pointers (not touch). */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return fine;
}

/** Tracks whether an element is on screen, so WebGL loops can pause off-screen. */
export function useOnScreen<T extends Element>(rootMargin = '100px') {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin });
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  const [tabVisible, setTabVisible] = useState(true);
  useEffect(() => {
    const onChange = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  return { ref, active: visible && tabVisible };
}
