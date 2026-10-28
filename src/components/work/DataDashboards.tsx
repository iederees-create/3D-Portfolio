import { motion } from 'framer-motion';
import { ArrowUpRight, BarChart3, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * The dashboards are standalone, self-contained HTML files in /public/dashboards/.
 * They are plain static files (not React routes), so they are linked with ordinary
 * anchors built from Vite's BASE_URL rather than router <Link>s.
 */
const base = import.meta.env.BASE_URL;

export const dataDashboards = [
  {
    title: 'South Africa Unemployment, Q2 2026',
    href: `${base}dashboards/south-africa-unemployment-q2-2026.html`,
    source: 'Stats SA QLFS (P0211), released 11 Aug 2026',
    blurb:
      'Interactive view of the quarterly labour force survey: the 33.6% official rate over time, nine provinces, age groups, education level and industry jobs, with a sortable table and CSV export.',
    tags: ['KPI cards', 'Province & age toggles', 'Sortable table', 'Hover tooltips'],
    icon: BarChart3,
  },
  {
    title: 'South Africa Inflation, September 2026',
    href: `${base}dashboards/south-africa-inflation-september-2026.html`,
    source: 'Stats SA CPI (P0141), released 21 Oct 2026',
    blurb:
      'Interactive view of consumer prices: 4.5% headline inflation, what each category adds to it (transport the biggest driver), province and expenditure-decile rates, and a year-on-year trend.',
    tags: ['Category drill-down', 'Year comparison', 'Sortable table', 'Hover tooltips'],
    icon: LineChart,
  },
] as const;

interface Props {
  /** `compact` is a short one-line mention for other pages. */
  variant?: 'full' | 'compact';
}

export default function DataDashboards({ variant = 'full' }: Props) {
  if (variant === 'compact') {
    return (
      <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 size={18} className="text-primary-400" />
          <h3 className="text-lg font-bold text-white tracking-tight">Data visualisation in practice</h3>
        </div>
        <p className="text-sm leading-relaxed text-slate-400 max-w-3xl">
          Two sample interactive dashboards built from official Stats SA releases, in plain JavaScript and SVG. They show how I turn
          spreadsheet-style data into something a client can explore.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {dataDashboards.map((d) => (
            <a
              key={d.href}
              href={d.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {d.title} <ArrowUpRight size={14} />
            </a>
          ))}
          <Link to="/work" className="inline-flex items-center gap-1.5 px-2 py-2 text-sm font-semibold text-primary-300 hover:text-primary-400">
            More on the Work page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section id="data-dashboards" className="mt-20 scroll-mt-28" aria-labelledby="data-dashboards-title">
      <div className="mb-8 max-w-3xl">
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-300">
          <BarChart3 size={13} /> Data dashboards
        </p>
        <h2 id="data-dashboards-title" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Data, made explorable
        </h2>
        <p className="mt-3 text-base leading-relaxed text-slate-400">
          Need your own numbers turned into a clear, interactive report? These two sample dashboards use real Stats SA releases to show what I can build:
          KPI cards, toggles, tooltips and sortable tables, each in a single fast-loading file.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {dataDashboards.map((d, i) => {
          const Icon = d.icon;
          return (
            <motion.a
              key={d.href}
              href={d.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-primary-400/50 hover:bg-white/[0.06] sm:p-8"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-500/15 text-primary-300">
                  <Icon size={20} />
                </span>
                <span className="rounded-full border border-primary-400/40 bg-primary-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-300">
                  Sample visualisation
                </span>
              </div>
              <h3 className="text-xl font-bold leading-snug text-white">{d.title}</h3>
              <p className="mt-1 font-mono text-xs text-slate-500">{d.source}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-400">{d.blurb}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {d.tags.map((t) => (
                  <li key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                    {t}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white">
                Open dashboard <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </motion.a>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-slate-200">
          Get a free quote
        </Link>
        <p className="text-xs text-slate-500">Figures are transcribed from the official Stats SA releases linked on each dashboard. These are demonstrations, not official Stats SA products.</p>
      </div>
    </section>
  );
}
