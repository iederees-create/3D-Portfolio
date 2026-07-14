/**
 * Case study for the Precision Laser Website Template and its Laser Cut &
 * Engraving Quote Planner. Facts in this article are drawn from
 * handoff/FINAL-PRODUCT-FACTS.json in the release worktree, not from the
 * earlier marketing drafts, so nothing here overstates what the tool
 * actually does.
 */

const LIVE_DEMO_URL = 'https://iederees-create.github.io/precision-laser-works-template/';

export default function LaserCuttingWebsiteQuotePlannerContent() {
  return (
    <>
      <div className="prose prose-invert prose-lg max-w-none text-slate-300">
        <h2 id="the-problem" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The problem: "how much to laser this?" with no material, size, or file</h2>
        <p className="mb-6">
          Most laser cutting and engraving shops field the same one-line enquiry over and over: a phone photo of a sketch, no material specified, no thickness, no quantity, and a file format that turns out to be a JPG logo sold as "ready to cut." Every one of those enquiries needs the same five or six qualifying questions answered before a quote is even possible — and answering them one WhatsApp message at a time is slow for both sides.
        </p>
        <p className="mb-6">
          The fix is the same one that works for any fabrication trade: move the qualifying questions onto the website itself, before the conversation starts.
        </p>

        <h2 id="the-approach" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The approach: a Laser Cut &amp; Engraving Quote Planner</h2>
        <p className="mb-6">
          For the Precision Laser Website Template, that meant building an interactive planner. A visitor picks a service type (laser cutting, laser engraving, cutting &amp; engraving, signage, acrylic fabrication, trophy/award, branded gift, prototype, or other), a material (acrylic, plywood, MDF, paper/card, leather, glass, anodised aluminium, stainless steel, or other), thickness, width and height in their choice of unit (mm, cm, m, or inches), quantity, cut complexity, file readiness, and finish. The planner turns that into:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-300">
          <li>the approximate material area, unit-converted and quantity-multiplied</li>
          <li>a complexity indicator (Low / Medium / High), with the reasons behind it</li>
          <li>a service checklist specific to the chosen service type</li>
          <li>a file-preparation checklist specific to the visitor's file-readiness answer</li>
          <li>a design-support warning whenever no cut-ready vector file exists yet</li>
          <li>a configurable preliminary budget range</li>
          <li>a structured, shareable project summary</li>
        </ul>
        <p className="mb-6">
          <a href={LIVE_DEMO_URL} target="_blank" rel="noreferrer" className="text-primary-400 hover:text-primary-300 font-semibold">Try the live demo →</a>
        </p>

        <h2 id="preliminary-vs-binding" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Preliminary guidance, not a binding quotation</h2>
        <p className="mb-6">
          The planner's budget range is calculated from a material rate per square centimetre, a thickness-band multiplier, a cut-complexity multiplier, a finish multiplier, and an optional engraving surcharge — all configurable by the business owner, none hardcoded. It is <strong>not</strong> a quotation, an offer, or a contract. The exact wording appears inline on the planner section, in the generated summary text, and on a dedicated Quote Disclaimer page: "The planner provides preliminary guidance only. Final pricing depends on file quality, machine setup, material availability, job complexity, finishing, quantity, labour, delivery and final review."
        </p>
        <p className="mb-6">
          A real quotation depends on things a website form cannot know: the actual vector file's cut-line quality, kerf and nesting efficiency on the specific sheet, machine settings for that exact material and thickness, and current material stock. The planner's job is to get a visitor's enquiry to a state where a file review is worth doing — not to replace one.
        </p>

        <h2 id="file-readiness" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Why file readiness gets its own step</h2>
        <p className="mb-6">
          A laser shop can't cut a JPG. The planner asks directly whether the visitor has a vector file ready (SVG/DXF/AI/PDF), an image file only, needs design help, or has no file yet — and surfaces a design-support warning plus a tailored file-preparation checklist for anything short of "vector file ready." This turns a common source of wasted back-and-forth into a single, upfront answer.
        </p>

        <h2 id="the-handoff" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The handoff: WhatsApp and email, with an explicit confirmation step</h2>
        <p className="mb-6">
          Once a visitor has a summary, they can copy it, print it, download it, or send it via WhatsApp or email. Every send action opens a confirmation dialog showing the exact outgoing message first — nothing is sent automatically. Verified directly in the browser: a patched <code>window.open</code> recorded zero calls before the visitor confirmed, and exactly one correctly-encoded <code>wa.me</code> URL after.
        </p>

        <h2 id="what-this-does-not-claim" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">What this doesn't claim</h2>
        <p className="mb-6">
          The planner doesn't send messages on its own, doesn't store or submit data to any server (there is no backend — it's a static site; the only thing saved between visits is the visitor's chosen colour theme, in localStorage), and doesn't include hosting or a domain. It also doesn't claim machine wattage, safety certifications, or guaranteed turnaround — none of that is knowable from a website form, so none of it is claimed.
        </p>

        <h2 id="try-it" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">See it built</h2>
        <p className="mb-6">
          The full build is written up in the{' '}
          <a href={`${import.meta.env.BASE_URL}work`} className="text-primary-400 hover:text-primary-300 font-semibold">Precision Laser Website Template case study</a>{' '}
          on this portfolio, alongside the{' '}
          <a href={LIVE_DEMO_URL} target="_blank" rel="noreferrer" className="text-primary-400 hover:text-primary-300 font-semibold">live demo</a>.
        </p>
      </div>
    </>
  );
}
