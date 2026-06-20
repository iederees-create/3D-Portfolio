import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, ChevronRight, Check, Sparkles, ArrowRight } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────
type OptionStep = {
  type: 'options';
  key: string;
  question: string;
  options: string[];
  multi?: boolean;
};
type InputStep = {
  type: 'input';
  key: string;
  question: string;
  placeholder: string;
  inputType?: string;
};
type Step = OptionStep | InputStep;

interface Message {
  from: 'bot' | 'user';
  text: string;
}

// ─── Quote flow steps ────────────────────────────────────
const STEPS: Step[] = [
  {
    type: 'input',
    key: 'name',
    question: "Hi! 👋 I'm Nova, the NextGenWebs quote assistant.\n\nLet's get you a custom website quote in under 2 minutes.\n\nWhat's your name?",
    placeholder: 'Your first name…',
  },
  {
    type: 'input',
    key: 'businessName',
    question: "Nice to meet you, {name}! 🎉\n\nWhat's the name of your business?",
    placeholder: 'Business name…',
  },
  {
    type: 'options',
    key: 'industry',
    question: 'What type of business do you run?',
    options: ['🔧 Service (plumber, painter, etc.)', '💅 Beauty / Salon / Spa', '🍽️ Restaurant / Food', '📚 Education / Tutoring', '🛍️ Retail / Shop', '🏗️ Construction / Real Estate', '🎨 Creative / Arts', '💼 Other'],
  },
  {
    type: 'options',
    key: 'projectType',
    question: 'What do you need?',
    options: ['✨ Brand new website', '🔄 Redesign an existing site', '🎯 Single landing page', '🛒 Online store', '📱 Mobile-first site'],
  },
  {
    type: 'options',
    key: 'pages',
    question: 'Which pages do you need? (select all that apply)',
    options: ['🏠 Home', 'ℹ️ About', '🛠️ Services', '📞 Contact', '🖼️ Gallery / Portfolio', '📅 Booking / Appointments', '📝 Blog', '🛒 Shop'],
    multi: true,
  },
  {
    type: 'options',
    key: 'features',
    question: 'Any special features? (select all that apply)',
    options: ['📋 Contact / Quote form', '📅 Online booking system', '💬 WhatsApp chat button', '📸 Photo / Video gallery', '⭐ Testimonials section', '🗺️ Google Maps embed', '📲 Social media links', '🔍 SEO optimisation'],
    multi: true,
  },
  {
    type: 'options',
    key: 'budget',
    question: "What's your budget range for this project?",
    options: ['💚 Under R2,500', '💛 R2,500 – R5,000', '🟠 R5,000 – R10,000', '🔴 R10,000+', '🤷 Not sure yet'],
  },
  {
    type: 'options',
    key: 'timeline',
    question: 'When do you need the website?',
    options: ['🚀 ASAP (within 2 weeks)', '📅 Within 1 month', '🗓️ 2–3 months', '⏳ Flexible / No rush'],
  },
  {
    type: 'input',
    key: 'email',
    question: "Almost done! 🙌\n\nWhat's the best email address to reach you?",
    placeholder: 'your@email.com',
    inputType: 'email',
  },
  {
    type: 'input',
    key: 'phone',
    question: 'And your phone number? (so I can follow up quickly)',
    placeholder: '+27 …',
    inputType: 'tel',
  },
];

const YOUR_WHATSAPP = '27629494708';

function buildWhatsAppMessage(answers: Record<string, string | string[]>): string {
  const clean = (v: string | string[]) =>
    Array.isArray(v) ? v.map(s => s.replace(/^[^\s]+\s/, '')).join(', ') : v;

  return encodeURIComponent(
    `🌐 *NEW WEBSITE QUOTE REQUEST — NextGenWebs*\n\n` +
    `👤 *Client Name:* ${clean(answers.name)}\n` +
    `🏢 *Business:* ${clean(answers.businessName)}\n` +
    `🏭 *Industry:* ${clean(answers.industry)}\n\n` +
    `📋 *PROJECT DETAILS*\n` +
    `• Type: ${clean(answers.projectType)}\n` +
    `• Pages needed: ${clean(answers.pages)}\n` +
    `• Features: ${clean(answers.features)}\n\n` +
    `💰 *Budget:* ${clean(answers.budget)}\n` +
    `⏱️ *Timeline:* ${clean(answers.timeline)}\n\n` +
    `📬 *CONTACT DETAILS*\n` +
    `• Email: ${clean(answers.email)}\n` +
    `• Phone: ${clean(answers.phone)}\n\n` +
    `_Sent via NextGenWebs portfolio chat — iederees-create.github.io/3D-Portfolio/_`
  );
}

