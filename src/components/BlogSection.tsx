import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { articles } from '../content/blog/articles';

/**
 * Homepage "Insights & Articles" teaser. Previously this section hardcoded
 * the full Fluent Path article body; that content now lives once, at
 * /blog/why-educational-businesses-need-custom-learning-hubs/, rendered via
 * ArticleLayout. This section just surfaces the latest post(s) and links
 * to the full /blog/ index, so there is a single source of truth for
 * article content instead of two divergent copies.
 */
export default function BlogSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const latest = [...articles].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1)).slice(0, 2);

  return (
    <section id="blog" className="py-24 px-6 max-w-4xl mx-auto scroll-mt-24">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px bg-white/20 flex-1" />
          <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">Insights & Articles</span>
          <div className="h-px bg-white/20 flex-1" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {latest.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}/`}
              className="block bg-white/[0.02] border border-white/5 rounded-3xl p-6 sm:p-8 hover:border-white/15 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500 mb-4 uppercase tracking-wide">
                <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full text-slate-300">
                  <Calendar size={12} />
                  {new Date(`${article.datePublished}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={12} /> {article.readingTimeMinutes} Min Read
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">{article.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{article.excerpt}</p>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/blog/"
            className="inline-flex items-center gap-2 text-white font-bold hover:text-primary-400 transition-colors"
          >
            Read all articles <ArrowRight size={18} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
