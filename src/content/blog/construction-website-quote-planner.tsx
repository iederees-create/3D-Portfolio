/**
 * Article #3: "How to Build a Construction Website That Generates Better
 * Quote Requests" — case study for the Southern Suburbs Builders website
 * template and its Renovation Scope & Budget Planner. Facts in this
 * article are drawn from handoff/FINAL-PRODUCT-FACTS.json in the
 * southern-suburbs-builders-ct repository, not from the earlier marketing
 * drafts, so nothing here overstates what the tool actually does.
 */

const LIVE_DEMO_URL = 'https://iederees-create.github.io/southern-suburbs-builders-ct/';

export default function ConstructionWebsiteQuotePlannerContent() {
  return (
    <>
      <div className="prose prose-invert prose-lg max-w-none text-slate-300">
        <h2 id="the-problem" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The problem: a brochure site doesn't qualify a lead</h2>
        <p className="mb-6">
          Most construction and renovation company websites are brochures: a services list, a phone number, a "Get a Quote" button that opens an empty contact form. The visitor who lands there with "how much to renovate my house?" gets exactly one thing back — a form with no structure — and the business gets exactly one thing back: the same ten qualifying questions they'll now have to ask by WhatsApp, one message at a time, often losing the visitor somewhere in the middle.
        </p>
        <p className="mb-6">
          The fix isn't a better contact form. It's moving the qualifying questions onto the website itself, before the conversation starts, so the enquiry that reaches the builder already has a shape.
        </p>

        <h2 id="the-approach" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The approach: a Renovation Scope &amp; Budget Planner</h2>
        <p className="mb-6">
          For the Southern Suburbs Builders website template, that meant building an interactive planner rather than a static form. A visitor picks a project type (room, bathroom or kitchen renovation, home extension, new build, paving, boundary wall, commercial renovation, or "other"), enters dimensions or a total floor area, a finish level, which trades are involved (demolition, structural work, plumbing, electrical, waterproofing, roofing, painting, flooring), site access, occupancy, and their contact details. The planner turns that into:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-300">
          <li>a measured project area</li>
          <li>a complexity indicator (Low / Medium / High), with the reasons behind it</li>
          <li>a configurable preliminary budget range</li>
          <li>a trade checklist</li>
          <li>a list of what's still missing before a firm quote is possible</li>
          <li>a photo checklist for the site visit</li>
          <li>a structured, shareable project summary</li>
        </ul>
        <p className="mb-6">
          <a href={LIVE_DEMO_URL} target="_blank" rel="noreferrer" className="text-primary-400 hover:text-primary-300 font-semibold">Try the live demo →</a>
        </p>

        <h2 id="preliminary-vs-binding" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Preliminary estimate, not a binding quotation</h2>
        <p className="mb-6">
          This distinction is the whole point, and it's easy to get wrong in either direction — understating it invites disputes later, overstating it makes the tool useless. The planner's budget range is calculated from configurable rate bands, finish-level multipliers, and complexity multipliers set by the business owner. It is <strong>not</strong> a quotation, an offer, or a contract, and the template says so in three separate places: inline on the planner section, in the generated summary text itself, and on a dedicated Estimate Disclaimer page.
        </p>
        <p className="mb-6">
          A real, binding quotation depends on things a website form cannot know: final architectural or engineering drawings, confirmed material and finish specifications, labour availability, regulatory approvals, and site conditions that only a physical inspection reveals (existing wiring, damp, structural surprises behind a wall). The planner's job is to get the conversation to the point where a site inspection is worth booking — not to replace one.
        </p>

        <h2 id="what-a-site-inspection-adds" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">What a site inspection, drawings and specifications add</h2>
        <p className="mb-6">
          The planner surfaces a "suggested site inspection" recommendation based on the project — home extensions, new builds, commercial renovations, structural alterations, and anything the tool couldn't fully measure (missing dimensions, for instance) are flagged as needing one. A site inspection confirms measurements, existing structural and service conditions, and access — the things a preliminary online estimate has to assume. Final drawings and material/finish specifications are what actually fix a price; until they exist, any number is a range, not a figure.
        </p>

        <h2 id="the-handoff" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The handoff: WhatsApp and email, with an explicit confirmation step</h2>
        <p className="mb-6">
          Once a visitor has a summary, they can copy it, print it, download it, or send it via WhatsApp or email. Every send action opens a confirmation dialog showing the exact outgoing message first — nothing is sent automatically. This matters for two reasons: it respects the visitor (they see precisely what's being sent, with their own contact details, before it goes anywhere), and it means the business receives a structured brief instead of "hi, how much?"
        </p>

        <h2 id="what-this-does-not-claim" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">What this doesn't claim</h2>
        <p className="mb-6">
          It's worth being precise about the boundaries. The planner doesn't send messages on its own, doesn't store or submit data to any server (there is no backend — it's a static site), doesn't integrate with the WhatsApp Business API, and doesn't include hosting or a domain. It also doesn't guarantee lead volume — it improves the structure of the enquiries that do arrive. All of this is spelled out in the template's own documentation rather than left implicit, because a tool that quietly does less than it implies is worse than no tool at all.
        </p>

        <h2 id="try-it" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">See it built</h2>
        <p className="mb-6">
          The full build — including the mobile-navigation and CSS containing-block bugs that only showed up in live-browser testing, not in unit tests — is written up in the{' '}
          <a href={`${import.meta.env.BASE_URL}work`} className="text-primary-400 hover:text-primary-300 font-semibold">Construction Website Template case study</a>{' '}
          on this portfolio, alongside the{' '}
          <a href={LIVE_DEMO_URL} target="_blank" rel="noreferrer" className="text-primary-400 hover:text-primary-300 font-semibold">live demo</a>.
        </p>
      </div>
    </>
  );
}
