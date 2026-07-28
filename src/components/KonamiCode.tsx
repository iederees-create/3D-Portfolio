import { useEffect, useState } from 'react';
import MiniGame from './MiniGame';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export default function KonamiCode() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't listen if game is already showing
      if (showGame) return;
      
      const key = e.key;
      setSequence(prev => {
        const nextSeq = [...prev, key];
        // Keep only the last N keys
        if (nextSeq.length > KONAMI_CODE.length) {
          nextSeq.shift();
        }
        
        // Check if sequence matches
        if (nextSeq.join(',') === KONAMI_CODE.join(',')) {
          setShowGame(true);
          return [];
        }
        return nextSeq;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showGame]);

  if (showGame) {
    return <MiniGame onClose={() => setShowGame(false)} />;
  }

  return null;
}
