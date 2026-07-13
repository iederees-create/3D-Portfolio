/**
 * Long-form case-study article: construction website quote planner.
 * Evidence: Southern Suburbs Builders Website Template (portfolio project).
 * Author: Iedrees Francis
 */
export default function ConstructionWebsiteQuotePlannerContent() {
  return (
    <div className="space-y-8 text-slate-300 leading-relaxed">
      <p className="text-lg text-slate-200">
        Most construction websites collect interest. Few collect a usable brief. This article explains how to design a
        builder website that turns vague “how much to renovate?” messages into structured quote requests — using the
        Southern Suburbs Builders Website Template and its interactive Renovation Scope &amp; Budget Planner as a worked
        example.
      </p>

      <p className="text-sm text-slate-500 border border-white/10 rounded-xl p-4 bg-white/[0.03]">
        <strong className="text-slate-300">Disclosure:</strong> AI coding and writing tools assisted development and
        drafting of related materials. Product behaviour described here matches the shipped template demo where verified;
        budget outputs are always preliminary guidance, not binding quotations. Demo business details are fictional sample
        content.
      </p>

      <nav aria-label="Table of contents" className="rounded-xl border border-white/10 p-5 bg-white/[0.02]">
        <h2 className="text-white text-base font-semibold mb-3">Contents</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm text-sky-300/90">
          <li>Who this is for</li>
          <li>Why brochure construction sites produce poor enquiries</li>
          <li>What a builder needs before pricing</li>
          <li>Structured planner as conversion design</li>
          <li>Project overview: Southern Suburbs Builders template</li>
          <li>User journey and handoff</li>
          <li>Preliminary ranges vs binding quotations</li>
          <li>Mobile, accessibility and static hosting</li>
          <li>Common mistakes</li>
          <li>Limitations and lessons</li>
          <li>FAQ</li>
        </ol>
      </nav>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">Who this article is for</h2>
        <p>
          Builders, renovation contractors, extension specialists and web designers who ship sites for construction
          businesses. It is also useful if you sell or customise digital website templates for local-service trades.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">Why brochure construction sites produce poor enquiries</h2>
        <p>
          A typical contractor homepage shows a hero photo, six service cards and a contact form with name, phone and a
          free-text box. That pattern optimises for message volume, not lead quality. Homeowners send one-line price
          questions. Estimators reply with ten clarifications. Many threads die before room sizes, finishes, access or
          photos exist.
        </p>
        <p className="mt-4">
          The cost is not only unpaid admin. Premature numbers create disputes. Incomplete briefs waste site visits.
          Marketing that creates estimator debt is not a win — it is an operations problem wearing a glossy UI.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">What a builder needs before pricing</h2>
        <p>Before a responsible renovation quote, you usually need some mix of:</p>
        <ul className="list-disc list-inside mt-3 space-y-1 text-slate-300">
          <li>Project type and approximate area or room count</li>
          <li>Finish level and demolition extent</li>
          <li>Plumbing, electrical, structural and waterproofing signals</li>
          <li>Access, parking and occupancy constraints</li>
          <li>Timeline pressure and budget posture</li>
          <li>Photos or sketches and a path to site inspection</li>
        </ul>
        <p className="mt-4">
          A website form does not replace a site visit. It should prepare one. That is the design goal of a structured
          project planner: force clarity before WhatsApp becomes a second poorly designed form.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">Structured planner as conversion design</h2>
        <p>
          An interactive Renovation Scope &amp; Budget Planner sits between brochure content and the human estimator. The
          visitor defines the project, sees trade and complexity signals, receives a preliminary budget range with visible
          assumptions, and leaves a structured summary the business can act on.
        </p>
        <p className="mt-4">
          Important honesty layer: online ranges must be labelled preliminary. Real pricing still depends on drawings,
          specifications, materials, labour, approvals, access and site conditions. False precision destroys trust faster
          than a clear “we need to inspect”.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">Project overview: Southern Suburbs Builders template</h2>
        <p>
          The Southern Suburbs Builders Website Template is a static, buyer-editable construction website package built as
          a commercial digital product (Etsy packaging path) with a public GitHub Pages demo. Demo branding is fictional
          and must be replaced by buyers. The centrepiece is the Renovation Scope &amp; Budget Planner.
        </p>
        <p className="mt-4">
          Live demo:{' '}
          <a
            className="text-sky-300 hover:underline"
            href="https://iederees-create.github.io/southern-suburbs-builders-ct/"
            target="_blank"
            rel="noreferrer"
          >
            southern-suburbs-builders-ct
          </a>
          . Portfolio case study:{' '}
          <a className="text-sky-300 hover:underline" href={`${import.meta.env.BASE_URL}work/southern-suburbs-builders/`}>
            /work/southern-suburbs-builders/
          </a>
          .
        </p>
        <p className="mt-4 text-slate-400 text-sm">
          Repository:{' '}
          <a
            className="text-sky-300 hover:underline"
            href="https://github.com/iederees-create/southern-suburbs-builders-ct"
            target="_blank"
            rel="noreferrer"
          >
            github.com/iederees-create/southern-suburbs-builders-ct
          </a>
          . Etsy purchase links are omitted here until an exact public product listing URL is verified — draft listings
          must not show Buy buttons.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">User journey and handoff</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Land on a construction-focused homepage with clear services and process</li>
          <li>Open the Renovation Scope &amp; Budget Planner</li>
          <li>Enter project type, measurements, finishes, trades, access and timeline signals</li>
          <li>Review preliminary scope notes, assumptions and budget range</li>
          <li>Complete missing-info / photo checklist guidance where provided</li>
          <li>Send a structured summary via WhatsApp or email (user-triggered handoff)</li>
          <li>Business reviews the brief and schedules inspection before a formal quote</li>
        </ol>
        <p className="mt-4">
          Handoff is deliberately not a full CRM. It is a structured message template so discovery does not restart at
          zero inside the chat app.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">Preliminary ranges vs binding quotations</h2>
        <p>
          A preliminary range educates and sets expectations. A binding quotation (or formal estimate) requires inspection
          and specifications. The template’s product story keeps that distinction visible on-screen. Buyers configuring
          rates must set assumptions that match their market — wrong rates produce wrong guidance, which is expected and
          should be disclosed.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">Mobile, accessibility and static hosting</h2>
        <p>
          Renovation enquiries often start on a phone while standing in the room that needs work. The planner and CTAs
          must be usable with thumbs. The site is a static HTML/CSS/JS-style package suitable for GitHub Pages and other
          static hosts — no WordPress requirement for ordinary deployment. Accessibility goals include keyboard paths and
          clear focus states; full audits should follow each production customisation.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">Common mistakes</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Contact forms with no project fields</li>
          <li>Fake ratings, job counts or “fully insured” claims copied from demos</li>
          <li>Stock photos presented as completed client work</li>
          <li>Online fixed prices without inspection language</li>
          <li>Desktop-only calculators that fail on mobile</li>
          <li>WhatsApp-only discovery with zero structured intake</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">Limitations and lessons</h2>
        <p>
          This template is not an estimating ERP, payment platform or CRM. It will not guarantee lead volume or rankings.
          SEO and conversion improvements increase the chance that the right visitors leave better briefs; they do not
          guarantee traffic or sales.
        </p>
        <p className="mt-4">
          Lessons from building niche construction templates: interactive tools outperform brochure clones when honesty
          is part of the UX; disclaimer quality is a product feature; commerce copy must lag verified product behaviour.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">FAQ</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-white font-semibold">Is the planner a real quotation?</h3>
            <p>No. It produces preliminary guidance only. Binding quotes require inspection and proper specs.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold">Is Southern Suburbs Builders a real company?</h3>
            <p>No. It is a fictional demo brand for the template showcase.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold">Does the portfolio link to Etsy?</h3>
            <p>
              Only when an exact public product listing URL is verified. Draft listings stay without Buy buttons. The
              shop homepage is never used as a substitute product link.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold">Who built this?</h3>
            <p>
              Iedrees Francis (NextGenWebs) — practical web development for local-service businesses, with a Salesforce
              Certified Administrator credential and UCT short-course training in Data Analysis and Data Science with
              Python. Those short courses do not imply a university degree or UCT employment.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 p-6 bg-white/[0.03]">
        <h2 className="text-xl font-bold text-white mb-3">Next steps</h2>
        <ul className="space-y-2 text-sky-300">
          <li>
            <a href="https://iederees-create.github.io/southern-suburbs-builders-ct/" target="_blank" rel="noreferrer">
              Try the live Renovation Scope &amp; Budget Planner demo
            </a>
          </li>
          <li>
            <a href={`${import.meta.env.BASE_URL}work/southern-suburbs-builders/`}>Open the portfolio case-study page</a>
          </li>
          <li>
            <a href={`${import.meta.env.BASE_URL}work/tiling-contractor-website-template/`}>Related: Tiling Contractor Website Template</a>
          </li>
          <li>
            <a href={`${import.meta.env.BASE_URL}contact/`}>Contact NextGenWebs</a>
          </li>
        </ul>
      </section>
    </div>
  );
}
