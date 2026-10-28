import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Briefcase, GraduationCap, Code2, Wrench, Award, BadgeCheck,
  ArrowUpRight, Download, ChevronRight, MapPin, Globe2, FolderKanban, ScrollText,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticButton from '../components/MagneticButton';
import Reveal from '../components/Reveal';
import TechShowcase from '../components/TechShowcase';
import CertificateExplorer from '../components/CertificateExplorer';
import DataDashboards from '../components/work/DataDashboards';
import SEO from '../components/SEO';
import { certificateCount, certificateGroups } from '../data/certificates';
import { hireMailto } from '../lib/contact';
import { projects } from './WorkPage';

// ─── Data ─────────────────────────────────────────────────────────────────────

const experience = [
  {
    role: 'Freelance Web Developer & Digital Consultant',
    company: 'NextGenWebs',
    period: '2023 – Present',
    location: 'Cape Town, SA · Remote',
    type: 'current',
    points: [
      'Design and develop custom websites and web applications for small businesses across South Africa and internationally.',
      'Produce and sell conversion-optimised website templates on Etsy, covering industries including beauty, trades, education and services.',
      'Consult on digital strategy, local SEO, and customer journey design to help clients turn online traffic into revenue.',
      'Build AI-assisted workflows and automate client onboarding, lead capture and communication processes.',
    ],
  },
  {
    role: 'Student Recruitment & Business Development',
    company: 'Higher Education Sector',
    period: '2020 – 2023',
    location: 'Cape Town, SA',
    type: 'past',
    points: [
      'Managed end-to-end student recruitment pipelines from first contact to enrolment.',
      'Ran targeted outreach campaigns and facilitated information sessions for prospective students and parents.',
      'Tracked and reported on conversion metrics, identifying friction points in the enquiry-to-registration funnel.',
      'Developed strong skills in needs-based selling, objection handling and relationship management.',
    ],
  },
  {
    role: 'Sales & Customer Experience',
    company: 'Various Service Businesses',
    period: '2017 – 2020',
    location: 'Cape Town, SA',
    type: 'past',
    points: [
      'Delivered customer-facing service in high-pressure retail and service environments.',
      'Built expertise in communication, product knowledge presentation and customer journey design.',
      'Consistently met and exceeded sales targets by understanding customer needs before offering solutions.',
    ],
  },
];

/** Business & people skills, shown as tags. The earlier percentage bars could not be verified, so no scores are shown. */
const businessSkills = [
  'Customer journey mapping',
  'Conversion strategy',
  'Client communication',
  'Sales & persuasion',
  'Problem decomposition',
  'Self-directed learning',
];

const tools = [
  { name: 'VS Code', category: 'Editor' },
  { name: 'Figma', category: 'Design' },
  { name: 'GitHub', category: 'Version Control' },
  { name: 'Vite', category: 'Build' },
  { name: 'Supabase', category: 'Database' },
  { name: 'Vercel', category: 'Deployment' },
  { name: 'GitHub Pages', category: 'Deployment' },
  { name: 'Claude / Gemini', category: 'AI Tools' },
  { name: 'Framer Motion', category: 'Animation' },
  { name: 'Lucide React', category: 'Icons' },
  { name: 'EmailJS', category: 'Integrations' },
  { name: 'Google Analytics', category: 'Analytics' },
  { name: 'Canva', category: 'Design' },
  { name: 'Notion', category: 'Productivity' },
];

const education = [
  {
    qualification: 'Hands-On Introduction: Data Engineering',
    institution: 'LinkedIn Learning',
    period: 'August 2026',
    note: 'A 1 hour 33 minute course covering data engineering fundamentals, ETL/ELT concepts and pipeline design — completed alongside building the InsightForge Apache Airflow ETL pipeline feature.',
  },
  {
    qualification: 'Ongoing Self-Directed Web Development',
    institution: 'freeCodeCamp · The Odin Project · MDN · YouTube',
    period: '2022 – Present',
    note: 'Full-stack curriculum covering HTML, CSS, JS, React, Node, databases and deployment. Reinforced by building and shipping real projects.',
  },
  {
    qualification: 'National Senior Certificate',
    institution: 'Cape Town, South Africa',
    period: '2013',
    note: 'Matric certificate with passes in English, Mathematics, IT and Business Studies.',
  },
];


