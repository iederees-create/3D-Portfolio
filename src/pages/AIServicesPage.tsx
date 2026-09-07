import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Workflow, ShieldCheck, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { toAbsoluteUrl } from '../lib/site';

const services = [
  { title: 'Website assistant', icon: Bot, text: 'Help visitors find answers in your approved business information and take the next step.', items: ['FAQ and service guidance', 'Clear contact handoff', 'Website integration and handover'] },
  { title: 'Workflow automation', icon: Workflow, text: 'Connect the repetitive steps between an enquiry and a useful response.', items: ['Enquiry summaries and routing', 'Drafts for your review', 'Integration with agreed business tools'] },
  { title: 'Ongoing care', icon: ShieldCheck, text: 'Keep your assistant useful as your services, content and business change.', items: ['Content and workflow updates', 'Usage and error reviews', 'An agreed support scope'] },
];
const faqs = [
  ['Can you work with my existing website?', 'Yes. We start by reviewing your website and current tools, then agree what can be integrated and whether any hosting changes are needed.'],
  ['How much does it cost?', 'You receive a project-specific quote after we review the scope. Build fees, hosting, model usage and optional ongoing support are discussed separately before work starts.'],
  ['Will the assistant always be right?', 'No AI system is always correct. The scope includes approved source material, testing, clear limits and a route to a person when an answer needs review.'],
  ['What information should I send?', 'A public website link, the task you want to improve and the tools you already use are enough to start. Please do not send passwords or private customer records.'],
  ['Are you affiliated with OpenAI?', 'NextGenWebs is an independent development service. You pay for implementation and support; this offer does not imply an OpenAI partnership or endorsement.'],
];

