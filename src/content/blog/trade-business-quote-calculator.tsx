export default function TradeBusinessQuoteCalculatorContent() {
  return (
    <div className="prose prose-invert prose-lg max-w-none text-slate-300">
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The problem with rebuilding every quote from scratch</h2>
      <p className="mb-6">Pest control technicians, tilers, laser cutters, exterior cleaners and construction crews all share the same daily friction: a new job comes in, and someone has to turn a rough set of quantities into a clean, itemized number the client can say yes to. Doing that in a blank spreadsheet or a word processor every time is slow, and it is easy to forget a line item, a discount, or the tax.</p>
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Why a template needed real formulas, not just a nice layout</h2>
      <p className="mb-6">Most quote templates on the market are static — a pretty table with no calculation behind it, so the business still does the maths by hand. The Trade Business Quote &amp; Estimate Calculator is built the other way round: every tab has working Excel/Google Sheets formulas. Line Total, Subtotal, Discount %, Tax %, a Travel/Callout Fee and a Deposit Due all calculate themselves as soon as a quantity and rate are entered.</p>
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Five trades, one shared structure</h2>
      <p className="mb-6">Rather than build one generic tab, the workbook ships with five pre-loaded trade tabs — Pest Control, Tiling &amp; Flooring, Laser Cutting &amp; Engraving, Exterior Cleaning, and Construction &amp; Renovation — each with realistic example line items for that trade, plus a blank Custom Trade tab using the identical formula structure for any business not covered above.</p>
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">A real bug, caught before it shipped</h2>
      <p className="mb-6">During testing, the "Valid Until" date field on every tab initially referenced the wrong cell and showed a raw <code>#VALUE!</code> error instead of a date. Catching that meant actually opening the file, recalculating it, and reading every tab — not just generating the spreadsheet and assuming it worked. It's a small thing, but it's the difference between a template that looks finished and one that actually is.</p>
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">What a buyer gets</h2>
      <p className="mb-6">The finished workbook, a Setup &amp; Customization Guide, and a Google Sheets Import Guide — enough to replace the yellow example rows with real pricing and start sending quotes the same day, in whichever spreadsheet app the business already uses.</p>
      <p className="mb-6"><a href="https://iederees-create.github.io/trade-quote-estimate-calculator/" target="_blank" rel="noreferrer" className="text-primary-400 hover:text-primary-300 font-semibold">See the product preview →</a></p>
    </div>
  );
}