const sections = [
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills & tools' },
  { id: 'education', label: 'Education' },
  { id: 'certificates', label: 'Certificates' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[10px] font-mono tracking-widest text-primary-400 uppercase border border-primary-500/20 rounded-full bg-primary-500/5">
      {text}
    </div>
  );
}

function SectionHeading({ icon: Icon, title, text }: { icon: typeof Briefcase; title: string; text?: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500/10 text-primary-300"><Icon size={18} /></span>
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>
      </div>
      {text && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">{text}</p>}
    </div>
  );
}

function ExperienceCard({
  role, company, period, location, type, points, index,
}: typeof experience[0] & { index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-2 bottom-0 w-px bg-white/10" />
      {/* Timeline dot */}
      <div className={`absolute left-[-4.5px] top-2 w-2.5 h-2.5 rounded-full border-2 ${
        type === 'current'
          ? 'bg-primary-500 border-primary-400 shadow-[0_0_8px_rgba(212,122,106,0.6)]'
          : 'bg-slate-700 border-slate-600'
      }`} />

      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="text-white font-bold text-base leading-tight">{role}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-primary-400 text-sm font-medium">{company}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-500 text-xs">{location}</span>
            </div>
          </div>
          <span className={`flex-shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
            type === 'current'
              ? 'bg-primary-500/10 text-primary-300 border-primary-500/20'
              : 'bg-white/5 text-slate-400 border-white/10'
          }`}>
            {period}
          </span>
        </div>

        <ul className="space-y-2 mt-4">
          {points.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-400 leading-relaxed">
              <ChevronRight size={13} className="text-primary-500 flex-shrink-0 mt-0.5" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ─── CredentialsPage ──────────────────────────────────────────────────────────
export default function CredentialsPage() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(sections[0].id);

  // Highlight the section currently in view in the sticky sub-nav.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const jump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  const facts = [
    { icon: FolderKanban, value: String(projects.length), label: 'Projects in the portfolio' },
    { icon: ScrollText, value: String(certificateCount), label: 'Certificates & short courses' },
    { icon: Award, value: String(certificateGroups.length), label: 'Learning topics' },
    { icon: Globe2, value: 'Cape Town + remote', label: 'Where I work' },
  ];

  return (
    <div className="pt-20 pb-24">
      <SEO
        title="Credentials | Iederees Francis, Freelance Web Developer in Cape Town"
        description="Experience, tools and a full list of certificates from IBM, MIT, the University of Cape Town, edX, LinkedIn Learning and more, with verification links where available."
        path="credentials/"
      />

      {/* ── Hero ── */}
      <section className="relative py-20 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/6 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/6 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            Available for freelance projects
          </div>
          <SectionLabel text="Credentials" />

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-[-0.02em] text-white leading-[1.04] mb-6">
            Experience, skills &amp;<br />
            <span className="text-slate-500">professional background.</span>
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-2xl">
            I came into web development through people-first roles — sales, student recruitment, customer experience. That background is what separates how I build websites from someone who only knows how to write code.
          </p>

          <div className="flex flex-wrap gap-4">
            <MagneticButton>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold text-sm tracking-wide rounded-full hover:bg-slate-200 transition-colors shadow-lg"
              >
                Get a free quote <ArrowUpRight size={15} />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-slate-200 font-bold text-sm tracking-wide rounded-full border border-white/10 hover:bg-white/10 transition-colors"
              >
                View my work
              </Link>
            </MagneticButton>
            <MagneticButton>
              <a
                href={hireMailto('CV Request — NextGenWebs Portfolio')}
                className="inline-flex items-center gap-2 px-6 py-3 text-slate-300 font-semibold text-sm tracking-wide rounded-full hover:text-white transition-colors"
              >
                <Download size={15} /> Request full CV
              </a>
            </MagneticButton>
          </div>
        </motion.div>
      </section>

      {/* ── Facts strip: every figure is counted from this site's own data ── */}
      <div className="border-y border-white/5 bg-white/[0.02] py-8 px-6 mb-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {facts.map(({ icon: Icon, value, label }, i) => (
            <Reveal key={label} delay={i * 0.06}>
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-primary-300"><Icon size={20} /></span>
                <div>
                  <div className="text-xl font-bold text-white sm:text-2xl">{value}</div>
                  <div className="text-xs text-slate-500">{label}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── Sticky sub-navigation ── */}
      <nav aria-label="Page sections" className="sticky top-[60px] z-30 mb-14 border-b border-white/5 bg-surface/80 backdrop-blur-xl">
        <ul className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-6 py-2.5">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={jump(s.id)}
                aria-current={active === s.id ? 'true' : undefined}
                className={`block whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${active === s.id ? 'bg-white text-black' : 'text-slate-400 hover:text-white'}`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="max-w-7xl mx-auto px-6 space-y-24">
        {/* Experience */}
        <section id="experience" className="scroll-mt-32">
          <SectionHeading icon={Briefcase} title="Work experience" />
          <div className="max-w-4xl">
            {experience.map((exp, i) => (
              <ExperienceCard key={exp.role} {...exp} index={i} />
            ))}
          </div>
        </section>

        {/* Skills & tools */}
        <section id="skills" className="scroll-mt-32">
          <SectionHeading icon={Code2} title="Skills & tools" text="What I build with, grouped by job. No made-up percentages: this is simply the toolkit I use." />
          <TechShowcase />

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="flex items-center gap-3 mb-5">
                <Award size={18} className="text-primary-400" />
                <h3 className="text-lg font-bold text-white tracking-tight">Business &amp; people skills</h3>
              </div>
              <ul className="flex flex-wrap gap-2.5">
                {businessSkills.map((skill) => (
                  <li key={skill} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-primary-400/50 hover:bg-primary-500/10">
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex items-center gap-3 mb-5">
                <Wrench size={18} className="text-primary-400" />
                <h3 className="text-lg font-bold text-white tracking-tight">Tools &amp; platforms</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="group flex flex-col items-start px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] hover:border-primary-500/30 transition-all cursor-default"
                  >
                    <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">{tool.name}</span>
                    <span className="text-[9px] text-slate-600 mt-0.5 font-mono uppercase tracking-wide">{tool.category}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal>
            <DataDashboards variant="compact" />
          </Reveal>
        </section>

        {/* Education */}
        <section id="education" className="scroll-mt-32">
          <SectionHeading icon={GraduationCap} title="Education & learning" />
          <div className="grid gap-4 lg:grid-cols-3">
            {education.map((edu, i) => (
              <Reveal key={edu.qualification} delay={i * 0.08} className="h-full">
                <div className="h-full p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-primary-400/30 transition-colors">
                  <span className="inline-block text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-full mb-3">{edu.period}</span>
                  <h3 className="text-white font-bold text-base leading-snug">{edu.qualification}</h3>
                  <p className="text-primary-400 text-xs font-medium mt-1.5 mb-3">{edu.institution}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{edu.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Certificates */}
        <section id="certificates" className="scroll-mt-32">
          <SectionHeading
            icon={BadgeCheck}
            title="Certificates & short courses"
            text={`${certificateCount} completed courses and programs. Search, filter by topic or issuer, and use "Verify" to open the certificate on the issuer's site where a public link exists.`}
          />
          <CertificateExplorer />
        </section>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="max-w-7xl mx-auto px-6 mt-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500/15 to-cyan-500/10 border border-white/8 p-10 md:p-14 text-center">
            <div className="absolute inset-0 bg-white/[0.02]" />
            <div className="relative z-10">
              <p className="text-xs font-mono text-primary-400 uppercase tracking-widest mb-4">Ready to work together?</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Let's build something<br />worth being proud of.
              </h2>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                Whether you need a website, a quote calculator or a booking page — I'm available for freelance projects in Cape Town and remotely.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MagneticButton>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold text-sm tracking-wide rounded-full hover:bg-slate-200 transition-colors shadow-xl"
                  >
                    Get a free quote
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <a
                    href={hireMailto('Enquiry from Portfolio — Credentials page')}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold text-sm tracking-wide rounded-full border border-white/15 hover:bg-white/20 transition-colors"
                  >
                    Hire me
                  </a>
                </MagneticButton>
              </div>
              <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-slate-500"><MapPin size={12} /> Cape Town, South Africa · working remotely worldwide</p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
