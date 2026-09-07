import AffiliateDisclosure from '../../components/AffiliateDisclosure';

export default function WhatHappensWhenAutomationFailsContent() {
  return (
    <div className="space-y-8 text-slate-300 leading-relaxed">
      <p className="text-lg text-slate-200">
        You’ve built a massive, multi-step scenario. It runs flawlessly for weeks. Then, an API goes down, a module throws an error, and the whole thing stops. What happens to your data?
      </p>

      <AffiliateDisclosure />

      <p>
        Building automations without understanding error handling is like driving without a seatbelt. When a step in a Make scenario fails, the default behavior is that the scenario stops, and the execution is marked as an error. If you are relying on that scenario to process payments or critical leads, that downtime costs money.
      </p>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The Safety Net: Make's Incomplete Executions</h2>
        <p>
          One of the best features in Make is the "Incomplete Executions" folder (available if you toggle it on in your scenario settings). When a scenario fails, the data bundle that caused the failure is saved. You can fix the error in your scenario (e.g., mapping a field correctly) and then click "Resolve" to re-run that specific bundle from where it failed.
        </p>
        <p className="mt-4">
          You can try this out yourself on a free Make account. <a href="https://www.make.com/en/register?pc=nextgenwebs2026" rel="sponsored noopener" className="text-blue-400 underline hover:text-blue-300">Register here</a> to start building.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Proactive Error Handling Directives</h2>
        <p>
          You can actually build error handling directly into your scenario using Error Handlers. If you right-click a module in Make and select "Add error handler," you can define what happens if that specific module breaks.
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2 text-slate-300">
          <li><strong>Ignore:</strong> The error is ignored, and the scenario continues to the next module. (Use cautiously!)</li>
          <li><strong>Break:</strong> The scenario stops and stores the data in Incomplete Executions for you to resolve later. It will automatically try again a few times before turning the scenario off.</li>
          <li><strong>Resume:</strong> You provide fallback data so the scenario can continue running successfully.</li>
          <li><strong>Rollback:</strong> Stops the execution and rolls back any changes made during that run (if supported by the apps).</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The Notification Strategy</h2>
        <p>
          As a best practice, you should always set up a secondary scenario that watches your Make account for errors, or simply rely on Make's built-in email notifications. But for mission-critical scenarios, using a "Break" directive combined with a Slack notification ensures you can fix the issue without losing the user's data. 
        </p>
      </section>
    </div>
  );
}
