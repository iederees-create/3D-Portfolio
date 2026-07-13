import { Link, useParams } from 'react-router-dom';
import { ExternalLink, ShoppingBag, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import { getProjectBySlug, getRelatedProjects, projects } from '../content/projects';
import { toAbsoluteUrl } from '../lib/site';

/**
 * Dedicated crawlable case-study page for a portfolio project at /work/:slug/.
 * Etsy CTA only when etsyStatus is 'public' and etsyUrl is set.
 */
export default function ProjectPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <>
        <SEO title="Project not found" description="This portfolio project could not be found." path={`work/${slug}/`} noIndex />
        <div className="pt-40 pb-24 px-6 max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Project not found</h1>
          <p className="text-slate-400 mb-8">This project doesn&apos;t exist or may have been moved.</p>
          <Link to="/work/" className="text-primary-400 hover:text-primary-300 font-semibold">
            ← Back to work
          </Link>
        </div>
      </>
    );
  }

  const publicEtsy = Boolean(project.etsyUrl && project.etsyStatus === 'public');
  const title = project.seoTitle ?? project.title;
  const description =
    project.seoDescription ?? project.description.slice(0, 155);
  const ogImage = project.coverImage
    ? project.coverImage.startsWith('http')
      ? project.coverImage
      : toAbsoluteUrl(project.coverImage.replace(import.meta.env.BASE_URL, ''))
    : undefined;
  const related = getRelatedProjects(project);
  const gallery = project.galleryImages ?? [];
  const alts = project.galleryImageAlts ?? [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: toAbsoluteUrl(`work/${project.slug}/`),
    author: { '@type': 'Person', name: 'Iedrees Francis' },
    ...(ogImage ? { image: ogImage } : {}),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: toAbsoluteUrl('') },
      { '@type': 'ListItem', position: 2, name: 'Work', item: toAbsoluteUrl('work/') },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: toAbsoluteUrl(`work/${project.slug}/`),
      },
    ],
  };

  return (
    <>
      <SEO
        title={title}
        description={description}
        path={`work/${project.slug}/`}
        ogType="website"
        ogImage={ogImage}
        ogImageAlt={project.mediaAlt}
      >
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </SEO>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-20">
        <nav className="text-xs text-slate-500 mb-6 flex flex-wrap gap-2" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-slate-300">Home</Link>
          <span>/</span>
          <Link to="/work/" className="hover:text-slate-300">Work</Link>
          <span>/</span>
          <span className="text-slate-300">{project.title}</span>
        </nav>

        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">{project.category}</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">{project.title}</h1>
        <p className="text-lg text-slate-300 leading-relaxed mb-8">{project.description}</p>

        <div className="flex flex-wrap gap-3 mb-10">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-slate-200 transition-colors"
          >
            <ExternalLink size={16} /> Live demo
          </a>
          {publicEtsy && project.etsyUrl && (
            <a
              href={project.etsyUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500/20 text-orange-200 border border-orange-500/30 text-sm font-semibold hover:bg-orange-500/30 transition-colors"
            >
              <ShoppingBag size={16} /> Buy on Etsy
            </a>
          )}
          {project.articleSlug && (
            <Link
              to={`/blog/${project.articleSlug}/`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 text-slate-200 border border-white/10 text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Related article
            </Link>
          )}
        </div>

        {project.coverImage && (
          <figure className="mb-12 rounded-2xl overflow-hidden border border-white/10">
            <img
              src={project.coverImage}
              alt={project.mediaAlt ?? project.title}
              className="w-full h-auto"
              width={1200}
              height={675}
              loading="eager"
            />
          </figure>
        )}

        <section className="mb-10 prose-invert">
          <h2 className="text-xl font-semibold text-white mb-3">Overview</h2>
          <p className="text-slate-300 leading-relaxed">{project.description}</p>
          {project.buyerAudience && (
            <p className="text-slate-400 mt-4">
              <span className="text-slate-200 font-medium">Target customer: </span>
              {project.buyerAudience}
            </p>
          )}
        </section>

        {project.toolHighlight && (
          <section className="mb-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
            <h2 className="text-xl font-semibold text-emerald-200 mb-3">
              {project.toolBadge ?? 'Interactive tool'}
            </h2>
            <p className="text-slate-300 leading-relaxed">{project.toolHighlight}</p>
          </section>
        )}

        {project.features && project.features.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">Product solution highlights</h2>
            <ul className="space-y-2">
              {project.features.map((f) => (
                <li key={f} className="text-slate-300 text-sm leading-relaxed flex gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {(project.previewVideoMp4 || project.previewVideoWebm) && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">Preview video</h2>
            <video
              className="w-full rounded-xl border border-white/10 bg-black"
              controls
              playsInline
              poster={project.videoPoster}
              preload="metadata"
            >
              {project.previewVideoWebm && <source src={project.previewVideoWebm} type="video/webm" />}
              {project.previewVideoMp4 && <source src={project.previewVideoMp4} type="video/mp4" />}
            </video>
          </section>
        )}

        {gallery.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {gallery.map((src, i) => (
                <figure key={src} className="rounded-xl overflow-hidden border border-white/10">
                  <img
                    src={src}
                    alt={alts[i] ?? `${project.title} screenshot ${i + 1}`}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  {alts[i] && <figcaption className="p-3 text-xs text-slate-500">{alts[i]}</figcaption>}
                </figure>
              ))}
            </div>
          </section>
        )}

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-3">Technology stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
                {tag}
              </span>
            ))}
          </div>
        </section>

        {project.caseStudy && (
          <section className="mb-10 space-y-6">
            <h2 className="text-xl font-semibold text-white">Technical implementation</h2>
            <div>
              <h3 className="text-sm font-semibold text-slate-200 mb-2">Methodology</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{project.caseStudy.methodology}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200 mb-2">Tools used</h3>
              <p className="text-slate-400 text-sm">{project.caseStudy.toolsUsed.join(' · ')}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200 mb-2">
                Challenge: {project.caseStudy.technicalChallenge.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">{project.caseStudy.technicalChallenge.body}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200 mb-2">Privacy &amp; data handling</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{project.caseStudy.privacyDesign}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200 mb-2">Test evidence</h3>
              <ul className="space-y-1">
                {project.caseStudy.testResults.map((t) => (
                  <li key={t} className="text-slate-300 text-sm">• {t}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="mb-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-lg font-semibold text-white mb-2">Notes on claims &amp; media</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Demo brands and sample statistics are fictional placeholders where noted in the product.
            Interactive estimate tools produce preliminary guidance only, not binding quotations.
            Etsy purchase links are shown only for verified public product listings — not drafts and not generic shop homepages.
          </p>
          {project.repositoryUrl && (
            <p className="text-slate-400 text-sm mt-3">
              Repository:{' '}
              <a href={project.repositoryUrl} className="text-sky-300 hover:underline" target="_blank" rel="noreferrer">
                {project.repositoryUrl}
              </a>
            </p>
          )}
        </section>

        {related.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">Related projects</h2>
            <ul className="space-y-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link to={`/work/${r.slug}/`} className="text-sky-300 hover:text-sky-200 font-medium">
                    {r.title}
                  </Link>
                  <p className="text-sm text-slate-500">{r.description.slice(0, 120)}…</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mb-6 flex flex-wrap gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-bold"
          >
            Open live demo
          </a>
          <Link to="/contact/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white text-sm font-semibold border border-white/10">
            Contact
          </Link>
          <Link to="/work/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-slate-300 text-sm hover:text-white">
            <ArrowLeft size={16} /> All work
          </Link>
        </section>

        <p className="text-xs text-slate-600">
          Catalogue size: {projects.length} projects · SEO improvements increase discoverability but do not guarantee rankings or traffic.
        </p>
      </article>
    </>
  );
}
