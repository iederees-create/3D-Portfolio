import dvelopSource from '../inbound/posts/dvelop-2026-news-roundup-sap-document-management.md?raw';
import riseSource from '../inbound/posts/rise-with-sap-teched-2026-cloud-erp-private-documents.md?raw';
import eccSource from '../inbound/posts/sap-ecc-2027-2030-maintenance-dates-historical-documents.md?raw';
import ukSource from '../inbound/posts/uk-e-invoicing-2029-roadmap-sap-document-retention.md?raw';
import InboundMarkdown from '../inbound/InboundMarkdown';
import { parseFrontmatter } from '../inbound/frontmatter';

function tagsFrom(value: string | undefined): string[] {
  if (!value) return [];
  return value.replace(/^\[/, '').replace(/\]$/, '').split(',').map((tag) => tag.trim()).filter(Boolean);
}

function SapArchivePost({ source }: { source: string }) {
  const { meta, body } = parseFrontmatter(source);
  const tags = tagsFrom(meta.tags);
  return (
    <div className="inbound-prose">
      {meta.disclosure && <p className="inbound-disclosure">{meta.disclosure}</p>}
      {tags.length > 0 && (
        <ul className="not-prose mb-8 flex list-none flex-wrap gap-2 p-0">
          {tags.map((tag) => (
            <li key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              {tag}
            </li>
          ))}
        </ul>
      )}
      <InboundMarkdown source={body} skipFirstH1 />
    </div>
  );
}

export function Dvelop2026NewsRoundupPost() {
  return <SapArchivePost source={dvelopSource} />;
}

export function RiseWithSapTechEd2026Post() {
  return <SapArchivePost source={riseSource} />;
}

export function SapEccMaintenanceDatesPost() {
  return <SapArchivePost source={eccSource} />;
}

export function UkEInvoicing2029Post() {
  return <SapArchivePost source={ukSource} />;
}
