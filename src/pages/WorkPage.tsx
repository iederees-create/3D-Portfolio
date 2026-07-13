import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';
import { Globe, ShoppingBag, Sparkles, Layers, Star, Images } from 'lucide-react';
import { ProjectMedia } from '../components/ProjectMedia';
import { ProjectShowcase, type ProjectCaseStudy } from '../components/ProjectShowcase';

interface Project {
  title: string;
  category: 'Service' | 'Beauty' | 'Education' | 'Creative' | 'Data';
  description: string;
  tags: string[];
  liveUrl: string;
  etsyUrl?: string;
  featured?: boolean;
  coverImage?: string;
  previewVideoMp4?: string;
  previewVideoWebm?: string;
  videoPoster?: string;
  galleryImages?: string[];
  galleryImageAlts?: string[];
  mediaAlt?: string;
  features?: string[];
  toolHighlight?: string;
  toolBadge?: string;
  /** Optional detailed case-study breakdown shown in the showcase modal. */
  caseStudy?: ProjectCaseStudy;
}

const catClass: Record<string, string> = {
  Service: 'cat-service',
  Beauty: 'cat-beauty',
  Education: 'cat-education',
  Creative: 'cat-creative',
  Data: 'cat-data',
};

const catEmoji: Record<string, string> = {
  Service: '🔧',
  Beauty: '💅',
  Education: '📚',
  Creative: '🎨',
  Data: '📊',
};

