import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  MessageCircle,
  Send,
  CheckCircle2,
  Sparkles,
  Phone,
  Clock,
  Globe,
  ChevronRight,
} from 'lucide-react';
import { PROFILE_IMAGE_ALT, PROFILE_IMAGE_PATH, PROFILE_NAME, publicAsset } from '../lib/site';

// ─── Constants ────────────────────────────────────────────
const WHATSAPP_NUMBER = '27629494708';
const EMAIL = 'iedereesfrancis@gmail.com';

function buildWALink(source: string, interest: string, name: string, extra: string) {
  const msg = encodeURIComponent(
    `👋 Hi Iederees! I found you on your portfolio.\n\n` +
    `🔗 *Source:* ${source}\n` +
    `👤 *My name:* ${name}\n` +
    `💡 *I'm interested in:* ${interest}\n` +
    (extra ? `📝 *Extra notes:* ${extra}\n` : '') +
    `\nLooking forward to chatting!`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

// ─── Mini fact-finder before WhatsApp ─────────────────────
type BotStep = 'name' | 'interest' | 'extra' | 'done';

const INTERESTS = [
  '🌐 Custom website build',
  '🎨 Website template',
  '📊 Dashboard / data product',
  '🧮 Quote calculator / planner',
  '📣 Digital marketing strategy',
  '💬 Just want to chat',
];

function WhatsAppFinder({ source }: { source: string }) {
  const [step, setStep] = useState<BotStep>('name');
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('');
  const [extra, setExtra] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [extraInput, setExtraInput] = useState('');

  function submitName() {
    if (!nameInput.trim()) return;
    setName(nameInput.trim());
    setStep('interest');
  }

  function selectInterest(opt: string) {
    setInterest(opt);
    setStep('extra');
  }

  function submitExtra() {
    setExtra(extraInput.trim());
    setStep('done');
  }

  function openWhatsApp() {
    window.open(buildWALink(source, interest, name, extra), '_blank');
  }

  return (
    <div className="space-y-5">
      <AnimatePresence mode="wait">

        {/* Step 1 — Name */}
        {step === 'name' && (
          <motion.div key="name" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-3">
            <p className="text-sm text-slate-300 font-medium">👋 What's your name?</p>
            <div className="flex gap-2">
              <input
                autoFocus
                type="text"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && submitName()}
                placeholder="Your first name…"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-green-500/40 transition-colors"
              />
              <button
                onClick={submitName}
                disabled={!nameInput.trim()}
                className="px-4 py-2.5 rounded-xl text-white text-sm font-semibold bg-green-600 hover:bg-green-500 transition-colors disabled:opacity-30"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2 — Interest */}
        {step === 'interest' && (
          <motion.div key="interest" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-3">
            <p className="text-sm text-slate-300 font-medium">Nice to meet you, {name}! 🎉 What can I help you with?</p>
            <div className="grid gap-2">
              {INTERESTS.map(opt => (
                <button
                  key={opt}
                  onClick={() => selectInterest(opt)}
                  className="text-left px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-green-500/10 hover:border-green-500/30 hover:text-white transition-all flex items-center justify-between"
                >
                  <span>{opt}</span>
                  <ChevronRight size={13} className="text-slate-600" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3 — Extra notes */}
        {step === 'extra' && (
          <motion.div key="extra" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-3">
            <p className="text-sm text-slate-300 font-medium">Almost there! Anything specific you'd like me to know? <span className="text-slate-500">(optional)</span></p>
            <textarea
              autoFocus
              value={extraInput}
              onChange={e => setExtraInput(e.target.value)}
              placeholder="e.g. industry, budget, timeline, ideas…"
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-green-500/40 transition-colors resize-none"
            />
            <button
              onClick={submitExtra}
              className="w-full py-3 rounded-xl text-sm font-bold text-white bg-green-600 hover:bg-green-500 transition-colors"
            >
              Continue →
            </button>
          </motion.div>
        )}

        {/* Step 4 — Open WhatsApp */}
        {step === 'done' && (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="space-y-3 text-center">
            <CheckCircle2 size={36} className="mx-auto text-green-400" />
            <p className="text-white font-semibold text-sm">All set, {name}! 🎉</p>
            <p className="text-slate-400 text-xs leading-relaxed">
              Your message is ready with all your details pre-filled. Tap below to open WhatsApp and send it to me directly.
            </p>
            <button
              onClick={openWhatsApp}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-bold text-sm text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/20"
              style={{ background: 'linear-gradient(135deg, #25d366, #128c7e)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.553 4.104 1.517 5.829L.057 23.571a.5.5 0 0 0 .637.612l5.9-1.545A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.9 9.9 0 0 1-5.031-1.371l-.36-.214-3.732.978.996-3.647-.235-.374A9.861 9.861 0 0 1 2.1 12C2.1 6.533 6.533 2.1 12 2.1c5.466 0 9.9 4.433 9.9 9.9 0 5.467-4.434 9.9-9.9 9.9z"/>
              </svg>
              Open WhatsApp Chat
            </button>
            <button onClick={() => { setStep('name'); setNameInput(''); setName(''); setInterest(''); setExtra(''); setExtraInput(''); }} className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
              Start over
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

// ─── Email form ───────────────────────────────────────────
function EmailForm() {
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Build a mailto link with the filled details
    const subject = encodeURIComponent(`Portfolio enquiry from ${fields.name}`);
    const body = encodeURIComponent(
      `Name: ${fields.name}\nEmail: ${fields.email}\n\nMessage:\n${fields.message}\n\n---\nSent from the NextGenWebs portfolio contact form.`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6 space-y-3">
        <CheckCircle2 size={36} className="mx-auto text-primary-400" />
        <p className="text-white font-semibold">Your email client just opened!</p>
        <p className="text-slate-400 text-xs leading-relaxed">Your message is pre-filled. Just hit send in your email app and I'll reply within 24 hours.</p>
        <button onClick={() => { setSent(false); setFields({ name: '', email: '', message: '' }); }} className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Send another</button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-slate-500 mb-1.5 font-medium uppercase tracking-wide">Your name</label>
          <input
            required
            type="text"
            value={fields.name}
            onChange={e => setFields(f => ({ ...f, name: e.target.value }))}
            placeholder="John Smith"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-primary-500/40 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1.5 font-medium uppercase tracking-wide">Your email</label>
          <input
            required
            type="email"
            value={fields.email}
            onChange={e => setFields(f => ({ ...f, email: e.target.value }))}
            placeholder="you@email.com"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-primary-500/40 transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs text-slate-500 mb-1.5 font-medium uppercase tracking-wide">Message</label>
        <textarea
          required
          value={fields.message}
          onChange={e => setFields(f => ({ ...f, message: e.target.value }))}
          placeholder="Tell me what you're looking to build…"
          rows={4}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-primary-500/40 transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm text-black bg-white hover:bg-slate-200 transition-colors"
      >
        <Send size={15} /> Send via Email
      </button>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────
export default function ContactPage() {
  const [tab, setTab] = useState<'whatsapp' | 'email'>('whatsapp');

  const infoCards = [
    { icon: '⚡', label: 'Response time', value: 'Within 24 hours' },
    { icon: '📍', label: 'Location', value: 'Cape Town, SA' },
    { icon: Clock, label: 'Office hours', value: 'Mon–Fri, 8am–6pm' },
    { icon: Globe, label: 'Available for', value: 'Remote worldwide' },
  ];

  return (
    <section className="relative min-h-screen py-24 px-4 sm:px-6 pt-32">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="relative mx-auto mb-6 inline-block">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary-400/40 via-cyan-400/20 to-transparent blur-md" />
            <img
              src={publicAsset(PROFILE_IMAGE_PATH)}
              alt={PROFILE_IMAGE_ALT}
              width={96}
              height={96}
              className="relative h-24 w-24 rounded-full object-cover border-2 border-white/15 shadow-xl shadow-primary-500/20"
              decoding="async"
            />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs font-medium text-primary-300 mb-5">
            <Sparkles size={11} />
            Let's work together
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Get in touch
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Whether you have a project in mind or just want to explore what's possible — message {PROFILE_NAME} directly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">

          {/* Left — contact channels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
          >
            {/* Tab switcher */}
            <div className="flex gap-1 p-1 rounded-2xl bg-white/5 border border-white/5 mb-6">
              <button
                onClick={() => setTab('whatsapp')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  tab === 'whatsapp'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.553 4.104 1.517 5.829L.057 23.571a.5.5 0 0 0 .637.612l5.9-1.545A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.9 9.9 0 0 1-5.031-1.371l-.36-.214-3.732.978.996-3.647-.235-.374A9.861 9.861 0 0 1 2.1 12C2.1 6.533 6.533 2.1 12 2.1c5.466 0 9.9 4.433 9.9 9.9 0 5.467-4.434 9.9-9.9 9.9z"/>
                </svg>
                WhatsApp
              </button>
              <button
                onClick={() => setTab('email')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  tab === 'email'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Mail size={15} /> Email
              </button>
            </div>

            <AnimatePresence mode="wait">
              {tab === 'whatsapp' ? (
                <motion.div key="wa" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    Answer 3 quick questions and your details will be pre-filled in WhatsApp so I can pick up the conversation instantly.
                  </p>
                  <WhatsAppFinder source="Contact page — NextGenWebs portfolio" />
                </motion.div>
              ) : (
                <motion.div key="email" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    Fill in the form and your email client will open with everything pre-filled. I reply within 24 hours.
                  </p>
                  <EmailForm />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right — info + direct links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Direct contact links */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-3">
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Direct contact</h2>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Iederees! I found you on your portfolio and want to chat 👋')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/15 hover:border-green-500/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={18} className="text-green-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">WhatsApp</p>
                  <p className="text-sm text-white font-semibold group-hover:text-green-300 transition-colors">+27 62 949 4708</p>
                </div>
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-primary-500/10 border border-primary-500/20 hover:bg-primary-500/15 hover:border-primary-500/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-primary-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Email</p>
                  <p className="text-sm text-white font-semibold group-hover:text-primary-300 transition-colors truncate">{EMAIL}</p>
                </div>
              </a>

              <a
                href="tel:+27629494708"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-slate-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Phone</p>
                  <p className="text-sm text-white font-semibold group-hover:text-white transition-colors">+27 62 949 4708</p>
                </div>
              </a>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-2 gap-3">
              {infoCards.map(item => (
                <div key={item.label} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-xl mb-2">{typeof item.icon === 'string' ? item.icon : <item.icon size={18} className="text-slate-400" />}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-0.5">{item.label}</div>
                  <div className="text-sm font-semibold text-white">{item.value}</div>
                </div>
              ))}
            </div>

            {/* Nova bot nudge */}
            <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles size={14} className="text-indigo-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-indigo-300 mb-1">Nova · Quote Bot</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Want a full project quote? Use the <strong className="text-white">floating purple button</strong> on any page to get a detailed quote via WhatsApp in under 2 minutes.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
