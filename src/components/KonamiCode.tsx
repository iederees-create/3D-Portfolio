import { useEffect, useState } from 'react';
import MiniGame from './MiniGame';
import { useMember } from './contexts/MemberContext';

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
  const { memberId, openVIPModal } = useMember();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't listen if game is already showing
      if (showGame) return;
      
      const key = e.key;
      setSequence(prev => {
        const nextSeq = [...prev, key];
        if (nextSeq.length > KONAMI_CODE.length) {
          nextSeq.shift();
        }
        
        if (nextSeq.join(',') === KONAMI_CODE.join(',')) {
          if (!memberId) {
            openVIPModal();
          } else {
            setShowGame(true);
          }
          return [];
        }
        return nextSeq;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showGame, memberId, openVIPModal]);

  if (showGame) {
    return <MiniGame onClose={() => setShowGame(false)} />;
  }

  return null;
}
