import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export default function KonamiCode() {
  const [sequence, setSequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      setSequence(prev => {
        const nextSeq = [...prev, key];
        // Keep only the last N keys
        if (nextSeq.length > KONAMI_CODE.length) {
          nextSeq.shift();
        }
        
        // Check if sequence matches
        if (nextSeq.join(',') === KONAMI_CODE.join(',')) {
          triggerEasterEgg();
          return [];
        }
        return nextSeq;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerEasterEgg = () => {
    // Add a fun class to the body to hack the visual styling
    document.body.classList.toggle('konami-active');
  };

  return null; // Headless component
}
