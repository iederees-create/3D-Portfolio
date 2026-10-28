import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BadgeCheck, Search, X } from 'lucide-react';
import { certificates, dateKey } from '../data/certificates';

type SortKey = 'newest' | 'oldest' | 'topic';

const issuerOf = (issuer: string) => issuer.split(' · ')[0];

/** Searchable, filterable grid of every certificate. Verify links appear only where one exists. */
export default function CertificateExplorer() {
  const reduced = useReducedMotion();
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('All');
  const [issuer, setIssuer] = useState('All');
  const [verifiableOnly, setVerifiableOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>('newest');

  const topics = useMemo(() => {
    const counts = new Map<string, number>();
    certificates.forEach((c) => counts.set(c.topic, (counts.get(c.topic) ?? 0) + 1));
    return [...counts.entries()];
  }, []);
  const issuers = useMemo(() => [...new Set(certificates.map((c) => issuerOf(c.issuer)))].sort(), []);

  const filtered = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const list = certificates.filter((c) => {
      if (topic !== 'All' && c.topic !== topic) return false;
      if (issuer !== 'All' && issuerOf(c.issuer) !== issuer) return false;
      if (verifiableOnly && !c.url) return false;
      const text = `${c.name} ${c.issuer} ${c.topic} ${c.date}`.toLowerCase();
      return words.every((w) => text.includes(w));
    });
    return [...list].sort((a, b) => {
      if (sort === 'topic') return a.topic.localeCompare(b.topic) || dateKey(b.date) - dateKey(a.date);
      return sort === 'newest' ? dateKey(b.date) - dateKey(a.date) : dateKey(a.date) - dateKey(b.date);
    });
  }, [query, topic, issuer, verifiableOnly, sort]);

  const filtersActive = topic !== 'All' || issuer !== 'All' || verifiableOnly || query.trim() !== '';
  const reset = () => {
    setQuery('');
    setTopic('All');
    setIssuer('All');
    setVerifiableOnly(false);
  };

  const chip = (active: boolean) =>
    `rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
      active ? 'bg-white text-black' : 'border border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:text-white'
    }`;

  return (
    <div>
      <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative block flex-1">
            <span className="sr-only">Search certificates</span>
            <Search size={15} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search certificates (e.g. Python, MIT, 2023)…"
              className="w-full rounded-full border border-white/10 bg-black/20 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-primary-400/60 focus:outline-none focus:ring-2 focus:ring-primary-400/30"
            />
          </label>
          <div className="flex gap-2">
            <label className="sr-only" htmlFor="cert-issuer">Issuer</label>
            <select id="cert-issuer" value={issuer} onChange={(e) => setIssuer(e.target.value)} className="min-w-0 flex-1 sm:flex-none rounded-full border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-400/30">
              <option value="All">All issuers</option>
              {issuers.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
            <label className="sr-only" htmlFor="cert-sort">Sort</label>
            <select id="cert-sort" value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="min-w-0 flex-1 sm:flex-none rounded-full border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-400/30">
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="topic">By topic</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter certificates by topic">
          <button type="button" aria-pressed={topic === 'All'} onClick={() => setTopic('All')} className={chip(topic === 'All')}>
            All <span className="opacity-60">{certificates.length}</span>
          </button>
          {topics.map(([name, count]) => (
            <button key={name} type="button" aria-pressed={topic === name} onClick={() => setTopic(topic === name ? 'All' : name)} className={chip(topic === name)}>
              {name} <span className="opacity-60">{count}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-3 text-sm">
          <label className="flex cursor-pointer items-center gap-2 text-slate-300">
            <input type="checkbox" checked={verifiableOnly} onChange={(e) => setVerifiableOnly(e.target.checked)} className="h-4 w-4 rounded border-white/20 bg-black/30 accent-[var(--color-primary-500)]" />
            Only certificates with a verification link
          </label>
          <div className="flex items-center gap-3 text-slate-400" aria-live="polite">
            <span>Showing <strong className="text-white">{filtered.length}</strong> of {certificates.length}</span>
            {filtersActive && (
              <button type="button" onClick={reset} className="inline-flex items-center gap-1 text-xs font-semibold text-primary-300 hover:text-white">
                <X size={12} /> Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {filtered.length > 0 ? (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((cert) => (
              <motion.li
                key={cert.name}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-400/40 hover:bg-white/[0.06] motion-reduce:transform-none"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full bg-primary-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary-300">{cert.topic}</span>
                  <span className="shrink-0 rounded-full bg-white/5 px-2 py-0.5 font-mono text-[10px] text-slate-400">{cert.date}</span>
                </div>
                <h3 className="mt-3 text-sm font-semibold leading-snug text-white">{cert.name}</h3>
                <p className="mt-1.5 text-xs text-slate-500">{cert.issuer}</p>
                <div className="mt-auto pt-4">
                  {cert.url ? (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Verify certificate: ${cert.name}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-primary-400/30 bg-primary-500/10 px-3 py-1.5 text-xs font-semibold text-primary-200 transition-colors hover:bg-primary-500/20 hover:text-white"
                    >
                      <BadgeCheck size={14} /> Verify certificate
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-600">Certificate on file · no public link</span>
                  )}
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-white/15 p-10 text-center text-sm text-slate-400">
          No certificates match. <button type="button" onClick={reset} className="font-semibold text-primary-300 underline-offset-4 hover:underline">Reset filters</button>
        </div>
      )}
    </div>
  );
}
