import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  Gauge,
  LayoutTemplate,
  LineChart,
  MapPin,
  MessageSquareText,
  MousePointer2,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Wrench,
  Zap,
} from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import SEO from '../components/SEO';
import { articles } from '../content/blog/articles';
import { projectSlug, projects } from './WorkPage';

const skills = [
  'Custom Websites',
  'Website Templates',
  'Quote Planners',
  'Booking Funnels',
  'Local SEO',
  'Interactive Calculators',
  'Business Dashboards',
  'Privacy-First Tools',
  'GitHub Pages Demos',
  'Etsy Digital Products',
  'React',
  'TypeScript',
  'Tailwind CSS',
];

const projectCount = projects.length;
const blogCount = articles.length;
const templateProjects = projects.filter((project) => /template/i.test(`${project.title} ${project.description}`));
const dataProducts = projects.filter((project) => project.category === 'Data');
const interactiveTools = projects.filter((project) => project.toolBadge || project.toolHighlight);
const liveDemoCount = projects.filter((project) => project.liveUrl).length;
const featuredProjects = projects.filter((project) => project.featured).slice(0, 6);
const latestArticles = articles.slice(0, 3);

const proofStats = [
  { value: `${projectCount}+`, label: 'Real portfolio projects' },
  { value: `${templateProjects.length}+`, label: 'Website template builds' },
  { value: `${interactiveTools.length}+`, label: 'Interactive tools' },
  { value: `${dataProducts.length}`, label: 'Data products' },
  { value: `${blogCount}`, label: 'Practical articles' },
  { value: `${liveDemoCount}`, label: 'Live demos linked' },
];

const pathways = [
  {
    icon: BriefcaseBusiness,
    title: 'I need a custom website',
    text: 'A niche-specific site with the right pages, trust signals, lead flow and deployment support.',
    cta: 'Request a custom build',
    to: '/contact',
  },
  {
    icon: MapPin,
    title: 'I run a local service business',
    text: 'Turn vague enquiries into quote-ready leads with calculators, planners and mobile-first contact paths.',
    cta: 'See local examples',
    to: '/work',
  },
  {
    icon: LayoutTemplate,
    title: 'I want a template',
    text: 'Demo-first website templates for service, beauty, wellness, construction and creator businesses.',
    cta: 'Browse templates',
    href: 'https://nextgenwebs.etsy.com',
  },
  {
    icon: BarChart3,
    title: 'I need a dashboard',
    text: 'CSV dashboards, reports and segmentation tools that keep business data simple and private.',
    cta: 'See data products',
    to: '#data-products',
  },
  {
    icon: MousePointer2,
    title: 'I want interactive tools',
    text: 'Quote planners, estimators, booking funnels and guided forms that help visitors take action.',
    cta: 'Explore tools',
    to: '#interactive-tools',
  },
  {
    icon: Sparkles,
    title: 'Show me proof',
    text: 'Skip the pitch. View live demos, project notes, galleries and practical build write-ups.',
    cta: 'View work',
    to: '/work',
  },
];

const serviceBlocks = [
  {
    eyebrow: 'For local businesses',
    title: 'Quote-ready enquiries, not mystery inbox messages.',
    text: 'Local service sites should qualify the job before the first call. I build mobile-first flows with quote forms, planners, trust sections and local SEO basics so visitors can explain what they need clearly.',
    items: ['Quote calculators and planners', 'WhatsApp or email handoff', 'Service-area and trust content', 'Fast static demos'],
  },
  {
    eyebrow: 'For template buyers',
    title: 'Ready-made websites with the demo doing the selling.',
    text: 'Templates are built as practical digital products: editable business details, clear buyer guidance, responsive layouts, and deployment paths that do not require a full agency budget.',
    items: ['Demo-first buying', 'Editable business details', 'Buyer and deployment guidance', 'Etsy digital download flow'],
  },
  {
    eyebrow: 'For data products',
    title: 'Useful dashboards without enterprise theatre.',
    text: 'CSV-first tools can turn messy business data into dashboards, segments, reports and analysis while staying privacy-first in the browser where possible.',
    items: ['CSV import and mapping', 'Reports and segmentation', 'Browser-based privacy design', 'Charts that explain the point'],
  },
  {
    eyebrow: 'For custom builds',
    title: 'Strategy, structure, build, launch.',
    text: 'Custom projects get the website architecture and content structure first, then the interface, lead flow and deployment polish needed to make the site useful from day one.',
    items: ['Niche-specific content structure', 'Conversion-focused page flow', 'Clean responsive UI', 'Deployment support'],
  },
];

