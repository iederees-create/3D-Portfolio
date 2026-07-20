import { useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, Square, Volume2 } from 'lucide-react';

type Props = { text: string; audioSrc?: string; label?: string };

export default function AudioNarrationPlayer({ text, audioSrc, label = 'Listen to this page' }: Props) {
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const cleanText = useMemo(() => text.replace(/\s+/g, ' ').trim(), [text]);

  useEffect(() => () => { if (supported) window.speechSynthesis.cancel(); }, [supported]);
  function listen() {
    if (audioSrc && audioRef.current) { void audioRef.current.play(); return; }
    if (!supported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.onstart = () => { setSpeaking(true); setPaused(false); };
    utterance.onend = () => { setSpeaking(false); setPaused(false); };
    window.speechSynthesis.speak(utterance);
  }
  function stop() { if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; } if (supported) window.speechSynthesis.cancel(); setSpeaking(false); setPaused(false); }
  function pause() { if (audioRef.current) audioRef.current.pause(); else window.speechSynthesis.pause(); setPaused(true); }
  function resume() { if (audioRef.current) void audioRef.current.play(); else window.speechSynthesis.resume(); setPaused(false); }
  return <section className="my-6 rounded-2xl border border-primary-400/20 bg-primary-400/5 p-4" aria-label={label}>
    <div className="flex flex-wrap items-center gap-2">
      <Volume2 size={17} className="text-primary-300" aria-hidden="true" />
      <strong className="mr-auto text-sm text-white">{label}</strong>
      {audioSrc && <audio ref={audioRef} controls preload="none" src={audioSrc} className="w-full sm:order-last" onPlay={() => setSpeaking(true)} onPause={() => setSpeaking(false)} />}
      <button type="button" onClick={listen} className="inline-flex items-center gap-1 rounded-lg bg-primary-400 px-3 py-2 text-xs font-bold text-slate-950" aria-label="Listen"><Play size={13} /> Listen</button>
      <button type="button" onClick={paused ? resume : pause} disabled={!speaking} className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-200 disabled:opacity-40" aria-label={paused ? 'Resume' : 'Pause'}>{paused ? <RotateCcw size={13} /> : <Pause size={13} />}{paused ? 'Resume' : 'Pause'}</button>
      <button type="button" onClick={stop} className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-200" aria-label="Stop"><Square size={13} /> Stop</button>
    </div>
    {!audioSrc && <p className="mt-2 text-xs text-slate-500">Audio generated on your device. Voice may vary by browser. No API key required.</p>}
  </section>;
}
