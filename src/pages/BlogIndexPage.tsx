import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import { articles } from '../content/blog/articles';

/**
 * /blog/ — lists every article, newest first. Adding article #3 to
 * `articles.ts` is all it takes for it to appear here automatically.
 *
 * Nav/footer chrome comes from the global <Navbar>/<Footer> in App.tsx,
 * which wraps every route — this page only owns its own content.
 */
export default function BlogIndexPage() {
  const sorted = [...articles].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));

  return (
    <>
      <SEO
        title="Blog"
        description="Case studies and practical guides on custom web development, data analysis, and building tools that respect the people who use them."
        path="blog/"
      />

      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px bg-white/20 flex-1" />
            <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">Insights & Articles</span>
            <div className="h-px bg-white/20 flex-1" />
          </div>
          <div className="flex items-baseline gap-4 mb-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Blog</h1>
            <span className="bg-primary-500/20 text-primary-300 text-sm font-bold px-3 py-1 rounded-full">{articles.length} Posts</span>
          </div>
          <p className="text-slate-400 max-w-2xl">
            Case studies and practical guides from building custom websites and data-analysis tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6">
          {sorted.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={`/blog/${article.slug}/`}
                className="block bg-white/[0.02] border border-white/5 rounded-3xl p-6 sm:p-8 hover:border-white/15 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500 mb-3 uppercase tracking-wide">
                  <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full text-slate-300">
                    <Calendar size={12} />
                    {new Date(`${article.datePublished}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} /> {article.readingTimeMinutes} Min Read
                  </span>
                  <span className="text-primary-400 font-semibold bg-primary-500/10 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">{article.title}</h2>
                <p className="text-slate-400 text-sm leading-relaxed">{article.excerpt}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {article.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-500 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </>
  );
}
