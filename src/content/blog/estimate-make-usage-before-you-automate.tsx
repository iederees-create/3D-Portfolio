import AffiliateDisclosure from '../../components/AffiliateDisclosure';

export default function EstimateMakeUsageBeforeYouAutomateContent() {
  return (
    <div className="space-y-8 text-slate-300 leading-relaxed">
      <p className="text-lg text-slate-200">
        Before you spend hours building a complex automation, you should probably know how much it's going to cost you to run it. Make's pricing is credit-based, which can be confusing at first glance.
      </p>

      <AffiliateDisclosure />

      <p>
        In Make, a "credit" (or "operation") is consumed every time a module successfully performs an action. If your scenario has 4 modules, and runs once, it costs 4 credits. But estimating usage requires understanding triggers, loops, and search queries. 
      </p>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Understanding Make's Pricing Model</h2>
        <p>
          According to Make's official documentation, the Free plan gives you 1,000 credits per month. You are limited to 2 active scenarios and a minimum interval of 15 minutes between scheduled runs. If you upgrade, the paid "Core" plan starts at $10.59/month ($9/mo if billed annually) for 10,000 credits. 
        </p>
        <p className="mt-4">
          If you want to test these limits yourself, <a href="https://www.make.com/en/register?pc=nextgenwebs2026" rel="sponsored noopener" className="text-blue-400 underline hover:text-blue-300">create a free Make account here</a>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">How Operations are Calculated</h2>
        <ul className="list-disc list-inside mt-4 space-y-2 text-slate-300">
          <li><strong>Triggers:</strong> Webhooks consume exactly 1 credit per incoming request. Scheduled polling triggers consume 1 credit just for checking, even if there is no new data! (This is why webhooks are better).</li>
          <li><strong>Iterators:</strong> If you use an Iterator to split an array of 5 items, and pass them to an Action module, that Action module runs 5 times (consuming 5 credits).</li>
          <li><strong>Searches:</strong> A search module always consumes 1 credit to perform the search. If it returns 3 results, and passes those to the next module, that next module runs 3 times (3 credits).</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The Usage Formula</h2>
        <p>
          To estimate your usage, use this simple formula: 
        </p>
        <div className="bg-slate-800 p-4 rounded-md my-4 border border-slate-700">
          <code className="text-pink-400 font-mono">Monthly Cost = (Number of Triggers per month) * (Average Modules per Scenario Run)</code>
        </div>
        <p>
          For example: If you expect 500 form submissions a month, and your scenario has 1 Webhook trigger, 1 Search module, and 1 Create Row module, that scenario consumes 3 operations per run. 
        </p>
        <p className="mt-2">
          `500 * 3 = 1,500 credits/month.`
        </p>
        <p className="mt-4">
          In this case, you would need to upgrade to the Core plan since it exceeds the 1,000 credit free limit. By running this math *before* you build, you can decide if an automation is actually cost-effective!
        </p>
      </section>
    </div>
  );
}
