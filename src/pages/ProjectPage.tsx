import { Link, useParams } from 'react-router-dom';
import { ExternalLink, Images, ShoppingBag, MessageCircle, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { getArticleBySlug } from '../content/blog/articles';
import { projectSlug, projects } from './WorkPage';

// ─── Contact constants ────────────────────────────────────
const WHATSAPP = '27629494708';
const EMAIL = 'iedereesfrancis@gmail.com';

// Projects that should NOT show the contact CTA
const NO_CONTACT_SLUGS = ['raversus-clinical-portal'];

function buildWALink(projectTitle: string) {
  const msg = encodeURIComponent(
    `👋 Hi Iederees! I was browsing your portfolio and I'm interested in your *${projectTitle}* project.\n\nCan we chat about something similar for my business?`
  );
  return `https://wa.me/${WHATSAPP}?text=${msg}`;
}

function buildEmailLink(projectTitle: string) {
  const subject = encodeURIComponent(`Enquiry about: ${projectTitle} — NextGenWebs Portfolio`);
  const body = encodeURIComponent(
    `Hi Iederees,\n\nI saw your "${projectTitle}" project on your portfolio and I'm interested in something similar.\n\nHere's what I have in mind:\n\n[your message here]\n\nLooking forward to hearing from you!`
  );
  return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
}

// ─── Article map ──────────────────────────────────────────
const articleByProjectTitle: Record<string, string> = {
  'SupportForge AI Assistant': 'ai-portfolio-assistant',
  'Trading Affiliate Website Template / Deriv Partner Affiliate Launchpad': 'trading-affiliate-website-template',
  'InsightForge Business Analytics Studio': 'insightforge-business-analytics-studio',
  'Bank Desert Analysis Student Lab': 'bank-desert-analysis-python-census-google-places',
  'RAVERSUS Clinical Portal': 'raversus-clinical-portal',
  'Tiling Contractor Website Template': 'tiling-contractor-website-template',
  'Construction Website Template': 'construction-website-quote-planner',
  'Precision Laser Website Template': 'laser-cutting-website-quote-planner',
  'Claude Code Solar Lead Generation Template': 'solar-lead-generation-website-template',
  'Pest Control Website Template': 'pest-control-website-template',
  'Vitality Wellness Website Template': 'vitality-wellness-website-template',
  'Summit Painting CT': 'painting-contractor-website-design',
  'Amore Nails CT': 'amore-nails-ct-website',
  'Pixel Perfect Hair': 'pixel-perfect-hair-salon-website',
  'Zen Skin Studio Website Template': 'zen-skin-studio-website-template',
  'Acme Plumbing Claremont': 'plumbing-website-design-cape-town',
  'Window Wizards CT': 'window-cleaning-glazing-website-design',
  'First Choice Construction': 'construction-company-website-design-cape-town',
  'Creator Hub Pro Template': 'creator-hub-digital-portfolio-template',
  'Aura Signs': 'signage-business-website-design',
  'Fluent Path Tutoring': 'why-educational-businesses-need-custom-learning-hubs',
};

// ─── Enquiry CTA block ────────────────────────────────────
function ProjectEnquiryCTA({ title }: { title: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-14 rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden"
    >
      {/* Header strip */}
      <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
        <div>
          <p className="text-xs font-mono text-primary-400 uppercase tracking-widest mb-1">Interested in this?</p>
          <h2 className="text-lg font-bold text-white">Let's build something like this for you</h2>
        </div>
        <div className="hidden sm:block w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
          <MessageCircle size={18} className="text-green-400" />
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-6">
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          This is a real project I built. If you need something similar — or want a custom version for your business — reach out and I'll get back to you fast.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          {/* WhatsApp */}
          <a
            href={buildWALink(title)}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 px-5 py-4 rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/10"
            style={{ background: 'linear-gradient(135deg, rgba(37,211,102,0.12), rgba(18,140,126,0.08))', border: '1px solid rgba(37,211,102,0.2)' }}
          >
            <div className="w-9 h-9 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-green-400">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.553 4.104 1.517 5.829L.057 23.571a.5.5 0 0 0 .637.612l5.9-1.545A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.9 9.9 0 0 1-5.031-1.371l-.36-.214-3.732.978.996-3.647-.235-.374A9.861 9.861 0 0 1 2.1 12C2.1 6.533 6.533 2.1 12 2.1c5.466 0 9.9 4.433 9.9 9.9 0 5.467-4.434 9.9-9.9 9.9z"/>
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-xs text-green-400/70 font-semibold uppercase tracking-wide">WhatsApp</p>
              <p className="text-sm font-bold text-white group-hover:text-green-300 transition-colors">Chat instantly</p>
            </div>
            <ArrowRight size={14} className="ml-auto text-green-500/50 group-hover:text-green-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
          </a>

          {/* Email */}
          <a
            href={buildEmailLink(title)}
            className="group flex items-center gap-3 px-5 py-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all hover:-translate-y-0.5"
          >
            <div className="w-9 h-9 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0">
              <Mail size={15} className="text-primary-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Email</p>
              <p className="text-sm font-bold text-white group-hover:text-primary-300 transition-colors">Send a message</p>
            </div>
            <ArrowRight size={14} className="ml-auto text-slate-600 group-hover:text-primary-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
          </a>
        </div>

        {/* Nudge to full contact page */}
        <p className="text-xs text-slate-600 mt-4 text-center">
          Or visit the{' '}
          <Link to="/contact" className="text-primary-400 hover:text-primary-300 underline underline-offset-2">
            Contact page
          </Link>
          {' '}for a full project quote in under 2 minutes.
        </p>
      </div>
    </motion.section>
  );
}

// ─── Page ─────────────────────────────────────────────────
export default function ProjectPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const project = projects.find((candidate) => projectSlug(candidate) === slug);

  if (!project) {
    return (
      <>
        <SEO title="Project not found" description="This project could not be found." path={`work/${slug}/`} noIndex />
        <section className="max-w-3xl mx-auto px-6 pt-40 pb-24 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Project not found</h1>
          <p className="text-slate-400 mb-8">This portfolio project does not exist or may have moved.</p>
          <Link to="/work/" className="text-primary-400 hover:text-primary-300 font-semibold">Back to work</Link>
        </section>
      </>
    );
  }

  const articleSlug = articleByProjectTitle[project.title];
  const article = articleSlug ? getArticleBySlug(articleSlug) : undefined;
  const related = projects
    .filter((candidate) => candidate.title !== project.title && candidate.category === project.category)
    .slice(0, 3);

  const currentSlug = projectSlug(project);
  const showContact = !NO_CONTACT_SLUGS.includes(currentSlug);

  return (
    <>
      <SEO
        title={project.title}
        description={project.description}
        path={`work/${projectSlug(project)}/`}
        ogImage={project.coverImage}
        ogImageAlt={project.mediaAlt}
      >
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.title,
            description: project.description,
            url: `https://iederees-create.github.io/3D-Portfolio/work/${projectSlug(project)}/`,
            image: project.coverImage,
            sameAs: [project.liveUrl],
          })}
        </script>
      </SEO>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-20">
        <nav className="mb-8 text-sm text-slate-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/work/" className="hover:text-white">Work</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">{project.title}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div>
            {project.coverImage ? (
              <img src={project.coverImage} alt={project.mediaAlt ?? `${project.title} cover image`} className="w-full rounded-2xl border border-white/10 bg-black/20 object-cover" />
            ) : (
              <div className="aspect-video rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-slate-500">
                <Images size={28} aria-hidden="true" />
              </div>
            )}
          </div>

          <div>
            <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-300">
              {project.category}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{project.title}</h1>
            <p className="text-slate-400 leading-relaxed mb-6">{project.description}</p>

            {project.toolHighlight && (
              <div className="mb-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-relaxed text-amber-100">
                {project.toolHighlight}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-400">{tag}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-black hover:bg-slate-200">
                <ExternalLink size={16} /> Live Demo
              </a>
              {article && (
                <Link to={`/blog/${article.slug}/`} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
                  Related Article
                </Link>
              )}
              {project.etsyUrl && (
                <a href={project.etsyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-orange-500/20 bg-orange-500/15 px-4 py-2.5 text-sm font-semibold text-orange-300 hover:bg-orange-500/25">
                  <ShoppingBag size={16} /> Buy on Etsy
                </a>
              )}
            </div>

            {/* Per-project contact CTA (inline, right column) */}
            {showContact && (
              <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-white/5">
                <a
                  href={buildWALink(project.title)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #25d366, #128c7e)' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.553 4.104 1.517 5.829L.057 23.571a.5.5 0 0 0 .637.612l5.9-1.545A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.9 9.9 0 0 1-5.031-1.371l-.36-.214-3.732.978.996-3.647-.235-.374A9.861 9.861 0 0 1 2.1 12C2.1 6.533 6.533 2.1 12 2.1c5.466 0 9.9 4.433 9.9 9.9 0 5.467-4.434 9.9-9.9 9.9z"/>
                  </svg>
                  WhatsApp me about this
                </a>
                <a
                  href={buildEmailLink(project.title)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-300 border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
                >
                  <Mail size={15} /> Email me
                </a>
              </div>
            )}
          </div>
        </div>

        {project.previewVideoMp4 || project.previewVideoWebm ? (
          <section className="mt-14">
            <h2 className="text-xl font-semibold text-white mb-4">Preview Video</h2>
            <video controls playsInline poster={project.videoPoster} className="w-full rounded-2xl border border-white/10 bg-black max-h-[76vh] object-contain">
              {project.previewVideoWebm && <source src={project.previewVideoWebm} type="video/webm" />}
              {project.previewVideoMp4 && <source src={project.previewVideoMp4} type="video/mp4" />}
            </video>
          </section>
        ) : null}

        {project.galleryImages && project.galleryImages.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-semibold text-white mb-4">Gallery</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.galleryImages.map((src, index) => (
                <img key={src} src={src} alt={project.galleryImageAlts?.[index] ?? `${project.title} screenshot ${index + 1}`} loading="lazy" className="w-full rounded-xl border border-white/10 bg-black/20 object-cover" />
              ))}
            </div>
          </section>
        )}

        {project.features && project.features.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-semibold text-white mb-4">Case Study Notes</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-slate-300">{feature}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Bottom enquiry CTA — full width */}
        {showContact && <ProjectEnquiryCTA title={project.title} />}

        {related.length > 0 && (
          <section className="mt-10 border-t border-white/10 pt-8">
            <h2 className="text-xl font-semibold text-white mb-4">Related Projects</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {related.map((item) => (
                <Link key={item.title} to={`/work/${projectSlug(item)}/`} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm font-semibold text-slate-200 hover:bg-white/[0.06]">
                  {item.title}
                </Link>
              ))}
            </div>
          </section>
        )}
      </section>
    </>
  );
}