// ─── Animated project card ───────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [showcaseOpen, setShowcaseOpen] = useState(false);
  const hasShowcase = Boolean(project.galleryImages && project.galleryImages.length > 0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -6;
    const rotY = ((x - cx) / cx) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
  }

  function handleMouseLeave() {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
    >
      <div
        ref={cardRef}
        className={`glass-card rounded-2xl flex flex-col justify-between ${catClass[project.category]}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transition: 'transform 0.18s ease, box-shadow 0.3s ease' }}
      >
        <ProjectMedia
          title={project.title}
          coverImage={project.coverImage}
          previewVideoMp4={project.previewVideoMp4}
          previewVideoWebm={project.previewVideoWebm}
          videoPoster={project.videoPoster}
          mediaAlt={project.mediaAlt}
        />

        {/* Accent top line */}
        <div className="card-accent-line rounded-t-2xl" />

        <div className="p-6 flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="cat-icon-bg p-2 rounded-xl text-base">{catEmoji[project.category]}</span>
              {project.featured && (
                <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20">
                  <Star size={9} fill="currentColor" /> Featured
                </span>
              )}
            </div>
            <span className={`cat-badge text-[11px] font-semibold px-2.5 py-1 rounded-full`}>
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-white mb-2 leading-snug">{project.title}</h3>
          {project.toolBadge && (
            <span className="inline-flex items-center gap-1 self-start text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-400/20 mb-3 w-fit">
              <Sparkles size={9} /> {project.toolBadge}
            </span>
          )}
          <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

          {hasShowcase && (
            <button
              type="button"
              onClick={() => setShowcaseOpen(true)}
              className="mb-5 inline-flex items-center gap-2 self-start text-xs font-medium text-amber-300 hover:text-amber-200 transition-colors"
            >
              <Images size={14} /> View full gallery &amp; preview video
            </button>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag, i) => (
              <span key={i} className="tag-mono text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-500 border border-white/5">
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className={`grid ${project.etsyUrl ? 'grid-cols-2' : 'grid-cols-1'} gap-2 pt-4 border-t border-white/5`}>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all group/btn"
              title="Live Site"
            >
              <Globe size={15} className="text-slate-400 group-hover/btn:text-white transition-colors" />
              <span className="text-[10px] text-slate-500 group-hover/btn:text-slate-300 transition-colors">Live Site</span>
            </a>
            {project.etsyUrl && (
              <a
                href={project.etsyUrl}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-1 py-2.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 transition-all group/btn border border-orange-500/10"
                title="Buy on Etsy"
              >
                <ShoppingBag size={15} className="text-orange-400 group-hover/btn:text-orange-300 transition-colors" />
                <span className="text-[10px] text-orange-500/70 group-hover/btn:text-orange-300 transition-colors">Buy Template</span>
              </a>
            )}
          </div>
        </div>
      </div>
      {hasShowcase && (
        <ProjectShowcase
          isOpen={showcaseOpen}
          onClose={() => setShowcaseOpen(false)}
          title={project.title}
          description={project.description}
          galleryImages={project.galleryImages ?? []}
          mediaAlts={project.galleryImageAlts ?? []}
          previewVideoMp4={project.previewVideoMp4}
          previewVideoWebm={project.previewVideoWebm}
          videoPoster={project.videoPoster}
          features={project.features}
          toolHighlight={project.toolHighlight}
          liveUrl={project.liveUrl}
          etsyUrl={project.etsyUrl}
          caseStudy={project.caseStudy}
        />
      )}
    </motion.div>
  );
}

// ─── Projects data ────────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    title: 'InsightForge Business Analytics Studio',
    category: 'Data',
    description: 'A privacy-first business intelligence web application that transforms CSV sales, customer and review data into interactive dashboards, customer segments, sentiment insights, forecasts, scenario plans and downloadable management reports.',
    tags: ['React', 'TypeScript', 'Python', 'Pandas', 'D3', 'Data Visualisation', 'Machine Learning', 'Analytics'],
    liveUrl: 'https://iederees-create.github.io/insightforge-business-analytics-dashboard/',
    // etsyUrl intentionally omitted - the Etsy listing is still a draft
    // and must not be linked publicly yet.
    featured: true,
    toolBadge: 'Privacy-First, Fully Client-Side',
    toolHighlight: 'Every calculation — CSV parsing, customer segmentation, sentiment scoring, forecasting and report generation — runs locally in the browser. No sales, customer or review data is ever uploaded to a server.',
    coverImage: `${import.meta.env.BASE_URL}projects/insightforge/cover.webp`,
    previewVideoMp4: `${import.meta.env.BASE_URL}projects/insightforge/preview.mp4`,
    previewVideoWebm: `${import.meta.env.BASE_URL}projects/insightforge/preview.webm`,
    videoPoster: `${import.meta.env.BASE_URL}projects/insightforge/video-poster.webp`,
    mediaAlt: 'InsightForge Business Analytics Studio dashboard showing interactive sales, customer and sentiment charts',
    galleryImages: [
      `${import.meta.env.BASE_URL}projects/insightforge/01-cover.webp`,
      `${import.meta.env.BASE_URL}projects/insightforge/02-dashboard-overview.webp`,
      `${import.meta.env.BASE_URL}projects/insightforge/03-csv-mapping-wizard.webp`,
      `${import.meta.env.BASE_URL}projects/insightforge/04-data-quality-lab.webp`,
      `${import.meta.env.BASE_URL}projects/insightforge/05-sales-product-analytics.webp`,
      `${import.meta.env.BASE_URL}projects/insightforge/06-customer-segmentation.webp`,
      `${import.meta.env.BASE_URL}projects/insightforge/07-sentiment-topic-explorer.webp`,
      `${import.meta.env.BASE_URL}projects/insightforge/08-forecast-scenario-planner.webp`,
      `${import.meta.env.BASE_URL}projects/insightforge/09-report-builder.webp`,
      `${import.meta.env.BASE_URL}projects/insightforge/10-included-credentials.webp`,
    ],
    galleryImageAlts: [
      'InsightForge Business Analytics Studio cover image showing the interactive analytics dashboard and privacy-first CSV workflow',
      'Dashboard overview with interactive sales, revenue and performance charts',
      'CSV column-mapping wizard for importing sales, customer and review data',
      'Data Quality Lab screen highlighting missing values, duplicates and cleaning suggestions',
      'Sales and product analytics view with trend lines and top-product breakdowns',
      'Customer segmentation view showing grouped customer cohorts and segment profiles',
      'Sentiment and topic explorer analysing customer review text for sentiment and recurring themes',
      'Forecast and scenario planner showing projected sales under different business scenarios',
      'Report builder screen for generating a downloadable management report',
      'Included credentials and documentation screen listing what is provided with the analytics studio',
    ],
    features: [
      'Client-only architecture — CSV parsing, analysis and visualisation run entirely in the browser',
      'CSV column-mapping wizard for sales, customer and review data with a data-quality lab',
      'Interactive sales, product and customer analytics dashboards',
      'Automated customer segmentation and cohort profiling',
      'Sentiment and topic analysis on free-text customer reviews',
      'Forecasting and what-if scenario planning tools',
      'One-click downloadable management reports',
      'Optional companion Python/Pandas/scikit-learn toolkit with Jupyter notebooks for deeper offline analysis',
    ],
    caseStudy: {
      methodology: 'Built as a fully client-only, single-page web application — all CSV parsing, analysis and visualisation happen in the visitor\'s own browser. There is no backend server and no database; the app ships as a static bundle (React + TypeScript + Vite) that runs entirely on the user\'s device.',
      toolsUsed: ['React', 'TypeScript', 'Vite', 'Zustand', 'D3', 'Papa Parse', 'Tailwind CSS', 'Python (optional toolkit)', 'Pandas (optional toolkit)', 'scikit-learn (optional toolkit)'],
      technicalChallenge: {
        title: 'Papa Parse worker-thread hang under Vite',
        body: 'During development, Papa Parse\'s worker: true mode silently hung when bundled by Vite\'s ESM-based build — parsing appeared to start but never resolved, with no console error. The issue only surfaced through live browser testing, not unit tests. It was fixed by switching to main-thread chunked parsing, trading a small amount of main-thread work on very large files for reliable, debuggable parsing behaviour.',
      },
      privacyDesign: 'All processing — CSV parsing, segmentation, sentiment analysis, forecasting and report generation — happens locally in the browser. No sales, customer or review data is ever uploaded to a server. The only thing persisted between sessions is the user\'s column-mapping preference, and it is only stored after the user explicitly opts in.',
      testResults: [
        '39 Vitest tests passing across the calculation engine',
        '32 pytest tests passing in the optional Python toolkit',
        'All 5 Jupyter notebooks verified executing cleanly end-to-end',
      ],
    },
  },
  {
    title: 'Bank Desert Analysis Student Lab',
    category: 'Data',
    description: 'An academically responsible Python and Pandas learning toolkit that helps students design, analyse and explain financial-access research using demographic data, institution locations, interactive maps and transparent statistical models.',
    tags: ['Python', 'Pandas', 'Jupyter', 'Census API', 'Leaflet', 'Statistics', 'Data Visualisation', 'Geospatial Analysis'],
    liveUrl: 'https://iederees-create.github.io/bank-desert-analysis-student-lab/',
    // etsyUrl intentionally omitted - the Etsy listing is still a draft
    // and must not be linked publicly yet.
    featured: true,
    toolBadge: 'Privacy-First, Fully Client-Side',
    toolHighlight: 'A static, client-only single-page app — CSV parsing, the Financial Access Score, and every Statistics Lab calculation run in the student\'s browser. Nothing is sent to a server, because there isn\'t one.',
    coverImage: `${import.meta.env.BASE_URL}projects/bank-desert-analysis/01-cover.png`,
    previewVideoMp4: `${import.meta.env.BASE_URL}projects/bank-desert-analysis/preview.mp4`,
    previewVideoWebm: `${import.meta.env.BASE_URL}projects/bank-desert-analysis/preview.webm`,
    videoPoster: `${import.meta.env.BASE_URL}projects/bank-desert-analysis/video-poster.webp`,
    mediaAlt: 'Bank Desert Analysis Student Lab dashboard showing the Financial Access Score, interactive map, and statistics lab',
    galleryImages: [
      `${import.meta.env.BASE_URL}projects/bank-desert-analysis/01-cover.png`,
      `${import.meta.env.BASE_URL}projects/bank-desert-analysis/05-interactive-map.png`,
      `${import.meta.env.BASE_URL}projects/bank-desert-analysis/06-poverty-access-analysis.png`,
      `${import.meta.env.BASE_URL}projects/bank-desert-analysis/07-statistics-lab.png`,
    ],
    galleryImageAlts: [
      'Bank Desert Analysis Student Lab cover image showing the Financial Access Score dashboard',
      'Interactive Leaflet map showing bank branch locations and area-level financial access scores',
      'Poverty rate versus bank access analysis view with a scatter plot and regression line',
      'Statistics Lab showing descriptive statistics, correlation, regression, and confidence intervals with formulas shown alongside every result',
    ],
    features: [
      'Guided Research Designer that generates a research-question outline, variable list, and project checklist (a template engine, not an AI/LLM call)',
      'Data Source Planner covering Census ACS, FDIC BankFind, NCUA, and optional bring-your-own-key Google Places lookups',
      'Import & Mapping Wizard with independent, toggleable data-cleaning steps (trim, dedupe, missing-value handling, type coercion)',
      'Financial Access Score Builder — a transparent, student-adjustable weighted composite score across six factors, with a sensitivity view',
      'Statistics Lab: descriptive stats, Pearson and Spearman correlation, simple/multiple OLS regression with confidence intervals, residual plots, outlier flags, a multicollinearity check, and a minimum-sample-size guard',
      'Map & Visualisation Lab built on Leaflet with choropleth and scatter-plot views',
      'Report & Citation Builder that assembles findings into an exportable report, entirely client-side',
      'Companion Python analyst-toolkit with ten guided Jupyter notebooks, tested independently with pytest',
    ],
    caseStudy: {
      methodology: 'Built as a static, client-only single-page application (React 19 + TypeScript + Vite) — there is no backend and no database. Every calculation (CSV parsing, the Financial Access Score, and every Statistics Lab method) runs in the student\'s browser. A companion Python package, analyst-toolkit, ships alongside the web app for students who want to go deeper in Jupyter, but it is optional and separate from the web app\'s data flow.',
      toolsUsed: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS v4', 'Zustand', 'Leaflet', 'react-leaflet', 'D3 (accessible chart primitives)', 'Vitest', 'Testing Library', 'Python', 'Pandas', 'Jupyter', 'pytest'],
      technicalChallenge: {
        title: 'Supporting optional Google Places lookups with zero backend and zero key exposure',
        body: 'The product\'s core constraint is that no student data — and no student credential — should ever leave the browser or touch a server that doesn\'t exist. That made the optional Google Places bring-your-own-key (BYOK) feature in the Data Source Planner a real design problem: it needed to call a paid third-party API without a backend to proxy or store the key. The solution keeps the key in session-only React state (never localStorage), sends it only in direct browser-to-Google requests, and clears it automatically on tab close or refresh — preserving the "nothing leaves your browser except what you explicitly asked to send" guarantee even for the one feature that has to talk to an external paid API.',
      },
      privacyDesign: 'Nothing leaves the browser by default — there is no backend for it to go to. Uploaded CSVs are read via the File API and processed entirely in memory. If a student opts in to Storage Consent, only column-mapping and score-weight preferences are saved to localStorage, never the underlying data. The bundled demonstration dataset is entirely synthetic (fixed random seed, no real Census or institution records). The optional Google Places API key lives only in session-only state and is never persisted or sent anywhere but Google\'s own endpoint.',
      testResults: [
        '107/107 Vitest tests passing across the web app',
        '53/53 pytest tests passing in the analyst-toolkit',
        'All 10 guided Jupyter notebooks execute cleanly end-to-end',
        'Clean production build and lint with zero errors',
      ],
    },
  },
  {
    title: 'RAVERSUS Clinical Portal',
    category: 'Service',
    description: 'Advanced interactive digital clinic and product reservation platform engineered for high-end bioelectric healing technology.',
    tags: ['E-Commerce', 'Custom Animations', 'API Integration'],
    liveUrl: 'https://iederees-create.github.io/raversus-v3/',
    featured: true,
  },
  {
    title: 'Tiling Contractor Website Template',
    category: 'Service',
    description: 'A premium lead-generation website template for tiling contractors and flooring specialists, featuring an interactive Tile Project Planner, quantity estimator, structured quote summaries, WhatsApp handoff, responsive design and simple business customisation.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Local SEO', 'Lead Generation', 'Tile Calculator'],
    liveUrl: 'https://iederees-create.github.io/tableview-tiling-ct-ct/',
    featured: true,
    toolBadge: 'Interactive Tile Project Planner',
    toolHighlight: 'The Tile Project Planner is an original 8-step calculator: visitors enter their room measurements and tile size, choose a layout, and get an instant area/tile/box/cost estimate with indicative material guidance — then send a structured quote request via WhatsApp or email.',
    coverImage: `${import.meta.env.BASE_URL}projects/tableview-tiling/cover.webp`,
    previewVideoMp4: `${import.meta.env.BASE_URL}projects/tableview-tiling/preview.mp4`,
    previewVideoWebm: `${import.meta.env.BASE_URL}projects/tableview-tiling/preview.webm`,
    videoPoster: `${import.meta.env.BASE_URL}projects/tableview-tiling/video-poster.webp`,
    mediaAlt: 'Tiling contractor website template with an interactive Tile Project Planner',
    galleryImages: [
      `${import.meta.env.BASE_URL}projects/tableview-tiling/01-cover.webp`,
      `${import.meta.env.BASE_URL}projects/tableview-tiling/02-desktop.webp`,
      `${import.meta.env.BASE_URL}projects/tableview-tiling/03-mobile.webp`,
      `${import.meta.env.BASE_URL}projects/tableview-tiling/04-planner.webp`,
      `${import.meta.env.BASE_URL}projects/tableview-tiling/05-results.webp`,
      `${import.meta.env.BASE_URL}projects/tableview-tiling/06-quote-whatsapp.webp`,
      `${import.meta.env.BASE_URL}projects/tableview-tiling/07-services-gallery.webp`,
      `${import.meta.env.BASE_URL}projects/tableview-tiling/08-site-config.webp`,
      `${import.meta.env.BASE_URL}projects/tableview-tiling/09-themes.webp`,
      `${import.meta.env.BASE_URL}projects/tableview-tiling/10-included-files.webp`,
    ],
    galleryImageAlts: [
      'Tiling contractor website template cover image showing the interactive tile calculator, responsive design, and digital download',
      'Desktop homepage view of the tiling contractor website template with hero, services grid, and premium architectural design',
      'Mobile homepage and open hamburger navigation menu on the tiling contractor website template',
      'Tile Project Planner interactive tool showing the project-type selection step of the 8-step wizard',
      'Tile Project Planner results step showing measured area, wastage, tile count, box count, and material cost',
      'Tile Project Planner structured quote summary with copy, print, download, and WhatsApp send options',
      'Tiling services grid and project gallery of layout patterns including herringbone and chevron',
      'site-config.js configuration file used to rebrand the tiling website template without editing HTML',
      'Three colour theme presets: Limestone Studio, Charcoal Brass, and Coastal Clay',
      'List of included files, buyer guide, and support documentation in the tiling website template package',
    ],
    features: [
      '8-step Tile Project Planner: type, measurements, tile size, layout, conditions, wastage, estimate, send',
      'Unit conversion (m/cm/ft/in) and single/multiple/wall/floor-plus-wall measurement modes',
      'Instant tile, box, and material-cost estimate — always rounded up, never fractional',
      'Indicative adhesive/grout/levelling/waterproofing guidance, clearly labelled as non-binding',
      'Structured quote summary: copy, print, download, WhatsApp, or email handoff',
      'Three switchable colour themes: Limestone Studio, Charcoal Brass, Coastal Clay',
      'Accessible: keyboard navigation, screen reader support, visible focus states',
      'Zero external dependencies — no CDN fonts, scripts, or tracking',
    ],
  },
  {
    title: 'Construction Website Template',
    category: 'Service',
    description: 'A premium lead-generation website template for builders and renovation contractors, featuring an interactive Renovation Scope & Budget Planner, structured quote summaries, configurable assumptions, responsive design and WhatsApp or email quote handoff.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Local SEO', 'Lead Generation', 'Quote Planner', 'Accessibility'],
    liveUrl: 'https://iederees-create.github.io/southern-suburbs-builders-ct/',
    // etsyUrl intentionally omitted - the Etsy listing is still a draft
    // and must not be linked publicly yet. See PORTFOLIO-ETSY-LINK-AUDIT.md.
    featured: true,
    toolBadge: 'Renovation Scope & Budget Planner',
    toolHighlight: 'Visitors define their project (type, dimensions, finish level, trades, site access, occupancy) and get an instant preliminary scope, complexity indicator, configurable budget range, trade checklist, photo checklist and structured summary — with an explicit-confirmation step before any WhatsApp or email message is sent.',
    coverImage: `${import.meta.env.BASE_URL}projects/southern-suburbs-builders/cover.webp`,
    previewVideoMp4: `${import.meta.env.BASE_URL}projects/southern-suburbs-builders/preview.mp4`,
    previewVideoWebm: `${import.meta.env.BASE_URL}projects/southern-suburbs-builders/preview.webm`,
    videoPoster: `${import.meta.env.BASE_URL}projects/southern-suburbs-builders/video-poster.webp`,
    mediaAlt: 'Construction website template with an interactive Renovation Scope & Budget Planner',
    galleryImages: [
      `${import.meta.env.BASE_URL}projects/southern-suburbs-builders/01-gallery.webp`,
      `${import.meta.env.BASE_URL}projects/southern-suburbs-builders/02-gallery.webp`,
      `${import.meta.env.BASE_URL}projects/southern-suburbs-builders/03-gallery.webp`,
      `${import.meta.env.BASE_URL}projects/southern-suburbs-builders/04-gallery.webp`,
      `${import.meta.env.BASE_URL}projects/southern-suburbs-builders/05-gallery.webp`,
      `${import.meta.env.BASE_URL}projects/southern-suburbs-builders/06-gallery.webp`,
      `${import.meta.env.BASE_URL}projects/southern-suburbs-builders/07-gallery.webp`,
      `${import.meta.env.BASE_URL}projects/southern-suburbs-builders/08-gallery.webp`,
      `${import.meta.env.BASE_URL}projects/southern-suburbs-builders/09-gallery.webp`,
      `${import.meta.env.BASE_URL}projects/southern-suburbs-builders/10-gallery.webp`,
    ],
    galleryImageAlts: [
      'Southern Suburbs Builders website template homepage hero, showing Request a Quote, Call, and WhatsApp Us buttons',
      'Desktop view of the homepage with navigation bar, hero section, and trust indicator bar',
      'Mobile view of the homepage at a 390px viewport width with the responsive hamburger menu',
      'The Renovation Scope & Budget Planner section heading and introductory copy',
      'The Planner form filled in with an example project: a Claremont kitchen renovation',
      'Planner results panel showing measured area, complexity indicator, preliminary budget range and assumptions',
      "The Planner's generated structured text project summary, ready to copy, print or download",
      "A confirmation dialog showing the exact WhatsApp message text before anything is sent",
      'The homepage re-rendered in the Blueprint Navy colour theme, one of three included themes',
      'The five files included in the digital download: template ZIP, buyer guides, licence and AI disclosure',
    ],
    features: [
      'Interactive Renovation Scope & Budget Planner covering 9 project types, 4 finish levels and 8 trade categories',
      'Configurable budget-range engine (rates, finish multipliers, trade add-ons, complexity multipliers) with a pure, unit-tested calculation core shared between the browser and an automated test suite',
      'Explicit-confirmation modal before any WhatsApp or email message is sent — nothing fires automatically',
      'Three switchable colour themes: Concrete & Brass, Cape Clay, Blueprint Navy',
      'Central site-config.js configuration — rebrand without touching HTML/CSS/JS',
      'Accessible: skip link, visible focus states, reduced-motion support, keyboard-operable accordions',
      'Structured data, Open Graph tags, sitemap and robots.txt for local SEO',
      'Every unsupported claim (star ratings, "fully insured", fabricated stats) removed from the original draft and replaced with clearly labelled, buyer-editable sample content',
    ],
    caseStudy: {
      methodology: 'Built as a self-contained static site (HTML/CSS/vanilla JavaScript, no framework or build step) with a deliberate architectural split: the Renovation Scope & Budget Planner\'s calculation engine is a pure module with zero DOM access, so its budget math can run identically inside the browser and under an automated Node test suite with no mocking required.',
      toolsUsed: ['HTML5', 'CSS3', 'JavaScript (ES5)', "Node's built-in test runner", 'Chrome DevTools Protocol (live QA)', 'GitHub Pages'],
      technicalChallenge: {
        title: 'A CSS containing-block bug collapsed the mobile menu to 48px tall',
        body: 'The mobile hamburger menu is a position:fixed off-canvas panel. A backdrop-filter on its sticky header ancestor silently created a new CSS containing block for that fixed-position descendant, so its top/bottom offsets resolved against the short header bar instead of the viewport — collapsing the menu to roughly 48px tall instead of full height. This was invisible in any unit test and was only caught by driving the live, deployed site in a real browser and measuring the rendered element with getBoundingClientRect(). Fixed by moving the blur effect to a ::before pseudo-element instead, which has no fixed-position descendants of its own.',
      },
      privacyDesign: 'There is no backend, database, or analytics script. The Planner and quote form assemble a WhatsApp or email message from the visitor\'s own input entirely in the browser; the exact message is always shown in an on-screen confirmation dialog first, and nothing is sent until the visitor explicitly clicks "Confirm & Send." The only thing persisted between visits is the chosen colour theme, in localStorage.',
      testResults: [
        '25 automated tests passing for the Planner\'s calculation engine (area math, budget ranges, finish multipliers, invalid/zero/negative input handling, WhatsApp/email encoding, disabled-budget mode)',
        'Lighthouse: 100 Accessibility, 100 Best Practices, 100 SEO on the live deployment',
        '4 real defects found and fixed via live-browser testing that no unit test could have caught (a confirm-modal visibility bug, a mobile horizontal-scroll bug, the containing-block bug above, and an uncaught error that silently broke page init on every secondary page)',
      ],
    },
  },
  {
    title: 'Claude Code Solar Lead Generation Template',
    category: 'Service',
    description: 'A responsive solar-installer website template developed with assistance from Claude Code. It includes an interactive savings calculator, lead-capture form, project filtering, configurable business information and mobile-first design.',
    tags: ['Claude Code', 'HTML5', 'CSS3', 'JavaScript', 'GitHub Pages', 'Responsive Design'],
    liveUrl: 'https://iederees-create.github.io/ac-solar-solutions-ct/',
    featured: true,
  },
  {
    title: 'Pest Control Website Template',
    category: 'Service',
    description: 'A conversion-focused website template for pest-control companies, exterminators and termite specialists, featuring service presentation, quote-request flows, WhatsApp contact, mobile-first design and simple business customisation.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Local SEO', 'Lead Generation', 'Pest Control'],
    liveUrl: 'https://iederees-create.github.io/westlake-pest-control-template/',
    featured: true,
  },
  {
    title: 'Vitality Wellness Website Template',
    category: 'Beauty',
    description: 'A premium React website template for wellness studios, skincare businesses and beauty practitioners, featuring an interactive consultation finder, treatment presentation, booking flows, responsive design and central business customisation.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Responsive Design', 'Local SEO', 'Lead Generation'],
    liveUrl: 'https://iederees-create.github.io/vitality-wellness-claremont-ct/',
    featured: true,
    coverImage: `${import.meta.env.BASE_URL}projects/vitality-wellness/cover.webp`,
    previewVideoMp4: `${import.meta.env.BASE_URL}projects/vitality-wellness/preview.mp4`,
    previewVideoWebm: `${import.meta.env.BASE_URL}projects/vitality-wellness/preview.webm`,
    videoPoster: `${import.meta.env.BASE_URL}projects/vitality-wellness/video-poster.webp`,
    mediaAlt: 'Vitality Wellness website template: sage-and-gold wellness studio homepage with a hero section, consultation finder and treatment pricing cards.',
  },
  {
    title: 'Summit Painting CT',
    category: 'Service',
    description: 'Premium service business landing page engineered for local visibility, featuring optimized client onboarding paths.',
    tags: ['React', 'Tailwind', 'Vite'],
    liveUrl: 'https://iederees-create.github.io/summit-painting-ct-ct/',
    // etsyUrl removed - see PORTFOLIO-ETSY-LINK-AUDIT.md
    featured: true,
  },
  {
    title: 'Amore Nails CT',
    category: 'Beauty',
    description: 'Elegant boutique beauty salon application showcasing creative portfolios, service menus, and modern interactive touchpoints.',
    tags: ['TypeScript', 'Tailwind CSS', 'UI/UX'],
    liveUrl: 'https://iederees-create.github.io/amore-nails-ct/',
    // etsyUrl removed - see PORTFOLIO-ETSY-LINK-AUDIT.md
    featured: true,
  },
  {
    title: 'Pixel Perfect Hair',
    category: 'Beauty',
    description: 'Highly visual digital showroom tailored for modern salon styling branding and clean presentation workflows.',
    tags: ['React', 'Vite', 'Responsive Layout'],
    liveUrl: 'https://iederees-create.github.io/pixel-perfect-hair/',
    // etsyUrl removed - see PORTFOLIO-ETSY-LINK-AUDIT.md
  },
  {
    title: 'Zen Skin Studio Website Template',
    category: 'Beauty',
    description: 'A premium conversion-focused website template for aesthetic clinics, skincare studios and beauty practitioners, featuring treatment presentation, online enquiry flows, WhatsApp booking, mobile-first design and simple business customisation.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Local SEO', 'Beauty Business'],
    liveUrl: 'https://iederees-create.github.io/zen-skin-studio-template/',
    featured: true,
  },
  {
    title: 'Acme Plumbing Claremont',
    category: 'Service',
    description: 'Conversion-driven emergency dispatch and routing hub optimized for high performance and clean visual hierarchy.',
    tags: ['React', 'SEO Framework', 'Tailwind'],
    liveUrl: 'https://iederees-create.github.io/acme-plumbing-claremont-ct/',
    // etsyUrl removed - see PORTFOLIO-ETSY-LINK-AUDIT.md
  },
  {
    title: 'Window Wizards CT',
    category: 'Service',
    description: 'Polished commercial service application focusing on interactive quotes and premium glass components.',
    tags: ['TypeScript', 'Vite', 'Components'],
    liveUrl: 'https://iederees-create.github.io/window-wizards-ct-ct/',
    // etsyUrl removed - see PORTFOLIO-ETSY-LINK-AUDIT.md
  },
  {
    title: 'First Choice Construction',
    category: 'Service',
    description: 'Heavyweight construction enterprise portal designed to showcase multi-stage real estate developments and scale.',
    tags: ['React', 'Production Build', 'Tailwind'],
    liveUrl: 'https://iederees-create.github.io/first-choice-construction-ct/',
    // etsyUrl removed - see PORTFOLIO-ETSY-LINK-AUDIT.md
    featured: true,
  },
  {
    title: 'Creator Hub Pro Template',
    category: 'Creative',
    description: 'A modular, backend-ready portfolio ecosystem designed for high-tier digital creators to manage brand partnerships and media grids.',
    tags: ['Component Driven', 'Supabase Ready', 'Responsive UI'],
    liveUrl: 'https://iederees-create.github.io/creator-hub-template/',
    // etsyUrl removed - see PORTFOLIO-ETSY-LINK-AUDIT.md
    featured: true,
  },
  {
    title: 'Aura Signs',
    category: 'Creative',
    description: 'Stunning artistic branding workspace focused on visual design aesthetics, layout assets, and sign production.',
    tags: ['UI/UX Design', 'Vite', 'Tailwind'],
    liveUrl: 'https://iederees-create.github.io/aura-signs/',
    // etsyUrl removed - see PORTFOLIO-ETSY-LINK-AUDIT.md
  },
  {
    title: 'Fluent Path Tutoring',
    category: 'Education',
    description: 'Clean learning management index and appointment hub designed for modern educational structures and smooth navigation.',
    tags: ['TypeScript', 'React', 'Data Visuals'],
    liveUrl: 'https://iederees-create.github.io/fluent-path-tutoring/',
    // etsyUrl removed - see PORTFOLIO-ETSY-LINK-AUDIT.md
  },
];

const categories = ['All', 'Service', 'Beauty', 'Education', 'Creative', 'Data'];

export default function WorkPage() {
  const [filter, setFilter] = useState<string>('All');
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-16 sm:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/8 text-xs font-medium text-slate-400 mb-4">
          <Layers size={11} />
          Portfolio — {projects.length} Projects
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
          Live client websites
        </h1>
        <p className="text-slate-400">Click any card to visit the live site, buy the template, or view the source code.</p>
      </motion.div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
              filter === cat
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                : 'liquid-glass text-slate-400 hover:text-white'
            }`}
          >
            {cat !== 'All' && catEmoji[cat] + ' '}{cat}
          </button>
        ))}
      </div>

      {/* Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
