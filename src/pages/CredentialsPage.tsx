import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Briefcase, GraduationCap, Code2, Wrench, Award,
  ArrowUpRight, Download, ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticButton from '../components/MagneticButton';

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

const techSkills = [
  { name: 'HTML & CSS', level: 95 },
  { name: 'JavaScript (ES6+)', level: 90 },
  { name: 'React & TypeScript', level: 88 },
  { name: 'Tailwind CSS', level: 92 },
  { name: 'Vite & Build Tools', level: 82 },
  { name: 'Node.js & Express', level: 74 },
  { name: 'Supabase & SQL', level: 70 },
  { name: 'Git & GitHub', level: 88 },
  { name: 'UI/UX Design', level: 80 },
  { name: 'SEO & Web Performance', level: 85 },
];

const softSkills = [
  { name: 'Customer journey mapping', level: 95 },
  { name: 'Conversion strategy', level: 90 },
  { name: 'Client communication', level: 95 },
  { name: 'Sales & persuasion', level: 88 },
  { name: 'Problem decomposition', level: 85 },
  { name: 'Self-directed learning', level: 92 },
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

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[10px] font-mono tracking-widest text-primary-400 uppercase border border-primary-500/20 rounded-full bg-primary-500/5">
      {text}
    </div>
  );
}

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-slate-300 font-medium">{name}</span>
        <span className="text-xs text-slate-500 font-mono">{level}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-300"
        />
      </div>
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
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: skillsRef, inView: skillsInView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const { ref: toolsRef, inView: toolsInView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const { ref: eduRef, inView: eduInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="pt-20 pb-24">
      {/* ── Hero ── */}
      <section className="relative py-20 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/6 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/6 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 24 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-3xl"
        >
          <SectionLabel text="Credentials" />

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05] mb-6">
            Experience, skills &amp;<br />
            <span className="text-slate-500">professional background.</span>
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-2xl">
            I came into web development through people-first roles — sales, student recruitment, customer experience. That background is what separates how I build websites from someone who only knows how to write code.
          </p>

          <div className="flex flex-wrap gap-4">
            <MagneticButton>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold text-sm tracking-wide rounded-full hover:bg-slate-200 transition-colors shadow-lg"
              >
                View My Work <ArrowUpRight size={15} />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <a
                href="mailto:iedereesfrancis@gmail.com?subject=CV Request — NextGenWebs Portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-slate-300 font-bold text-sm tracking-wide rounded-full border border-white/10 hover:bg-white/10 transition-colors"
              >
                <Download size={15} /> Request Full CV
              </a>
            </MagneticButton>
          </div>
        </motion.div>
      </section>

      {/* ── Stats strip ── */}
      <div className="border-y border-white/5 bg-white/[0.01] py-10 px-6 mb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { value: '15+', label: 'Projects shipped' },
            { value: '3+', label: 'Years of experience' },
            { value: '4', label: 'Industries served' },
            { value: '100%', label: 'Custom-built sites' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">

        {/* LEFT — Experience + Education */}
        <div className="lg:col-span-7 space-y-20">

          {/* Experience */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <Briefcase size={18} className="text-primary-400" />
              <h2 className="text-xl font-bold text-white tracking-tight">Work Experience</h2>
            </div>
            <div>
              {experience.map((exp, i) => (
                <ExperienceCard key={exp.role} {...exp} index={i} />
              ))}
            </div>
          </div>

          {/* Education */}
          <div ref={eduRef}>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap size={18} className="text-primary-400" />
              <h2 className="text-xl font-bold text-white tracking-tight">Education &amp; Learning</h2>
            </div>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.qualification}
                  initial={{ opacity: 0, y: 16 }}
                  animate={eduInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <h3 className="text-white font-bold text-sm">{edu.qualification}</h3>
                    <span className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded-full flex-shrink-0">{edu.period}</span>
                  </div>
                  <p className="text-primary-400 text-xs font-medium mb-3">{edu.institution}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{edu.note}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT — Skills + Tools */}
        <div className="lg:col-span-5 space-y-12">

          {/* Technical Skills */}
          <div ref={skillsRef}>
            <div className="flex items-center gap-3 mb-8">
              <Code2 size={18} className="text-primary-400" />
              <h2 className="text-xl font-bold text-white tracking-tight">Technical Skills</h2>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              {techSkills.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
              ))}
            </div>
          </div>

          {/* Business Skills */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Award size={18} className="text-primary-400" />
              <h2 className="text-xl font-bold text-white tracking-tight">Business &amp; People Skills</h2>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              {softSkills.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
              ))}
            </div>
          </div>

          {/* Tools */}
          <div ref={toolsRef}>
            <div className="flex items-center gap-3 mb-8">
              <Wrench size={18} className="text-primary-400" />
              <h2 className="text-xl font-bold text-white tracking-tight">Tools &amp; Platforms</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={toolsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="group flex flex-col items-start px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] hover:border-primary-500/30 transition-all cursor-default"
                >
                  <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">{tool.name}</span>
                  <span className="text-[9px] text-slate-600 mt-0.5 font-mono uppercase tracking-wide">{tool.category}</span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="max-w-7xl mx-auto px-6 mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500/15 to-cyan-500/10 border border-white/8 p-10 md:p-14 text-center"
        >
          <div className="absolute inset-0 bg-white/[0.02]" />
          <div className="relative z-10">
            <p className="text-xs font-mono text-primary-400 uppercase tracking-widest mb-4">Ready to work together?</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Let's build something<br />worth being proud of.
            </h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              Whether you need a custom website, a Etsy template, or strategic digital advice — I'm available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton>
                <a
                  href="mailto:iedereesfrancis@gmail.com?subject=Enquiry from Portfolio — Credentials page"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold text-sm tracking-wide rounded-full hover:bg-slate-200 transition-colors shadow-xl"
                >
                  Get in touch
                </a>
              </MagneticButton>
              <MagneticButton>
                <Link
                  to="/work"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold text-sm tracking-wide rounded-full border border-white/15 hover:bg-white/20 transition-colors"
                >
                  See my projects <ArrowUpRight size={14} />
                </Link>
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
