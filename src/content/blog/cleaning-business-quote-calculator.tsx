/**
 * Article: "How to Build a Cleaning Quote Calculator for Your Website" —
 * case study for the Cleaning Business Instant Quote Kit. Every worked
 * number in this article is taken directly from
 * cleaning-business-quote-calculator/source/pricing-engine.test.js, where
 * it is independently hand-calculated and asserted — nothing here is
 * invented after the fact.
 */

const LIVE_DEMO_URL = 'https://iederees-create.github.io/cleaning-business-instant-quote-calculator/';

export default function CleaningBusinessQuoteCalculatorContent() {
  return (
    <>
      <div className="prose prose-invert prose-lg max-w-none text-slate-300">
        <h2 id="the-problem" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The problem: "how much to clean a 3-bed house?" has no fast answer</h2>
        <p className="mb-6">
          A residential cleaning business's website usually has one of two things where a price should be: a vague "contact us for a quote" line, or a flat rate that's wrong for most houses. Neither helps. The vague version makes a visitor who's comparing three cleaners in five minutes move on to whoever answers first. The flat rate either undercharges a five-bedroom house or overcharges a studio, and the owner ends up renegotiating by text message anyway.
        </p>
        <p className="mb-6">
          What actually varies a cleaning quote — property size, which service (regular, deep, or end-of-tenancy), how often, and a short list of optional extras — is a small, well-defined set of inputs. That's exactly the shape of problem an instant calculator solves well: give the visitor a real number in fifteen seconds, built from rules the business owner set and can change any time.
        </p>

        <h2 id="the-six-steps" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The calculation, in the order it actually runs</h2>
        <p className="mb-6">
          Every quote goes through the same six steps, in this order, every time — the tool is deliberately boring here, because a pricing engine that reorders its own logic per input is one nobody can debug:
        </p>
        <ol className="list-decimal pl-6 space-y-2 mb-8 text-slate-300">
          <li><strong>Base service amount</strong> from the property size — either a room count (bedrooms, bathrooms, half-bathrooms) or a floor area, never both for the same quote.</li>
          <li><strong>Service-type multiplier</strong>, then the <strong>frequency discount</strong> — both applied to the service amount only. A deep clean costs more; a weekly client pays less per visit. Extras and the travel fee are never discounted.</li>
          <li>The <strong>minimum service charge</strong> floor — a discounted studio apartment still can't undercut the cost of sending a cleaner out at all.</li>
          <li><strong>Extras</strong> (oven, fridge, interior windows, carpets) and a flat <strong>travel fee</strong>, added on top.</li>
          <li><strong>Tax</strong>, applied to whichever components the business owner has configured as taxable.</li>
          <li><strong>Rounding</strong> to the cent at each step, not just at the end — so every line item on screen adds up to the total exactly, with no last-cent mismatch.</li>
        </ol>
        <p className="mb-6">
          <a href={LIVE_DEMO_URL} target="_blank" rel="noreferrer" className="text-primary-400 hover:text-primary-300 font-semibold">Try the live demo →</a>
        </p>

        <h2 id="worked-examples" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Three worked examples</h2>
        <p className="mb-6">
          Using sample rates of a $35 base call-out fee, $18 per bedroom, $22 per full bathroom, a 20% weekly-frequency discount, an $80 minimum charge, a $10 travel fee, and 8% tax where noted:
        </p>
        <div className="overflow-x-auto rounded-2xl border border-white/10 mb-8">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-white/[0.05] text-slate-300">
              <tr><th className="p-4">Scenario</th><th className="p-4">Base</th><th className="p-4">After multiplier / discount</th><th className="p-4">Total</th></tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-slate-300">
              <tr><td className="p-4 font-semibold text-white">Regular, one-time, 3 bed / 2 bath</td><td className="p-4">$133.00</td><td className="p-4">$133.00 (no multiplier, no discount)</td><td className="p-4 font-semibold text-white">$133.00</td></tr>
              <tr><td className="p-4 font-semibold text-white">Deep clean, weekly, same house</td><td className="p-4">$133.00</td><td className="p-4">$199.50 → −20% → $159.60</td><td className="p-4 font-semibold text-white">$159.60</td></tr>
              <tr><td className="p-4 font-semibold text-white">Studio, regular, one-time</td><td className="p-4">$35.00</td><td className="p-4">below the $80 minimum</td><td className="p-4 font-semibold text-white">$80.00 (minimum applied)</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mb-6">
          The third row is the one that matters most in practice. A 0-bedroom, 0-bathroom entry produces a $35 base amount — well under the $80 minimum — so the calculator floors it at $80 instead of quoting a number that wouldn't cover the visit. Every one of these totals, plus a fourth case with extras, travel and tax, is checked against an independently hand-calculated expected value in the project's own test suite — not just eyeballed.
        </p>
        <img src={`${import.meta.env.BASE_URL}projects/cleaning-business-quote-calculator/03-itemized-estimate.jpg`} alt="Itemised estimate breakdown for a deep clean with travel fee and tax, reconciling exactly to the total" className="w-full rounded-2xl border border-white/10 mb-8" loading="lazy" />

        <h2 id="frequency-discounts" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Why frequency discounts only touch the service amount</h2>
        <p className="mb-6">
          It's tempting to discount the whole invoice for a recurring client, but that's usually not what a cleaning business actually means. A weekly client's labour gets cheaper per visit because the business is planning around a predictable schedule — but the oven doesn't get cheaper to clean, and the travel fee doesn't shrink because someone comes more often. The calculator applies the frequency discount to the service (labour) portion only, before extras and travel are added. It's a small distinction that avoids quietly under-charging every add-on a recurring customer orders.
        </p>

        <h2 id="two-pricing-modes" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Room-based or floor-area-based — never both</h2>
        <p className="mb-6">
          Some cleaning businesses price by bedrooms and bathrooms; others price by square footage or square metres, especially for larger or commercial-adjacent residential jobs. The calculator supports either mode, set once in Business Setup, and deliberately refuses to combine them. Charging by both room count and floor area for the same quote would double-count the same underlying "how big is this job" signal — so the tool picks one source of truth per business, not per quote.
        </p>
        <img src={`${import.meta.env.BASE_URL}projects/cleaning-business-quote-calculator/02-business-setup.jpg`} alt="Business Setup tab showing branding fields and the room-based or floor-area pricing mode toggle" className="w-full rounded-2xl border border-white/10 mb-8" loading="lazy" />

        <h2 id="testing-the-engine" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Testing a pricing engine means checking the arithmetic, not the UI</h2>
        <p className="mb-6">
          Pricing bugs are unusually easy to hide from casual testing, because the calculator will happily produce a plausible-looking number for almost any input — the only way to know it's the <em>right</em> number is to work it out independently first and then check the tool agrees. So the pricing module ships with seven test cases, each one worked out by hand in a code comment before the assertion: one for each service type, one for each pricing mode, one that deliberately crosses the minimum-charge boundary, one combining extras, travel and tax in a single quote, one confirming a zero-value input still returns a sane floor rather than a $0.00 quote, and one that feeds the calculator negative room counts and an over-limit extra quantity to confirm both get clamped and logged rather than silently accepted or silently dropped.
        </p>
        <p className="mb-6">
          That last case matters more than it sounds. A calculator that quietly discards bad input is easy to trust incorrectly — everything looks fine until a customer discovers the form let them enter "-2" bedrooms and got a suspiciously low price. Rejecting or clamping invalid input, and being explicit about it, is part of the pricing logic, not an afterthought bolted onto the UI layer.
        </p>

        <h2 id="two-products-one-engine" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">One calculation module, two different products</h2>
        <p className="mb-6">
          The live demo linked throughout this article and the downloadable DIY kit sold separately are built from the exact same <code>pricing-engine.js</code> file — there's no second, simplified copy of the maths floating around to drift out of sync. The only things that differ between the two builds are cosmetic and behavioural framing, not logic: the public demo carries a visible "independently built demo, not a real business" disclosure and its quote-request button is wired to a clearly labelled simulated flow that collects nothing, while the downloadable kit ships with the request button disabled by default until the buyer deliberately connects a real form service of their own choosing. Keeping one pricing module as the single source of truth for both means a bug fix or a rounding-policy change only has to happen once.
        </p>

        <h2 id="when-to-confirm-manually" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">When this stops being enough, and a human needs to confirm</h2>
        <p className="mb-6">
          An instant calculator is good at pricing the common case fast. It's not a substitute for a business owner's judgment on the edge cases, and the tool doesn't pretend otherwise — every estimate is labelled as an estimate, with final pricing subject to confirmation. A few situations where manual confirmation genuinely matters:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-300">
          <li>Unusual property conditions the form can't capture — hoarding-level clutter, pet damage, mould, or a post-construction site that needs specialist equipment.</li>
          <li>Access constraints (no parking, restricted building hours, security clearance) that change the effective labour time.</li>
          <li>A genuinely custom combination of extras outside the configured list.</li>
          <li>Any job where the calculated total feels materially wrong for what the customer describes — the calculator has no way to see the property, only what's typed into a form.</li>
        </ul>
        <p className="mb-6">
          That's why the kit's "Request this quote" flow is built as a starting point for a conversation, not an auto-booking system: it doesn't take payments, doesn't book appointments, and (outside an explicitly configured form service) doesn't send anything anywhere on its own.
        </p>

        <h2 id="mobile-and-accessibility" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Designing for the phone in someone's hand, not a desktop demo</h2>
        <p className="mb-6">
          Most visitors comparing local cleaning services are doing it on a phone, often mid-scroll between three other tabs, which shaped a few concrete decisions rather than staying a vague goal. Every form control is a native number input or radio button rather than a custom widget, so the browser's own numeric keypad, autofill and screen-reader behaviour all work without extra code. Quantity steppers for extras have large tap targets and are operable by keyboard alone, not just by dragging a slider. Radio groups use proper <code>role="radiogroup"</code> semantics with visible focus outlines rather than relying on colour alone to show what's selected, and the live total updates inside an <code>aria-live</code> region so a screen-reader user hears the new estimate without having to hunt for it after every change. None of this is exotic — it's the difference between a form that happens to render on mobile and one that was actually tested at 390 pixels wide with a keyboard-only pass before anything shipped.
        </p>
        <p className="mb-6">
          The one layout bug that real in-browser testing caught and a quick visual review wouldn't have: an early version pinned the price summary to the bottom of the viewport with <code>position: sticky</code>, which looked fine on a tall page but silently overlapped the last extra's row on shorter viewports, because a stuck element and the normal document flow can occupy the same pixels once the page is shorter than the screen. The fix was to drop the sticky positioning entirely — the summary simply sits in normal document flow below the form, which is less clever and considerably harder to get wrong.
        </p>

        <h2 id="embedding" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Embedding it on a real website</h2>
        <p className="mb-6">
          The finished tool is a self-contained HTML/CSS/JS bundle — four files, no build step, no server, no database. It opens directly from <code>index.html</code> for local testing, and on a live site it works either as a standalone page or embedded into an existing page with a plain iframe:
        </p>
        <pre className="bg-black/40 border border-white/10 rounded-xl p-4 overflow-x-auto text-sm mb-8"><code>{`<iframe src="/quote/index.html" style="width:100%;min-height:900px;border:0;"></iframe>`}</code></pre>
        <p className="mb-6">
          WordPress, Wix, Squarespace and similar builders each handle custom HTML and iframes differently, and not every plan allows custom code at all — worth checking before publishing, and worth testing on a real page before removing an existing quote tool.
        </p>

        <h2 id="local-config-not-an-account" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Local configuration, not a login</h2>
        <p className="mb-6">
          The Business Setup tab — where a business owner edits their branding, rates, service types, frequency discounts and extras — saves to the browser's local storage, not to a server. There's no account, no password, and no backend to secure or break. That's a deliberate trade-off: it keeps the product database-free and self-hosted-anywhere, at the cost of settings being per-browser rather than synced across devices. Exporting a configuration to a <code>.json</code> file and re-importing it is the backup and transfer mechanism, and the tool validates and clamps anything imported rather than trusting it blindly — malformed files are rejected outright, and out-of-range values get clamped to a sane limit rather than silently breaking the calculator.
        </p>
        <img src={`${import.meta.env.BASE_URL}projects/cleaning-business-quote-calculator/01-cover.jpg`} alt="The Get a Quote tab showing service type, frequency, and property size fields for the Cleaning Business Instant Quote Kit" className="w-full rounded-2xl border border-white/10 mb-8" loading="lazy" />

        <h2 id="what-this-does-not-claim" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">What this doesn't claim</h2>
        <p className="mb-6">
          Worth being precise about the boundaries, the same way the tool itself is: the sample rates shipped with the kit are illustrative examples, not researched local pricing or business advice, and every number is editable specifically so a real business enters its own figures rather than trusting a stranger's guess at what a bedroom costs to clean. The calculator doesn't take payments, doesn't book appointments, doesn't send automatic emails unless a business owner deliberately wires up a real form service, and doesn't guarantee a quote will convert into a booking. It estimates a price from the inputs it's given, itemises exactly how it got there, and leaves the conversation — and the final number — to the business.
        </p>

        <h2 id="try-it" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">See it built</h2>
        <p className="mb-6">
          The full build — the pricing engine, its independently-verified test cases, the responsive form, and the DIY download package — is written up in the{' '}
          <a href={`${import.meta.env.BASE_URL}work`} className="text-primary-400 hover:text-primary-300 font-semibold">Cleaning Business Instant Quote Kit case study</a>{' '}
          on this portfolio, alongside the{' '}
          <a href={LIVE_DEMO_URL} target="_blank" rel="noreferrer" className="text-primary-400 hover:text-primary-300 font-semibold">live demo</a>.
        </p>
      </div>
    </>
  );
}
