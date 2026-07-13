import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, ArrowRight, ExternalLink } from 'lucide-react';

export default function BlogPage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto pt-32">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px bg-white/20 flex-1" />
          <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">Insights &amp; Articles</span>
          <div className="h-px bg-white/20 flex-1" />
        </div>

        {/* The Blog Post */}
        <article className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">

          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-[80px] pointer-events-none" />

          {/* Meta */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 mb-4 uppercase tracking-wide">
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full text-slate-300">
                <Calendar size={14} /> July 12, 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> 4 Min Read
              </span>
              <span className="text-primary-400 font-semibold bg-primary-500/10 px-3 py-1 rounded-full">
                Case Study / EdTech
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              Why Educational Businesses Need Custom Learning Hubs: The Fluent Path Story
            </h1>
          </header>

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none text-slate-300">
            <p className="lead text-xl text-slate-200 font-medium mb-8">
              The modern tutoring business has outgrown generic drag-and-drop website builders. To scale effectively, educators need digital infrastructure that actively works for them. Here is how I built the <strong className="text-white">Fluent Path Tutoring</strong> template to solve this exact problem.
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The Problem with Generic Templates</h2>
            <p className="mb-6">
              According to recent studies by <a href="https://www.forbes.com/advisor/business/software/website-statistics/" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline decoration-primary-500/30 underline-offset-4 inline-flex items-center gap-1">Forbes Advisor <ExternalLink size={14}/></a>, businesses lose massive amounts of revenue due to slow loading times and poor user experiences. For tutors and educational consultants, a slow website means lost student enrollments.
            </p>
            <p className="mb-6">
              Most standard tutoring websites are built on bloated WordPress themes. They look fine on the surface, but under the hood, they are slow, frustrating to navigate, and fail to guide parents or students toward booking a session.
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The Fluent Path Solution</h2>
            <p className="mb-6">
              When designing the <strong>Fluent Path Tutoring</strong> digital environment, my goal was simple: <em>Remove all friction from the learning management process.</em>
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-8 text-slate-300">
              <li><strong className="text-white">React &amp; TypeScript Architecture:</strong> Unlike bulky traditional websites, Fluent Path is engineered as a modern Single Page Application (SPA), ensuring lightning-fast page transitions that keep students engaged.</li>
              <li><strong className="text-white">Conversion-Minded Layouts:</strong> The UI is strictly designed to highlight course value and push visitors directly to appointment booking.</li>
              <li><strong className="text-white">Responsive Data Visuals:</strong> Clean, architectural dashboards that look incredible on both mobile and desktop.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Get the Template or Go Custom?</h2>
            <p className="mb-6">
              If you run an educational business, you have two choices to upgrade your digital presence.
            </p>
            <p className="mb-6">
              First, you can instantly deploy this exact highly-optimized infrastructure for your own business. The <strong>Fluent Path Tutoring Template</strong> is available right now for ambitious educators who want an immediate upgrade.
            </p>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Fluent Path Tutoring Template</h3>
                <p className="text-sm text-slate-400">Ready to deploy. High conversion. SEO optimized.</p>
              </div>
              <a
                href="https://nextgenwebs.etsy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-500 hover:bg-primary-400 text-white font-bold py-3 px-6 rounded-full text-sm tracking-wide transition-colors whitespace-nowrap"
              >
                Buy on Etsy
              </a>
            </div>

            <p className="mb-6">
              However, if you require a completely bespoke platform built from the ground up for your specific business logic, you need <a href="/work" className="text-white font-semibold hover:text-primary-400 underline decoration-white/30 underline-offset-4">custom web development</a>.
            </p>
            <p className="mb-8">
              A bespoke system allows for deep integrations, custom CRM workflows, and completely unique branding that no competitor can match.
            </p>

            {/* Internal Link CTA */}
            <div className="border-t border-white/10 pt-8 mt-12">
              <h3 className="text-xl font-bold text-white mb-4">Ready to build something unique?</h3>
              <p className="text-slate-400 mb-6">
                If you're ready to move past templates and engineer a digital experience that dominates your market, let's talk.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-white font-bold hover:text-primary-400 transition-colors"
              >
                Contact me for a custom quote <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </article>
      </motion.div>
    </section>
  );
}
