import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TermIcon } from 'lucide-react';

export default function TerminalEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ type: 'input' | 'output', text: string }[]>([
    { type: 'output', text: 'Welcome to the NextGenWebs interactive terminal. Type "help" to see available commands.' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let output = '';

    switch (trimmed) {
      case 'help':
        output = 'Available commands: help, whoami, projects, clear, contact, sudo';
        break;
      case 'whoami':
        output = 'Guest user exploring a top-tier developer portfolio.';
        break;
      case 'projects':
        output = 'Fetching projects... 12 active projects found. Scroll up on the main page to see them!';
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'contact':
        output = 'Email: iedereesfrancis@gmail.com | WhatsApp: +27 62 949 4708';
        break;
      case 'sudo':
        output = 'nice try ;)';
        break;
      case '':
        return;
      default:
        output = `Command not found: ${trimmed}`;
    }

    setHistory(prev => [...prev, { type: 'input', text: cmd }, { type: 'output', text: output }]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    handleCommand(input);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 h-64 bg-slate-900/95 backdrop-blur-md border-t border-slate-700 z-[100] shadow-2xl flex flex-col font-mono text-sm"
        >
          <div className="flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-slate-700">
            <div className="flex items-center gap-2 text-slate-400">
              <TermIcon size={14} />
              <span>developer@nextgenwebs:~</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
            {history.map((line, i) => (
              <div key={i} className={`mb-1 ${line.type === 'input' ? 'text-emerald-400' : 'text-slate-300'}`}>
                {line.type === 'input' && <span className="text-slate-500 mr-2">$</span>}
                {line.text}
              </div>
            ))}
            <form onSubmit={onSubmit} className="flex mt-2">
              <span className="text-slate-500 mr-2">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-emerald-400 caret-emerald-400"
                autoComplete="off"
                spellCheck="false"
              />
            </form>
            <div ref={bottomRef} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