const processSteps = [
  'Map the buyer path',
  'Design the useful flow',
  'Build the demo',
  'Test on mobile',
  'Ship and document it',
];

const faqs = [
  {
    question: 'Do you only build custom websites?',
    answer: 'No. The portfolio includes custom-style websites, website templates, interactive quote tools, and data/dashboard products.',
  },
  {
    question: 'Can a local business site include a quote calculator?',
    answer: 'Yes. Several projects use planners, calculators, structured summaries or WhatsApp handoff so enquiries arrive with more context.',
  },
  {
    question: 'Are the dashboards privacy-first?',
    answer: 'Where the project allows it, the dashboard work is designed to run in the browser so uploaded CSV data does not need a server.',
  },
  {
    question: 'Are there public Etsy listings for every template?',
    answer: 'No. Some templates are portfolio demos or draft products. This homepage only links to the real NextGenWebs Etsy shop, not invented product URLs.',
  },
];

function SkillsTicker() {
  const doubled = [...skills, ...skills];
  return (
    <div className="ticker-wrap border-y border-white/5 py-3">
      <div className="ticker-track">
        {doubled.map((skill, index) => (
          <span key={`${skill}-${index}`} className="flex items-center gap-3 whitespace-nowrap px-6 text-sm text-slate-500">
            <Zap size={11} className="text-primary-500" fill="currentColor" />
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary-300">{eyebrow}</p>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">{text}</p>}
    </div>
  );
}

function SmartLink({
  to,
  href,
  children,
  className,
}: {
  to?: string;
  href?: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to ?? '/'} className={className}>
      {children}
    </Link>
  );
}

export default function HomePage() {
  return (
    <>
      <SEO
        title="NextGenWebs | Premium Web Design, Website Templates & Business Tools"
        description="NextGenWebs builds premium small business websites, local service lead-generation pages, website templates, interactive quote calculators and privacy-first business dashboards from Cape Town."
        path=""
        ogImage={featuredProjects[0]?.coverImage}
        ogImageAlt={featuredProjects[0]?.mediaAlt}
      >
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'NextGenWebs',
            url: 'https://iederees-create.github.io/3D-Portfolio/',
            description:
              'Premium web design, website templates, interactive quote calculators and business dashboards for small businesses and digital product buyers.',
            areaServed: ['Cape Town', 'South Africa', 'Online'],
            sameAs: [
              'https://nextgenwebs.etsy.com',
              'https://x.com/nextgenwebdevs',
              'https://instagram.com/nextgenerationwebdevs',
              'https://www.linkedin.com/in/iederees-francis-936717392/',
            ],
          })}
        </script>
      </SEO>

      <section className="relative overflow-hidden px-6 pt-32 pb-16 sm:pt-36 lg:pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-300">
              <Sparkles size={13} className="text-primary-300" />
              Cape Town web designer building practical business systems
            </div>
            <h1 className="max-w-5xl text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Websites that help people choose, quote, book and buy.
            </h1>
            <p className="mt-7 max-w-2xl text-lg font-medium leading-relaxed text-slate-400">
              NextGenWebs builds high-converting websites, digital templates, interactive calculators and data tools for small businesses, local service teams and product buyers who need more than a pretty homepage.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <MagneticButton>
                <Link to="/work" className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold tracking-wide text-black shadow-lg transition-colors hover:bg-slate-200">
                  View real work <ArrowRight size={16} />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link to="/contact" className="inline-flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-7 py-4 text-sm font-bold tracking-wide text-slate-200 transition-colors hover:bg-white/10">
                  Request a custom build <MessageSquareText size={16} />
                </Link>
              </MagneticButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-4"
          >
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Proof, not confetti</span>
                <Gauge size={18} className="text-primary-300" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {proofStats.slice(0, 4).map((stat) => (
                  <div key={stat.label} className="stat-card rounded-2xl p-4">
                    <div className="stat-value text-3xl font-bold text-white">{stat.value}</div>
                    <div className="stat-label mt-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <a href="https://nextgenwebs.etsy.com" target="_blank" rel="noreferrer" className="rounded-2xl border border-orange-400/20 bg-orange-400/10 p-5 transition-colors hover:bg-orange-400/15">
                <ShoppingBag className="mb-4 text-orange-300" size={22} />
                <h2 className="text-lg font-semibold text-white">Browse website templates</h2>
                <p className="mt-2 text-sm leading-relaxed text-orange-100/70">Demo-first digital products for buyers who want a strong starting point.</p>
              </a>
              <Link to="/blog" className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5 transition-colors hover:bg-emerald-400/15">
                <BookOpen className="mb-4 text-emerald-300" size={22} />
                <h2 className="text-lg font-semibold text-white">Read practical build notes</h2>
                <p className="mt-2 text-sm leading-relaxed text-emerald-100/70">Case studies and guides from real projects in the portfolio.</p>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <SkillsTicker />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Choose your path"
            title="What do you need built?"
            text="Different visitors need different doors. Pick the one that sounds most like your problem."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pathways.map((item) => {
              const Icon = item.icon;
              return (
                <SmartLink
                  key={item.title}
                  to={item.to}
                  href={item.href}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <Icon size={24} className="mb-5 text-primary-300" />
                  <h2 className="text-xl font-semibold text-white">{item.title}</h2>
                  <p className="mt-3 min-h-20 text-sm leading-relaxed text-slate-400">{item.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-200 group-hover:text-white">
                    {item.cta} <ArrowRight size={14} />
                  </span>
                </SmartLink>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Featured work"
            title="Live demos with useful mechanics."
            text="A quick scan of real projects: templates, service sites, quote planners and dashboard products already in the portfolio."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project) => (
              <Link key={project.title} to={`/work/${projectSlug(project)}/`} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all hover:-translate-y-1 hover:border-white/20">
                {project.coverImage ? (
                  <img src={project.coverImage} alt={project.mediaAlt ?? `${project.title} cover image`} className="aspect-[16/10] w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
                ) : (
                  <div className="flex aspect-[16/10] w-full items-center justify-center bg-white/[0.04] text-slate-500">
                    <Wrench size={30} />
                  </div>
                )}
                <div className="p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">{project.category}</span>
                    {project.toolBadge && <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">{project.toolBadge}</span>}
                  </div>
                  <h2 className="text-lg font-semibold leading-snug text-white">{project.title}</h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-400">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/work" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black hover:bg-slate-200">
              View all {projectCount} projects <ArrowRight size={15} />
            </Link>
            <a href="https://nextgenwebs.etsy.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10">
              Browse templates <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          {serviceBlocks.map((block) => (
            <div key={block.eyebrow} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary-300">{block.eyebrow}</p>
              <h2 className="text-2xl font-bold text-white">{block.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">{block.text}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {block.items.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="interactive-tools" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Interactive tools"
            title="Calculators and planners that make the next step obvious."
            text="The useful bit is often the form, estimator, calculator or guided planner sitting inside the website."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {interactiveTools.slice(0, 6).map((project) => (
              <Link key={project.title} to={`/work/${projectSlug(project)}/`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.06]">
                <ClipboardList size={22} className="mb-4 text-amber-300" />
                <h2 className="text-lg font-semibold text-white">{project.title}</h2>
                <p className="mt-2 text-sm font-semibold text-amber-200">{project.toolBadge ?? 'Interactive build'}</p>
                <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-slate-400">{project.toolHighlight ?? project.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="data-products" className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Data and analytics"
              title="Dashboards for people who still need to make decisions after lunch."
              text="CSV dashboards, analysis labs, segmentation tools and downloadable reports without turning a small project into corporate fog."
            />
            <Link to="/work" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
              See data products <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid gap-4">
            {dataProducts.map((project) => (
              <Link key={project.title} to={`/work/${projectSlug(project)}/`} className="grid gap-4 rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.06] p-5 transition-colors hover:bg-emerald-400/10 sm:grid-cols-[160px_1fr]">
                {project.coverImage ? (
                  <img src={project.coverImage} alt={project.mediaAlt ?? `${project.title} cover image`} className="aspect-video w-full rounded-xl object-cover" loading="lazy" />
                ) : (
                  <div className="flex aspect-video items-center justify-center rounded-xl bg-white/5 text-emerald-200">
                    <LineChart size={24} />
                  </div>
                )}
                <div>
                  <h2 className="text-lg font-semibold text-white">{project.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Process"
            title="A practical build flow, not a mystery ritual."
            text="The goal is simple: understand the buyer path, build the useful parts, test the experience, then make it easy to launch or adapt."
          />
          <div className="grid gap-3 md:grid-cols-5">
            {processSteps.map((step, index) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="mb-8 text-sm font-bold text-primary-300">0{index + 1}</div>
                <h2 className="text-base font-semibold text-white">{step}</h2>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <SectionHeading
            eyebrow="Proof"
            title="Real numbers from the portfolio."
            text="No revenue claims, fake reviews or magic conversion percentages. Just the inventory this site can actually show."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {proofStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="text-4xl font-bold text-white">{stat.value}</div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Insights"
              title="Build notes for people who like the wiring visible."
              text="Practical articles on quote planners, data products and niche website strategy."
            />
            <Link to="/blog" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black hover:bg-slate-200">
              Read the blog <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid gap-4">
            {latestArticles.map((article) => (
              <Link key={article.slug} to={`/blog/${article.slug}/`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.06]">
                <div className="mb-3 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                  <span className="rounded-full bg-white/5 px-3 py-1 text-slate-300">{article.category}</span>
                  <span className="rounded-full bg-white/5 px-3 py-1">{article.readingTimeMinutes} min read</span>
                </div>
                <h2 className="text-xl font-semibold text-white">{article.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{article.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-orange-400/20 bg-orange-400/10 p-8">
            <ShoppingBag size={26} className="mb-5 text-orange-300" />
            <h2 className="text-3xl font-bold text-white">Need a template first?</h2>
            <p className="mt-4 text-sm leading-relaxed text-orange-100/75">
              Browse the NextGenWebs Etsy shop for website templates and digital products. The demos do the explaining before you buy.
            </p>
            <a href="https://nextgenwebs.etsy.com" target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black hover:bg-slate-200">
              Browse Etsy templates <ExternalLink size={15} />
            </a>
          </div>
          <div className="rounded-3xl border border-primary-300/20 bg-primary-500/10 p-8">
            <MessageSquareText size={26} className="mb-5 text-primary-300" />
            <h2 className="text-3xl font-bold text-white">Need something custom?</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Bring the niche, offer, service area and target action. I will help shape the page structure, lead flow, visual system and launch path.
            </p>
            <Link to="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black hover:bg-slate-200">
              Request a custom build <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <SectionHeading eyebrow="FAQ" title="Fast answers before you click around." />
          <div className="grid gap-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-white">
                  {faq.question}
                  <Search size={16} className="shrink-0 text-slate-500 transition-colors group-open:text-primary-300" />
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center sm:p-12">
          <ShieldCheck size={30} className="mx-auto mb-6 text-emerald-300" />
          <h2 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Bring the business problem. I will build the useful web part.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
            Custom website, template product, quote planner, booking funnel or dashboard: choose the path and let the portfolio show the shape of the work.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-black hover:bg-slate-200">
              Contact NextGenWebs <ArrowRight size={16} />
            </Link>
            <Link to="/work" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-4 text-sm font-semibold text-white hover:bg-white/10">
              View portfolio <ExternalLink size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
