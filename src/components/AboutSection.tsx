import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Target, TrendingUp, Users, Terminal } from 'lucide-react'
import MagneticButton from './MagneticButton'
import { PROFILE_IMAGE_ALT, PROFILE_IMAGE_PATH, PROFILE_NAME, publicAsset } from '../lib/site'

export default function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const portraitSrc = publicAsset(PROFILE_IMAGE_PATH)

  const featureCards = [
    {
      title: 'Business-focused',
      desc: 'I approach each project by first understanding the business, its customers and the result the website needs to produce.',
      icon: <Target className="text-primary-400 mb-4" size={24} />
    },
    {
      title: 'Conversion-minded',
      desc: 'I use clear messaging, purposeful layouts and strong calls to action to guide visitors towards enquiries, bookings or purchases.',
      icon: <TrendingUp className="text-primary-400 mb-4" size={24} />
    },
    {
      title: 'Customer-aware',
      desc: 'My background in sales and customer-facing roles helps me anticipate questions, objections and points of friction.',
      icon: <Users className="text-primary-400 mb-4" size={24} />
    },
    {
      title: 'Technically capable',
      desc: 'I build responsive websites and web applications using modern development tools, APIs, databases and AI-assisted workflows.',
      icon: <Terminal className="text-primary-400 mb-4" size={24} />
    }
  ]

  const skills = [
    'HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'Supabase', 
    'API Integration', 'GitHub', 'Responsive Design', 'UI/UX', 
    'Digital Marketing', 'CRM Systems', 'AI Automation', 'Data Analysis'
  ]

  return (
    <section id="about" className="relative py-24 px-6 max-w-7xl mx-auto scroll-mt-24">
      {/* Background glow accents */}
      <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10"
      >
        {/* Left Content Column */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="inline-block px-3 py-1 mb-6 text-[10px] font-mono tracking-widest text-primary-400 uppercase border border-primary-500/20 rounded-full bg-primary-500/5">
            About Me
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-8 leading-[1.1]">
            I build digital experiences that connect technology, business and people.
          </h2>

          <div className="space-y-6 text-slate-300 text-lg leading-relaxed mb-12">
            <p>
              I’m <strong className="text-white font-semibold">Iederees Francis</strong>, a Cape Town-based web developer with experience across sales, student recruitment, customer experience, digital marketing and business operations.
            </p>
            <p>
              My path into development started with people rather than code. I spent years helping customers understand complex services, make informed decisions and move confidently from interest to action. That experience shaped the way I build websites today.
            </p>
            <p>
              I do not only focus on how a website looks or how the code works. I also think about the person using it, the questions they may have, the trust the business needs to build and the steps that turn a visitor into a genuine lead or customer.
            </p>
            <p>
              I combine modern web development, thoughtful design, customer insight and commercial thinking to build digital experiences that are attractive, practical and focused on real business results.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {featureCards.map((card, i) => (
              <motion.div 
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:-translate-y-1 transition-all duration-300"
              >
                {card.icon}
                <h3 className="text-white font-semibold mb-2">{card.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Visual / Highlight Column */}
        <div className="lg:col-span-5 flex flex-col gap-8">

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center text-center"
          >
            <div className="relative mb-5">
              <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-primary-400/35 via-cyan-400/15 to-transparent blur-lg" />
              <img
                src={portraitSrc}
                alt={PROFILE_IMAGE_ALT}
                width={288}
                height={288}
                className="relative h-64 w-64 sm:h-72 sm:w-72 rounded-[2rem] object-cover border border-white/15 shadow-2xl shadow-primary-500/20"
                decoding="async"
              />
            </div>
            <p className="text-lg font-semibold text-white">{PROFILE_NAME}</p>
            <p className="text-sm text-slate-400 mt-1">Founder · NextGenWebs · Cape Town</p>
          </motion.div>
          
          {/* Highlight Glass Panel */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="p-8 rounded-3xl bg-gradient-to-br from-primary-500/20 to-cyan-500/10 border border-white/10 backdrop-blur-xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="text-2xl md:text-3xl font-medium text-white leading-tight mb-2">
              "A beautiful website gets attention.
            </div>
            <div className="text-2xl md:text-3xl font-medium text-primary-300 leading-tight italic">
              A clear customer journey turns that attention into action."
            </div>
          </motion.div>

          {/* Skills Preview */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="p-8 rounded-3xl bg-white/[0.02] border border-white/5"
          >
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-6">Technical Arsenal</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span 
                  key={skill} 
                  className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-white/5 border border-white/10 rounded-lg hover:border-primary-500/50 hover:text-primary-300 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Personal Philosophy & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-auto"
          >
            <h3 className="text-xl font-bold text-white mb-3 leading-snug">
              Technology should make a business feel more human, not more complicated.
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              My goal is to create digital products that customers can understand, business owners can be proud of and organisations can continue improving as they grow.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <MagneticButton>
                <a href="#work" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-bold text-sm tracking-wide rounded-full hover:bg-slate-200 transition-colors shadow-lg">
                  View My Projects
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="#contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-bold text-sm tracking-wide rounded-full border border-white/20 hover:bg-white/20 transition-colors">
                  Let's Work Together <ArrowRight size={16} />
                </a>
              </MagneticButton>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  )
}
