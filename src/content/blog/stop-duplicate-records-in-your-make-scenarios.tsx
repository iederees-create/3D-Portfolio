import AffiliateDisclosure from '../../components/AffiliateDisclosure';

export default function StopDuplicateRecordsInYourMakeScenariosContent() {
  return (
    <div className="space-y-8 text-slate-300 leading-relaxed">
      <p className="text-lg text-slate-200">
        You set up an automation to sync your CRM with a spreadsheet. You check it a week later, and there are 4 copies of the same client row. What went wrong?
      </p>

      <AffiliateDisclosure />

      <p>
        Duplicate records are the most common symptom of a poorly constructed automation scenario. If your Make scenario simply says "When X happens, Create Y," without checking if "Y" already exists, you are going to create a mess. The solution is the "Search and Route" pattern.
      </p>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The "Search First" Philosophy</h2>
        <p>
          Before creating a new record in your database, your scenario must always ask: "Does this already exist?" 
        </p>
        <p className="mt-4">
          If you want to practice building this pattern, <a href="https://www.make.com/en/register?pc=nextgenwebs2026" rel="sponsored noopener" className="text-blue-400 underline hover:text-blue-300">create a Make account here</a> (their Free plan allows 1,000 operations, which is plenty for testing). 
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">How to Prevent Duplicates</h2>
        <ol className="list-decimal list-inside mt-4 space-y-4">
          <li>
            <strong className="text-white">The Trigger:</strong> Your scenario starts normally (e.g., a Webhook receives a lead from a form).
          </li>
          <li>
            <strong className="text-white">The Search Module:</strong> Instead of immediately adding a "Create a Row" module, add a "Search Rows" (or "Search Records") module for your destination app (like Google Sheets, Airtable, or Notion). Search for the unique identifier—usually the email address—that came from the trigger.
          </li>
          <li>
            <strong className="text-white">The Router:</strong> Add a Make "Router" module after the search. A router splits your automation into multiple paths based on conditions.
          </li>
          <li>
            <strong className="text-white">Path A (Record Exists):</strong> Set a filter on the first path: `Total number of bundles (from the Search module) &gt; 0`. On this path, place an "Update Record" module. You will update the existing record with any new information.
          </li>
          <li>
            <strong className="text-white">Path B (New Record):</strong> Set a filter on the second path: `Total number of bundles = 0`. On this path, place your "Create a Row" module.
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Why this Pattern is Essential</h2>
        <p>
          While a Search module costs an extra operation (credit) every time the scenario runs, it is a non-negotiable expense for data integrity. Data deduplication can be incredibly painful to fix manually later on, so designing your scenarios defensively from day one is the hallmark of a professional automation builder.
        </p>
      </section>
    </div>
  );
}
