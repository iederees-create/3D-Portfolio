import { Link } from 'react-router-dom';

export default function AIServiceCTA({ source }: { source: string }) {
  return <aside className="my-10 rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-7 not-prose">
    <p className="text-sm font-semibold text-cyan-400">BUILD IT FOR YOUR BUSINESS</p>
    <h2 className="text-2xl font-bold text-white mt-3">Want an AI assistant or a simpler workflow?</h2>
    <p className="text-slate-300 mt-3 leading-relaxed">Explore website assistants, enquiry workflows and custom automation. Start with a focused brief and a tailored quote.</p>
    <Link to={`/services/ai-automation/?utm_source=${encodeURIComponent(source)}&utm_medium=portfolio&utm_campaign=ai-implementation`} className="inline-block mt-5 text-cyan-300 font-semibold underline">Explore AI implementation services →</Link>
  </aside>;
}
