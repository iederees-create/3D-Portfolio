import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BarChart3,
  CalendarCheck,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  Monitor,
} from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import SEO from '../components/SEO';
import {
  PROFILE_IMAGE_ALT,
  PROFILE_IMAGE_PATH,
  PROFILE_IMAGE_URL,
  PROFILE_NAME,
  publicAsset,
} from '../lib/site';
import { projectSlug, projects } from './WorkPage';

const EMAIL = 'iedereesfrancis@gmail.com';
const HIRE_MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent('Project enquiry from your portfolio')}`;
const LINKEDIN_URL = 'https://www.linkedin.com/in/iederees-francis-936717392/';

// ─── Content ──────────────────────────────────────────────

const services = [
  {
    icon: Monitor,
    title: 'Websites for local businesses',
    text: 'Clear, mobile-first websites for service businesses, with local SEO basics and an easy way for customers to enquire by email or WhatsApp.',
  },
  {
    icon: CalendarCheck,
    title: 'Quote calculators & booking pages',
    text: 'Interactive planners and booking pages that collect the job details up front, so enquiries arrive ready to quote.',
  },
  {
    icon: BarChart3,
    title: 'Dashboards & data tools',
    text: 'Turn spreadsheets and CSV exports into simple dashboards and reports that make the numbers easy to act on.',
  },
];

/** Four scannable examples. Looked up by title so they stay in sync with WorkPage data. */
const featuredTitles = [
  'Tiling Contractor Website Template',
  'Summit Painting CT',
  'Amore Nails CT',
  'InsightForge Business Analytics Studio',
];
const featuredWork = featuredTitles
  .map((title) => projects.find((project) => project.title === title))
  .filter((project): project is (typeof projects)[number] => Boolean(project));

const credentialChips = [
  'IBM — Web Development & Data Analytics',
  'University of Cape Town — Data Analysis & Python',
  'MIT — Digital Marketing Analytics',
  'Google Analytics 4 · Power BI',
];

// ─── Page ─────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <SEO
        title="Iederees Francis | Freelance Web Developer in Cape Town"
        description="Freelance web developer in Cape Town, available for projects locally and remotely. Websites, quote calculators, booking pages and dashboards for small businesses. Get a free quote."
        path=""
        ogImage={featuredWork[0]?.coverImage}
        ogImageAlt={featuredWork[0]?.mediaAlt}
      >
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'Iederees Francis — Freelance Web Developer',
            url: 'https://iederees-create.github.io/3D-Portfolio/',
            description:
              'Freelance web developer in Cape Town building websites, quote calculators, booking pages and dashboards for small businesses, locally and remotely.',
            areaServed: ['Cape Town', 'South Africa', 'Remote'],
            email: EMAIL,
            founder: {
              '@type': 'Person',
              name: PROFILE_NAME,
              image: PROFILE_IMAGE_URL,
              url: 'https://iederees-create.github.io/3D-Portfolio/about/',
            },
            image: PROFILE_IMAGE_URL,
            sameAs: [LINKEDIN_URL, 'https://nextgenwebs.etsy.com'],
          })}
        </script>
      </SEO>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-6 pt-32 pb-16 sm:pt-36 lg:pb-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              Available for freelance projects
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-300">
              Iederees Francis · Freelance web developer
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Websites that turn visitors into customers.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
              I build clear, mobile-friendly websites, quote calculators and booking pages for small businesses. Based in Cape Town, working with local businesses in person and with remote clients anywhere.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <MagneticButton>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold tracking-wide text-black shadow-xl transition-colors hover:bg-slate-200"
                >
                  Get a free quote <ArrowRight size={16} />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <a
                  href={HIRE_MAILTO}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-bold tracking-wide text-white transition-colors hover:bg-white/10"
                >
                  <Mail size={16} /> Hire me for your project
                </a>
              </MagneticButton>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2"><MapPin size={15} className="text-primary-300" /> Cape Town, South Africa</li>
              <li className="flex items-center gap-2"><Globe2 size={15} className="text-primary-300" /> Remote clients welcome</li>
              <li className="flex items-center gap-2"><MessageCircle size={15} className="text-primary-300" /> Reply by email or WhatsApp</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-full max-w-[320px] lg:max-w-[380px]"
          >
            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/50">
              <img
                src={publicAsset(PROFILE_IMAGE_PATH)}
                alt={PROFILE_IMAGE_ALT}
                className="aspect-[4/5] w-full object-cover"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary-300">What I do</p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Three ways I can help your business.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {services.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-500/10 text-primary-300">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-primary-300">
              Tell me about your project <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured work ── */}
      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary-300">Selected work</p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">A few things I've built.</h2>
            </div>
            <Link to="/work" className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-primary-300">
              See all work <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredWork.map((project) => (
              <Link
                key={project.title}
                to={`/work/${projectSlug(project)}/`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:bg-white/[0.06]"
              >
                {project.coverImage && (
                  <img
                    src={project.coverImage}
                    alt={project.mediaAlt ?? `${project.title} cover image`}
                    className="aspect-video w-full object-cover"
                    loading="lazy"
                  />
                )}
                <div className="flex flex-1 flex-col p-5">
                  <span className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-primary-300">{project.category}</span>
                  <h3 className="text-base font-semibold leading-snug text-white">{project.title}</h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-400">{project.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:text-primary-300">
                    View project <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Credentials strip ── */}
      <section className="px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-primary-300">
              <Award size={22} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Trained and certified</h2>
              <p className="mt-1 text-sm text-slate-400">Certificates from IBM, MIT, the University of Cape Town and more.</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {credentialChips.map((chip) => (
                  <li key={chip} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                    {chip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link
            to="/credentials"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            View credentials <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center sm:p-12">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Have a project in mind?</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-400">
            Tell me what you need and I'll come back with a free quote. I'm taking on new freelance projects in Cape Town and remotely.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-black transition-colors hover:bg-slate-200"
            >
              Get a free quote <ArrowRight size={16} />
            </Link>
            <a
              href={HIRE_MAILTO}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Mail size={16} /> {EMAIL}
            </a>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Prefer LinkedIn?{' '}
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="font-semibold text-slate-300 underline-offset-4 hover:text-white hover:underline">
              Message me there
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