// ─── Main Component ──────────────────────────────────────
export default function QuoteChat() {
  const [open, setOpen] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [multiSel, setMultiSel] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentStep = STEPS[stepIdx];

  // Interpolate {name} etc in questions
  function renderQuestion(q: string) {
    return q.replace(/\{(\w+)\}/g, (_, k) => (answers[k] as string) || '');
  }

  // Post a bot message with typing delay
  function botSay(text: string, delay = 600) {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text }]);
    }, delay);
  }

  // Initialise first message on open
  useEffect(() => {
    if (open && messages.length === 0) {
      botSay(renderQuestion(STEPS[0].question), 400);
    }
  }, [open]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // Focus input when step changes
  useEffect(() => {
    if (currentStep?.type === 'input') {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [stepIdx]);

  function advanceStep(answer: string | string[]) {
    const step = STEPS[stepIdx];
    const newAnswers = { ...answers, [step.key]: answer };
    setAnswers(newAnswers);

    const next = stepIdx + 1;
    if (next >= STEPS.length) {
      // All done
      botSay("Perfect! I have everything I need. 🎉\n\nClick the button below to send your details directly to me on WhatsApp and I'll get back to you with a personalised quote!", 800);
      setDone(true);
    } else {
      const nextQ = renderQuestion(STEPS[next].question).replace(/\{name\}/g, (newAnswers.name as string) || '');
      botSay(nextQ, 700);
      setStepIdx(next);
      setMultiSel([]);
    }
  }

  function handleInputSubmit() {
    const val = inputVal.trim();
    if (!val) return;
    setMessages(prev => [...prev, { from: 'user', text: val }]);
    setInputVal('');
    advanceStep(val);
  }

  function handleOptionClick(opt: string) {
    if (currentStep.type !== 'options') return;
    if (currentStep.multi) {
      setMultiSel(prev =>
        prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]
      );
    } else {
      setMessages(prev => [...prev, { from: 'user', text: opt }]);
      advanceStep(opt);
    }
  }

  function confirmMulti() {
    if (multiSel.length === 0) return;
    setMessages(prev => [...prev, { from: 'user', text: multiSel.join(', ') }]);
    advanceStep(multiSel);
  }

  function handleWhatsApp() {
    const msg = buildWhatsAppMessage(answers);
    window.open(`https://wa.me/${YOUR_WHATSAPP}?text=${msg}`, '_blank');
  }

  function restart() {
    setStepIdx(0);
    setAnswers({});
    setMessages([]);
    setInputVal('');
    setMultiSel([]);
    setDone(false);
    botSay(renderQuestion(STEPS[0].question), 400);
  }

  const progress = Math.round(((done ? STEPS.length : stepIdx) / STEPS.length) * 100);

  return (
    <>
      {/* ── Floating trigger button ── */}
      <motion.button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-full font-semibold text-sm text-white shadow-2xl shadow-indigo-500/30 transition-all ${open ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100 scale-100'}`}
        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
        whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(99,102,241,0.5)' }}
        whileTap={{ scale: 0.97 }}
      >
        <MessageCircle size={18} />
        Get a Free Quote
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-indigo-500" />
      </motion.button>

      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
            style={{ height: '560px', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-none">Nova · Quote Assistant</p>
                  <p className="text-indigo-200 text-[10px] mt-0.5">NextGenWebs · Replies instantly</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-white/10" style={{ background: '#1a1f35' }}>
              <motion.div
                className="h-full"
                style={{ background: 'linear-gradient(90deg, #6366f1, #a78bfa)' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ background: '#0d1120' }}>
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.from === 'bot'
                          ? 'bg-white/8 text-slate-200 rounded-tl-sm border border-white/5'
                          : 'text-white rounded-tr-sm'
                      }`}
                      style={msg.from === 'user' ? { background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' } : {}}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {typing && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-1 px-3.5 py-2.5 rounded-2xl rounded-tl-sm bg-white/8 border border-white/5">
                      {[0, 1, 2].map(i => (
                        <motion.span
                          key={i}
                          className="block w-1.5 h-1.5 rounded-full bg-indigo-400"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Input / Options area */}
            <div className="px-3 py-3 border-t border-white/5" style={{ background: '#0d1120' }}>
              {!done && !typing && (
                <>
                  {currentStep?.type === 'options' && (
                    <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1 mb-2">
                      {(currentStep as OptionStep).options.map(opt => {
                        const sel = multiSel.includes(opt);
                        return (
                          <button
                            key={opt}
                            onClick={() => handleOptionClick(opt)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all flex items-center justify-between gap-2 ${
                              sel
                                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                                : 'bg-white/5 text-slate-300 border border-white/5 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            <span>{opt}</span>
                            {sel && <Check size={13} className="text-indigo-400 shrink-0" />}
                            {!currentStep.multi && <ChevronRight size={13} className="text-slate-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {currentStep?.type === 'options' && (currentStep as OptionStep).multi && (
                    <button
                      onClick={confirmMulti}
                      disabled={multiSel.length === 0}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-30"
                      style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                    >
                      Confirm selection ({multiSel.length}) <ArrowRight size={14} />
                    </button>
                  )}

                  {currentStep?.type === 'input' && (
                    <div className="flex gap-2">
                      <input
                        ref={inputRef}
                        type={(currentStep as InputStep).inputType || 'text'}
                        value={inputVal}
                        onChange={e => setInputVal(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleInputSubmit()}
                        placeholder={(currentStep as InputStep).placeholder}
                        className="flex-1 bg-white/5 border border-white/8 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/50 transition-colors"
                      />
                      <button
                        onClick={handleInputSubmit}
                        disabled={!inputVal.trim()}
                        className="p-2.5 rounded-xl text-white transition-all disabled:opacity-30"
                        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                      >
                        <Send size={15} />
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Done state — WhatsApp CTA */}
              {done && !typing && (
                <div className="space-y-2">
                  <button
                    onClick={handleWhatsApp}
                    className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #25d366, #128c7e)', boxShadow: '0 0 20px rgba(37,211,102,0.3)' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.553 4.104 1.517 5.829L.057 23.571a.5.5 0 0 0 .637.612l5.9-1.545A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.9 9.9 0 0 1-5.031-1.371l-.36-.214-3.732.978.996-3.647-.235-.374A9.861 9.861 0 0 1 2.1 12C2.1 6.533 6.533 2.1 12 2.1c5.466 0 9.9 4.433 9.9 9.9 0 5.467-4.434 9.9-9.9 9.9z"/></svg>
                    Send via WhatsApp
                  </button>
                  <button
                    onClick={restart}
                    className="w-full py-2.5 rounded-xl text-xs text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    Start over
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