export default function AIServicesPage() {
  const [goal, setGoal] = useState('Answer customer questions');
  const [website, setWebsite] = useState('');
  const [notes, setNotes] = useState('');
  const brief = `Hi Iederees, I would like a quote for AI assistant / automation services.\n\nGoal: ${goal}\nWebsite: ${website.trim() || 'To discuss'}\nRequirements: ${notes.trim() || 'Please help me define the scope.'}\nSource: Portfolio AI services page`;
  const button = 'inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300';
  return (
    <main className="px-6 pt-32 pb-24 text-slate-300">
      <SEO title="AI Assistants & Business Automation" description="Custom website assistants and practical workflow automation by NextGenWebs. Define your requirements and request a tailored implementation quote." path="services/ai-automation/">
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'Service', name: 'AI assistants and business automation', provider: { '@type': 'Organization', name: 'NextGenWebs', url: toAbsoluteUrl('') }, url: toAbsoluteUrl('services/ai-automation/'), description: 'Custom website assistants, workflow automation and optional ongoing support.' })}</script>
      </SEO>
      <div className="max-w-6xl mx-auto space-y-20">
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-cyan-400 font-semibold mb-5">NEXTGENWEBS / AI SERVICES</p>
            <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight">Make your website more helpful. Give yourself less admin.</h1>
            <p className="mt-6 text-lg leading-relaxed">I build website assistants and practical automations around the way your business works—from answering common questions to preparing enquiries for your review.</p>
            <div className="mt-8 flex flex-wrap gap-4"><a href="#project-brief" className={button}>Plan my project <ArrowRight size={18} /></a><Link to="/work" className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/5">Explore my work</Link></div>
          </div>
          <div className="rounded-3xl border border-cyan-400/25 bg-gradient-to-br from-cyan-500/10 to-transparent p-8">
            <p className="text-sm text-cyan-300 mb-6">EXAMPLE WORKFLOW · PLANNED TOGETHER</p>
            {['A visitor asks about your services', 'The assistant uses your approved information', 'An enquiry is prepared for your team', 'You review and take the next step'].map((text, index) => <div key={text} className="flex gap-4 py-5 border-b border-white/10 last:border-0"><span className="text-cyan-400 font-mono">0{index + 1}</span><p className="text-white">{text}</p></div>)}
            <p className="text-sm mt-6">The scope and integrations depend on your website and business requirements.</p>
          </div>
        </section>
        <section aria-labelledby="services-heading">
          <h2 id="services-heading" className="text-3xl font-bold text-white mb-8">Start with one useful improvement</h2>
          <div className="grid md:grid-cols-3 gap-6">{services.map(({ title, icon: Icon, text, items }) => <article key={title} className="rounded-2xl border border-white/10 bg-white/5 p-7"><Icon className="text-cyan-400 mb-5" size={28} /><h3 className="text-xl font-bold text-white">{title}</h3><p className="mt-4 leading-relaxed">{text}</p><ul className="mt-6 space-y-3 list-disc pl-5">{items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div>
        </section>
        <section className="border-y border-white/10 py-10 grid md:grid-cols-2 gap-8">
          <div><h2 className="text-3xl font-bold text-white">See the portfolio assistant</h2><p className="mt-4 leading-relaxed">Try the assistant on this website to explore the visitor experience. Your business assistant would be scoped around your own content, enquiries and handoff requirements.</p><div className="flex flex-wrap gap-5 mt-5"><Link className="text-cyan-300 underline" to="/work/supportforge-ai-assistant/">Explore SupportForge</Link><Link className="text-cyan-300 underline" to="/blog/ai-portfolio-assistant/">Read the assistant walkthrough</Link></div></div>
          <div><h3 className="text-xl font-semibold text-white">From brief to handover</h3><p className="mt-4 leading-relaxed">We define a focused use case, agree the quote and running costs, build and test against example questions, then hand over with clear instructions. Ongoing support is optional and agreed separately.</p></div>
        </section>
        <section id="project-brief" className="scroll-mt-28 grid lg:grid-cols-2 gap-10">
          <div><h2 className="text-3xl font-bold text-white">Tell me what you want to improve</h2><p className="mt-4 leading-relaxed">Build a short brief, then send it through WhatsApp or your email app. Nothing is submitted automatically.</p><p className="mt-4 text-sm">Please use public business information only. No passwords or private customer data.</p><Link to="/contact?utm_source=ai-services&utm_medium=service-page&utm_campaign=ai-implementation" className="inline-block mt-6 text-cyan-300 underline">Prefer a general enquiry?</Link></div>
          <div className="rounded-2xl border border-white/10 p-6 space-y-5">
            <label className="block">Your main goal<select value={goal} onChange={e => setGoal(e.target.value)} className="block mt-2 w-full rounded-xl bg-slate-900 text-white border border-white/20 p-3">{['Answer customer questions', 'Qualify website enquiries', 'Automate repetitive admin', 'Improve an existing assistant', 'Help me choose a starting point'].map(item => <option key={item}>{item}</option>)}</select></label>
            <label className="block">Website or business name (optional)<input value={website} maxLength={200} onChange={e => setWebsite(e.target.value)} className="block mt-2 w-full rounded-xl bg-slate-900 text-white border border-white/20 p-3" placeholder="Your public website or business name" /></label>
            <label className="block">What happens today, and what should improve? (optional)<textarea value={notes} maxLength={1200} onChange={e => setNotes(e.target.value)} rows={4} className="block mt-2 w-full rounded-xl bg-slate-900 text-white border border-white/20 p-3" placeholder="Tell me about the task, existing tools and timing." /></label>
            <details><summary className="cursor-pointer text-cyan-300">Preview your message</summary><p className="whitespace-pre-wrap break-words mt-3 text-sm">{brief}</p></details>
            <div className="flex flex-wrap gap-3"><a className={button} href={`https://wa.me/27629494708?text=${encodeURIComponent(brief)}`} target="_blank" rel="noopener noreferrer">Send via WhatsApp</a><a className="px-6 py-3 border border-white/20 rounded-full text-white" href={`mailto:iedereesfrancis@gmail.com?subject=${encodeURIComponent('AI implementation enquiry')}&body=${encodeURIComponent(brief)}`}>Open email draft</a></div>
          </div>
        </section>
        <section className="max-w-3xl"><h2 className="text-3xl font-bold text-white mb-6">Before we start</h2>{faqs.map(([question, answer]) => <details key={question} className="border-b border-white/10 py-5"><summary className="text-lg text-white cursor-pointer font-semibold">{question}</summary><p className="mt-4 leading-relaxed">{answer}</p></details>)}</section>
      </div>
    </main>
  );
}
