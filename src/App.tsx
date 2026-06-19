import { useState } from 'react';
import { FolderGit2, ExternalLink, Github, Layers, Code2 } from 'lucide-react';

interface Project {
  title: string;
  category: 'Service' | 'Beauty' | 'Education' | 'Creative';
  description: string;
  tags: string[];
  repoUrl: string;
}

export default function App() {
  const [filter, setFilter] = useState<string>('All');

  const projects: Project[] = [
    {
      title: 'Summit Painting CT',
      category: 'Service',
      description: 'Premium service business landing page engineered for local service visibility, featuring optimized client onboarding paths.',
      tags: ['React', 'Tailwind', 'Vite'],
      repoUrl: 'https://github.com/iederees-create/summit-painting-ct-ct.git'
    },
    {
      title: 'Amore Nails CT',
      category: 'Beauty',
      description: 'Elegant boutique beauty salon application showcasing creative portfolios, service menus, and modern interactive touchpoints.',
      tags: ['TypeScript', 'Tailwind CSS', 'UI/UX'],
      repoUrl: 'https://github.com/iederees-create/amore-nails-ct.git'
    },
    {
      title: 'Pixel Perfect Hair',
      category: 'Beauty',
      description: 'Highly visual, asset-optimized digital showroom tailored for modern salon styling branding and clean presentation workflows.',
      tags: ['React', 'Vite', 'Responsive Layout'],
      repoUrl: 'https://github.com/iederees-create/pixel-perfect-hair.git'
    },
    {
      title: 'Acme Plumbing Claremont',
      category: 'Service',
      description: 'Conversion-driven emergency dispatch and routing hub optimized for high performance and clean visual hierarchy.',
      tags: ['React', 'SEO Framework', 'Tailwind'],
      repoUrl: 'https://github.com/iederees-create/acme-plumbing-claremont-ct.git'
    },
    {
      title: 'Window Wizards CT',
      category: 'Service',
      description: 'Polished local commercial service application focusing on interactive quotes and slick, premium glass components.',
      tags: ['TypeScript', 'Vite', 'Components'],
      repoUrl: 'https://github.com/iederees-create/window-wizards-ct-ct.git'
    },
    {
      title: 'First Choice Construction',
      category: 'Service',
      description: 'Heavyweight construction enterprise portal designed to showcase multi-stage real estate developments and scale.',
      tags: ['React', 'Production Build', 'Tailwind'],
      repoUrl: 'https://github.com/iederees-create/first-choice-construction-ct.git'
    },
    {
      title: 'Aura Signs',
      category: 'Creative',
      description: 'Stunning artistic branding and graphics configuration workspace focused on visual design aesthetics and layout assets.',
      tags: ['UI/UX Design', 'Vite', 'Tailwind'],
      repoUrl: 'https://github.com/iederees-create/aura-signs.git'
    },
    {
      title: 'Fluent Path Tutoring',
      category: 'Education',
      description: 'Clean learning management index and appointment hub designed for modern educational structures and smooth user navigation.',
      tags: ['TypeScript', 'React', 'Data Visuals'],
      repoUrl: 'https://github.com/iederees-create/fluent-path-tutoring.git'
    }
  ];

  const categories = ['All', 'Service', 'Beauty', 'Education', 'Creative'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="relative w-full min-h-screen bg-[#0b0f19] text-slate-100 overflow-x-hidden">
      {/* Structural Glow Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-purple-950/10 blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2.5 font-semibold tracking-tight text-lg">
          <Code2 className="text-blue-400" size={22} />
          <span>DevWorkspace</span>
        </div>
        <a 
          href="https://github.com/iederees-create" 
          target="_blank" 
          rel="noreferrer"
          className="liquid-glass flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white/80 hover:text-white transition-colors"
        >
          <Github size={16} />
          <span>Global Profile</span>
        </a>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-7xl mx-auto px-6 py-12 md:py-20">
        
        {/* Intro Hero Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-300 mb-4">
            <Layers size={12} />
            <span>Active Production Tracking</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight mb-5">
            Production Repository Hub
          </h1>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            An overview of responsive web assets, specialized frameworks, and premium client applications currently under management.
          </p>
        </div>

        {/* Filter Navigation Control */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-sm rounded-xl transition-all ${
                filter === cat 
                  ? 'bg-white text-black font-medium shadow-lg' 
                  : 'liquid-glass text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Project Grid Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <div 
              key={idx} 
              className="liquid-glass rounded-2xl p-6 flex flex-col justify-between hover:translate-y-[-2px] transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-blue-400">
                    <FolderGit2 size={20} strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-400">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-lg font-medium text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                  <a 
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 liquid-glass flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <Github size={14} />
                    <span>Repository</span>
                  </a>
                  <a 
                    href={project.repoUrl.replace('.git', '')}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2.5 liquid-glass rounded-xl text-slate-400 hover:text-blue-400 transition-colors"
                    title="Inspect Source Tree"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="w-full border-t border-white/5 mt-20 py-8 text-center text-xs text-slate-500">
        <p>© 2026 Developer System Index. Built with React + TypeScript + Tailwind.</p>
      </footer>
    </div>
  );
}
