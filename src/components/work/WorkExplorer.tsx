import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { Project } from '../../pages/WorkPage';
import ProjectCardPro from './ProjectCardPro';
import CaseStudyModal from './CaseStudyModal';
import { categoryShort, hasGallery, searchText, techOf } from './workUtils';

interface Props {
  projects: Project[];
  slugOf: (project: Project) => string;
}

type SortKey = 'featured' | 'az';

const PARAM = 'project';

export default function WorkExplorer({ projects, slugOf }: Props) {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [techs, setTechs] = useState<string[]>([]);
  const [onlyCaseStudy, setOnlyCaseStudy] = useState(false);
  const [onlyGallery, setOnlyGallery] = useState(false);
  const [onlyTemplate, setOnlyTemplate] = useState(false);
  const [sort, setSort] = useState<SortKey>('featured');
  const [showAllTech, setShowAllTech] = useState(false);

  const indexed = useMemo(
    () => projects.map((project) => ({ project, slug: slugOf(project), tech: techOf(project), text: searchText(project) })),
    [projects, slugOf],
  );

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((p) => counts.set(p.category, (counts.get(p.category) ?? 0) + 1));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [projects]);

  const techCounts = useMemo(() => {
    const counts = new Map<string, number>();
    indexed.forEach((i) => i.tech.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [indexed]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = indexed.filter((i) => {
      if (category !== 'All' && i.project.category !== category) return false;
      if (techs.length > 0 && !techs.every((t) => i.tech.includes(t))) return false;
      if (onlyCaseStudy && !i.project.caseStudy) return false;
      if (onlyGallery && !hasGallery(i.project)) return false;
      if (onlyTemplate && !i.project.etsyUrl) return false;
      if (q && !q.split(/\s+/).every((word) => i.text.includes(word))) return false;
      return true;
    });
    if (sort === 'az') return [...list].sort((a, b) => a.project.title.localeCompare(b.project.title));
    // "Featured first" keeps the original curated order but lifts featured items.
    return [...list].sort((a, b) => Number(Boolean(b.project.featured)) - Number(Boolean(a.project.featured)));
  }, [indexed, query, category, techs, onlyCaseStudy, onlyGallery, onlyTemplate, sort]);

  const activeFilterCount =
    (category !== 'All' ? 1 : 0) + techs.length + (onlyCaseStudy ? 1 : 0) + (onlyGallery ? 1 : 0) + (onlyTemplate ? 1 : 0) + (query.trim() ? 1 : 0);

  function clearAll() {
    setQuery('');
    setCategory('All');
    setTechs([]);
    setOnlyCaseStudy(false);
    setOnlyGallery(false);
    setOnlyTemplate(false);
  }

  // The open case study lives in the URL (?project=slug) so it can be shared and survives refresh.
  const openSlug = params.get(PARAM);
  const openIndex = filtered.findIndex((i) => i.slug === openSlug);
  const opened = openIndex >= 0 ? filtered[openIndex] : indexed.find((i) => i.slug === openSlug);

  const open = useCallback(
    (slug: string) => {
      const next = new URLSearchParams(params);
      next.set(PARAM, slug);
      setParams(next, { replace: false });
    },
    [params, setParams],
  );
  const close = useCallback(() => {
    const next = new URLSearchParams(params);
    next.delete(PARAM);
    setParams(next, { replace: true });
  }, [params, setParams]);

  const step = (dir: 1 | -1) => {
    if (openIndex < 0 || filtered.length < 2) return;
    const target = filtered[(openIndex + dir + filtered.length) % filtered.length];
    const next = new URLSearchParams(params);
    next.set(PARAM, target.slug);
    setParams(next, { replace: true });
  };

  const visibleTech = showAllTech ? techCounts : techCounts.slice(0, 10);

  const pill = (active: boolean) =>
    `inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
      active ? 'bg-white text-black shadow-lg shadow-white/10' : 'border border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:text-white'
    }`;

  return (
    <>
      {/* Controls */}
      <div className="mb-8 space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative block flex-1">
            <span className="sr-only">Search projects</span>
            <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, industry or technology…"
              className="w-full rounded-full border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-primary-400/60 focus:outline-none focus:ring-2 focus:ring-primary-400/30"
            />
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-400">
            <SlidersHorizontal size={15} aria-hidden />
            <span className="sr-only sm:not-sr-only">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-400/30"
            >
              <option value="featured">Featured first</option>
              <option value="az">A – Z</option>
            </select>
          </label>
        </div>

        <div>
          <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500">Type</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by project type">
            <button type="button" onClick={() => setCategory('All')} aria-pressed={category === 'All'} className={pill(category === 'All')}>
              All <span className="text-xs opacity-60">{projects.length}</span>
            </button>
            {categories.map(([name, count]) => (
              <button key={name} type="button" onClick={() => setCategory(category === name ? 'All' : name)} aria-pressed={category === name} className={pill(category === name)}>
                {categoryShort[name] ?? name} <span className="text-xs opacity-60">{count}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500">Technology</p>
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by technology">
            {visibleTech.map(([name, count]) => {
              const active = techs.includes(name);
              return (
                <button
                  key={name}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setTechs(active ? techs.filter((t) => t !== name) : [...techs, name])}
                  className={`${pill(active)} !px-3 !py-1.5 !text-xs font-mono`}
                >
                  {name} <span className="opacity-60">{count}</span>
                </button>
              );
            })}
            {techCounts.length > 10 && (
              <button type="button" onClick={() => setShowAllTech((v) => !v)} className="px-2 py-1.5 text-xs font-semibold text-primary-300 hover:text-white">
                {showAllTech ? 'Show fewer' : `Show all (${techCounts.length})`}
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/5 pt-4">
          {[
            { label: 'Has case study', value: onlyCaseStudy, set: setOnlyCaseStudy },
            { label: 'Has screenshot gallery', value: onlyGallery, set: setOnlyGallery },
            { label: 'Template for sale on Etsy', value: onlyTemplate, set: setOnlyTemplate },
          ].map(({ label, value, set }) => (
            <label key={label} className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
              <input type="checkbox" checked={value} onChange={(e) => set(e.target.checked)} className="h-4 w-4 rounded border-white/20 bg-black/30 accent-[var(--color-primary-500)]" />
              {label}
            </label>
          ))}
          <div className="ml-auto flex items-center gap-3 text-sm">
            <span className="text-slate-400" aria-live="polite">
              Showing <strong className="text-white">{filtered.length}</strong> of {projects.length}
            </span>
            {activeFilterCount > 0 && (
              <button type="button" onClick={clearAll} className="inline-flex items-center gap-1 text-xs font-semibold text-primary-300 hover:text-white">
                <X size={13} /> Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((i, idx) => (
              <ProjectCardPro key={i.project.title} project={i.project} index={idx} onOpen={() => open(i.slug)} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="rounded-3xl border border-dashed border-white/15 p-12 text-center">
          <p className="text-lg font-semibold text-white">No projects match those filters.</p>
          <p className="mt-2 text-sm text-slate-400">Try removing a filter or searching for something broader.</p>
          <button type="button" onClick={clearAll} className="mt-5 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black hover:bg-slate-200">
            Clear filters
          </button>
        </div>
      )}

      <AnimatePresence>
        {opened && (
          <CaseStudyModal
            key={opened.slug}
            project={opened.project}
            slug={opened.slug}
            onClose={close}
            onPrev={openIndex >= 0 && filtered.length > 1 ? () => step(-1) : undefined}
            onNext={openIndex >= 0 && filtered.length > 1 ? () => step(1) : undefined}
          />
        )}
      </AnimatePresence>
    </>
  );
}
