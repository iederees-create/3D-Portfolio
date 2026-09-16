import { Link } from 'react-router-dom';

const imageBase = `${import.meta.env.BASE_URL}projects/repair-business-job-parts-tracker/`;
function Figure({ src, alt, caption }: { src: string; alt: string; caption: string }) { return <figure className="my-8"><img src={`${imageBase}${src}`} alt={alt} loading="lazy" className="w-full rounded-2xl border border-white/10" /><figcaption className="mt-3 text-sm leading-6 text-slate-500">{caption}</figcaption></figure>; }

export default function RepairJobsPartsInvoicesContent() {
  return <div className="prose-custom text-slate-300 leading-relaxed">
    <p className="text-lg leading-8 text-slate-200">A repair business rarely loses time because a technician cannot diagnose a fault. It loses time because the diagnosis is in one message, the part price is in a supplier tab, the customer approval is in a notebook and the final invoice is rebuilt from memory. When the day is busy, the record that should connect those pieces becomes the least reliable part of the job.</p>
    <p className="mt-4">A useful tracker does not try to become a full accounting system. It gives every job one reference, keeps status visible, records parts movements explicitly and makes the estimate-to-invoice handoff explainable. This guide describes that small system, using a fictional appliance repair example.</p>

    <section><h2 className="mt-10 border-b border-white/10 pb-2 text-2xl font-bold text-white">Start with one job reference</h2>
      <p>Give each job a stable reference such as <strong>JOB-1001</strong>. Use it in the job register, line items, stock ledger and document header. A customer name is not a reliable key: customers can have two appliances, names can be spelled differently and a shared phone number can appear on multiple jobs.</p>
      <p className="mt-4">The job register should hold the facts that describe the work: customer ID, appliance and model, reported fault, diagnosis, opened date, target date, status and technician notes. Keep contact details in a separate customer table with only the essentials. That separation means a phone-number correction does not require editing every historical job.</p>
      <p className="mt-4">Use a short status list: New, Diagnosing, Awaiting Parts, Ready to Complete, Completed and Cancelled. These are workflow states, not feelings. “Awaiting Parts” tells the person planning tomorrow that the next action is procurement; “Ready to Complete” tells them the part is present and the job can be scheduled.</p>
      <Figure src="dashboard-desktop.png" alt="Repair tracker desktop dashboard showing open jobs and awaiting parts cards" caption="The portfolio demo uses fictional jobs and makes status the first operational question. It is a demonstration, not a hosted customer database." />
    </section>

    <section><h2 className="mt-10 border-b border-white/10 pb-2 text-2xl font-bold text-white">Treat parts as movements, not a number you overwrite</h2>
      <p>Stock errors happen when a catalogue row contains a manually edited “current stock” number. Someone saves a job, subtracts a part, then saves it again and subtracts it twice. Someone cancels the job and silently adds the part back even though it is still in a technician's van. The number looks tidy but the history is gone.</p>
      <p className="mt-4">Instead, keep an opening balance and a movement ledger. A Receipt adds quantity, an Issue removes quantity, a Return adds quantity after a physical return, and an Adjustment records a counted correction. Current stock is opening balance plus all movement deltas. A job save cannot change stock because only an explicit ledger entry can do that.</p>
      <p className="mt-4">Use a movement ID, SKU, job reference, date, movement type, quantity delta, recorder and note. For an issue, include the job reference. For a return, say why it was returned and whether it is usable. If a cancelled job had a pump installed and later removed, record that as a real return or adjustment after checking the part—not as an automatic consequence of changing status.</p>
      <p className="mt-4">A practical guardrail is to reject an issue that would take stock below zero unless a supervisor deliberately records an adjustment. The spreadsheet kit makes the ledger visible and highlights low-stock parts; a custom application could enforce that rule at save time.</p>
      <Figure src="invoice-sample.png" alt="Sample repair invoice preview with itemised part and labour lines" caption="The sample invoice is marked SAMPLE and keeps its unit-price snapshots. Changing the catalogue later must not rewrite an invoice already issued." />
    </section>

    <section><h2 className="mt-10 border-b border-white/10 pb-2 text-2xl font-bold text-white">Separate catalogue prices from issued prices</h2>
      <p>Your parts catalogue needs unit cost, selling price, supplier, SKU and reorder threshold. Those values are current decisions. An invoice needs something different: the price that was actually issued to the customer. If a pump costs 24 and is sold at 48 today, a supplier increase next month should not turn an old invoice into a new one.</p>
      <p className="mt-4">Store a line-item snapshot containing description, quantity, unit price, discount, tax flag and line total. Calculate a line as quantity × unit price × (1 − discount), round it to two decimals, then calculate tax on the subtotal and round tax to two decimals. Publish the order in the document notes so a customer can understand the arithmetic. Rates in a template are examples, not a statement of local tax rules.</p>
      <p className="mt-4">Labour deserves the same clarity. Record a labour description and agreed rate, rather than burying “time” in a general total. If you quote a diagnostic fee that is waived when work proceeds, write that policy in your own terms; do not make a template imply a legal obligation.</p>
    </section>

    <section><h2 className="mt-10 border-b border-white/10 pb-2 text-2xl font-bold text-white">An estimate is not an invoice</h2>
      <p>An estimate answers: “What work and price are we proposing?” It can change after diagnosis or customer approval. An invoice answers: “What work and price are we recording as issued?” It should have an issue date, job reference, customer details and itemised snapshots. Mixing the two creates awkward conversations: a customer sees a number that changed but cannot tell whether it was a quote or a final record.</p>
      <p className="mt-4">Keep a document field on line items—Estimate or Invoice—and use separate print layouts. The estimate can include assumptions and an expiry note. The invoice can include payment instructions that you configure yourself. This first tracker does not process payments or claim tax compliance; it simply keeps the document distinction visible.</p>
    </section>

    <section><h2 className="mt-10 border-b border-white/10 pb-2 text-2xl font-bold text-white">Worked example: JOB-1001</h2>
      <p>Maya Patel reports that her fictional WM-204 washing machine will not drain. The technician records “pump obstruction; replacement pump recommended” and moves the job to Diagnosing. The proposed estimate contains one drain pump at 48 and one hour of labour at 65: subtotal 113. With an illustrative 15% tax rate, the displayed estimate total is 129.95 after rounding.</p>
      <p className="mt-4">Maya approves. The technician records <strong>MOV-002</strong>: SKU P-001, JOB-1001, Issue, −1. Stock changes from the opening balance through the ledger. The job moves to Ready to Complete, then Completed after the repair is tested. The invoice retains 48 as its part price even if the catalogue selling price later becomes 52.</p>
      <p className="mt-4">If the wrong pump arrives, record a Return when it physically goes back to stock, then a Receipt or Issue for the replacement as appropriate. If the job is cancelled before installation, do not assume a return happened. The ledger should describe what happened in the workshop, not what would be convenient for the spreadsheet.</p>
    </section>

    <section><h2 className="mt-10 border-b border-white/10 pb-2 text-2xl font-bold text-white">A simple end-of-day review</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-6"><li>Filter jobs that are not Completed or Cancelled and choose the next action for each.</li><li>Filter Awaiting Parts and compare the list with supplier orders.</li><li>Review today's ledger movements against physical parts issued, returned and received.</li><li>Check low-stock rows and decide whether to reorder; do not treat the threshold as an automatic purchase order.</li><li>Confirm every invoice has an issue date, job reference and price snapshot.</li><li>Export a dated backup and keep it somewhere separate from the working file.</li></ol>
      <p className="mt-4">Twenty minutes of consistent review is more valuable than an elaborate dashboard nobody opens. If a field never changes a decision, remove it or move it to notes.</p>
    </section>

    <section><h2 className="mt-10 border-b border-white/10 pb-2 text-2xl font-bold text-white">Spreadsheet or custom app?</h2>
      <p>A spreadsheet is a good fit when one person or a small team needs a transparent register, printable documents and a low-cost starting point. It is easy to back up and customise, but worksheet protection is not security, simultaneous editing is limited and imports need care.</p>
      <p className="mt-4">A custom app becomes more useful when you need user accounts, audit logs, barcode scanning, approval permissions, server backups or integrations. Those features also create hosting, privacy, maintenance and testing responsibilities. Add them because a real workflow requires them—not because a service page promises “automation”.</p>
      <p className="mt-4">The <Link to="/projects/repair-business-job-parts-tracker/" className="text-primary-400 hover:text-primary-300">Repair Business Job &amp; Parts Tracker demo</Link> shows the workflow with fictional local state. The <Link to="/work/repair-business-job-parts-tracker/" className="text-primary-400 hover:text-primary-300">portfolio project page</Link> explains the design choices. The downloadable Etsy kit contains spreadsheets and templates; it is not the hosted demo and does not include a database, payment processing, SMS or accounting integration.</p>
      <Figure src="dashboard-mobile.png" alt="Mobile repair tracker demo with status controls and reset sample button" caption="The demo is intentionally local and fictional. Visitors can change a status, issue a sample part and reset without uploading real customer information." />
    </section>

    <section><h2 className="mt-10 border-b border-white/10 pb-2 text-2xl font-bold text-white">Build the habit before the extras</h2>
      <p>A repair tracker earns its place when a technician can answer three questions without opening five apps: what is the next action on this job, which parts are actually available, and what price was issued? Start with those answers. Add fields only when they improve the work.</p>
      <p className="mt-4">This kit is independently developed as a practical template and demo. It does not promise savings, tax compliance or accounting certification. It gives a small repair business a clear starting structure—and a way to decide whether a tailored application is worth building next.</p>
    </section>
  </div>;
}
