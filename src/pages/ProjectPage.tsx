import { Link, useParams } from 'react-router-dom';
import { ExternalLink, Images, ShoppingBag } from 'lucide-react';
import SEO from '../components/SEO';
import { getArticleBySlug } from '../content/blog/articles';
import { projectSlug, projects } from './WorkPage';

const articleByProjectTitle: Record<string, string> = {
  'Construction Website Template': 'construction-website-quote-planner',
  'Bank Desert Analysis Student Lab': 'bank-desert-analysis-python-census-google-places',
  'Fluent Path Tutoring': 'why-educational-businesses-need-custom-learning-hubs',
};

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

            <div className="flex flex-wrap gap-3">
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

        {related.length > 0 && (
          <section className="mt-14 border-t border-white/10 pt-8">
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
