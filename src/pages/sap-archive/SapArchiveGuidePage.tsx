import { Printer } from 'lucide-react';
import SEO from '../../components/SEO';
import InboundMarkdown from '../../content/inbound/InboundMarkdown';
import guideSource from '../../content/inbound/guide.md?raw';
import { formatLongDate, parseFrontmatter } from '../../content/inbound/frontmatter';
import SapPage from './SapPage';

export default function SapArchiveGuidePage() {
  const { meta, body } = parseFrontmatter(guideSource);

  return (
    <SapPage crumb="Guide">
      <SEO
        title={meta.title}
        description={meta.subtitle}
        path="sap-archive/guide/"
      />
      <article className="sap-print-sheet">
        <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs font-bold uppercase tracking-[.22em] text-primary-300">Free guide</p>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-white hover:bg-white/5"
          >
            <Printer size={16} />
            Download / print
          </button>
        </div>

        <p className="mb-3 text-sm text-slate-400">{formatLongDate(meta.date)} · {meta.author}</p>
        {meta.disclosure && <p className="inbound-disclosure">{meta.disclosure}</p>}

        <div className="inbound-prose">
          <InboundMarkdown source={body} />
        </div>
      </article>
    </SapPage>
  );
}
