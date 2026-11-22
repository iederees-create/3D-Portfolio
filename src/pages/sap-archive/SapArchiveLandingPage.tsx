import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import InboundMarkdown from '../../content/inbound/InboundMarkdown';
import landingSource from '../../content/inbound/landing.md?raw';
import { parseFrontmatter, splitH3Sections, splitMarkedSections } from '../../content/inbound/frontmatter';
import { LINKEDIN_URL } from '../../content/inbound/placeholders';
import SapPage from './SapPage';

const LANDING_TITLE = 'What happens to your historical SAP documents after S/4HANA? | Iederees Francis, NextGenWebs';
const LANDING_DESCRIPTION = 'A practical look at SAP document archiving for UK manufacturers moving to S/4HANA. Take the readiness check or book a free 30-minute consultation.';

function prepareLanding(source: string): string {
  return source.replace(
    'connect with me on LinkedIn',
    `connect with me on [LinkedIn](${LINKEDIN_URL})`,
  );
}

function Situations({ markdown }: { markdown: string }) {
  const { intro, cards } = splitH3Sections(markdown);
  const prepared = cards.map((card) => ({ ...card }));
  let follow = '';
  const last = prepared[prepared.length - 1];
  if (last) {
    const at = last.body.indexOf('\n**Not sure');
    if (at !== -1) {
      follow = last.body.slice(at + 1);
      last.body = last.body.slice(0, at);
    }
  }

  return (
    <section className="mt-16">
      <div className="inbound-prose">
        <InboundMarkdown source={intro} />
      </div>
      <div className="mt-8 grid gap-4">
        {prepared.map((card) => (
          <article key={card.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white">{card.title}</h3>
            <div className="inbound-prose">
              <InboundMarkdown source={card.body} />
            </div>
          </article>
        ))}
      </div>
      {follow && (
        <div className="inbound-prose mt-6 rounded-3xl border border-primary-400/20 bg-primary-400/10 p-6 sm:p-8">
          <InboundMarkdown source={follow} />
        </div>
      )}
    </section>
  );
}

function Faq({ markdown }: { markdown: string }) {
  const { intro, cards } = splitH3Sections(markdown);
  return (
    <section className="mt-16">
      <div className="inbound-prose">
        <InboundMarkdown source={intro} />
      </div>
      <div className="mt-6 divide-y divide-white/10 rounded-3xl border border-white/10">
        {cards.map((card) => (
          <details key={card.title} className="group p-5 sm:p-6" open={card.body.includes('{{PRIVACY_LINK}}')}>
            <summary className="cursor-pointer list-none text-base font-semibold text-white">
              <span className="mr-3 text-primary-300 group-open:hidden">+</span>
              <span className="mr-3 hidden text-primary-300 group-open:inline">-</span>
              {card.title}
            </summary>
            <div className="inbound-prose pt-3">
              <InboundMarkdown source={card.body} />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function SapArchiveLandingPage() {
  const { body } = parseFrontmatter(landingSource);
  const sections = splitMarkedSections(prepareLanding(body));
  const byId = Object.fromEntries(sections.map((section) => [section.id, section.body]));

  return (
    <SapPage crumb="SAP archive" wide>
      <SEO
        title="What happens to your historical SAP documents after S/4HANA?"
        exactTitle={LANDING_TITLE}
        description={LANDING_DESCRIPTION}
        path="sap-archive/"
      />

      <p className="mb-4 text-xs font-bold uppercase tracking-[.22em] text-primary-300">NextGenWebs · Independent partner</p>
      <div className="inbound-prose inbound-landing max-w-4xl">
        <InboundMarkdown source={byId.HERO ?? ''} />
      </div>

      <section className="mt-16 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10">
        <div className="inbound-prose">
          <InboundMarkdown source={byId['THE QUESTION'] ?? ''} />
        </div>
      </section>

      <Situations markdown={byId['THREE SITUATIONS'] ?? ''} />

      <section className="mt-16">
        <div className="inbound-prose">
          <InboundMarkdown source={byId['WHAT THE SOLUTION IS, KEPT FACTUAL'] ?? ''} />
        </div>
      </section>

      <section className="mt-16 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10">
        <div className="inbound-prose">
          <InboundMarkdown source={byId['HOW THE CONSULTATION WORKS'] ?? ''} />
        </div>
      </section>

      <section className="mt-16 rounded-3xl border border-primary-400/20 bg-primary-400/10 p-6 sm:p-10">
        <div className="inbound-prose">
          <InboundMarkdown source={byId['GUIDE CTA'] ?? ''} />
        </div>
      </section>

      <section className="mt-16">
        <div className="inbound-prose">
          <InboundMarkdown source={byId['WHO I AM'] ?? ''} />
        </div>
      </section>

      <Faq markdown={byId.FAQ ?? ''} />

      <section className="mt-16 rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center sm:p-10">
        <div className="inbound-prose inbound-landing">
          <InboundMarkdown source={byId['FINAL CTA'] ?? ''} />
        </div>
        <p className="no-print mt-4 text-sm text-slate-500">
          <Link to="/blog/" className="text-slate-300 underline underline-offset-2 hover:text-white">Read the SAP archive articles</Link>
        </p>
      </section>
    </SapPage>
  );
}
