import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Calendar, Clock, ExternalLink, GraduationCap, BookOpen } from 'lucide-react'

interface Certificate {
  title: string
  institution: string
  courseDates: string
  certifiedDate: string
  estimatedHours: string
  thumbnail: string
  thumbnailAlt: string
  pdfUrl: string
  skills: string[]
}

interface CourseProject {
  title: string
  description: string
}

const certificates: Certificate[] = [
  {
    title: 'Data Analysis',
    institution: 'University of Cape Town (presented on the GetSmarter platform)',
    courseDates: '19 July 2021 – 14 September 2021',
    certifiedDate: 'Certified 19 November 2021',
    estimatedHours: '100 hours',
    thumbnail: `${import.meta.env.BASE_URL}certificates/data-analysis-certificate-thumb.webp`,
    thumbnailAlt: 'Data Analysis certificate from the University of Cape Town, presented on the GetSmarter platform',
    pdfUrl: `${import.meta.env.BASE_URL}certificates/data-analysis-certificate.pdf`,
    skills: ['Descriptive statistics', 'Data cleaning', 'Excel & Tableau-style analysis', 'Data storytelling'],
  },
  {
    title: 'Data Science with Python',
    institution: 'University of Cape Town (presented on the GetSmarter platform)',
    courseDates: '31 January 2022 – 29 March 2022',
    certifiedDate: 'Certified 1 June 2022',
    estimatedHours: '63 hours',
    thumbnail: `${import.meta.env.BASE_URL}certificates/data-science-python-certificate-thumb.webp`,
    thumbnailAlt: 'Data Science with Python certificate from the University of Cape Town, presented on the GetSmarter platform',
    pdfUrl: `${import.meta.env.BASE_URL}certificates/data-science-python-certificate.pdf`,
    skills: ['Python programming', 'Data manipulation with Pandas', 'Data visualisation', 'Introductory machine learning'],
  },
]

const courseProjects: CourseProject[] = [
  {
    title: 'Bank Desert Analysis',
    description: 'Course project analysing geographic access to banking services to identify underserved areas. A learning exercise from the UCT Data Analysis course, not a deployed application.',
  },
  {
    title: 'Interactive Earthquake Map',
    description: 'Course project building an interactive map to explore earthquake events by location and magnitude. A learning exercise, not a live deployed tool.',
  },
  {
    title: 'Web Scraping Application',
    description: 'Course project building a script to programmatically collect and structure data from public web pages. A learning exercise in automated data collection, not a production tool.',
  },
  {
    title: 'Data Journalism and D3 Visualisation',
    description: 'Course project using D3.js to turn a dataset into a narrative-driven, interactive visualisation in the style of data journalism. A learning exercise, not a published article.',
  },
  {
    title: 'Game Studio Analytics',
    description: 'Course project analysing a game studio dataset to surface player and performance insights. A learning exercise in applied business analytics, not a live dashboard.',
  },
  {
    title: 'Yelp Review Sentiment Analysis',
    description: 'Course project applying sentiment analysis techniques to a dataset of Yelp reviews. A learning exercise in Python for data analysis, not a deployed tool.',
  },
  {
    title: 'Bike-Sharing Visualisation',
    description: 'Course project visualising bike-sharing usage patterns from a public dataset. A learning exercise in exploratory data analysis and visualisation.',
  },
  {
    title: 'Worldwide Earthquake Visualisation',
    description: 'Course project visualising global earthquake trends over time from a public dataset. A separate learning exercise from the interactive earthquake map project above.',
  },
]

function CertificateCard({ certificate, index }: { certificate: Certificate; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden flex flex-col"
    >
      <div className="relative w-full bg-black/20" style={{ aspectRatio: '4 / 3' }}>
        <img
          src={certificate.thumbnail}
          alt={certificate.thumbnailAlt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Award size={16} className="text-emerald-400" />
          <h3 className="text-lg font-semibold text-white">{certificate.title}</h3>
        </div>
        <p className="text-sm text-slate-400 mb-4">{certificate.institution}</p>

        <div className="flex flex-col gap-1.5 mb-4 text-xs text-slate-500">
          <span className="flex items-center gap-2">
            <Calendar size={12} /> {certificate.courseDates}
          </span>
          <span className="flex items-center gap-2">
            <Clock size={12} /> {certificate.estimatedHours} estimated learning time
          </span>
          <span className="flex items-center gap-2">
            <GraduationCap size={12} /> {certificate.certifiedDate}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5 flex-1">
          {certificate.skills.map((skill, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/5">
              {skill}
            </span>
          ))}
        </div>

        <a
          href={certificate.pdfUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-colors border border-white/5"
        >
          <ExternalLink size={14} /> View Certificate
        </a>
      </div>
    </motion.div>
  )
}

export default function CredentialsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="credentials" className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-24">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/8 text-xs font-medium text-slate-400 mb-4">
          <Award size={11} />
          Credentials &amp; Analytics Lab
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
          Formal data training and learning projects
        </h2>
        <p className="text-slate-400 max-w-2xl">
          University-backed data credentials, plus a set of course and learning projects completed
          along the way. These are academic exercises for background and credibility — distinct
          from the live, deployed InsightForge Business Analytics Studio above.
        </p>
      </motion.div>

      {/* Certificates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
        {certificates.map((certificate, i) => (
          <CertificateCard key={certificate.title} certificate={certificate} index={i} />
        ))}
      </div>

      {/* Course / learning projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/8 text-xs font-medium text-slate-400 mb-4">
          <BookOpen size={11} />
          Course Projects
        </div>
        <h3 className="text-xl sm:text-2xl font-bold mb-2">Learning exercises from the UCT courses</h3>
        <p className="text-slate-400 max-w-2xl text-sm">
          Titles and short summaries only — these were completed as part of coursework, not deployed as
          live applications, and have no public repository or demo link.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {courseProjects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
            className="p-5 rounded-xl bg-white/[0.02] border border-white/5"
          >
            <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-emerald-400/80 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2 py-0.5 mb-3">
              Course project
            </span>
            <h4 className="text-sm font-semibold text-white mb-1.5 leading-snug">{project.title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{project.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
