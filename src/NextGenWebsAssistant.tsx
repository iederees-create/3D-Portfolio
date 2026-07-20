import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, ExternalLink, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { answerLocally } from './utils/localAssistantEngine';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const quickPrompts = [
  'What can you build for me?',
  'Show me website templates',
  'Do you build AI chatbots?',
  'How do I request a quote?',
  'What makes your work different?',
];

const welcomeMessage: ChatMessage = {
  role: 'assistant',
  content:
    'I’m a demo assistant trained on NextGenWebs services and projects. Ask about templates, Hydro Clean, AI chatbots, pricing direction, or how to request a quote.',
};

export default function NextGenWebsAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing, open]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('assistant') === 'open') setOpen(true);
  }, []);

  async function sendMessage(prompt?: string) {
    const content = (prompt ?? input).trim();
    if (!content || typing) return;

    const nextMessages = [...messages, { role: 'user' as const, content }];
    setMessages(nextMessages);
    setInput('');
    setError('');
    setTyping(true);

    try {
      const data = answerLocally(content);
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content:
            data.answer,
        },
      ]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'The assistant is unavailable right now.';
      setError(`${message} You can still use the contact page to reach NextGenWebs.`);
    } finally {
      setTyping(false);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage();
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        className={`fixed bottom-5 right-4 z-50 flex items-center gap-2 rounded-full border border-cyan-300/30 bg-slate-950/95 px-4 py-3 text-sm font-bold text-white shadow-2xl shadow-cyan-500/20 backdrop-blur transition-all sm:bottom-6 sm:right-6 sm:px-5 ${open ? 'pointer-events-none scale-95 opacity-0' : 'opacity-100'}`}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        <Bot size={18} className="text-cyan-300" />
        <span>Ask NextGenWebs AI</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[100dvh] flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-surface-elevated shadow-2xl shadow-black/60 sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[640px] sm:w-[410px] sm:rounded-3xl"
            aria-label="Ask NextGenWebs AI assistant"
          >
            <header className="border-b border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10">
                    <Sparkles size={18} className="text-cyan-300" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">Portfolio assistant</p>
                    <h2 className="text-base font-bold text-white">NextGenWebs local assistant</h2>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 hover:bg-white/10 hover:text-white"
                  aria-label="Close assistant"
                >
                  <X size={17} />
                </button>
              </div>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[88%] rounded-2xl border px-4 py-3 text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'ml-auto border-cyan-300/25 bg-cyan-300/12 text-cyan-50'
                      : 'border-white/10 bg-white/[0.04] text-slate-200'
                  }`}
                >
                  {message.content}
                </div>
              ))}
              {typing && (
                <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
                  Thinking
                </div>
              )}
              {error && (
                <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm leading-relaxed text-amber-100">
                  {error}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="border-t border-white/10 p-4">
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-white/[0.08] hover:text-white"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-[1fr_auto] gap-2">
                <label className="sr-only" htmlFor="nextgenwebs-ai-message">Ask NextGenWebs AI</label>
                <input
                  id="nextgenwebs-ai-message"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  maxLength={1800}
                  placeholder="Ask about services, templates, AI tools..."
                  className="min-h-12 rounded-2xl border border-white/10 bg-black/25 px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/50"
                />
                <button
                  type="submit"
                  className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300 text-slate-950 hover:bg-cyan-200 disabled:opacity-50"
                  disabled={typing || !input.trim()}
                  aria-label="Send message"
                >
                  <Send size={17} />
                </button>
              </form>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span>Demo mode: local assistant · No API key required · No guaranteed results.</span>
                <Link to="/contact/" onClick={() => setOpen(false)} className="inline-flex items-center gap-1 font-semibold text-cyan-300 hover:text-cyan-200">
                  Request a quote <ExternalLink size={12} />
                </Link>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
